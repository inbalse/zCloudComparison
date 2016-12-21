'use strict';

angular.module('zvmApp.core')
    .factory('vraChangePasswordFactory', function ($uibModal) {
        var vraChangePasswordFactory = {};

        vraChangePasswordFactory.showVraChangePasswordWindow = function (hostIdentifiers, isVibUsed, eSXiHostLower51) {
            vraChangePasswordFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/vra_change_password/vra-change-password.html',
                windowClass: 'vra-change_password-modal',
                controller: 'vraChangePasswordController',
                backdrop: 'static',
                resolve: {
                    hostIdentifiers: function () {
                        return hostIdentifiers;
                    },
                    vibUsed: function () {
                        return isVibUsed;
                    },
                    eSXiHostLower51: function () {
                        return eSXiHostLower51;
                    }
                }
            });
        };

        vraChangePasswordFactory.close = function () {
            vraChangePasswordFactory.modalInstance.dismiss('close');
        };

        return vraChangePasswordFactory;
    });
