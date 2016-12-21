'use strict';

angular.module('zvmApp.core')
    .factory('restoreVolumesFactory', function ($uibModal, zertoServiceFactory, $q) {
        var restoreVolumesFactory = {};

        restoreVolumesFactory._modalInstance = null;
        restoreVolumesFactory._promise = null;


        restoreVolumesFactory.openEdit = function (item, backupSettings, host) {
            restoreVolumesFactory._promise = $q.defer();
            var targetHost = host;
            if (item.ComputeResource) {
                targetHost = item.ComputeResource;
            }
            zertoServiceFactory.GetVCenterPotentialRestoreSecondaryEntities(backupSettings.SiteIdentifier, targetHost.BaseComputeResourceIdentifier).then(function (result) {
                restoreVolumesFactory._modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/restore_volumes/restore-volumes.html',
                    windowClass: 'restore-volumes',
                    controller: 'restoreVolumesPopup',
                    backdrop: 'static',
                    resolve: {
                        item: function () {
                            return angular.copy(item);
                        }, potentials: function () {
                            return angular.copy(result);
                        }
                    }
                });
            });
            return restoreVolumesFactory._promise.promise;
        };

        restoreVolumesFactory.save = function (value) {
            restoreVolumesFactory._promise.resolve(value);
            restoreVolumesFactory._modalInstance.dismiss('save');
        };

        restoreVolumesFactory.cancel = function () {
            restoreVolumesFactory._promise.reject(null);
            restoreVolumesFactory._modalInstance.dismiss('cancel');
        };
        return restoreVolumesFactory;
    });
