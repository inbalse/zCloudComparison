'use strict';
//todo:

angular.module('zvmApp.directives')
    .directive('tweakParser', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.unshift(parseInput);
                function parseInput(viewValue) {
                    try {
                        viewValue = JSON.parse(viewValue);
                    }
                    finally {
                        return viewValue;
                    }
                }
            }
        };
    });
angular.module('zvmApp.directives')
    .directive('zDebuggerDirective', function ($document, $filter, $compile, basil, zAlertFactory, zertoServiceFactory, zertoServiceUpdaterFactory,
                                               zertoApi, zDebugModel, tweaksService, $interval, $timeout) {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/common/directives/z_debug/z-debug.html',
            controller: function ($scope) {

                var LOG_FIELD = 'Log';
                var intervalNeedsUpdate = false;
                var updateGridInterval;

                var columnDefs = [
                    {
                        name: 'Date',
                        field: 'date',
                        width: 75
                    }, {
                        name: 'Operation',
                        field: 'operation'
                    }, {
                        name: 'Protocol',
                        field: 'protocol',
                        width: 20
                    },{
                        name: 'Type',
                        field: 'type',
                        width: 40
                    },{
                        name: LOG_FIELD,
                        field: LOG_FIELD,
                        formatter: $filter('objectFormatter'),
                        width: 55
                    }
                ];

                $scope.customOptions = {
                    columns: columnDefs,
                    showSearch: true,
                    showCheckbox: false
                };

                var tab = 'Log';
                $scope.logTabIsDisplayed = true;
                $scope.gridObj = {};
                $scope.gridData = [];
                $scope.model = {searchInput: '', intervalInput: ''};
                $scope.disableCopy = !window.clipboardData;
                $scope.logging = !!zertoServiceFactory.getLogRequests();
                $scope.updater = zertoServiceUpdaterFactory;
                $scope.restObj = {};
                $scope.restObj.method = 'GET';
                $scope.tweaks = tweaksService.tweaks;
                $scope.isScale = tweaksService.getTweak('t_isScaleEnvironment', false);
                if ($scope.isScale) {
                    $scope.gridObj.grid = null;
                }

                $scope.tabClicked = function (newTab) {
                    tab = newTab;
                    $scope.logTabIsDisplayed = (tab === 'Log');
                    if ($scope.logTabIsDisplayed) {
                        syncRenderGrid();
                    }
                    $scope.isGridRender = false;
                };

                var onSuccess = function (result) {
                    $scope.restResult = $filter('json')(result);
                };

                var onFail = function () {
                    $scope.restResult = 'ERROR';
                };

                $scope.submit = function () {
                    zertoApi.makeRequestWrapper($scope.restObj.method, $scope.restObj.url).then(onSuccess, onFail);
                };

                $scope.clear = function () {
                    zlog.clear();
                    // clear grid data
                    if($scope.gridObj.grid) {
                        $scope.gridData = [];
                    }
                };

                $scope.copy = function () {
                    if (window.clipboardData) {
                        window.clipboardData.setData('Text', zlog.getLog());
                    }
                };

                var updateGrid = function () {
                    // if interval function is undefined or needs an update - define it
                    if (!angular.isDefined(updateGridInterval) || intervalNeedsUpdate) {
                        // initial processing
                        if($scope.gridObj.grid) {
                            $scope.gridData = zDebugModel.processData();
                        }
                        intervalNeedsUpdate = false;
                        updateGridInterval = $interval(function () {
                            if($scope.gridObj.grid) {
                                $scope.gridData = zDebugModel.processData();
                            }
                        }, zertoServiceUpdaterFactory._interval);
                    }
                };

                // cancel interval function
                var stopGridUpdate = function () {
                    if (angular.isDefined(updateGridInterval)) {
                        $interval.cancel(updateGridInterval);
                        updateGridInterval = undefined;
                    }
                };

                // enable/disable logs
                $scope.toggleLogs = function () {
                    if ($scope.logging) {
                        // disable logs
                        zertoServiceFactory.setLogRequests(false);
                        $scope.logging = false;
                        stopGridUpdate();

                    }
                    else {
                        // enable logs
                        zertoServiceFactory.setLogRequests(true);
                        $scope.logging = true;
                        updateGrid();
                    }
                };

                $scope.downloadLog = function () {
                    // set timeout in order to prevent "$apply is already in progress" error
                    setTimeout(function () {
                        zlog.downloadLog();
                    }, 1);
                };

                // close debugger panel
                $scope.close = function () {
                    stopGridUpdate();
                    if ($scope.gridObj.grid) {
                        $scope.gridObj.grid.destroy();
                    }
                    $scope.isGridRender = false;
                    $scope.$emit('closeDebugger');
                };

                // pause site updating
                $scope.pause = function () {
                    zertoServiceUpdaterFactory.interruptOn();
                    zertoApi.stop();
                };

                // resume site updating
                $scope.resume = function () {
                    zertoServiceUpdaterFactory.interruptOff();
                    zertoApi.start();
                };

                // when interval value is changed - update zertoServiceUpdaterFactory and zertoApi
                $scope.tweakChanged = function (key, value) {
                    if (key === 't_isScaleEnvironment') {
                        $scope.isScale = tweaksService.getTweak('t_isScaleEnvironment', false);
                        if ($scope.isScale) {
                            $scope.gridObj.grid = null;
                        }
                    }
                    else if (key === 't_TimerCallLength') {
                        // update tweaks service
                        zertoServiceUpdaterFactory.interruptOn();
                        zertoApi.stop();

                        zertoServiceUpdaterFactory._interval = value;
                        zertoApi.intervalTime = value;

                        zertoServiceUpdaterFactory.interruptOff();
                        zertoApi.start();

                        // update flag
                        intervalNeedsUpdate = true;

                        // immediate grid update
                        if ($scope.logging) {
                            updateGrid();
                        }
                    }
                };

                // grid object is defined and logs enabled - update grid
                $scope.$watch('gridObj.grid', function (newValue) {
                    if ($scope.logging && newValue) {
                        updateGrid();
                    }
                });

                // open z-popover when row is clicked
                $scope.rowClick = function (e, row, cell, grid) {
                    if (cell === grid.getColumnIndex(LOG_FIELD)) {
                        e.preventDefault();
                        e.stopPropagation();
                        $compile($(e.target).closest('div'))($scope);
                        if (!$scope.$$phase) {
                            $scope.$digest();
                        }
                    }
                };

                var syncRenderGrid = function () {
                    $timeout(function () {
                        $scope.isGridRender = true;
                    }, 100);
                };

                syncRenderGrid();
            }
        };
    });
