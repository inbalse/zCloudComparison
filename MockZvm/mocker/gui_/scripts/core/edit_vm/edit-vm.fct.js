'use strict';

angular.module('zvmApp.core')
    .factory('editVmFactory', function ($uibModal, zertoServiceFactory, $q) {
        var editVmFactory = {};

        editVmFactory._modalInstance = null;
        editVmFactory.deferred = null;
        editVmFactory.isReverse = null;

        editVmFactory.openWindow = function (vms, isReverse) {
            editVmFactory.deferred = $q.defer();
            editVmFactory.isReverse = isReverse;
            var neutralVm = editVmFactory._createNeutralObject(vms);

            editVmFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_vm/edit-vm.html',
                windowClass: 'edit-vm',
                controller: 'editVmController',
                backdrop: 'static',
                resolve: {
                    vm: function () {
                        return neutralVm;
                    },
                    selectedVms: function () {
                        return vms;
                    }
                }
            });

            return editVmFactory.deferred.promise;
        };

        editVmFactory.save = function (value) {
            editVmFactory.deferred.resolve(value);
            editVmFactory._modalInstance.dismiss('close');
            editVmFactory.clear();
        };

        editVmFactory.getPotentialJournalDatastores = function (VPGId, VPGConfig) {
            if (editVmFactory.isReverse) {
                return zertoServiceFactory.GetPotentialDatastoresForJournalForReverseConfig(VPGId, VPGConfig);
            } else {
                return zertoServiceFactory.GetPotentialDatastoresForJournal(VPGId, VPGConfig);
            }
        };

        editVmFactory.closeWindow = function () {
            editVmFactory.deferred.reject();
            editVmFactory._modalInstance.dismiss('close');
            editVmFactory.clear();
        };

        editVmFactory._createNeutralObject = function (coll) {
            if (!coll || coll.length === 0) {
                return;
            }
            //running on other props except first one
            var patientZero = angular.copy(coll[0]);

            _.forEach(_.rest(coll), function (item) {
                if (!isTargetHostEqual(patientZero.TargetHost, item.TargetHost)) {
                    patientZero.TargetHost = null;
                }

                if (!isDatastoreEqual(patientZero.TargetDatastore, item.TargetDatastore)) {
                    patientZero.TargetDatastore = null;
                }

                if (!isDatastoreEqual(patientZero.JournalDatastores[0], item.JournalDatastores[0])) {
                    patientZero.JournalDatastores = [];
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

        editVmFactory.clear = function () {
            editVmFactory._modalInstance = null;
            editVmFactory.deferred = null;
        };

        function isTargetHostEqual(hostA, hostB) {
            var result = true,
                baseComputerResourceIdentifier = 'BaseComputeResourceIdentifier',
                resourcePoolPath = 'ResourcePoolIdentifier';

            if (!_.isEqual(_.get(hostA, resourcePoolPath, null), _.get(hostB, resourcePoolPath, null))) {
                result = false;
            }

            if (!_.isEqual(_.get(hostA, baseComputerResourceIdentifier, null),
                    _.get(hostB, baseComputerResourceIdentifier, null))) {
                result = false;
            }

            return result;
        }

        function isDatastoreEqual(datastoreA, datastoreB) {
            if (!_.isEmpty(datastoreA.Id) && !_.isEmpty(datastoreB.Id)) {
                return _.isEqual(datastoreA.Id.ServerIdentifier.ServerGuid, datastoreB.Id.ServerIdentifier.ServerGuid) &&
                    _.isEqual(datastoreA.Id.InternalDatastoreName, datastoreB.Id.InternalDatastoreName);
            }

            if (!_.isEmpty(datastoreA.DatastoreClusterIdentifier) && !_.isEmpty(datastoreB.DatastoreClusterIdentifier)) {
                return _.isEqual(datastoreA.DatastoreClusterIdentifier.ServerIdentifier.ServerGuid,
                        datastoreB.DatastoreClusterIdentifier.ServerIdentifier.ServerGuid) &&
                    _.isEqual(datastoreA.DatastoreClusterIdentifier.InternalName,
                        datastoreB.DatastoreClusterIdentifier.InternalName);
            }
        }

        return editVmFactory;
    });
