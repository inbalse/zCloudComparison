'use strict';

angular.module('zvmApp.core')
    .factory('editVcdVmFactory', function ($uibModal, zertoServiceFactory, $q) {
        var editVcdVmFactory = {};

        editVcdVmFactory._modalInstance = null;
        editVcdVmFactory.deferred = null;

        editVcdVmFactory.openWindow = function (items) {
            editVcdVmFactory.deferred = $q.defer();

            var neutralVm = editVcdVmFactory._createNeutralObject(items);

            editVcdVmFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_vcd_vm/edit-vcd-vm.html',
                windowClass: 'edit-vcd-vm',
                controller: 'editVcdVmController',
                backdrop: 'static',
                resolve: {
                    vm: function () {
                        return neutralVm;
                    },
                    selectedVmsCount: function(){
                        return items.length;
                    }
                }
            });

            return editVcdVmFactory.deferred.promise;
        };

        editVcdVmFactory.save = function (value) {
            editVcdVmFactory.deferred.resolve(value);
        };

        editVcdVmFactory.closeWindow = function (value) {
            editVcdVmFactory._modalInstance.dismiss(value);
            editVcdVmFactory.deferred.reject(value);
        };

        editVcdVmFactory._createNeutralObject = function (coll) {
            if (!coll || coll.length === 0) {
                return;
            }
            //running on other props except first one
            var patientZero = angular.copy(coll[0]);

            _.each(_.rest(coll), function (item) {
                if (patientZero.StorageProfile && item.StorageProfile && !_.isEqual(patientZero.StorageProfile.VCDStorageProfile, item.StorageProfile.VCDStorageProfile)) {
                    patientZero.StorageProfile.VCDStorageProfile = null;
                }

                if (!_.isEqual(patientZero.JournalWarningThreshold, item.JournalWarningThreshold)) {
                    patientZero.JournalWarningThreshold = {Type: 0, Limit: 0};
                }

                if (!_.isEqual(patientZero.JournalHardLimit, item.JournalHardLimit)) {
                    patientZero.JournalHardLimit = {Type: 0, Limit: 0};
                }
            });

            return patientZero;
        };

        return editVcdVmFactory;
    });
