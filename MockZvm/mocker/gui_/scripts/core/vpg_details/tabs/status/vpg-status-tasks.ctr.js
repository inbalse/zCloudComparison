'use strict';

angular.module('zvmApp.core')
    .controller('vpgStatusTasksController', function ($scope, $stateParams, tasksVPGModel,tasksService) {

        $scope.stateParams = $stateParams;
        $scope.taskAction = taskAction;

        /*******************************
        * Functions
        * */
        function taskAction(task, action) {
            tasksService.executeAction(task, action);
        }

        /*******************************
        * Init
        * */
        tasksVPGModel.register($scope, $stateParams.id).then(null, null, function (result) {
            $scope.TaskItems = result.TaskItems;
        });


    });