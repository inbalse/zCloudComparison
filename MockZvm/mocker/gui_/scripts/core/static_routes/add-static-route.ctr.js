'use strict';

angular.module('zvmApp.core')
    .controller('addStaticRoutesController', function ($scope, $uibModalInstance, result, $translate, vos, staticRoutesFactory) {

        $scope.forms = {};
        $scope.data = result;
        $scope.staticRouteObj = {address: '', subnetMask: '', gateway: ''};
        $scope.isAddStaticRouteSaveEnabled = false;

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.save = function () {
            var idItem = new vos.StaticRouteIdentifier();
            idItem.Guid = staticRoutesFactory.createGuid();
            $scope.data.items.push({
                isGroup: false,
                editable: $scope.data.editable,
                id: idItem,
                destination: $scope.staticRouteObj.address,
                gateway: $scope.staticRouteObj.gateway,
                netmask: $scope.staticRouteObj.subnetMask,
                title: $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.SITE_ROUTES.ADDRESS') + ': ' + $scope.staticRouteObj.address + '<br/>' +
                $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.SITE_ROUTES.SUBNET_MASK') + ': ' + $scope.staticRouteObj.subnetMask + '<br/>' +
                $translate.instant('SITE_SETTINGS.CLOUD_SETTINGS.SITE_ROUTES.GATEWAY') + ': ' + $scope.staticRouteObj.gateway,
                items: []
            });

            $uibModalInstance.close($scope.data);
        };

        $scope.$watch('forms.addStaticRoutForm.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.isAddStaticRouteSaveEnabled = value;
            }
        });
    });
