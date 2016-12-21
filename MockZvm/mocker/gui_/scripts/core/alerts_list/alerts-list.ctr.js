'use strict';

angular.module('zvmApp.core')
    .controller('alertsListController', function ($scope, $translate, $filter, $compile, $window, alertsListModel,
                                                  zertoServiceFactory, zSlickGridFilterTypes, siteSettingsFactory, zAlertFactory) {

        //==========================================================================
        //  Properties
        //==========================================================================
        var DESCRIPTION_FIELD = 'DescriptionObj',
            TIME_STAMP_FIELD = 'StartTimeObj';

        var columnDefs = [
            {
                name: '',
                maxWidth: 40,
                field: 'Level',
                formatter: $filter('enumToCssClassFormatter')('alerts-list-level-status'),
                hideFromEditColumns: true,
                resizable: false,
                headerCssClass: 'alerts-list-level-status-header'
            },
            {
                name: '',
                maxWidth: 40,
                field: 'IsDismissedObj',
                formatter: $filter('enumToCssWithTooltipClassFormatter')('alerts-list-dismiss-status'),
                hideFromEditColumns: true,
                resizable: false,
                headerCssClass: 'alerts-list-dismiss-header'
            },
            {
                name: 'Alert ID',
                field: 'HelpId',
                filter: zSlickGridFilterTypes.WILDCARD,
                formatter: $filter('linkFormatter')('HelpId', 'alertLink')
            },
            {
                name: 'Entity', field: 'AlertEntity', filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'Site Name', field: 'SiteName', filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'VPGs',
                field: 'EntitiesObj',
                formatter: $filter('linksFormatter'),
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'ZORG', field: 'Zorgs', filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'Timestamp',
                field: TIME_STAMP_FIELD,
                formatter: $filter('objectFormatter'),
                filter: zSlickGridFilterTypes.DATE
            },
            {
                name: 'Description',
                field: DESCRIPTION_FIELD,
                formatter: $filter('objectFormatter'),
                filter: zSlickGridFilterTypes.WILDCARD
            }
        ];

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            rowHeight: 40,
            showSearch: true,
            defaultSortField: TIME_STAMP_FIELD,
            defaultSortAsc: false

        };

        $scope.selectedItems = [];
        $scope.isDismissEnabled = false;
        $scope.isResetEnabled = false;
        $scope.gridObj = {};

        //==========================================================================
        //  User interaction
        //==========================================================================

        $scope.acknowledge = function () {
            zertoServiceFactory.DismissAlerts(_.pluck($scope.selectedItems, 'Id')).then(function () {

            }, function (result) {
                zAlertFactory.fail('Error',result.faultString);
            });
        };

        $scope.reset = function () {
            zertoServiceFactory.UndismissAlerts(_.pluck($scope.selectedItems, 'Id')).then(function () {

            },function(result){
                zAlertFactory.fail('Error',result.faultString);
            });
        };

        $scope.exportAlerts = function () {
            $window.open('/ZvmService/AlertReport/Alerts');
        };

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        //==========================================================================
        //  Description Event ...
        //==========================================================================
        //$($window).on('descriptionClicked', function (e, row) {
        // var item = $scope.data[row];
        //========TODO  Here need to pause auto updater =============//
        //});

        $scope.$on('$destroy', function () {
            $($window).off('descriptionClicked');
        });

        //==========================================================================
        //  Init
        //==========================================================================

        $scope.displayAcknowledgedChecked = alertsListModel.isDisplayAcknowledged;
        $scope.displayAcknowledgedCheckedChange = function () {
            alertsListModel.displayAcknowledged($scope.displayAcknowledgedChecked);
        };

        alertsListModel.register($scope).then(null, null, function (result) {
            $scope.data = result;
        });

        //grid event fire on row click
        $scope.rowClick = function (e, row, cell, grid) {
            if (cell === grid.getColumnIndex(DESCRIPTION_FIELD)) {
                e.preventDefault();
                e.stopPropagation();
                $compile($(e.target).closest('div'))($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        };

        $scope.enableDisableButtons = function () {
            $scope.isDismissEnabled = _.findIndex($scope.selectedItems, {IsDismissed: false}) !== -1;//existance of unacknowledged alert
            $scope.isResetEnabled = _.findIndex($scope.selectedItems, {IsDismissed: true}) !== -1;//existance of acknowledge alert
        };

        $scope.selectedItemsChange = function () {
            //if needed because some times grid is not defined
            if (angular.isDefined($scope.gridObj.grid)) {
                var indexes = $scope.gridObj.grid.getSelectedRows();
                $scope.selectedItems = _.map(indexes, function (index) {
                    return $scope.gridObj.grid.getDataItem(index);
                });
                $scope.enableDisableButtons();
            }
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
    });
