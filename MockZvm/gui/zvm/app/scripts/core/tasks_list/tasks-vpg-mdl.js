'use strict';

angular.module('zvmApp.models')
    .factory('tasksVPGModel', function (zertoServiceUpdaterFactory, enums, stopFailoverTestFactory, tasksFactory, vos) {

        var tasksVPGModel = {};

        //==========================================================================
        //  Helpers
        //==========================================================================
        tasksVPGModel.register = function (scope, vpgId) {
            var taskEntity = new vos.CommandTaskRelatedEntityVisualObject();
            taskEntity.ProtectionGroupId = new vos.ProtectionGroupIdentifier(vpgId);
            var params = [taskEntity, [enums.CommandTaskStatusFilterVisualObject.Running, enums.CommandTaskStatusFilterVisualObject.WaitingForUserInput], -1, enums.CommandTaskRecordSortType.StatusAndDate, -1];
            //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetTasksByFilter, [taskEntity, [enums.CommandTaskStatusFilterVisualObject.Running, enums.CommandTaskStatusFilterVisualObject.WaitingForUserInput], -1, enums.CommandTaskRecordSortType.StatusAndDate, -1]);
            return zertoServiceUpdaterFactory.register(scope, 'GetTasksByFilter', params, false, tasksFactory._processData);

        };

        return tasksVPGModel;
    });
