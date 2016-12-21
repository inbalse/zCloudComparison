'use strict';
angular.module('zvmApp.core')

    .factory('vpgDetailsModel', function (vos, enums, $translate, kbToStringConvertorFilter, convertSecondsToLongTimeFilter,
                                          zertoServiceFactory, convertSecondsToLongTimeWithTextFilter, resumeVpgFactory, zAlertFactory, commitVpgFactory, globalConstants) {

        var vpgDetailsModel = {};

        vpgDetailsModel.proccessData = function(vpgData){
            vpgDetailsModel.vpgData = vpgData;

            var vmsInSync = vpgDetailsModel.vpgData.State.VMsInInitialSync, vmsInInitialSyncOfVmsText = '';

            if (vmsInSync > 0) {
                var numOfAllVms = vpgDetailsModel.vpgData.Summary.NumberOfVms + vpgDetailsModel.vpgData.State.VMsInInitialSync;
                var numOfMeetingSlaVms = vpgDetailsModel.vpgData.Summary.NumberOfVms;
                vmsInInitialSyncOfVmsText = numOfMeetingSlaVms + '/' + numOfAllVms;
            }

            vpgDetailsModel.vpgData.statusText = $translate.instant('ENUM.VPG_NUM_STATUS.' + vpgDetailsModel.vpgData.State.Status) + ' ' + vmsInInitialSyncOfVmsText;
            vpgDetailsModel.setSubStatus();
            return vpgDetailsModel.vpgData;
        };

        vpgDetailsModel.setSubStatus = function(){
            var subStatusObj = {};

            subStatusObj.subStatusText = '';
            subStatusObj.showLink = false;
            subStatusObj.subStatusExists = false;
            subStatusObj.showSubStatusProgress = false;
            subStatusObj.showSecondLine = false;
            subStatusObj.showHelpIcon = false;
            subStatusObj.secondLineText = '';
            subStatusObj.helpIconText = '';

            if(vpgDetailsModel.vpgData.State.SubStatus && vpgDetailsModel.vpgData.State.SubStatus !== enums.VpgVisualSubStatus.None){

                subStatusObj.subStatusExists = true;
                var subStatusText = $translate.instant('ENUM.VPG_VISUAL_SUB_STATUS.' + (vpgDetailsModel.vpgData.State.SubStatus));

                subStatusObj.progressValue = vpgDetailsModel.vpgData.State.ProgressObject ? vpgDetailsModel.vpgData.State.ProgressObject.ProgressPercentage : 0;

                if(vpgDetailsModel.vpgData.Reason && vpgDetailsModel.vpgData.Reason !== ''){
                    subStatusObj.showHelpIcon = true;
                    subStatusObj.helpIconText = $translate.instant('VPG_DETAILS.SUB_STATUS.REASON') + ': ' + vpgDetailsModel.vpgData.Reason;
                }

                if(subStatusObj.progressValue > 0) {
                    subStatusObj.showSubStatusProgress = true;
                    subStatusText = subStatusText + ' ' + subStatusObj.progressValue + '%';
                }

                //time bomb paused
                if(vpgDetailsModel.vpgData.State.VPGTimebombInfo){
                    vpgDetailsModel.setTimeBombText(subStatusObj);
                }

                if(vpgDetailsModel.vpgData.State.ProgressObject && vpgDetailsModel.vpgData.State.ProgressObject.ProgressDetails){
                    subStatusText = subStatusText + ' ' + vpgDetailsModel.getTimeRemaining(vpgDetailsModel.vpgData.State.ProgressObject);
                }

                if(vpgDetailsModel.vpgData.State.SubStatus === enums.VpgVisualSubStatus.ReplicationPausedUserInitiated && vpgDetailsModel.vpgData.State.ActiveProcesses && vpgDetailsModel.vpgData.State.ActiveProcesses.IsResumeEnabled){
                    subStatusText = vpgDetailsModel.setResumeLink(subStatusText, subStatusObj);
                }
                if((vpgDetailsModel.vpgData.State.SubStatus === enums.VpgVisualSubStatus.FailingOverBeforeCommit || vpgDetailsModel.vpgData.State.SubStatus === enums.VpgVisualSubStatus.MovingBeforeCommit) &&
                    vpgDetailsModel.vpgData.State.MoveAutoContinueState &&
                    !vpgDetailsModel.vpgData.State.ProgressObject){
                    var action = $translate.instant('VPG_DETAILS.SUB_STATUS.AUTO_COMMIT');
                    if(vpgDetailsModel.vpgData.State.MoveAutoContinueState.Action === enums.MoveNextAction.Rollback)
                    {
                        action = $translate.instant('VPG_DETAILS.SUB_STATUS.AUTO_ROLLBACK');
                        vpgDetailsModel.setRollbackLink(subStatusObj);
                    }else{
                        vpgDetailsModel.setCommitLink(subStatusObj);
                    }
                    var timeleft = convertSecondsToLongTimeWithTextFilter(vpgDetailsModel.vpgData.State.MoveAutoContinueState.TimeLeftInSec);

                    subStatusText = timeleft !== '' ? subStatusText + ' ('+ action + ' ' + timeleft + ')' : subStatusText + '';
                }

                subStatusObj.subStatusText = subStatusText;
                vpgDetailsModel.vpgData.subStatusObj = subStatusObj;
            }
        };

        vpgDetailsModel.setTimeBombText = function(subStatusObj){
            subStatusObj.showHelpIcon = true;
            subStatusObj.helpIconText = vpgDetailsModel.vpgData.State.VPGTimebombInfo.Reason;
            subStatusObj.showSecondLine = true;
            subStatusObj.secondLineText = $translate.instant('VPG_DETAILS.SUB_STATUS.RESUMING_IN') + ' ' + Math.floor(vpgDetailsModel.vpgData.State.VPGTimebombInfo.TimeLeftInSeconds / 60) + ' ' + $translate.instant('VPG_DETAILS.SUB_STATUS.MINUTES') + ' - ';
            subStatusObj.secondLink = $translate.instant('VPG_DETAILS.SUB_STATUS.RESUME_NOW');
            subStatusObj.secondlinkFunction = vpgDetailsModel.resumeTimeBomb;
        };

        vpgDetailsModel.setResumeLink = function(subStatusText, subStatusObj){
            subStatusObj.showLink = true;
            subStatusObj.linkText = $translate.instant('VPG_DETAILS.SUB_STATUS.RESUME_NOW');
            subStatusObj.linkFunction = vpgDetailsModel.resumeProtection;
            return subStatusText + ' - ';
        };

        vpgDetailsModel.setRollbackLink = function(subStatusObj){
            subStatusObj.showLink = true;
            subStatusObj.linkText = 'Rollback';
            subStatusObj.linkFunction = vpgDetailsModel.rollback;
        };

        vpgDetailsModel.setCommitLink = function(subStatusObj){
            subStatusObj.showLink = true;
            subStatusObj.linkText = 'Commit';
            subStatusObj.linkFunction = vpgDetailsModel.commit;
        };

        vpgDetailsModel.getTimeRemaining = function (progressData){
            var current = kbToStringConvertorFilter(progressData.ProgressDetails.ProgressInKiloBytes);
            var total =  kbToStringConvertorFilter(progressData.ProgressDetails.TotalKiloBytes);

            var eta = 'N/A';

            if (progressData.ProgressDetails.EtaInSeconds >= 0)
            {
                if(progressData.ProgressDetails.EtaInSeconds < globalConstants.UINT) {
                    eta = convertSecondsToLongTimeFilter(progressData.ProgressDetails.EtaInSeconds, true);
                }else{
                    eta = 'NA';
                }
            }
            return '(' + current + '/' + total + ' MB. ETA '+ eta + ')';
        };

        vpgDetailsModel.resumeTimeBomb = function(){
            zertoServiceFactory.ResumeTimer(vpgDetailsModel.vpgData.ProtectionGroupId);
        };

        vpgDetailsModel.resumeProtection = function (){
            resumeVpgFactory.resume([vpgDetailsModel.vpgData.ProtectionGroupId]);
        };

        vpgDetailsModel.rollback = function () {
            zAlertFactory.warn($translate.instant('TASK_SUMMARY.ROLLBACK'), $translate.instant('TASK_SUMMARY.ROLLBACK_WARN'), handleRollback);
        };

        function handleRollback(event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.MoveRollback(vpgDetailsModel.vpgData.ProtectionGroupId);
            }
        }
        
        vpgDetailsModel.commit = function () {
            commitVpgFactory.open(vpgDetailsModel.vpgData.ProtectionGroupId);
        };
        return vpgDetailsModel;
    });
