'use strict';

angular.module('zvmApp.core')
    .service('tasksService', function ($translate, enums, tasksListGridEvents, stopFailoverTestFactory,
                                       commitVpgFactory, zAlertFactory, zertoServiceFactory, flrDownloadFactory,
                                       flrApiService, flrSessionsApiService, resumeVpgFactory) {
        var tasksService = this;
        var BUTTONS = {
            STOP: 'stop-btn',
            ROLLBACK: 'rollback-btn',
            COMMIT: 'commit-btn',
            PLAY: 'play-btn',
            UNMOUNT: 'flr-btn unmount-btn',
            BROWSE: 'flr-btn browse-btn'
        };

        var rollBack = $translate.instant('TASK_LIST.ROLLBACK');
        var buttonsConfig = {};
        buttonsConfig.Fot = {
            showRightButton: true,
            rightButtonClass: BUTTONS.STOP,
            rightButtonEvent: tasksListGridEvents.StopFailoverTestEvent,
            rightButtonTooltip: $translate.instant('TASK_LIST.STOP_FAILOVER_TEST')
        };
        buttonsConfig.RollBackCommit = {
            showRightButton: true,
            showLeftButton: true,
            rightButtonEvent: tasksListGridEvents.RollbackEvent,
            rightButtonTitle: rollBack,
            leftButtonTooltip: $translate.instant('TASK_LIST.COMMIT'),
            leftButtonEvent: tasksListGridEvents.CommitEvent,
            rightButtonClass: BUTTONS.ROLLBACK,
            leftButtonClass: BUTTONS.COMMIT,
            rightButtonTooltip: rollBack
        };
        buttonsConfig.Resume = {
            showRightButton: true,
            rightButtonClass: BUTTONS.PLAY,
            rightButtonEvent: tasksListGridEvents.ResumeEvent,
            rightButtonTooltip: $translate.instant('TASK_LIST.RESUME_VPG')
        };
        buttonsConfig.Backup = {
            showRightButton: true,
            rightButtonClass: BUTTONS.STOP,
            rightButtonEvent: tasksListGridEvents.StopBackupEvent,
            rightButtonTooltip: $translate.instant('TASK_LIST.STOP_BACKUP')
        };
        buttonsConfig.Clone = {
            showRightButton: true,
            rightButtonClass: BUTTONS.STOP,
            rightButtonEvent: tasksListGridEvents.StopCloneEvent,
            rightButtonTooltip: $translate.instant('TASK_LIST.STOP_CLONE')
        };
        buttonsConfig.Cancel = {
            showRightButton: true,
            rightButtonClass: BUTTONS.STOP,
            rightButtonEvent: tasksListGridEvents.CancelEvent,
            rightButtonTooltip: $translate.instant('TASK_LIST.STOP_TASK')
        };
        buttonsConfig.Flr = {
            showLeftButton: true,
            showRightButton: true,
            leftButtonClass: BUTTONS.BROWSE,
            leftButtonTooltip: $translate.instant('TASK_LIST.BROWSE'),
            leftButtonEvent: tasksListGridEvents.FlrBrowseEvent,
            rightButtonClass: BUTTONS.UNMOUNT,
            rightButtonEvent: tasksListGridEvents.FlrUnmountEvent,
            rightButtonTooltip: $translate.instant('TASK_LIST.UNMOUNT')
        };

        tasksService.setState = function (task) {
            task.showRightButton = false;
            task.showLeftButton = false;
            task.rightButtonClass = '';
            task.leftButtonClass = '';

            if (task.VpgScreenState) {

                if (task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.WaitingForUserInput) {
                    if (task.VpgScreenState.ActiveProcesses &&
                        task.VpgScreenState.ActiveProcesses.RunningFailOverTest &&
                        task.VpgScreenState.ActiveProcesses.RunningFailOverTest.StopEnabled) {
                        _.assign(task, buttonsConfig.Fot);
                    } else if (task.VpgScreenState.IsRecoverRollbackEnabled) {
                        _.assign(task, buttonsConfig.RollBackCommit);
                    } else if (task.VpgScreenState.ActiveProcesses &&
                        task.VpgScreenState.ActiveProcesses.Paused &&
                        task.VpgScreenState.ActiveProcesses.Paused.ResumeEnabled) {
                        _.assign(task, buttonsConfig.Resume);
                    }
                } else if (task.VpgScreenState && task.VpgScreenState.ActiveProcesses &&
                    task.VpgScreenState.ActiveProcesses.RunningBackup &&
                    task.VpgScreenState.ActiveProcesses.RunningBackup.StopEnabled &&
                    task.TaskType === enums.ExtensionTask_ZCommand.VpgBackup && task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.InProgress) {
                    _.assign(task, buttonsConfig.Backup);

                } else if (task.VpgScreenState && task.VpgScreenState.ActiveProcesses &&
                    task.VpgScreenState.ActiveProcesses.RunningClone &&
                    task.VpgScreenState.ActiveProcesses.RunningClone.StopEnabled &&
                    task.TaskType === enums.ExtensionTask_ZCommand.Clone &&
                    task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.InProgress) {
                    _.assign(task, buttonsConfig.Clone);
                }
            } else if (task.IsCancellable) {
                _.assign(task, buttonsConfig.Cancel);
            }
            if (task.CommandTaskRecordButtonsState && task.TaskType === enums.ExtensionTask_ZCommand.FlrJournalMount) {
                _.assign(task, buttonsConfig.Flr);
                task.showLeftButton = task.CommandTaskRecordButtonsState.IsFlrBrowseEnabled;
                task.showRightButton = task.CommandTaskRecordButtonsState.IsFlrUnmountEnabled;
            }

        };
        tasksService.tempTask = null;
        tasksService.getFlrSessionId = function (taskItem) {
            var result = _.find(taskItem.RelatedEntities, function (relatedEntity) {
                return relatedEntity.FlrSessionIdentifier && relatedEntity.FlrSessionIdentifier.SessionGuid;
            });
            return result.FlrSessionIdentifier.SessionGuid + '.' + result.FlrSessionIdentifier.SiteId.SiteGuid;
        };

        tasksService.handleRollback = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.MoveRollback(tasksService.tempTask.ProtectionGroupId);
                tasksService.tempTask = {};
            }
        };

        tasksService.handleStopBackup = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.AbortBackups([tasksService.tempTask.ProtectionGroupId]);
            }
        };

        tasksService.handleAbortClone = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.AbortClone(tasksService.tempTask.ProtectionGroupId);
                tasksService.tempTask = {};
            }
        };

        tasksService.executeAction = function (task, action) {
            switch (action) {
                case tasksListGridEvents.StopFailoverTestEvent:
                {
                    stopFailoverTestFactory.stopTestByIds([task.ProtectionGroupId]);
                    break;
                }
                case tasksListGridEvents.CommitEvent:
                {
                    commitVpgFactory.open(task.ProtectionGroupId);
                    break;
                }
                case tasksListGridEvents.RollbackEvent:
                {
                    tasksService.tempTask = task;
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.ROLLBACK'), $translate.instant('TASK_SUMMARY.ROLLBACK_WARN'), tasksService.handleRollback);
                    break;
                }
                case tasksListGridEvents.ResumeEvent:
                {
                    resumeVpgFactory.resume([task.ProtectionGroupId]);
                    break;
                }
                case tasksListGridEvents.StopBackupEvent:
                {
                    tasksService.tempTask = task;
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.STOP_BACKUP'), $translate.instant('TASK_SUMMARY.BACKUP_WARN'), tasksService.handleStopBackup);
                    break;
                }
                case tasksListGridEvents.StopCloneEvent:
                {
                    tasksService.tempTask = task;
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.CLONE'), $translate.instant('TASK_SUMMARY.CLONE_WARN'), tasksService.handleAbortClone);
                    break;
                }
                case tasksListGridEvents.CancelEvent:
                {
                    zertoServiceFactory.CancelTask(task.TaskId);
                    break;
                }
                case tasksListGridEvents.FlrBrowseEvent:
                {
                    flrDownloadFactory.open(tasksService.getFlrSessionId(task), task.ProtectionGroupId.GroupGuid);
                    break;
                }
                case tasksListGridEvents.FlrUnmountEvent:
                {
                    var flrSessionId = tasksService.getFlrSessionId(task);
                    flrSessionsApiService.get(flrSessionId).then(function (flr) {
                        zAlertFactory.warn($translate.instant('TASK_SUMMARY.FLR_UN_MOUNT'), $translate.instant('TASK_SUMMARY.FLR_UN_MOUNT_WARN', {disk: flr[0].VolumeId}), function (event) {
                            if (event.target.name === zAlertFactory.buttons.YES) {
                                flrApiService.unmount(flrSessionId)
                                    .then(flrApiService.onSuccess, flrApiService.onFail);
                            }
                        }, [zAlertFactory.buttons.NO, zAlertFactory.buttons.YES]);
                    });

                    break;
                }
            }
        };
    });
