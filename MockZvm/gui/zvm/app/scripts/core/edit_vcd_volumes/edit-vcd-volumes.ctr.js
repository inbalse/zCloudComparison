'use strict';

angular.module('zvmApp.core')
    .controller('editVCDVolumesController', function ($scope, $translate, $filter, zAlertFactory, enums,
                                                      fileBrowseFactory, editVCDVolumesFactory, sharedVolumePotentials,
                                                      vpgService, sharedVolumeProperties, dataCollectionFactory, vos) {   
        $scope.form = {};
        $scope.sharedVolumePotentials = sharedVolumePotentials;
        $scope.sharedVolumeProperties = sharedVolumeProperties;
        $scope.volumeConfiguration = {};
        $scope.dataCollectionFactory = dataCollectionFactory;
        $scope.isScvmm = vpgService.isScvmm();
        $scope.isShowThinWarning = false;
        $scope.validFileExtensions = $scope.isScvmm ? ['vhd', 'vhdx'] : ['vmdk'];

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
                $scope._initPreSeed($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination);
            }

            editVCDVolumesFactory.save($scope.sharedVolumeProperties);
            $scope.close();
        }

        $scope.handleCancelClick = function () {
            $scope.close();
        };

        $scope.close = function () {
            editVCDVolumesFactory.closeWindow('close');
        };
        //endregion     ===============================================================

        //region ========================== change events ==========================
        $scope.onFileBrowseSave = function (result) {
            $scope.volumeConfiguration.preSeedText = result.path;
            $scope.volumeConfiguration.preSeedDatastore = result.datastore;
        };

        $scope.onReplicationDestinationChange = function () {

            $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination = editVCDVolumesFactory.helpers.newReplicationDestination();

            $scope.sharedVolumeProperties.TargetAddress = '';
            //find the kind
            switch (parseInt($scope.volumeConfiguration.replicationDestinationType.value)) {
                case dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE.value:
                    $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore = editVCDVolumesFactory.helpers.newVCDDatastore();
                    $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore.IsThin = $scope.volumeConfiguration.thin;

                    break;
                case dataCollectionFactory.REPLICATION_TYPE.PRESEED.value:
                    $scope._initPreSeed($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, $scope.volumeConfiguration.datastore);
                    break;
            }

        };

        $scope.onThinProvisionChange = function () {
            $scope.isShowThinWarning = $scope.initialThin && !$scope.volumeConfiguration.thin;

        };
        //endregion     ===============================================================

        //region ========================== private ==========================
        $scope._initPreSeed = function (shortVolRepDest) {


            shortVolRepDest.ExistingDisk = editVCDVolumesFactory.helpers.newExistingDisk();
            /* the following parameter is an irregular enum which ori has requested to be set to 1 (RootedAtPreseedFolder) explicitly */
            shortVolRepDest.ExistingDisk.SearchFlags = 1;
            //todo: need to fill Datastore property from some source within VPGmodel
            //it looked like datastore is null when created
            shortVolRepDest.ExistingDisk.SpecificDisk.Datastore = $scope.volumeConfiguration.preSeedDatastore;

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

        };

        $scope._init = function () {
            $scope.volumeConfiguration.replicationDestinationType = undefined;

            var ref = $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination;
            if (ref) {
                $scope.initialThin = $scope.sharedVolumeProperties.IsSourceThinProvisioned;
                if (ref.ExistingDisk && ref.ExistingDisk.SpecificDisk && !ref.ExistingDisk.VMIdentifier) {
                    $scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.PRESEED;
                    $scope.volumeConfiguration.preSeedText = ref.ExistingDisk.SpecificDisk.VmdkPath;
                } else if (ref.VCDDatastore) {
                    $scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE;
                    $scope.volumeConfiguration.thin = ref.VCDDatastore.IsThin;
                }
            } else {
                $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination = new vos.VolumeReplicationDestination();
            }
            $scope.volumeConfiguration.swap = $scope.sharedVolumeProperties.Swap;
        };
        //endregion     ===============================================================

        $scope.loading = function () {
            return !$scope.sharedVolumeProperties && !$scope.sharedVolumePotentials && !$scope.translations;
        };

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
        };

        $translate(['MODAL.CANCEL', 'MODAL.OK', 'EDIT_VOLUMES.WARNING_TITLE', 'EDIT_VOLUMES.WARNING_DESCRIPTION']).then($scope.processTranslations);

        $scope._init();

        $scope.watchers = {
            form: $scope.$watch('form.editVolume.$invalid', function (newValue) {
                $scope.saveButton.disabled = newValue;
            }, true),
            thin: $scope.$watch('volumeConfiguration.thin', function (newValue) {
                if ($scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore) {
                    $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore.IsThin = newValue;
                }
            }),
            swap: $scope.$watch('volumeConfiguration.swap', function (newValue) {
                $scope.sharedVolumeProperties.Swap = $scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.IsSwap = newValue;
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
