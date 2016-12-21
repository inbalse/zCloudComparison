'use strict';

angular.module('zvmApp.core')
    .factory('tasksFactory', function ($translate, enums, zertoServiceFactory, tasksService, zAlertFactory, enumConvertorFilter, taskTypeEnumFilter, $filter, flrApiService,
                                       stopFailoverTestFactory, commitVpgFactory, flrDownloadFactory, resumeVpgFactory) {
        var tasksFactory = {};

        tasksFactory._processData = function (data) {
            data.TaskItems = _.forEach(data.TaskItems, function (item) {

                item.TaskTypeName = taskTypeEnumFilter(item.TaskType);

                item.showProgress = item.StateAndProgress.Progress > 0 && item.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.InProgress;
                item.showProgressCandy = item.StateAndProgress.Progress === 0 && item.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.InProgress;
                tasksService.setState(item);
                item.Started = $filter('date')(item.Started, 'dd/MM/yyyy HH:mm');
                item.Completed = $filter('date')(item.Completed, 'dd/MM/yyyy HH:mm');
                item.StatusText = enumConvertorFilter('TASK_STATUS', item.StateAndProgress.CurrentState);

                tasksFactory.createRelatedEntities(item);
            });

            return data;
        };

        tasksFactory.createRelatedEntities = function (item) {
            var resultHtml = item.TaskTypeName;
            var tooltipText = item.TaskTypeName;

            _.forEach(item.RelatedEntities, function (ent) {
                if (ent.HostId) {
                    if (item.TaskType !== enums.ExtensionTask_ZCommand.InstallVra) {
                        resultHtml = '<a href="#/main/vra_details?id=' + ent.HostId.ServerIdentifier.ServerGuid + '&name=' + ent.HostId.InternalHostName + '">' + ent.Name + '</a>(VRA) - ' + item.TaskTypeName;
                    } else {
                        resultHtml = ent.Name + '(VRA) - ' + item.TaskTypeName;
                    }
                    tooltipText = ent.Name + '(VRA) - ' + item.TaskTypeName;
                } else if (ent.ProtectionGroupId) {
                    resultHtml = '<a href="#/main/vpg_details?id=' + ent.ProtectionGroupId.GroupGuid + '">' + ent.Name + '</a>(VPG) - ' + item.TaskTypeName;
                    tooltipText = ent.Name + '(VPG) - ' + item.TaskTypeName;
                }
            });

            item.entities = resultHtml;
            item.tooltip = tooltipText;

            return resultHtml;
        };

        tasksFactory.setButtonsParameters = function (task) {
            task.showRightButton = false;
            task.showLeftButton = false;
            task.rightButtonClass = '';
            task.leftButtonClass = '';

            if (task.VpgScreenState) {
                if (task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.WaitingForUserInput) {
                    if (task.VpgScreenState.ActiveProcesses &&
                        task.VpgScreenState.ActiveProcesses.RunningFailOverTest &&
                        task.VpgScreenState.ActiveProcesses.RunningFailOverTest.StopEnabled) {
                        task.showProgress = true;
                        task.StateAndProgress.Progress = 100;
                        tasksFactory.setFotButtons(task);
                    }
                    else if (task.VpgScreenState.IsRecoverRollbackEnabled || task.VpgScreenState.IsRecoverRollbackEnabled) {
                        tasksFactory.setRollBackCommitButtons(task);
                    }
                    else if (task.VpgScreenState.ActiveProcesses &&
                        task.VpgScreenState.ActiveProcesses.Paused &&
                        task.VpgScreenState.ActiveProcesses.Paused.ResumeEnabled) {
                        tasksFactory.setResumeButtons(task);
                    }
                }
                else if (task.VpgScreenState && task.VpgScreenState.ActiveProcesses &&
                    task.VpgScreenState.ActiveProcesses.RunningBackup &&
                    task.VpgScreenState.ActiveProcesses.RunningBackup.StopEnabled &&
                    task.TaskType === enums.ExtensionTask_ZCommand.VpgBackup && task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.InProgress) {

                    tasksFactory.setBackupButtons(task);
                } else if (task.VpgScreenState && task.VpgScreenState.ActiveProcesses &&
                           task.VpgScreenState.ActiveProcesses.RunningClone &&
                           task.VpgScreenState.ActiveProcesses.RunningClone.StopEnabled &&
                           task.TaskType === enums.ExtensionTask_ZCommand.Clone) {
                    tasksFactory.setCloneButtons(task);
                }
                else if (
                    task.VpgScreenState &&
                    task.VpgScreenState.ActiveProcesses &&
                    task.VpgScreenState.ActiveProcesses.RunningMounting &&
                    task.TaskType === enums.ExtensionTask_ZCommand.FlrJournalMount && task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.Completed) {
                    tasksFactory.setFlrButtons(task);
                }
            }
            else if (task.IsCancellable) {
                tasksFactory.setTaskCancelButtons(task);
            }

            return true;
        };

        tasksFactory.setFotButtons = function (task) {
            task.showRightButton = true;
            task.rightButtonClass = 'abort-btn';
            task.rightLabel = $translate.instant('TASK_SUMMARY.FOT_STOP');
            task.rightFunction = tasksFactory.stopFailOverTest;
        };

        tasksFactory.setFlrButtons = function (task) {
            task.showRightButton = true;
            task.showLeftButton = true;

            task.rightButtonClass = 'rollback-btn';
            task.leftButtonClass = 'stop-button';

            task.rightButtonTooltip = $translate.instant('TASK_SUMMARY.FLR_DOWNLOAD');
            task.leftButtonTooltip = $translate.instant('TASK_SUMMARY.FLR_UN_MOUNT');

            task.rightFunction = tasksFactory.flrDownloadFile;
            task.leftFunction = tasksFactory.flrUnmountVolume;
        };

        tasksFactory.setCloneButtons = function (task) {
            task.showRightButton = true;
            task.rightButtonClass = 'abort-btn';
            task.rightLabel = $translate.instant('TASK_SUMMARY.CLONE_STOP');
            task.rightFunction = tasksFactory.stopClone;
        };

        tasksFactory.setResumeButtons = function (task) {
            task.showRightButton = true;
            task.rightButtonClass = 'play-button';
            task.rightLabel = $translate.instant('TASK_SUMMARY.RESUME');
            task.rightFunction = tasksFactory.resume;
        };

        tasksFactory.setBackupButtons = function (task) {
            task.showRightButton = true;
            task.rightButtonClass = 'abort-btn';
            task.rightLabel = $translate.instant('TASK_SUMMARY.STOP_BACKUP');
            task.rightFunction = tasksFactory.stopBackup;
        };

        tasksFactory.setTaskCancelButtons = function (task) {
            task.showRightButton = true;
            task.rightButtonClass = 'stop-btn';
            task.rightFunction = tasksFactory.cancelTask;
        };

        tasksFactory.setRollBackCommitButtons = function (task) {
            task.showRightButton = true;
            task.showLeftButton = true;
            task.rightLabel = $translate.instant('TASK_SUMMARY.COMMIT');
            task.leftLabel = $translate.instant('TASK_SUMMARY.ROLLBACK');
            task.rightFunction = tasksFactory.commitVpg;
            task.leftFunction = tasksFactory.rollBackVpg;
            task.rightButtonClass = 'commit-btn';
            task.leftButtonClass = 'rollback-btn';
        };

        //==========================================================================
        //  User interaction
        //==========================================================================
        tasksFactory.cancelTask = function (task) {
            zertoServiceFactory.CancelTask(task.TaskId);
        };

        tasksFactory.stopBackup = function (task) {
            tasksFactory.tempTask = task;
            zAlertFactory.warn(tasksFactory.translations['TASK_SUMMARY.STOP_BACKUP'], tasksFactory.translations['TASK_SUMMARY.BACKUP_WARN'], handleStopBackup);
        };

        function handleStopBackup(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.AbortBackups([tasksFactory.tempTask.ProtectionGroupId]);
            }
        }

        function handleUnMountVolume(sessionId) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                //un-mount
                flrApiService.unmount(sessionId)
                    .then(flrApiService.onSuccess, flrApiService.onFail);
            }
        }

        tasksFactory.stopFailOverTest = function (task) {
            stopFailoverTestFactory.stopTestByIds([task.ProtectionGroupId]);
        };

        tasksFactory.rollBackVpg = function (task) {
            tasksFactory.tempTask = task;
            zAlertFactory.warn(tasksFactory.translations['TASK_SUMMARY.ROLLBACK'], tasksFactory.translations['TASK_SUMMARY.ROLLBACK_WARN'], handleRollback);
        };

        function handleRollback(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.MoveRollback(tasksFactory.tempTask.ProtectionGroupId);
                tasksFactory.tempTask = {};
            }
        }

        tasksFactory.commitVpg = function (task) {
            commitVpgFactory.open(task.ProtectionGroupId);
        };

        tasksFactory.flrDownloadFile = function (task) {
            if (task.TaskType === enums.ExtensionTask_ZCommand.FlrJournalMount && task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.Completed) {
                if (angular.isDefined(task.SessionId)) {
                    flrDownloadFactory.open(task.SessionId);
                }
            }

        };

        tasksFactory.flrUnmountVolume = function (task) {
            if (task.TaskType === enums.ExtensionTask_ZCommand.FlrJournalMount && task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.Completed) {
                if (angular.isDefined(task.SessionId)) {
                    zAlertFactory.warn($translate.instant('TASK_SUMMARY.FLR_UN_MOUNT'), $translate.instant('TASK_SUMMARY.FLR_UN_MOUNT_WARN'), handleUnMountVolume(task.SessionId));
                }
            }
        };

        tasksFactory.stopClone = function (task) {
            tasksFactory.tempTask = task;
            zAlertFactory.warn(tasksFactory.translations['TASK_SUMMARY.CLONE'], tasksFactory.translations['TASK_SUMMARY.CLONE_WARN'], handleAbortClone);
        };

        function handleAbortClone(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.AbortClone(tasksFactory.tempTask.ProtectionGroupId);
                tasksFactory.tempTask = {};
            }
        }

        tasksFactory.resume = function (task) {
            resumeVpgFactory.resume([task.ProtectionGroupId]);
        };

        $translate(['TASK_SUMMARY.ROLLBACK', 'TASK_SUMMARY.COMMIT', 'TASK_SUMMARY.CLONE', 'TASK_SUMMARY.CLONE_WARN',
            'TASK_SUMMARY.ROLLBACK_WARN', 'TASK_SUMMARY.STOP_BACKUP', 'TASK_SUMMARY.BACKUP_WARN']).then(function (translations) {
            tasksFactory.translations = translations;
        });

        return tasksFactory;
    });
