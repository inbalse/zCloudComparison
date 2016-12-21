'use strict';

angular.module('zvmApp.core')
    .controller('flrDownloadFileController', function ($scope, zTooltipService, entityEvents, zAlertFactory,
                                                       flrWizardFactory, flrDownloadFileModel, $timeout, $compile, flrConstant) {
        $scope.model = flrDownloadFileModel.model;
        $scope.gridObj = {};
        var tooltipTimer;

        flrDownloadFileModel.browseOnce();

        $scope.refresh = function (e) {
            e.preventDefault();
            flrDownloadFileModel.browseRoot();
        };

        $scope.mouseEnter = function (e, node) {
            if (!node.isRoot) {
                tooltipTimer = $timeout(function () {
                    zTooltipService.show(e);
                    $scope.node = node;
                    $timeout.cancel(tooltipTimer);
                }, 500);
            }
        };

        $scope.mouseLeave = function (node) {
            if (!node.isRoot) {
                zTooltipService.hide();
                $timeout.cancel(tooltipTimer);
                tooltipTimer = undefined;
            }
        };

        $scope.rowClick = function (event, row, cell, grid) {

            if (cell === grid.getColumnIndex(flrConstant.GRID_PATH_COLUMN_FIELD)) {
                event.preventDefault();
                event.stopPropagation();
                $compile($(event.target).closest('div'))($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }

            if (event.target.value) {
                event.preventDefault();
            }

            var node = $scope.gridObj.grid.getDataItem(row);

            if (event.target.value === entityEvents.deleteEntity) {
                $scope.toggleCheckbox(node);
            }
        };

        $scope.expandCollapse = function (node) {
            flrDownloadFileModel.expandCollapse(node);
        };

        $scope.toggleCheckbox = function (node) {
            flrDownloadFileModel.toggleCheckbox(node);
            $scope.gridObj.grid.updateData(flrDownloadFileModel.model.selectedNodes);
            flrDownloadFileModel.validate();

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
    });

