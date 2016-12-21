'use strict';

angular.module('zvmApp.core')
    .constant('JOURNAL_TYPES', {DAYS: 1, HOURS: 2})
    .constant('JOURNAL_TYPES_IN_MINUTES', {DAYS: 1440, HOURS: 60})
    .service('storageService', function (createVPGModel, createVPGHelperFactory, vos, dataCollectionFactory,
                                         zertoServiceFactory, repositoryTypeConvertorFilter, repositoryPathConvertorFilter, enums, objectTransformHelpersService, $translate, CONSTANT, JOURNAL_TYPES, JOURNAL_TYPES_IN_MINUTES) {

        var storageService = this;

        storageService.isStorageProfileEnabled = function () {
            return createVPGModel.isStorageProfileEnabled();
        };

        storageService.applyDefaultDatastore = function (vms, value) {
            _.forEach(vms, function (vm) {
                //_isDefaultsDatastoreCleared => to set cleared data by new chosen DATASTORE in EDIT mode
                if (!vm.TargetDatastore || vm._isNewVm || vm._isDefaultsDatastoreCleared) {
                    vm.TargetDatastore = value;
                }
                if (vm._isNewVm || vm._isDefaultsDatastoreCleared) {
                    if (!vm.JournalDatastores) {
                        vm.JournalDatastores = [];
                    }
                    vm.JournalDatastores[0] = value;

                    _.forEach(vm.Volumes, function (volume) {

                        volume.TargetAddress = value.DisplayName;

                        if (!volume.InternalVolumeManagementSettings.Settings || !volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination) {
                            volume.InternalVolumeManagementSettings.Settings = new vos.VolumeSettings();
                            volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination =
                                convertToDatastoreVolumeReplicationDestination(value, volume.IsSourceThinProvisioned);
                        } else {
                            volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination =
                                convertToDatastoreVolumeReplicationDestination(value, volume.IsSourceThinProvisioned);
                        }
                    });
                }

                vm._isVmBeenReset = false;
            });

            storageService.initVolumes(vms);
        };

        storageService.clearDefaultDatastore = function (vms) {
            _.forEach(vms, function (vm) {
                if (vm._isNewVm) {
                    vm.TargetDatastore = null;
                    vm.JournalDatastores = null;

                    _.forEach(vm.Volumes, function (volume) {
                        volume.TargetAddress = null;
                    });

                    //when change host in EDIT mode DATASTORE data is cleared
                    vm._isDefaultsDatastoreCleared = true;
                }
            });
        };

        storageService.initVolumes = function (vms) {
            if (createVPGModel.getTargetSiteType()) {
                initStorageVolumes(vms);
            }
        };

        storageService.applyDefaultFolder = function (vms, value) {
            var vpgSettings = createVPGModel.getVpgSettings();

            vpgSettings.Config.Defaults.TargetFolder = value;

            _.forEach(vms, function (vm) {
                storageService.applyFolder(vm, value);
            });
        };

        storageService.applyFolder = function (vm, value) {
            if (!vm.TargetFolder || vm._isNewVm) {
                vm.TargetFolder = value;
            }
        };

        storageService.vcdClearVMsVolumes = function (vms) {
            _.forEach(vms, function (vm) {
                _.forEach(vm.Volumes, function (volume) {
                    var volumeSettings = new vos.VolumeSettings();
                    volumeSettings.VolumeReplicationDestination = new vos.VolumeReplicationDestination();
                    volumeSettings.VolumeReplicationDestination.VCDDatastore = new vos.VCDDatastoreVolumeReplicationDestination();

                    volumeSettings.IsSwap = volume.InternalVolumeManagementSettings.Settings.IsSwap;

                    if (!_.isNullOrUndefined(volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination)) {
                        volumeSettings.VolumeReplicationDestination.VCDDatastore.IsThin = volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore.IsThin;
                    } else {
                        volumeSettings.VolumeReplicationDestination.VCDDatastore.IsThin = false;
                    }

                    volume.InternalVolumeManagementSettings.Settings = volumeSettings;
                });
            });

            storageService.initVolumes(vms);
        };

        storageService.getDefaultStorageProfileAndApply = function (ownersIdentifier, optionalProtectionGroupIdentifier, tagetVCDIdentifier, vmListIdentifier, shouldClear) {
            if (createVPGModel.isReverse()) {
                zertoServiceFactory.GetReverseInitialStorageProfilesForVms(ownersIdentifier, optionalProtectionGroupIdentifier, tagetVCDIdentifier, vmListIdentifier)
                    .then(function (result) {
                        applyDefaultStorageProfile(result, shouldClear);
                    });
            } else {
                zertoServiceFactory.GetInitialStorageProfilesForVms(ownersIdentifier, optionalProtectionGroupIdentifier, tagetVCDIdentifier, vmListIdentifier)
                    .then(function (result) {
                        applyDefaultStorageProfile(result, shouldClear);
                    });
            }
        };

        storageService.applyDefaultJournalLimits = function (vms) {
            var config = createVPGModel.getConfig(),
                serviceProfileIdentifier = createVPGModel.getServiceProfile(),
                journalHardLimit, journalWarningThreshold;

            if (serviceProfileIdentifier) {
                var serviceProfileId = serviceProfileIdentifier.SelectedIdentifier,
                    serviceProfile = storageService.getServiceProfileById(serviceProfileId);
            }

            _.forEach(vms, function (vm) {
                if (!vm._isNewVm) {
                    return;
                }

                // according to bug 27568
                if (serviceProfile) {
                    journalHardLimit = _createLimitForServiceProfile(serviceProfile.MaxJournalSize.MaxJournalSizeInPercent);
                    journalWarningThreshold = _createLimitForServiceProfile(serviceProfile.WarningThreshold.JournalWarningThresholdInPercent);
                } else {
                    journalHardLimit = config.Configuration.ManageJournalSettings.JournalHardLimitPerVM;
                    journalWarningThreshold = config.Configuration.ManageJournalSettings.JournalWarningThresholdPerVM;
                }

                vm.JournalHardLimit = journalHardLimit;
                vm.JournalWarningThreshold = journalWarningThreshold;
            });
        };

        storageService.applyDefaultJournalDatastore = function () {
            var vpgSettings = createVPGModel.getVpgSettings();

            var ds = [];
            if (vpgSettings.Config.Defaults.TargetDatastore) {
                ds = [vpgSettings.Config.Defaults.TargetDatastore];
            }
            if (vpgSettings.Config.Configuration.ManageJournalSettings.JournalDatastore) {
                ds = [vpgSettings.Config.Configuration.ManageJournalSettings.JournalDatastore];
            }
            _.forEach(vpgSettings.Config.VirtualMachines, function (vm) {
                if (vm._isNewVm) {
                    if (!vm.JournalDatastores || !vm.JournalDatastores.length) {
                        vm.JournalDatastores = ds;
                    }
                }
            });
        };

        storageService.initJournalObject = function (data, type) {
            var stepperValue;

            if (_.isNullOrUndefined(data) && _.isNullOrUndefined(type)) {
                return {
                    type: JOURNAL_TYPES.DAYS,
                    value: CONSTANT.JOURNAL_LIMITS[JOURNAL_TYPES.DAYS].min
                };
            }

            if (type) {
                var newJournalValue;
                if (type === JOURNAL_TYPES.DAYS) {
                    //user change journal type to days
                    newJournalValue = Math.floor(data / JOURNAL_TYPES_IN_MINUTES.HOURS);
                    stepperValue = (newJournalValue > CONSTANT.JOURNAL_LIMITS[JOURNAL_TYPES.DAYS].max) ? CONSTANT.JOURNAL_LIMITS[JOURNAL_TYPES.DAYS].min : newJournalValue;
                } else {
                    //user change journal type to days
                    newJournalValue = Math.floor(data / JOURNAL_TYPES_IN_MINUTES.DAYS);
                    stepperValue = (newJournalValue > CONSTANT.JOURNAL_LIMITS[JOURNAL_TYPES.HOURS].max) ? CONSTANT.JOURNAL_LIMITS[JOURNAL_TYPES.HOURS].min : newJournalValue;
                }
            } else {
                var isDaysSelected = data >= JOURNAL_TYPES_IN_MINUTES.DAYS;
                if (isDaysSelected) {
                    type = JOURNAL_TYPES.DAYS;
                    stepperValue = Math.floor(data / JOURNAL_TYPES_IN_MINUTES.DAYS);
                } else {
                    type = JOURNAL_TYPES.HOURS;
                    stepperValue = Math.floor(data / JOURNAL_TYPES_IN_MINUTES.HOURS);
                }
            }

            //validate min max value by type (days, hours)
            stepperValue = storageService.valueValidateForJournalHistory(stepperValue, type);

            return {
                type: type,
                value: stepperValue
            };
        };

        storageService.valueValidateForJournalHistory = function (data, type) {
            var selectedJournalLimits = CONSTANT.JOURNAL_LIMITS[type];
            return (data < selectedJournalLimits.min || data > selectedJournalLimits.max) ? selectedJournalLimits.min : data;
        };

        storageService.initServiceProfile = function (onlyProcess) {
            var serviceProfile = storageService.getServiceProfile();
            if (!_.isEmpty(serviceProfile)) {
                storageService.applyServiceProfile(serviceProfile.SelectedIdentifier, serviceProfile._overrideOnlyProccess ? false : onlyProcess);
            }
        };

        storageService.getServiceProfileById = function (serviceProfileId) {
            var potentials = createVPGModel.getPotentialServiceProfiles();
            return _.find(potentials, function (potential) {
                return _.isEqual(serviceProfileId, potential.Identifier);
            });
        };

        storageService.findDatastoreById = function (vpgSettings, potentials) {
            if (_.isNullOrUndefined(vpgSettings.Config.Defaults.TargetDatastore)) {
                return false;
            }

            return _.find(potentials.Datastores, function (datastore) {
                if (_.isNullOrUndefined(datastore.Datastore)) {
                    return false;
                }

                return createVPGHelperFactory.compareDatastoreObjects(vpgSettings.Config.Defaults.TargetDatastore, datastore);
                //
                // if (datastore.Datastore.Id &&
                //     _.isEqual(datastore.Datastore.Id, vpgSettings.Config.Defaults.TargetDatastore.Id)) {
                //     return true;
                // }
                // if (datastore.Datastore.DatastoreClusterIdentifier &&
                //     _.isEqual(datastore.Datastore.DatastoreClusterIdentifier, vpgSettings.Config.Defaults.TargetDatastore.DatastoreClusterIdentifier)) {
                //     return true;
                // }
                //
                // return false;
            });
        };

        storageService.setTargetDatastore = function (datastore) {
            createVPGModel.setTargetDatastore(datastore);
        };


        storageService.findTargetFolder = function (potentialsFolders, targetFolder) {
            return _.find(potentialsFolders, function (folder) {
                return _.isEqual(folder, targetFolder);
            });
        };

        storageService.getTargetFolder = function () {
            return createVPGModel.getTargetFolder();
        };

        storageService.setTargetFolder = function (folder) {
            createVPGModel.setTargetFolder(folder);
        };


        storageService.applyServiceProfile = function (serviceProfileId, onlyProcess) {
            if (_.isNullOrUndefined(serviceProfileId)) {
                return;
            }

            var vpgConfig = createVPGModel.getConfig().Configuration,
                selectedPotential = storageService.getServiceProfileById(serviceProfileId);

            storageService.setIsSlaCustom(selectedPotential.IsEditable);
            createVPGModel.data.serviceProfileName = selectedPotential.Name;
            createVPGModel.data.serviceProfile = selectedPotential;
            if (vpgConfig.ServiceProfile) {
                vpgConfig.ServiceProfile.SelectedIdentifier = selectedPotential.Identifier;
            }

            if (!onlyProcess) {
                _applyServiceProfileOnData(createVPGModel.data, selectedPotential);
                _applyServiceProfileLimits(createVPGModel.data.defaultVpgSettings, selectedPotential);
            }
        };

        storageService.toggleCustomServiceProfile = function (zorg) {

            var serviceProfiles = storageService.getPotentialServiceProfiles(),
                targetSiteInfo = createVPGModel.getTargetSiteInfo();
            if (!(targetSiteInfo)) {
                return;
            }

            var custom = _.findWhere(serviceProfiles, {Name: 'Custom'});
            if (zorg.EnableCustomProfile) {
                if (_.isNullOrUndefined(custom)) {  //Add previously removed custom zorg
                    serviceProfiles.push(storageService.getCustomServiceProfile());
                    return;
                }

                //Zorg already exist do nothing
                return;
            }

            if (!_.isNullOrUndefined(custom)) { //Remove zorg if custom is disabled
                storageService.setCustomServiceProfile(custom);
                var index = serviceProfiles.indexOf(custom);
                serviceProfiles.splice(index, 1);
            }

            //Do noting custom profile already removed
        };

        storageService.calculateMinimalJournalLengthInMinutes = function (type, value) {
            return type === JOURNAL_TYPES.DAYS ? (value * JOURNAL_TYPES_IN_MINUTES.DAYS) : (value * JOURNAL_TYPES_IN_MINUTES.HOURS);
        };

        storageService.getServiceProfile = function () {
            return createVPGModel.getServiceProfile();
        };
        storageService.getPotentialServiceProfiles = function () {
            return createVPGModel.getPotentialServiceProfiles();
        };

        storageService.getJournalHistoryObject = function () {
            return storageService.initJournalObject(createVPGModel.getJournalLengthInMinutes());
        };

        storageService.setJournalLengthInMinutes = function (journal) {
            createVPGModel.setJournalLengthInMinutes(journal);
        };
        storageService.getJournalLengthInMinutes = function () {
            return createVPGModel.getJournalLengthInMinutes();
        };

        storageService.getJournalHistoryTypes = function () {
            return dataCollectionFactory.MAINTAIN_HISTORY_TYPE;
        };
        storageService.createDefaultDataStore = function () {
            var ds = new vos.DatastoreVisualObject(null, 'Default', new vos.DatastoreIdentifier('default-datastore'));
            return new vos.PotentialDatastoreVisualObject(ds, true);
        };

        storageService.getJournalSettings = function () {
            return createVPGModel.getJournalSettings();
        };
        storageService.getJournalDataStore = function () {
            var journal = storageService.getJournalSettings();
            if (journal) {
                return journal.JournalDatastore;
            }
        };
        storageService.setJournalDataStore = function (ds) {
            var journal = storageService.getJournalSettings();
            journal.JournalDatastore = ds;
        };
        storageService.getMinimalJournalLengthInMinutes = function () {
            return createVPGModel.getMinimalJournalLengthInMinutes();
        };
        storageService.getRPOThresholdInSeconds = function () {
            return createVPGModel.getRPOThresholdInSeconds();
        };
        storageService.setRPOThresholdInSeconds = function (rpo) {
            createVPGModel.setRPOThresholdInSeconds(rpo);
        };
        storageService.getStorageTypes = function () {
            return {
                datastore: {
                    id: 'Id',
                    name: 'InternalDatastoreName'
                },
                cluster: {
                    id: 'DatastoreClusterIdentifier',
                    name: 'InternalName'
                }
            };
        };

        storageService.getConfigurationBackup = function () {
            return createVPGModel.getConfigurationBackup();
        };

        storageService.setConfigurationBackup = function (backup) {
            return createVPGModel.setConfigurationBackup(backup);
        };

        storageService.getBackupTargetDetails = function () {
            return createVPGModel.getBackupTargetDetails();
        };

        storageService.getSelectedBackupTargetDetails = function (backupTargetIdentifier, vpgId, ownersIdentifier, isReverse) {
            return zertoServiceFactory.GetBackupTarget(backupTargetIdentifier, vpgId, ownersIdentifier, isReverse).then(function (backupDetails) {
                backupDetails.RepositoryTypeText = repositoryTypeConvertorFilter(backupDetails.RepositoryType);
                backupDetails.PathText = repositoryPathConvertorFilter(backupDetails);
                backupDetails.pieData = setPieChartValues(backupDetails);
                createVPGModel.setBackupTargetDetails(backupDetails);
                return backupDetails;
            });
        };

        storageService.getJournalHardLimitPerVm = function () {
            return createVPGModel.getJournalHardLimitPerVm();
        };

        storageService.getJournalWarningThresholdPerVM = function () {
            return createVPGModel.getJournalWarningThresholdPerVM();
        };

        storageService.setJournalSettings = function (journalSettings) {
            createVPGModel.setJournalSettings(journalSettings);
        };

        storageService.getServiceProfileName = function () {
            return createVPGModel.data.serviceProfileName;
        };

        storageService.getIsBackupEnabled = function () {
            return createVPGModel.getIsBackupEnabled();
        };
        storageService.setIsBackupEnabled = function (isBackupEnabled) {
            createVPGModel.setIsBackupEnabled(isBackupEnabled);
        };

        storageService.getStorageVolumes = function () {
            return createVPGModel.getStorageVolumes();
        };
        storageService.setStorageVolumes = function (storageVolume) {
            createVPGModel.setStorageVolumes(storageVolume);
        };

        storageService.getDefaultTargetFolder = function () {
            var configDefaults = createVPGModel.getConfigDefaults();
            return configDefaults.TargetFolder;
        };

        storageService.getIsSlaCustom = function () {
            return createVPGModel.getIsSlaCustom();
        };
        storageService.setIsSlaCustom = function (isSlaCustom) {
            createVPGModel.setIsSlaCustom(isSlaCustom);
        };

        storageService.getCustomServiceProfile = function () {
            return createVPGModel.getCustomServiceProfile();
        };
        storageService.setCustomServiceProfile = function (customServiceProfile) {
            createVPGModel.setCustomServiceProfile(customServiceProfile);
        };

        storageService.getTargetOrgVdc = function () {
            return createVPGModel.getTargetOrgVdc();
        };
        storageService.setTargetOrgVdc = function (orgVdc) {
            createVPGModel.setTargetOrgVdc(orgVdc);
        };

        storageService.getVCDVirtualDatacenters = function () {
            return createVPGModel.getVCDVirtualDatacenters();
        };

        storageService.findAndSetTargetOrgvDC = function () {

            if (!createVPGModel.isVcdVapp()) {
                return;
            }

            var recoveryVappSettings = createVPGModel.getRecoveryVappSettings(),
                targetOrgvDC = _.find(storageService.getVCDVirtualDatacenters(), function (vdc) {
                    return _.isEqual(vdc.VirtualDatacenter.Id, recoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter.Id);
                });

            storageService.setTargetOrgVdc(targetOrgvDC);
        };

        storageService.getVCDPotentialVirtualDatacenterStorageProfiles = function (OwnersId, ProtectionGroupId, TargetVirtualDatacenter) {
            if (createVPGModel.isReverse()) {
                return zertoServiceFactory.GetReverseVCDPotentialVirtualDatacenterStorageProfiles(OwnersId, ProtectionGroupId, TargetVirtualDatacenter);
            } else {
                return zertoServiceFactory.GetVCDPotentialVirtualDatacenterStorageProfiles(OwnersId, ProtectionGroupId, TargetVirtualDatacenter);
            }
        };

        storageService.validateJournalLimits = function (updatedVms) {
            var limitsResult = '';
            _.forEach(updatedVms, function (vm) {
                var totalVolumeGB = createVPGHelperFactory.calculateTotalVolumesInGB([vm]);

                var checkHardLimit = _.cloneDeep(vm.JournalHardLimit);
                var checkSoftLimit = _.cloneDeep(vm.JournalWarningThreshold);
                objectTransformHelpersService.JournalLimitTypeMBtoGB(checkHardLimit);
                objectTransformHelpersService.JournalLimitTypeMBtoGB(checkSoftLimit);

                if (!createVPGHelperFactory.validateLimits(checkHardLimit, checkSoftLimit, totalVolumeGB)) {
                    limitsResult = limitsResult + '<li>VM ' + vm.Name + ': ' + $translate.instant('ADVANCED_JOURNAL_SETTINGS.LIMIT_ERROR') + '</li>';
                }
            });
            return limitsResult;
        };

        function _applyServiceProfileLimits(vpgSettings, selectedPotential) {
            var hardLimit = _createLimitForServiceProfile(selectedPotential.MaxJournalSize.MaxJournalSizeInPercent);
            var softLimit = _createLimitForServiceProfile(selectedPotential.WarningThreshold.JournalWarningThresholdInPercent);

            // updating default vpg values
            vpgSettings.Config.Configuration.ManageJournalSettings.JournalHardLimitPerVM = hardLimit;
            vpgSettings.Config.Configuration.ManageJournalSettings.JournalWarningThresholdPerVM = softLimit;

            var anyHardLimitWouldGetSmaller = _.some(vpgSettings.Config.VirtualMachines, function (vm) {
                return _isNewLimitSmaller(hardLimit, vm.JournalHardLimit);
            });

            _.each(vpgSettings.Config.VirtualMachines, function (vm) {
                vm.JournalHardLimit = hardLimit;
                vm.JournalWarningThreshold = softLimit;
            });

            return anyHardLimitWouldGetSmaller;
        }

        function _isNewLimitSmaller(newLimit, oldLimit) {
            return (newLimit && oldLimit &&
            ( (oldLimit.Type === enums.JournalLimitType.Unlimited && newLimit.Type !== enums.JournalLimitType.Unlimited) ||
            (oldLimit.Type !== enums.JournalLimitType.Unlimited && oldLimit.Type === newLimit.Type && oldLimit.Limit > newLimit.Limit) ));
        }

        function _createLimitForServiceProfile(value) {
            var limit = new vos.JournalLimitVisualObject();
            if (value > 0) {
                limit.Type = enums.JournalLimitType.Percentage;
                limit.Limit = value;
            } else {
                limit.Type = enums.JournalLimitType.Unlimited;
            }
            return limit;
        }

        function _applyServiceProfileOnData(data, selectedPotential) {
            //vpgConfig.Priority = selectedPotential.Priority.Priority;
            var vpgConfig = data.defaultVpgSettings.Config.Configuration;
            vpgConfig.RPOThressholdInSeconds = selectedPotential.Rpo.RpoInSeconds;
            vpgConfig.MinimalJournalLenghtInMinutes = selectedPotential.History.HistoryInMinutes;
            createVPGModel.data.defaultJournal = storageService.initJournalObject(vpgConfig.MinimalJournalLenghtInMinutes);
            vpgConfig.MaxTestIntervalInMinutes = selectedPotential.TestInterval.TestIntervalInMinutes;
            vpgConfig.Backup.DeleteBackup.RestorePointRange = selectedPotential.RestorePointRange.RestorePointRange;
            if (data.defaultVpgSettings.TargetSiteInfo && data.defaultVpgSettings.TargetSiteInfo.PotentialBackupTargets) {
                var defaultRepo = _.find(data.defaultVpgSettings.TargetSiteInfo.PotentialBackupTargets, {'IsDefault': true});
                if (defaultRepo) {//set the default if exist
                    vpgConfig.Backup.Target.SelectedTarget = {Identifier: defaultRepo.Identifier.Identifier};
                }
            }
            var backupEnabled = selectedPotential.RetentionPolicy.RetentionPolicy === enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended;
            vpgConfig.IsBackupEnabled = backupEnabled;
            if (backupEnabled) {
                vpgConfig.Backup.Scheduler.RunningTime.SchedulePeriodType = selectedPotential.BackupScheduledPeriod.SchedulePeriodType;

                if (vpgConfig.Backup.Scheduler.RunningTime.SchedulePeriodType === enums.SchedulePeriodType.Daily) {
                    vpgConfig.Backup.Scheduler.RunningTime.DayOfWeek = enums.DayOfWeek.Saturday;
                } else {
                    vpgConfig.Backup.Scheduler.RunningTime.DayOfWeek = selectedPotential.BackupScheduledPeriod.DayOfWeek;
                }

            }
        }

        function applyDefaultStorageProfile(storageProfiles, shouldClear) {
            var initializedSelectedVms = createVPGModel.getInitializedSelectedVms();
            _.forEach(storageProfiles, function (storageProfile) {

                var vm = _.find(initializedSelectedVms, function (vmItem) {
                    return _.isEqual(vmItem.InternalVirtualMachineId.InternalVmName, storageProfile.VmIdentifier.InternalVmName);
                });

                if (shouldClear || vm && (!vm.StorageProfile || !vm.StorageProfile.VCDStorageProfile)) {
                    vm.StorageProfile = new vos.VPGDetailsStorageProfileVisualObject();
                    vm.StorageProfile.VCDStorageProfile = storageProfile.VCDVirtualDatacenterStorageProfileVisualObject;
                }
            });
        }

        function initStorageVolumes(vms) {
            var volumeIndex = 0;
            var volumesList = [];

            _.forEach(vms, function (vm) {
                _.forEach(vm.Volumes, function (volume) {

                    var volumeSettings = volume.InternalVolumeManagementSettings.Settings || new vos.VolumeSettings();

                    var volumeDest = volumeSettings.VolumeReplicationDestination;
                    //only if you already have volumeSettings
                    if (volumeDest) {
                        if (volumeDest.Datastore) {
                            volume.Thin = volumeDest.Datastore.IsThin;
                        }
                        if (volumeDest.StoragePod) {
                            volume.Thin = volumeDest.StoragePod.IsThin;
                        }
                        if (volumeDest.VCDDatastore) {
                            volume.Thin = volumeDest.VCDDatastore.IsThin;
                        }
                    }

                    volume.id = volumeIndex;
                    volume.Index = volumeIndex;
                    volume.VMName = vm.Name;
                    volume.InternalVirtualMachineIdName = vm.InternalVirtualMachineId.InternalVmName;

                    volumesList.push(volume);

                    volumeIndex++;
                });
            });

            storageService.setStorageVolumes(volumesList);
        }

        function convertToDatastoreVolumeReplicationDestination(datastoreVisualObject, isThin) {
            var result = new vos.VolumeReplicationDestination();

            if (datastoreVisualObject.Id) {
                result.Datastore = new vos.DatastoreVolumeReplicationDestination(isThin, datastoreVisualObject.Id);

            } else if (datastoreVisualObject.DatastoreClusterIdentifier) {
                result.StoragePod = new vos.StoragePodVolumeReplicationDestination(isThin, datastoreVisualObject.DatastoreClusterIdentifier);
            }
            return result;
        }

        function setPieChartValues(backupDetails) {
            if (backupDetails.FreeSpace === 0 && backupDetails.Capacity === 0) {
                return [];
            }
            var freeSpacePercent = Math.floor((backupDetails.FreeSpace * 100) / backupDetails.Capacity);
            var usedPercent = 100 - freeSpacePercent;
            return [
                {
                    'chunk': freeSpacePercent,
                    'label': freeSpacePercent + '%'
                },
                {
                    'chunk': usedPercent,
                    'label': usedPercent + '%'
                }
            ];
        }

    });
