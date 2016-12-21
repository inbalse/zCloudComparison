'use strict';

angular.module('zvmApp.core')
    .controller('bootOrderController', function ($scope, bootOrderFactory, data, entities, items, $translate, vos) {
        $scope.data = data;
        $scope.loading = true;
        $scope.partialViews = {
            itemRenderer : 'scripts/core/boot_order/partials/_item_renderer.html'
        };
        $scope.selectedItem = {};

        $scope.enableEdit = function (scope) {
            scope.showedit = true;
        };
        $scope.disableEdit = function (scope) {
            scope.showedit = false;
        };
        $scope.handleCancelClicked = function () {
            bootOrderFactory.close();
        };

        $scope.handleSaveClicked = function () {
            $scope._updateGroups($scope.list);
            bootOrderFactory.save($scope.data);
            bootOrderFactory.close();
        };

        $scope.buttons = [
            {label: $translate.instant('MODAL.CANCEL'), class: 'btn btn-link', handler: $scope.handleCancelClicked, disabled: false },
            {label: $translate.instant('MODAL.OK'), handler: $scope.handleSaveClicked, disabled: false}
        ];

        $scope.list = _.map($scope.data.Groups, function (group) {
            var machines = _.map(group.Machines, function (machine) {
                return {
                    isGroup: false,
                    id: machine.Id,
                    title: machine.DisplayName,
                    items: [],
                    settings: {}
                };
            });

            return {
                isGroup: true,
                id: group.BootGroupIdentifier,
                title: group.Name,
                items: machines,
                settings: group.Settings
            };
        });

        $scope.options = {
            accept: function (sourceNodeScope, destNodesScope) {
                var src = sourceNodeScope.$nodeScope;
                var dest = destNodesScope.$nodeScope;

                return (!src && !dest) ||
                    (src && dest &&
                    src.$modelValue.isGroup &&
                    dest.$modelValue.isGroup && !_.isEqual(src.$modelValue, dest.$modelValue));
            }
        };

        $scope.removeGroup = function (value) {
            value.remove();
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.handleAddGroupClicked = function () {
            $scope.list.push(
                {
                    isGroup: true,
                    'id': vos.BootGroupIdentifier,
                    'title': $translate.instant('BOOT_ORDER.NEW_GROUP') + ($scope.list.length + 1).toString(),
                    'items': [],
                    'settings': {
                        BootDelay: 0,
                        ShutdownDelay: 0,
                        WaitForTools: false
                    }
                });
        };

        $scope.checkIfRemoveEnable = function (value) {
            return !(value.$modelValue.items.length > 0 || value.$modelValue.title === 'Default' || !value.$modelValue.isGroup);
        };

        $scope.checkIfGroup = function (value) {
            return value.$modelValue.isGroup;
        };

        $scope.checkIfEditable = function (value) {
            return !(!value.$modelValue.isGroup || (value.$modelValue.isGroup && value.$modelValue.title === 'Default'));
        };

        $scope._updateGroups = function (aggregateData) {
            $scope.data.Groups = [];
            $scope.data.Groups = _.map(aggregateData, function (group) {
                var machines = _.map(group.items, function (machine) {
                    return {
                        Id: machine.id,
                        DisplayName: machine.title
                    };
                });

                return {
                    BootGroupIdentifier: group.id,
                    Name: group.title,
                    Machines: machines,
                    Settings: group.settings
                };
            });
        };

        $scope.loading = false;
    });
