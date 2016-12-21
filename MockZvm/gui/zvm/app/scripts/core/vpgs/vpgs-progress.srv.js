'use strict';

angular.module('zvmApp.services')
    .service('vpgsProgressService', function ($translate, $filter) {
        var vpgsProgressService = this;

        vpgsProgressService.convertTaskData = function (vpg) {
            var process, operation,
                state = vpg.State,
                activeProcesses = vpg.State.ActiveProcesses;

            if (activeProcesses.Paused) {
                process = {
                    display: $translate.instant('VPG_LIST.TASKS.PAUSED'),
                    value: activeProcesses.Paused.ProgressValue
                };
            }
            else if (activeProcesses.RunningBackup) {
                process = {
                    display: $translate.instant('VPG_LIST.TASKS.RUNNING_BACKUP'),
                    value: activeProcesses.RunningBackup.ProgressValue
                };
            }
            else if (activeProcesses.RunningClone) {
                process = {
                    display: $translate.instant('VPG_LIST.TASKS.RUNNING_CLONE'),
                    value: activeProcesses.RunningClone.ProgressValue
                };
            }
            else if (activeProcesses.RunningFailOverTest) {
                process = {
                    display: $translate.instant('VPG_LIST.TASKS.RUNNING_FAILOVER_TEST'),
                    value: activeProcesses.RunningFailOverTest.ProgressValue
                };
            }
            else if (activeProcesses.VpgUpdate) {
                process = {
                    display: $translate.instant('VPG_LIST.TASKS.VPG_UPDATE'),
                    value: activeProcesses.VpgUpdate.ProgressValue
                };
            } else if (state.IsRecoverRollbackEnabled) {
                process = {
                    display: 'Failover over',
                    value: 0
                };
            }

            if (!_.isNullOrUndefined(process)) {
                process.sortValue = process.display;
            }

            if (!_.isNullOrUndefined(activeProcesses)) {
                operation = {};
                operation.progressValue = isProgressActive(activeProcesses);
                operation.showProgress = operation.progressValue > 0;
                operation.stopTestButton = activeProcesses.RunningFailOverTest && activeProcesses.RunningFailOverTest.StopEnabled;
                operation.stopBackupButton = activeProcesses.RunningBackup && activeProcesses.RunningBackup.StopEnabled;
                operation.stopCloneButton = activeProcesses.RunningClone && activeProcesses.RunningClone.StopEnabled;
                operation.resumeButton = activeProcesses.IsResumeEnabled;
                operation.rollbackCommitButton = state.IsRecoverRollbackEnabled;
            }
            return {
                process: process,
                operation: operation
            };
        };

        vpgsProgressService.convertStateData = function (vpg) {
            var vpgState = {display: '', value: 0, showProgress: false},
                state = vpg.State;

            if (state.VPGTimebombInfo) {
                var time = $filter('stateTimeDifference')(state.VPGTimebombInfo.TimeLeftInSeconds);
                vpgState.display = 'Protection paused for another ' + time;
            } else {
                vpgState.display = $translate.instant('ENUM.VPG_VISUAL_SUB_STATUS.' + (state.SubStatus));
            }

            //value to filter
            vpgState.filterValue = vpgState.display;

            if (state.ProgressObject) {
                vpgState.showProgress = true;
                vpgState.value = state.ProgressObject.ProgressPercentage;
            }

            return vpgState;

        };

        function isProgressActive(activeProcess) {
            if (activeProcess.VpgUpdate) {
                return activeProcess.VpgUpdate.ProgressValue;
            }
            if (activeProcess.RunningBackup) {
                return activeProcess.RunningBackup.ProgressValue;
            }

            if (activeProcess.RunningFailOverTest) {
                return activeProcess.RunningFailOverTest.ProgressValue;
            }

            if (activeProcess.RunningClone) {
                return activeProcess.RunningClone.ProgressValue;
            }
            return 0;
        }
    });
