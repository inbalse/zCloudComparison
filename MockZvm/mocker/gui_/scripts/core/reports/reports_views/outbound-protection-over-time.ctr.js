'use strict';

angular.module('zvmApp.core')
    .controller('outboundProtectionOverTimeController', function ($scope, $compile, outboundModel, flotChartsCreator, flotChartConstants) {
        $scope.reportsForm = angular.element('#reports-form');
        $scope.reportsInputs = angular.element('#reports-inputs');

        $scope.reportsForm.html($compile('<outbound-protection-over-time-form></outbound-protection-over-time-form>')($scope));
        $scope.reportsInputs.html($compile('<outbound-protection-over-time-inputs></outbound-protection-over-time-inputs>')($scope));

        $scope.reportDateRange = {};
        $scope.reportDateRange.startDate = outboundModel.defaultFilter.startDate;
        $scope.reportDateRange.endDate = outboundModel.defaultFilter.endDate;
        $scope.selectedSites = _.first(outboundModel.getSitesList());

        var filter = function () {
            return {
                startDate: moment($scope.reportDateRange.startDate),
                endDate: moment($scope.reportDateRange.endDate),
                selectedSites: $scope.selectedSites
            };
        };

        $scope.showHideLine = function (item) {
            $scope.chart.getData()[item.index].lines.show = item.selected;
            $scope.chart.setData($scope.chart.getData());
            $scope.chart.draw();
        };

        var getReport = function (filter) {
            outboundModel.requestData(filter).then(function (result) {
                initTooltip();
                $scope.configuredChart = true;
                $scope.protectedChart = true;
                $scope.sites = result.sites;
                if (_.isNullOrUndefined(_.find($scope.sites, {value: $scope.selectedSites}))) {
                    $scope.selectedSites = _.first(outboundModel.getSitesList());
                }
                $scope.chart = $.plot('#outboundChart', result.chartData, result.chartParams);
                flotChartsCreator.bindTooltip('#outboundChart');
                $scope.legend = flotChartsCreator.buildLegendItems($scope.chart, ['Configured', 'Protected']);
            });
        };

        var destroyChart = function destroyChart() {
            if (angular.isDefined($scope.chart)) {
                flotChartsCreator.destroyChart($scope.chart, '#outboundChart');
            }
        };

        $scope.applyFilter = function () {
            destroyChart();
            getReport(filter());
        };

        $scope.resetFilter = function () {
            $scope.reportDateRange = {};
            $scope.reportDateRange.startDate = outboundModel.defaultFilter.startDate;
            $scope.reportDateRange.endDate = outboundModel.defaultFilter.endDate;
            $scope.selectedSites = outboundModel.defaultFilter.selectedSites;
            destroyChart();
            getReport();
        };

        function initTooltip() {
            $('<div id=' + flotChartConstants.TOOLTIP_ID + ' class=\'flot-tooltip\'></div>').appendTo('body');
        }

        getReport();

        $scope.$on('$destroy', function () {
            destroyChart();
        });
    });

angular.module('zvmApp.core')
    .directive('outboundProtectionOverTimeForm', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'outbound-protection-over-time-form.html'
        };
    });

angular.module('zvmApp.core')
    .directive('outboundProtectionOverTimeInputs', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'outbound-protection-over-time-input.html'
        };
    });
