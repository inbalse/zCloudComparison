'use strict';

angular.module('zvmApp.core')
    .controller('vpgVMsController', function ($scope, $stateParams, vpgDetailsFactory, enums, $translate, $compile, $window, vpgVmsModel) {
        $scope.vpgData = {};
        $scope.gridId = '';
        var columnDefs = [];
        var oldSource;
        var oldTarget;
        $scope.isGridVisible = false;

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'Name',
                text: $translate.instant('GROUP_BY_LIST.VM_NAME')
            }
        ];

        $scope.setData = function (result) {
            $scope.vpgData = result;

            $scope.vmList = vpgVmsModel._processData(result.VpgConfiguration.VirtualMachines, $scope.vpgData.VpgConfiguration.Configuration.BootOrder.Groups);

            //first enter or source/target changed
            if (!columnDefs.length ||
                (angular.isDefined(oldSource) && !_.isEqual(oldSource, $scope.vpgData.Entities.Source)) ||
                (angular.isDefined(oldTarget) && !_.isEqual(oldTarget, $scope.vpgData.Entities.Target))) {

                columnDefs = $scope._getColumsByType($scope.vpgData.Entities.Source, $scope.vpgData.Entities.Target);

                $scope.customOptions = {
                    columns: columnDefs,
                    showCheckbox: false,
                    showSearch: true
                };

                $scope.isGridVisible = true;

                //save target and source - if some of them will change , columnDefs will change too
                oldSource = $scope.vpgData.Entities.Source;
                oldTarget = $scope.vpgData.Entities.Target;
            }
        };

        $scope._getColumsByType = function (source, target) {
            var result = [];
            var sourceIsVC = (source === enums.VpgEntityType.VCVpg || source === enums.VpgEntityType.HyperV);
            var sourceIsVCD = (source === enums.VpgEntityType.VCDvApp);
            var sourceIsAWS = (source === enums.VpgEntityType.Aws);
            var sourceIsAzure = (source === enums.VpgEntityType.Azure);
            var targetIsVC = (target === enums.VpgEntityType.VCVpg || target === enums.VpgEntityType.HyperV);
            var targetIsVCD = (target === enums.VpgEntityType.VCDvApp);
            var targetIsAWS = (target === enums.VpgEntityType.Aws);
            var targetIsAzure = (target === enums.VpgEntityType.Azure);
            var isSourceHyperv = (source === enums.VpgEntityType.HyperV);
            var isTargetHyperv = (target === enums.VpgEntityType.HyperV);

            $scope.gridId = source.toString() + '_TO_' + target.toString();

            if (sourceIsVC) {
                if (targetIsVC) {
                    result = vpgVmsModel._setVCToVCColumns(isSourceHyperv || isTargetHyperv, $scope.vpgData.ConfigurationFlags.IsVmFolderConfigurable);
                } else if (targetIsVCD) {
                    result = vpgVmsModel._setVCToVCDColumns($scope.vpgData.ConfigurationFlags.IsStorageProfileEnabled);
                } else if (targetIsAWS) {
                    result = vpgVmsModel._setToAWSColumns(false);
                } else if (targetIsAzure) {
                    result = vpgVmsModel._setToAzureColumns(false);
                }
            } else if (sourceIsVCD) {
                if (targetIsVC) {
                    result = vpgVmsModel._setVCDToVCColumns(isTargetHyperv, $scope.vpgData.ConfigurationFlags.IsVmFolderConfigurable);
                } else if (targetIsVCD) {
                    result = vpgVmsModel._setVCDToVCDColumns($scope.vpgData.ConfigurationFlags.IsStorageProfileEnabled);
                } else if (targetIsAWS) {
                    result = vpgVmsModel._setToAWSColumns(true);
                } else if (targetIsAzure) {
                    result = vpgVmsModel._setToAzureColumns(true);
                }
            } else if (sourceIsAWS || sourceIsAzure) {
                result = vpgVmsModel._setAWSToVCColumns();
            } else {
                result = vpgVmsModel._setVCToVCColumns(false, $scope.vpgData.ConfigurationFlags.IsVmFolderConfigurable);
            }

            return result;
        };

        $scope.$on('$destroy', function () {
            $($window).off('securityGroupsClicked');
        });

        //grid event fire on row click
        $scope.rowClick = function (e, row, cell, grid) {

            e.preventDefault();
            e.stopPropagation();
            if ((cell === grid.getColumnIndex('failoverSecurityGroups') && !_.isEmpty(grid.getData().getItem(row).failoverSecurityGroups.value)) ||
                (cell === grid.getColumnIndex('failoverTestSecurityGroups') && !_.isEmpty(grid.getData().getItem(row).failoverTestSecurityGroups.value))) {

                $compile(e.target.parentElement)($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        };

        //============================================================================
        // Init of the component
        //============================================================================

        vpgDetailsFactory.registerToDetails($scope).then(null, null, $scope.setData);
    });
