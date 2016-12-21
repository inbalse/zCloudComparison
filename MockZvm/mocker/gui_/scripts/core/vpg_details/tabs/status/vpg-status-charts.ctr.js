'use strict';

angular.module('zvmApp.core')
    .controller('vpgChartsController', function ($scope, $stateParams, vpgDetailsFactory, flotChartsCreator, flotChartConstants) {
        $scope.stateParams = $stateParams;
        
        $scope.applyRPOChart = function () {
            var chart = flotChartsCreator.createAreaChart($scope.rpoChart,$scope.vpgData.Performance.RPOInSeconds.ValuesAsCsv, '#rpoChart', $scope.vpgData.VpgConfiguration.Configuration.RPOThressholdInSeconds);
            $scope.rpoChart = chart.chart;
            $scope.rpoMainValue = chart.mainValue;
        };

        $scope.applyIOPSChart = function () {
            var chart = flotChartsCreator.createAreaChart($scope.iposChart,$scope.vpgData.Performance.IncomingIops.ValuesAsCsv, '#iopsChart', null);
            $scope.iposChart = chart.chart;
            $scope.IposMainValue = chart.mainValue;
        };

        $scope.applyThroughPutChart = function () {
            var chart = flotChartsCreator.createAreaChart($scope.throughChart,$scope.vpgData.Performance.IncomingThroughputInMb.ValuesAsCsv, '#thorughChart', null);
            $scope.throughChart = chart.chart;
            $scope.throughMainValue = chart.mainValue;
        };

        $scope.applyWanChart = function () {
            var chart = flotChartsCreator.createAreaChart($scope.wanChart,$scope.vpgData.Performance.OutgoingBandWidth.ValuesAsCsv, '#wanChart', null);
            $scope.wanChart = chart.chart;
            $scope.wanMainValue = chart.mainValue;
        };

        $scope.updateChartsCounter = 0;

        $scope.setData = function (result) {
            $scope.vpgData = result;

            if($scope.updateChartsCounter === 2){
                $scope.updateChartsCounter = 0;
            }

            if($scope.updateChartsCounter === 0) {
                $scope.applyRPOChart();
                $scope.applyIOPSChart();
                $scope.applyThroughPutChart();
                $scope.applyWanChart();
            }
            $scope.updateChartsCounter++;
        };


        $scope.$on('$destroy', function () {
            if($scope.rpoChart) {
                flotChartsCreator.destroyChart($scope.rpoChart,'#rpoChart');
            }
            if($scope.iposChart) {
                flotChartsCreator.destroyChart($scope.iposChart,'#iopsChart');
            }
            if($scope.throughChart) {
                flotChartsCreator.destroyChart($scope.throughChart,'#thorughChart');
            }
            if($scope.wanChart) {
                flotChartsCreator.destroyChart($scope.wanChart,'#wanChart');
            }

            $('#flotTooltip').remove();
        });

        vpgDetailsFactory.registerToDetails($scope).then(null, null, $scope.setData);

        $('<div id=' + flotChartConstants.TOOLTIP_ID +' class=\'flot-tooltip\'></div>').appendTo('body');
    });
