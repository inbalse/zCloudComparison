'use strict';

angular.module('zvmApp.services')
    .constant('flotChartConstants',
        {
            TOOLTIP_ID: 'flotTooltip',
            TOOLTIP_SELECTOR: '#flotTooltip'
        }
    )
    .factory('flotChartsCreator', function ($filter, flotChartConstants) {
        var flotChartsCreator = {};

        flotChartsCreator.buildLegendItems = function (chart, names) {
            var legend = [];
            if (chart) {
                for (var index = 0; index < names.length; index++) {
                    legend.push({
                        color: chart.getData()[index].color,
                        name: names[index],
                        index: index,
                        selected: true
                    });
                }
            }
            return legend;
        };


        flotChartsCreator.convertToDate = function (strDate) {
            var year = strDate.substring(0, 4);
            var month = strDate.substring(4, 6);
            var day = strDate.substring(6, 8);
            var hours = strDate.substring(9, 11);
            var minutes = strDate.substring(11, 13);
            var seconds = strDate.substring(13, 15);
            var d = new Date(year, month - 1, day, hours, minutes, seconds, 0).getTime();
            return d;
        };

        flotChartsCreator.calcyAxisList = function (maxValue) {
            if (maxValue < 1) {
                maxValue = 1;
            }
            flotChartsCreator.maxValueForYaxis = flotChartsCreator.calculateMaxValue(3, Math.ceil(maxValue));

            var num = flotChartsCreator.maxValueForYaxis / 3;

            return [[0, '– 0'], [num, '– ' + num], [num * 2, '– ' + num * 2], [flotChartsCreator.maxValueForYaxis, '– ' + flotChartsCreator.maxValueForYaxis]];
        };

        flotChartsCreator.calculateMaxValue = function (ticks, maxValue) {
            var modulu = (maxValue % ticks);
            return modulu ? maxValue + (ticks - modulu) : maxValue;

        };

        flotChartsCreator.prepareDataLine = function (cleanData) {
            var data = [];
            var maxValue = 0;
            _.forEach(cleanData, function (item) {
                var nextData = [];
                nextData[0] = flotChartsCreator.convertToDate(item.Date); // date
                if (parseInt(item.Value) < 0) {
                    item.Value = null;
                }
                nextData[1] = item.Value;
                maxValue = _.max([maxValue, parseFloat(item.Value)]);
                data.push(nextData);
            });
            return {maxValue: maxValue, data: data};
        };

        flotChartsCreator.changeHeaders = function (tempString, vpgs) {
            var vpgNames = 'Date,' + _.pluck(vpgs, 'Name').join(',');
            tempString = tempString.replace('Date,Value', vpgNames);
            return tempString;
        };

        flotChartsCreator.prepareMultiVpgsData = function (csv, selectedVpgs) {
            var chartData = flotChartsCreator.changeHeaders(csv, selectedVpgs);
            var cleanData = d3.csv.parse(chartData);
            var data = [];
            var dates = _.map(cleanData, function (data) {
                return flotChartsCreator.convertToDate(data.Date);
            });
            var maxValue = 0;
            _.forEach(selectedVpgs, function (vpg) {
                var nextVpgValues = _.map(cleanData, vpg.Name);
                var nextVpgData = [];
                for (var index = 0; index < nextVpgValues.length - 1; index++) {
                    var valueDateArray = [];
                    var value = parseFloat(nextVpgValues[index]);
                    if (maxValue < value) {
                        maxValue = value;
                    }
                    if (value < 0) {
                        value = null;
                    }
                    valueDateArray.push(dates[index]);
                    valueDateArray.push(value);
                    nextVpgData.push(valueDateArray);
                }

                data.push({
                    data: nextVpgData,
                    color: vpg.color,
                    lines: {show: true, lineWidth: 0, fill: 0.5, color: vpg.color}
                });
            });
            return {data: data, maxValue: maxValue};
        };


        flotChartsCreator.createMultiAreaChart = function (csv, selectedVpgs, bindTo, colors) {
            var chartData = flotChartsCreator.prepareMultiVpgsData(csv, selectedVpgs, colors);
            var data = chartData.data;
            var maxValue = chartData.maxValue;

            var ticksArray = flotChartsCreator.calcyAxisList(maxValue);
            var params = {
                xaxis: {
                    mode: 'time',
                    show: true,
                    timezone: 'browser',
                    labelWidth: 60,
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
                    borderWidth: {'left': 0, 'top': 0, 'bottom': 1, 'right': 1},
                    borderColor: {'left': '#ffffff', 'top': '#ffffff', 'bottom': '#cccccc', 'right': '#cccccc'},
                    hoverable: true,
                    labelMargin: 0
                },
                yaxis: {
                    tickDecimals: 0,
                    ticks: ticksArray,
                    min: 0,
                    tickLength: 0,
                    minTickSize: 0,
                    position: 'right',
                    labelWidth: 32
                }
            };
            flotChartsCreator.bindTooltip(bindTo);
            return $.plot(bindTo, data, params);
        };

        flotChartsCreator.createAreaChart = function (chart, csv, bindTo, slaValue) {
            if (csv.length === 0) {
                return {chart: null, mainValue: 'N/A'};
            }

            var mainValue;

            var cleanData = d3.csv.parse(csv);

            var serieasData = flotChartsCreator.prepareDataLine(cleanData);
            var maxValue = serieasData.maxValue;
            var data = serieasData.data;
            if (!data || data.length === 0 || data[data.length - 1].length === 0) {
                return {chart: null, mainValue: 'N/A'};
            }
            mainValue = Math.round(data[data.length - 1][1]);

            flotChartsCreator.maxValueForYAxis = 1;
            //preparing the yAxis ticks
            if (slaValue) {
                if (maxValue < (slaValue * 3 / 4)) {
                    slaValue = null;
                }
            }
            var ticksArray = flotChartsCreator.calcyAxisList(_.max([maxValue, slaValue]));

            var params = {
                xaxis: {
                    mode: 'time',
                    show: false,
                    labelWidth: 60,
                    labelHeight: 2,
                    //timeformat: '%Y %m %d %H%M%S',
                    //ticks:10,
                    //ticks: xTicksArray,
                    tickLength: 0,
                    tickLabel: {
                        fontSize: 6
                    }
                },
                series: {
                    lines: {show: true, lineWidth: 0, fill: true, fillColor: '#bbc5d4'},
                    points: {show: false, fill: false}
                    //	threshold: [{
                    //   below: 70,
                    //   color: 'red'
                    //}]
                },

                grid: {
                    color: '#000000',
                    aboveData: true,
                    outlineWidth: 2,
                    horizontalLines: true,
                    show: true,
                    borderWidth: {'left': 0, 'top': 0, 'bottom': 1, 'right': 0},
                    borderColor: {'left': '#ffffff', 'top': '#ffffff', 'bottom': '#cccccc', 'right': '#cccccc'},
                    hoverable: true,
                    markingsLineWidth: 0.5,
                    markingsStyle: 'dashed'
                },
                yaxis: {
                    tickDecimals: 0,
                    ticks: ticksArray,
                    min: 0,
                    tickLength: 0,
                    minTickSize: 0,
                    position: 'right',
                    labelWidth: 32
                },
                colors: '#cccccc'
            };

            if (slaValue) {
                params.grid.markings = [{yaxis: {from: slaValue, to: slaValue}, color: 'red'}];
            }

            if (chart) {
                chart.setData([data]);
                var axes = chart.getAxes();
                axes.yaxis.options.ticks = ticksArray;
                //axes.xaxis.options.ticks = xTicksArray;

                chart.setupGrid();
                chart.draw();
                $(flotChartConstants.TOOLTIP_SELECTOR).hide();
            } else {
                chart = $.plot(bindTo, [data], params);
                flotChartsCreator.bindTooltip(bindTo);
            }

            $(bindTo).bind('resize', function () {
                flotChartsCreator.paintxAxisTicks(bindTo, chart);
            });

            flotChartsCreator.paintxAxisTicks(bindTo, chart);

            if (slaValue) {
                updateSlaLabel(bindTo, chart, slaValue);
            }
            return {chart: chart, mainValue: mainValue};
        };

        flotChartsCreator.paintxAxisTicks = function (bindTo, chart) {
            var c = $(bindTo + ' .flot-base');
            var ctx = c[0].getContext('2d');
            ctx.beginPath();
            var height = chart.height() + 8;
            var space = chart.width() / 6;
            var position = 8;
            for (var i = 0; i < 7; i++) {
                ctx.moveTo(position, height);
                ctx.lineTo(position, height + 5);
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = '#000000';
                position = position + space;
            }
            ctx.stroke();
        };

        flotChartsCreator.bindTooltip = function (bindTo) {
            var tooltipColorClass = 'flot-tooltip-color';
            var tooltipElement = $(flotChartConstants.TOOLTIP_SELECTOR);
            var tooltipColorElement = $('.' + tooltipColorClass);
            var circleRadius = 15;

            $(bindTo).bind('plothover', function (event, pos, item) {
                if (item) {

                    //check if tooltip displayed over the right line, change placement to left side
                    var parentWidth = $(event.target.parentElement).width();
                    var tooltipWidth = tooltipElement.width();
                    item.pageX = (parentWidth - item.pageX) < (tooltipWidth + circleRadius) ? item.pageX - (tooltipWidth + circleRadius) : item.pageX;


                    var x = item.datapoint[0],
                        y = item.datapoint[1].toFixed(2);
                    var itemColor = item.series.lines.fill ? item.series.lines.fillColor : item.series.color;
                    var formatDate = $filter('date')(new Date(x), 'dd/MM/yyyy HH:mm');
                    var tooltipTemplate = _.template('<div class="<%=colorClass%>" ></div><%=formatDate%><div>Value: <%=y%></div>');

                    tooltipElement.html(tooltipTemplate({
                        colorClass: tooltipColorClass,
                        formatDate: formatDate,
                        y: y
                    })).css({
                        top: item.pageY + 5,
                        left: item.pageX + 5
                    }).show();

                    tooltipColorElement.css({backgroundColor: itemColor});
                } else {
                    tooltipElement.hide();
                }
            });
        };

        function updateSlaLabel(bindTo, chart, slaValue) {
            var slaLabel = chart.pointOffset({x: 0, y: slaValue});
            $('.flot-sla-text').remove();
            var slaTemplate = _.template('<div class="flot-sla-text" style="top:<%=slaToPos%>px;">SLA</div>');
            $(bindTo).append(slaTemplate({slaToPos: slaLabel.top - 10}));
        }

        flotChartsCreator.destroyChart = function (chart, bindTo) {
            $(bindTo).unbind(); //removes all attached events
            $(flotChartConstants.TOOLTIP_SELECTOR).remove();
            chart.destroy();
            chart = null;
            return chart;
        };

        return flotChartsCreator;
    });
