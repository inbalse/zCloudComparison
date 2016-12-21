'use strict';

angular.module('zvmApp.core')
    .factory('restoreEditVolumeFactory', function ($uibModal, $q, restoreWizardModel) {
        var restoreEditVolumeFactory = {};

        restoreEditVolumeFactory._modalInstance = null;
        restoreEditVolumeFactory._promise = null;

        restoreEditVolumeFactory.openEdit = function (items, potentials) {

            restoreEditVolumeFactory._promise = $q.defer();
            restoreEditVolumeFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/restore_edit_volume/restore-edit-volume.html',
                windowClass: 'restore-edit-volume',
                controller: 'restoreEditVolumeController',
                backdrop: 'static',
                resolve: {
                    item: function () {
                        return restoreEditVolumeFactory.createSharedObject(items);
                    }, potentials: function () {
                        return angular.copy(potentials);
                    }
                }
            });
            return restoreEditVolumeFactory._promise.promise;
        };
        restoreEditVolumeFactory.createSharedObject = function (items) {
            var sharedObject = angular.copy(items[0]);
            _.each(_.rest(items), function (item) {
                if (!_.isEqual(sharedObject.Destination, item.Destination)) {
                    sharedObject.Destination = null;
                }
                if (!_.isEqual(sharedObject.Path, item.Path)) {
                    sharedObject.Path = null;
                }
                if (!restoreWizardModel.isHyperV) {
                    if (!_.isEqual(sharedObject.IsThinEnabled, item.IsThinEnabled)) {
                        sharedObject.IsThinEnabled = false;
                    }
                }
            });

            return sharedObject;
        };
        restoreEditVolumeFactory.save = function (value) {
            restoreEditVolumeFactory._promise.resolve(value);
            restoreEditVolumeFactory._closeWindow();
        };

        restoreEditVolumeFactory.close = function () {
            restoreEditVolumeFactory._promise.reject('close');
            restoreEditVolumeFactory._closeWindow();
        };

        restoreEditVolumeFactory._closeWindow = function () {
            restoreEditVolumeFactory._modalInstance.dismiss('close');
            restoreEditVolumeFactory._modalInstance = null;
        };
        return restoreEditVolumeFactory;
    });
