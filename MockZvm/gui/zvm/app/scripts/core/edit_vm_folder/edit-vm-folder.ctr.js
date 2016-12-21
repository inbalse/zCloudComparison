/**
 * Created by liron on 18/05/2015.
 */
'use strict';

angular.module('zvmApp.core')
    .controller('editVmFolderController', function ($scope, editVmFolderFactory, $translate, potentialFolders, vm, selectedVmsCount) {

        $scope.potentialFolders = angular.copy(potentialFolders);
        $scope.selectedVmsCount = selectedVmsCount > 1 ? $translate.instant('EDIT_VM.TITLE_VMS',{vmsCount: selectedVmsCount}) : $translate.instant('EDIT_VM.TITLE_VM');
        $scope.vm = vm;

        $scope.handleSaveClick = function () {
            editVmFolderFactory.save($scope.vm);
        };

        $scope.handleCancelClick = function () {
            $scope.close();
        };

        $scope.close = function () {
            editVmFolderFactory.closeWindow('close');
        };

        $scope.saveButton = {label: $translate.instant('MODAL.OK'), handler: $scope.handleSaveClick, disabled: false };
        $scope.buttons = [
            {label: $translate.instant('MODAL.CANCEL'), class: 'btn btn-link', handler: $scope.handleCancelClick, disabled: false},
            $scope.saveButton
        ];

        $scope.loading = false;

    });
