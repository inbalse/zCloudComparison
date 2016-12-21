'use strict';
angular.module('zvmApp.services')
    .service('vpgsContainerBtnStateService', function () {
        var vpgsContainerBtnStateService = this;

        vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled = function (selectedItems) {
            if (selectedItems.length === 1) {
                return selectedItems[0].State.ButtonsState.IsUpdateEnabled;
            }
            return false;
        };

        vpgsContainerBtnStateService.checkSelectedForDeleteEnabled = function (selectedItems) {
            if (selectedItems.length === 1) {
                return selectedItems[0].State.ButtonsState.IsDeleteEnabled;
            }
            return false;
        };

        vpgsContainerBtnStateService.checkSelectedForPauseEnabled = function (selectedItems) {
            return checkAllEnabled(selectedItems,function (item) {
                return !item.State.ButtonsState.IsPauseEnabled;
            });
        };

        vpgsContainerBtnStateService.checkSelectedForResumeEnabled = function (selectedItems) {
            return checkAllEnabled(selectedItems,function (item) {
                return !item.State.ActiveProcesses.IsResumeEnabled;
            });
        };

        vpgsContainerBtnStateService.checkSelectedForRunBackup = function (selectedItems) {
            return checkAllEnabled(selectedItems,function (item) {
                return !item.State.ButtonsState.IsBackupEnabled;
            });
        };

        vpgsContainerBtnStateService.checkSelectedForAbortBackup = function (selectedItems) {
            return checkAllEnabled(selectedItems,function (item) {
                return !item.State.ButtonsState.IsAbortBackupEnabled;
            });
        };

        vpgsContainerBtnStateService.checkSelectedForStopFot = function (selectedItems) {
            return checkAllEnabled(selectedItems, function (vpg) {
                try {
                    return !vpg.State.ActiveProcesses.RunningFailOverTest.StopEnabled;
                } catch (e) {
                    return true;
                }
            });
        };

        vpgsContainerBtnStateService.checkSelectedForForceSyncEnabled = function (selectedItems) {
            if (selectedItems.length === 1) {
                return selectedItems[0].State.ButtonsState.IsForceSyncEnabled;
            }
            return false;
        };

        function checkAllEnabled(selectedItems, testFunc) {
            var disabledItem = _.find(selectedItems, testFunc);
            return !_.isEmpty(selectedItems) && _.isNullOrUndefined(disabledItem);
        }

        // function checkSelectedForCloneEnabled(selectedItems) {
        //     if (selectedItems.length === 1) {
        //         return selectedItems[0].State.ButtonsState.IsCloneEnabled;
        //     }
        //     return false;
        // }
    });
