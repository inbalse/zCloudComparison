'use strict';

angular.module('zvmApp.core')
    .factory('advancedVmReplicationSettingsModel', function ($filter, createVPGModel, zertoServiceFactory, objectTransformHelpersService, $q, $translate, busyOverlayService, vpgService) {
        var advancedVmReplicationSettingsModel = {};

        advancedVmReplicationSettingsModel.processData = function (data) {

            var processed = data;

            processed = _.forEach(processed, function (item) {
                advancedVmReplicationSettingsModel.processItem(item);
            });

            return processed;
        };

        advancedVmReplicationSettingsModel.processItem = function (item) {
            item.id = item.InternalVirtualMachineId.ServerIdentifier.ServerGuid + item.InternalVirtualMachineId.InternalVmName;
            if (item.TargetHost) {
                item.RecoveryHost = {
                    display: item.TargetHost.DisplayName,
                    value: item.TargetHost,
                    filterValue: item.TargetHost.DisplayName
                };
                item.RecoveryHostName = item.TargetHost.DisplayName;
            } else {
                item.RecoveryHost = {display: '', value: item.TargetHost, filterValue: ''};
                item.RecoveryHostName = '';
            }

            if (item.TargetDatastore) {
                item.RecoveryDatastore = {
                    display: item.TargetDatastore.DisplayName,
                    value: item.TargetDatastore,
                    filterValue: item.TargetDatastore.DisplayName
                };
                item.RecoveryDatastoreName = item.TargetDatastore.DisplayName;
            } else {
                item.RecoveryDatastore = {display: '', value: item.TargetDatastore, filterValue: ''};
                item.RecoveryDatastoreName = '';
            }

            item.JournalDatastores = item.JournalDatastores || [];

            if (item.JournalDatastores.length) {
                var journalDatastoresFilterResult = $filter('journalDatastoreGridLabelFilter')(item.JournalDatastores[0]);

                item.JournalDatastoresObj = {
                    display: journalDatastoresFilterResult,
                    value: item.JournalDatastores[0],
                    filterValue: journalDatastoresFilterResult
                };
            } else {
                item.JournalDatastoresObj = {display: null, filterValue: null, value: null};
            }

            item.JournalHardLimitObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalHardLimit),
                value: item.JournalHardLimit,
                filterValue: item.JournalHardLimit.Limit
            };
            item.JournalWarningThresholdObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalWarningThreshold),
                value: item.JournalWarningThreshold,
                filterValue: item.JournalWarningThreshold.Limit
            };
        };

        advancedVmReplicationSettingsModel.getPotentialJournalDatastores = function (VPGId, VPGConfig) {
            if (vpgService.isReverse()) {
                return zertoServiceFactory.GetPotentialDatastoresForJournalForReverseConfig(VPGId, VPGConfig);
            } else {
                return zertoServiceFactory.GetPotentialDatastoresForJournal(VPGId, VPGConfig);
            }
        };

        advancedVmReplicationSettingsModel.applyValueHardLimit = function (item, state) {
            item.JournalHardLimit = state;
            objectTransformHelpersService.JournalLimitTypeGBtoMB(item.JournalHardLimit);
            item.JournalHardLimitObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalHardLimit),
                value: item.JournalHardLimit,
                filterValue: item.JournalHardLimit.Limit
            };
        };

        advancedVmReplicationSettingsModel.applyValueWarningThreshold = function (item, state) {
            item.JournalWarningThreshold = state;
            objectTransformHelpersService.JournalLimitTypeGBtoMB(item.JournalWarningThreshold);
            item.JournalWarningThresholdObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalWarningThreshold),
                value: item.JournalWarningThreshold,
                filterValue: item.JournalWarningThreshold.Limit
            };
        };

        advancedVmReplicationSettingsModel.applyValueJournalDataStore = function (item, state) {
            if (state) {
                item.JournalDatastoresObj.display = state.DisplayName;
                item.JournalDatastoresObj.filterValue = $filter('journalDatastoreGridLabelFilter')(item.JournalDatastores[0]);
                item.JournalDatastores[0] = state;

            } else {
                item.JournalDatastoresObj.display = '';
                //Clear the array because of the test in line 281
                item.JournalDatastores.length = 0;
                item.JournalDatastoresObj.filterValue = '';
            }
            item.JournalDatastoresObj.value = state;


        };

        advancedVmReplicationSettingsModel.applyValueRecoveryHost = function (item, state) {
            if (state) {
                item.RecoveryHost.display = state.DisplayName;
                item.RecoveryHost.filterValue = state.DisplayName;
                item.RecoveryHostName = state.DisplayName;
            } else {
                item.RecoveryHost.display = '';
                item.RecoveryHost.filterValue = '';
                item.RecoveryHostName = '';
            }
            item.RecoveryHost.value = state;
            item.TargetHost = state;

        };

        advancedVmReplicationSettingsModel.applyValueRecoveryDatastore = function (item, state) {
            if (state) {
                item.RecoveryDatastore.display = state.DisplayName;
                item.RecoveryDatastoreName = state.DisplayName;
            } else {
                item.RecoveryDatastore.display = '';
                item.RecoveryDatastoreName = '';
            }
            item.RecoveryDatastore.value = state;
            item.TargetDatastore = state;

        };

        advancedVmReplicationSettingsModel.gridValid = function (vms, protectedGroupId, ownderId) {
            advancedVmReplicationSettingsModel.deferred = $q.defer();
            var resultString = '';
            var count = vms.length;
            var allVmsHaveSettings = true;

            var initRecoveryComputeResource = function initRecoveryComputeResource(result, vm) {
                if (!_.find(result.Datastores, function (datastore) {
                        if (vm.TargetDatastore && datastore.Datastore) {
                            if (_.isEqual(vm.TargetDatastore.Id, datastore.Datastore.Id)) {
                                return true;
                            }
                            if (vm.TargetDatastore.DatastoreClusterIdentifier && datastore.Datastore.DatastoreClusterIdentifier &&
                                _.isEqual(vm.TargetDatastore.DatastoreClusterIdentifier, datastore.Datastore.DatastoreClusterIdentifier)) {
                                return true;
                            }
                        }
                    })) {
                    resultString = resultString + '<li>In <b>' + vm.Name + $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.RECOVERY_DATASTORE') +
                        vm.TargetDatastore.DisplayName + $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.NOTEXIST') + vm.TargetHost.DisplayName + '</b></li>';
                }
                if (!_.find(result.Datastores, function (datastore) {
                        if (vm.JournalDatastores && vm.JournalDatastores[0]) {
                            if (_.isEqual(vm.JournalDatastores[0].Id, datastore.Datastore.Id)) {
                                return true;
                            }
                            if (_.isEqual(vm.JournalDatastores[0].DatastoreClusterIdentifier, datastore.Datastore.DatastoreClusterIdentifier)) {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    })) {
                    resultString = resultString + '<li>In <b>' + vm.Name + $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.JOURNAL_DATASTORE') +
                        vm.TargetDatastore.DisplayName + $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.NOTEXIST') + vm.TargetHost.DisplayName + '</b></li>';
                }
                count--;
                if (count === 0) {
                    if (resultString !== '') {
                        resultString = '<ul>' + resultString + '</ul>';
                    }
                    advancedVmReplicationSettingsModel.deferred.resolve(resultString);
                }
            };

            _.forEach(vms, function (vm) {
                if (!vm.TargetHost || !vm.TargetDatastore) {
                    resultString = $translate.instant('CREATE_VPG_REPLICATION.VM_SETTINGS_ERROR');
                    advancedVmReplicationSettingsModel.deferred.resolve(resultString);
                    allVmsHaveSettings = false;
                }
            });

            if (allVmsHaveSettings) {
                _.forEach(vms, function (vm) {
                    if (vpgService.isReverse()) {
                        zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(protectedGroupId, vm.TargetHost.BaseComputeResourceIdentifier).then(function (result) {
                            initRecoveryComputeResource(result, vm);
                        });
                    } else {
                        zertoServiceFactory.GetRecoveryComputeResource(protectedGroupId, ownderId, vm.TargetHost.BaseComputeResourceIdentifier).then(function (result) {
                            initRecoveryComputeResource(result, vm);
                        });
                    }
                });
            }

            return advancedVmReplicationSettingsModel.deferred.promise;
        };

        advancedVmReplicationSettingsModel.validateVms = function (vms, selectedVms) {
            var result = !!vms.length;

            _.some(selectedVms, function (selectedVm) {
                var found = _.find(vms, function (vm) {
                    var selecttedId = selectedVm.Id ? selectedVm.Id.InternalVmName : selectedVm.InternalVirtualMachineId.InternalVmName;
                    if (vm.InternalVirtualMachineId.InternalVmName === selecttedId) {
                        return true;
                    }
                });
                if (!found) {
                    result = false;
                }
            });
            _.some(vms, function (vm) {
                if (!vm.TargetDatastore || !vm.TargetHost) {
                    result = false;
                }
            });
            return result;
        };

        //create inner prop flag isDisabled for inline drop down
        var mappingDatastoresData = function (dsCollection) {
            _.each(dsCollection, function (ds) {
                ds.Datastore.isDisabled = !ds.IsEnabled;
            });

            return dsCollection;
        };

        advancedVmReplicationSettingsModel.getRecoveryComputeResource = function (vmSettings) {
            var deferred = $q.defer();

            function resultHandler(result) {
                busyOverlayService.removeFromBlacklist('GetRecoveryComputeResourceForReverseConfig');
                busyOverlayService.removeFromBlacklist('GetRecoveryComputeResource');
                result.Datastores = mappingDatastoresData(result.Datastores);

                var datastore = _.find(result.Datastores, function (datastore) {
                    if (vmSettings.TargetDatastore) {
                        return _.isEqual(vmSettings.TargetDatastore.Id, datastore.Datastore.Id);
                    }
                });

                if (datastore) {
                    vmSettings.RecoveryDatastore = {
                        display: datastore.Datastore.DisplayName,
                        value: datastore.Datastore,
                        filterValue: datastore.Datastore.DisplayName
                    };
                }

                deferred.resolve(result.Datastores);
            }

            busyOverlayService.addToBlacklist('GetRecoveryComputeResourceForReverseConfig');
            busyOverlayService.addToBlacklist('GetRecoveryComputeResource');

            if (vpgService.isReverse()) {
                zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(vpgService.getProtectionGroupId(), vmSettings.TargetHost.BaseComputeResourceIdentifier).then(resultHandler);
            } else {
                zertoServiceFactory.GetRecoveryComputeResource(vpgService.getProtectionGroupId(), vpgService.getTargetSite().OwnersId.Id, vmSettings.TargetHost.BaseComputeResourceIdentifier)
                    .then(resultHandler);
            }

            return deferred.promise;
        };

        advancedVmReplicationSettingsModel.gerPotentialJournalDatastoresForDropdownOptions = function (journalSettings) {
            var journalDs = [], deferred = $q.defer();
            var vpgSettings = vpgService.getVpgSettings();
            var defaultConfig = _.cloneDeep(vpgSettings.Config);
            defaultConfig.VirtualMachines = [journalSettings];

            function resultHandler(result) {
                journalDs = result;
                busyOverlayService.removeFromBlacklist('GetPotentialDatastoresForJournalForReverseConfig');
                busyOverlayService.removeFromBlacklist('GetPotentialDatastoresForJournal');

                result = mappingDatastoresData(result);

                if (result.length && journalSettings.JournalDatastores && journalSettings.JournalDatastores.length) {
                    var journalDatastore = _.find(result, function (datastore) {
                        return _.isEqual(journalSettings.JournalDatastores[0].Id, datastore.Datastore.Id);
                    });

                    if (journalDatastore) {
                        journalSettings.JournalDatastoresObj = {
                            display: journalDatastore.Datastore.DisplayName,
                            value: journalDatastore,
                            filterValue: journalDatastore.Datastore.DisplayName
                        };
                    }
                }

                deferred.resolve(journalDs);
            }

            busyOverlayService.addToBlacklist('GetPotentialDatastoresForJournalForReverseConfig');
            busyOverlayService.addToBlacklist('GetPotentialDatastoresForJournal');

            advancedVmReplicationSettingsModel.getPotentialJournalDatastores(vpgSettings.ProtectionGroupId, defaultConfig)
                .then(resultHandler);

            return deferred.promise;
        };

        return advancedVmReplicationSettingsModel;
    });
