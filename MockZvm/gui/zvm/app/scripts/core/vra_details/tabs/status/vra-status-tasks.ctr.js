'use strict';

angular.module('zvmApp.core')
    .controller('vraStatusTasksController', function ($scope, $stateParams, tasksVRAModel ) {

        //==========================================================================
        //  Properties
        //==========================================================================
        $scope.stateParams = $stateParams;
        //==========================================================================
        //  Helpers
        //==========================================================================

        //call the tasks list
        tasksVRAModel.register($scope, $stateParams.name,$stateParams.id).then(null, null, function (result) {
            $scope.TaskItems = result.TaskItems;
        });
    });