'use strict';

angular.module('zvmApp.core')
    .controller('recoveryEditControllerPopUp', function ($scope, recoveryWizardFactory, oneVpg, recoveryPolicyFactory, $translate) {
        $scope.oneVpg = oneVpg;
        $scope.loading= false;

        $scope.title = recoveryWizardFactory.title + ' Commit Policy';

        $scope.close = function () {
            recoveryPolicyFactory.close();
        };

        $scope.save = function () {
            $scope.oneVpg.commitPolicyObj.setDefaultTimeout($scope.oneVpg.commitPolicyObj.defaultTimeout * 60);
            recoveryPolicyFactory.save($scope.oneVpg);
        };

        $scope.buttons = [
            {label: $translate.instant('MODAL.CANCEL'), class: 'btn btn-link', handler: $scope.close, disabled: false},
            {label: $translate.instant('MODAL.OK'), handler: $scope.save, disabled: false}
        ];
    })
    .controller('recoveryEditController', function ($scope, $translate, failoverShutdownAction, enums, policiesConstants) {
        $scope.oneVpg = $scope.$parent.oneVpg;
        $scope.forms = {};

        $scope.commitValues = [
            {value: enums.MoveNextAction.Rollback, label: $translate.instant('ENUM.MOVE_NEXT_ACTION.' + enums.MoveNextAction.Rollback)},
            {value: enums.MoveNextAction.Commit, label: $translate.instant('ENUM.MOVE_NEXT_ACTION.' + enums.MoveNextAction.Commit)},
            {value: enums.MoveNextAction.None, label: $translate.instant('ENUM.MOVE_NEXT_ACTION.' + enums.MoveNextAction.None)}
        ];


        //region ================== init ===============================

        $scope.showDefaultTime = $scope.oneVpg.commitPolicyObj.defaultAction !== enums.MoveNextAction.None;
        $scope.oneVpg.commitPolicyObj.setDefaultTimeout($scope.oneVpg.commitPolicyObj.defaultTimeout / 60);
        $scope.maxDefaultTimeoutMinutes  = policiesConstants.MAX_STAGED_ACTION_TIMEOUT_SECONDS / 60;
        //regionednd ===================================================

        $scope.$watch('oneVpg.commitPolicyObj.defaultAction',function(){
            $scope.showDefaultTime = $scope.oneVpg.commitPolicyObj.defaultAction !== enums.MoveNextAction.None;
            $scope.oneVpg.recoveryItemVo.isAutoRollback = $scope.oneVpg.commitPolicyObj.defaultAction === enums.MoveNextAction.Rollback;
        },true);

        $scope.$watch('forms.recoveryForm.$valid',function(value){
           $scope.$parent.buttons[1].disabled = !value;
        });
    });

