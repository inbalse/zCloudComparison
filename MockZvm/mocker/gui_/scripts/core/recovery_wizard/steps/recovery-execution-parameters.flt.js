'use strict';

angular.module('zvmApp.filters')
    .filter('commitPolicyEditor', function (enums, $translate, $q, editorsTemplateFactory, policiesConstants, $rootScope, $compile, recoveryWizardModel, zNotificationService, zNotificationConstant) {
        return function () {
            return function (args) {
                var $template, $select, $afterArea, defaultValue, $scope, $templateHtml, notifier, notificationKey = zNotificationConstant.INLINE_OPENED_NOTIFICATION;

                var scope = this;
                this.init = function () {
                    $template = $(editorsTemplateFactory.getTemplate('form'));
                    $template.addClass('z-inline-editor-commit-policy');
                    notifier = zNotificationService.getNotifier(notificationKey);

                    $templateHtml = '<p>' +
                        '<select class="editor-select">' +
                        '<option value="' + enums.MoveNextAction.Rollback + '">' + $translate.instant('ENUM.MOVE_NEXT_ACTION.' + enums.MoveNextAction.Rollback) + '</option>' +
                        '<option value="' + enums.MoveNextAction.Commit + '">' + $translate.instant('ENUM.MOVE_NEXT_ACTION.' + enums.MoveNextAction.Commit) + '</option>' +
                        '<option value="' + enums.MoveNextAction.None + '">' + $translate.instant('ENUM.MOVE_NEXT_ACTION.' + enums.MoveNextAction.None) + '</option>' +
                        '</select>' +
                        '</p>' +
                        '<div id="z-inline-editor-commit-policy-after"><div>' + $translate.instant('DEFAULT_TIMEOUT') + '</div>' +
                        '<div class="stepper-with-min">' +
                        '<div z-stepper ng-model="timeout" max="' + policiesConstants.MAX_STAGED_ACTION_TIMEOUT_SECONDS / 60 + '" min="minValue" ></div>' +
                        '<label class="stepper-label">' + $translate.instant('Min') + '</label>' +
                        '</div></div>';


                    $scope = $rootScope.$new();
                    $scope.forms = {};
                    $scope.minValue = 0;
                    $scope.timeout = 0;
                    $template.append($templateHtml);
                    $template = $compile($template)($scope);

                    $select = $('select', $template);
                    $afterArea = $('#z-inline-editor-commit-policy-after', $template);

                    $select.on('change', function (e) {
                        var value = e.currentTarget.value;
                        if (parseInt(value) === enums.MoveNextAction.None) {
                            $afterArea.hide();
                            defaultValue.recoveryItemVo.isAutoRollback = false;
                            defaultValue.recoveryItemVo.useReverseProtection = false;
                        }
                        else {
                            if (parseInt(value) === enums.MoveNextAction.Rollback) {
                                defaultValue.recoveryItemVo.isAutoRollback = true;
                                defaultValue.recoveryItemVo.useReverseProtection = false;
                                if ($scope.timeout < policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT) {
                                    $scope.timeout = policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT;
                                }
                                $scope.minValue = policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT;
                            } else {
                                defaultValue.recoveryItemVo.isAutoRollback = false;
                                if ($scope.timeout < policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT) {
                                    $scope.timeout = policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT;
                                }
                                $scope.minValue = policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT;
                            }

                            defaultValue.commitPolicyObj.setDefaultTimeout($scope.timeout * 60);
                            defaultValue.commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj($translate.instant('ENUM.MOVE_NEXT_ACTION.' + value), defaultValue.commitPolicyObj.defaultAction, defaultValue.commitPolicyObj.defaultTimeout);

                            if (defaultValue.commitPolicyObj.defaultTimeout > 0 && defaultValue.commitPolicyObj.defaultAction !== enums.MoveNextAction.None) {
                                defaultValue.commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj($translate.instant('ENUM.MOVE_NEXT_ACTION.' + value) + ', ' +
                                    (defaultValue.commitPolicyObj.defaultTimeout) / 60 + ' ' + $translate.instant('METRICS.MIN'), defaultValue.commitPolicyObj.defaultAction, defaultValue.commitPolicyObj.defaultTimeout);
                            }
                            if (!$rootScope.$$phase) {
                                $rootScope.$digest();
                            }
                            $afterArea.show();
                        }
                    });

                    $('body').on('click', this.handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });

                    $template.appendTo(args.container);
                    $select.focus();
                    notifier.notify({value: false, key: notificationKey});
                };

                this.handleClickOutside = function (e) {
                    if (e.target.className !== args.container.className) {
                        scope.save();
                    }
                };

                this.cancel = function () {
                    args.cancelChanges();
                };

                this.save = function () {
                    args.commitChanges();
                    if (!$rootScope.$$phase) {
                        $rootScope.$digest();
                    }
                };

                this.destroy = function () {
                    $('body').off('click', this.handleClickOutside);
                    $select.off('change');
                    $template.remove();
                    if ($scope && $scope.$destroy) {
                        $scope.$destroy();
                    }

                    //release the wizard buttons from disabled
                    notifier.notify({value: true, key: notificationKey});
                };

                this.focus = function () {
                    $select.focus();
                };

                this.loadValue = function (item) {
                    defaultValue = item;

                    $select.val(defaultValue.commitPolicyObj.defaultAction);
                    $select.select();
                    if (enums.MoveNextAction.Rollback === defaultValue.commitPolicyObj.defaultAction) {
                        $scope.minValue = 10;
                    } else {
                        $scope.minValue = 0;
                    }

                    if (defaultValue.commitPolicyObj.defaultAction === enums.MoveNextAction.None) {
                        $afterArea.hide();
                    }
                    $scope.timeout = parseInt(defaultValue.commitPolicyObj.defaultTimeout / 60);
                };

                this.serializeValue = function () {
                    var commitPolicyObj = angular.copy(defaultValue.commitPolicyObj);
                    commitPolicyObj.setDefaultAction(parseInt($select.val()));
                    commitPolicyObj.setDefaultTimeout($scope.timeout * 60);
                    commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj($translate.instant('ENUM.MOVE_NEXT_ACTION.' + commitPolicyObj.defaultAction), commitPolicyObj.defaultAction, commitPolicyObj.defaultTimeout);

                    if (commitPolicyObj.defaultTimeout > 0 && commitPolicyObj.defaultAction !== enums.MoveNextAction.None) {
                        commitPolicyObj = new recoveryWizardModel.CreateCommitPolicyObj($translate.instant('ENUM.MOVE_NEXT_ACTION.' + commitPolicyObj.defaultAction) + ', ' +
                            (commitPolicyObj.defaultTimeout) / 60 + ' ' + $translate.instant('METRICS.MIN'), commitPolicyObj.defaultAction, commitPolicyObj.defaultTimeout);
                    }

                    return commitPolicyObj;
                };

                this.applyValue = function (item, state) {
                    item[args.column.field] = state;
                };

                this.isValueChanged = function () {
                    return ($select.val() !== defaultValue.commitPolicyObj.defaultAction.toString() || $scope.timeout !== defaultValue.commitPolicyObj.defaultTimeout.toString());
                };

                this.validate = function () {
                    var valid = $scope.forms.inlineForm.$valid;
                    notifier.notify({value: valid, key: notificationKey});
                    return {
                        valid: valid,
                        msg: ''
                    };
                };

                this.init();
            };
        };
    })
    .filter('reverseProtectionEditor', function ($window, $translate, createVPGFactory, recoveryWizardModel, editorsTemplateFactory, zertoServiceFactory, enums, zNotificationService, zNotificationConstant) {
        return function (paramName) {
            return function (args) {

                function getReverseReplication(item) {
                    var found = _.find(recoveryWizardModel.data.selectedVpgs, {Identifier: item.Identifier});
                    if (found) {
                        found.recoveryItemVo.useReverseProtection = item.recoveryItemVo.useReverseProtection;
                        $link.text(found.recoveryItemVo.reverseLabel);

                        if (!found.recoveryItemVo.vpgInfo) {
                            found.recoveryItemVo.reverseLabel = $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_LOADING');
                            $link.text(found.recoveryItemVo.reverseLabel);
                            isLoading = true;
                            zertoServiceFactory.GetReverseReplicationSettings(found.Identifier).then(function (result) {
                                found.recoveryItemVo.reverseLabel = result.IsComplete ? $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR') : $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_MISSING');
                                found.recoveryItemVo.vpgInfo = result;

                                $link.text(found.recoveryItemVo.reverseLabel);
                                isLoading = false;
                            });
                        } else {
                            isLoading = false;
                            $link.text(found.recoveryItemVo.reverseLabel);
                        }
                    }
                }

                var $input, defaultValue, $template, $link, isLoading, $text, notifier, notificationKey = zNotificationConstant.INLINE_OPENED_NOTIFICATION;
                var scope = this;

                var handleClickOutside = function (e) {
                    if (e.target.className.indexOf('editable-cell use') === -1) {
                        scope.save();
                    }
                };

                this.init = function () {
                    $template = $(editorsTemplateFactory.getTemplate('checkbox'));
                    $template.addClass('z-inline-editor-reverse');
                    $link = $('<a class="reverse-protection-edit" href="javascript:void(0);"></a>');
                    $text = $('<span class="reverse-protection-na">N/A</span>');
                    $template.append($link).appendTo(args.container);
                    $template.append($text).appendTo(args.container);
                    $input = $('input', $template);
                    $input.focus();
                    notifier = zNotificationService.getNotifier(notificationKey);

                    $('body').bind('click', handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });

                    notifier.notify({value: false, key: notificationKey});
                };

                this.cancel = function () {
                    args.cancelChanges();
                };

                this.save = function () {
                    args.commitChanges();
                    notifier.notify({value: true, key: notificationKey});
                };

                this.destroy = function () {
                    $('body').unbind('click', handleClickOutside);
                    $link.off('click');
                    $template.remove();

                    //release the wizard buttons from disabled
                    notifier.notify({value: true, key: notificationKey});
                };
                this.focus = function () {
                    $input.focus();
                };

                this.loadValue = function (item) {

                    //if target is AWS revers not available
                    if (item.Entities.Target === enums.VpgEntityType.Aws) {
                        $input.prop('checked', false);
                        $input.prop('disabled', 'disabled');
                        $text.append('<pre class="reverse-protection-info">' + $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.NOT_AVAILABLE_AWS_INFO') + '</pre>');
                        $text.show();
                        return;
                    }

                    defaultValue = !!item[args.column.field][paramName];

                    if (item.State.IsProtectedSiteConnected === false || item.recoveryItemVo.isAutoRollback) {
                        $input.prop('disabled', 'disabled');
                        $text.show();
                    }
                    if (defaultValue) {
                        $input.prop('checked', true);
                        $link.show();
                        getReverseReplication(item);

                    } else {
                        $input.prop('checked', false);
                        $link.hide();
                    }

                    $link.on('click', function (e) {
                        e.preventDefault();
                        if (isLoading) {
                            return;
                        }
                        var found = _.find(recoveryWizardModel.data.selectedVpgs, {Identifier: item.Identifier});
                        if (found) {
                            var grid = args.grid;
                            createVPGFactory.openEditReverse(found.recoveryItemVo.vpgInfo.ManageVpgInfo.ProtectionGroupId, angular.copy(found.recoveryItemVo.vpgInfo.ManageVpgInfo)).then(function (result) {
                                found.recoveryItemVo.vpgInfo.ManageVpgInfo = result;
                                found.recoveryItemVo.vpgInfo.IsComplete = true;
                                found.recoveryItemVo.reverseLabel = $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_REGULAR');
                                $link.text(found.recoveryItemVo.reverseLabel);
                                var items = grid.getData().getItems();
                                grid.updateData(items);
                            });
                        }
                    });

                    $input.on('change', function () {
                        if ($input.is(':checked')) {
                            $link.show();
                        } else {
                            $link.hide();
                        }
                        getReverseReplication(item);
                    });

                };


                this.serializeValue = function () {
                    return $input.prop('checked');
                };

                this.applyValue = function (item, state) {
                    item[args.column.field][paramName] = state;
                };

                this.isValueChanged = function () {
                    return (this.serializeValue() !== defaultValue);
                };

                this.validate = function () {
                    return {
                        valid: true,
                        msg: null
                    };
                };

                this.init();
            };
        };
    })
    .filter('recoveryReversProtectionFormatterAndEditor', function (enums, $filter, $translate) {
        return function (className, propName) {
            return function (row, cell, value, cellDef, dataView) {

                if (value.targetType === enums.VpgEntityType.Aws) {
                    return '<div class="not-available" title="' + $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.NOT_AVAILABLE_AWS_INFO') + '">N/A</div>';
                } else if (value.targetType === enums.VpgEntityType.Azure) {
                    return '<div class="not-available" title="' + $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.NOT_AVAILABLE_AZURE_INFO') + '">N/A</div>';
                }

                if (value[propName] && value.vpgInfo && value.vpgInfo.IsComplete === false) {
                    if (dataView.commitPolicyObj.defaultAction === enums.MoveNextAction.Commit) {
                        return '<div class="editable-cell ' + className + '-missing"></div>';
                    } else {
                        return '<div class="use-ok-icon-false"></div>';
                    }
                }

                dataView.keepSourceVmsObj.setKeepSourceVmsState(value[propName], dataView);

                if (value.IsProtectedSiteConnected) {

                    cellDef.editor = $filter('reverseProtectionEditor')('useReverseProtection');

                    if (angular.isDefined(value[propName])) {
                        if (dataView.commitPolicyObj.defaultAction === enums.MoveNextAction.Commit) {
                            return '<div class="editable-cell ' + className + '-' + value[propName] + '"></div>';
                        } else {
                            return '<div class="use-ok-icon-false"></div>';
                        }
                    } else {
                        return '';
                    }
                }
                else {
                    return '<div class="not-available">N/A</div>';
                }
            };
        };
    })
    .filter('recoveryVmShutDownFormatterAndEditor', function () {
        return function (row, cell, value, column, item) {
            if (item.State.IsProtectedSiteConnected) {
                if (angular.isDefined(value.value)) {
                    return value.value;
                } else {
                    return '';
                }
            } else {
                return '<div class="not-available">N/A</div>';
            }
        };
    });
