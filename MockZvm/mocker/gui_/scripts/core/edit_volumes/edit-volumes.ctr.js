'use strict';

angular.module('zvmApp.core')
    .controller('editVolumesController', function ($scope, $translate, $filter, zAlertFactory, editVolumesFactory,
                                                   fileBrowseFactory, sharedVolumePotentials,
                                                   sharedVolumeProperties, dataCollectionFactory, enums, vpgService) {
        $scope.form = {};
        $scope.isPortal = vpgService.isZssp() || false;
        $scope.sharedVolumePotentials = sharedVolumePotentials;
        $scope.validFileExtensions = vpgService.isScvmm() ? ['vhd', 'vhdx'] : ['vmdk'];
        //raw disk mock...
        //var temp = new vos.RecoveryRawDeviceVisualObject();
        //temp.Destination = new vos.RawDeviceMappingVolumeReplicationDestination();
        //temp.Destination.Device = new vos.DeviceIdentifier('Internal Device Name', new vos.ServerIdentifier('GUID'));
        //temp.Destination.DeviceName = 'Device Name';
        //temp.Destination.DevicePath = 'Test Path';
        //temp.Destination.Mode = enums.VolumeMode.Flat;
        //temp.Destination.SizeInBytes = 2097152;
        //temp.Destination.SizeInKb = 2048;
        //temp.DisplayName = 'Test';
        //temp.IsEnabled = true;
        //$scope.sharedVolumePotentials.PotentialRawDevices.push(temp);

        $scope.sharedVolumeProperties = sharedVolumeProperties;
        $scope.volumeConfiguration = {};
        $scope.dataCollectionFactory = dataCollectionFactory;
        $scope.isScvmm = editVolumesFactory.isScvmm;
        $scope.isShowThinWarning = false;

        //region ========================== click events ==========================
        $scope.browse = function () {
            fileBrowseFactory.openWindow($scope.volumeConfiguration.datastore, $scope.sharedVolumeProperties, $scope.isScvmm).then($scope.onFileBrowseSave);
        };

        $scope.handleSaveClick = function () {
            //in case of Existing disk, we need to migrate properties
            if ($scope.isShowThinWarning) {
                zAlertFactory.warn($scope.translations['EDIT_VOLUMES.WARNING_TITLE'], $scope.translations['EDIT_VOLUMES.WARNING_DESCRIPTION'], $scope.save, [zAlertFactory.buttons.OK, zAlertFactory.buttons.CANCEL]);
            } else {
                doSave();
            }
        };

        $scope.save = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                doSave();
            } else {
                $scope.volumeConfiguration.thin = true;
                $scope.isShowThinWarning = false;
            }
        };

        function doSave() {
            if (parseInt($scope.volumeConfiguration.replicationDestinationType.value) === dataCollectionFactory.REPLICATION_TYPE.PRESEED.value) {
                $scope._initPreSeed($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, $scope.volumeConfiguration.datastore);
            }

            editVolumesFactory.save($scope.sharedVolumeProperties);
            $scope.close();
        }

        $scope.handleCancelClick = function () {
            $scope.close();
        };

        $scope.close = function () {
            editVolumesFactory.closeWindow('close');
        };
        //endregion

        //region ========================== change events ==========================
        $scope.onFileBrowseSave = function (result) {
            $scope.volumeConfiguration.preSeedText = result.path;
        };

        $scope.onReplicationDestinationChange = function () {

            $scope.isDataStoreEmpty = false;

            $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination = editVolumesFactory.helpers.newReplicationDestination();

            $scope.sharedVolumeProperties.TargetAddress = '';
            //find the kind
            switch (parseInt($scope.volumeConfiguration.replicationDestinationType.value)) {
                case dataCollectionFactory.REPLICATION_TYPE.DATASTORE.value:
                    $scope.onDatastoreChange($scope.volumeConfiguration.datastore);
                    break;
                case dataCollectionFactory.REPLICATION_TYPE.EXISTING.value:
                    if ($scope.sharedVolumePotentials.OptionalExistingDisk) {
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk = editVolumesFactory.helpers.newExistingDisk();
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk.VMIdentifier = $scope.sharedVolumePotentials.OptionalExistingDisk.ReplicationDestination.VMIdentifier;
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk.SpecificDisk = undefined;
                        $scope.volumeConfiguration.existing = $scope.sharedVolumeProperties.TargetAddress = $scope.sharedVolumePotentials.OptionalExistingDisk.DisplayName;
                    }
                    break;
                case dataCollectionFactory.REPLICATION_TYPE.NEW_DISK.value:
                    $scope.onRawDeviceChange($scope.volumeConfiguration.raw_device);
                    break;
                case dataCollectionFactory.REPLICATION_TYPE.PRESEED.value:
                    $scope._initPreSeed($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, $scope.volumeConfiguration.datastore);
                    if (_.isNullOrUndefined($scope.volumeConfiguration.datastore)) {
                        $scope.isDataStoreEmpty = true;
                    }
                    break;
            }

        };

        $scope.onDatastoreChange = function (newValue) {
            if (!newValue) {
                $scope.isDataStoreEmpty = true;
                return;
            }
            var rep_dest_type = parseInt($scope.volumeConfiguration.replicationDestinationType.value);

            if (newValue.Datastore) {
                if (rep_dest_type === dataCollectionFactory.REPLICATION_TYPE.DATASTORE.value) {
                    $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination = editVolumesFactory.helpers.newReplicationDestination();

                    if (newValue.Datastore.Id) {
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore = editVolumesFactory.helpers.newDatastore();
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore.TargetDatastore = newValue.Datastore.Id;
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore.IsThin = $scope.volumeConfiguration.thin;


                    } else if (newValue.Datastore.DatastoreClusterIdentifier) {
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.StoragePod = editVolumesFactory.helpers.newStoragePod();
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.StoragePod.StoragePod = newValue.Datastore.DatastoreClusterIdentifier;
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.StoragePod.IsThin = $scope.volumeConfiguration.thin;
                    }

                    $scope.sharedVolumeProperties.TargetAddress = newValue.Datastore.DisplayName;
                }
                if (rep_dest_type === dataCollectionFactory.REPLICATION_TYPE.PRESEED.value) {
                    $scope._initPreSeed($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, newValue);
                    $scope.sharedVolumeProperties.TargetAddress = newValue.Datastore.DisplayName + ' (' + $scope.volumeConfiguration.preSeedText + ')';
                }

                $scope.isDataStoreEmpty = false;
            }
        };

        $scope.onThinProvisionChange = function () {
            $scope.isShowThinWarning = $scope.initialThin && !$scope.volumeConfiguration.thin;
        };

        $scope.onRawDeviceChange = function (newValue) {
            if (!newValue) {
                return;
            }

            $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.RawDevice = editVolumesFactory.helpers.newRawDevice();
            $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.RawDevice = newValue.Destination;
            $scope.sharedVolumeProperties.TargetAddress = newValue.DisplayName;

        };
        //endregion     ===============================================================

        //region ========================== privates ==========================
        $scope._findDatastore = function (source, target) {
            if (source && target) {
                var found = _.find(source, function (item) {
                    if (target.Datastore && item.Datastore.Id) {
                        return item.Datastore.Id.ServerIdentifier.ServerGuid === target.Datastore.TargetDatastore.ServerIdentifier.ServerGuid && item.Datastore.Id.InternalDatastoreName === target.Datastore.TargetDatastore.InternalDatastoreName;
                    }
                    //DatastoreClusterIdentifier
                    if (target.StoragePod && item.Datastore.DatastoreClusterIdentifier) {
                        return item.Datastore.DatastoreClusterIdentifier.ServerIdentifier.ServerGuid === target.StoragePod.StoragePod.ServerIdentifier.ServerGuid && item.Datastore.DatastoreClusterIdentifier.InternalName === target.StoragePod.StoragePod.InternalName;
                    }
                });
                return found;
            }
        };

        $scope._findRawDevice = function (source, target) {
            if (source && target && target.RawDevice.Device.ServerIdentifier) {
                return _.find(source, function (item) {
                    return item.Destination && item.Destination.Device.ServerIdentifier.ServerGuid === target.RawDevice.Device.ServerIdentifier.ServerGuid &&
                        item.Destination.Device.InternalDeviceName === target.RawDevice.Device.InternalDeviceName &&
                        item.Destination.Mode === target.RawDevice.Mode;

                });
            }
        };

        $scope._findDatastoreWithDisk = function (source, target) {
            if (source && target && target.ExistingDisk.SpecificDisk.Datastore.ServerIdentifier) {
                return _.find(source, function (item) {
                    return item.Datastore.Id.ServerIdentifier.ServerGuid === target.ExistingDisk.SpecificDisk.Datastore.ServerIdentifier.ServerGuid && item.Datastore.Id.InternalDatastoreName === target.ExistingDisk.SpecificDisk.Datastore.InternalDatastoreName;
                });
            }
        };

        $scope._init = function () {
            $scope.volumeConfiguration.replicationDestinationType = undefined;

            var ref = $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination;
            if (ref) {
                $scope.initialThin = $scope.sharedVolumeProperties.IsSourceThinProvisioned;
                if (ref.ExistingDisk && ref.ExistingDisk.SpecificDisk && !ref.ExistingDisk.VMIdentifier) {
                    $scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.PRESEED;
                    $scope.volumeConfiguration.datastore = $scope._findDatastoreWithDisk($scope.sharedVolumePotentials.PotentialDatastores, ref);
                    $scope.volumeConfiguration.preSeedText = ref.ExistingDisk.SpecificDisk.VmdkPath;
                } else if (ref.Datastore) {
                    //note: we use "Storage" label for hyper-v, but it's the same object
                    $scope.volumeConfiguration.replicationDestinationType =
                        $scope.isScvmm ? dataCollectionFactory.SCVMM_REPLICATION_TYPE.STORAGE : dataCollectionFactory.REPLICATION_TYPE.DATASTORE;
                    $scope.volumeConfiguration.thin = ref.Datastore.IsThin;
                    $scope.volumeConfiguration.datastore = $scope._findDatastore($scope.sharedVolumePotentials.PotentialDatastores, ref);
                } else if (ref.StoragePod) {
                    $scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.SCVMM_REPLICATION_TYPE.STORAGE;
                    $scope.volumeConfiguration.thin = ref.StoragePod.IsThin;
                    $scope.volumeConfiguration.datastore = $scope._findDatastore($scope.sharedVolumePotentials.PotentialDatastores, ref);
                } else if (ref.ExistingDisk && ref.ExistingDisk.VMIdentifier) {
                    $scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.EXISTING;
                    $scope.volumeConfiguration.existing = ref.ExistingDisk.VMIdentifier.InternalVmName;
                } else if (ref.RawDevice) {
                    $scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.NEW_DISK;
                    $scope.volumeConfiguration.raw_device = $scope._findRawDevice($scope.sharedVolumePotentials.PotentialRawDevices, ref);
                }
            }
            $scope.volumeConfiguration.swap = $scope.sharedVolumeProperties.Swap;
        };

        $scope._initPreSeed = function (shortVolRepDest, datastoreVisualObject) {
            if (datastoreVisualObject) {
                shortVolRepDest.ExistingDisk = editVolumesFactory.helpers.newExistingDisk();
                /* the following parameter is an irregular enum which ori has requested to be set to 1 (RootedAtPreseedFolder) explicitly */
                shortVolRepDest.ExistingDisk.SearchFlags = 1;
                if (datastoreVisualObject.Datastore.DatastoreClusterIdentifier) {
                    shortVolRepDest.ExistingDisk.SpecificDisk.Datastore = angular.copy(datastoreVisualObject.Datastore.DatastoreClusterIdentifier);
                } else {
                    shortVolRepDest.ExistingDisk.SpecificDisk.Datastore = angular.copy(datastoreVisualObject.Datastore.Id);
                }
                if ($scope.isScvmm) {
                    shortVolRepDest.ExistingDisk.SpecificDisk.HypervisorType = enums.HypervisorType.Scvmm;
                    if ($scope.volumeConfiguration.preSeedText) {
                        $scope.volumeConfiguration.preSeedText = $scope.volumeConfiguration.preSeedText.replace(/\//g, '\\\\');
                    }
                } else {
                    shortVolRepDest.ExistingDisk.SpecificDisk.HypervisorType = enums.HypervisorType.VCenter;
                }
                shortVolRepDest.ExistingDisk.SpecificDisk.VmdkPath = $scope.volumeConfiguration.preSeedText;
                shortVolRepDest.ExistingDisk.SpecificDisk.VmdkMode = enums.VolumeMode.Flat;
                shortVolRepDest.ExistingDisk.VMIdentifier = undefined;
                $scope.sharedVolumeProperties.TargetAddress = datastoreVisualObject.Datastore.DisplayName;
            }
        };
        //endregion     ===============================================================


        $scope.processTranslations = function (translations) {
            $scope.translations = translations;
            $scope.saveButton = {
                label: $scope.translations['MODAL.OK'],
                handler: $scope.handleSaveClick,
                disabled: true
            };
            $scope.buttons = [
                {
                    label: $scope.translations['MODAL.CANCEL'],
                    class: 'btn btn-link',
                    handler: $scope.handleCancelClick,
                    disabled: false
                },
                $scope.saveButton
            ];

            if ($scope.isScvmm) {
                $scope.textLabel = $scope.translations['EDIT_VOLUMES.STORAGE'];
                $scope.replicationDest = 'ENUM.REPLICATION_DESTINATION_STORAGE_TYPES.';
                $scope.pathPlaceHolder = $scope.translations['EDIT_VOLUMES.PATH_SCVMN_PLACE_HOLDER'];
            } else {
                $scope.textLabel = $scope.translations['EDIT_VOLUMES.DATASTORE'];
                $scope.replicationDest = 'ENUM.REPLICATION_DESTINATION_TYPES.';
                $scope.pathPlaceHolder = $scope.translations['EDIT_VOLUMES.PATH_PLACE_HOLDER'];
            }

        };

        $translate(['MODAL.CANCEL', 'MODAL.OK', 'EDIT_VOLUMES.WARNING_TITLE', 'EDIT_VOLUMES.WARNING_DESCRIPTION', 'EDIT_VOLUMES.DATASTORE', 'EDIT_VOLUMES.STORAGE', 'EDIT_VOLUMES.PATH_PLACE_HOLDER', 'EDIT_VOLUMES.PATH_SCVMN_PLACE_HOLDER']).then($scope.processTranslations);

        $scope.loading = function () {
            return !$scope.sharedVolumeProperties && !$scope.sharedVolumePotentials && !$scope.translations;
        };

        $scope._init();

        $scope.watchers = {
            form: $scope.$watch('form.editVolume.$invalid', function (newValue) {
                if (angular.isDefined(newValue)) {
                    $scope.saveButton.disabled = newValue;
                }
            }, true),
            thin: $scope.$watch('volumeConfiguration.thin', function (newValue) {
                if (angular.isDefined(newValue)) {
                    if ($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore) {
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore.IsThin = newValue;
                    }

                    if ($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.StoragePod) {
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.StoragePod.IsThin = newValue;
                    }
                }
            }),
            swap: $scope.$watch('volumeConfiguration.swap', function (newValue) {
                if (angular.isDefined(newValue)) {
                    $scope.sharedVolumeProperties.Swap = $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.IsSwap = newValue;
                }
            }),
            preSeed: $scope.$watch('volumeConfiguration.preSeedText', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    if ($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk) {
                        $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk.SpecificDisk.VmdkPath = newValue;
                    }
                }
            })
        };

    });
