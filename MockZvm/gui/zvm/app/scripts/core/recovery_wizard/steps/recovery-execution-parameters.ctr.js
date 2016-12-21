'use strict';

angular.module('zvmApp.core')
    .constant('recoveryWizardEvents', {
        checkpointClicked: 'RecoveryWizard::CheckpointClicked'
    })
    .controller('recoveryExecutionParametersController', function ($scope, $filter, $window, $translate, recoveryWizardEvents, enums, recoveryWizardModel,
                                                                   failoverShutdownAction, zSlickGridFilterTypes, zAlertFactory,
                                                                   configureCheckpointFactory, recoveryWizardFactory, recoveryPolicyFactory,
                                                                   zertoServiceFactory, zNotificationService, zNotificationConstant) {

        $scope.editRecoveryDisabled = true;
        $scope.selectedItems = [];
        $scope.viewByValues = [];
        $scope.groupByValues = [];
        $scope.gridObj = {};
        $scope.gridId = 'recovery-execution-parameters-' + recoveryWizardModel.recoveryType;

        $scope.commitValues = [
            {value: failoverShutdownAction.NO_SHUTDOWN, display: failoverShutdownAction.NO_SHUTDOWN},
            {value: failoverShutdownAction.SHUTDOWN, display: failoverShutdownAction.SHUTDOWN},
            {value: failoverShutdownAction.FORCE_SHUTDOWN, display: failoverShutdownAction.FORCE_SHUTDOWN}
        ];

        $scope.showEdit = recoveryWizardModel.recoveryType !== enums.RecoveryType.FailoverTest;
        var columnDefsHead = [
            {
                name: ' ',
                hideFromEditColumns: true,
                field: 'AlertStatus',
                maxWidth: 40,
                formatter: $filter('enumToCssClassFormatter')('protection-group-alert-status'),
                headerCssClass: 'protection-group-alert-status-header'
            },
            {
                name: $translate.instant('VPG_LIST.NAME'),
                field: 'vpgName',
                minWidth: 130,
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.DIRECTION_COLUMN'),
                field: 'Direction',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('enumToCssClassFormatter')('protection-group-state-visual')
            },
            {
                name: $translate.instant('VPG_VM_LIST_COL.PEER_SITE'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'PeerSiteTypeObj',
                formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')
            }
        ];

        var columnDefsMiddle = [];

        if (recoveryWizardModel.recoveryType === enums.RecoveryType.FailoverTest || recoveryWizardModel.recoveryType === enums.RecoveryType.Failover) {
            columnDefsMiddle.push({
                name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.CHECKPOINT'),
                minWidth: 140,
                field: 'checkpointObj',
                id: 'checkpointObj',
                filter: zSlickGridFilterTypes.DATE,
                formatter: $filter('checkpointEventLinkFormatter')('checkpointClicked', 'checkpoint')
            });
        }

        if (recoveryWizardModel.recoveryType === enums.RecoveryType.Failover || recoveryWizardModel.recoveryType === enums.RecoveryType.Move) {
            columnDefsMiddle.push(
                {
                    name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.COMMIT_POLICY'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: 'commitPolicyObj',
                    id: 'commitPolicyObj',
                    formatter: $filter('propertyFormatter')('commitPolicy'),
                    cssClass: 'editable-cell input-editor',
                    editor: $filter('commitPolicyEditor')()
                },
                {
                    name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.REVERSE_PROTECTION'),
                    toolTip: $translate.instant('GRID_COLUMNS.REVERSE'),
                    field: 'recoveryItemVo',
                    minWidth: 130,
                    id: 'reverse',
                    formatter: $filter('recoveryReversProtectionFormatterAndEditor')('use-ok-icon', 'useReverseProtection')
                }
            );
        }

        if (recoveryWizardModel.recoveryType === enums.RecoveryType.Move) {
            columnDefsMiddle.push(
                {
                    name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.KEEP_SOURCE_VMS'),
                    toolTip: $translate.instant('GRID_COLUMNS.KEEP_SOURCE_VMS_HEADER_COLUMN'),
                    field: 'keepSourceVmsObj',
                    minWidth: 110,
                    id: 'keepSourceVmsObj',
                    formatter: $filter('iconClassFormatterValue')('checkbox', 'value'),
                    editor: $filter('checkboxOneClickEditor')('value', 'keepSourceVmsObj'),
                    zCellEditable: function (dataItem) {
                        return {
                            isEditEnabled: !dataItem.keepSourceVmsObj.isDisabled,
                            infoMessage: dataItem.keepSourceVmsObj.infoMessage,
                            leftFixer: 37, topFixer: 35
                        };
                    }
                });
        }

        var getShutdownVmEditor = function(){
            return  $filter('zInlineDropdownEditor')({
                className: 'shutdown-vm-inline-dropdown',
                optionsCollection: $scope.commitValues,
                propName: 'value',
                searchEnabled: false
            });
        };

        if (recoveryWizardModel.recoveryType === enums.RecoveryType.Failover) {
            columnDefsMiddle.splice(columnDefsMiddle.length - 1, 0, {
                name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.VM_SHUTDOWN'),
                field: 'shutdownActionObj',
                id: 'shutdownActionObj',
                toolTip: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.VM_SHUTDOWN_TOOLTIP'),
                formatter: $filter('recoveryVmShutDownFormatterAndEditor'),
                cssClass: 'editable-cell',
                editor: getShutdownVmEditor(),
                zCellEditable: function(dataItem){
                    return {isEditEnabled: dataItem.recoveryItemVo.IsProtectedSiteConnected, errorMessage: 'Protected site is not available'};
                }
            });
        }

        if (recoveryWizardModel.recoveryType === enums.RecoveryType.Move) {
            columnDefsMiddle.splice(columnDefsMiddle.length - 1, 0,
                {
                    name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.FORCE_SHUTDOWN'),
                    toolTip: $translate.instant('GRID_COLUMNS.FORCE_SHUTDOWN'),
                    field: 'forceShutdownObj',
                    minWidth: 110,
                    id: 'forceShutdownObj',
                    formatter: $filter('iconClassFormatterValue')('checkbox', 'value'),
                    editor: $filter('checkboxOneClickEditor')('value', 'forceShutdownObj')
                });
        }

        var columnDefsTail = [
            {
                name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.BOOT_ORDER'),
                field: 'bootOrderObj',
                id: 'bootOrderObj',
                formatter: $filter('propertyToEnumFormatter')('use-icon', 'value')
            },
            {
                name: $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.SCRIPTS'),
                field: 'scriptObj',
                id: 'scriptObj',
                formatter: $filter('propertyToEnumFormatter')('use-icon', 'value')
            }
        ];

        var columnDefs = _.union(columnDefsHead, columnDefsMiddle, columnDefsTail);

        var queueAndExecuteCommand = function (item, column, editCommand) {
            var allowUndo = true;

            switch (column.id) {
                case 'forceShutdownObj':
                    editCommand.editor.applyValue = recoveryWizardModel.applyForceShutdown;
                    break;
                case 'keepSourceVmsObj':
                    editCommand.editor.applyValue = recoveryWizardModel.applyKeepSourceVms;
                    break;
            }

            if (allowUndo) {
                $scope.gridObj.grid.commandQueue.push(editCommand);
            }
            editCommand.execute();
        };

        $scope.customOptions = {
            columns: columnDefs,
            showCheckbox: recoveryWizardModel.recoveryType === enums.RecoveryType.Failover || recoveryWizardModel.recoveryType === enums.RecoveryType.Move,
            editCommandHandler: queueAndExecuteCommand
        };

        //region============================== user interactions =====================
        $scope.editRecovery = function () {
            recoveryPolicyFactory.open($scope.selectedItems).then(function (result) {
                recoveryWizardModel.saveCommitPolicy(result, $scope.gridData, $scope.selectedItems);
                $scope.gridObj.grid.updateData($scope.gridData);
            });
        };
        ////endregion ===============================================================

        $scope._initData = function (reverseResult) {
            recoveryWizardModel.createRecoveryItemVO(reverseResult).then(function (result) {
                var vpgsInActiveBackup = $scope._getVPGInActiveBackup(result);
                if (vpgsInActiveBackup.length > 0) {
                    var vpgNames = [];
                    var vpgIdentifiers = [];
                    //get name and identifier of each vpg
                    _.forEach(vpgsInActiveBackup, function (item) {
                        vpgNames.push(item.vpgName);
                        vpgIdentifiers.push(item.Identifier || item.VPGIdentifier || item.ProtectionGroupId);
                    });
                    vpgNames = vpgNames.join(', ');
                    var warningText = $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.WARNING_TEXT', {vpgNames: vpgNames});
                    //show warning message - to abort active backups or not
                    zAlertFactory.warn($translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.WARNING_TITLE'), warningText, function (event) {
                        if (event.target.name === zAlertFactory.buttons.YES) {
                            zertoServiceFactory.AbortBackups(vpgIdentifiers);
                        }
                    }, [zAlertFactory.buttons.YES, zAlertFactory.buttons.NO]);
                }

                $scope.gridData = result;

                //call summary step validation after get execution parameters data
                recoveryWizardModel.validateSummary(recoveryWizardModel.actualSteps[2]);
            }, function () {
                zAlertFactory.fail('Error', $translate.instant('RECOVERY_WIZARD.EXECUTION_PARAMETERS.ERROR_CHECKPOINT'));
                $scope.$emit('wizard:CancelButtonClick');
            });
        };

        if (recoveryWizardModel.recoveryType === enums.RecoveryType.Move) {
            zertoServiceFactory.GetBulkReverseReplicationSettings(_.map(recoveryWizardModel.data.selectedVpgs, 'Identifier')).then(function (result) {
                $scope._initData(result);
            });
        } else {
            $scope._initData(null);
        }

        $scope._getVPGInActiveBackup = function (vpgCollection) {
            var result = [];
            _.each(vpgCollection, function (vpgItem) {
                if (vpgItem.recoveryItemVo.isBackupInProgress) {
                    result.push(vpgItem);
                }
            });
            return result;
        };

        $scope.reselectReverse = function () {
            recoveryWizardModel.reselectReverse($scope.gridData).then(function () {
                $scope.gridObj.grid.updateData($scope.gridData);
            });
        };

        //------------------------- SUBSCRIBER --------------------------------------------------//
        var isClickAllowed = true;

        //get notify from inline editors if row click allowed
        var rowClickAllowed = function(isAllowed) {
            isClickAllowed = isAllowed;
        };

        var subscriber = zNotificationService.getSubscriber(zNotificationConstant.INLINE_OPENED_NOTIFICATION);
        subscriber.promise.then(null, null, rowClickAllowed);

        $scope.$on('$destroy', function () {
            zNotificationService.unSubscribe(subscriber, zNotificationConstant.INLINE_OPENED_NOTIFICATION);
        });

        $scope.rowClick = function (e, row) {
            if (e.target.rel && isClickAllowed) {
                e.preventDefault();

                var selectedVpg = $scope.gridData[row],
                    openPlace = recoveryWizardFactory.title;

                configureCheckpointFactory.open(selectedVpg.Identifier, selectedVpg.Name, selectedVpg.checkpointObj.lastCheckpoint ? selectedVpg.checkpointObj.lastCheckpoint.Identifier : null, openPlace).then(function (result) {
                    if (result) {
                        var found = _.find(recoveryWizardModel.data.selectedVpgs, {Identifier: selectedVpg.Identifier});

                        if (found) {
                            found.checkpointObj = new recoveryWizardModel.CreateCheckpointObj($filter('date')(result.TimeStamp, 'dd/MM/yyyy HH:mm:ss'), result, result.TimeStamp);
                            // trigger grid render
                            for (var i = 0; i <= recoveryWizardModel.data.selectedVpgs.length; i++) {
                                $scope.gridObj.grid.invalidateRow(i);
                            }
                            $scope.gridObj.grid.render();
                        }
                    }
                });
            }
        };

        $scope.selectedItemsChange = function () {
            $scope.editRecoveryDisabled = $scope.selectedItems.length === 0;
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        var getTargetTypeIsNotAzureOrAws = function (vpgData) {
            return _.filter(vpgData, function (vpg) {
                return vpg.recoveryItemVo.targetType !== enums.VpgEntityType.Aws && vpg.recoveryItemVo.targetType !== enums.VpgEntityType.Azure;
            });
        };

        $scope.showReverseAll = function () {
            var vpgTargetNotAzureOrAws = getTargetTypeIsNotAzureOrAws($scope.gridData);

            if (vpgTargetNotAzureOrAws.length === 0) {
                return false;
            }

            var isFailOverOrMove = recoveryWizardModel.recoveryType === enums.RecoveryType.Failover || recoveryWizardModel.recoveryType === enums.RecoveryType.Move;

            //Finds at least one vpg with auto commit to enable reverse protect all
            var autoCommitVpg = _.find(vpgTargetNotAzureOrAws, function (vpg) {
                return vpg.commitPolicyObj.defaultAction === enums.MoveNextAction.Commit;
            });

            var atLeastOneVpgWithCommitPolicy = !_.isNullOrUndefined(autoCommitVpg);

            return isFailOverOrMove && atLeastOneVpgWithCommitPolicy;
        };

    });
