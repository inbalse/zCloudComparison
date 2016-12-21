'use strict';

angular.module('zvmApp.core')
    .controller('recoverySummaryController', function ($scope, recoveryWizardModel, failoverShutdownAction,
                                                       enums, zertoServiceFactory, $translate, recoveryWizardFactory, recoverySummaryTopologyModel,
                                                       zAlertFactory, vos, analyticsEventsTypes) {

        $scope.data = recoveryWizardModel.data.selectedVpgs;
        $scope.topologyData = recoverySummaryTopologyModel.getTopologyData();
        $scope.recoveryType = recoveryWizardModel.recoveryType;
        $scope.enumRecoveryType = enums.RecoveryType;

        $scope.moveItems = [];

        //============================================================================================================================================================
        //                                                                   TOPOLOGY
        //============================================================================================================================================================

        function initTopology() {
            if ($scope.topologyData) {
                $scope.local = $scope.topologyData[0];

                if (angular.isDefined($scope.topologyData[1])) {
                    $scope.middle = $scope.topologyData[1];
                }

                if (angular.isDefined($scope.topologyData[2])) {
                    $scope.right = $scope.topologyData[2];
                }

                if (angular.isDefined($scope.topologyData[3])) {
                    $scope.left = $scope.topologyData[3];
                }
            }
        }

        initTopology();
        //============================================================================================================================================================
        //
        //============================================================================================================================================================

        var numberOfSelectedVPGs = $scope.data.length;
        var availableForFailover = recoveryWizardModel.data.vpgs.length;

        if (recoveryWizardModel.recoveryType === enums.RecoveryType.Failover) {
            $scope.buttonText = $translate.instant('RECOVERY_WIZARD.SUMMARY.START_FAILOVER');
            $scope.title = $translate.instant('RECOVERY_WIZARD.SUMMARY.TITLE_FAILOVER_LIVE');
            $scope.isLive = true;

            $scope.text1 = $translate.instant('RECOVERY_WIZARD.SUMMARY.FAILOVER_TEXT', {
                vpgCount: numberOfSelectedVPGs,
                availableVPGs: availableForFailover
            });
            $scope.text2 = $translate.instant('RECOVERY_WIZARD.SUMMARY.FAILOVER_TEXT_SECOND');
            $scope.text3 = $translate.instant('RECOVERY_WIZARD.SUMMARY.FAILOVER_TEXT_THIRD');

        } else if (recoveryWizardModel.recoveryType === enums.RecoveryType.FailoverTest) {
            $scope.buttonText = $translate.instant('RECOVERY_WIZARD.SUMMARY.START_FAILOVER_TEST');
            $scope.title = $translate.instant('RECOVERY_WIZARD.SUMMARY.TITLE_FAILOVER_TEST');
            $scope.isLive = false;

            $scope.text1 = $translate.instant('RECOVERY_WIZARD.SUMMARY.FAILOVER_TEST_TEXT', {
                vpgCount: numberOfSelectedVPGs,
                availableVPGs: availableForFailover
            });
            $scope.text2 = $translate.instant('RECOVERY_WIZARD.SUMMARY.FAILOVER_TEST_TEXT_SECOND');
            $scope.text3 = '';

        } else {
            $scope.buttonText = $translate.instant('RECOVERY_WIZARD.SUMMARY.START_MOVE');
            $scope.title = $translate.instant('RECOVERY_WIZARD.SUMMARY.TITLE_MOVE');
            $scope.isLive = false;

            $scope.text1 = $translate.instant('RECOVERY_WIZARD.SUMMARY.MOVE_TEXT', {
                vpgCount: numberOfSelectedVPGs,
                availableVPGs: availableForFailover
            });
            $scope.text2 = $translate.instant('RECOVERY_WIZARD.SUMMARY.MOVE_TEXT_SECOND');
            $scope.text3 = $translate.instant('RECOVERY_WIZARD.SUMMARY.MOVE_TEXT_THIRD');
        }


        function onFail(error) {
            zAlertFactory.fail(error.faultCode, error.faultString);
        }

        $scope.handleClickButton = function () {
            var analyticsEventName,
                analyticsData = {};

            if (recoveryWizardModel.recoveryType === enums.RecoveryType.Failover) {

                var failoverLiveCollection = $scope.createLiveFailoverCollection($scope.data);

                //region GA
                analyticsEventName = analyticsEventsTypes.FAILOVER.LIVE.SEND;
                try {
                    analyticsData = {
                        commitPolicy: _.isNull(failoverLiveCollection[0].MoveAutoContinueInfo) ?
                            'None' :
                            failoverLiveCollection[0].MoveAutoContinueInfo.Action,
                        forceShutdown: failoverLiveCollection[0].ForceShutdown,
                        reverseProtection: $scope.data[0].recoveryItemVo.useReverseProtection
                    };
                }
                catch (e) {
                }
                //endregion

                zertoServiceFactory.FailoverBeforeCommit(failoverLiveCollection).then(null, onFail);
            }
            else if (recoveryWizardModel.recoveryType === enums.RecoveryType.FailoverTest) {

                var failoverTestCollection = $scope.createTestFailoverCollection($scope.data);

                //region GA
                analyticsEventName = analyticsEventsTypes.FAILOVER.TEST.SEND;
                try {
                    analyticsData = {
                        commitPolicy: $scope.data[0].commitPolicyObj.commitPolicy,
                        forceShutdown: false,
                        reverseProtection: false
                    };
                }
                catch (e) {
                }
                //endregion

                zertoServiceFactory.FailoverTest(failoverTestCollection).then(null, onFail);
            }
            else {
                $scope.moveItems = $scope.createMoveCollction($scope.data);

                //region GA
                analyticsEventName = analyticsEventsTypes.ACTIONS.MOVE_VPG.SEND;
                try {
                    analyticsData = {
                        commitPolicy: $scope.moveItems.collectionToMove[0].MoveAutoContinueInfo.Action,
                        forceShutdown: $scope.moveItems.collectionToMove[0].ForceShutdown,
                        reverseProtection: $scope.moveItems.VPGHasMoveCommitWithoutReverse,
                        isKeepSourceVM: $scope.moveItems.collectionToMove[0].MoveAutoContinueInfo.KeepSourceVMs
                    };
                }
                catch (e) {
                }
                //endregion

                if ($scope.moveItems.VPGHasMoveCommitWithoutReverse) {
                    zAlertFactory.warn('WARNING', $translate.instant('RECOVERY_WIZARD.SUMMARY.MOVE_WITHOUT_REVERSE'), $scope.handleMoveCommitWithoutReverse,
                        [zAlertFactory.buttons.CANCEL, zAlertFactory.buttons.OK]);
                } else {
                    zertoServiceFactory.MoveBeforeCommit($scope.moveItems.collectionToMove).then(null, onFail);
                }
            }

            //GA - send event
            analyticsData.numberOfVms = _.sum($scope.data, 'NumberOfVms');
            $scope.$emit(analyticsEventName, analyticsData);
            recoveryWizardFactory.closeModal();

        };

        $scope.handleMoveCommitWithoutReverse = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                zertoServiceFactory.MoveBeforeCommit($scope.moveItems.collectionToMove).then(null, onFail);
            }
        };

        $scope.createLiveFailoverCollection = function (selectedVpgs) {
            var result = [];
            _.forEach(selectedVpgs, function (vpg) {
                var item = new vos.FailoverBeforeCommitGuiCommand();
                item.CheckpointIdentifier = vpg.checkpointObj.lastCheckpoint.Identifier;
                item.ForceShutdown = vpg.shutdownActionObj.value === failoverShutdownAction.FORCE_SHUTDOWN;
                item.MoveAutoContinueInfo = $scope.createMoveAutoContinueInfo(vpg);
                item.ProtectionGroupIdentifier = vpg.Identifier;
                item.Shutdown = item.ForceShutdown === true ? true : vpg.shutdownActionObj.value === failoverShutdownAction.SHUTDOWN;

                result.push(item);
            });

            return result;
        };

        $scope.createMoveAutoContinueInfo = function (vpg) {
            if (vpg.commitPolicyObj.defaultAction === enums.MoveNextAction.None) {
                return null;
            }

            var result = new vos.MoveAutoContinueInfoVisual();
            result.Action = (vpg.commitPolicyObj.defaultAction === enums.MoveNextAction.Commit) ? 'Commit' : 'Rollback';
            result.PostMoveSettings = vpg.recoveryItemVo.useReverseProtection ? vpg.recoveryItemVo.vpgInfo.ManageVpgInfo.Config : null;
            result.TimeToWaitInSec = vpg.commitPolicyObj.defaultTimeout;
            result.IsContinueOnPreScriptFailure = false;
            result.KeepSourceVMs = vpg.keepSourceVmsObj.value;

            return result;
        };

        $scope.createTestFailoverCollection = function (selectedVpgs) {
            var result = [];
            _.forEach(selectedVpgs, function (vpg) {
                var item = {
                    CheckpointIdentifier: vpg.checkpointObj.lastCheckpoint.Identifier,
                    ProtectionGroupIdentifier: vpg.Identifier
                };

                result.push(item);
            });
            return result;
        };

        $scope.createMoveCollction = function (selectedVpgs) {
            var result = {};
            result.collectionToMove = [];
            result.VPGHasMoveCommitWithoutReverse = false;

            _.forEach(selectedVpgs, function (vpg) {
                if (vpg.commitPolicyObj.defaultAction === enums.MoveNextAction.Commit && !vpg.recoveryItemVo.useReverseProtection && !vpg.keepSourceVmsObj.value) {
                    result.VPGHasMoveCommitWithoutReverse = true;
                }

                var item = new vos.MoveBeforeCommitGuiCommand();
                item.ProtectionGroupIdentifier = vpg.Identifier;
                item.ForceShutdown = vpg.forceShutdownObj.value;
                item.MoveAutoContinueInfo = $scope.createMoveAutoContinueInfo(vpg);

                result.collectionToMove.push(item);
            });
            return result;
        };
    });
