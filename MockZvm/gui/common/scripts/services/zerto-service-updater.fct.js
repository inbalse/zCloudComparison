'use strict';

angular.module('zvmApp.services')
    .factory('zertoServiceUpdaterFactory', function ($window, $q,$state, zFocusService, tweaksService, zertoServiceFactory, zertoLoggerServiceFactory, busyOverlayService) {
        var zertoServiceUpdaterFactory = {};
        zertoServiceUpdaterFactory._isPaused = false;
        zertoServiceUpdaterFactory._operationsQueue = [];

        zertoServiceUpdaterFactory._interval = tweaksService.getTweak('t_TimerCallLength', 5000);

        zertoServiceUpdaterFactory.register = function (scope, fname, params, showBusyOverlay, callback, rejectOnFailure) {
            var operationQueueItem = _.find(zertoServiceUpdaterFactory._operationsQueue, function (iteratedQueueItem) {
                return iteratedQueueItem.fname === fname && _.isEqual(iteratedQueueItem.params, params);
            });

            var scopeItem = {};


            if (!operationQueueItem) {

                operationQueueItem = {};
                operationQueueItem.fname = fname;
                operationQueueItem.params = params;
                operationQueueItem.showBusyOverlay = showBusyOverlay;
                //operationQueueItem.oldResult = null;
                operationQueueItem.scopes = [];

                scopeItem.scopeId = scope.$id;
                scopeItem.deferred = $q.defer();
                scopeItem.rejectOnFailure = rejectOnFailure;

                scopeItem.callback = function (data) {
                    return data;
                };
                if (angular.isFunction(callback)) {
                    scopeItem.callback = callback;
                }

                scope.$on('$destroy', function () {
                    zertoServiceUpdaterFactory.unregister(scope, fname, params);
                });

                operationQueueItem.scopes.push(scopeItem);
                zertoServiceUpdaterFactory._operationsQueue.push(operationQueueItem);
                zertoLoggerServiceFactory.addtOmittableOperation(operationQueueItem);

                if (showBusyOverlay) {
                    busyOverlayService.removeFromBlacklist(fname);
                } else {
                    busyOverlayService.addToBlacklist(fname);
                }

                zertoServiceUpdaterFactory.update();
            }
            else {

                scopeItem = _.find(operationQueueItem.scopes, function (iteratedScopeItem) {
                    return iteratedScopeItem.scopeId === scope.$id;
                });

                if (!scopeItem) {
                    scopeItem = {};
                    scopeItem.scopeId = scope.$id;
                    scopeItem.deferred = $q.defer();
                    scopeItem.rejectOnFailure = rejectOnFailure;

                    scopeItem.callback = function (data) {
                        return data;
                    };
                    if (angular.isFunction(callback)) {
                        scopeItem.callback = callback;
                    }

                    scope.$on('$destroy', function () {
                        zertoServiceUpdaterFactory.unregister(scope, fname, params);
                    });

                    operationQueueItem.scopes.push(scopeItem);

                    zertoServiceUpdaterFactory.update();
                }
            }

            return scopeItem.deferred.promise;
        };

        zertoServiceUpdaterFactory.unregister = function (scope, fname, params) {
            var operationQueueItemIndex = _.findIndex(zertoServiceUpdaterFactory._operationsQueue, function (iteratedQueueItem) {
                return iteratedQueueItem.fname === fname && _.isEqual(iteratedQueueItem.params, params);
            });

            if (operationQueueItemIndex > -1) {
                var operationQueueItem = zertoServiceUpdaterFactory._operationsQueue[operationQueueItemIndex];
                _.remove(operationQueueItem.scopes, function (iteratedScopeItem) {
                    var flag = iteratedScopeItem.scopeId === scope.$id;
                    if (flag) {
                        iteratedScopeItem.deferred.resolve();
                    }
                    return flag;
                });

                if (operationQueueItem.scopes.length === 0) {
                    _.pullAt(zertoServiceUpdaterFactory._operationsQueue, [operationQueueItemIndex]);
                    zertoLoggerServiceFactory.removeOmittableOperation(fname);
                }
            }
        };

        zertoServiceUpdaterFactory.unregisterAll = function (fname) {
            _.remove(zertoServiceUpdaterFactory._operationsQueue, function (iteratedQueueItem) {
                var flag = iteratedQueueItem.fname === fname;
                if (flag) {
                    _.forEach(iteratedQueueItem.scopes, function (iteratedScope) {
                        iteratedScope.deferred.resolve();
                    });
                }
                return flag;
            });

        };

        zertoServiceUpdaterFactory.updateTimeout = null;

        zertoServiceUpdaterFactory.update = function () {
            clearTimeout(zertoServiceUpdaterFactory.updateTimeout);
            zertoServiceUpdaterFactory.updateTimeout = setTimeout(function () {
                zertoServiceUpdaterFactory.tick();
                zertoServiceUpdaterFactory.updateTimeout = null;
            }, 50);
        };

        zertoServiceUpdaterFactory.tick = function () {
            //zertoServiceUpdaterFactory.timestamp = moment();
            //console.log('tick, timestamp: ' + zertoServiceUpdaterFactory.timestamp);
            _.forEach(zertoServiceUpdaterFactory._operationsQueue, function (queueItem) {
                var promise = zertoServiceFactory[queueItem.fname].apply(zertoServiceFactory, queueItem.params);
                _.forEach(queueItem.scopes, function (iteratedScope) {
                    promise.then(function (result) {
                        iteratedScope.deferred.notify(iteratedScope.callback(result));
                    }, function (error) {
                        zertoLoggerServiceFactory.logError(queueItem.fname, queueItem.params, error);
                        if (iteratedScope.rejectOnFailure) {
                            iteratedScope.deferred.reject(error);
                        }
                    });
                });
            });
        };

        zertoServiceUpdaterFactory.ping = function () {
            if(zertoServiceFactory.GetSummaryMinimal) {
                zertoServiceFactory.GetSummaryMinimal();
            }
        };

        zertoServiceUpdaterFactory.clear = function () {
            clearInterval(zertoServiceUpdaterFactory._tickInterval);
            zertoServiceUpdaterFactory._tickInterval = undefined;
        };

        zertoServiceUpdaterFactory.start = function () {
            zertoServiceUpdaterFactory._tickInterval = setInterval(zertoServiceUpdaterFactory.tick, zertoServiceUpdaterFactory._interval);
        };

        zertoServiceUpdaterFactory.start();

        zertoServiceUpdaterFactory.interruptOff = function () {
            zertoServiceUpdaterFactory.update();
            zertoServiceUpdaterFactory.start();
            zertoServiceUpdaterFactory._isPaused = false;

            clearInterval(zertoServiceUpdaterFactory._pingInterval);
            zertoServiceUpdaterFactory._pingInterval = null;
        };

        zertoServiceUpdaterFactory.interruptOn = function () {
            zertoServiceUpdaterFactory.clear();
            zertoServiceUpdaterFactory._isPaused = true;

            if (zertoServiceUpdaterFactory._pingInterval) {
                clearInterval(zertoServiceUpdaterFactory._pingInterval);
            }
            zertoServiceUpdaterFactory._pingInterval = setInterval(zertoServiceUpdaterFactory.ping, zertoServiceUpdaterFactory._interval);
        };

        $($window).on('zerto-updater-interrupt', function () {
            if (zertoServiceUpdaterFactory._isPaused) {
                zertoServiceUpdaterFactory.interruptOff();
            } else {
                zertoServiceUpdaterFactory.interruptOn();
            }
        });


        zFocusService.subscribe.onFocus(function(){
            zertoServiceUpdaterFactory.interruptOff();
        });

        zFocusService.subscribe.onBlur(function(){
            zertoServiceUpdaterFactory.interruptOn();
        });

        return zertoServiceUpdaterFactory;
    });
