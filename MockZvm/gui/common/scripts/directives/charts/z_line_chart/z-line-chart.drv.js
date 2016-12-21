'use strict';

angular.module('zvmApp.directives')
    .directive('zLineChart', function () {
        return {
            restrict: 'E',
//            transclude: true,
            template: '<div></div>',
            scope: {
                data: '=',
                category: '=',
                date: '='
            },
            link: function (scope, element) {

                var h=100;
                var w=350;
                var padding = 20;
                var parentNode = element[0].firstChild;

                function getDate(d){

                    //20130101
                    var strDate = String(d);

                    var year = strDate.substr(0,4);
                    var month = strDate.substr(4,2)-1; //zero based index
                    var day = strDate.substr(6,2);

                    return new Date(year, month, day);
                }

                function buildLine(ds) {

                    var minDate = getDate(ds[0].month);
                    var maxDate = getDate(ds[ds.length-1].month);

                    //tooltip
                    var tooltip = d3.select('body').append('div')
                        .attr('class', 'tooltip')
                        .style('opacity', 0);


                    //scales
                    var xScale = d3.time.scale()
                        .domain([minDate, maxDate])
                        .range([padding+5, w-padding])
                        .nice();


                    var yScale = d3.scale.linear()
                        .domain([0, d3.max(ds, function(d){ return d.sales;})])
                        .range([h-padding,10])
                        .nice();

                    var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(d3.time.format('%b'));
                    var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(4);

                    var lineFun = d3.svg.line()
                        .x(function (d) {return xScale(getDate(d.month)); } )
                        .y(function (d) {return yScale(d.sales); })
                        .interpolate('linear');


                    var svg = d3.select(parentNode).append('svg').attr({ width:w, height:h, 'id':'svg-'+scope.category});

                    svg.append('g').call(yAxisGen)
                        .attr('class', 'y-axis')
                        .attr('transform', 'translate(' + padding + ', 0)');

                    svg.append('g').call(xAxisGen)
                        .attr('class','x-axis')
                        .attr('transform', 'translate(0,' + (h-padding) + ')');


                    svg.append('path')
                        .attr({
                            d: lineFun(ds),
                            'stroke' : 'purple',
                            'stroke-width': 2,
                            'fill' : 'none',
                            'class': 'path-'+ scope.category
                        });

                    // dots
                    svg.selectAll('circle')
                        .data(ds)
                        .enter()
                        .append('circle')
                        .attr({
                            cx: function(d) {return xScale(getDate(d.month)); },
                            cy: function (d) {return yScale(d.sales); },
                            r:  4,
                            'fill': '#666666',
                            class: 'circle-'+ scope.category
                        })
                        .on('mouseover', function(d) {
                            tooltip.transition()
                                .duration(500)
                                .style('opacity', 0.9);
                            tooltip.html('<strong>Sales $' + d.sales + 'K</strong>')
                                .style('left', (d3.event.pageX) + 'px')
                                .style('top', (d3.event.pageY - 28) + 'px');
                        })
                        .on('mouseout', function() {
                            tooltip.transition()
                                .duration(500)
                                .style('opacity', 0);
                        });
                }

                function updateLine(ds) {

                    var minDate = getDate(ds[0].month);
                    var maxDate = getDate(ds[ds.length-1].month);

                    //scales
                    var xScale = d3.time.scale()
                        .domain([minDate, maxDate])
                        .range([padding+5, w-padding]);


                    var yScale = d3.scale.linear()
                        .domain([0, d3.max(ds, function(d){ return d.sales;})])
                        .range([h-padding,10]);

                    var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom')
                        .tickFormat(d3.time.format('%b'))
                        .ticks(ds.length-1); //adjust number of ticks

                    var yAxisGen = d3.svg.axis().scale(yScale).orient('left')
                        .ticks(4);

                    var lineFun = d3.svg.line()
                        .x(function (d) {return xScale(getDate(d.month)); } )
                        .y(function (d) {return yScale(d.sales); })
                        .interpolate('linear');


                    var svg = d3.select(parentNode).select('svg');

                    svg.selectAll('g.y-axis').call(yAxisGen);

                    svg.selectAll('g.x-axis').call(xAxisGen);

                    svg.selectAll('.path-'+scope.category)
                        .transition() //add the transition and you're done!
                        .duration(500) //set the duration for more control
                        .ease('linear') //choose the type of animation linear, elastic, bounce, circle
                        .attr({
                            d: lineFun(ds)
                        });

                    //fix for moving dots on update
                    svg.selectAll('.circle-'+scope.category)
                        .transition()
                        .duration(500)
                        .ease('linear')
                        .attr({
                            cx: function(d) {return xScale(getDate(d.month)); },
                            cy: function (d) {return yScale(d.sales); }
                        });
                }

                scope.$watch('data', function(decodedData) {
                    if (decodedData) {
                        buildLine(decodedData);
                    }
                });

                scope.$watch('date', function(date) {
                    if (date) {
                        updateLine(_.last(scope.data, Number(date)));
                    }
                });

            }
        };
    });