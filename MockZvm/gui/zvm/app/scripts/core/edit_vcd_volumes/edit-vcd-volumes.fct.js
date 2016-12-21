'use strict';

angular.module('zvmApp.core')
    .factory('editVCDVolumesFactory', function ($q, $uibModal, vos, zertoServiceFactory, dataCollectionFactory, vpgService) {
        var editVCDVolumesFactory = {};

        editVCDVolumesFactory._modalInstance = null;
        editVCDVolumesFactory.deferred = null;

        editVCDVolumesFactory.openWindow = function (thinState, volumes) {
            editVCDVolumesFactory.deferred = $q.defer();
            var sharedVolumePotentials = editVCDVolumesFactory._createSharedVolumePotentials(thinState, volumes.length > 1,
                vpgService.isReverse());
            var sharedVolumeProperties = editVCDVolumesFactory._createSharedVolumeProperties(volumes);

            editVCDVolumesFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_vcd_volumes/edit-vcd-volumes.html',
                windowClass: 'edit-volumes',
                controller: 'editVCDVolumesController',
                backdrop: 'static',
                resolve: {
                    sharedVolumeProperties: function () {
                        return sharedVolumeProperties;
                    },
                    sharedVolumePotentials: function () {
                        return sharedVolumePotentials;
                    }
                }
            });

            return editVCDVolumesFactory.deferred.promise;
        };

        editVCDVolumesFactory.closeWindow = function (value) {
            editVCDVolumesFactory._modalInstance.dismiss(value);
            editVCDVolumesFactory.deferred.reject(value);
        };

        editVCDVolumesFactory.save = function (value) {
            editVCDVolumesFactory.deferred.resolve(value);
        };

        editVCDVolumesFactory.helpers = {
            newReplicationDestination: function () {
                return new vos.VolumeReplicationDestination();
            },
            newVCDDatastore: function () {
                return new vos.VCDDatastoreVolumeReplicationDestination();
            },
            newExistingDisk: function () {
                var ex = new vos.ExistingDiskVolumeReplicationDestination();
                ex.SpecificDisk = new vos.SpecificDisk();
                ex.SpecificDisk.Datastore = new vos.DatastoreIdentifier();
                ex.SpecificDisk.Datastore.ServerIdentifier = new vos.ServerIdentifier();
                ex.VMIdentifier = new vos.VMIdentifier();
                ex.VMIdentifier.ServerIdentifier = new vos.ServerIdentifier();

                return ex;
            }
        };

        editVCDVolumesFactory._createSharedVolumeProperties = function (properties) {
            if (!properties || properties.length === 0) {
                return;
            }
            //running on other props except first one
            _.each(_.rest(properties), function (item) {
                var tempThin;
                //running on each property of first one and compare them to others
                _.each(properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, function (obj, key) {

                    if (obj && angular.isDefined(obj) && angular.isDefined(item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key])) {

                        tempThin = obj.IsThin === item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key].IsThin ? obj.IsThin : undefined;
                        //in case that rep destination is not equal to its next sibling
                        //we create blank one to keep indication of what kind of dest replication is shared despite its  differences in properties
                        if (key === 'VCDDatastore') {
                            //vcdDatastore is always new
                            properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key] = editVCDVolumesFactory.helpers.newVCDDatastore();
                            properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key].IsThin = tempThin;
                        }
                        if (key === 'ExistingDisk' && !_.isEqual(obj, item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key])) {
                            properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key] = editVCDVolumesFactory.helpers.newExistingDisk();
                        }

                    }
                    //in case of sibling is undefined , we turn shared dest replication to undefined as well
                    if (angular.isDefined(obj) && angular.isUndefined(item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key])) {
                        properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key] = undefined;
                    }
                    //in case of both undefined or shared dest replication undefined
                    //we dont need to change it
                });
                if (properties[0].Swap !== item.Swap) {
                    properties[0].Swap = properties[0].InternalVolumeManagementSettings.Settings.IsSwap = undefined;
                }
            });

            return properties[0];

        };

        editVCDVolumesFactory._createSharedVolumePotentials = function (thinState, isBulk, isReverse) {

            var sharedPotentials = {};

            sharedPotentials.replicationDestinationTypes = _.clone(dataCollectionFactory.VCD_REPLICATION_DESTINATION_TYPES);
            sharedPotentials.IsThinSelectionEnabled = thinState;

            if (isBulk) {
                //remove RDM, Existing and Pre-seeded disk option in case of bulk
                sharedPotentials.replicationDestinationTypes = [dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE];
            }

            return sharedPotentials;
        };

        editVCDVolumesFactory.getThinProvisionSupport = function (optionalProtectionGroupIdentifier, targetOrgVdc, ownersIdentifier) {
            return zertoServiceFactory.IsThinSupprotedForVcd(optionalProtectionGroupIdentifier, targetOrgVdc, ownersIdentifier);
        };

        editVCDVolumesFactory.getThinProvisionSupportReverse = function (optionalProtectionGroupIdentifier, targetOrgVdc, ownersIdentifier) {
            return zertoServiceFactory.IsThinSupprotedForVcdForReverseConfig(optionalProtectionGroupIdentifier, targetOrgVdc, ownersIdentifier);
        };
        return editVCDVolumesFactory;
    });
