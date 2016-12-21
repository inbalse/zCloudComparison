'use strict';

angular.module('zvmApp.core')
    .controller('selectVpgController', function ($scope, $translate, $filter, enums, selectVpgFactory, zSlickGridFilterTypes) {

        //===============================================================
        // init components
        //===============================================================
        $scope.item = {};
        $scope.loading = false;
        //===============================================================
        // user interaction
        //===============================================================
        $scope.handleSaveClicked = function () {
            selectVpgFactory.save($scope.item);
        };

        $scope.handleCancel = function () {
            selectVpgFactory.close();
        };

        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.handleCancel,
                disabled: false
            },
            {
                label: $translate.instant('MODAL.OK'),
                handler: $scope.handleSaveClicked,
                disabled: true
            }
        ];

        $scope.modifyList = function (data) {

            var index = 0;
            var modifiedList = [];
            _.each(data, function (item) {
                if ((item.Direction === enums.ProtectionGroupStateVisual.Protected || item.Direction === enums.ProtectionGroupStateVisual.SelfProtected) &&
                    item.Entities.Source !== enums.VpgEntityType.VCDvApp && 
                    item.State.ButtonsState.IsUpdateEnabled) {
                    item.id = index;
                    modifiedList.push(item);
                    index++;
                }
            });

            return modifiedList;
        };
        $scope.onVPGsListResult = function (data) {
            $scope.data = $scope.modifyList(data.ProtectionGroups);
        };

        $scope.selectedItems = [];

        $scope.onSelection = function () {
            if ($scope.selectedItems.length === 1) {
                $scope.item = $scope.selectedItems[0];
                $scope.buttons[1].disabled = false;
            }
            else {
                $scope.item = {};
                $scope.buttons[1].disabled = true;
            }

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        var columnDefs = [
            {
                name: $translate.instant('SELECT_VPG.GRID.VPG_NAME'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'Name'
            },
            {
                name: $translate.instant('SELECT_VPG.GRID.SOURCE_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'SourceSiteName'
            },
            {
                name: $translate.instant('SELECT_VPG.GRID.DIRECTION'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'Direction',
                formatter: $filter('enumToCssClassFormatter')('protection-group-state-visual')
            },
            {
                name: $translate.instant('SELECT_VPG.GRID.TARGET_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'TargetSiteName'
            },
            {
                name: $translate.instant('SELECT_VPG.GRID.SCRIPTS_DEFINED'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'AreScriptsDefined',
                formatter: $filter('enumToCssClassFormatter')('use-icon')
            },
            {
                name: $translate.instant('SELECT_VPG.GRID.BOOT_ORDER'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'BootOrder',
                formatter: $filter('enumToCssClassFormatter')('use-icon')
            }
        ];

        $scope.options = {
            columns: columnDefs,
            showCheckbox: true,
            showSearch: true
        };

        selectVpgFactory.getVPGsList().then($scope.onVPGsListResult);
    })
;
