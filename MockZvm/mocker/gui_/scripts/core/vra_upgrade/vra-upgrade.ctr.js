'use strict';
angular.module('zvmApp.core')
    .controller('vraUpgradeControllerPopup', function ($scope, $translate, zertoServiceFactory, zAlertFactory,
                                                       vraUpgradeFactory, selectedVra, latestVraVersion, mbToStringConvertorFilter, zSlickGridFilterTypes) {

        //==============================================================================================================
        //                    Variables
        //==============================================================================================================
        $scope.loading = false;
        $scope.vraUpgradeData = selectedVra;
        $scope.selectedItems = [];
        $scope.vraCount = 0;
        $scope.isShowGrid = false;
        $scope.latestVraVersion = latestVraVersion;
        $scope.translations = $translate.instant(['VRA_UPGRADE.BUTTONS.UPGRADE', 'VRA_UPGRADE.BUTTONS.CANCEL']);

        //==============================================================================================================
        //                    Grid Definition
        //==============================================================================================================
        var columnDefs = [
            {name: 'Host Name', id: 'DisplayName', field: 'DisplayName', filter: zSlickGridFilterTypes.WILDCARD},
            {name: 'VRA Name', id: 'VRAName', field: 'VRAName', filter: zSlickGridFilterTypes.WILDCARD},
            {
                name: 'Current  Version',
                id: 'CurrentVersion',
                field: 'CurrentVersion',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {name: 'Details', id: 'Details', field: 'Details', filter: zSlickGridFilterTypes.WILDCARD}
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true
        };

        //==============================================================================================================
        //                    User Interaction
        //==============================================================================================================

        $scope.save = function () {
            zAlertFactory.warn($translate.instant('VRA_UPGRADE.TITLE'), $translate.instant('VRA_UPGRADE.TEXT_ALERT_MODAL', {
                vraCount: selectedVra.length,
                latestVersion: latestVraVersion
            }), $scope._handleWarnModalClick);
        };

        $scope.close = function () {
            vraUpgradeFactory.close();
        };

        $scope._handleWarnModalClick = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {

                zertoServiceFactory.UpgradeVras($scope.getVraIdentifier()).then(null, function (error) {
                    zAlertFactory.fail($translate.instant('VRA_UPGRADE.TITLE'), error.faultString);
                }, null);

                $scope.close();
            }
        };

        //==============================================================================================================
        //                    Functions
        //==============================================================================================================
        $scope.getVraIdentifier = function () {
            var result = [];
            _.each($scope.selectedItems, function (item) {
                var hostIdentifier = {
                    ServerIdentifier: item.VraInfo.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier,
                    InternalHostName: item.VraInfo.HostInfo.BaseComputeResourceIdentifier.InternalName
                };
                result.push(hostIdentifier);
            });

            return result;
        };

        $scope.getSummerySyncSize = function () {
            var protectorCollection = 0;

            _.each($scope.selectedItems, function (item) {
                if (item.VraInfo && item.VraInfo.ProtectedCounters) {
                    protectorCollection += item.VraInfo.ProtectedCounters.StorageSizeInMB;
                }
            });

            $scope.totalDeltaSyncSize = mbToStringConvertorFilter(protectorCollection);
        };

        function buttonState() {
            $scope.saveButton.disabled = $scope.selectedItems.length === 0;
        }

        //==============================================================================================================
        //                    Watchers
        //==============================================================================================================

        $scope.selectedItemsChange = function () {
            $scope.vraCount = $scope.selectedItems.length;
            $scope.getSummerySyncSize();
            buttonState();
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        //==============================================================================================================
        //                    Init
        //==============================================================================================================

        $scope.initButtons = function () {
            $scope.saveButton = {
                label: $scope.translations['VRA_UPGRADE.BUTTONS.UPGRADE'],
                handler: $scope.save,
                disabled: true
            };
            $scope.buttons = [
                {
                    label: $scope.translations['VRA_UPGRADE.BUTTONS.CANCEL'],
                    class: 'btn btn-link',
                    handler: $scope.close,
                    disabled: false
                },
                $scope.saveButton
            ];
        };

        $scope.initButtons();
        $scope.isShowGrid = true;
        $scope.selectedItems = $scope.vraUpgradeData;
        buttonState();

        $scope.getSummerySyncSize();
    });
