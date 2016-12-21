'use strict';

angular.module('zvmApp.core')
    .controller('protectionOverTimeByZorgController', function ($scope, $compile, protectionModel, zSlickGridFilterTypes, flotChartsCreator, flotChartConstants, $filter) {

        $scope.reportsForm = angular.element('#reports-form');
        $scope.reportsInputs = angular.element('#reports-inputs');
        $scope.selectedSites = [];
        $scope.sites = [];
        $scope.reportsForm.html($compile('<protection-over-time-by-zorg-form></protection-over-time-by-zorg-form>')($scope));
        $scope.reportsInputs.html($compile('<protection-over-time-by-zorg-input></protection-over-time-by-zorg-input>')($scope));

        var columnDefs = [
            {name: 'Protected Site', field: 'site', filter: zSlickGridFilterTypes.WILDCARD},
            {name: 'Date', field: 'dateObj', formatter: $filter('objectFormatter'), filter: zSlickGridFilterTypes.DATE},
            {name: 'Number of VMs', field: 'vmsCount', filter: zSlickGridFilterTypes.RANGE},
            {name: 'Protected Size (GB)', field: 'dataProtected', filter: zSlickGridFilterTypes.RANGE},
            {name: 'Used Journal (GB)', field: 'usedJournal', filter: zSlickGridFilterTypes.RANGE}
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showCheckbox: false,
            defaultSortField: 'site',
            showSearch: false
        };

        $scope.sitesExtraSettings = {
            displayProp: 'text',
            idProp: 'value',
            externalIdProp: 'value',
            enableSearch: true
        };

        $scope.reportDateRange = {};
        $scope.reportDateRange.startDate = protectionModel.defaultFilter.startDate;
        $scope.reportDateRange.endDate = protectionModel.defaultFilter.endDate;

        $scope.resolutions = protectionModel.resolutions;
        $scope.selectedResolution = protectionModel.defaultFilter.selectedResolution;

        var filter = function () {
            return {
                startDate: moment($scope.reportDateRange.startDate),
                endDate: moment($scope.reportDateRange.endDate),
                selectedSites: $scope.getSites($scope.selectedSites),
                selectedResolution: $scope.selectedResolution
            };
        };

        var getReport = function (filter) {
            protectionModel.requestData(filter).then(function (result) {
                initTooltip();
                $scope.sites = result.sites;
                $scope.data = result.gridData;
                var usedChartData = result.usedChartData;
                var vmsChartData = result.vmsChartData;

                $scope.usedChart = $.plot('#journalChart', usedChartData, result.usedChartParams);
                $scope.vmsChart = $.plot('#vmsChart', vmsChartData, result.vmsChartParams);
                flotChartsCreator.bindTooltip('#journalChart');
                flotChartsCreator.bindTooltip('#vmsChart');
                $scope.usedLegend = flotChartsCreator.buildLegendItems($scope.usedChart, result.sitesNames);
                $scope.vmsLegend = flotChartsCreator.buildLegendItems($scope.vmsChart, result.sitesNames);
                $scope.selectedSitesTitle = $scope.getSiteNames($scope.selectedSites);
            });
        };

        $scope.getSites = function (selectedSites) {
            return _.pluck(selectedSites, 'text');
        };

        $scope.getSiteNames = function (selectedSites) {
            if (selectedSites.length === 0) {
                return 'All';
            }
            var newList = _.pluck(selectedSites, 'text');
            return newList.join(', ');
        };

        $scope.showHideUsedLine = function (item) {
            $scope.usedChart.getData()[item.index].lines.show = item.selected;
            $scope.usedChart.setData($scope.usedChart.getData());
            $scope.usedChart.draw();
        };

        $scope.showHideVmsLine = function (item) {
            $scope.vmsChart.getData()[item.index].lines.show = item.selected;
            $scope.vmsChart.setData($scope.vmsChart.getData());
            $scope.vmsChart.draw();
        };

        var destroyCharts = function destroyCharts() {
            if (angular.isDefined($scope.usedChart)) {
                flotChartsCreator.destroyChart($scope.usedChart, '#chart');
            }
            if (angular.isDefined($scope.vmsChart)) {
                flotChartsCreator.destroyChart($scope.vmsChart, '#chart');
            }
        };

        $scope.applyFilter = function () {
            destroyCharts();

            getReport(filter());
        };

        $scope.resetFilter = function () {
            $scope.reportDateRange = {};
            $scope.reportDateRange.startDate = protectionModel.defaultFilter.startDate;
            $scope.reportDateRange.endDate = protectionModel.defaultFilter.endDate;
            $scope.selectedSites = [];
            $scope.selectedResolution = protectionModel.defaultFilter.selectedResolution;
            destroyChart();
            getReport(filter());
        };

        getReport(filter());

        var destroyChart = function destroyChart() {
            if (angular.isDefined($scope.usedChart)) {
                flotChartsCreator.destroyChart($scope.usedChart, '#journalChart');
            }
            if (angular.isDefined($scope.vmsChart)) {
                flotChartsCreator.destroyChart($scope.vmsChart, '#vmsChart');
            }
        };

        $scope.$on('$destroy', function () {
            destroyCharts();
        });

        function initTooltip() {
            $('<div id=' + flotChartConstants.TOOLTIP_ID + ' class=\'flot-tooltip\'></div>').appendTo('body');
        }
    });

angular.module('zvmApp.core')
    .directive('protectionOverTimeByZorgForm', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'protection-over-time-by-zorg-form.html'
        };
    });

angular.module('zvmApp.core')
    .directive('protectionOverTimeByZorgInput', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'protection-over-time-by-zorg-input.html'
        };
    });
