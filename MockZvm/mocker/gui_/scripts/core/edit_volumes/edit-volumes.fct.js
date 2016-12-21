'use strict';

angular.module('zvmApp.core')
    .factory('editVolumesFactory', function ($uibModal, $q, vos, zertoServiceFactory, dataCollectionFactory, enums,
                                             vpgService) {
        var editVolumesFactory = {},
            isScvmm = vpgService.isScvmm();

        editVolumesFactory._modalInstance = null;
        editVolumesFactory.deferred = null;

        editVolumesFactory.openWindow = function (potentials, volumes) {
            editVolumesFactory.deferred = $q.defer();

            var sharedVolumePotentials = editVolumesFactory._createSharedVolumePotentials(potentials, volumes.length > 1,
                vpgService.isReverse());
            var sharedVolumeProperties = editVolumesFactory._createSharedVolumeProperties(volumes);

            editVolumesFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_volumes/edit-volumes.html',
                windowClass: 'edit-volumes',
                controller: 'editVolumesController',
                backdrop: 'static',
                resolve: {
                    sharedVolumePotentials: function () {
                        return sharedVolumePotentials;
                    },
                    sharedVolumeProperties: function () {
                        return sharedVolumeProperties;
                    }
                }
            });

            return editVolumesFactory.deferred.promise;
        };

        editVolumesFactory.save = function (value) {
            editVolumesFactory.deferred.resolve(value);
        };

        editVolumesFactory.getVolumesConfiguration = function (protectionGroupIdentifier, inputParams, vpgConfiguration) {
            return zertoServiceFactory.GetInfoForEditingMultipleVolumesConfigurations(protectionGroupIdentifier, inputParams, vpgConfiguration);
        };

        editVolumesFactory.getVolumesConfigurationReverse = function (protectionGroupIdentifier, inputParams, vpgConfiguration) {
            return zertoServiceFactory.GetInfoForEditingReverseConfigForMultipleVolumes(protectionGroupIdentifier, inputParams, vpgConfiguration);
        };

        editVolumesFactory.getVolumeConfiguration = function (optionalProtectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration) {
            return zertoServiceFactory.GetInfoForEditingSingleVolumeConfiguration(optionalProtectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration);
        };

        editVolumesFactory.getVolumeConfigurationReverse = function (optionalProtectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration) {
            return zertoServiceFactory.GetInfoForEditingReverseConfigForSingleVolume(optionalProtectionGroupIdentifier, vmIdentifier, diskLocationParams, virtualMachineSelectedTargetComputeResource, virtualMachineSelectedDatastore, vpgConfiguration);
        };

        editVolumesFactory._createSharedVolumePotentials = function (potentials, isBulk, isReverse) {

            potentials.replicationDestinationTypes = _.clone(dataCollectionFactory.REPLICATION_DESTINATION_TYPES);
            if (isScvmm) {
                potentials.replicationDestinationTypes = _.clone(dataCollectionFactory.SCVMM_REPLICATION_DESTINATION_TYPES);
            }
            if (isBulk) {
                //remove RDM, Existing and Pre-seeded disk option in case of bulk
                potentials.replicationDestinationTypes = isScvmm ? [dataCollectionFactory.SCVMM_REPLICATION_TYPE.STORAGE] : [dataCollectionFactory.REPLICATION_TYPE.DATASTORE];
            }

            if (!isReverse && !isScvmm) {
                //remove existing disk file option in case of not reverse rep
                potentials.replicationDestinationTypes.splice(1, 1);
            }

            return potentials;
        };

        editVolumesFactory._createSharedVolumeProperties = function (properties) {
            if (!properties || properties.length === 0) {
                return;
            }
            //running on other props except first one
            _.each(_.rest(properties), function (item) {
                var tempThin;
                //running on each property of first one and compare them to others
                _.each(properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, function (obj, key) {

                    if (!!obj && !!item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key]) {

                        tempThin = obj.IsThin === item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key].IsThin ? obj.IsThin : undefined;
                        //in case that rep destination is not equal to its next sibling
                        //we create blank one to keep indication of what kind of dest replication is shared despite its  differences in properties
                        if (key === 'Datastore') {
                            if (!_.isEqual(obj.TargetDatastore, item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key].TargetDatastore)) {
                                properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key] = editVolumesFactory.helpers.newDatastore();
                            }
                            properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key].IsThin = tempThin;
                        }
                        if (key === 'StoragePod') {
                            if (!_.isEqual(obj.StoragePod, item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key].StoragePod)) {
                                properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key] = editVolumesFactory.helpers.newStoragePod();
                            }
                            properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key].IsThin = tempThin;
                        }
                        if (key === 'ExistingDisk' && !_.isEqual(obj, item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key])) {
                            properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key] = editVolumesFactory.helpers.newExistingDisk();
                        }
                        if (key === 'RawDevice' && !_.isEqual(obj, item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key])) {
                            properties[0].InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key] = editVolumesFactory.helpers.newRawDevice();
                        }
                    }
                    //in case of sibling is undefined , we turn shared dest replication to undefined as well
                    if (!!obj && !item.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination[key]) {
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

        editVolumesFactory.closeWindow = function (value) {
            editVolumesFactory._modalInstance.dismiss(value);
            editVolumesFactory.deferred.reject(value);
        };

        editVolumesFactory.helpers = {
            newReplicationDestination: function () {
                return new vos.VolumeReplicationDestination();
            },
            newDatastore: function () {
                var ds = new vos.DatastoreVolumeReplicationDestination();
                ds.TargetDatastore = new vos.DatastoreIdentifier();
                ds.TargetDatastore.ServerIdentifier = new vos.ServerIdentifier();
                return ds;
            },
            newStoragePod: function () {
                var sPod = new vos.StoragePodVolumeReplicationDestination();
                sPod.StoragePod = new vos.StoragePodIdentifier();
                sPod.StoragePod.ServerIdentifier = new vos.ServerIdentifier();
                return sPod;
            },
            newExistingDisk: function () {
                var ex = new vos.ExistingDiskVolumeReplicationDestination();
                ex.SpecificDisk = new vos.SpecificDisk();
                ex.SpecificDisk.Datastore = new vos.DatastoreIdentifier();
                ex.SpecificDisk.Datastore.ServerIdentifier = new vos.ServerIdentifier();
                ex.VMIdentifier = new vos.VMIdentifier();
                ex.VMIdentifier.ServerIdentifier = new vos.ServerIdentifier();

                return ex;
            },
            newRawDevice: function () {
                var fl = new vos.RawDeviceMappingVolumeReplicationDestination();
                fl.Device = new vos.DeviceIdentifier();
                fl.Device.ServerIdentifier = new vos.ServerIdentifier();
                fl.Mode = enums.VolumeMode.Flat;
                return fl;
            }
        };

        return editVolumesFactory;
    });
