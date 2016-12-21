'use strict';

angular.module('zvmApp.services')
    .factory('chartsCreator', function () {
        var chartsCreator = {};

        chartsCreator.colors = ['#bbc5d4', '#e9888d'];

        chartsCreator.createMultiAreaChart = function(columns, bindTo, types, showPoints, xAxisName, colors, maxValue, chartSize){

            chartsCreator.maxValueForYAxis = 1;

            function getY2TickObject(maxValue){
                return {values: chartsCreator.calcyAxisList(maxValue, columns, colors)};
            }

            var yValues = getY2TickObject(maxValue);

            var chartData =
            {
                bindto: bindTo,
                data: {
                    x: 'Date',
                    xFormat: '%Y%m%d %H%M%S',
                    columns: columns,
                    types:types
                },
                zoom: {
                    enabled: false
                },
                color: {
                    pattern: colors
                },
                point: {
                    show: showPoints
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            fit: false,
                            format: '%H:%M',
                            culling:{
                                max: 6
                            }
                        }
                    },
                    y: {
                        tick: yValues
                    }
                },
                tooltip: {
                    format: {
                        value: function (value) {
                            return value;
                        },
                        title: function (x) {
                            return d3.time.format('%d/%m/%Y  %H:%M')(x);
                        }
                    }
                },
                legend: {
                    show: false
                },
                size: {
                    height: chartSize.height,
                    width: chartSize.width
                }
            };

            return c3.generate(chartData);
        };

        chartsCreator.maxValueForYAxis = 1;

        chartsCreator.calculateMaxValue = function(ticks,maxValue){
            if (maxValue % ticks !== 0){

                maxValue = maxValue + 1;
                chartsCreator.calculateMaxValue(ticks,maxValue);
            }else{
                chartsCreator.maxValueForYAxis = maxValue;
                return chartsCreator.maxValueForYAxis;
            }
            return;
        };

        chartsCreator.calcyAxisList = function(maxValue, columns, chartColors){
            if (maxValue < 1 ){ maxValue = 1;}
            chartsCreator.calculateMaxValue(3, Math.ceil(maxValue));
            if(maxValue <= 1) {
                columns[columns.length] = [];
                columns[columns.length-1][0] = 'Value2';
                columns[columns.length-1][1] = 3;
                chartColors[columns.length-1] = '#ffffff';
            }
            var num = chartsCreator.maxValueForYAxis / 3;
            return [0, num, num*2, chartsCreator.maxValueForYAxis];
        };

        chartsCreator.createAreaChart = function(chartSize, chart, csv, bindTo, withSla, slaValue){

            if(csv.length===0){
                return {chart: null , mainValue: 'N/A'};
            }
            var chartColors = _.cloneDeep(chartsCreator.colors);
            var slaLine = withSla ? {value: slaValue, text: 'SLA', axis: 'y2' } : {};

            var cleanData = d3.csv.parse(csv);

            if(cleanData.length === 0){
                return {chart: null , mainValue: 'N/A'};
            }
            var types = {};
            var columns = [];

            columns[0] = [];
            _.forEach(cleanData,function(data){
                columns[0].push(data.Date);
            });

            columns[0].unshift('Date');

            columns[1] = [];
            var maxValue = 0;
            _.forEach(cleanData,function(data){
                if(parseInt(data.Value) < 0) {
                    data.Value = null;
                }
                if(data.Value) {
                    maxValue = _.max([maxValue, parseFloat(data.Value)]);
                }
                if(data.Value) {
                    columns[1].push(parseFloat(data.Value));
                }else{
                    columns[1].push(data.Value);
                }
            });

            columns[1].unshift('Value');

            types.Value = 'area';
            var mainValue = 'N/A';
            if (columns[1].length > 1) {
                mainValue = Math.round(columns[1][columns[1].length - 1]);
                if (mainValue === -2147483648) {
                    mainValue = 'N/A';
                }
            }

            if(withSla){

                chartColors = chartColors.reverse();
                if(maxValue < slaValue){
                    chartColors[0] = '#ffffff';
                    slaValue = slaValue + 100;
                }
                columns[2] = _.cloneDeep(columns[1]);
                columns[2][0] = 'ValueSla';
                types.ValueSla = 'area';
                var isAboveSla = false;
                columns[2] = _.map(columns[2],function(value){
                    if(parseInt(value) > slaValue) {
                        isAboveSla = true;
                        return slaValue;
                    }
                    return value;
                });
                if(!isAboveSla){
                    columns[2].push(0);
                    columns[1].push(slaValue);
                    columns[0].push(columns[0][columns[0].length-1]);
                }

            }
            cleanData.length = 0;

            chartsCreator.maxValueForYAxis = 1;

            function getY2TickObject(maxValue){
                //return {format: d3.format('.1r'), count: 4};
                if (withSla) {
                    if(slaValue > maxValue){
                        return {values: chartsCreator.calcyAxisList(slaValue, columns, chartColors)};
                    }
                }
                return {values: chartsCreator.calcyAxisList(maxValue, columns, chartColors)};
            }

            var yValues = getY2TickObject(maxValue);

            var generatedObject = {
                bindto: bindTo,
                data: {
                    x: 'Date',
                    xFormat: '%Y%m%d %H%M%S',
                    columns: columns,
                    types:types,
                    axes: {
                        ValueSla: 'y2',
                        Value: 'y2'
                    },
                    xSort: false
                },
                color: {
                    pattern: chartColors
                },
                point: {
                    show: false
                },
                axis: {
                    x: {
                        min: columns[0][1],
                        max: columns[0][columns[0].length-1],
                        show: true,
                        type: 'timeseries',
                        tick: {

                            count:0,
                            fit: false,
                            format: function () { return ''; },
                            culling:{
                                max: 6
                            }
                        }
                    },
                    y: {
                        show: false
                    },
                    y2: {
                        show: true,
                        tick: yValues,
                        max: yValues[yValues.length -1]
                    }
                },
                legend: {
                    show: false
                },transition: {
                    duration: 0
                },size: {
                    height: chartSize.height,
                    width: chartSize.width
                },
                tooltip: {
                    format: {
                        value: function (value) { if(value % 1 === 0) {return value;}else{return value.toFixed(3);} },
                        name: function () { return 'Value'; },
                        title: function (x) { return d3.time.format('%d/%m/%Y %H:%M')(x); }
                    },
                    grouped:false
                },
                padding: {
                    right: 40
                }
            };

            if(maxValue === 0){
                generatedObject.tooltip = {show:false};
            }

            if(withSla){
                generatedObject.data.axes = {
                    ValueSla: 'y2',
                    Value: 'y2'
                };
                generatedObject.grid = {
                    y: {
                        lines: [slaLine]
                    }
                };

                generatedObject.legend.show = false;
            }else{
                generatedObject.data.axes = {
                    Value: 'y2',
                    Value2: 'y2'
                };
            }
            if(chart) {
                $(bindTo).children().remove();
                chart= chart.destroy();
            }

            //if(chart){
            //    chart.load({
            //        columns: columns
            //    });
            //
            //    return {chart: chart,mainValue: mainValue};
            //}

            return {chart: c3.generate(generatedObject) , mainValue: mainValue};
        };

        return chartsCreator;
    });
