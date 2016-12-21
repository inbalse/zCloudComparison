'use strict';

angular.module('zvmApp.models')
    .factory('summaryTasksModel', function (zertoServiceUpdaterFactory, vos, enums, tweaksService) {
        var summaryTasksModel = {};
        var t_tasksSummaryLimit = tweaksService.getTweak('t_tasksSummaryLimit', 4);

        var params = [new vos.CommandTaskRelatedEntityVisualObject(null, null, null, null), [], -1, enums.CommandTaskRecordSortType.StatusAndDate, t_tasksSummaryLimit];

        //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetTasksByFilter, [new vos.CommandTaskRelatedEntityVisualObject(null, null, null, null), [], -1, enums.CommandTaskRecordSortType.StatusAndDate, t_tasksSummaryLimit]);

        summaryTasksModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetTasksByFilter', params);
        };

        summaryTasksModel.unregister = function (scope) {
            return zertoServiceUpdaterFactory.unregister(scope, 'GetTasksByFilter', params);
        };

        return summaryTasksModel;
    });
