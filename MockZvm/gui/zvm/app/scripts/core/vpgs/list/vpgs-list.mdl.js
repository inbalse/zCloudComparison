'use strict';
angular.module('zvmApp.models')
    .factory('vpgsListModel', function (zertoServiceUpdaterFactory, vpgsModel, zTabsStateConstants,
                                        $filter, vpgsProgressService, entityCases) {
            var vpgsListModel = {};

            vpgsListModel.register = function (scope) {
                return zertoServiceUpdaterFactory.register(scope, 'GetProtectionGroupListScreen', [], false, vpgsListModel.processData);
            };

            vpgsListModel.getGridId = function () {
                return zTabsStateConstants.LIST.VPGS;
            };

            vpgsListModel.getGridColumnsDefs = function () {
                return vpgsModel.getGridColumnsDefs();
            };

            vpgsListModel.getGridDefaultViews = function () {
                return vpgsModel.getGridDefaultViews();
            };

            vpgsListModel.processData = function (data) {
                var processed = vpgsModel.processData(data.ProtectionGroups);

                _.forEach(processed, function (item) {
                    var taskData = vpgsProgressService.convertTaskData(item);
                    vpgsListModel.setVPGOperation(item, taskData);
                    vpgsListModel.setVPGState(item.vpgState);
                    item.ActualRPOObj = vpgsListModel.setActualRPOObj(item);
                    item.NameObj.nameText.label = item.Name + ' (' + item.NumberOfVms + ')';
                    item.NameObj.deleteIcon = vpgsListModel.setVPGDeleteIcon(item);
                    item.NameObj.editIcon = vpgsListModel.setVPGEditIcon(item);
                });

                return processed;
            };

            vpgsListModel.setVPGOperation = function (item, taskData) {
                item.stateProcess = taskData.process;
                item.operation = taskData.operation;
            };

            vpgsListModel.setVPGState = function (vpgState) {
                if (vpgState.showProgress) {
                    vpgState.divClass = 'state-column-active';
                    vpgState.spanClass = 'progress-span';
                    return;
                }
                vpgState.divClass = 'none';
                vpgState.spanClass = 'none';
            };

            vpgsListModel.setActualRPOObj = function (item) {
                return {
                    display: $filter('displayRPO')(item.ActualRPO),
                    value: item.ActualRPO
                };
            };
            vpgsListModel.setVPGDeleteIcon = function (item) {
                return {
                    type: entityCases.caseDelete,
                    enabled: item.State.ButtonsState.IsDeleteEnabled
                };
            };
            vpgsListModel.setVPGEditIcon = function (item) {
                return {
                    type: entityCases.caseEdit,
                    enabled: item.State.ButtonsState.IsUpdateEnabled
                };
            };
            return vpgsListModel;
        }
    );
