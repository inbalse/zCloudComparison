'use strict';

angular.module('zvmApp.core')
    .controller('dashboardTasksController', function ($scope, dashboardTasksModel, tasksService) {
        $scope.taskAction = function (task, action) {
            tasksService.executeAction(task, action);
        };
        //call the tasks list
        dashboardTasksModel.register($scope).then(null, null, function (result) {
            $scope.TaskItems = result.TaskItems;
        });
    });
