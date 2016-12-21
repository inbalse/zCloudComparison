'use strict';

angular.module('zvmApp.core')
    .factory('restoreEditNicFactory', function ($uibModal, $q, vos, enums) {
        var restoreEditNicFactory = {};

        restoreEditNicFactory._modalInstance = null;
        restoreEditNicFactory._promise = null;

        restoreEditNicFactory.openEdit = function (items, potentials) {
            restoreEditNicFactory._promise = $q.defer();
            restoreEditNicFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/restore_edit_nic/restore-edit-nic.html',
                windowClass: 'restore-edit-nic',
                controller: 'restoreEditNicController',
                backdrop: 'static',
                resolve: {
                    item: function () {
                        return restoreEditNicFactory.createSharedObject(items);
                    },
                    potentials: function () {
                        return angular.copy(potentials);
                    },
                    isBulk: function () {
                        return items.length > 1;
                    }
                }
            });
            return restoreEditNicFactory._promise.promise;
        };
        restoreEditNicFactory.createSharedObject = function (items) {
            var sharedObject = angular.copy(items[0]);
            _.each(_.rest(items), function (item) {
                if (sharedObject.DisplayName !== item.DisplayName) {
                    sharedObject.DisplayName = null;
                }
                if (!_.isEqual(sharedObject.VCenterVNicRestoreConfiguration.IPConfiguration, item.VCenterVNicRestoreConfiguration.IPConfiguration)) {
                    sharedObject.VCenterVNicRestoreConfiguration.IPConfiguration = new vos.RestoreIpConfiguration(null, null, null, null, null, null, enums.RestoreIpType.Same);
                }
                if (sharedObject.VCenterVNicRestoreConfiguration.IsIPConfigurationEnabled !== item.VCenterVNicRestoreConfiguration.IsIPConfigurationEnabled) {
                    sharedObject.VCenterVNicRestoreConfiguration.IsIPConfigurationEnabled = undefined;
                }
                if (sharedObject.VCenterVNicRestoreConfiguration.IsNewMacAddress !== item.VCenterVNicRestoreConfiguration.IsNewMacAddress) {
                    sharedObject.VCenterVNicRestoreConfiguration.IsNewMacAddress = undefined;
                }
                if (!_.isEqual(sharedObject.VCenterVNicRestoreConfiguration.Network, item.VCenterVNicRestoreConfiguration.Network)) {
                    sharedObject.VCenterVNicRestoreConfiguration.Network = null;
                }
            });

            return sharedObject;
        };
        restoreEditNicFactory.save = function (value) {
            restoreEditNicFactory._promise.resolve(value);
            restoreEditNicFactory._closeWindow();
        };

        restoreEditNicFactory.close = function () {
            restoreEditNicFactory._promise.reject('close');
            restoreEditNicFactory._closeWindow();
        };

        restoreEditNicFactory._closeWindow = function () {
            restoreEditNicFactory._modalInstance.dismiss('close');
            restoreEditNicFactory._modalInstance = null;
        };
        return restoreEditNicFactory;
    });
