'use strict';
angular.module('zvmApp.directives')
    .directive('zRingChart', function () {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                colorRange: '=',
                pieWidth: '=',
                pieHeight: '='
            },
            link: function (scope, element) {
                if(angular.isUndefined(scope.colorRange)){
                    scope.colorRange = ['#8d9fb8', '#e1e1e5'];
                }
                var parentNode = element[0];

                var degree = Math.PI / 180;

                var width = scope.pieWidth,
                    height = scope.pieHeight;

                var color = d3.scale.ordinal().range(scope.colorRange);

                var pie = d3.layout.pie().startAngle(0 * degree).endAngle(360 * degree)
                    .sort(null);

                var arc = d3.svg.arc()
                    .innerRadius(44)
                    .outerRadius(52);

                var svg = d3.select(parentNode).append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

                scope.$watch('data', function (data) {

                    if (data && data.length > 0) {
                        svg.attr('display', 'block');

                        color = d3.scale.ordinal().range(scope.colorRange);
                        svg.selectAll('path')
                            .data(pie(data))
                            .enter().append('path')
                            .attr('fill', function (d, i) {
                                return color(i);
                            })
                            .attr('d', arc)
                            .each(function (d) {
                                this._current = d;
                            }); // store the initial values;


                        draw();
                    } else {
                        svg.attr('display', 'none');
                    }
                });

                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);  // jshint ignore:line
                    this._current = i(0);                      // jshint ignore:line
                    return function (t) {
                        return arc(i(t));
                    };
                }

                function draw() {
                    svg.selectAll('path')
                        .data(pie(scope.data))
                        .transition()
                        .duration(2500)
                        .attrTween('d', arcTween);
                }


            }
        };
    });