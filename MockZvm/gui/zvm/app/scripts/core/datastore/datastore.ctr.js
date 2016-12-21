'use strict';
angular.module('zvmApp.core')
    .controller('datastoreController', function ($scope, datastoreModel, $filter, zSlickGridFilterTypes, $window, siteSettingsFactory) {

        var columnDefs = [
            {name: 'Datastore',         field: 'DisplayName',               filter: zSlickGridFilterTypes.WILDCARD,     views: ['General', 'Workload Protection']},
            {name: 'Alert Status',      field: 'AlertStatus', views: ['General', 'Workload Protection'], filter: zSlickGridFilterTypes.MULTI_SELECT, minWidth: 40, maxWidth: 40,  formatter: $filter('enumToCssWithTooltipClassFormatter')('datastore-alert-status'), headerCssClass: 'protection-group-alert-status-header'},
            {name: 'Status',            field: 'Status',                    filter: zSlickGridFilterTypes.MULTI_SELECT},
            {name: 'Device',            field: 'Device',                    filter: zSlickGridFilterTypes.WILDCARD,     views: ['General']},
            {name: 'Cluster',           field: 'Cluster',                   filter: zSlickGridFilterTypes.WILDCARD,     views: ['General']},
            {name: 'Total Usage / Capacity (GB)',  field: 'TotalUsage',                filter: zSlickGridFilterTypes.RANGE,        views: ['General', 'Workload Protection'], formatter: $filter('storageFormatter')},
            {name: 'DR Usage / Capacity (GB)',     field: 'DRUsage',                   filter: zSlickGridFilterTypes.RANGE,        views: ['General'],             formatter: $filter('storageFormatter')},
            {name: 'Type',              field: 'TypeOfDatastore',           filter: zSlickGridFilterTypes.MULTI_SELECT, views: ['Workload Protection']},
            {name: 'Recovery Size',     field: 'RecoveryVolsSize',          filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,        views: ['Workload Protection'],    formatter: $filter('objectFormatter')},
            {name: 'Journal Size',      field: 'JournalVolsSize',           filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,        views: ['Workload Protection'],    formatter: $filter('objectFormatter')},
            {name: '# Protected VMs',   field: 'ProtectedVMs',              filter: zSlickGridFilterTypes.RANGE,        views: ['Workload Protection']},
            {name: '# Incoming VMs',    field: 'IncomingVMs',               filter: zSlickGridFilterTypes.RANGE,        views: ['Workload Protection']},
            {name: '# VRAs',            field: 'ConnectedVRAs',             filter: zSlickGridFilterTypes.RANGE }
        ];

        $scope.groupByValues = [
            {id: '',                text: 'None'},
            {id: 'Cluster',         text: 'Cluster'},
            {id: 'TypeOfDatastore', text: 'Type'},
            {id: 'Device',          text: 'Device'},
            {id: 'DisplayName',     text: 'DisplayName'}
        ];

        $scope.viewByValues = [
            {id: 'General',                text: 'General'},
            {id: 'Workload Protection',    text: 'Workload Protection'}
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showCheckbox: false,
            defaultSortField: 'DisplayName',
//            rowHeight: 36,
            showSearch: true
        };

        $scope.export = function () {
            $window.open('/ZvmService/DatastoreExcelReport/DatastoreList');
        };

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        $scope.showByChecked = datastoreModel.isShowByZerto;
        $scope.showByChange = function () {
            datastoreModel.showByZerto($scope.showByChecked);
        };

        //request the site list data from server
        datastoreModel.register($scope).then(null, null, function (result) {
            $scope.data = result;
        });
    });
