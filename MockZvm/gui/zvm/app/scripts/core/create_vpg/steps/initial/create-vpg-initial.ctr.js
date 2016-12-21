'use strict';

angular.module('zvmApp.core')
    .controller('createVPGInitialController', function ($scope, createVpgInitialService) {

        $scope.data = {
            vpgName: createVpgInitialService.getVpgName(),
            priority: createVpgInitialService.getPriority(),
            priorityCollection: createVpgInitialService.getPriorityCollection()
        };

        $scope.handleNameChange = function () {
            createVpgInitialService.setVpgName($scope.data.vpgName);
            $scope.$emit('wizard:FormValidationChanged');
        };

        // Bug 20654 - FOL: Priority settings in Reverse protection are not Kept
        $scope.handlePriorityChange = function () {
            createVpgInitialService.setPriority($scope.data.priority);
        };



        createVpgInitialService.setPriority($scope.data.priority);

    });
