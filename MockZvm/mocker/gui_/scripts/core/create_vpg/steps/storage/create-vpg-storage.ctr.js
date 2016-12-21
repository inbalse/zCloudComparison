'use strict';

angular.module('zvmApp.core')
    .constant('createVPGStorageEvents', {
        changeTargetAddress: 'CreateVpgStorage::ChangeTargetAddress'
    })
    .controller('createVPGStorageController', function ($window, $scope, $translate, $filter, createVPGStorageEvents, enums, vos, zertoLoggerServiceFactory,
                                                        zAlertFactory, editVolumesFactory, editVCDVolumesFactory, createVpgStorageService) {
        var selectedVolumes = [];

        function resetData() {
            selectedVolumes = [];
        }

        function editSelected(itemsToEdit) {
            selectedVolumes = angular.copy(itemsToEdit);
            if (createVpgStorageService.isVcdVapp()) {
                createVpgStorageService.getThinProvisionSupport().then(onConfigResultVCD);
            } else if (!$scope.data.isPublicCloud) {
                createVpgStorageService.getVolumesConfiguration(selectedVolumes).then(onConfigResult);
            }
        }

        function onConfigResult(result) {
            editVolumesFactory.openWindow(result, selectedVolumes)
                .then(editDestinationSucceed, editDestinationFailed);
        }

        function onConfigResultVCD(result) {
            editVCDVolumesFactory.openWindow(result, selectedVolumes)
                .then(editDestinationSucceed, editDestinationFailed);
        }

        $scope.editSelectedClick = function () {
            editSelected($scope.data.selectedItems);
        };

        $scope.rowClick = function (e, row) {
            if (e.target.rel === createVPGStorageEvents.changeTargetAddress) {
                e.preventDefault();

                editSelected([$scope.data.gridObj.grid.getDataItem(row)]);
            }
        };

        function editDestinationSucceed(result) {
            createVpgStorageService.setVolumes(result, selectedVolumes);

            resetData();
            refreshValidations();

            $scope.data.gridObj.grid.updateData(createVpgStorageService.getStorageVolumes());
        }

        function editDestinationFailed(reason) {
            resetData();
            zertoLoggerServiceFactory.logError('getThinProvisionSupport or getVolumesConfiguration', null, reason);
        }

        function refreshValidations() {
            $scope.$emit('wizard:FormValidationChanged');
        }

        $scope.selectedItemsChange = function () {
            $scope.data.editSelectedDisabled = _.isEmpty($scope.data.selectedItems);
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        function initStorageStep() {
            $scope.data = {
                isAws: createVpgStorageService.isAws(),
                isAzure: createVpgStorageService.isAzure(),
                isPublicCloud: createVpgStorageService.isAzure() || createVpgStorageService.isAws(),
                volumesTotalSize: createVpgStorageService.getVolumesTotalSize(),
                selectedItems: [],
                editSelectedDisabled: true
            };

            createVpgStorageService.init();

            $scope.data.gridObj = createVpgStorageService.getGridObj();
        }

        initStorageStep();
    });
