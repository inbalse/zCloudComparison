'use strict';

angular.module('zvmApp.core')
    .controller('offsiteVpgsListController', function ($scope, offsiteVpgsListModel, zSlickGridFilterTypes, zertoServiceFactory,
                                                       zAlertFactory, $translate, offSiteBackupFactory, $window,tweaksService,
                                                       $filter, siteSettingsFactory) {
        //==========================================================================
        //  Properties
        //==========================================================================
        var columnDefs = [
            {name: $translate.instant('OFF_SITE_BACKUP.VPG_NAME'), views: ['General', 'Run Details'], field: 'JobName', filter: zSlickGridFilterTypes.WILDCARD, formatter: $filter('offsiteNameRenderer')},
            {name: $translate.instant('OFF_SITE_BACKUP.PROTECTED_SITE'), views: [], field: 'VpgProtectedSiteName', filter: zSlickGridFilterTypes.WILDCARD},
            {name: $translate.instant('OFF_SITE_BACKUP.BACKUP_SITE'), views: ['General'], filter: zSlickGridFilterTypes.WILDCARD, field: 'VpgRecoverySiteName'},
            {name: $translate.instant('OFF_SITE_BACKUP.STATUS'), views: ['General'], field: 'BackupStatus', filter: zSlickGridFilterTypes.MULTI_SELECT, formatter: $filter('offsiteIconProgressFormatter')},
            {name: $translate.instant('OFF_SITE_BACKUP.REPOSITORY_NAME'), views: ['General'], field: 'RepositoryName', filter: zSlickGridFilterTypes.WILDCARD},
            {name: $translate.instant('OFF_SITE_BACKUP.LAST_BACKUP_SIZE'), views: [], field: 'LastJobSizeInMBObj', filter: zSlickGridFilterTypes.MB_OR_GB_RANGE, formatter: $filter('objectFormatter')},
            {name: $translate.instant('OFF_SITE_BACKUP.ZORG'), field: 'ZorgName',views:[],  filter: zSlickGridFilterTypes.WILDCARD},
            {name: $translate.instant('OFF_SITE_BACKUP.VPG_SIZE'), views: ['General'], field: 'JobSizeInMBObj', filter: zSlickGridFilterTypes.MB_OR_GB_RANGE, formatter: $filter('objectFormatter')},
            {name: $translate.instant('OFF_SITE_BACKUP.LAST_RUN_RESULT'),views: ['General', 'Run Details'], filter: zSlickGridFilterTypes.MULTI_SELECT, field: 'LastRunResultText'},
            {name: $translate.instant('OFF_SITE_BACKUP.LAST_RUN_TIME'),views: ['Run Details'], field: 'StartTimeOfLastRunObj', formatter: $filter('objectFormatter'), filter: zSlickGridFilterTypes.DATE},
            {name: $translate.instant('OFF_SITE_BACKUP.NEXT_SCHEDULED_RUN'), views: ['Run Details'], field: 'NextScheduledObj', formatter: $filter('objectFormatter'), filter: zSlickGridFilterTypes.DATE},
            {name: $translate.instant('OFF_SITE_BACKUP.RESTORE_POINTS'), views: ['General'], filter: zSlickGridFilterTypes.WILDCARD, field: 'RestorePoints'},
            {name: $translate.instant('OFF_SITE_BACKUP.LAST_FULL_BACKUP'), views: ['Run Details'], field: 'LastFullBackupObj', formatter: $filter('objectFormatter'), filter: zSlickGridFilterTypes.DATE},
            {name: $translate.instant('OFF_SITE_BACKUP.#VMs'), views: [], filter: zSlickGridFilterTypes.RANGE, field: 'NumberOfVms'},
            {name: $translate.instant('OFF_SITE_BACKUP.#OFVOLUMES'), views: [], filter: zSlickGridFilterTypes.RANGE, field: 'NumberOfVolumes'}
        ];

        $scope.isRunEnabled = false;
        $scope.isAbortEnabled = false;
        $scope.gridObj = {};
        $scope.selectedItems = [];
        $scope.viewByValues = [
            {
                id: 'General',
                text: 'General'
            },
            {
                id: 'Run Details',
                text: 'Run Details'
            }
        ];
        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'RepositoryName',
                text: $translate.instant('OFF_SITE.REPOSITORY')
            }
        ];
        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true
        };

        //==========================================================================
        //  User interaction
        //==========================================================================
        $scope.export = exportClicked;
        $scope.abortBackup = abortBackup;
        $scope.runBackup = runBackup;
        $scope.handleSiteSettingsClick = handleSiteSettingsClick;

        //==========================================================================
        //  Helpers
        //==========================================================================
        offsiteVpgsListModel.register($scope).then(null, null, function (result) {
            $scope.data = result.VpgBackupJobInfoSummaryVisualObjects;
        });
        $scope.selectedItemsChange = selectedItemsChange;


        /*
         * Functions
         * */
        function exportClicked() {
            $window.open('/ZvmService/BackupVpgReport/GetBackupVpgsList');
        }

        function abortBackup() {
            offSiteBackupFactory.abortBackups(_.cloneDeep($scope.selectedItems));
            $scope.gridObj.grid.setSelectedRows([]);
        }

        function runBackup() {
            offSiteBackupFactory.runBackups(_.cloneDeep($scope.selectedItems));
            $scope.gridObj.grid.setSelectedRows([]);
        }

        function handleSiteSettingsClick() {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        }

        function selectedItemsChange() {
            $scope.isRunEnabled = offSiteBackupFactory.checkRunBackupEnabled($scope.selectedItems);
            $scope.isAbortEnabled = offSiteBackupFactory.checkAbortBackupEnabled($scope.selectedItems);
            if(!$scope.$$phase) {
                $scope.$digest();
            }
        }

    });
