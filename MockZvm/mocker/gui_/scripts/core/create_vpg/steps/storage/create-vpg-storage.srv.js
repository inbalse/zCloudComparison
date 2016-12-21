'use strict';

angular.module('zvmApp.core')
    .constant('destinationTypes', {
        datastore: 'Datastore',
        storagePod: 'StoragePod',
        vcdDatastore: 'VCDDatastore',
        rawDevice: 'RawDevice',
        existingDisk: 'ExistingDisk'
    })
    .service('createVpgStorageService', function (storageService, vpgService, vmsService, createVpgStorageGridService, editVolumesFactory, editVCDVolumesFactory, vos, destinationTypes) {

        var gridObj, createVpgStorageService = this;

        createVpgStorageService.init = function () {
            gridObj = createVpgStorageGridService.init();
        };

        createVpgStorageService.getStorageVolumes = function () {
            return storageService.getStorageVolumes();
        };

        createVpgStorageService.getGridObj = function () {
            return gridObj;
        };

        createVpgStorageService.isAws = function () {
            return vpgService.isAws();
        };

        createVpgStorageService.isAzure = function () {
            return vpgService.isAzure();
        };

        createVpgStorageService.isScvmm = function () {
            return vpgService.isScvmm();
        };

        createVpgStorageService.isVcdVapp = function () {
            return vpgService.isVcdVapp();
        };

        createVpgStorageService.isReverse = function () {
            return vpgService.isReverse();
        };

        createVpgStorageService.getVolumesTotalSize = function () {
            var result = 0;
            var storageVolumes = createVpgStorageService.getStorageVolumes();
            _.forEach(storageVolumes, function (vol) {
                result += vol.ProvisionedSizeInMB;
            });
            return result;
        };

        createVpgStorageService.getVolumesConfiguration = function (selectedItems) {
            var vpgSettings = vpgService.getVpgSettings();
            var initialConfig = angular.copy(vpgSettings.Config);
            var volumesStack = getVolumesStack(selectedItems);

            if (vpgService.isReverse()) {
                return editVolumesFactory.getVolumesConfigurationReverse(vpgService.getProtectionGroupId(), volumesStack, initialConfig);
            } else {
                return editVolumesFactory.getVolumesConfiguration(vpgService.getProtectionGroupId(), volumesStack, initialConfig);
            }
        };

        createVpgStorageService.getThinProvisionSupport = function () {
            var vpgSettings = vpgService.getVpgSettings();

            if (vpgService.isReverse()) {
                return editVCDVolumesFactory.getThinProvisionSupportReverse(
                    vpgService.getProtectionGroupId(),
                    vpgSettings.Config.RecoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter.Id,
                    vpgSettings.Config.OwnersId
                );
            } else {
                return editVCDVolumesFactory.getThinProvisionSupport(
                    vpgService.getProtectionGroupId(),
                    vpgSettings.Config.RecoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter.Id,
                    vpgSettings.Config.OwnersId
                );
            }
        };

        createVpgStorageService.findVmByVolume = function (volume) {
            var selectedVms = vmsService.getInitializedSelectedVms();
            return _.find(selectedVms, function (vm) {
                return vm.InternalVirtualMachineId.InternalVmName === volume.InternalVirtualMachineIdName;
            });
        };

        createVpgStorageService.setVolumes = function (newVolumeObj, selectedVolumes) {
            var storageVolumes = storageService.getStorageVolumes();
            _.each(selectedVolumes, function (editedVolume) {

                //find volume to edit
                var originalVolume = findVolumeInVolumesList(storageVolumes, editedVolume);

                var editedDestination = getVolumeReplicationDestination(newVolumeObj);
                var originalDestination = getVolumeReplicationDestination(originalVolume);
                if (!originalDestination) {
                    originalDestination =
                        originalVolume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination =
                            new vos.VolumeReplicationDestination();
                }

                //Settings are set based on result that returned on every source volume
                setReplicationDestination(newVolumeObj, originalVolume, editedDestination, originalDestination);

                // handle swap change
                if (angular.isDefined(newVolumeObj.Swap)) {
                    originalVolume.Swap =
                        originalVolume.InternalVolumeManagementSettings.Settings.IsSwap =
                            newVolumeObj.Swap;
                }
            });

            storageService.setStorageVolumes(storageVolumes);
        };

        function findVolumeInVolumesList(volumesList, wantedVolume) {
            return _.find(volumesList, function (volume) {
                return volume.InternalVirtualMachineIdName === wantedVolume.InternalVirtualMachineIdName &&
                    volume.InternalVolumeManagementSettings.DiskLocationParams.VolumeIdentifier === wantedVolume.InternalVolumeManagementSettings.DiskLocationParams.VolumeIdentifier;
            });
        }

        function hasThinProperty(key) {
            return key === destinationTypes.datastore || key === destinationTypes.storagePod || key === destinationTypes.vcdDatastore;
        }

        function setIsThinValue(volume, destType, newValue) {
            if (_.isNullOrUndefined(newValue)) {
                return;
            }
            var volumeRepDest = getVolumeReplicationDestination(volume);
            volume.Thin = volumeRepDest[destType].IsThin = newValue;
        }

        function setTheSameDestinationType(destType, newVolumeObj, originalVolume, editedDestination, originalDestination) {
            //change  only defined properties in result to originalVolume item
            if (hasThinProperty(destType)) {
                if (destType === destinationTypes.datastore && editedDestination[destType].TargetDatastore.InternalDatastoreName &&
                    editedDestination[destType].TargetDatastore.ServerIdentifier.ServerGuid) {

                    originalDestination[destType].TargetDatastore = angular.copy(editedDestination[destType].TargetDatastore);
                }
                if (destType === destinationTypes.storagePod && editedDestination[destType].StoragePod.InternalName &&
                    editedDestination[destType].StoragePod.ServerIdentifier.ServerGuid) {

                    originalDestination[destType].StoragePod = angular.copy(editedDestination[destType].StoragePod);
                }
                //VCDDatastore contains only IsThin Property
                setIsThinValue(originalVolume, destType, editedDestination[destType].IsThin);

            } else {
                if (destType === destinationTypes.rawDevice && editedDestination[destType].Device.InternalDeviceName &&
                    editedDestination[destType].Device.ServerIdentifier.ServerGuid) {

                    originalDestination[destType] = angular.copy(editedDestination[destType]);
                }
                if (destType === destinationTypes.existingDisk && (editedDestination[destType].SpecificDisk || editedDestination[destType].VMIdentifier)) {
                    originalDestination[destType] = angular.copy(editedDestination[destType]);
                }
                originalVolume.Thin = '';
            }
            originalVolume.TargetAddress = newVolumeObj.TargetAddress;
        }

        function setDifferentDestinationType(destType, newVolumeObj, originalVolume, editedDestination, originalDestination) {
            //create new replication destination in selected volume
            originalDestination[destType] = angular.copy(editedDestination[destType]);
            originalVolume.TargetAddress = newVolumeObj.TargetAddress;
            //what about case when mixed properties are applied to new replication dest?
            //if defined then use result, else use defalut - false
            if (hasThinProperty(destType)) {
                setIsThinValue(originalVolume, destType, editedDestination[destType].IsThin);
            } else {
                originalVolume.Thin = '';
            }
        }

        function setReplicationDestination(newVolumeObj, originalVolume, editedDestination, originalDestination) {
            _.each(editedDestination, function (property, key) {
                //originalVolume.Thin - designed to ease access for IsThin property in case of different replication targets
                if (!originalDestination[key] && editedDestination[key]) {
                    setDifferentDestinationType(key, newVolumeObj, originalVolume, editedDestination, originalDestination);
                }
                else if (originalDestination[key] && !editedDestination[key]) {
                    //delete previous rep destination
                    originalDestination[key] = undefined;
                }
                else if (originalDestination[key] && editedDestination[key]) {
                    setTheSameDestinationType(key, newVolumeObj, originalVolume, editedDestination, originalDestination);
                }
            });
        }

        function getVolumeReplicationDestination(volume) {
            return volume.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination;
        }

        function getVolumesStack(editedItems) {
            var volumesStack = [];
            _.forEach(editedItems, function (volume) {
                //VC target
                var vm = createVpgStorageService.findVmByVolume(volume);
                var manageSingleVolumeInfoInputParams = new vos.ManageSingleVolumeInfoInputParams(
                    volume.InternalVolumeManagementSettings.DiskLocationParams,
                    vm.TargetHost,
                    vm.TargetDatastore,
                    vm.InternalVirtualMachineId
                );
                volumesStack.push(manageSingleVolumeInfoInputParams);
            });
            return volumesStack;
        }

    });
