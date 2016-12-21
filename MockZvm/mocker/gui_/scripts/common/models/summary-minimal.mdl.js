'use strict';

angular.module('zvmApp.models')
    .factory('summaryMinimalModel', function (zertoServiceUpdaterFactory) {
        var summaryMinimalModel = {};
        summaryMinimalModel.operation = 'GetSummaryMinimal';
        //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetSummaryMinimal, []);

        summaryMinimalModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, summaryMinimalModel.operation, []);
            //return au.register(scope);
        };

        summaryMinimalModel.unregister = function (scope) {
            return zertoServiceUpdaterFactory.unregister(scope, summaryMinimalModel.operation, []);
            //return au.unregister(scope);
        };

        return summaryMinimalModel;
    });
