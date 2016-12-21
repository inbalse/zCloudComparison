'use strict';

angular.module('zvmApp.services')
    .factory('zertoServiceRequestHandler', function ($http, $q, $location, amf, zertoServiceResponseHandler) {

        var zertoServiceRequestHandler = {},
            url = '/ZvmService/VisualQueryProvider';

        amf.init();

        zertoServiceRequestHandler.invoke = function (operation, params, startOperationTime, logOp, zertoAnalyticsOp) {
            var deffer = $q.defer();

            $http.post(url, {operation: operation, params: params}).then(function (res) {
                    var result = res.data;

                    zertoServiceResponseHandler.success(result, operation, startOperationTime, logOp, zertoAnalyticsOp);
                    deffer.resolve(result);
                },
                function (err) {
                    var error = err.data;

                    zertoServiceResponseHandler.error(error, params, operation, startOperationTime, logOp, zertoAnalyticsOp);
                    deffer.reject(error);
                });

            return deffer.promise;
        };

        return zertoServiceRequestHandler;
    });
