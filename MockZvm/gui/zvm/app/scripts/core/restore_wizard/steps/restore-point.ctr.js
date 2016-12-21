'use strict';

angular.module('zvmApp.core')
    .controller('restorePointController', function ($scope, $filter, $translate, restoreWizardModel, zSlickGridFilterTypes) {
        $scope.data = restoreWizardModel.data;

        $scope.init = function (planType) {
            if (planType === 1) {
                restoreWizardModel.getRestoreSelectionScreenByPlan(1, $scope.data.selectedProtectionGroup.DisplayName);
                $scope.restorePoinTitle = $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.INFO_VPG', {vpgName: $scope.data.selectedProtectionGroup.DisplayName});
            } else {
                restoreWizardModel.getRestoreSelectionScreenByPlan(2, $scope.data.selectedRepository);
                $scope.restorePoinTitle = $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.INFO');
            }
        };

        $scope.init($scope.data.planType);

        //===============================================================
        // grids configurations
        //===============================================================


        $scope.selectedRestorePoints = restoreWizardModel.data.selectedItems;
        $scope.restorePointColumnDefs = [
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.POINT_IN_TIME'),
                field: 'PointInTime',
                filter: zSlickGridFilterTypes.DATE,
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.RESTORE_SITE'),
                field: 'RestoreSiteName',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.BACKUP_STATUS'),
                field: 'Status',
                filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.VMS'),
                field: 'VMsDisplay',
                filter: zSlickGridFilterTypes.RANGE,
                formatter: $filter('objectFormatter')

            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.VOLUMES'),
                field: 'VolumesDisplay',
                filter: zSlickGridFilterTypes.RANGE,
                formatter: $filter('objectFormatter')

            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.REPOSITORY'),
                field: 'RepositoryName',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.COMPRESSION'),
                field: 'Compressed',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('enumToCssClassFormatter')('use-icon')
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.ZORG'),
                field: 'ZorgName',
                filter: zSlickGridFilterTypes.WILDCARD
            }
        ];

        $scope.restorePointCustomOptions = {
            columns: $scope.restorePointColumnDefs,
            showCheckbox: true,
            multiSelect: false
        };

        function convertVMs(target) {
            var index = 0;
            _.each(target, function (item) {
                item.id = index;
                index++;
            });

            return target;
        }

        $scope.restorePointDetailsCulumnsDefs = [
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.VM_NAME'),
                field: 'VmName',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.BACKUP_STATUS'),
                field: 'Status',
                filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_POINT_STEP.COLUMNS.VOLUMES_BACKUP'),
                field: 'VolumesDisplay',
                filter: zSlickGridFilterTypes.RANGE,
                formatter: $filter('objectFormatter')

            }
        ];

        $scope.restorePointDetailsCustomOptions = {
            columns: $scope.restorePointDetailsCulumnsDefs,
            defaultSortField: 'VmName',
            showCheckbox: false,
            showSearch: false,
            showGroupBy: false
        };

        $scope.selectedPointsChange = function () {
            $scope.data.selectedPointVMs = restoreWizardModel.data.selectedItems.length > 0 ? convertVMs(restoreWizardModel.data.selectedItems[0].VMs) : [];
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
    });
