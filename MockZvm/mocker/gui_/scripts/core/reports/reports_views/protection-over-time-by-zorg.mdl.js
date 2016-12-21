'use strict';

angular.module('zvmApp.models')
    .factory('protectionModel', function (zertoServiceFactory, vos, enums, $filter) {

        var protectionModel = {};

        protectionModel.resolutions = _.map(enums.Resolution, function (value, key) {
            return {
                text: key,
                value: value
            };
        });

        protectionModel.defaultFilter = {
            startDate: moment().startOf('month'),
            endDate: moment().add(1, 'days'),
            selectedSites: null,
            selectedResolution: protectionModel.resolutions[0].value
        };

        protectionModel.requestData = function (filter) {
            if (angular.isUndefined(filter)) {
                filter = $.extend(true, {}, protectionModel.defaultFilter);
            } else if (!filter.selectedSites[0] || (_.size(filter.selectedSites) === 1 && filter.selectedSites[0] === 'All' )) {
                filter.selectedSites = null;
            }
            var recoveryCriteria = new vos.RecoveryStatusOverTimeQueryCriterias();
            recoveryCriteria.PeerSites = filter.selectedSites;
            recoveryCriteria.Resolution = filter.selectedResolution;
            recoveryCriteria.TimeRange = new vos.TimeCriteria(moment.utc(filter.startDate).toDate(), moment.utc(filter.endDate).toDate());
            return zertoServiceFactory.GetRecoveryStatusOverTime(recoveryCriteria)
                .then(function (result) {
                    return protectionModel._processData(result);
                });
        };

        protectionModel._processData = function (data) {
            var colors = ['#1f77b4', '#ff7f0e'];
            var processed = {}; //vos.RecoveryStatusOverTimeVisualObject

            var peerSites = _.get(data, 'QueryCriterias.PeerSites', []);
            processed.sites = [];
            // processed.sites = [
            //     {
            //         'text': 'All',
            //         'value': null
            //     }
            // ];
            processed.sites = _.map(peerSites, function (value) {
                return {
                    text: value,
                    value: value
                };
            });


            var params = {
                xaxis: {
                    mode: 'time',
                    timezone: 'browser',
                    show: true,
                    timeformat: '%d %b %H:%M',
                    labelWidth: 66,
                    labelHeight: 2,
                    tickLength: 0,
                    tickLabel: {
                        fontSize: 6
                    }
                },
                series: {
                    points: {show: false, fill: false}
                },
                grid: {
                    color: '#000000',
                    aboveData: true,
                    outlineWidth: 2,
                    horizontalLines: true,
                    show: true,
                    borderWidth: {'left': 1, 'top': 0, 'bottom': 1, 'right': 0},
                    borderColor: {'left': '#cccccc', 'top': '#ffffff', 'bottom': '#cccccc', 'right': '#ffffff'},
                    hoverable: true
                },
                yaxis: {
                    tickDecimals: 0,
                    min: 0,
                    tickLength: 0,
                    minTickSize: 0,
                    labelWidth: 27
                }
            };


            processed.usedChartParams = params;
            processed.vmsChartParams = params;

            processed.gridData = [];
            var count = 0;

            processed.usedChartData = [];
            processed.vmsChartData = [];
            processed.sitesNames = [];
            _.forEach(data.RecoveryStatusPerPeer, function (peer, index) {// PeerRecoveryStatusOverTime
                var usedData = [];
                var vmsData = [];

                _.forEach(peer.PeerStatusSamples, function (value) {//RecoveryPeerStatusWithTimeVisualObject
                    var item = {
                        id: ++count,
                        site: peer.SiteName,
                        dateObj: {
                            display: $filter('date')(value.TimeStamp, 'dd/MM/yyyy HH:mm:ss'),
                            filterValue: value.TimeStamp
                        },
                        vmsCount: value.ConfiguredVms,
                        dataProtected: $filter('mbToGbConverterFilter')(value.ProtectedSizeInMB),
                        usedJournal: $filter('mbToGbConverterFilter')(value.UsedLogSizeInMB)
                    };
                    processed.gridData.push(item);
                    var timeStamp = new Date(value.TimeStamp).getTime();

                    var usedSizeValue = $filter('mbToGbConverterFilter')(value.UsedLogSizeInMB);
                    usedData.push([timeStamp, usedSizeValue]);

                    vmsData.push([timeStamp, value.ConfiguredVms]);
                });
                processed.sitesNames.push(peer.SiteName);
                processed.usedChartData.push({
                    data: usedData,
                    color: colors[index],
                    lines: {fill: false, fillColor: null, lineWidth: 1, show: true}
                });
                processed.vmsChartData.push({
                    data: vmsData,
                    color: colors[index],
                    lines: {fill: false, fillColor: null, lineWidth: 1, show: true}
                });
            });
            return processed;
        };

        protectionModel._initLine = function initLine(x, y, chart, name) {
            chart.data.columns[x] = [];
            chart.data.columns[x].push('x' + x);
            chart.data.columns[y] = [];
            chart.data.columns[y].push(name);
            chart.data.xs[name] = 'x' + x;
        };

        return protectionModel;
    });
