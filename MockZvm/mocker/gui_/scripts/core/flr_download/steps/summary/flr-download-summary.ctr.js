'use strict';

angular.module('zvmApp.core')
    .controller('flrWizardSummaryController', function ($scope, $compile, flrDownloadSettingsModel, flrDownloadFileModel, flrDownloadSummaryModel, flrConstant) {
        $scope.settingsModel = flrDownloadSettingsModel.model;
        $scope.fileModel = flrDownloadFileModel.model;
        $scope.summaryModel = flrDownloadSummaryModel.model;

        $scope.download = function () {
            flrDownloadSummaryModel.download();
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
        };

        flrDownloadSummaryModel.validate();
    });
