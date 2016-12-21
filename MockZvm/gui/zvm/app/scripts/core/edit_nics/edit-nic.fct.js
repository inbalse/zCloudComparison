'use strict';

angular.module('zvmApp.core')
    .factory('nicEditFactory', function ($uibModal, $q, vpgService, networksService) {
        var nicEditFactory = {};

        nicEditFactory.deferred = null;

        nicEditFactory.open = function (selectedNics) {
            nicEditFactory.deferred = $q.defer();
            nicEditFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_nics/edit-nic.html',
                windowClass: 'nic-edit-modal',
                controller: 'nicEditController',
                backdrop: false,
                resolve: {
                    selectedNics: function () {
                        return selectedNics;
                    },
                    potentials: function () {
                        return vpgService.getRecoveryComputeResourcesBulk(getTargetHostBaseIdentifiers(selectedNics));
                    }
                }
            });
            return nicEditFactory.deferred.promise;
        };

        function getTargetHostBaseIdentifiers(nics) {
            var targetHostsIdentifiers = [];
            _.forEach(nics, function (nic) {
                targetHostsIdentifiers.push(networksService.getTargetHostBaseComputeResourceIdentifier(nic.vmId));
            });

            return targetHostsIdentifiers;
        }

        nicEditFactory.save = function (value) {
            nicEditFactory.deferred.resolve(value);
            nicEditFactory.modalInstance.close();
        };

        nicEditFactory.close = function () {
            nicEditFactory.deferred.reject(null);
            nicEditFactory.modalInstance.dismiss();
        };

        return nicEditFactory;
    });
