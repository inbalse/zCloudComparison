'use strict';

angular.module('zvmApp.core')
    .factory('nicVCDEditFactory', function ($uibModal, $q) {
        var nicVCDEditFactory = {};

        nicVCDEditFactory.deferred = null;

        nicVCDEditFactory.open = function (selectedNics) {

            nicVCDEditFactory.deferred = $q.defer();

            nicVCDEditFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_vcd_nics/edit-vcd-nic.html',
                windowClass: 'nic-vcd-edit-modal',
                controller: 'nicVCDEditController',
                backdrop: false,
                resolve: {
                    selectedNics: function(){
                        return selectedNics;
                    }
                }
            });
            return nicVCDEditFactory.deferred.promise;
        };

        nicVCDEditFactory.save = function (value) {
            nicVCDEditFactory.deferred.resolve(value);
            nicVCDEditFactory.modalInstance.close();
        };

        nicVCDEditFactory.close = function () {
            nicVCDEditFactory.deferred.reject(null);
            nicVCDEditFactory.modalInstance.dismiss();
        };

        return nicVCDEditFactory;
    });
