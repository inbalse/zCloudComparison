'use strict';

angular.module('zvmApp.core')
    .controller('cloneVpgController', function ($scope, $translate, $q, cloneVpgFactory, datastores, vpgName, vpgId, checkpoint, openPlace, configureCheckpointFactory, globalStateModel, enums) {
        //===============================================================
        // init
        //===============================================================
        $scope.vpgName = vpgName;
        $scope.datastores = datastores;
        $scope.isDatastoreRequired = datastores && datastores.length > 0;
        $scope.vpgId = vpgId;
        $scope.data = {checkpoint: checkpoint, datastore: null};
        $scope.loading = true;
        $scope.forms = {};

        $scope.textLabel = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV ?
            $translate.instant('CLONE_VPG.RECOVERY_STORAGE') : $translate.instant('CLONE_VPG.RECOVERY_DATASTORE');
        //===============================================================
        // user interaction
        //===============================================================
        $scope.handleConfigureCheckpointClick = function () {
            configureCheckpointFactory.open($scope.vpgId, $scope.vpgName, $scope.data.checkpoint.Identifier, openPlace).then(cloneVpgFactory.handelSelectedCheckPoint);
        };

        $scope.$on('selectedCheckPointUpdated', function(event, data){
            $scope.data.checkpoint = data;
        });

        $scope.handleSave = function () {
            var datastore = $scope.isDatastoreRequired ? $scope.data.datastore.Id : null;
            cloneVpgFactory.sendCloneCommand($scope.vpgId, $scope.data.checkpoint.Identifier, datastore);
        };

        $scope.handleCancel = function () {
            cloneVpgFactory._close();
        };
        //===============================================================
        // translation
        //===============================================================

        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.handleCancel,
                disabled: false
            },
            {
                label: $translate.instant('CLONE_VPG.CLONE_BUTTON'),
                handler: $scope.handleSave,
                disabled: true
            }
        ];

        //===============================================================
        // form
        //===============================================================

        $scope.$watch('forms.form.$valid',function (valid) {
            $scope.buttons[1].disabled = !valid;
        });

        $scope.loading = false;
    });
