'use strict';
angular.module('zvmApp.services')
    .service('vpgsActionsService', function ($translate, zAlertFactory, zertoServiceFactory, vpgsContainerBtnStateService,
                                             deleteVpgFactory, createVPGFactory, commitVpgFactory, stopFailoverTestFactory,
                                             resumeVpgFactory, enums, entityEvents, vpgsListEvents, analyticsEventsTypes, $rootScope) {
        var vpgsActionsService = this;

        vpgsActionsService.execute = function (vpg, action) {
            switch (action) {
                case vpgsListEvents.commit:
                    commitVpgFactory.open(vpg.Identifier);
                    break;
                case vpgsListEvents.stopFot:
                    $rootScope.$emit(analyticsEventsTypes.VPGS.STOP_TEST);
                    stopFailoverTestFactory.stopTestByIds([vpg.Identifier]);
                    break;
                case vpgsListEvents.stopBackup:
                {
                    $rootScope.$emit(analyticsEventsTypes.VPGS.ABORT_BACKUP);
                    zAlertFactory.warn($translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP'),
                        $translate.instant('VPG_LIST.MORE_BUTTON.STOP_BACKUP_WARNING'), vpgsActionsService.responseAbortBackup.bind(null, vpg));
                    break;
                }
                case vpgsListEvents.stopClone:
                {
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.CLONE'),
                        $translate.instant('TASK_SUMMARY.CLONE_WARN'), vpgsActionsService.responseAbortClone.bind(null, vpg));
                    break;
                }
                case vpgsListEvents.resume:
                {
                    $rootScope.$emit(analyticsEventsTypes.VPGS.RESUME_VPG);
                    resumeVpgFactory.resume([vpg.Identifier]);
                    break;
                }
                case vpgsListEvents.rollback:
                {
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.ROLLBACK'),
                        $translate.instant('TASK_SUMMARY.ROLLBACK_WARN'), vpgsActionsService.responseRollback.bind(null, vpg));
                    break;
                }
                case entityEvents.editEntity:
                {
                    if (vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled([vpg])) {
                        //GA
                        $rootScope.$emit(analyticsEventsTypes.VPGS.EDIT_VPG.INITIAL);

                        createVPGFactory.openEdit(vpg.Identifier);
                    }
                    break;
                }
                case entityEvents.deleteEntity:
                {
                    if (vpgsContainerBtnStateService.checkSelectedForDeleteEnabled([vpg])) {
                        //GA
                        $rootScope.$emit(analyticsEventsTypes.VPGS.DELETE_VPG);

                        //add a check also for source due to bug 26932
                        var isPublicCloud = vpg.Entities.Target === enums.VpgEntityType.Aws || vpg.Entities.Target === enums.VpgEntityType.Azure ||
                            vpg.Entities.Source === enums.VpgEntityType.Aws || vpg.Entities.Source === enums.VpgEntityType.Azure;
                        deleteVpgFactory.deleteVpgById(vpg.Identifier, vpg.Name, vpg.State.ButtonsState.RequiresForceToDelete, isPublicCloud);
                    }
                    break;
                }
            }

        };

        vpgsActionsService.responseRollback = function (vpg, event) {
            if (!isModalConfirmed(event)) {
                return;
            }
            zertoServiceFactory.MoveRollback(vpg.Identifier);
        };

        vpgsActionsService.responseAbortClone = function (vpg, event) {
            if (!isModalConfirmed(event)) {
                return;
            }
            zertoServiceFactory.AbortClone(vpg.Identifier);
        };

        vpgsActionsService.responseAbortBackup = function (vpg, event) {
            if (!isModalConfirmed(event)) {
                return;
            }
            zertoServiceFactory.AbortBackups([vpg.Identifier]);
        };

        function isModalConfirmed(event) {
            return _.isEqual(event.target.name, zAlertFactory.buttons.OK);
        }

    });
