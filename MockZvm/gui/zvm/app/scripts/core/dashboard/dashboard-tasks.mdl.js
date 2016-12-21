'use strict';

angular.module('zvmApp.models')
    .factory('dashboardTasksModel', function (zertoServiceUpdaterFactory, enums, tasksFactory, tweaksService) {

        var dashboardTasksModel = {};

        //==========================================================================
        //  Helpers
        //==========================================================================
        dashboardTasksModel.register = function (scope) {
            var t_tasksSummaryLimit = tweaksService.getTweak('t_tasksSummaryLimit', 5);
            var params = [null, [enums.CommandTaskStatusFilterVisualObject.Running, enums.CommandTaskStatusFilterVisualObject.WaitingForUserInput], -1, enums.CommandTaskRecordSortType.StatusAndDate, t_tasksSummaryLimit];
            return zertoServiceUpdaterFactory.register(scope, 'GetTasksByFilter', params, false, tasksFactory._processData);
        };

        return dashboardTasksModel;
    });
