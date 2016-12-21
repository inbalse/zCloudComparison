//TODO: merge isaws properly

'use strict';

angular.module('zvmApp.core')

    .factory('createVPGModel', function ($filter, zertoServiceFactory, dataCollectionFactory, vos, basil, busyOverlayService,
                                         objectTransformHelpersService, enums, $translate, $q, backupDailyConst, globalStateModel,
                                         zAlertFactory, createVPGHelperFactory, globalConstants, createVpgUserActions) {

            var createVPGModel = {};

            createVPGModel.reset = function () {

                createVPGModel.data = {
                    tmpVpgSettings: {
                        isTmp: true
                    },
                    copyNatRulesCollection: dataCollectionFactory.COPY_NAT_SERVICE_COLLECTION,
                    priority: enums.ProtectionGroupPriority.Medium,
                    RPOAlert: 1,
                    isSlaCustom: true
                };
            };

            createVPGModel.setVpgSettings = function (vpgSettings) {
                createVPGModel.data.defaultVpgSettings = vpgSettings;
            };

            createVPGModel.getTargetHostRecoveryComputeResource = function (vpgSettings, targetHost) {
                if (createVPGModel.isReverse()) {
                    return zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(vpgSettings.ProtectionGroupId, targetHost.ComputeResource.BaseComputeResourceIdentifier);
                } else {
                    return zertoServiceFactory.GetRecoveryComputeResource(vpgSettings.ProtectionGroupId, vpgSettings.Config.OwnersId, targetHost.ComputeResource.BaseComputeResourceIdentifier);
                }
            };

            createVPGModel.initSelectedZorg = function () {
                var potentialZertoOrganizations = createVPGModel.getPotentialZertoOrganization();
                if (potentialZertoOrganizations && potentialZertoOrganizations.length === 1) {
                    createVPGModel.setSelectedZorg(potentialZertoOrganizations[0]);
                    createVPGModel.data.defaultVpgSettings.Config.ZertoOrganizationIdentifier = potentialZertoOrganizations[0].Identifier;
                }
            };

            createVPGModel.getDefaultNetworkNone = function () {
                try {
                    return _.find(createVPGModel.getComputeResources().Networks, {'RecoveryOrganizationVCDOrgNetwork': null});
                }
                catch (e) {
                    return null;
                }
            };

            createVPGModel.valueValidate = function (data, type) {
                return type === 1 ? (data <= 1 ? 2 : data) : (data <= 0 ? 1 : data);
            };

            createVPGModel.appendBootOrderGroup = function (vms) {

                var groups = createVPGModel.getBootOrderGroups();

                _.forEach(vms, function (vm) {
                    if (!_.isNullOrUndefined(groups)) {
                        _.find(groups, function (group) {
                            _.find(group.Machines, function (machine) {
                                if (_.isEqual(machine.Id.InternalVmName, vm.Id.InternalVmName)) {
                                    vm.BootOrderGroup = group.Name;
                                }
                            });
                        });
                    } else {
                        vm.BootOrderGroup = 'Default';
                    }
                });
            };

            createVPGModel.initSourceSiteTypeCollection = function (value) {
                var sourceSiteType = createVPGModel.getSourceSiteType();
                if (!value && angular.isUndefined(sourceSiteType.sourceType)) {
                    return;
                }

                sourceSiteType = value.LocalVCDVapps.length ? {sourceType: enums.VpgEntityType.VCDvApp} : {sourceType: enums.VpgEntityType.VCVpg};
                createVPGModel.setSourceSiteType(sourceSiteType);
            };

            createVPGModel._applyNewHostSelection = function () {
                var initialSelectedVms = createVPGModel.getInitializedSelectedVms(),
                    computeResources = createVPGModel.getComputeResources();

                _.forEach(initialSelectedVms, function (vm) {
                    if (vm._isNewVm) {
                        createVPGModel._applyNewHostSelectionToVM(vm, computeResources);
                    }
                });
            };

            createVPGModel._applyNewHostSelectionToVM = function (vm, potentials) {
                if (!vm.potentialResource) {
                    vm.potentialResource = potentials;
                }

                if (vm.TargetDatastore) {
                    if (!createVPGHelperFactory.datastoreIsWithinHost(vm.TargetDatastore, potentials.Datastores)) {
                        vm.TargetDatastore = null;
                    }
                }

                _.forEach(vm.NetworkInterfaces, function (nic) {
                    if (nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork && !createVPGHelperFactory.networkIsWithinHost(nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork.Id, potentials.Networks)) {
                        nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork = null;
                    }

                    if (nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork && !createVPGHelperFactory.networkIsWithinHost(nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork.Id, potentials.Networks)) {
                        nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork = null;
                    }
                });

                if (vm.Volumes) {
                    _.forEach(vm.Volumes, function (vol) {
                        if (vol.InternalVolumeManagementSettings.Settings && vol.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination && !createVPGHelperFactory.volumeReplicationDestinationWithinHost(vol.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, potentials.Datastores, potentials.AssociatedRawDevices)) {
                            vol.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination = null;
                            vol.TargetAddress = '';
                        }
                    });

                }

            };

            createVPGModel.setSelectedDataStore = function () {
                if (createVPGModel.data.defaultVpgSettings.Config.Defaults.TargetDatastore) {
                    if (!_.find(createVPGModel.data.potentialResource.Datastores, function (datastore) {
                            if (datastore.Datastore.Id.InternalDatastoreName === createVPGModel.data.defaultVpgSettings.Config.Defaults.TargetDatastore.Id.InternalDatastoreName) {
                                return datastore;
                            }
                        })) {
                        createVPGModel.data.defaultVpgSettings.Config.Defaults.TargetDatastore = undefined;
                    }
                }

            };

            createVPGModel.preDoneValidations = function () {
                var errors = [];
                var result;
                if (createVPGModel.data.defaultVpgSettings.Config.Configuration.IsBackupEnabled &&
                    createVPGModel.data.defaultVpgSettings.Config.Configuration.Backup.Target.SelectedTarget &&
                    createVPGModel.data.defaultVpgSettings.Config.Configuration.Backup.Target.SelectedTarget.Identifier === globalConstants.NONE_REPOSITORY) {
                    errors.push($translate.instant('CREATE_VPG_BACKUP.ERROR_REP'));
                }

                if (errors.length) {
                    result = '<ul>';
                    _.forEach(errors, function (error) {
                        result = result + '<li>' + error + '</li>';
                    });
                    result = result + '</ul>';
                }
                return result;
            };

            createVPGModel.sendCreateVPG = function () {
                createVPGModel.checkDefaultFolder();

                //send it already
                return zertoServiceFactory.CreateProtectionGroup(createVPGModel.data.defaultVpgSettings.Config, createVPGModel.getCreateValidationFlags());
            };

            var sendUpdateDeferred;
            createVPGModel.sendUpdateVPG = function () {
                var removedVMListNames = createVPGModel._createRemovedVMList();
                createVPGModel.checkDefaultFolder();

                if (removedVMListNames.length > 0) {
                    var vmNames = removedVMListNames.join();
                    sendUpdateDeferred = $q.defer();
                    var message = '';

                    if (createVPGModel.data.targetSite.VirtualizationProviderType === enums.VpgEntityType.Aws) {
                        message = $translate.instant('CREATE_VPG.UPDATE_VPG_WITH_REMOVED_VMS_AWS', {VMNames: vmNames});
                        zAlertFactory.warn('Warning', message, createVPGModel._updateVPG, [zAlertFactory.buttons.OK, zAlertFactory.buttons.CANCEL]);
                    } else if (createVPGModel.data.targetSite.VirtualizationProviderType === enums.VpgEntityType.Azure) {
                        message = $translate.instant('CREATE_VPG.UPDATE_VPG_WITH_REMOVED_VMS_AWS', {VMNames: vmNames});
                        zAlertFactory.warn('Warning', message, createVPGModel._updateVPG, [zAlertFactory.buttons.OK, zAlertFactory.buttons.CANCEL]);
                    } else {
                        message = $translate.instant('CREATE_VPG.UPDATE_VPG_WITH_REMOVED_VMS', {VMNames: vmNames});
                        zAlertFactory.warn('Warning', message, createVPGModel._updateVPG, [zAlertFactory.buttons.YES, zAlertFactory.buttons.NO, zAlertFactory.buttons.CANCEL]);
                    }

                    return sendUpdateDeferred.promise;
                }
                else {
                    //send it already
                    return zertoServiceFactory.UpdateProtectionGroup(createVPGModel.getProtectionGroupId(),
                        createVPGModel.data.defaultVpgSettings.Config, createVPGModel.getEditValidationFlags());
                }
            };

            createVPGModel._updateVPG = function (event) {
                if (event.target.name === zAlertFactory.buttons.YES) {
                    createVPGModel.getEditValidationFlags().KeepUnprotectedDisks = true;
                }
                if (event.target.name !== zAlertFactory.buttons.CANCEL) {

                    zertoServiceFactory.UpdateProtectionGroup(createVPGModel.getProtectionGroupId(),
                        createVPGModel.data.defaultVpgSettings.Config, createVPGModel.getEditValidationFlags()).then(function (result) {
                        sendUpdateDeferred.resolve(result);
                    }, function (error) {
                        sendUpdateDeferred.reject(error);
                    });
                } else {
                    if (event.target.name === zAlertFactory.buttons.CANCEL) {
                        sendUpdateDeferred.reject(createVpgUserActions.REMOVE_VM_WARNING_DIALOG_CANCELED);
                    } else {
                        sendUpdateDeferred.reject();
                    }
                }
            };

            createVPGModel._createRemovedVMList = function () {
                var result = [];
                _.forEach(createVPGModel.getProtectedVms(), function (ProtectedVM) {
                    var find = _.find(createVPGModel.data.defaultVpgSettings.Config.VirtualMachines, function (vm) {
                        return _.isEqual(ProtectedVM.InternalVirtualMachineId, vm.InternalVirtualMachineId);
                    });

                    if (!find) {
                        result.push(ProtectedVM.Name);
                    }
                });

                return result;
            };

            createVPGModel._getNicProtectedIP = function (nic) {
                if (nic.FailoverSettings && nic.FailoverSettings.VCenterNetworkSettings && nic.FailoverSettings.VCenterNetworkSettings.IP) {
                    return nic.FailoverSettings.VCenterNetworkSettings.IP;
                } else if (nic.FailoverSettings && nic.FailoverSettings.VCDNetworkSettings && nic.FailoverSettings.VCDNetworkSettings && nic.FailoverSettings.VCDNetworkSettings.IP && nic.FailoverSettings.VCDNetworkSettings.IP.StaticIP) {
                    return nic.FailoverSettings.VCDNetworkSettings.IP.StaticIP;
                }
            };

            createVPGModel.savePublicCloudVMs = function (gridData) {
                _.forEach(createVPGModel.data.defaultVpgSettings.Config.VirtualMachines, function (vm) {
                    var gridVm;
                    gridVm = _.find(gridData, {'Name': vm.Name});
                    if (gridVm) {
                        _.assign(vm.CloudVmSettings, gridVm.CloudVmSettings);
                    }
                });
            };

            createVPGModel._updateStorageProfileForVM = function (vm) {

                //find storage volumes for provided vm
                var storageVolumesForVM = _.filter(createVPGModel.getStorageVolumes(), function (item) {
                    if (!_.isNullOrUndefined(item.InternalVirtualMachineIdName)) {
                        return _.isEqual(item.InternalVirtualMachineIdName, vm.InternalVirtualMachineId.InternalVmName);
                    }
                    return false;
                });

                _.forEach(storageVolumesForVM, function (item) {
                    item.VM = vm;
                });
            };

            createVPGModel.checkDefaultFolder = function () {
                var folder,
                    mockFolder = createMockFolder(),
                    targetSiteType = createVPGModel.getEntityTarget(),
                    targetFolder = createVPGModel.getTargetFolder();

                if (targetSiteType === enums.VpgEntityType.VCVpg) {
                    folder = targetFolder;
                } else if (targetSiteType === enums.VpgEntityType.HyperV) {
                    folder = targetFolder;
                    if (!folder) {
                        targetFolder = mockFolder;
                    }
                }

                if (!folder && (targetSiteType === enums.VpgEntityType.VCVpg || targetSiteType === enums.VpgEntityType.HyperV)) {

                    _.forEach(createVPGModel.data.defaultVpgSettings.Config.VirtualMachines, function (vm) {
                        if (!vm.TargetFolder) {
                            vm.TargetFolder = mockFolder;
                        }
                    });
                }

            };

            createVPGModel.checkOrgVirtualDatacenterExists = function () {
                try {
                    return !_.isNullOrUndefined(createVPGModel.getProtectedVappSettings().VCDVappSettings.OrgVirtualDatacenter);
                } catch (e) {
                    return false;
                }
            };

            createVPGModel.getTotalProvisionedSpace = function () {
                var selectedVms = createVPGModel.getSelectedVms();

                //total vms size summary step
                var number = 0;
                // if (_.isEmpty(selectedVms)) {
                _.each(selectedVms, function (vm) {
                    number += $filter('mbToStringReverseConvertorFilter')(vm.SizeInMb);
                });
                // } else if (_.isEmpty(createVPGModel.getSelectedVms())) { //if vcd vapp
                //     _.each(createVPGModel.data.selectedVcdVappVMs, function (vcdVm) {
                //         number += $filter('mbToStringReverseConvertorFilter')(vcdVm.SizeInMb);
                //     });
                // }

                return number;
            };

            createVPGModel.hasEmptyBootGroups = function () {
                var found = _.find(createVPGModel.getBootOrderGroups(), function (item) {
                    var machines = _.get(item, 'Machines', []);
                    return machines.length === 0;
                });
                return !!found;
            };

            createVPGModel.handleChangingDefaultValues = function () {
                var protectionGroupId = createVPGModel.getProtectionGroupId();

                //show warning about changing default values if it's edit vpg and this alert did not appear yet
                if (protectionGroupId && !createVPGModel.isDefaultValueChange && !basil.get('DoNotShowChangeDefaultValuesAlert')) {
                    zAlertFactory.warnCheck($translate.instant('CREATE_VPG_REPLICATION.INFO'), $translate.instant('CREATE_VPG_REPLICATION.CHANGING_DEFAULT_VALUES'),
                        changingDefaultValues, $translate.instant('CREATE_VPG_REPLICATION.DO_NOT_SHOW_AGAIN'), [zAlertFactory.buttons.OK], false);
                }
            };

            function changingDefaultValues(event) {
                if (event.selected) {
                    //do not show again this massage - until clean resources.
                    basil.set('DoNotShowChangeDefaultValuesAlert', true);
                }
                createVPGModel.data.isDefaultValueChange = true;
            }


            /*********************************
             * Refactor
             * */

            function createMockFolder() {
                var vmNoFolder = new vos.VmFolderVisualObject();
                vmNoFolder.DisplayName = 'no folder';
                vmNoFolder.Id = new vos.FolderIdentifier();
                vmNoFolder.Id.ServerIdentifier = new vos.ServerIdentifier();
                vmNoFolder.Id.InternalFolderName = 'no folder';
                vmNoFolder.Id.ServerIdentifier.ServerGuid = '00000000-0000-0000-0000-000000000000';

                return vmNoFolder;
            }

            //getters
            createVPGModel.getPotentialVms = function () {
                return createVPGModel.data.potentialVms || [];
            };

            createVPGModel.getConfigDefaults = function () {
                if (isVpgSettingsExist()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults;
                }
            };
            createVPGModel.getConfig = function () {
                if (createVPGModel.data.defaultVpgSettings) {
                    return createVPGModel.data.defaultVpgSettings.Config;
                }
            };
            createVPGModel.getVpgSettings = function () {
                if (!isVpgSettingsExist()) {
                    return createVPGModel.data.tmpVpgSettings;
                } else {
                    return createVPGModel.data.defaultVpgSettings;
                }
            };

            createVPGModel.getVcdVappSettings = function () {
                if (isVpgSettingsExist()) {
                    return createVPGModel.data.defaultVpgSettings.Config.RecoveryVappSettings.VCDVappSettings;
                }
            };

            createVPGModel.getTargetOrgVdc = function () {
                return createVPGModel.data.targetOrgvDC;
            };
            createVPGModel.setTargetOrgVdc = function (orgVdc) {
                createVPGModel.data.targetOrgvDC = orgVdc;
            };

            createVPGModel.setProtectionGroupId = function (id) {
                createVPGModel.data.protectionGroupId = id;
            };
            createVPGModel.getProtectionGroupId = function () {
                return createVPGModel.data.protectionGroupId;
            };


            createVPGModel.setPotentialVms = function (vms) {
                createVPGModel.data.potentialVms = vms;
            };

            createVPGModel.extendVpgSettings = function (vpgSettings) {
                if (_.isNullOrUndefined(createVPGModel.getVpgSettings())) {
                    createVPGModel.data.defaultVpgSettings = {};
                }
                _.extend(createVPGModel.data.defaultVpgSettings, vpgSettings);
            };

            //setters
            createVPGModel.setIsSourceVcd = function (value) {
                createVPGModel.data.isSiteSourceVcd = value;
            };

            createVPGModel.setConfigDefaultsByKey = function (key, value) {
                if (_.isNullOrUndefined(key)) {
                    return;
                }

                var defaults = createVPGModel.getConfigDefaults();
                defaults[key] = value;
            };

            createVPGModel.getEditValidationFlags = function () {
                return createVPGModel.data.editValidationFlags;
            };
            createVPGModel.setEditValidationFlags = function (editValidationFlags) {
                createVPGModel.data.editValidationFlags = editValidationFlags;
            };

            createVPGModel.getCreateValidationFlags = function () {
                return createVPGModel.data.createValidationFlags;
            };
            createVPGModel.setCreateValidationFlags = function (createValidationFlags) {
                createVPGModel.data.createValidationFlags = createValidationFlags;
            };

            createVPGModel.setPotentialMappingNetworks = function (potential) {
                createVPGModel.data.potentialMappingNetworks = potential;
            };
            createVPGModel.getPotentialMappingNetworks = function () {
                return createVPGModel.data.potentialMappingNetworks;
            };

            createVPGModel.setPotentialReverseMappingNetworks = function (potential) {
                createVPGModel.data.potentialReverseMappingNetworks = potential;
            };

            createVPGModel.getPotentialReverseMappingNetworks = function () {
                return createVPGModel.data.potentialReverseMappingNetworks;
            };

            createVPGModel.setVmsNicsList = function (nicsList) {
                createVPGModel.data.vmsNicsList = nicsList;
            };
            createVPGModel.getVmsNicsList = function () {
                return createVPGModel.data.vmsNicsList;
            };

            createVPGModel.setVmsVcdNicsList = function (nicsList) {
                createVPGModel.data.vmsVCDNicsList = nicsList;
            };
            createVPGModel.getVmsVcdNicsList = function () {
                return createVPGModel.data.vmsVCDNicsList;
            };


            //helpers
            createVPGModel.isVpgObjectExist = function () {
                return !_.isNullOrUndefined(createVPGModel.data.defaultVpgSettings);
            };
            createVPGModel.isVpgContainsVms = function () {
                var vms = _.get(createVPGModel, 'data.defaultVpgSettings.Config.VirtualMachines', []);
                return !_.isEmpty(vms);
            };
            createVPGModel.isReverse = function () {
                return createVPGModel.data.isReverseMode;
            };
            createVPGModel.setIsReverse = function (isReverse) {
                createVPGModel.data.isReverseMode = isReverse;
            };

            createVPGModel.setIsUsingVappNetworkMapping = function (isUsingVappNetworkMapping) {
                createVPGModel.data.isUsingVappNetworkMapping = isUsingVappNetworkMapping;
            };
            createVPGModel.isUsingVappNetworkMapping = function () {
                return createVPGModel.data.isUsingVappNetworkMapping;
            };
            createVPGModel.isSourceVcd = function () {
                return createVPGModel.data.isSiteSourceVcd;
            };

            createVPGModel.isVCDToVCD = function () {
                var vpgSettings = createVPGModel.getVpgSettings();

                return (vpgSettings.Entities.Target === enums.VpgEntityType.VCDvApp && vpgSettings.Entities.Source === enums.VpgEntityType.VCDvApp);
            };

            createVPGModel.isScvmm = function () {
                var targetSiteType = createVPGModel.getTargetSiteType();
                return _.isNullOrUndefined(targetSiteType) ? false : targetSiteType.value === enums.VpgEntityType.HyperV;
            };

            createVPGModel.isZssp = function () {
                return createVPGModel.data.isPortal;
            };

            createVPGModel.setIsZssp = function (isPortal) {
                createVPGModel.data.isPortal = isPortal;
            };
            createVPGModel.isInEditMode = function () {
                return createVPGModel.data.isEdit;
            };
            createVPGModel.setIsInEditMode = function (isEdit) {
                createVPGModel.data.isEdit = isEdit;
            };
            createVPGModel.isCompressionConfigurable = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.ConfigurationFlags.IsCompressionConfigurable;
                }
                catch (e) {
                    return false;
                }
            };
            createVPGModel.setWanCompression = function (value) {
                if (isVpgSettingsExist()) {
                    createVPGModel.data.defaultVpgSettings.Config.Configuration.WanCompression = value;
                } else {
                    createVPGModel.data.wanCompression = value;
                }
            };

            createVPGModel.getWanCompression = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.WanCompression;
                } catch (e) {
                    return createVPGModel.data.wanCompression;
                }
            };

            createVPGModel.isVcdVapp = function () {
                return createVPGModel.data.defaultVpgSettings.Entities.Target === enums.VpgEntityType.VCDvApp;
            };

            createVPGModel.isVCVpg = function () {
                return createVPGModel.data.defaultVpgSettings.Entities.Target === enums.VpgEntityType.VCVpg;
            };

            createVPGModel.isAws = function () {
                var targetSiteType = createVPGModel.getTargetSiteType();
                return _.isNullOrUndefined(targetSiteType) ? false : targetSiteType.value === enums.VpgEntityType.Aws;
            };

            createVPGModel.isAzure = function () {
                var targetSiteType = createVPGModel.getTargetSiteType();
                return _.isNullOrUndefined(targetSiteType) ? false : targetSiteType.value === enums.VpgEntityType.Azure;
            };

            createVPGModel.isVmFolderConfigurable = function () {
                return createVPGModel.data.defaultVpgSettings.ConfigurationFlags.IsVmFolderConfigurable;
            };

            createVPGModel.isStorageProfileEnabled = function () {
                return createVPGModel.data.defaultVpgSettings.ConfigurationFlags.IsStorageProfileEnabled;
            };

            function isVpgSettingsExist() {
                return !_.isNullOrUndefined(createVPGModel.data.defaultVpgSettings);
            }


            /**********
             * Setters & Getters
             * */
            createVPGModel.setSiteName = function (siteName) {
                createVPGModel.data.siteName = siteName;
            };
            createVPGModel.getSiteName = function () {
                return createVPGModel.data.siteName;
            };


            createVPGModel.setVpgName = function (name) {
                if (isVpgSettingsExist()) {
                    createVPGModel.data.defaultVpgSettings.Config.Name = name;
                } else {
                    createVPGModel.data.tmpVpgSettings.vpgName = name;
                }
            };
            createVPGModel.getVpgName = function () {
                if (isVpgSettingsExist()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Name;
                } else {
                    return createVPGModel.data.tmpVpgSettings.vpgName;
                }
            };

            createVPGModel.setPriority = function (priority) {
                if (isVpgSettingsExist()) {
                    createVPGModel.data.defaultVpgSettings.Config.Configuration.Priority = priority;
                } else {
                    createVPGModel.data.tmpVpgSettings.vpgPriority = priority;
                }
            };
            createVPGModel.getPriority = function () {
                if (isVpgSettingsExist()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.Priority;
                } else {
                    return createVPGModel.data.tmpVpgSettings.vpgPriority;
                }
            };

            createVPGModel.setSelectedVms = function (vms) {
                // if (isVpgSettingsExist()) {
                //     createVPGModel.data.defaultVpgSettings.Config.VirtualMachines = vms;
                // } else {
                createVPGModel.data.tmpVpgSettings.vms = vms;
                // }
            };
            createVPGModel.getSelectedVms = function () {
                // if (isVpgSettingsExist()) {
                //     return createVPGModel.data.defaultVpgSettings.Config.VirtualMachines;
                // } else {

                return createVPGModel.data.tmpVpgSettings.vms || [];
                // }
            };
            createVPGModel.addVmToSelectedVms = function (vm) {
                createVPGModel.data.defaultVpgSettings.Config.VirtualMachines.push(vm);
            };

            createVPGModel.getInitializedSelectedVms = function () {
                return _.get(createVPGModel, 'data.defaultVpgSettings.Config.VirtualMachines', []);
            };
            createVPGModel.setInitializedSelectedVms = function (selectedVms) {
                createVPGModel.data.defaultVpgSettings.Config.VirtualMachines = selectedVms;
            };

            createVPGModel.getProtectedVms = function () {
                //cannot be empty
                return createVPGModel.data.protectedVms;
            };
            createVPGModel.setProtectedVms = function (protectedVms) {
                createVPGModel.data.protectedVms = protectedVms;
            };


            createVPGModel.setSelectedVcdVapp = function (vapp) {
                createVPGModel.data.tmpVpgSettings.vapp = vapp;
            };
            createVPGModel.getSelectedVcdVapp = function () {
                return createVPGModel.data.tmpVpgSettings.vapp;
            };

            createVPGModel.setBootOrderGroups = function (groups) {
                if (isVpgSettingsExist()) {
                    createVPGModel.data.defaultVpgSettings.Config.Configuration.BootOrder.Groups = groups;
                } else {
                    createVPGModel.data.tmpVpgSettings.BootOrderGroups = groups;
                }
            };
            createVPGModel.getBootOrderGroups = function () {
                if (isVpgSettingsExist()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.BootOrder.Groups;
                } else {
                    return createVPGModel.data.tmpVpgSettings.BootOrderGroups;
                }
            };

            createVPGModel.setBootOrder = function (bootOrder) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.BootOrder.Groups = bootOrder;
            };

            createVPGModel.getSelectedZorg = function () {
                return createVPGModel.data.selectedZORG;
            };
            createVPGModel.setSelectedZorg = function (zorg) {
                createVPGModel.data.selectedZORG = zorg;
            };

            createVPGModel.setPotentialZertoOrganization = function (value) {
                var vpgSettings = createVPGModel.getVpgSettings();
                try {
                    vpgSettings.PotentialZertoOrganization = value;
                } catch (e) {
                }
            };

            createVPGModel.getPotentialZertoOrganization = function () {
                var vpgSettings = createVPGModel.getVpgSettings();
                try {
                    return vpgSettings.PotentialZertoOrganization;
                } catch (e) {
                    return [];
                }
            };

            createVPGModel.setTargetSite = function (target) {
                createVPGModel.data.targetSite = target;
            };
            createVPGModel.getTargetSite = function () {
                return createVPGModel.data.targetSite;
            };

            createVPGModel.getTargetSiteInfo = function () {
                return createVPGModel.data.defaultVpgSettings.TargetSiteInfo;
            };

            createVPGModel.getTargetSiteType = function () {
                return createVPGModel.data.targetSiteType;
            };
            createVPGModel.setTargetSiteType = function (siteType) {
                createVPGModel.data.targetSiteType = siteType;
            };

            createVPGModel.getSourceSiteType = function () {
                return createVPGModel.data.sourceSiteType;
            };
            createVPGModel.setSourceSiteType = function (siteType) {
                createVPGModel.data.sourceSiteType = siteType;
            };

            createVPGModel.getPotentialSiteTypes = function () {
                return createVPGModel.data.potenaialSiteTypes || [];
            };
            createVPGModel.setPotentialSiteTypes = function (siteTypes) {
                createVPGModel.data.potenaialSiteTypes = siteTypes;
            };

            createVPGModel.getTargetHost = function () {
                var vpgSettings = createVPGModel.getVpgSettings();

                try {
                    return vpgSettings.Config.Defaults.TargetComputeResource;
                }
                catch (e) {
                    return null;
                }
            };
            createVPGModel.setTargetHost = function (targetHost) {
                var vpgSettings = createVPGModel.getVpgSettings();
                try {
                    vpgSettings.Config.Defaults.TargetComputeResource = targetHost;
                }
                catch (e) {
                    return null;
                }
            };

            createVPGModel.getDefaultTargetDataStore = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults.TargetDatastore;
                } catch (e) {
                    return null;
                }
            };
            createVPGModel.setDefaultTargetDataStore = function (targetDataStore) {
                createVPGModel.data.defaultVpgSettings.Config.Defaults.TargetDatastore = targetDataStore;
            };

            createVPGModel.getPotentialTargetHosts = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.TargetSiteInfo.PotentialReplicationDestinations;
                } catch (e) {
                    return [];
                }
            };

            createVPGModel.getStorageVolumes = function () {
                return createVPGModel.data.storageVolumes;
            };
            createVPGModel.setStorageVolumes = function (storage) {
                if (storage) {
                    createVPGModel.data.storageVolumes = storage;
                }
            };

            createVPGModel.getComputeResources = function () {
                return createVPGModel.data.potentialResource;
            };
            createVPGModel.setComputeResources = function (computeResource) {
                createVPGModel.data.potentialResource = computeResource;
            };

            createVPGModel.getScriptingSettings = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.ScriptingSettings;
                }
                catch (e) {
                    return null;
                }
            };
            createVPGModel.setScriptingSettings = function (scriptingSettings) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.ScriptingSettings = scriptingSettings;
            };

            createVPGModel.getServiceProfile = function () {
                return isVpgSettingsExist() ? createVPGModel.data.defaultVpgSettings.Config.Configuration.ServiceProfile : null;
            };
            createVPGModel.getPotentialServiceProfiles = function () {
                return isVpgSettingsExist() ? createVPGModel.data.defaultVpgSettings.TargetSiteInfo.PotentialServiceProfiles : [];
            };

            createVPGModel.getInitialSitesInfo = function () {
                return createVPGModel.data.initialSitesInfo || {};
            };
            createVPGModel.setInitialSiteInfo = function (siteInfo) {
                createVPGModel.data.initialSitesInfo = siteInfo;
            };

            createVPGModel.getVCDVirtualDatacenters = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.TargetSiteInfo.VCDVirtualDatacenters;
                }
                catch (e) {
                    return [];
                }
            };

            createVPGModel.getDefaultFailoverNetwork = function () {
                if (createVPGModel.isVCDToVCD()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults.FailoverVCDVAppNetwork;
                } else if (createVPGModel.isVcdVapp()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults.FailoverVCDVAppNetwork || createVPGModel.getDefaultNetworkNone();
                }
                return createVPGModel.data.defaultVpgSettings.Config.Defaults.FailoverNetwork || createVPGModel.getDefaultNetworkNone();
            };

            createVPGModel.getDefaultTestNetwork = function () {
                if (createVPGModel.isVCDToVCD()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults.TestVCDVAppNetwork;
                } else if (createVPGModel.isVcdVapp()) {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults.TestVCDVAppNetwork || createVPGModel.getDefaultNetworkNone();
                }
                return createVPGModel.data.defaultVpgSettings.Config.Defaults.TestNetwork || createVPGModel.getDefaultNetworkNone();
            };

            createVPGModel.getJournalLengthInMinutes = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.MinimalJournalLenghtInMinutes;
                } catch (e) {
                    return 0;
                }
            };
            createVPGModel.setJournalLengthInMinutes = function (journal) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.MinimalJournalLenghtInMinutes = journal;
            };

            createVPGModel.getJournalSettings = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings;
                }
                catch (e) {
                    return null;
                }
            };
            createVPGModel.setJournalSettings = function (journalSettings) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings = journalSettings;
            };

            createVPGModel.getMinimalJournalLengthInMinutes = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.MinimalJournalLenghtInMinutes;
                }
                catch (e) {
                    return null;
                }

            };

            createVPGModel.getRPOThresholdInSeconds = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.RPOThressholdInSeconds;
                }
                catch (e) {
                    return null;
                }
            };
            createVPGModel.setRPOThresholdInSeconds = function (rpo) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.RPOThressholdInSeconds = rpo;
            };

            createVPGModel.getMaxTestIntervalInMinutes = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.MaxTestIntervalInMinutes;
                }
                catch (e) {
                    return null;
                }
            };

            createVPGModel.getIsBackupEnabled = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.IsBackupEnabled;
                }
                catch (e) {
                    return null;
                }

            };
            createVPGModel.setIsBackupEnabled = function (isBackupEnabled) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.IsBackupEnabled = isBackupEnabled;
            };

            createVPGModel.getSelectedTestPeriod = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.MaxTestIntervalInMinutes;
                }
                catch (e) {
                    return 0;
                }
            };

            createVPGModel.setSelectedTestPeriod = function (testPeriod) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.MaxTestIntervalInMinutes = testPeriod;
            };

            createVPGModel.setInitSingleSiteType = function (value) {
                createVPGModel.data.initSingleSiteType = value;
            };
            createVPGModel.getInitSingleSiteType = function () {
                return createVPGModel.data.initSingleSiteType;
            };

            createVPGModel.isCopyNatRulesAvailable = function () {
                return createVPGModel.data.copyNatRulesAvailable;
            };

            createVPGModel.isCopyNatServiceAvailable = function () {
                var config = createVPGModel.getConfig();
                return config.Configuration.CopyNatServiceAvailable;
            };

            createVPGModel.setCopyNatRulesAvailable = function (value) {
                createVPGModel.data.copyNatRulesAvailable = value;
            };

            createVPGModel.getJournalHardLimitPerVm = function () {
                return createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalHardLimitPerVM;
            };
            createVPGModel.getJournalWarningThresholdPerVM = function () {
                return createVPGModel.data.defaultVpgSettings.Config.Configuration.ManageJournalSettings.JournalWarningThresholdPerVM;
            };

            createVPGModel.initVpgSettings = function (vpgSettings) {
                vpgSettings.Config.Name = createVPGModel.data.tmpVpgSettings.vpgName;
                vpgSettings.Config.Configuration.Priority = createVPGModel.data.tmpVpgSettings.vpgPriority;
                //vpgSettings.Config.VirtualMachines = createVPGModel.data.tmpVpgSettings.vms;
                // vpgSettings.Config.ProtectedVappSettings = createVPGModel.data.tmpVpgSettings.vapp || null;
                vpgSettings.Config.Configuration.BootOrder.Groups = createVPGModel.data.tmpVpgSettings.BootOrderGroups;

                createVPGModel.data.defaultVpgSettings = vpgSettings;
                if (globalStateModel.siteName) {
                    createVPGModel.setSiteName(globalStateModel.siteName);
                }

                return vpgSettings;
            };
            createVPGModel.initDefaultFolderInHyperV = function () {
                //todo BE doesn't provide us with default folder in hyperV
                createVPGModel.data.defaultVpgSettings.Config.Defaults.TargetFolder = createMockFolder();
            };

            createVPGModel.getPublicCloudFailoverSettings = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings;
                }
                catch (e) {
                    return null;
                }
            };
            createVPGModel.getPublicCloudFailoverTestSettings = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings;
                } catch (e) {
                    return null;
                }
            };

            createVPGModel.getConfigurationFlags = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.ConfigurationFlags;
                } catch (e) {
                    return null;
                }
            };

            createVPGModel.getConfigurationBackup = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.Configuration.Backup;
                } catch (e) {
                    return null;
                }
            };

            createVPGModel.setConfigurationBackup = function (backup) {
                createVPGModel.data.defaultVpgSettings.Config.Configuration.Backup = backup;
            };

            createVPGModel.getRecoveryVappSettings = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.RecoveryVappSettings;
                } catch (e) {
                    return null;
                }
            };

            createVPGModel.getBackupTargetDetails = function () {
                return createVPGModel.data.backupTargetDetails;
            };

            createVPGModel.getIsSlaCustom = function () {
                return createVPGModel.data.isSlaCustom;
            };
            createVPGModel.setIsSlaCustom = function (isSlaCustom) {
                createVPGModel.data.isSlaCustom = isSlaCustom;
            };

            createVPGModel.getZertoOrganizationIdentifier = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Config.ZertoOrganizationIdentifier;
                }
                catch (e) {
                    return null;
                }
            };
            createVPGModel.setZertoOrganizationIdentifier = function (organizationIdentifier) {
                createVPGModel.data.defaultVpgSettings.Config.ZertoOrganizationIdentifier = organizationIdentifier;
            };

            createVPGModel.setBackupTargetDetails = function (backupDetails) {
                createVPGModel.data.backupTargetDetails = backupDetails;
            };

            createVPGModel.getCustomServiceProfile = function () {
                return createVPGModel.data.customServiceProfile;
            };
            createVPGModel.setCustomServiceProfile = function (customServiceProfile) {
                createVPGModel.data.customServiceProfile = customServiceProfile;
            };

            createVPGModel.getEntitySource = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Entities.Source;
                } catch (e) {
                    return null;
                }
            };
            createVPGModel.getEntityTarget = function () {
                try {
                    return createVPGModel.data.defaultVpgSettings.Entities.Target;
                } catch (e) {
                    return null;
                }
            };

            createVPGModel.setTargetSiteTypes = function (targetSiteTypes) {
                createVPGModel.data.targetSiteTypes = targetSiteTypes;
            };

            createVPGModel.getTargetSiteTypes = function () {
                return createVPGModel.data.targetSiteTypes;
            };


            createVPGModel.getVappIdentifier = function () {
                return createVPGModel.data.vappIdentifier;
            };
            createVPGModel.setVappIdentifer = function (id) {
                createVPGModel.data.vappIdentifier = id;
            };

            createVPGModel.getOptionalVmIdToAdd = function () {
                return createVPGModel.data.optionalVmIdToAdd;
            };
            createVPGModel.setOptionalVmIdToAdd = function (id) {
                createVPGModel.data.optionalVmIdToAdd = id;
            };

            createVPGModel.getProtectedVappSettings = function () {
                return createVPGModel.data.defaultVpgSettings.Config.ProtectedVappSettings;
            };
            createVPGModel.setProtectedVappSettings = function (settings) {
                createVPGModel.data.defaultVpgSettings.Config.ProtectedVappSettings = settings;
            };

            createVPGModel.setTargetDatastore = function (datastore) {
                createVPGModel.data.defaultVpgSettings.Config.Defaults.TargetDatastore = datastore;
            };

            createVPGModel.setTargetFolder = function (folder) {
                var vpgSettings = createVPGModel.getVpgSettings();
                vpgSettings.Config.Defaults.TargetFolder = folder;
            };

            createVPGModel.getTargetFolder = function () {
                var vpgSettings = createVPGModel.getVpgSettings();
                return vpgSettings.Config.Defaults.TargetFolder;
            };

            var isRejectedState = false;

            createVPGModel.getVpgDefaultSettingIsRejected = function () {
                return isRejectedState;
            };

            createVPGModel.setVpgDefaultSettingIsRejected = function (isRejected) {
                isRejectedState = isRejected;
            };

            return createVPGModel;
        }
    );
