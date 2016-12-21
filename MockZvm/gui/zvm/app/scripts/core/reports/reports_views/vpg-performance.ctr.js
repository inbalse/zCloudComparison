'use strict';

angular.module('zvmApp.core')
    .controller('vpgPerformanceController', function ($scope, $compile, zertoServiceFactory, zAlertFactory, $translate, flotChartsCreator, flotChartConstants) {
        $scope.reportsForm = angular.element('#reports-form');
        $scope.reportsInputs = angular.element('#reports-inputs');

        $scope.reportsForm.html($compile('<vpg-performance-form></vpg-performance-form>')($scope));
        $scope.reportsInputs.html($compile('<vpg-performance-input></vpg-performance-input>')($scope));
        $scope.colors = ['#A6006F', '#15D1C4', '#5CB800', '#0060A6', '#ED892D'];

        $scope.vpgsAvaliable = [];
        $scope.selectedVpgs = [];
        $scope.legend = [];

        $scope.vpgsExtraSettings = {
            displayProp: 'Name',
            idProp: 'Identifier',
            externalIdProp: 'Identifier',
            enableSearch: true,
            showCheckAll: false
        };

        var destroyCharts = function () {
            if ($scope.iposChart) {
                $scope.iposChart = flotChartsCreator.destroyChart($scope.iposChart, '#iopsChart');
            }
            if ($scope.wanChart) {
                $scope.wanChart = flotChartsCreator.destroyChart($scope.wanChart, '#wanChart');
            }
            if ($scope.throughChart) {
                $scope.throughChart = flotChartsCreator.destroyChart($scope.throughChart, '#throughChart');
            }
            if ($scope.rpoChart) {
                $scope.rpoChart = flotChartsCreator.destroyChart($scope.rpoChart, '#rpoChart');
            }
        };
        //region USER ACTIONS
        //======================================================================================
        $scope.apply = function () {
            if ($scope.selectedVpgs.length > 0 && $scope.selectedVpgs.length < 4) {
                $scope.getChartDataByVpgs();
            } else {
                zAlertFactory.fail($translate.instant('REPORTS_VIEW.PERFORMANCE_ERROR_TITLE'), $translate.instant('REPORTS_VIEW.PERFORMANCE_ERROR_MESSAGE'));
            }

        };
        //endregion

        //======================================================================================
        //get the poteinal vpgs
        //======================================================================================
        $scope.init = function () {
            zertoServiceFactory.GetPerformanceScreen([]).then(function (result) {
                //first sort sorting by char in string (bug23647)
                var firstSort = _.sortBy(result.PotentialVpgs, 'Name');
                //second sort sorting by string lengths
                $scope.vpgsAvaliable = firstSort.sort(function (a, b) {
                    return a.Name.length - b.Name.length;
                });
                _.forEach($scope.vpgsAvaliable, function (vpg, index) {
                    vpg.color = $scope.colors[index];
                });
                $scope.selectedVpgs = [];
                $scope.legend = [];
                destroyCharts();
            });
        };

        $scope.showHideChartLines = function (item) {
            $scope.iposChart.getData()[item.index].lines.show = item.selected;
            $scope.iposChart.setData($scope.iposChart.getData());
            $scope.iposChart.draw();

            $scope.wanChart.getData()[item.index].lines.show = item.selected;
            $scope.wanChart.setData($scope.wanChart.getData());
            $scope.wanChart.draw();

            $scope.throughChart.getData()[item.index].lines.show = item.selected;
            $scope.throughChart.setData($scope.throughChart.getData());
            $scope.throughChart.draw();

            $scope.rpoChart.getData()[item.index].lines.show = item.selected;
            $scope.rpoChart.setData($scope.rpoChart.getData());
            $scope.rpoChart.draw();
        };

        $scope.getChartDataByVpgs = function () {
            destroyCharts();
            initTooltip();
            var vpgIdentifiers = _.map($scope.selectedVpgs, function (vpg) {
                return vpg.Identifier;
            });
            zertoServiceFactory.GetPerformanceScreen(vpgIdentifiers).then(function (result) {
                $scope.iposChart = flotChartsCreator.createMultiAreaChart(result.IncomingIOPS.ValuesAsCsv, $scope.selectedVpgs, '#iopsChart');
                $scope.wanChart = flotChartsCreator.createMultiAreaChart(result.OutgoingBandWidth.ValuesAsCsv, $scope.selectedVpgs, '#wanChart');
                $scope.throughChart = flotChartsCreator.createMultiAreaChart(result.IncomingThroughputInMb.ValuesAsCsv, $scope.selectedVpgs, '#throughChart');
                $scope.rpoChart = flotChartsCreator.createMultiAreaChart(result.ActualRPOInSeconds.ValuesAsCsv, $scope.selectedVpgs, '#rpoChart');
                $scope.legend = flotChartsCreator.buildLegendItems($scope.iposChart, _.map($scope.selectedVpgs, 'Name'));
            });
        };
        function initTooltip() {
            $('<div id=' + flotChartConstants.TOOLTIP_ID + ' class=\'flot-tooltip\'></div>').appendTo('body');
        }

        $scope.init();

        $scope.$on('$destroy', function () {
            destroyCharts();
        });


    });


angular.module('zvmApp.core')
    .directive('vpgPerformanceForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'vpg-performance-form.html'
        };
    });

angular.module('zvmApp.core')
    .directive('vpgPerformanceInput', function () {
        return {
            restrict: 'E',
            templateUrl: 'vpg-performance-input.html'
        };
    });
