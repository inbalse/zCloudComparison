'use strict';

angular.module('zvmApp.core')
    .factory('vraUpgradeFactory', function ($uibModal) {
        var vraUpgradeFactory = {};

        vraUpgradeFactory.showVraUpgrade = function (selectedVra, latestVraVersion) {
            vraUpgradeFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/vra_upgrade/vra-upgrade.html',
                windowClass: 'modal-upgrade-vra-modal',
                controller: 'vraUpgradeControllerPopup',
                resolve: {
                    selectedVra: function () {
                        return selectedVra;
                    },
                    latestVraVersion: function () {
                        return latestVraVersion;
                    }
                }
            });
        };

        vraUpgradeFactory.close = function() {
            vraUpgradeFactory.modalInstance.dismiss('close');
        };

        return vraUpgradeFactory;
    });
