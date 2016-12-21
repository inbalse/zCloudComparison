'use strict';

angular.module('zvmApp.services')
    .factory('autoUpdater', function ($timeout, $q, tweaksService, busyOverlayService) {

        var createAutoUpdater = function (updateFuncThis, updateFunc, params, showBusyOverlay) {
            var that = this;
            var deferred = $q.defer();
            var scopes = [];
            var interval = tweaksService.getTweak('t_TimerCallLength', 5000);
            var oldResult;
            var timer;

            var processDataFunc = function (data) {
                return data;
            };

            if (showBusyOverlay) {
                busyOverlayService.removeFromBlacklist(updateFunc.toString().match(/^function\s*([^\s(]+)/)[1]);
            } else {
                busyOverlayService.addToBlacklist(updateFunc.toString().match(/^function\s*([^\s(]+)/)[1]);
            }

            var tick = function () {
                if (scopes.length > 0) {
                    updateFunc.apply(updateFuncThis, params).then(function (result) {
                        if (scopes.length > 0) {
                            oldResult = result;
                            deferred.notify(processDataFunc(result));
                            timer = $timeout(tick, interval);
                        }
                    }, deferred.reject);
                }
            };

            that.unregister = function (scope) {
                scopes.splice(scopes.indexOf(scope), 1);
            };

            that.unregisterAll = function () {
                scopes = [];
            };

            that.register = function (scope, processData) {
                if (processData) {
                    processDataFunc = processData;
                }

                scopes.push(scope);
                scope.$on('$destroy', function () {
                    that.unregister(scope);
                });

                if (scopes.length === 1) {
                    tick();
                } else {
                    if (oldResult) {
                        deferred.notify(processDataFunc(oldResult));
                    } else {
                        updateFunc.apply(updateFuncThis, params).then(function (result) {
                            oldResult = result;
                            deferred.notify(processDataFunc(result));
                        });
                    }
                }
                return deferred.promise;
            };

            that.updateNow = function () {
                $timeout.cancel(timer);
                tick();
            };

            var notify = function () {
                deferred.notify(processDataFunc(oldResult));
            };
            return {
                register: that.register,
                unregister: that.unregister,
                unregisterAll: that.unregisterAll,
                updateNow: that.updateNow,
                notify: notify
            };
        };

        return {
            createAutoUpdater: createAutoUpdater
        };
    });
