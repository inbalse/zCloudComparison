'use strict';

//---------- how to use ----------//
//in html
//<z-heat-map data="mapData1" height="100" weight="600" rows="6" columns="40"></z-heat-map>
//data format   =>   [{ status: "success" },
//                    { status: "failed" },
//                    { status: "warning" }];
//------------------------------------------------------------------------------------------//


angular.module('zvmApp.directives')
    .directive('zHeatMap', function ($state) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                height: '=',
                width: '=',
                rows: '=',
                columns: '='
            },
            link: function (scope, element) {

                //global varietals
                var parentNode = element[0],
                    colorHash,
                    createEmptySquares,
                    rowHeight,
                    columnsWidth,
                    newWidth,
                    newHeight,
                    defaultRows = 2,
                    defaultColumns = 12,
                    defaultHeight = 100,
                    spaceBetweenSquares = 5,
                    defaultWidth = 350;

                //hash that hold colors by key
                colorHash = {
                    empty: '#e6e8e9',
                    success: '#459E1E',
                    failed: '#CE0012',
                    warning: '#FBBD1D'
                };

                //return current size for square
//                var squareSize = function (total, cells) {
//                    return Math.floor(total / cells);
//                };

                //copy original data to private data and check if exist
                var dataToHeatMap = scope.data ? angular.copy(scope.data) : [];

                //get transfer data from controller if not exist keep default
                var height = scope.height && scope.height >= defaultHeight ? scope.height : defaultHeight;
                var width = scope.weight && scope.weight >= defaultWidth ? scope.weight : defaultWidth;
                var rows = scope.rows && scope.rows >= defaultRows ? scope.rows : defaultRows;
                var columns = scope.columns && scope.columns >= defaultColumns ? scope.columns : defaultColumns;

                //function that check how many empty squares
                var checkEmptySquares = function (emptySquares, dataSquares) {
                    //check if empty squares there many of current data
                    if (emptySquares > columns) {
                        //check if data not smaller that default columns
                        if (dataSquares > defaultRows * defaultColumns) {
                            return true;
                        } else {
                            //check if empty squares not large that max Size if heatMap has just two row
                            if (emptySquares > defaultRows * defaultColumns) {
                                return true;
                            }
                        }
                    }
                    return false;
                };

                var resizeRule = function (width, squaresCount, realData) {

                    newWidth = width * 3;

                    var getRowNumber = function () {
                        rows = Math.ceil(squaresCount / columns);
                    };

                    if (newWidth < 1280) {
                        if (squaresCount <= 25) {
                            rowHeight = columnsWidth = 24;
                            spaceBetweenSquares = 6;
                        } else if (squaresCount > 25 && squaresCount <= 43) {
                            rowHeight = columnsWidth = 20;
                        } else if (squaresCount > 43 && squaresCount <= 81) {
                            rowHeight = columnsWidth = 14;
                        } else if (squaresCount > 81) {
                            rowHeight = columnsWidth = 14;
                            getRowNumber();
                        }
                        if (squaresCount > 25) {
                            spaceBetweenSquares = 4;
                        }

                        defaultColumns = 10;

                    } else if (newWidth >= 1280 && newWidth < 1366) {
                        if (squaresCount <= 25) {
                            rowHeight = columnsWidth = 31;
                            spaceBetweenSquares = 6;
                        } else if (squaresCount > 25 && squaresCount <= 43) {
                            rowHeight = columnsWidth = 26;
                        } else if (squaresCount > 43 && squaresCount <= 81) {
                            rowHeight = columnsWidth = 18;
                        } else if (squaresCount > 81) {
                            rowHeight = columnsWidth = 18;
                            getRowNumber();
                        }
                        if (squaresCount > 25) {
                            spaceBetweenSquares = 4;
                        }

                        defaultColumns = 10;

                    } else if (newWidth >= 1366 && newWidth < 1682) {
                        if (squaresCount <= 25) {
                            rowHeight = columnsWidth = 32;
                            spaceBetweenSquares = 6;
                        } else if (squaresCount > 25 && squaresCount <= 43) {
                            rowHeight = columnsWidth = 25;
                        } else if (squaresCount > 43 && squaresCount <= 81) {
                            rowHeight = columnsWidth = 18;
                        } else if (squaresCount > 81) {
                            rowHeight = columnsWidth = 18;
                            getRowNumber();
                        }
                        if (squaresCount > 25) {
                            spaceBetweenSquares = 4;
                        }

                        defaultColumns = 12;

                    } else if (newWidth >= 1682 && newWidth < 1900) {
                        if (squaresCount <= 25) {
                            rowHeight = columnsWidth = 38;
                            spaceBetweenSquares = 6;
                        } else if (squaresCount > 25 && squaresCount <= 43) {
                            rowHeight = columnsWidth = 31;
                        } else if (squaresCount > 43 && squaresCount <= 81) {
                            rowHeight = columnsWidth = 22;
                        } else if (squaresCount > 81) {
                            rowHeight = columnsWidth = 22;
                            getRowNumber();
                        }
                        if (squaresCount > 25) {
                            spaceBetweenSquares = 4;
                        }

                        defaultColumns = 12;

                    } else if (newWidth > 1900) {
                        if (squaresCount <= 25) {
                            rowHeight = columnsWidth = 44;
                            spaceBetweenSquares = 6;
                        } else if (squaresCount > 25 && squaresCount <= 43) {
                            rowHeight = columnsWidth = 36;
                        } else if (squaresCount > 43 && squaresCount <= 81) {
                            rowHeight = columnsWidth = 25;
                        } else if (squaresCount > 81) {
                            rowHeight = columnsWidth = 25;
                            getRowNumber();
                        }
                        if (squaresCount > 25) {
                            spaceBetweenSquares = 4;
                        }

                        defaultColumns = 12;
                    }

                    rowHeight = rowHeight + 5;
                    columnsWidth = columnsWidth + 5;
                    if (realData.length / rows !== columns) {
                        setNumOfColumnsInRow(width, realData);
                    }
                };

                //function that set all empty squares to the bottom of heat map
                var _setEmptySquareToBottom = function (data) {

                    var mapData = [];
                    var index;

                    for (var row = 0; row < rows; row++) {
                        for (var col = 0; col < columns; col++) {
                            index = columns * row + col;
                            mapData[rows * col + row] = data[index];
                        }
                    }

                    return mapData;
                };

                var createHeatMap = function (width, height, newData) {

                    //if has new data
                    if (newData) {
                        dataToHeatMap = newData;
                    }
                    //create size of square row number by browser size
                    resizeRule(width, dataToHeatMap.length, dataToHeatMap);

                    //create empty squares if data not cover all heat map area
                    createEmptySquares = function (emptySquareLength) {
                        //empty object for fill the area is not covered
                        var emptySquareObj = {status: colorHash.empty};

                        for (var i = 0; i < emptySquareLength; i++) {
                            dataToHeatMap.push(emptySquareObj);
                        }

                        //create size of square row number by browser size
                        resizeRule(width, dataToHeatMap.length, dataToHeatMap);

                    };

                    //function that check if enough area place for heat map data
                    var checkIfEnoughPlaceToData = function (squareNum) {
                        //get num of squares in heat map data
                        var numOfData = dataToHeatMap.length;

                        //check if enough area
                        if (numOfData > squareNum) {

                            rows++;//create one nwe row

                            //call the function again
                            checkIfEnoughPlaceToData(rows * columns);
                        } else {
                            //check how many empty squares needs
                            var numOfEmptySquare = squareNum - numOfData;
                            //check if empty squares is not too many
                            if (checkEmptySquares(numOfEmptySquare, numOfData)) {
                                //return defaults values
                                rows = defaultRows;
                                checkIfEnoughPlaceToData(columns);
                            } else {
                                //check if empty squares and data squares together not small that minimum
                                if((numOfData + numOfEmptySquare) < 24){
                                    numOfEmptySquare = (defaultColumns * defaultRows) - numOfData;
                                }
                                createEmptySquares(numOfEmptySquare);
                            }
                        }
                    };

                    var numOfSquares = rows * columns;

                    //check if data is exist
                    if (!dataToHeatMap) {
                        //if data not exist create empty heat map
                        createEmptySquares(numOfSquares);
                    } else {
                        checkIfEnoughPlaceToData(numOfSquares);
                    }

                    //if has new data
                    if (newData) {
                        //set the square just if data is new (not ordered yet)
                        dataToHeatMap = _setEmptySquareToBottom(dataToHeatMap);
                    }

                    var margin_top = (newHeight - rows * columnsWidth) * 0.5;
                    margin_top = (margin_top < 0) ? 0 : margin_top - newHeight / 20; // 5% top

                    var heatMap = d3.select(parentNode).append('svg')
                        .attr('stroke', 'white')
                        .attr('overflow-y', 'auto')
                        .attr('stroke-width', spaceBetweenSquares + 'px')
                        //.style('border', '1px solid #A9A9A9')
                        .attr('width', columnsWidth * columns)
                        .attr('height', rowHeight * rows)
                        .style('margin-top', margin_top);

                    heatMap.selectAll('rect')
                        .data(dataToHeatMap)
                        .enter()
                        .append('rect')
                        .attr('y', function (d, i) {
                            return i % rows * rowHeight;
                        })
                        .attr('x', function (d, i) {
                            return Math.floor(i / rows) * columnsWidth;
                        })
                        .attr('width', columnsWidth)
                        .attr('height', rowHeight)
                        .attr('fill', function (d) {
                            return colorHash[d.status] ? colorHash[d.status] : colorHash.empty;
                        })

                        .attr('cursor', function (d) {
                            return d.Id ? 'pointer' : '';
                        })

                        .on('click', function (d) {
                            if (angular.isDefined(d.Id)) {
                                rectClick(d.Id);
                            }
                        })
                        .append('title')
                        .text(function (d) {
                            return d.Name;
                        });
                };

                var rectClick = function (Id) {
                    $state.go('main.vpg_details', {id: Id.GroupGuid});
                };

                var setNumOfColumnsInRow = function (newWidth, realData) {
                    if (angular.isDefined(columnsWidth)) {
                        var maxNumOfColumnsInROw = Math.floor(newWidth / columnsWidth) - 2;
                        var currentWidth = newWidth - maxNumOfColumnsInROw * spaceBetweenSquares;
                        columns = realData.length < 25 ? defaultColumns : Math.floor(currentWidth / columnsWidth);

                    }
                };

                //function that remove heatMap from html for create new one
                var removeHeatMap = function () {
                    $(parentNode).find('svg').remove();
                };

                //return current width to heatMap container
                var getCurrentWidth = function () {
                    newWidth = element.parent().width();
                    return newWidth ? newWidth : width;
                };
                //return current height to heatMap container
                var getCurrentHeight = function () {
                    newHeight = element.parent().height();
                    return newHeight ? newHeight : height;
                };

                //check if data is change
                scope.$watch('data', function (newVal) {
                    removeHeatMap();
                    createHeatMap(getCurrentWidth(), getCurrentHeight(), newVal);
                });
                //event if size of window is change
                scope.$on('zResize::resize', function () {
                    removeHeatMap();
                    createHeatMap(getCurrentWidth(), getCurrentHeight());
                });
            }
        };
    });
