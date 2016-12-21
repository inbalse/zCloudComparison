'use strict';

angular.module('zvmApp.core')
    .factory('selectVpgFactory', function ($q, $uibModal, zertoServiceFactory) {
        var selectVpgFactory = {};

        selectVpgFactory._modalInstance = null;
        selectVpgFactory._promise = null;

        selectVpgFactory.open = function () {
            selectVpgFactory._promise = $q.defer();
            selectVpgFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/select_vpg/select-vpg.html',
                windowClass: 'select-vpg-popup',
                controller: 'selectVpgController',
                backdrop: 'static'
            });
            return selectVpgFactory._promise.promise;
        };
        selectVpgFactory.save = function (value) {
            selectVpgFactory._promise.resolve(value);
            selectVpgFactory._closeWindow();
        };

        selectVpgFactory.close = function () {
            selectVpgFactory._promise.reject('close');
            selectVpgFactory._closeWindow();
        };

        selectVpgFactory._closeWindow = function () {
            selectVpgFactory._modalInstance.dismiss('close');
            selectVpgFactory._modalInstance = null;
        };

        selectVpgFactory.getVPGsList = function () {
            return zertoServiceFactory.GetMinimalVpgList();
        };

        return selectVpgFactory;
    });
