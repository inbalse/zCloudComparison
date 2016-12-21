'use strict';

angular.module('zvmApp.models')
    .factory('tasksVRAModel', function (zertoServiceUpdaterFactory, enums, stopFailoverTestFactory, tasksFactory, vos) {

        var tasksVRAModel = {};

        //==========================================================================
        //  Helpers
        //==========================================================================
        tasksVRAModel.register = function (scope, hostName, vraId) {
            var taskEntity = new vos.CommandTaskRelatedEntityVisualObject();
            taskEntity.HostId = new vos.HostIdentifier(hostName, new vos.ServerIdentifier(vraId));
            var params = [taskEntity, [enums.CommandTaskStatusFilterVisualObject.Running, enums.CommandTaskStatusFilterVisualObject.WaitingForUserInput], -1, enums.CommandTaskRecordSortType.StatusAndDate, -1];
            //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetTasksByFilter, [taskEntity, [enums.CommandTaskStatusFilterVisualObject.Running, enums.CommandTaskStatusFilterVisualObject.WaitingForUserInput], -1, enums.CommandTaskRecordSortType.StatusAndDate, -1]);
            return zertoServiceUpdaterFactory.register(scope, 'GetTasksByFilter', params, false, tasksFactory._processData);
        };

        return tasksVRAModel;
    });
