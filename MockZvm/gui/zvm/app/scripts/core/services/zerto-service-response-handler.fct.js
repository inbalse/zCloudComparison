'use strict';

angular.module('zvmApp.services')
    .factory('zertoServiceResponseHandler', function ($rootScope, busyOverlayService, zertoLoggerServiceFactory, analyticsEventsTypes, zertoServiceWatcherFactory) {
        var zertoServiceResponseHandler = {};

        zertoServiceResponseHandler.success = function (result, operation, startOperationTime, logOp, zertoAnalyticsOp) {
            busyOverlayService.removeOperation(operation);

            if (logOp) {
                zertoLoggerServiceFactory.logSuccess(operation, result);
            }

            if (zertoAnalyticsOp) {
                try {
                    $rootScope.$emit(analyticsEventsTypes.PERFORMANCE.VQ, {
                        operation: operation,
                        isSuccess: true,
                        operationInSeconds: Math.abs(startOperationTime - new Date()) / 1000
                    });
                }
                catch (e) {
                }
            }
        };


        zertoServiceResponseHandler.error = function (error, params, operation, startOperationTime, logOp, zertoAnalyticsOp) {
            busyOverlayService.removeOperation(operation);
            if (logOp) {
                zertoLoggerServiceFactory.logError(operation, params, error);
            }

            if (zertoAnalyticsOp) {
                try {
                    $rootScope.$emit(analyticsEventsTypes.PERFORMANCE.VQ, {
                        operation: operation,
                        isSuccess: false,
                        operationInSeconds: Math.abs(startOperationTime - new Date()) / 1000,
                        errorString: JSON.stringify(error)
                    });
                }
                catch (e) {
                }
            }

            zertoServiceWatcherFactory.serviceFaultHandler(error);
        };


        return zertoServiceResponseHandler;
    });
