'use strict';
angular.module('zvmApp.core')
    .controller('repositoryListController', function ($scope, vos, entityEvents, repositoryListModel, zSlickGridFilterTypes,
                                                      zAlertFactory, $translate, zertoServiceFactory, repositoryEditFactory,
                                                      $filter, $window, siteSettingsFactory, zEntitiesService, analyticsEventsTypes) {

        $scope.gridObj = {};
        $scope.selectedItems = [];
        $scope.isRepoSelected = false;
        $scope.isEditSelected = false;
        $scope.isDeleteEnabled = false;
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
                id: 'repositoryTypeName',
                text: $translate.instant('REPOSITORY_LIST.REPOSITORY_TYPE')
            }
        ];


        var deleteTitle = $translate.instant('GRID_COLUMNS.DELETE_REPOSITORY');
        var deleteDisable = $translate.instant('GRID_COLUMNS.DELETE_REPOSITORY_DISABLED');
        var editTitle = $translate.instant('GRID_COLUMNS.EDIT_REPOSITORY');
        var editDisable = $translate.instant('GRID_COLUMNS.EDIT_REPOSITORY_DISABLED');

        var columnDefs = [
            {
                name: '',
                hideFromEditColumns: true,
                maxWidth: 40,
                headerCssClass: 'default-header',
                resizable: false,
                field: 'IsDefault',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('enumToCssClassFormatter')('repository-list-default')
            },
            {
                name: $translate.instant('REPOSITORY_LIST.REPOSITORY_NAME'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'editDeleteObj',
                formatter: $filter('zEntitiesFormatter')(zEntitiesService.createParams('repositories', editTitle, editDisable, deleteTitle, deleteDisable))
            },
            {
                name: $translate.instant('REPOSITORY_LIST.REPOSITORY_TYPE'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'repositoryTypeName'
            },
            {
                name: $translate.instant('REPOSITORY_LIST.CONNECTIVITY'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                views: ['General'],
                field: 'ConnectivityState',
                formatter: $filter('textTranslatedWithEnumToCssClassFormatter')('connected-state-label repository-list-state', 'ConnectivityStateDisplay')
            },
            {
                name: $translate.instant('REPOSITORY_LIST.PATH'),
                filter: zSlickGridFilterTypes.WILDCARD,
                views: ['General'],
                field: 'PathText'
            },
            {
                name: $translate.instant('REPOSITORY_LIST.CAPACITY'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                views: ['General'],
                field: 'CapacityObj',
                formatter: $filter('propertyFormatter')('display')
            },
            {
                name: $translate.instant('REPOSITORY_LIST.FREE_SPACE'),
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                views: ['General'],
                field: 'FreeSpaceObj',
                formatter: $filter('propertyFormatter')('display')
            },
            {
                name: $translate.instant('REPOSITORY_LIST.ACTIVE_BACKUPS'),
                filter: zSlickGridFilterTypes.RANGE,
                views: ['General'],
                field: 'ActiveJobs'
            },
            {
                name: $translate.instant('REPOSITORY_LIST.RESTORE_POINTS'),
                filter: zSlickGridFilterTypes.RANGE,
                views: ['General'],
                field: 'RestorePoints',
                formatter: $filter('propertyFormatter')('display')
            },
            {
                name: $translate.instant('REPOSITORY_LIST.COMPRESSION'),
                views: ['General'],
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'IsCompressionEnabled',
                formatter: $filter('enumToCssClassFormatter')('use-icon')
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            defaultSortField: 'DisplayName',
            //selectable: false,
            showSearch: true,
            multiSelect: false
            //showCheckbox: false
        };

        $scope.selectedGroup = 'DisplayName';

        //==========================================================================
        //  User interaction
        //==========================================================================
        $scope.export = function () {
            $window.open('/ZvmService/BackupTargetReport/GetBackupTargetsList');
        };

        $scope.addRepository = function () {
            $scope.$emit(analyticsEventsTypes.SETUP.NEW_REPOSITORY);
            repositoryEditFactory.open(true, null);
        };

        function handleDeleteRepository(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.DeleteBackupTarget($scope.deleteId).then(function () {
                    $scope.deleteId = null;
                });
            }
        }

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        $scope.selectedItemsChange = function() {
            $scope.isRepoSelected = $scope.isMenuOptionsEnabled();
            $scope.isEditSelected = $scope.isRepoSelected && $scope.selectedItems[0].IsEdit;
            $scope.isDeleteEnabled = $scope.isRepoSelected && $scope.selectedItems[0].IsDelete;

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.rowClick = function (e, row) {
            e.preventDefault();

            var repository = $scope.gridObj.grid.getDataItem(row);

            switch (e.target.value) {
                case entityEvents.editEntity:
                {
                    $scope.$emit(analyticsEventsTypes.SETUP.EDIT_REPOSITORY);
                    repositoryEditFactory.open(false, repository.ID);
                    break;
                }
                case entityEvents.deleteEntity:
                {
                    $scope.$emit(analyticsEventsTypes.SETUP.DELETE_REPOSITORY);
                    $scope.deleteRepo(repository.ID);
                    break;
                }
                default:
                    break;
            }
        };

        $scope.openEditRepo = function() {
            $scope.$emit(analyticsEventsTypes.SETUP.EDIT_REPOSITORY);
            var repository = $scope.selectedItems[0];
            repositoryEditFactory.open(false, repository.ID);
        };

        $scope.menuDeleteRepo = function() {
            $scope.$emit(analyticsEventsTypes.SETUP.DELETE_REPOSITORY);

            var repository = $scope.selectedItems[0];
            $scope.deleteRepo(repository.ID);
        };

        $scope.deleteRepo = function(repoId) {
            $scope.deleteId = repoId;
            zAlertFactory.warn($translate.instant('REPOSITORY_LIST.DELETE'), $translate.instant('REPOSITORY_LIST.DELETE_QUESTION'), handleDeleteRepository);
        };

        repositoryListModel.register($scope).then(null, null, function (result) {
            $scope.data = result.BackupTargets;
            $scope.IsAddEnabled = result.IsAddEnabled;
        });


        //==========================================================================
        //  Helpers
        //==========================================================================

        $scope.isMenuOptionsEnabled = function() {
            return $scope.selectedItems.length === 1;
        };


    });
