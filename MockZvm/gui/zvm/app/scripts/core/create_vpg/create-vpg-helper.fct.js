'use strict';

angular.module('zvmApp.core')
    .factory('createVPGHelperFactory', function (enums) {
        var createVPGHelperFactory = {}, foundByResourcePool;

        createVPGHelperFactory.findTargetHost = function (targetHost, defaultVpgSettings) {
            if (targetHost && defaultVpgSettings && defaultVpgSettings.TargetSiteInfo && defaultVpgSettings.TargetSiteInfo.PotentialReplicationDestinations) {
                var found = _.find(defaultVpgSettings.TargetSiteInfo.PotentialReplicationDestinations,
                    function (host) {
                        return _.isEqual(targetHost.BaseComputeResourceIdentifier, host.ComputeResource.BaseComputeResourceIdentifier) &&
                            _.isEqual(targetHost.ResourcePoolIdentifier, host.ComputeResource.ResourcePoolIdentifier);
                    });
                if (found) {
                    return found;
                } else {
                    if (targetHost.ResourcePoolIdentifier) {
                         foundByResourcePool = _.find(defaultVpgSettings.TargetSiteInfo.PotentialReplicationDestinations,
                            function (host) {
                                return host.ComputeResource.ResourcePoolIdentifier &&
                                    _.isEqual(targetHost.ResourcePoolIdentifier.InternalName, host.ComputeResource.ResourcePoolIdentifier.InternalName) &&
                                    _.isEqual(targetHost.ResourcePoolIdentifier.ServerIdentifier, host.ComputeResource.ResourcePoolIdentifier.ServerIdentifier);
                            });

                        return foundByResourcePool;
                    }
                }
            }
        };

        createVPGHelperFactory.validateLimits = function (hardLimit, softLimit, totalVolumeGB) {
            if (hardLimit.Type === enums.JournalLimitType.Unlimited && softLimit.Type === enums.JournalLimitType.Unlimited) {
                return true;
            }

            if (hardLimit.Type === softLimit.Type) {
                return softLimit.Limit < hardLimit.Limit;
            }

            if(softLimit.Type === enums.JournalLimitType.Unlimited && hardLimit.Type !== enums.JournalLimitType.Unlimited){
                return false;
            }
            return !!(totalVolumeGB > 0 && createVPGHelperFactory.limitInGB(softLimit, totalVolumeGB) < createVPGHelperFactory.limitInGB(hardLimit, totalVolumeGB));

        };

        createVPGHelperFactory.limitInGB = function (limit, totalVolumes) {
            if (limit.Type === enums.JournalLimitType.Megabytes) {
                return limit.Limit;
            }

            if(limit.Type === enums.JournalLimitType.Unlimited){
                return Number.MAX_VALUE + 9.979202e291;
            }

            return (limit.Limit / 100) * totalVolumes;
        };

        createVPGHelperFactory.calculateTotalVolumesInGB = function (vms) {
            var totalSize = 0;
            _.forEach(vms, function (vm) {
                _.forEach(vm.Volumes, function (volume) {
                    totalSize += volume.ProvisionedSizeInMB;
                });
            });
            return totalSize / 1024;
        };

        createVPGHelperFactory.datastoreIsWithinHost = function (selectedDs, coll) {
            return _.find(coll, function (item) {
                return createVPGHelperFactory.compareDatastoreObjects(selectedDs, item);
            });
        };


        createVPGHelperFactory.compareDatastoreObjects = function (orig, potential) {
            if (orig.Id)//datastore
            {
                if (potential.Datastore.Id) {
                    return orig.Id.ServerIdentifier.ServerGuid === potential.Datastore.Id.ServerIdentifier.ServerGuid &&
                        orig.Id.InternalDatastoreName === potential.Datastore.Id.InternalDatastoreName;
                }
            } else if (orig.DatastoreClusterIdentifier) {//datastore cluster
                if (potential.Datastore.DatastoreClusterIdentifier) {
                    return createVPGHelperFactory._compareStoragePodsIDs(orig.DatastoreClusterIdentifier, potential.Datastore.DatastoreClusterIdentifier);
                }
            }

            return false;
        };

        createVPGHelperFactory._compareStoragePodsIDs = function (value1, value2) {
            return value1.ServerIdentifier.ServerGuid === value2.ServerIdentifier.ServerGuid && value1.InternalName === value2.InternalName;
        };

        createVPGHelperFactory.folderIsWithinHost = function (selected, coll) {
            return _.find(coll, function (item) {
                return item.Id.InternalFolderName === selected.Id.InternalFolderName && item.Id.ServerIdentifier.ServerGuid === selected.Id.ServerIdentifier.ServerGuid;
            });
        };


        createVPGHelperFactory.hostIsWithinTheCluster = function (selected, coll) {
            return !!_.find(coll, function (item) {
                return item.InternalName === selected.BaseComputeResourceIdentifier.InternalName && item.ServerIdentifier.ServerGuid === selected.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid;
            });
        };

        createVPGHelperFactory.networkIsWithinHost = function (selected, coll) {
            return _.find(coll, function (item) {
                return item.Id.InternalName === selected.InternalName && item.Id.ServerIdentifier.ServerGuid === selected.ServerIdentifier.ServerGuid;
            });
        };

        createVPGHelperFactory.volumeReplicationDestinationWithinHost = function (value, coll, rawColl) {
            if (value.RawDevice && rawColl) {
                if (!!_.find(rawColl, function (rawItem) {
                        return value.RawDevice.Device.ServerIdentifier.ServerGuid === rawItem.Destination.Device.ServerIdentifier.ServerGuid &&
                            value.RawDevice.DeviceName === rawItem.Destination.DeviceName && value.RawDevice.DevicePath === rawItem.Destination.DevicePath;
                    })) {
                    return true;
                }
            }

            return _.find(coll, function (item) {
                if (value.Datastore) {
                    if (createVPGHelperFactory.compareDatastoreReplicationDesinationWithPotentialDS(value, item)) {
                        return true;
                    }
                } else if (value.ExistingDisk && item.Datastore.Id) {
                    if (value.ExistingDisk.SpecificDisk.Datastore.ServerIdentifier.ServerGuid === item.Datastore.Id.ServerIdentifier.ServerGuid &&
                        value.ExistingDisk.SpecificDisk.Datastore.InternalDatastoreName === item.Datastore.Id.InternalDatastoreName) {
                        return true;
                    }
                } else if (value.StoragePod && item.Datastore.DatastoreClusterIdentifier) {
                    if (createVPGHelperFactory._compareStoragePodsIDs(value.StoragePod.StoragePod, item.Datastore.DatastoreClusterIdentifier)) {
                        return true;
                    }
                }
            });
        };


        createVPGHelperFactory.compareDatastoreReplicationDesinationWithPotentialDS = function (orig, potential) {
            if (potential.Datastore) {
                if (orig.Datastore && potential.Datastore.Id) {
                    if (orig.Datastore.TargetDatastore.InternalDatastoreName === potential.Datastore.Id.InternalDatastoreName &&
                        orig.Datastore.TargetDatastore.ServerIdentifier.ServerGuid === potential.Datastore.Id.ServerIdentifier.ServerGuid) {
                        return true;
                    }
                } else if (orig.StoragePod && potential.Datastore.DatastoreClusterIdentifier) {
                    if (createVPGHelperFactory._compareStoragePodsIDs(orig.StoragePod.StoragePod, potential.Datastore.DatastoreClusterIdentifier)) {
                        return true;
                    }
                }
            }

            return false;
        };

        return createVPGHelperFactory;
    });
