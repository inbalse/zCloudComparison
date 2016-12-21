'use strict';

angular.module('zvmApp.directives')
    .directive('zAreaChart', function () {

        function drawAreaChart(currentWidth, currentHeight, parentNode, data, withSla, slaValue, title) {

            var chartData = d3.csv.parse(data);
            var mainValue = 'NA';
            _.rest(chartData);
            var maxValue = parseFloat(_.max(chartData, function (item) {
                return parseFloat(item.Value);
            }).Value);
            if(maxValue === 0){
                maxValue = 100;
            }

            if(withSla && slaValue > maxValue){
                maxValue = slaValue;
            }
            //check if data is not empty
            if (chartData.length) {
                mainValue = Math.round(chartData[chartData.length - 1].Value);
                if (mainValue === -2147483648) {
                    mainValue = 'NA';
                }
            } else {
                //set to empty when data is empty or (vpg during in initializing)

                chartData[0] = {Date: new Date()};
            }

            var margin = {top: 40, right: 45, bottom: 6, left: 20},
                width = currentWidth - margin.left - margin.right,
                height = currentHeight - margin.top - margin.bottom;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('right')
                .tickFormat(d3.format('.2f'))
                .tickValues([0, maxValue / 3 , 2 * maxValue / 3, maxValue]);


            var line = d3.svg.line()
                .interpolate('linear')
                .defined(function(d) { return d.Value >= 0; })
                .x(function (d) {
                    return x(d.Date);
                })
                .y(function (d) {
                    return y(d.Value);
                });

            var area = d3.svg.area()
                .defined(function(d) { return d.Value >= 0; })
                .x(function (d) {
                    return x(d.Date);
                })
                .y0(height)
                .y1(function (d) {
                    return y(d.Value);
                });


            var svg = d3.select(parentNode).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


            x.domain([chartData[0].Date, chartData[chartData.length - 1].Date]);
            var tempDomain = d3.extent(chartData, function (d) {
                return d.Value > 0 ? d.Value : 0;
            });
            if (withSla) {
                if (slaValue > tempDomain[tempDomain.length - 1]) {
                    tempDomain[tempDomain.length - 1] = slaValue;
                }
            }
            y.domain(tempDomain);

            if (withSla) {
                svg.append('clipPath')
                    .attr('id', 'clip-above')
                    .append('rect')
                    .attr('width', width)
                    .attr('height', y(slaValue));

                svg.append('clipPath')
                    .attr('id', 'clip-below')
                    .append('rect')
                    .attr('y', y(slaValue))
                    .attr('width', width)
                    .attr('height', height - y(slaValue));
            }
            svg.selectAll('.line')
                .data(['above', 'below'])
                .enter().append('path')
                .attr('class', function (d) {
                    return 'line ' + d;
                })
                .attr('clip-path', function (d) {
                    return 'url(#clip-' + d + ')';
                })
                .datum(chartData)
                .attr('d', line);


            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + width + ',0)')
                .call(yAxis);


            if (!withSla) {
                svg.append('path')
                    .datum(chartData)
                    .attr('class', 'area-nosla')
                    .attr('d', area);
            } else {
                svg.append('path')
                    .datum(chartData)
                    .attr('class', 'area')
                    .attr('d', area);

                svg.selectAll('.area')
                    .data(['above', 'below'])
                    .enter().append('path')
                    .attr('class', function (d) {
                        return d;
                    })
                    .attr('clip-path', function (d) {
                        return 'url(#clip-' + d + ')';
                    })
                    .datum(chartData)
                    .attr('d', area);

                svg.append('line')
                    .attr('class', 'd3-dp-line')
                    .attr('x1', 0)
                    .attr('y1', y(slaValue))
                    .attr('x2', width - 30)
                    .attr('y2', y(slaValue))
                    .style('stroke-dasharray', ('8, 3'))
                    .style('stroke-opacity', 0.9)
                    .style('stroke', '#bd161e');

                svg.append('text')
                    .text('SLA')
                    .attr('x', width - 25)
                    .attr('y', y(slaValue))
                    .attr('class', 'sla-label');
            }

            var t = svg.append('text')
                .text(mainValue)
                .attr('x', width / 2)
                .attr('y', (height / 2))
                .attr('class', 'main-value-label');
            var textWidth = t.node().getComputedTextLength();
            t.attr('x', (width - textWidth)/ 2);

            svg.append('text')
                .text(title)
                .attr('x', -20)
                .attr('y', -20)
                .attr('class', 'title-label');

        }

        return {
            restrict: 'E',
            template: '<div ></div>',
            scope: {
                height: '=',
                withThresholdLine: '=',
                data: '=',
                title: '@'
            },
            link: function (scope, element) {

                function drawChart(redraw) {
                    if (redraw) {
                        $(element).find('svg').remove();
                    }
                    if(scope.data) {
                        var sla = angular.isDefined(scope.data.slaValue) ? scope.data.slaValue : 0;
                        drawAreaChart(element.parent().width(), scope.height, parentNode, scope.data.chartData, scope.withThresholdLine, sla, scope.title);
                    }
                }

                var parentNode = element[0].firstChild;

                drawChart(false);

                scope.$on('zResize::resize', function() {
                    drawChart(true);
                });

                scope.$watch('data', function (newValue,oldValue) {
                    if (newValue === oldValue) {
                        return;
                    }

                    drawChart(true);
                });


            }
        };
    });
