'use strict';

angular.module('zvmApp.core')
    .constant('restorePlanTypes', {
        ByVpgName: 1,
        ByTarget: 2
    })
    .factory('restoreWizardModel', function ($q, $translate, $filter, enums, vos, zertoServiceFactory, restorePlanTypes, zWizardStepStates, busyOverlayService) {
        var restoreWizardModel = {
            isHyperV: false
        };
        //===============================================================
        // data access
        //===============================================================
        function insertIDs(target) {
            _.each(target, function (item, index) {
                item.id = index;
                item.pointInTimeText = $filter('date')(item.PointInTime, 'dd.MM.yyyy HH:mm:ss');
                item.PointInTime = {display: item.pointInTimeText, filterValue: item.PointInTime};
            });
        }

        restoreWizardModel.getVCenterPotentialRestoreSecondaryEntities = function (siteIdentifier, baseComputeResourceIdentifier) {
            return zertoServiceFactory.GetVCenterPotentialRestoreSecondaryEntities(siteIdentifier, baseComputeResourceIdentifier);
        };
        restoreWizardModel.getRestoreSelectionScreenByPlan = function (plan, value) {
            if (plan === restorePlanTypes.ByVpgName) {
                zertoServiceFactory.GetRestoreSelectionScreenByVpgName(value).then(restoreWizardModel.onRestoreSelectionScreenResult);
            } else if (plan === restorePlanTypes.ByTarget) {
                zertoServiceFactory.GetRestoreSelectionScreenByTarget(value.SiteIdentifier, value.BackupTargetIdentifier).then(restoreWizardModel.onRestoreSelectionScreenResult);
            }
        };

        restoreWizardModel.onRestoreSelectionScreenResult = function (result) {
            restoreWizardModel.data.RestoreSelectionScreenVisualObject = result;
            restoreWizardModel.data.RestoreSelectionScreenVisualObject.Instances =
                _.sortBy(restoreWizardModel.data.RestoreSelectionScreenVisualObject.Instances, 'PointInTime').reverse();

            _.forEach(restoreWizardModel.data.RestoreSelectionScreenVisualObject.Instances, function (instance) {
                instance.VMsDisplay = restoreWizardModel.createFullFromTotalObj(instance.FullVMs, instance.TotalVMs);

                instance.VolumesDisplay = restoreWizardModel.createFullFromTotalObj(instance.FullVolumes, instance.FullVolumes);

                _.forEach(instance.VMs, function (vm) {
                    vm.VolumesDisplay = restoreWizardModel.createFullFromTotalObj(vm.FullVolumes, vm.TotalVolumes);
                });

            });

            insertIDs(restoreWizardModel.data.RestoreSelectionScreenVisualObject.Instances);
        };

        restoreWizardModel.getRestoreConfigurationScreen = function () {
            var selectedItem = restoreWizardModel.data.selectedItems[0];
            zertoServiceFactory.GetRestoreConfigurationScreen(selectedItem.SiteIdentifier,
                selectedItem.BackupTargetIdentifier,
                selectedItem.BackupJobIdentifier, enums.RestoreType.VC).then(restoreWizardModel.onRestoreConfigurationResult);
        };

        restoreWizardModel.onRestoreConfigurationResult = function (result) {
            restoreWizardModel.data.restoreConfiguration = result;
            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (item) {
                item.OriginalName = item.Name;
                item.VolumesDisplay = restoreWizardModel.createFullFromTotalObj(item.FullVolumes, item.TotalVolumes);
            });

            if (restoreWizardModel.data.restoreHost) {
                restoreWizardModel.applyHostToAll(restoreWizardModel.data.restoreHost);
            }

            if (restoreWizardModel.data.restoreDatastore) {
                restoreWizardModel.applyDatastoreToAll(restoreWizardModel.data.restoreDatastore);
            }

            insertIDs(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines);

            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (vm) {
                insertIDs(vm.Volumes);
                insertIDs(vm.VNics);
            });
            if (angular.isDefined(restoreWizardModel.data.selectedItems)) {
                restoreWizardModel.data.restoreConfiguration.BackupJobIdentifier = angular.copy(restoreWizardModel.data.selectedItems[0].BackupJobIdentifier);
            }
        };

        restoreWizardModel.applyHostToAll = function (host) {
            var cloned = _.cloneDeep(host);
            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (item) {
                item.ComputeResource = cloned;
                item.ComputeResource.value = cloned.DisplayName;
            });
        };

        restoreWizardModel.applyDatastoreToVolume = function (volume, datastore) {
            var ds = new vos.DatastoreVolumeRestoreDestinationVisualObject(datastore);
            volume.Destination = new vos.VolumeRestoreDestinationVisualObject(ds);

        };

        restoreWizardModel.clearDatastoreToVolume = function (volume) {
            volume.Destination = null;

        };


        restoreWizardModel.applyDatastoreToAll = function (datastore) {
            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (item) {
                item.Datastore = datastore.Datastore;
                item.Datastore.value = datastore.Datastore.DisplayName;
                _.each(item.Volumes, function (volume) {
                    restoreWizardModel.applyDatastoreToVolume(volume, datastore.Datastore);
                });
            });
        };

        restoreWizardModel.clearDatastoreToAll = function () {
            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (item) {
                item.Datastore = null;
                _.each(item.Volumes, function (volume) {
                    restoreWizardModel.clearDatastoreToVolume(volume);
                });
            });
        };


        restoreWizardModel.applyPowerOnToAll = function (powerOn) {
            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (item) {
                item.IsPowerOn = powerOn;
            });
        };

        restoreWizardModel.applyChangesToSelectedVMs = function (targets, result) {
            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (item) {
                var arrToCheck = _.pluck(targets, 'OriginalName');
                if (_.contains(arrToCheck, item.OriginalName)) {
                    item.ComputeResource = result.ComputeResource;
                    item.Datastore = result.Datastore;
                    if (angular.isDefined(result.IsPowerOn)) {
                        item.IsPowerOn = result.IsPowerOn;
                    }

                    _.each(item.Volumes, function (volume) {
                        restoreWizardModel.applyDatastoreToVolume(volume, result.Datastore);
                    });
                }
            });
        };

        restoreWizardModel.applyVPGConfiguration = function () {
            var restorePopulatedConfiguration = angular.copy(restoreWizardModel.data.restoreConfiguration.PopulatedConfiguration);
            var newVms = restorePopulatedConfiguration.VirtualMachines;
            keepPowerOnAndVolumesDisplayValues(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, newVms);
            restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines = newVms;

            insertIDs(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines);

            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (vm) {
                vm.OriginalName = vm.Name;
                insertIDs(vm.Volumes);
                insertIDs(vm.VNics);
            });
        };

        function keepPowerOnAndVolumesDisplayValues(oldVMs, newVMs){
            _.forEach(newVMs, function (newVM) {
                var found = _.find(oldVMs, function (oldVM) {
                    return _.isEqual(oldVM.VMIdentifier, newVM.VMIdentifier);
                });

                if (angular.isDefined(found)){
                    newVM.IsPowerOn = found.IsPowerOn;
                    newVM.VolumesDisplay = angular.copy(found.VolumesDisplay);
                }
            });
        }

        restoreWizardModel.restoreFromBackup = function () {
            return zertoServiceFactory.RestoreFromBackup(restoreWizardModel.data.restoreConfiguration.Configuration,
                restoreWizardModel.data.selectedItems[0].SiteIdentifier,
                restoreWizardModel.data.selectedItems[0].BackupTargetIdentifier,
                restoreWizardModel.data.selectedItems[0].BackupJobIdentifier
            );
        };

        restoreWizardModel.getVCenterPotentialDatatstore = function (item) {
            var deferred = $q.defer();

            function resultHandler(result) {
                busyOverlayService.removeFromBlacklist('GetVCenterPotentialRestoreSecondaryEntities');

                _.each(result.Datastores, function (ds) {
                    ds.isDisabled = !ds.IsEnabled;
                });

                deferred.resolve(result.Datastores);
            }

            if (!item.ComputeResource) {
                deferred.resolve([{
                    Datastore: {
                        DisplayName: $translate.instant('RESTORE_WIZARD.FILTERS.DEFAULT'),
                        isDisabled: true
                    }
                }]);
            } else {
                busyOverlayService.addToBlacklist('GetVCenterPotentialRestoreSecondaryEntities');

                restoreWizardModel.getVCenterPotentialRestoreSecondaryEntities(restoreWizardModel.data.selectedItems[0].SiteIdentifier,
                    item.ComputeResource.BaseComputeResourceIdentifier).then(resultHandler);
            }

            return deferred.promise;
        };
        //===============================================================
        // init
        //===============================================================
        restoreWizardModel._initPromise = null;

        restoreWizardModel.init = function () {
            restoreWizardModel._initPromise = $q.defer();
            restoreWizardModel.data = {
                selectedItems: [],
                restoreHost: null,
                restoreDatastore: null,
                planType: 1,
                selectedProtectionGroup: null,
                selectedRepository: null,
                selectedPointVMs:[]
            };

            var getSummary = zertoServiceFactory.GetSummaryMinimal();
            var getPotentials = zertoServiceFactory.GetPotentialRestoreSources();

            $q.all([getSummary, getPotentials]).then(function (result) {
                // result for GetSummaryMinimal
                restoreWizardModel.licenseType = result[0].SiteDetails.LicenseType;

                // result for GetPotentialRestoreSources
                if (result[1].PotentialProtectionGroups.length === 0 && result[1].PotentialRepositories.length === 0) {
                    restoreWizardModel._initPromise.reject('EXCEPTIONS.PERMISSION_ERROR');
                }

                restoreWizardModel.data.potentialSources = result[1];
                restoreWizardModel._initPromise.resolve();
            }, function (error) {
                console.log('restore wizard model ERROR : => ' + error);
            });


            return restoreWizardModel._initPromise.promise;
        };
        //===============================================================
        // Steps validations
        //===============================================================
        restoreWizardModel._setStepValid = function (step) {
            step.stateIcon = zWizardStepStates.VALID;
            step.isEnabled = true;
        };

        restoreWizardModel.validateRestorePlan = function (step) {
            var result = (restoreWizardModel.data.planType === restorePlanTypes.ByVpgName && !!restoreWizardModel.data.selectedProtectionGroup) || (restoreWizardModel.data.planType === restorePlanTypes.ByTarget && !!restoreWizardModel.data.selectedRepository);
            if (result) {
                restoreWizardModel._setStepValid(step);
            }
            return result;
        };

        restoreWizardModel.validateRestorePoint = function (step) {
            var result = restoreWizardModel.data.selectedItems.length > 0;
            if (result) {
                restoreWizardModel._setStepValid(step);
            }

            return result;
        };

        restoreWizardModel.validateRestoreVmSettings = function (step) {
            if (!restoreWizardModel.data.restoreConfiguration) {
                return false;
            }

            var result = true;
            _.each(restoreWizardModel.data.restoreConfiguration.Configuration.VirtualMachines, function (item) {
                if (!item.ComputeResource || !item.Datastore || !item.Volumes || item.Volumes.length === 0) {
                    result = false;
                    return false;
                }

                var innerVolumeValid = true;
                _.each(item.Volumes, function (volume) {
                    if (!volume.Destination) {
                        innerVolumeValid = false;
                        return false;
                    }
                });
                if (!innerVolumeValid) {
                    result = false;
                    return false;
                }
            });

            if (result) {
                restoreWizardModel._setStepValid(step);
            }
            return result;
        };

        restoreWizardModel.validateRestoreSummary = function () {
            return true;
        };

        //===========================================================================
        // Steps
        //===========================================================================
        restoreWizardModel.getSteps = function () {
            return angular.copy(restoreWizardModel.steps);
        };

        restoreWizardModel.steps = [
            {
                class: '',
                isEnabled: false,
                stateIcon: zWizardStepStates.INITIAL,
                id: 'RESTORE_PLAN',
                stepTitle: 'RESTORE PLAN',
                template: '<ng-include src="\'scripts/core/restore_wizard/steps/restore-plan.html\'"></ng-include>',
                isValid: restoreWizardModel.validateRestorePlan,
                validationError: $translate.instant('RESTORE_WIZARD.RESTORE_PLAN_STEP.VALIDATION_ERROR')
            },
            {
                class: '',
                isEnabled: false,
                stateIcon: zWizardStepStates.INITIAL,
                id: 'RESTORE_POINT',
                stepTitle: 'RESTORE POINT',
                template: '<ng-include src="\'scripts/core/restore_wizard/steps/restore-point.html\'"></ng-include>',
                isValid: restoreWizardModel.validateRestorePoint,
                validationError: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.VALIDATION_ERROR')
            },
            {
                class: '',
                isEnabled: false,
                stateIcon: zWizardStepStates.INITIAL,
                id: 'VM_SETTINGS',
                stepTitle: 'VM SETTINGS',
                template: '<ng-include src="\'scripts/core/restore_wizard/steps/restore-vm-settings.html\'"></ng-include>',
                isValid: restoreWizardModel.validateRestoreVmSettings,
                validationError: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.VALIDATION_ERROR')
            },
            {
                class: '',
                isEnabled: false,
                stateIcon: zWizardStepStates.INITIAL,
                id: 'SUMMARY',
                stepTitle: 'SUMMARY',
                template: '<ng-include src="\'scripts/core/restore_wizard/steps/restore-summary.html\'"></ng-include>',
                isValid: restoreWizardModel.validateRestoreSummary,
                validationError: ''
            }
        ];



        //===========================================================================
        // Utils
        //===========================================================================
        restoreWizardModel.createFullFromTotalObj = function(full,total) {
            return {
                filterValue: full,
                display : full  + '/' + total
            };
        };

        return restoreWizardModel;


    });
