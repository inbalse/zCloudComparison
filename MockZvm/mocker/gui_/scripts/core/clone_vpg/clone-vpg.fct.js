'use strict';

angular.module('zvmApp.core')
    .factory('cloneVpgFactory', function (zertoServiceFactory, $rootScope, $uibModal, zAlertFactory, $q, enums, $translate, zertoApi,
                                          configureCheckpointFactory, allRecoveredVmsApiService, allRecoveryVmsOperationServiceConstants, globalStateModel) {
        var cloneVpgFactory = {};

        cloneVpgFactory.modalInstance = null;
        cloneVpgFactory.vpgName = null;
        cloneVpgFactory.vpgId = null;
        cloneVpgFactory.checkpoint = null;
        cloneVpgFactory.datastores = null;
        cloneVpgFactory.targetType = null;

        cloneVpgFactory.openPlace = 'Offsite Clone';

        cloneVpgFactory.open = function (vpgId, vpgName, targetType, checkpoint) {
            cloneVpgFactory.vpgName = vpgName;
            cloneVpgFactory.vpgId = vpgId;
            cloneVpgFactory.checkpoint = checkpoint;
            cloneVpgFactory.targetType = targetType;

            //need to find the checkpoint
            if (!cloneVpgFactory.checkpoint) {
                zertoServiceFactory.GetLatestCheckpoint(vpgId).then(cloneVpgFactory._handleGetLatestCheckpoint);
            }

            //need to potential datastores
            if (cloneVpgFactory.targetType !== enums.VpgEntityType.VCDvApp && cloneVpgFactory.targetType !== enums.VpgEntityType.Aws) {
                zertoServiceFactory.GetPotentialDatastoresForClone(vpgId).then(cloneVpgFactory._handleGetPotentialDatastoresForClone);
            }
        };

        cloneVpgFactory._handleGetLatestCheckpoint = function (result) {
            cloneVpgFactory.checkpoint = result;
            cloneVpgFactory._openCloneWindow();
        };

        cloneVpgFactory._handleGetPotentialDatastoresForClone = function (result) {
            cloneVpgFactory.datastores = result;
            cloneVpgFactory._openCloneWindow();
        };

        cloneVpgFactory._openCloneWindow = function () {
            if (!cloneVpgFactory.checkpoint || (cloneVpgFactory.targetType !== enums.VpgEntityType.VCDvApp &&
                cloneVpgFactory.targetType !== enums.VpgEntityType.Aws && !cloneVpgFactory.datastores)) {
                return;
            }

            cloneVpgFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/clone_vpg/clone-vpg.html',
                windowClass: 'clone-vpg',
                controller: 'cloneVpgController',
                backdrop: 'static',
                resolve: {
                    datastores: function () {
                        return cloneVpgFactory.datastores;
                    }, vpgName: function () {
                        return cloneVpgFactory.vpgName;
                    }, vpgId: function () {
                        return cloneVpgFactory.vpgId;
                    }, checkpoint: function () {
                        return cloneVpgFactory.checkpoint;
                    }, openPlace: function () {
                        return cloneVpgFactory.openPlace;
                    }
                }
            });
        };

        cloneVpgFactory._close = function () {
            cloneVpgFactory.modalInstance.dismiss('close');

            cloneVpgFactory.modalInstance = null;
            cloneVpgFactory.vpgName = null;
            cloneVpgFactory.vpgId = null;
            cloneVpgFactory.checkpoint = null;
            cloneVpgFactory.datastores = null;
            cloneVpgFactory.targetType = null;
        };

        cloneVpgFactory.sendCloneCommand = function (vpgId, checkpointId, datastoreId) {
            zertoServiceFactory.Clone(vpgId, checkpointId, datastoreId).then(null, function (error) {
                zAlertFactory.fail(error.faultCode, error.faultString);
            });

            cloneVpgFactory._close();
        };

        //===============================================================
        // stop clone functionality
        //===============================================================
        cloneVpgFactory._stopCloneVpgId = null;
        cloneVpgFactory.stopClone = function (vpgId) {
            cloneVpgFactory._stopCloneVpgId = vpgId;
            zAlertFactory.warn('Warning', $translate.instant('CLONE_VPG.ABORT_CLONE_WARNING'),
                cloneVpgFactory._handleStopCloneWarning, [zAlertFactory.buttons.OK, zAlertFactory.buttons.CANCEL]);
        };

        cloneVpgFactory._handleStopCloneWarning = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.AbortClone(cloneVpgFactory._stopCloneVpgId).then(null, function (error) {
                    zAlertFactory.fail(error.faultCode, error.faultString);
                });
                cloneVpgFactory._stopCloneVpgId = null;
            }
        };

        cloneVpgFactory.handelSelectedCheckPoint = function (checkPoint) {
            //todo remove after BE fix Zssp rest api issue
            if (globalStateModel.data.IsPortal) {
                return;
            }

            cloneVpgFactory.checkpoint = checkPoint;
            $rootScope.$broadcast('selectedCheckPointUpdated', checkPoint);

            allRecoveredVmsApiService.sureAllVmsRecoveredPerOneVpg(cloneVpgFactory.vpgId, cloneVpgFactory.vpgName, allRecoveryVmsOperationServiceConstants.cloned, checkPoint).then(function (warningInfo) {
                if (warningInfo !== '') {
                    zAlertFactory.warn(allRecoveryVmsOperationServiceConstants.heading, warningInfo, function (event) {
                        if (event.target.name === 'MODAL.CANCEL') {
                            configureCheckpointFactory.open(cloneVpgFactory.vpgId, cloneVpgFactory.vpgName, checkPoint.Identifier, cloneVpgFactory.openPlace).then(cloneVpgFactory.handelSelectedCheckPoint);
                        }
                    });
                }
            });
        };

        return cloneVpgFactory;
    });
