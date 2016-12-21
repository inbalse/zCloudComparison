'use strict';
angular.module('zvmApp.core')
    .controller('dashboardController', function ($scope, dashboardModel, $filter, summaryMinimalModel,
                                                 mbToStringConvertorFilter, enums, $translate, $state,
                                                 siteSettingsFactory, flotChartsCreator, flotChartConstants) {

        //=======================================================================================
        //  LINKS
        //=======================================================================================
        $scope.gotToAlerts = function () {
            $state.go('main.monitoring.alerts');
        };

        $scope.gotToTasks = function () {
            $state.go('main.monitoring.tasks');
        };

        $scope.gotToEvents = function () {
            $state.go('main.monitoring.events');
        };

        $scope.handleUpgradeClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.LICENSE);
        };
        //=======================================================================================
        //      SITES
        //=======================================================================================
        $scope.applySitesInformation = function () {

            $scope.incomingVpgs = $scope.dashboardData.RemoteSiteInfo.Stats.NumberOfVpgsConfigured;
            $scope.outgoingVpgs = $scope.dashboardData.LocalSiteInfo.Stats.NumberOfVpgsConfigured;
            $scope.localSite = $scope.dashboardData.LocalSiteInfo.Details.SiteName;
            $scope.showMultiSites = $scope.dashboardData.State.RemoteConnectionStatus.NumConnectedPeers > 1;

            if($scope.showMultiSites){
                $scope.numConnectedPeers = $scope.dashboardData.State.RemoteConnectionStatus.NumConnectedPeers;
            }
        };


        //=======================================================================================
        //      VPG DATA - PIE CHART and HEAT MAP
        //=======================================================================================
        $scope.applyVPGData = function (result) {
            $scope.applyPieChart(result);
            $scope.applyHeatMap(result);
        };

        $scope.applyHeatMap = function (result) {

            //sort vpgs for heat map for save square position (BE response data is mess)
            result.ProtectionGroups = _.sortBy(result.ProtectionGroups, function (vpg) {
                return [vpg.Identifier.GroupGuid, vpg.Identifier.GroupGuid];
            });

            var map = [];
            _.forEach(result.ProtectionGroups, function (vpg) {

                switch (vpg.State.AlertStatus) {
                    case enums.ProtectionGroupAlertStatus.Normal:
                        map.push({status: 'success', Name: vpg.Name, Id: vpg.Identifier});
                        break;
                    case enums.ProtectionGroupAlertStatus.Warning:
                        map.push({status: 'warning', Name: vpg.Name, Id: vpg.Identifier});
                        break;
                    case enums.ProtectionGroupAlertStatus.Error:
                        map.push({status: 'failed', Name: vpg.Name, Id: vpg.Identifier});
                        break;
                }
            });

            $scope.mapData = map;
        };

        $scope.addStatusToPieArray = function (collection, enumStatus, count, color) {

            var itemExists = _.find(collection, {status: enumStatus});

            if (angular.isDefined(itemExists)) {
                itemExists.chunk = count;
                itemExists.text = count;
            } else {
                collection.push({
                    chunk: count,
                    text: count,
                    tooltipText: $translate.instant('ENUM.VPG_NUM_STATUS.' + enumStatus),
                    color: color,
                    status: enumStatus
                });
            }
        };

        $scope.applyPieChart = function (result) {

            var pieData = [];
            var statusKeyCollection = [];
            var processingCount = 0;

            var RECOVERED = 8;
            //processing group
            var INITIALIZING = 0;
            var FAILING_OVER = 5;
            var MOVING = 6;
            var DELETING = 7;

            var statusGroup = _.groupBy(result.ProtectionGroups, function (vpg) {
                return vpg.State.Status;
            });
            //if a new status was added you must add the matching color here
            var statusColors = {
                0: '#637FA5',
                1: '#46A115',
                2: '#CF000A',
                3: '#FFBB21',
                4: '#FFBB21',
                5: '#a1a7ab',
                6: '#98a1a7',
                7: '#629dc7',
                8: '#9DA6B1'
            };

            var outerStatusColor = {
                3:'#A9510B',
                4:'#F17508'
            };

            _.forIn(statusGroup, function (value, key) {
                pieData.push({
                    chunk: value.length,
                    text: value.length,
                    tooltipText: $translate.instant('ENUM.VPG_NUM_STATUS.' + key),
                    color: statusColors[key],
                    outerColor :outerStatusColor[key],
                    status: key
                });
                    statusKeyCollection.push(key);
            });

            var groupStatusByKey = _.groupBy(statusKeyCollection, function(n) { return n; });
            //check if recovered status existing
            var isRecoveredKeyExist = angular.isDefined(groupStatusByKey[RECOVERED]) && groupStatusByKey[RECOVERED].length;
            //calculate size between legend options
            var legendHeight = (isRecoveredKeyExist ? (100 / 6) : (100 / 5)) + 2 + '%' ;

            //static legend data for status pie chart
            $scope.legendData = [
                {color: {'background-color':statusColors[1]}, outerColor: {'background-color':statusColors[1]}, legendText: $translate.instant('DASH_BOARD.STATUS_PIE_LEGEND.MEETING_SLA'), visible:true, height:{'height':legendHeight}},
                {color: {'background-color':statusColors[3]}, outerColor: {'background-color':outerStatusColor[3]}, legendText: $translate.instant('DASH_BOARD.STATUS_PIE_LEGEND.RPO_NOT_MEETING_SLA'), visible:true, height:{'height':legendHeight}},
                {color: {'background-color':statusColors[4]}, outerColor: {'background-color':outerStatusColor[4]}, legendText: $translate.instant('DASH_BOARD.STATUS_PIE_LEGEND.HISTORY_NOT_MEETING_SLA'), visible:true, height:{'height':legendHeight}},
                {color: {'background-color':statusColors[2]}, outerColor: {'background-color':statusColors[2]}, legendText: $translate.instant('DASH_BOARD.STATUS_PIE_LEGEND.NOT_MEETING_SLA'), visible:true, height:{'height':legendHeight}},
                {color: {'background-color':statusColors[INITIALIZING]}, outerColor:{'background-color':statusColors[INITIALIZING]}, legendText: $translate.instant('DASH_BOARD.STATUS_PIE_LEGEND.PROCESSING'), visible:true, height:{'height':legendHeight}},
                {color: {'background-color':statusColors[RECOVERED]}, outerColor:{'background-color':statusColors[RECOVERED]}, legendText: $translate.instant('DASH_BOARD.STATUS_PIE_LEGEND.RECOVERED'), visible: isRecoveredKeyExist, height:{'height':legendHeight}}
            ];

            //check if all statuses is recovered or processing status and show text in the middle of status pie
            if (groupStatusByKey[INITIALIZING]) {
                processingCount = processingCount + groupStatusByKey[INITIALIZING].length;
            }
            if (groupStatusByKey[FAILING_OVER]) {
                processingCount = processingCount + groupStatusByKey[FAILING_OVER].length;
            }
            if (groupStatusByKey[MOVING]) {
                processingCount = processingCount + groupStatusByKey[MOVING].length;
            }
            if (groupStatusByKey[DELETING]) {
                processingCount = processingCount + groupStatusByKey[DELETING].length;
            }

            if (processingCount !== 0 && processingCount === statusKeyCollection.length) {
                $scope.pieMiddleText = $translate.instant('DASH_BOARD.PIE_MIDDLE_TEXT.ALL_PROCESSING');

            } else if (groupStatusByKey[RECOVERED] && groupStatusByKey[RECOVERED].length === statusKeyCollection.length) {
                $scope.pieMiddleText = $translate.instant('DASH_BOARD.PIE_MIDDLE_TEXT.ALL_RECOVERED');
            } else {
                //else remove the middle text
                $scope.pieMiddleText = '';
            }

            $scope.statusPieData = pieData;
        };

        //=======================================================================================
        //      TOP TABS
        //=======================================================================================
        $scope.applyNumberOfVpgs = function () {
            $scope.numOfVpgs = $scope.dashboardData.LocalSiteInfo.Stats.NumberOfVpgsConfigured + $scope.dashboardData.LocalSiteInfo.ConfiguredSelfVpgs + $scope.dashboardData.RemoteSiteInfo.ConfiguredSelfVpgs + $scope.dashboardData.RemoteSiteInfo.Stats.NumberOfVpgsConfigured;
        };

        $scope.applyNumberOfVms = function () {
            $scope.numOfVms = $scope.dashboardData.NumberOfProtectedAndRecoveryVms;
        };

        $scope.applyProtected = function () {
            var fullNumber = mbToStringConvertorFilter($scope.dashboardData.LocalSiteInfo.Stats.StorageProtectedSiteInMB + $scope.dashboardData.RemoteSiteInfo.Stats.StorageProtectedSiteInMB, 0);
            $scope.sizeType = fullNumber.substring(fullNumber.length - 2, fullNumber.length);

            $scope.protected = fullNumber.substring(0, fullNumber.length - 3);

        };

        $scope.applyAvrgRpo = function () {
            var unformattedAvrgRpo = $scope.dashboardData.AverageRpo;

            $scope.avrgRpo = $scope.formatAvarageRpo(unformattedAvrgRpo);
        };

        $scope.formatAvarageRpo = function (avarageRpo) {

            if (avarageRpo <= 60) {
                $scope.avrgRpoUnits = 'sec';
                $scope.underAbove = '';
                return avarageRpo;
            }
            if (avarageRpo <= 300) {
                $scope.avrgRpoUnits = 'min';
                $scope.underAbove = 'under';
                return '5';
            }
            if (avarageRpo <= 900) {
                $scope.avrgRpoUnits = 'min';
                $scope.underAbove = 'under';
                return '15';
            }
            if (avarageRpo <= 3600) {
                $scope.avrgRpoUnits = 'hr';
                $scope.underAbove = 'under';
                return '1';
            }
            if (avarageRpo <= 14400) {
                $scope.avrgRpoUnits = 'hr';
                $scope.underAbove = 'under';
                return '4';
            }
            if (avarageRpo <= 28800) {
                $scope.avrgRpoUnits = 'hr';
                $scope.underAbove = 'under';
                return '8';
            }
            if (avarageRpo <= 43200) {
                $scope.avrgRpoUnits = 'hr';
                $scope.underAbove = 'under';
                return '12';
            }
            $scope.avrgRpoUnits = 'hr';
            $scope.underAbove = 'over';
            return '12';
        };

        $scope.applyCompression = function () {

            $scope.compression = $scope.dashboardData.LocalSiteInfo.Stats.CompressionRatePrecentage;
            if($scope.compression < 0 || $scope.compression > 100){
                $scope.compression = 'N/A';
                $scope.isCompressionNotNa = false;
            }else{
                $scope.isCompressionNotNa = true;
            }

        };
        //=======================================================================================
        //      CHARTS
        //=======================================================================================

        var iposChart, throughChart, wanChart;

        $scope.applyIOPSChart = function () {
            var chart = flotChartsCreator.createAreaChart(iposChart, $scope.dashboardData.Graphs.IncomingIops.ValuesAsCsv, '#iopsChart', null);
            iposChart = chart.chart;
            $scope.IposMainValue = chart.mainValue;
        };

        $scope.applyThroughPutChart = function () {
            var chart = flotChartsCreator.createAreaChart(throughChart, $scope.dashboardData.Graphs.IncomingThroughputInMBps.ValuesAsCsv, '#thorughChart', null);
            throughChart = chart.chart;
            $scope.throughMainValue = chart.mainValue;
        };

        $scope.applyWanChart = function () {
            var chart = flotChartsCreator.createAreaChart(wanChart, $scope.dashboardData.Graphs.OutgoingBandWidthInMBps.ValuesAsCsv, '#wanChart', null);
            wanChart = chart.chart;
            $scope.wanMainValue = chart.mainValue;
        };

        //=======================================================================================
        //      DATA FETCH
        //=======================================================================================
        $scope.updateChartsCounter = 0;

        $scope.setData = function (data) {

            $scope.dashboardData = data;

            $scope.showTrialLicense = !!(data.LicenseMessage && data.LicenseMessage.length);

            if($scope.updateChartsCounter === 2){
                $scope.updateChartsCounter = 0;
            }

            if($scope.updateChartsCounter === 0) {
                $scope.applyIOPSChart();
                $scope.applyThroughPutChart();
                $scope.applyWanChart();
            }

            $scope.updateChartsCounter++;

            $scope.applyNumberOfVpgs();
            $scope.applyNumberOfVms();
            $scope.applyProtected();
            $scope.applyAvrgRpo();
            $scope.applyCompression();
            $scope.applySitesInformation();
        };

        $scope.setRecentEvents = function (data) {
            $scope.dashboardEvents = data;
        };

        $scope.setActiveAlerts = function (data) {
            $scope.alertsList = data.SummaryState.AlertTips.Alerts;
        };

        dashboardModel.register($scope).then(null, null, $scope.setData);

        dashboardModel.registerToEvents($scope).then(null, null, $scope.setRecentEvents);

        summaryMinimalModel.register($scope).then(null, null, $scope.setActiveAlerts);

        dashboardModel.registerVPGS($scope).then(null, null, $scope.applyVPGData);

        $scope.$on('$destroy', function () {
            if(iposChart) {
                flotChartsCreator.destroyChart(iposChart,'#iopsChart');
            }
            if(throughChart) {
                flotChartsCreator.destroyChart(throughChart,'#thorughChart');
            }
            if(wanChart) {
                flotChartsCreator.destroyChart(wanChart,'#wanChart');
            }

            $('#flotTooltip').remove();
        });

        $('<div id=' + flotChartConstants.TOOLTIP_ID +' class=\'flot-tooltip\'></div>').appendTo('body');
    });
