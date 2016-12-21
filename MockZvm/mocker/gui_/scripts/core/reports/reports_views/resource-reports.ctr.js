'use strict';

angular.module('zvmApp.core')
    .controller('resourceReportsController', function ($scope, $compile, resourceReportModel) {
        $scope.reportsForm = angular.element('#reports-form');
        $scope.reportsInputs = angular.element('#reports-inputs');

        $scope.reportsForm.html($compile('<resource-reports-form></resource-reports-form>')($scope));
        $scope.reportsInputs.html($compile('<resource-reports-input></resource-reports-input>')($scope));

        $scope.uiEnabled = false;
        $scope.reportDateRange = resourceReportModel.reportDateRange;

        resourceReportModel.getAvailableRange().then(function (result) {
            if (result.startDate > result.endDate)
            {
                $scope.showStatusMessage = true;
            } else {
                $scope.showStatusMessage = false;
                $('input[type="daterange"]').data('daterangepicker').setStartDate(result.startDate);
                $('input[type="daterange"]').data('daterangepicker').setEndDate(result.endDate);
                $scope.uiEnabled = true;
            }
        });

        $scope.export = function () {
            resourceReportModel.export($scope.reportDateRange.startDate, $scope.reportDateRange.endDate);
        };
    });

angular.module('zvmApp.core')
    .directive('resourceReportsForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'resource-reports-form.html'
        };
    });

angular.module('zvmApp.core')
    .directive('resourceReportsInput', function () {
        return {
            restrict: 'E',
            templateUrl: 'resource-reports-input.html'
        };
    });
