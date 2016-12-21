'use strict';

angular.module('zvmApp.core')
    .controller('createCheckpointController', function ($scope, $stateParams, $translate, createCheckpointFactory, enums, vos,
                                                        $filter, zAlertFactory, zSlickGridFilterTypes, vmsListModel, vpgsContainerService) {
        //========================================================================================
        // Properties
        //========================================================================================
        $scope.checkpoint = {};
        $scope.forms = {};
        $scope.loading = true;
        $scope.selectedItems = [];
        $scope.gridData = [];
        $scope.showGrid = false;

        //========================================================================================
        // User Interaction Handlers
        //========================================================================================
        $scope.handleSaveClicked = function () {
            createCheckpointFactory.sendData($scope.createTaggedCheckpointsCollection($scope.selectedItems, $scope.checkpoint.name)).then(
                function () {
                    $scope.closeWindow();
                }, function (reason) {
                    // Bug 24391 - Bug Hunt: When trying to add manual CP in WAN disaster, the error isn't readable
                    zAlertFactory.fail(reason.faultString);
                });
        };

        $scope.handleCancelClicked = function () {
            $scope.closeWindow();
        };

        $scope.closeWindow = function () {
            createCheckpointFactory.modalInstance.dismiss('close');
        };

        $scope.closeHandler = function () {
            $scope.closeWindow();
        };

        //========================================================================================
        // Data
        //========================================================================================
        var columnDefs = [
            {name: $translate.instant('CREATE_CHECKPOINT.GRID.DIR'), field: 'Direction', filter: zSlickGridFilterTypes.MULTI_SELECT, formatter: $filter('enumToCssClassFormatter')('protection-group-state-visual')},
            {name: $translate.instant('CREATE_CHECKPOINT.GRID.NAME'), toolTip: $translate.instant('GRID_COLUMNS.VPG_NAME'), field: 'Name', filter: zSlickGridFilterTypes.WILDCARD},
            {name: $translate.instant('CREATE_CHECKPOINT.GRID.PROTECTED'), toolTip: $translate.instant('GRID_COLUMNS.SOURCE_SITE'), field: 'SourceSiteName', filter: zSlickGridFilterTypes.WILDCARD},
            {name: $translate.instant('CREATE_CHECKPOINT.GRID.RECOVERY'), toolTip: $translate.instant('GRID_COLUMNS.TARGET_SITE'), field: 'TargetSiteName', filter: zSlickGridFilterTypes.WILDCARD}
        ];

        $scope.customOptions = {
            columns: columnDefs
        };

        //========================================================================================
        // Internal Helpers
        //========================================================================================
        $scope.createTaggedCheckpointsCollection = function (vpgs, tag) {
            var result = [];

            _.forEach(vpgs, function (value) {
                var item = new vos.InsertTaggedCheckpointGuiCommand();
                item.ProtectionGroupIdentifier = value.Identifier;
                item.Tag = tag;
                result.push(item);
            });

            return result;
        };

        $scope.sendButton = {label: $translate.instant('CREATE_CHECKPOINT.SAVE'), handler: $scope.handleSaveClicked, disabled: false };
        $scope.buttons = [
            {label: $translate.instant('CREATE_CHECKPOINT.CANCEL'), class: 'btn btn-link', handler: $scope.handleCancelClicked, disabled: false},
            $scope.sendButton
        ];

        $scope.disableButtons = function () {
            $scope.sendButton.disabled = $scope.selectedItems.length <= 0 || ($scope.forms.addCheckpointForm && !$scope.forms.addCheckpointForm.$valid);
        };

        $scope.$watch('forms.addCheckpointForm.$valid', $scope.disableButtons);
        $scope.$watch('selectedItems.length', $scope.disableButtons);

        var cpEnabled = createCheckpointFactory.enabledCheckpoints;

        $scope.gridData = _.map(cpEnabled, function (vpg) {
            vpg.id = vpg.Identifier.GroupGuid;
            //check if vpg been selected in vpg list or open from vpg details and pre select them
            var selectedVPGs = vpgsContainerService.getSelectedVPGIds();
            if (!_.isEmpty(selectedVPGs)) {
                if (_.contains(selectedVPGs, vpg.id)) {
                    $scope.selectedItems.push(vpg);
                }
            } else {
                if (angular.isDefined($stateParams.id) && _.isEqual($stateParams.id, vpg.id)) {
                    $scope.selectedItems.push(vpg);
                }
            }

            //check if vm been selected in vms list
            if (vmsListModel.selectedVmsIdentity.length) {
                if (_.contains(vmsListModel.selectedVmsIdentity, vpg.id)) {
                    $scope.selectedItems.push(vpg);
                }
            }

            return vpg;
        });
        $scope.showGrid = true;
        $scope.disableButtons();

        $scope.selectedItemChange = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
    }
);


