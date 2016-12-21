'use strict';

angular.module('zvmApp.core')
    .factory('createCheckpointFactory', function (zertoServiceFactory, $uibModal, zAlertFactory, $translate) {
        var createCheckpointFactory = {};
        createCheckpointFactory.enabledCheckpoints = [];

        //========================================================================================
        // APIs
        //========================================================================================
        createCheckpointFactory.showWindow = function () {
            zertoServiceFactory.GetMinimalVpgList().then(function (result) {
                createCheckpointFactory.enabledCheckpoints = _.filter(result.ProtectionGroups, function (item) {
                    return item.State.IsInsertCheckpointEnabled;
                });

                //check permission
                if (createCheckpointFactory.enabledCheckpoints.length === 0){
                    zAlertFactory.fail($translate.instant('CREATE_CHECKPOINT.INSERT_CHECKPOINT_PERMISSION_FAILED'));
                }else{
                    createCheckpointFactory.modalInstance = $uibModal.open({
                        templateUrl: 'scripts/core/create_checkpoint/create-checkpoint.html',
                        windowClass: 'create-checkpoint',
                        controller: 'createCheckpointController'
                    });
                }

            });
        };

        //========================================================================================
        // Data
        //========================================================================================

        createCheckpointFactory.sendData = function (value) {
            return zertoServiceFactory.InsertTaggedCheckpoint(value);
        };

        return createCheckpointFactory;
    });
