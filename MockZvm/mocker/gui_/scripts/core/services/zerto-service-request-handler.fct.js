'use strict';

angular.module('zvmApp.services')
    .factory('zertoServiceRequestHandler', function ($q, amf, $location, zertoServiceResponseHandler) {

        var zertoServiceRequestHandler = {};

        amf.init('bogus',
            $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/ZvmService/VisualQueryProvider');

        zertoServiceRequestHandler.invoke = function (operation, params, startOperationTime, logOp, zertoAnalyticsOp) {
            var deffer = $q.defer();

            amf.invoke('Zerto.Zvm.Services.VisualQueries.VisualQueryProvider', operation, params,
                function (result) {
                    zertoServiceResponseHandler.success(result, operation, startOperationTime, logOp, zertoAnalyticsOp);
                    deffer.resolve(result);
                },
                function (error) {
                    zertoServiceResponseHandler.error(error, params, operation, startOperationTime, logOp, zertoAnalyticsOp);
                    deffer.reject(error);
                });

            return deffer.promise;
        };

        return zertoServiceRequestHandler;
    });
