'use strict';

angular.module('zvmApp.core')
    .controller('changeVmRecoveryVraController', function ($scope, $translate, changeVmRecoveryVraFactory, result,
                                                           zSlickGridFilterTypes, $filter, enums, changeVmRecoveryVraModel) {
        var columnDefs = [
            {
                name: ' ', hideFromEditColumns: true, field: 'Status', maxWidth: 30,
                formatter: $filter('enumToCssClassFormatter')('change-host-validation-status'),
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                headerCssClass: 'protection-group-alert-status-header'
            },
            {
                name: $translate.instant('CHANGE-VM-RECOVERY-VRA.COLUMNS.DIRECTION'),
                maxWidth: 80,
                hideFromEditColumns: true,
                field: 'Direction',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('enumToCssClassFormatter')('protection-group-state-visual')
            },
            {
                name: $translate.instant('CHANGE-VM-RECOVERY-VRA.COLUMNS.VM_NAME'), field: 'vmName',
                filter: zSlickGridFilterTypes.WILDCARD, hideFromEditColumns: true
            },
            {
                name: $translate.instant('CHANGE-VM-RECOVERY-VRA.COLUMNS.VPG_NAME'),
                filter: zSlickGridFilterTypes.WILDCARD, hideFromEditColumns: true,
                field: 'ProtectionGroupName'
            },
            {
                name: $translate.instant('CHANGE-VM-RECOVERY-VRA.COLUMNS.ZORG'), filter: zSlickGridFilterTypes.WILDCARD,
                field: 'ZertoOrganization', hideFromEditColumns: true
            },
            {
                name: $translate.instant('CHANGE-VM-RECOVERY-VRA.COLUMNS.VM_SIZE'), filter: zSlickGridFilterTypes.RANGE,
                hideFromEditColumns: true, field: 'vmSize', formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('CHANGE-VM-RECOVERY-VRA.COLUMNS.NUMBER_OF_VOLUMES'), hideFromEditColumns: true,
                filter: zSlickGridFilterTypes.RANGE, field: 'NumberOfVolumes'
            },
            {
                name: $translate.instant('CHANGE-VM-RECOVERY-VRA.COLUMNS.VM_HW_VERSION'), hideFromEditColumns: true,
                filter: zSlickGridFilterTypes.WILDCARD, field: 'VmHardwareVersion'
            }
        ];
        $scope.customOptions = {
            columns: columnDefs
        };

        $scope.selectedItems = [];

        $scope.setData = function () {
            $scope.data = _.cloneDeep(result);
            $scope.gridData = changeVmRecoveryVraModel.processData($scope.data.VmsList);
            $scope.data.AvailableHostList = changeVmRecoveryVraModel._processAvailableHostData($scope.data.AvailableHostList);
            $scope.sendButton.disabled = !$scope.isOkButtonValide();
        };

        $scope.init = function () {
            $scope.loading = false;
            $scope.sendButton = {label: $translate.instant('MODAL.SAVE'), handler: $scope.handleSave, disabled: true};
            $scope.buttons = [
                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.handleCancel,
                    disabled: false
                },
                $scope.sendButton
            ];
            $scope.isGridVisible = true;
            $scope.setData();
        };

        var successValidation = function (result) {
            $scope.data = result;
            $scope.gridData = changeVmRecoveryVraModel.processData($scope.data.VmsList);
            $scope.data.AvailableHostList = changeVmRecoveryVraModel._processAvailableHostData($scope.data.AvailableHostList);
            $scope.sendButton.disabled = !$scope.isOkButtonValide();
        };

        $scope.validateData = function () {
            // update selected items
            _.forEach($scope.selectedItems, function (item) {
                item.Selected = true;
            });
            //send all vm list data
            changeVmRecoveryVraFactory.validateData($scope.data).then(successValidation);
        };

        //=========================================== handlers =======================================================

        $scope.selectedChange = function () {
            if ($scope.data.SelectedHost && $scope.selectedItems.length) {

                if ($scope.oldSelectedHost) {
                    if (!_.isEqual($scope.data.SelectedHost.BaseComputeResourceIdentifier, $scope.oldSelectedHost.BaseComputeResourceIdentifier)) {
                        $scope.validateData();
                    } else if ($scope.selectedItems.length && ($scope.selectedItems.length !== $scope.oldSelectedVMs)) {
                        $scope.validateData();
                    }

                } else {
                    $scope.validateData();
                }
            }

            //save old selected host and number of chosen vms
            $scope.oldSelectedHost = $scope.data.SelectedHost;
            $scope.oldSelectedVMs = $scope.selectedItems.length;

            if (_.isEmpty($scope.selectedItems)) {
                $scope.setData();
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
                return;
            }
            //reset info data when selected change
            if (!_.isEmpty($scope.data.NotificationsList)) {
                $scope.data.NotificationsList.length = 0;
            }
            if (!_.isEmpty($scope.data.ExplanationList)) {
                $scope.data.ExplanationList.length = 0;
            }

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.handleCancel = function () {
            changeVmRecoveryVraFactory.close();
        };

        $scope.handleSave = function () {
            //send only selected vms
            $scope.data.VmsList = $scope.selectedItems;
            changeVmRecoveryVraFactory.save($scope.data);
        };

        //=========================================== helpers =======================================================

        $scope.getTooltip = function (vmData) {
            var tooltip = 'Affected VMs : ';
            _.forEach(vmData, function (vm) {
                tooltip += vm.DisplayName.length > 30 ? vm.DisplayName.substr(0, 27) + '...' : vm.DisplayName + ' ,';
            });

            tooltip = tooltip.substr(0, tooltip.length - 2);
            return tooltip;
        };

        $scope.getUnderlineClass = function (item) {
            if (item && item.Recommended) {
                return 'underline-text';
            } else {
                return 'none';
            }
        };

        $scope.isOkButtonValide = function () {
            var result = false;

            if (angular.isDefined($scope.data.SelectedHost)) {
                _.forEach($scope.selectedItems, function (item) {
                    //find the update after
                    var found = _.find($scope.data.VmsList, function (vmItem) {
                        return _.isEqual(vmItem.VirtualMachineVisualObject, item.VirtualMachineVisualObject);
                    });

                    if (found.Selected && (found.Status === enums.ChangeHostVmVisualObject_ChangeHostValidationStatus.Good ||
                        found.Status === enums.ChangeHostVmVisualObject_ChangeHostValidationStatus.Warning)) {
                        result = true;
                    }
                });
            }
            return result;
        };

        //==================================================================================================

        //=========================================== init =======================================================

        $scope.init();

        //==================================================================================================
    });
