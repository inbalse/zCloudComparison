'use strict';

angular.module('zvmApp.core')
    .controller('commitVpgController', function ($scope, $translate, $q, vpgId, vpgActionStatus, commitVpgFactory,
                                                 zertoServiceFactory, createVPGFactory, isReversePossible, enums, zertoLoggerServiceFactory) {
        //===============================================================
        // init
        //===============================================================
        $scope.vpgId = vpgId;
        $scope.loading = true;
        $scope.forms = {};
        $scope.commitObj = {};
        $scope.commitObj.reverseEnabled = false;
        $scope.isReversePossible = isReversePossible;
        $scope.keepSourceObj = {keepSourceVMs: false, isDisabled: true, isKeepSourceAllowed: false, infoMessage: ''};
        $scope.isMoveAction = vpgActionStatus === enums.ExtensionTask_ZCommand.Move;

        $scope.reverseLabel = $translate.instant('CREATE_VPG_REPLICATION.CONFIGURE');
        //===============================================================
        // user interaction
        //===============================================================

        var checkIsReversePossible = function () {
            return isReversePossible && $scope.vpgInfo.ManageVpgInfo.Entities.Source !== enums.VpgEntityType.Aws && $scope.vpgInfo.ManageVpgInfo.Entities.Source !== enums.VpgEntityType.Azure;
        };

        $scope.handleSave = function () {
            if ($scope.commitObj.reverseEnabled) {
                zertoServiceFactory.MoveCommit($scope.vpgId, $scope.vpgInfo.ManageVpgInfo.Config, $scope.keepSourceObj.keepSourceVMs);
            } else {
                zertoServiceFactory.MoveCommit($scope.vpgId, null, $scope.keepSourceObj.keepSourceVMs);
            }

            commitVpgFactory.resetVpgInfoState();
            commitVpgFactory._close();
        };

        $scope.handleCancel = function () {
            commitVpgFactory._close();
        };

        $scope.configureVpg = function () {
            createVPGFactory.openEditReverse($scope.vpgId, angular.copy($scope.vpgInfo.ManageVpgInfo)).then(function (result) {
                $scope.vpgInfo.ManageVpgInfo = result;
                commitVpgFactory.setVpgInfoState($scope.vpgInfo);

                $scope.commitButton.disabled = false;
                $scope.reverseLabel = $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR');
            });
        };

        var getReverseVpgInfoResultCheckbox = function (result) {
            $scope.vpgInfo = result;
            $scope.isReversePossible = checkIsReversePossible();
            if ($scope.isReversePossible) {
                $scope.reverseLabel = result.IsComplete ? $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR') : $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_MISSING');
            }
            $scope.commitButton.disabled = $scope.isReversePossible && !result.IsComplete;
        };

        $scope.$watch('commitObj.reverseEnabled', function () {
            if ($scope.commitObj.reverseEnabled) {
                if (angular.isUndefined($scope.vpgInfo)) {
                    if ($.isEmptyObject(commitVpgFactory.getVpgInfoState())) {
                        zertoServiceFactory.GetReverseReplicationSettings($scope.vpgId).then(function (result) {
                            commitVpgFactory.setVpgInfoState(result);
                            getReverseVpgInfoResultCheckbox(result);
                        });
                    } else {
                        getReverseVpgInfoResultCheckbox(commitVpgFactory.getVpgInfoState());
                    }
                } else {
                    $scope.reverseLabel = $scope.vpgInfo.IsComplete ? $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR') : $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_MISSING');
                    $scope.commitButton.disabled = !$scope.vpgInfo.IsComplete;
                }

                $scope.keepSourceObj.isDisabled = true;
                $scope.keepSourceObj.keepSourceVMs = false;
            } else {
                $scope.commitButton.disabled = false;
                $scope.keepSourceObj.isDisabled = false;
            }
        });

        //===============================================================
        // init
        //===============================================================
        $scope.commitButton = {label: $translate.instant('MODAL.COMMIT'), handler: $scope.handleSave, disabled: false};
        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.handleCancel,
                disabled: false
            },
            $scope.commitButton
        ];

        var addAllowedPropToVpg = function (protectionGroups, vpgsValidForKeepSourceVMs) {
            var ids = _.pluck(vpgsValidForKeepSourceVMs, 'GroupGuid');

            _.each(protectionGroups, function (vpg) {

                var isKeepSourceAllowed = _.contains(ids, vpg.GroupGuid);

                $scope.keepSourceObj.isKeepSourceAllowed = isKeepSourceAllowed;

                $scope.keepSourceObj.infoMessage = isKeepSourceAllowed ?
                    $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.GRAYED_OUT_REVERSE_PROTECT_INFO') :
                    $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.GRAYED_OUT_BC_INFO');
            });
        };

        var getVpgIdentifierBulkValidationForKeepSourceVMs = function (vpgId) {
            zertoServiceFactory.GetValidVpgsForKeepSourceVMs([vpgId]).then(function (vpgsValidForKeepSourceVMs) {
                addAllowedPropToVpg([vpgId], vpgsValidForKeepSourceVMs);

            }, function (error) {
                zertoLoggerServiceFactory.logError('GetValidVpgsForKeepSourceVMs', [vpgId], error);
            });
        };

        getVpgIdentifierBulkValidationForKeepSourceVMs(vpgId);


        var getReverseVpgInfoResultInit = function (result) {
                $scope.vpgInfo = result;
                $scope.isReversePossible = checkIsReversePossible();
                $scope.commitButton.disabled = $scope.isReversePossible && !result.IsComplete;

                if ($scope.isReversePossible) {
                    $scope.reverseLabel = result.IsComplete ? $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR') : $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_MISSING');
                    zertoServiceFactory.GetMoveAutoCommitPostOperationSettings($scope.vpgId).then(function (result) {
                        if (result) {
                            $scope.commitObj.reverseEnabled = true;
                            $scope.vpgInfo.ManageVpgInfo.Config = result;
                        } else {
                            $scope.commitObj.reverseEnabled = false;
                        }

                        $scope.loading = false;
                    }, function () {
                        $scope.loading = false;
                    });
                } else {
                    $scope.loading = false;
                }
        };

        if ($scope.isReversePossible) {
            if (angular.isUndefined($scope.vpgInfo)) {
                if ($.isEmptyObject(commitVpgFactory.getVpgInfoState())) {
                    zertoServiceFactory.GetReverseReplicationSettings($scope.vpgId).then(function (result) {
                        commitVpgFactory.setVpgInfoState(result);
                        getReverseVpgInfoResultInit(result);
                    }, function () {
                        $scope.loading = false;
                    });
                } else {
                    getReverseVpgInfoResultInit(commitVpgFactory.getVpgInfoState());
                }
            } else {
                $scope.loading = false;
            }
        } else {
            // Bug 25974 - Commit Vpg - When Sites are disconnected, commit popup is locked in loading
            $scope.loading = false;
        }
    });
