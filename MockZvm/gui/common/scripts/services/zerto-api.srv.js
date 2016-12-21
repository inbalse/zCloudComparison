'use strict';
/*
 //
 // WHEN SENDING QUERY STRING PARAMETERS USE THE PARAMS PARAMETER IN ZERTO API
 //
 */
angular.module('zvmApp.services')
    .service('zertoApi', function ($q, $http, $state, zFocusService, $interval, $window, tweaksService, zertoLoggerServiceFactory, $rootScope) {
        var zertoApi = this;

        zertoApi.defaultHeaders = {};
        zertoApi.isPaused = false;

        zertoApi.makeRequest = function (deferred, method, url, data, headers, params, isInterval) {

            var request = {
                method: method,
                url: '/v1/' + url,
                headers: _.assign(zertoApi.defaultHeaders, headers),
                cache: false
            };

            if (data) {
                request.data = data;
            }

            if (params) {
                request.params = params;
            }

            zertoLoggerServiceFactory.addRestApiLog(request.url, 'Request', request);

            var httpPromise = $http(request),
                startOperationTime = new Date();

            if (isInterval) {
                httpPromise.success(function (result) {
                    zertoLoggerServiceFactory.addRestApiLog(request.url, 'Response', result);
                    deferred.notify(result);
                });
            } else {
                httpPromise.success(function (result) {
                    //GA
                    sendToAnalytics(request.url, true, startOperationTime);

                    zertoLoggerServiceFactory.addRestApiLog(request.url, 'Response', result);
                    deferred.resolve(result);
                });
            }

            httpPromise.error(function (error, status) {
                //GA
                sendToAnalytics(request.url, false, startOperationTime, JSON.stringify(error));

                zertoLoggerServiceFactory.addRestApiLog(request.url,'Response', error);
                if (error) {
                    error.HttpErroCode = status;
                }
                deferred.reject(error);
            });

            return deferred.promise;
        };

        zertoApi.makeRequestWrapper = function (method, url, data, headers, params) {
            var deferred = $q.defer();
            return zertoApi.makeRequest(deferred, method, url, data, headers, params);
        };

        zertoApi.callHash = {};

        zertoApi.makeRequestInterval = function (scope, method, url, data, headers, params) {
            var hashKey = method + '-' + url;
            if (!zertoApi.callHash[hashKey]) {
                zertoApi.callHash[hashKey] = {
                    method: method,
                    url: url,
                    data: data,
                    headers: headers,
                    deferred: $q.defer(),
                    count: 0
                };
            }

            zertoApi.callHash[hashKey].count++;

            scope.$on('$destroy', function () {
                zertoApi.callHash[hashKey].count--;
                if (zertoApi.callHash[hashKey].count === 0) {
                    zertoApi.callHash[hashKey].deferred.resolve('scope destroyed');
                    zertoApi.callHash[hashKey] = undefined;
                }
            });
            //todo:debounce needed here, not testable yet
            //_.debounce(function () {
            zertoApi.makeRequest(zertoApi.callHash[hashKey].deferred, method, url, data, headers, params, true);
            //}, 50);
            return zertoApi.callHash[hashKey].deferred.promise;
        };

        zertoApi.intervalRequest = function () {
            _.forIn(zertoApi.callHash, function (value) {
                if (value) {
                    zertoApi.makeRequest(value.deferred, value.method, value.url, value.data, value.headers, true);
                }
            });
        };

        zertoApi.intervalPromise = null;

        zertoApi.start = function () {
            var intervalTime = tweaksService.getTweak('t_TimerCallLength', 5000);
            if (!zertoApi.intervalPromise) {
                zertoApi.intervalPromise = $interval(zertoApi.intervalRequest, intervalTime);
                zertoApi.isPaused = false;
            }
        };

        zertoApi.stop = function () {
            $interval.cancel(zertoApi.intervalPromise);
            zertoApi.isPaused = true;
        };

        zertoApi.addHeaders = function (headers) {
            zertoApi.defaultHeaders = _.assign(headers);
        };

        zFocusService.subscribe.onFocus(function () {
            zertoApi.start();
        });

        zFocusService.subscribe.onBlur(function () {
            zertoApi.stop();
        });

        //GA
        function sendToAnalytics(url, isSuccess, startOperationTime, error) {
            var eventName = 'ANALYTICS::PERFORMANCE_REST';

            $rootScope.$emit(eventName, {
                operation: url,
                isSuccess: isSuccess,
                operationInSeconds: Math.abs(startOperationTime - new Date()) / 1000,
                errorString: error
            });
        }
    });
