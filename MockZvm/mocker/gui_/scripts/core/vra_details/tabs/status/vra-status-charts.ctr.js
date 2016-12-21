'use strict';
angular.module('zvmApp.core')
    .controller('vraChartsController', function ($scope, $stateParams, vraDetailsFactory, flotChartsCreator, flotChartConstants) {
        $scope.stateParams = $stateParams;

        $scope.applyCPUChart = function(){
            var chart = flotChartsCreator.createAreaChart($scope.cpuChart,$scope.vraData.Performance.CpuUsageInPercent.ValuesAsCsv, '#cpuChart', null);
            $scope.cpuChart = chart.chart;
            $scope.cpuMainValue = chart.mainValue;
        };

        $scope.applyLocalChart = function(){
            var chart = flotChartsCreator.createAreaChart($scope.localChart,$scope.vraData.Performance.LocalMemoryUsageInPercent.ValuesAsCsv, '#localChart', null);
            $scope.localChart = chart.chart;
            $scope.localMainValue = chart.mainValue;
        };

        $scope.applyRemoteChart = function (){
            var chart = flotChartsCreator.createAreaChart($scope.remoteChart,$scope.vraData.Performance.RemoteMemoryUsageInPercent.ValuesAsCsv, '#remoteChart', null);
            $scope.remoteChart = chart.chart;
            $scope.remoteMainValue = chart.mainValue;
        };

        $scope.updateChartsCounter = 0;

        $scope.setData = function (result) {
            $scope.vraData = result;

            if($scope.updateChartsCounter === 2){
                $scope.updateChartsCounter = 0;
            }
            if($scope.updateChartsCounter === 0) {
                $scope.applyCPUChart();
                $scope.applyLocalChart();
                $scope.applyRemoteChart();
            }

            $scope.updateChartsCounter++;

        };

        $scope.$on('$destroy', function () {
            if($scope.cpuChart) {
                flotChartsCreator.destroyChart($scope.cpuChart,'#cpuChart');
            }
            if($scope.localChart) {
                flotChartsCreator.destroyChart($scope.localChart,'#localChart');
            }
            if($scope.remoteChart) {
                flotChartsCreator.destroyChart($scope.remoteChart,'#remoteChart');
            }
        });

        vraDetailsFactory.registerToDetails($scope).then(null,null,$scope.setData);

        $('<div id=' + flotChartConstants.TOOLTIP_ID +' class=\'flot-tooltip\'></div>').appendTo('body');
    });
