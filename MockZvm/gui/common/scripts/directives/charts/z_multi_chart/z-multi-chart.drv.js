'use strict';

angular.module('zvmApp.directives')
    .directive('zMultiChart', function () {
        function drawMultiChart(currentWidth,currentHeight,parentNode,chartData,titleLabel){
            var margin = {top: 60, right: 80, bottom: 60, left: 60},
                width = currentWidth - margin.left - margin.right,
                height = currentHeight - margin.top - margin.bottom;

            var data = d3.csv.parse(chartData.data);

            _.rest(data);

            var parseDate = d3.time.format('%Y%m%d%H%M%S').parse;

            var x = d3.time.scale()
                .range([0, width]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var color = d3.scale.category10();

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            var line = d3.svg.line()
                .interpolate('linear')
                .defined(function(d) { return d.yvalue >= 0; })
                .x(function(d) { return x(d.Date); })
                .y(function(d) { return y(d.yvalue); });

            var svg = d3.select(parentNode).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'Date'; }));

                data.forEach(function(d) {
                    d.Date = parseDate(d.Date);

                });

                var cities = color.domain().map(function(name) {
                    return {
                        name: name,
                        values: data.map(function(d) {
                            return {Date: d.Date, yvalue: +d[name]};
                        })
                    };
                });

                x.domain(d3.extent(data, function(d) { return d.Date; }));

                y.domain([
                    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.yvalue < 0 ? 0 :v.yvalue; }); }),
                    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.yvalue; }); })
                ]);


                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis)
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 6)
                    .attr('dy', '.71em')
                    .style('text-anchor', 'end');
                    //.text('yvalue (ºF)');

                var city = svg.selectAll('.city')
                    .data(cities)
                    .enter().append('g')
                    .attr('class', 'city');

                city.append('path')
                    .attr('class', 'line')
                    .attr('d', function(d) { return line(d.values); })
                    .attr('data-legend',function(d) { return d.name;})
                    .style('stroke', function(d) {return chartData.colors[d.name]; // return color(d.name);
                     });

                city.append('text')
                    .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                    .attr('transform', function(d) { return 'translate(' + x(d.value.Date) + ',' + y(d.value.yvalue) + ')'; })
                    .attr('x', 3)
                    .attr('dy', '.35em')
                    .text(function(d) { return d.name; });

            svg.append('text')
                .text(titleLabel)
                .attr('x', -20)
                .attr('y', -20)
                .attr('class', 'title-label');

            svg.append('g')
                .attr('class','legend')
                .attr('transform','translate(50,30)')
                .attr('data-style-padding',10)
                .style('font-size','16px')
                .call(d3.legend);
        }


        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                data: '=',
                titleLabel: '@'
            },
            link: function (scope, element) {
                function drawChart(redraw) {
                    if(scope.data) {
                        if (redraw) {
                            $(element).find('svg').remove();
                        }
                        drawMultiChart(element.parent().width(), element.parent().height(), parentNode, scope.data, scope.titleLabel);
                    }
                }

                var parentNode = element[0].firstChild;

                if(angular.isDefined(scope.data)) {
                    drawChart(false);
                }

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