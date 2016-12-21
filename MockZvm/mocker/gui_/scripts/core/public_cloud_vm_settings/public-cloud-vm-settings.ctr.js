'use strict';

angular.module('zvmApp.core')
    .controller('publicCloudVMSettingsController', function ($scope, vpgSettings, $translate, zAlertFactory,
                                                             $filter, publicCloudVmSettingsFactory,
                                                             publicCloudVmSettingsService,
                                                             publicCloudNetworkEditFactory,
                                                             publicCloudType, zNotificationService, zNotificationConstant) {

        $scope.data = {
            vpgSettings: vpgSettings
        };

        publicCloudVmSettingsService.setVpgSettingsState(vpgSettings);

        $scope.handleCancelClicked = function () {
            $scope.close();
        };
        $scope.handleSaveClicked = function () {
            publicCloudVmSettingsFactory.save($scope.gridData);
            $scope.close();
        };
        $scope.handleEditSelectedClick = function () {

            var editSelectedVms = [];
            _.forEach($scope.selectedItems, function (vm) {
                var result = _.find($scope.gridData, {Name: vm.Name});
                if (result) {
                    editSelectedVms.push(result);
                }
            });

            publicCloudNetworkEditFactory.open(editSelectedVms)
                .then(function (vms) {
                    if (vms) {
                        publicCloudVmSettingsService.saveDataInGrid(vms, $scope.selectedItems, $scope.gridData);
                        $scope.gridData = publicCloudVmSettingsService.processData($scope.gridData);
                        $scope.gridObj.grid.updateData($scope.gridData);
                    }
                });
        };

        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.handleCancelClicked,
                disabled: false
            },
            {label: $translate.instant('MODAL.OK'), handler: $scope.handleSaveClicked, disabled: false}
        ];
        $scope.gridObj = {};
        $scope.gridData = [];
        $scope.selectedItems = [];

        $scope.viewByValues = publicCloudVmSettingsService.getViewByValueDef();
        $scope.groupByValues = publicCloudVmSettingsService.getGroupByValueDef();
        $scope.customOptions = {
            columns: publicCloudVmSettingsService.getColumnsDefByPublicCloudType(publicCloudType),
            showSearch: true
        };

        $scope.close = function () {
            publicCloudVmSettingsFactory.modalInstance.dismiss('close');
        };
        $scope.selectedItemsChange = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        var subscriber = zNotificationService.getSubscriber(zNotificationConstant.PUBLIC_CLOUD_AZURE_AWS_NOTIFICATION);
        subscriber.promise.then(null, null, function (isValid) {
            $scope.buttons[1].disabled = isValid;
        });

        $scope.$on('$destroy', function () {
            zNotificationService.unSubscribe(subscriber, zNotificationConstant.PUBLIC_CLOUD_AZURE_AWS_NOTIFICATION);
        });

        function initPublicCloudVmSettings() {
            $scope.gridData = publicCloudVmSettingsService.processData($scope.data.vpgSettings.Config.VirtualMachines);
        }

        initPublicCloudVmSettings();
    });
