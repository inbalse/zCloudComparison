'use strict';

angular.module('zvmApp.core')
    .directive('actionsButton', function (createCheckpointFactory, createVPGFactory, recoveryWizardFactory,
                                          flrWizardFactory, flrDownloadFactory, flrSessionsApiService, enums,
                                          flrSessionStatusTypes, restoreWizardFactory, globalStateModel,
                                          zsspCreateVpgFactory, zAlertFactory, $translate, analyticsEventsTypes) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'scripts/core/actions_button/actions-button.html',
            scope: {
                data: '='
            },
            link: function (scope) {
                scope.showActionsButtonMenu = false;
                scope.actionsButtonClass = 'actionsButtonClass';
                scope.isExpandButtonShow = false;
                scope.expandButton = 'assets/tasks/taskExpandButton.png';
                scope.isPortal = globalStateModel.data.IsPortal;
                scope.isPublicCloud = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws ||
                    globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure;
                scope.isPortal = globalStateModel.data.IsPortal;

                scope.handleActionsButtonClick = function () {
                    showHideMenu(!scope.showActionsButtonMenu);
                };

                scope.handleActionButoonMenuMouseLeave = function () {
                    showHideMenu(false);
                    scope.isExpandButtonShow = false;
                    scope.actionsButtonClass = 'actionsButtonClass';
                };

                scope.handleMenuItemClicked = function ($event, id) {
                    showHideMenu(false);
                    scope.isExpandButtonShow = false;
                    scope.actionsButtonClass = 'actionsButtonClass';
                    switch (id) {
                        case 'createVPG':
                            scope.$emit(analyticsEventsTypes.ACTIONS.CREATE_VPG);
                            if (globalStateModel.data.IsPortal) {
                                zsspCreateVpgFactory.createPortalkNewVpg();
                            } else {//todo move to one service for not duplicate code create/edit vpg is same logic
                                if (globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws) {
                                    zAlertFactory.fail($translate.instant('ACTIONS_BUTTON.CREATE_VPG'), $translate.instant('CREATE_VPG.BLOCK_PUBLIC_CLOUD', {env: 'AWS'}));
                                }
                                else if (globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure) {
                                    zAlertFactory.fail($translate.instant('ACTIONS_BUTTON.CREATE_VPG'), $translate.instant('CREATE_VPG.BLOCK_PUBLIC_CLOUD', {env: 'Azure'}));
                                } else {
                                    createVPGFactory.openCreate();
                                }
                            }
                            break;
                        case 'setCheckpoint':
                            scope.$emit(analyticsEventsTypes.ACTIONS.ADD_CHECKPOINT);
                            createCheckpointFactory.showWindow();
                            break;
                        case 'restore':
                            scope.$emit(analyticsEventsTypes.ACTIONS.RESTORE_BACKUP.INITIAL);
                            restoreWizardFactory.restore();
                            break;
                        case 'move':
                            scope.$emit(analyticsEventsTypes.ACTIONS.MOVE_VPG.INITIAL);
                            recoveryWizardFactory.move();
                            break;
                        case 'flr':
                            scope.$emit(analyticsEventsTypes.ACTIONS.RESTORE_FILE.MOUNT.INITIAL);
                            flrWizardFactory.open();
                            break;
                    }
                };

                scope.handleMouseOver = function () {
                    if (scope.showActionsButtonMenu) {
                        return;
                    }
                    scope.actionsButtonClass = 'actionsButtonUpClass';
                    scope.isExpandButtonShow = true;
                };

                scope.handleMouseOut = function () {
                    if (scope.showActionsButtonMenu) {
                        return;
                    }
                    scope.actionsButtonClass = 'actionsButtonClass';
                    scope.isExpandButtonShow = false;
                };

                function showHideMenu(value) {
                    if (value) {
                        scope.showActionsButtonMenu = true;
                        scope.expandButton = 'assets/tasks/collapseButton.png';
                    } else {
                        scope.showActionsButtonMenu = false;
                        scope.expandButton = 'assets/tasks/taskExpandButton.png';
                    }
                }
            }
        };
    });
