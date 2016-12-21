'use strict';

angular.module('zvmApp.core')
    .controller('staticRoutesController', function ($scope, $translate, staticRoutesFactory, result, vos, $uibModal) {

        $scope.data = result;
        $scope.loading = false;

        $scope.enableEdit = function (scope) {
            scope.showedit = true;
        };
        $scope.disableEdit = function (scope, value) {
            $scope._changeGroupNamesDuplicate(value);
            scope.showedit = false;
        };

        $scope.init = function () {
            $scope.sendButton = {label: $translate.instant('MODAL.SAVE'), handler: $scope.handleSave, disabled: false };
            $scope.buttons = [
                {label: $translate.instant('MODAL.CANCEL'), class: 'btn btn-link', handler: $scope.handleCancel, disabled: false},
                $scope.sendButton
            ];

            $scope.list = _.map($scope.data, function (group) {
                var staticRoutes = _.map(group.StaticRoutes, function (staticRoute) {
                    return {
                        isGroup: false,
                        editable: group.Editable,
                        id: staticRoute.Identifier,
                        destination: staticRoute.Destination,
                        gateway: staticRoute.Gateway,
                        netmask: staticRoute.Netmask,
                        title: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.SITE_ROUTES.ADDRESS') + ': ' +
                            staticRoute.Destination + '<br/>' + $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.SITE_ROUTES.SUBNET_MASK') + ': ' +
                            staticRoute.Netmask + '<br/>' + $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.SITE_ROUTES.GATEWAY') + ': ' + staticRoute.Gateway,
                        items: []
                    };
                });

                return {
                    isGroup: true,
                    id: group.RouteGroupIdentifier,
                    editable: group.Editable,
                    title: group.Name,
                    items: staticRoutes
                };
            });
        };

        $scope.options = {
            accept: function (sourceNodeScope, destNodesScope) {
                var src = sourceNodeScope.$nodeScope;
                var dest = destNodesScope.$nodeScope;

                return (!src && !dest) ||
                    (src && dest &&
                        src.$modelValue.isGroup &&
                        dest.$modelValue.isGroup && src.$modelValue.editable);
            }
        };

        $scope.handleAddGroupClicked = function () {
            var idItem = new vos.RouteGroupIdentifier();
            idItem.Guid = staticRoutesFactory.createGuid();

            $scope.list.push(
                {
                    isGroup: true,
                    id: idItem,
                    editable: true,
                    title: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.SITE_ROUTES.NEW_GROUP') + ($scope.list.length + 1).toString(),
                    items: []
                });
        };

        $scope.addStaticRouteToGroup = function (value) {
            // var modalInstance = $uibModal.open({
            $uibModal.open({
                templateUrl: 'addStaticRoutes.html',
                windowClass: 'add-static-route',
                controller: 'addStaticRoutesController',
                resolve: {
                    result: function () {
                        return value.$modelValue;
                    }
                }
            });
        };

        $scope._changeGroupNamesDuplicate = function (value) {
            var index = 1;
            _.forEach($scope.list, function (group) {
                if ((group.title === value.title) && (group !== value )){
                    value.title += '_' + index;
                }
                index ++;
            });
        };

        $scope.handleCancel = function () {
            staticRoutesFactory.close();
        };

        $scope.removeGroup = function (value) {
            value.remove();
        };

        $scope._updateGroups = function (aggregateData) {
            $scope.data = [];
            $scope.data = _.map(aggregateData, function (group) {
                var staticRoutes = _.map(group.items, function (staticRoute) {
                    return {
                        Identifier: staticRoute.id,
                        Destination: staticRoute.destination,
                        Gateway: staticRoute.gateway,
                        Netmask: staticRoute.netmask
                    };
                });

                return {
                    RouteGroupIdentifier: group.id,
                    Editable: group.editable,
                    Name: group.title,
                    StaticRoutes: staticRoutes
                };
            });
        };

        $scope.handleSave = function () {
            //set data to original data
            $scope._updateGroups($scope.list);
            staticRoutesFactory.save($scope.data);
        };

        $scope.init();
    });
