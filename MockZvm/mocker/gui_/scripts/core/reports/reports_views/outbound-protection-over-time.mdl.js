'use strict';

angular.module('zvmApp.models')
    .factory('outboundModel', function (zertoServiceFactory, vos, flotChartsCreator) {

        var outboundModel = {};

        outboundModel.defaultFilter = {
            startDate: moment().startOf('month'),
            endDate: moment().add(1, 'days'),
            selectedSites: null
        };

        outboundModel.requestData = function (filter) {
            if (angular.isUndefined(filter)) {
                filter = $.extend(true, {}, outboundModel.defaultFilter);
            }
            var protectionCriteria = new vos.ProtectionStatusScreenQueryCriterias();
            protectionCriteria.PeerSites = _.isNullOrUndefined(filter.selectedSites) ? null : [filter.selectedSites];
            protectionCriteria.TimeRange = new vos.TimeCriteria(moment.utc(filter.startDate).toDate(), moment.utc(filter.endDate).toDate());
            return zertoServiceFactory.GetSiteProtectionStatusScreenVisualObject(protectionCriteria)
                .then(function (result) {
                    return outboundModel._processData(result);
                });
        };

        outboundModel._processData = function (data) {
            var processed = {};
            processed.sites = outboundModel.getSitesList(data);

            processed.chartParams = {

                xaxis: {
                    mode: 'time',
                    timezone: 'browser',
                    show: true,
                    labelWidth: 70,
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
            processed.chartData = [];
            var protectedData = [];
            var configuredData = [];
            var maxValue = 0;
            _.forEach(data.ProtectionStatusHistory, function (value) {
                var timeStamp = new Date(value.TimeStamp).getTime();
                var yValue = parseFloat((value.ConfiguredSizeInMB / 1000).toPrecision(4));

                protectedData.push([timeStamp, yValue]);
                maxValue = _.max([maxValue, yValue]);
                yValue = parseFloat((value.ProtectedSizeInMB / 1000).toPrecision(4));
                maxValue = _.max([maxValue, yValue]);

                configuredData.push([timeStamp, yValue]);
            });
            processed.chartData.push({
                data: protectedData,
                color: '#1f77b4',
                lines: {fill: false, fillColor: null, lineWidth: 1, show: true}
            });
            processed.chartData.push({
                data: configuredData,
                color: '#ff7f0e',
                lines: {fill: false, fillColor: null, lineWidth: 1, show: true}
            });

            var maxYTickValue = flotChartsCreator.calculateMaxValue(3, Math.ceil(maxValue));
            var num = maxYTickValue / 3;

            processed.chartParams.yaxis.ticks = [0, num, num * 2, maxYTickValue];

            return processed;
        };

        outboundModel.getSitesList = function (data) {
            var sites = [
                getSiteObject('All', null)

            ];

            var peerSites = _.get(data, 'QueryCriterias.PeerSites', []);


            _.forEach(peerSites, function (value) {
                sites.push(getSiteObject(value, value));
            });

            return sites;
        };

        return outboundModel;


        function getSiteObject(name, value) {
            return {
                text: name,
                value: value
            };
        }


    });
