'use strict';

angular.module('zvmApp.directives')
    .directive('zPieChart', function () {
        return {
            restrict: 'E',
//            transclude: true,
            //template: '<div></div>',
            scope: {
                data: '=',
                colorRange: '=',
                pieWidth: '=',
                pieHeight: '='
            },
            link: function (scope, element) {

                var parentNode = element[0];

                var margin = {top: 0, right: 0, bottom: 0, left: 0},
                    width = scope.pieWidth - margin.left - margin.right,
                    height = scope.pieHeight - margin.top - margin.bottom,
                    radius = Math.min(width, height) / 2;



                var color = d3.scale.ordinal()
//                    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
                    .range(['#add187', '#e1e1e5']);

                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d.chunk; });

                var svg = d3.select(parentNode).append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('display', 'block')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

                function recreateSvg(){

                    if ($(parentNode.children).length !== 0) {
                        $(parentNode.children).remove();
                    }

                    svg = d3.select(parentNode).append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .append('g')
                        .attr('display', 'block')
                        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
                }
                scope.$watch('data', function(data) {
                    if (data && data.length > 0) {
                        svg.attr('display', 'block');
                        data.forEach(function (d) {
                            d.chunk = +d.chunk;
                        });
                        recreateSvg();
                        var g = svg.selectAll('.arc')
                            .data(pie(data))
                            .enter().append('g')
                            .attr('class', 'arc');

                        g.append('path')
                            .attr('d', arc)
                            .attr('fill', function (d, i) {
                                return color(i);
                            });
                        g.append('text')
                            .attr('transform', function (d) {
                                return 'translate(' + arc.centroid(d) + ')';
                            })
                            .attr('dy', '.35em')
                            .style('text-anchor', 'middle')
                            .text(function (d) {
                                return d.data.label;
                            });
                    }else{
                        svg.attr('display', 'none');
                    }
                });

                scope.$watch('colorRange', function(value) {
                    if (value) {
                        color = d3.scale.ordinal()
                            .range(value);
                    }
                });

            }
        };
    });
