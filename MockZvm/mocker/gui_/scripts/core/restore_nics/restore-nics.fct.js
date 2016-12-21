'use strict';

angular.module('zvmApp.core')
    .factory('restoreNicsFactory', function ($q, $uibModal, zertoServiceFactory) {
        var restoreNicsFactory = {};

        restoreNicsFactory._modalInstance = null;
        restoreNicsFactory._promise = null;

        restoreNicsFactory.openEdit = function (item, backupSettings, host) {
            restoreNicsFactory._promise = $q.defer();
            var targetHost = host;
            if (item.ComputeResource) {
                targetHost = item.ComputeResource;
            }
            zertoServiceFactory.GetVCenterPotentialRestoreSecondaryEntities(backupSettings.SiteIdentifier, targetHost.BaseComputeResourceIdentifier).then(function (result) {
                restoreNicsFactory._modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/restore_nics/restore-nics.html',
                    windowClass: 'restore-nics',
                    controller: 'restoreNicsPopup',
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
            return restoreNicsFactory._promise.promise;
        };

        restoreNicsFactory.save = function (value) {
            restoreNicsFactory._promise.resolve(value);
            restoreNicsFactory._modalInstance.dismiss('save');
        };
        restoreNicsFactory.close = function () {
            restoreNicsFactory._promise.reject(null);
            restoreNicsFactory._modalInstance.dismiss('cancel');
        };

        return restoreNicsFactory;
    });
