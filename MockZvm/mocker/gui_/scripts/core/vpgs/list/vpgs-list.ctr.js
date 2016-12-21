'use strict';
angular.module('zvmApp.core')
    .controller('vpgsListController', function ($scope, vpgsListModel, vpgsModel, zTabsStateConstants, vpgsActionsService, zNotificationService, zNotificationConstant) {
        //todo: there should be target type some day for remote site enum style icon
        var vpgsListCtrl = this;
        var statusFilterSubscriber = zNotificationService.getSubscriber(zNotificationConstant.STATUS_FILTER_CHANGE);
        var defaultQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_DEFAULT_QUERY);
        var personalQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_PERSONAL_QUERY);

        vpgsListCtrl.gridObj = {
            id: vpgsListModel.getGridId()
        };

        vpgsListCtrl.customOptions = {
            columns: vpgsListModel.getGridColumnsDefs(),
            defaultSortField: 'NameObj',
            defaultSortAsc: true,
            showSearch: true,
            numOfViews: 5
        };

        vpgsListCtrl.viewByValues = vpgsListModel.getGridDefaultViews();

        var onStatusFilterChange = function () {
            vpgsListCtrl.data = vpgsListModel.processData({ProtectionGroups : vpgsModel.getInitialItems()});
        };

        statusFilterSubscriber.promise.then(null, null, onStatusFilterChange);

        var runQuery = function (query) {
            // call the functions on the scope of z-slickgrid directive
            vpgsListCtrl.setSelectedGroup(query.groupBy);
            vpgsListCtrl.setSortColumn(query.sort.sortField, query.sort.sortAsc);
            vpgsListCtrl.setFilters(vpgsListModel.getGridColumnsDefs(), query.filters);
            vpgsListCtrl.gridObj.grid.updateData(vpgsListCtrl.data);
        };

        var runDefaultQuery = function () {
            var defaultQuery = {};
            defaultQuery.groupBy = null;
            defaultQuery.filters = [];
            defaultQuery.sort = {};
            defaultQuery.sort.sortField = vpgsListCtrl.customOptions.defaultSortField;
            defaultQuery.sort.sortAsc = vpgsListCtrl.customOptions.defaultSortAsc;
            runQuery(defaultQuery);
        };

        defaultQuerySubscriber.promise.then(null, null, runDefaultQuery);

        var runPersonalQuery = function (personalQuery) {
            runQuery(personalQuery);
        };

        personalQuerySubscriber.promise.then(null, null, runPersonalQuery);

        vpgsListCtrl.rowClick = function (e, row) {
            if (e.target.value) {
                e.preventDefault();
            }
            var vpg = vpgsListCtrl.gridObj.grid.getDataItem(row);

            vpgsActionsService.execute(vpg, e.target.value);
        };


        vpgsListCtrl.onMouseEnter = function (e, row, cell, grid) {
            e.preventDefault();
            e.stopPropagation();
            if (vpgsListCtrl.cellStatusHovered) {
                return;
            }

            if (cell !== grid.getColumnIndex('AlertStatus')) {
                return;
            }
            var dataItem, node;

            node = grid.getCellNode(row, cell);
            dataItem = grid.getDataItem(row);

            if (dataItem.AlertStatus === 0) {
                return;
            }

            vpgsListCtrl.cellStatusHovered = true;

            vpgsListCtrl.tooltipData = {
                node: node,
                alertTips: dataItem.AlertTips
            };

        };

        vpgsListCtrl.onMouseLeave = function (e) {
            e.preventDefault();
            e.stopPropagation();
            vpgsListCtrl.cellStatusHovered = false;
            vpgsListCtrl.tooltipData = null;
        };

        vpgsListCtrl.onVpgsReceived = function (result) {
            vpgsListCtrl.data = result;
        };

        vpgsListModel.register($scope).then(null, null, vpgsListCtrl.onVpgsReceived);

        $scope.$on('$destroy', function () {
            zNotificationService.unSubscribe(statusFilterSubscriber, zNotificationConstant.STATUS_FILTER_CHANGE, false);
            zNotificationService.unSubscribe(defaultQuerySubscriber, zNotificationConstant.RUN_DEFAULT_QUERY, false);
            zNotificationService.unSubscribe(personalQuerySubscriber, zNotificationConstant.RUN_PERSONAL_QUERY, false);
        });
    });

angular.module('zvmApp.directives').directive('alertsTooltip', function (reactDirective, AlertsTooltipComponentFactory) {
    return reactDirective(AlertsTooltipComponentFactory);
});
