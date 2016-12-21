'use strict';

// -------- this how to use ------------//
//data format
//[{chunk: 12, text:"12",tooltipText:"percent is 12", color: "#A7423A", image:"assets/alerts/smallYellowWarning.png"}];
// in html
//   <z-status-chart data="statusPieData" pie-width="'300'" pie-height="'300'" ></z-status-chart>
//-------------------------------------//

angular.module('zvmApp.directives')
    .directive('zStatusChart', function () {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                divideColor: '=?',
                createLegend: '=?'
            },
            link: function (scope, element) {

                var parentNode = element[0];
                var data;
                var defaultWidth = 300;
                var defaultHeight = 300;
                var maxSpace = 8;
                var divideColor = angular.isDefined(scope.divideColor) ? scope.divideColor : 'white';

                var appendTooltipToHtml = function (target) {

                    var tooltipTemplate = '<div id=\'d3Tooltip\' class="tooltip top fade in" >' +
                        '<div class="tooltip-arrow"></div>' +
                        '<div id="value" class="tooltip-inner "></div>' +
                        '</div>';

                    if ($('#d3Tooltip').length === 0) {
                        var parent = $(target).closest('z-status-chart').parent();
                        $(tooltipTemplate).appendTo(parent);
                    }
                };

                var createPieChart = function (newData, newWidth, newHeight) {
                    var radiusPadding = 1;

                    var rangesList = [
                        {size:99,range:-15,radiusPadding:1},
                        {size:110,range:-10,radiusPadding:0.93},
                        {size:120,range:-10,radiusPadding:0.95},
                        {size:126,range:-12,radiusPadding: 1.10},
                        {size:130,range:-8,radiusPadding: 1.10},
                        {size:140,range:-6,radiusPadding: 1.15},
                        {size:146,range:-2,radiusPadding: 1.2},
                        {size:150,range:0,radiusPadding: 1.21},
                        {size:160,range:4,radiusPadding: 1.22},
                        {size:170,range:10,radiusPadding: 1.23},
                        {size:180,range:18,radiusPadding: 1.26},
                        {size:200,range:22,radiusPadding: 1.29},
                        {size:205,range:24,radiusPadding: 1.29},
                        {size:215,range:30,radiusPadding: 1.33},
                        {size:220,range:37,radiusPadding: 1.36},
                        {size:230,range:42,radiusPadding: 1.37},
                        {size:240,range:47,radiusPadding: 1.38},
                        {size:250,range:50,radiusPadding: 1.41},
                        {size:260,range:51,radiusPadding: 1.43}
                    ];


                    //get current range to text outside the pie by current radius
                    var getCurrentRangeBySize = function (radiusSize) {

                        var range = 0;

                        var size = Math.floor(radiusSize);

                        if(size > 260){
                            range = 53;
                            radiusPadding = 1.45;
                        }else {
                            _.some(rangesList, function (item) {
                                if (size <= item.size) {
                                    range = item.range;
                                    radiusPadding = item.radiusPadding;
                                    return true;
                                }
                            });
                        }

                        return range;
                    };

                    if ($(parentNode.children).length !== 0) {
                        $(parentNode.children).remove();
                    }

                    if (angular.isDefined(newData)) {
                        if (newData.length !== 0) {
                            data = newData;
                        } else {
                            //create default empty obj
                            data = [
                                {chunk: 1, text: '0', tooltipText: 'No Status', color: '#E6E8E9'}
                            ];
                        }
                    }

                    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                        width = newWidth ? newWidth : defaultWidth - margin.left - margin.right,
                        height = newHeight ? newHeight : defaultHeight - margin.top - margin.bottom;

                    var calcR = Math.min(width, height);
                    getCurrentRangeBySize(calcR);

                    var radius = calcR / radiusPadding;

                    var maxR = 92;
                    var middleR = 81;
                    var minR = 77;

                    var arc = d3.svg.arc()
                        .outerRadius(radius - maxR)
                        .innerRadius(radius - (middleR - 1));

                    var arcOuter = d3.svg.arc()
                        .outerRadius(radius - middleR)
                        .innerRadius(radius - minR);

                    var arcDivider = d3.svg.arc()
                        .outerRadius(radius - maxR)
                        .innerRadius(radius - minR);


                    var pie = d3.layout.pie()
                        .sort(null)
                        .value(function (d) {
                            return d.chunk;
                        });

                    var svg = d3.select(parentNode).append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g')
                        .attr('display', 'block')
                        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

                    svg.attr('display', 'block');

                    var arcs = svg.selectAll('.arc')
                        .data(pie(data))
                        .enter()
                        .append('g')
                        .attr('class', 'arc');

                    var outerArcs = svg.selectAll('.arc-outer')
                        .data(pie(data))
                        .enter()
                        .append('g')
                        .attr('class', 'arc-outer');

                    var dividerArcs = svg.selectAll('.divider-arc')
                        .data(pie(data))
                        .enter()
                        .append('g')
                        .attr('class', 'divider-arc');

                    arcs.datum(data).selectAll('path')
                        .data(pie(data))
                        .enter()
                        .append('path')
                        .attr('fill', function (d) {
                            return d.data.color;
                        })
                        .attr('d', arc);

//============================================ DYNAMIC LEGEND ===================================//

                    //check if use dynamic legend (like in theme example not in dashboard)
                    if (angular.isDefined(scope.createLegend) && scope.createLegend) {
                        var legendRectSize = 18;
                        var secondLegendRectSize = 12;
                        var legendSpacing = (height / 6) - legendRectSize;

                        var firstLegend = svg.selectAll('.first-legend')
                            .data(pie(data))
                            .enter()
                            .append('g')
                            .attr('class', 'legend')
                            .attr('transform', function (d, i) {
                                var height = legendRectSize + legendSpacing;
                                var offset = height * pie(data).length / 2;
                                var horz = legendRectSize * 9;
                                var vert = i * height - offset;
                                return 'translate(' + horz + ',' + vert + ')';
                            });

                        firstLegend.append('rect')
                            .data(pie(data))
                            .attr('width', legendRectSize)
                            .attr('height', legendRectSize)
                            .attr('fill', function (d) {
                                return angular.isDefined(d.data.outerColor) ? d.data.outerColor : d.data.color;
                            });

                        var textLeft = 25;
                        var textTop = 14;

                        firstLegend.append('text')
                            .attr('x', textLeft)
                            .attr('y', textTop)
                            .style('font-weight', 'bold')
                            .style('font-size', '13')
                            .text(function (d) {
                                return d.data.legendText;
                            });

                        //-------------------------------SECOND COLOR IN LEGEND SQUARE----------------------------------------------

                        var secondLegendColor = svg.selectAll('.second-legend')
                            .data(pie(data))
                            .enter()
                            .append('g')
                            .attr('class', 'legend1')
                            .attr('transform', function (d, i) {
                                var height = legendRectSize + legendSpacing;
                                var offset = height * pie(data).length / 2;
                                var horz = legendRectSize * 9;
                                var vert = i * height - offset;
                                return 'translate(' + horz + ',' + vert + ')';
                            });

                        secondLegendColor.append('rect')
                            .data(pie(data))
                            .attr('width', legendRectSize)
                            .attr('height', secondLegendRectSize)
                            .attr('fill', function (d) {
                                return d.data.color;
                            });
                    }

//===========================================================================================================================//

                    outerArcs.datum(data).selectAll('path')
                        .data(pie)
                        .enter().append('path')
                        .attr('fill', function (d) {
                            return angular.isDefined(d.data.outerColor) ? d.data.outerColor : d.data.color;
                        })
                        .attr('d', arcOuter);

                    dividerArcs.append('path')
                        .attr('fill', 'white')
                        .attr('fill-opacity', 0.1)
                        .attr('d', arcDivider)
                        .style('stroke', divideColor)
                        .style('stroke-width', 2)
                        .on('click', function (d) {

                            appendTooltipToHtml(d3.event.target);

                            var width = $('#d3Tooltip').width();
                            d3.select('#d3Tooltip')
                                .style('left', (d3.event.layerX - (width * 0.5)) + 'px')
                                .style('top', (d3.event.layerY - 30) + 'px')
                                .style('opacity', 1)
                                .select('#value')
                                .text(d.data.tooltipText);
                        })
                        .on('mouseout', function () {
                            //check if not image
                            if (!$(d3.event.relatedTarget).is('image')) {
                                // Hide the tooltip
                                d3.select('#d3Tooltip')
                                    .style('opacity', 0);
                            }
                        });

                    dividerArcs.datum(data).selectAll('text')
                        .data(pie)
                        .enter().append('text')
                        .attr('transform', function (d) {
                            var c = arc.centroid(d),
                                x = c[0],
                                y = c[1],
                                textRange = radius / 2 + getCurrentRangeBySize(radius),
                            // set text range
                                h = Math.sqrt(x * x + y * y);
                            return 'translate(' + (x / h * textRange) + ',' + (y / h * textRange) + ')';
                        })
                        .attr('dy', '.35em')
                        .attr('font-size', '11px')
                        .attr('fill', function () {
                            return '#595959';
                        })
                        .attr('text-anchor', function (d) {
                            // set the center
                            return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : 'start';
                        })
                        .text(function (d) {
                            return d.data.text;
                        });

                    var isImageExist = _.filter(_.pluck(data, 'image'), function (image) {
                        return angular.isDefined(image);
                    });

                    if (isImageExist.length) {
                        dividerArcs.datum(data).selectAll('image')
                            .data(pie)
                            .enter().append('image')
                            .attr('transform', function (d) {
                                return 'translate(' + arc.centroid(d) + ')';
                            })
                            .attr('height', 15)
                            .attr('width', 15)
                            .attr('y', '-11')
                            .attr('x', '-9')
                            .attr('xlink:href', function (d) {
                                //check if enough space for image
                                return d.data.chunk > maxSpace ? d.data.image : '';
                            })
                            .on('click', function (d) {

                                appendTooltipToHtml(d3.event.target);

                                var width = $('#d3Tooltip').width();
                                d3.select('#d3Tooltip')
                                    .style('left', (d3.event.layerX - (width * 0.5)) + 'px')
                                    .style('top', (d3.event.layerY - 30) + 'px')
                                    .style('opacity', 1)
                                    .select('#value')
                                    .text(d.data.tooltipText);
                            })
                            .on('mouseout', function () {
                                //check if not path
                                if (!$(d3.event.relatedTarget).is('path')) {
                                    // Hide the tooltip
                                    d3.select('#d3Tooltip')
                                        .style('opacity', 0);
                                }
                            });
                    }
                };


                var getCurrentWidth = function () {
                    var newWidth = element.parent().width();
                    return newWidth ? newWidth : defaultWidth;
                };

                var getCurrentHeight = function () {
                    var newHeight = element.parent().height();
                    return newHeight ? newHeight : defaultHeight;
                };

                scope.$watch('data', function (newValue) {
                    if (newValue) {
                        var width = getCurrentWidth();
                        var height = getCurrentHeight();

                        createPieChart(newValue, width, height);
                    }
                });

                //event if size of window is change
                scope.$on('zResize::resize', function () {
                    var width = getCurrentWidth();
                    var height = getCurrentHeight();

                    createPieChart(undefined, width, height);
                });
            }
        };
    });
