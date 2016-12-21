'use strict';

angular.module('zvmApp.core')
    .controller('usageReportController', function ($scope, $compile, usageReportModel) {
        $scope.reportsForm = angular.element('#reports-form');
        $scope.reportsInputs = angular.element('#reports-inputs');

        $scope.reportsForm.html($compile('<usage-report-form></usage-report-form>')($scope));
        $scope.reportsInputs.html($compile('<usage-report-input></usage-report-input>')($scope));

        $scope.year = usageReportModel.year;
        $scope.years = usageReportModel.years;

        $scope.getMonths = function (year) {
            usageReportModel.getMonths(year).then(function (result) {
                $scope.months = result;
                $scope.month = result.length > 0 ? result[result.length - 1] : '';
            });
        };
        $scope.getMonths($scope.year);

        $scope.export = function (format) {
            usageReportModel.export($scope.year, $scope.month.value, format);
        };
    });

angular.module('zvmApp.core')
    .directive('usageReportForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'usage-report-form.html'
        };
    });

angular.module('zvmApp.core')
    .directive('usageReportInput', function () {
        return {
            restrict: 'E',
            templateUrl: 'usage-report-input.html'
        };
    });
