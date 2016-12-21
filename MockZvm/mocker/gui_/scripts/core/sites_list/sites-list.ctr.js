'use strict';
angular.module('zvmApp.core')
    .controller('sitesListController', function ($scope, $stateParams, $state, sitesListModel, pairSitesFactory, $filter, unpairSitesFactory,
                                                 zSlickGridFilterTypes, $translate, siteSettingsFactory, analyticsEventsTypes) {

        $scope.gridObj = {};
        //handle user interactoin

        $scope.handlePairSitesClick = function () {
            $scope.$emit(analyticsEventsTypes.SITES.PAIR);
            pairSitesFactory.showPairSites();
        };

        //todo in 5.0 ATHENA create common service fom manage state go location
        //check if quick start needed
        if ($stateParams.quickPair === 'true') {
            pairSitesFactory.showPairSites();
            $state.go('.', {quickPair: undefined});
        }

        $scope.handleUnpairSitesClick = function () {
            $scope.$emit(analyticsEventsTypes.SITES.UNPAIR);
            unpairSitesFactory.startUnpair($scope.selectedItems).then(function (id) {

                //remove the deleted site from selected collection
                _.remove($scope.selectedItems, function (site) {
                    return id === site.SiteId.SiteGuid;
                });

                //set grid selection by current selected
                $scope.gridObj.grid.setSelectedRows($scope.selectedItems);

            });
            //backend doesn't support this update (cash is not ready and there is no result)
            //if it will fix - gui support
            sitesListModel.updateNow();
        };

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        var columnDefs = [
            {
                name: '',
                hideFromEditColumns: true,
                field: 'AlertStatus',
                resizable: false,
                maxWidth: 40,
                views: ['General'],
                formatter: $filter('enumToCssClassFormatter')('sites-list-status'),
                headerCssClass: 'protection-group-alert-status-header'
            },
            {
                name: 'Site Name',
                hideFromEditColumns: true,
                filter: zSlickGridFilterTypes.WILDCARD,
                views: ['General'],
                field: 'SiteName'
            },
            {name: 'Location', filter: zSlickGridFilterTypes.WILDCARD, views: ['General'], field: 'Location'},
            {name: 'Site IP', filter: zSlickGridFilterTypes.WILDCARD, views: ['General'], field: 'HostName'},
            {
                name: 'Network',
                filter: zSlickGridFilterTypes.RANGE,
                views: ['General'],
                field: 'OutgoingBandWidthObj',
                formatter: $filter('objectFormatter')
            },
            {
                name: 'IOPS',
                filter: zSlickGridFilterTypes.RANGE,
                toolTip: $translate.instant('GRID_COLUMNS.IO'),
                views: ['General'],
                field: 'IOPS'
            },
            {
                name: 'Incoming Throughput',
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                views: ['General'],
                field: 'IncomingThroughputInMBObj',
                formatter: $filter('objectFormatter')
            },
            {
                name: 'Provisioned Storage (GB)',
                toolTip: $translate.instant('GRID_COLUMNS.PROVISIONED'),
                filter: zSlickGridFilterTypes.RANGE,
                views: ['General'],
                field: 'ProvisionedStorageInMBObj',
                formatter: $filter('objectFormatter')
            },
            {
                name: 'Used Storage (GB)',
                toolTip: $translate.instant('GRID_COLUMNS.USED'),
                filter: zSlickGridFilterTypes.RANGE,
                views: [''],
                field: 'UsedStorageInMBObj',
                formatter: $filter('objectFormatter')
            },
            {name: '# VPGs', filter: zSlickGridFilterTypes.RANGE, views: ['General'], field: 'NumberOfVpgs'},
            {
                name: '# VMs',
                filter: zSlickGridFilterTypes.RANGE,
                views: ['General'],
                field: 'ProtectionLimitsUsage',
                formatter: $filter('propertyFormatter')('VmsCount')
            },
            {name: 'ZORG Name', filter: zSlickGridFilterTypes.MULTI_SELECT, views: [''], field: 'CustomerName'},
            {
                name: 'Version',
                views: [''],
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'VersionObj',
                formatter: $filter('objectFormatter')
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true
        };

        $scope.selectedItems = [];

        $scope.viewByValues = [
            {
                id: 'General',
                text: 'General'
            }
        ];

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'Location',
                text: $translate.instant('GROUP_BY_LIST.LOCATION')
            },
            {
                id: 'CustomerName',
                text: $translate.instant('GROUP_BY_LIST.ZORG_NAME')
            }
        ];
        //request the site list data from servier
        sitesListModel.register($scope).then(null, null, function (result) {
            $scope.data = result.list;
            $scope.isPairEnabled = result.IsPairEnabled;
            $scope.isUnPairEnabled = result.IsUnPairEnabled;
        });

        $scope.selectedItemsChange = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
    });
