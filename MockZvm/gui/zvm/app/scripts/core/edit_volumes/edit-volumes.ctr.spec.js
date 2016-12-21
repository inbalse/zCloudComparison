'use strict';

describe('editVolumesController', function () {
    var controller, scope, editVolumesFactory, sharedVolumePotentials, sharedVolumeProperties, deferred, dataCollectionFactory, vos, enums, zAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('createVPGModel', {data: {}});
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, _editVolumesFactory_, _dataCollectionFactory_, _vos_, _zAlertFactory_, _enums_) {
        vos = _vos_;
        enums = _enums_;
        scope = $rootScope.$new();
        editVolumesFactory = _editVolumesFactory_;
        dataCollectionFactory = _dataCollectionFactory_;
        editVolumesFactory.save = function () {
            deferred = $q.defer();
            return deferred.promise;
        };
        editVolumesFactory.closeWindow = function () {
            deferred = $q.defer();
            return deferred.promise;
        };

        zAlertFactory = _zAlertFactory_;

        sharedVolumePotentials = JSON.parse('{"PotentialDatastores":[{"Datastore":{"Id":{"InternalDatastoreName":"datastore-15","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"datastore1 (1) (417MB / 0.50GB Free)"},"IsEnabled":true},{"Datastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore (132GB / 149GB Free)"},"IsEnabled":true}],"OptionalExistingDisk":null,"PotentialRawDevices":[],"IsThinSelectionEnabled":true,"replicationDestinationTypes":[{"label":"No, Use Datastore","value":0},{"label":"No, Create Disk","value":2},{"label":"Yes, vmdk file","value":3}]}');

        sharedVolumeProperties = JSON.parse('{"SourceAddress":"[ZNest83Datastore]:vse-NoamNetworkIso (630c2e3b-d356-4d43-ba84-56b49f5cfa03)-0/vse-NoamNetworkIso (630c2e3b-d356-4d43-ba84-56b49f5cfa03)-0.vmdk","TargetAddress":"ZNest83Datastore (132GB / 149GB Free)","Swap":false,"ProvisionedSizeInMB":448,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"42 2c 0a 64 1d 15 90 88-b8 a1 86 1d a8 7f 1f fa","InstanceUuid":"50 2c 58 8f 2b 20 9d 6e-05 22 50 42 ec ee dc cc"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)"},"Settings":{"VolumeReplicationDestination":{"Datastore":{"IsThin":false,"TargetDatastore":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}}}}}},"IsSourceThinProvisioned":false}');

        controller = $controller('editVolumesController', {
            $scope: scope,
            sharedVolumePotentials: sharedVolumePotentials,
            sharedVolumeProperties: sharedVolumeProperties,
            editVolumesFactory: editVolumesFactory,
            zAlertFactory: _zAlertFactory_
        });

    }));

    it('should have variables defined', function () {
        expect(scope.form).toBeDefined();
        expect(scope.loading).toBeDefined();
        expect(scope.sharedVolumePotentials).toBeDefined();
        expect(scope.sharedVolumeProperties).toBeDefined();
        expect(scope.volumeConfiguration).toBeDefined();
        expect(scope.dataCollectionFactory).toBeDefined();
    });

    it('should have functions defined', function () {
        expect(scope.handleSaveClick).toBeDefined();
        expect(scope.handleCancelClick).toBeDefined();
        expect(scope.close).toBeDefined();
        expect(scope.onReplicationDestinationChange).toBeDefined();
        expect(scope.onDatastoreChange).toBeDefined();
        expect(scope.onRawDeviceChange).toBeDefined();
        expect(scope.onThinProvisionChange).toBeDefined();
        expect(scope._findDatastore).toBeDefined();
        expect(scope._findRawDevice).toBeDefined();
        expect(scope._findDatastoreWithDisk).toBeDefined();
        expect(scope._init).toBeDefined();
        expect(scope.processTranslations).toBeDefined();
        expect(scope.browse).toBeDefined();
        expect(scope.onFileBrowseSave).toBeDefined();
    });

    it('should check for proper logic when handleSaveClick occured', function () {
        spyOn(editVolumesFactory, 'save').and.callThrough();
        spyOn(scope, 'close').and.callThrough();

        scope.handleSaveClick();

        expect(editVolumesFactory.save).toHaveBeenCalledWith({
            SourceAddress: '[ZNest83Datastore]:vse-NoamNetworkIso (630c2e3b-d356-4d43-ba84-56b49f5cfa03)-0/vse-NoamNetworkIso (630c2e3b-d356-4d43-ba84-56b49f5cfa03)-0.vmdk',
            TargetAddress: 'ZNest83Datastore (132GB / 149GB Free)',
            Swap: false,
            ProvisionedSizeInMB: 448,
            InternalVolumeManagementSettings: {
                DiskLocationParams: {
                    VMUuids: {
                        Uuid: '42 2c 0a 64 1d 15 90 88-b8 a1 86 1d a8 7f 1f fa',
                        InstanceUuid: '50 2c 58 8f 2b 20 9d 6e-05 22 50 42 ec ee dc cc'
                    }, UnitNumber: 0, ControllerNumber: 0, VolumeType: 0, DlpDescription: 'Scsi(0:0)'
                },
                Settings: {
                    VolumeReplicationDestination: {
                        Datastore: {
                            IsThin: false,
                            TargetDatastore: {
                                InternalDatastoreName: 'datastore-16',
                                ServerIdentifier: {ServerGuid: '598e5def-3500-4409-a691-d25b5cd10d22'}
                            }
                        }
                    }
                }
            },
            IsSourceThinProvisioned: false
        });

        expect(scope.close).toHaveBeenCalled();
    });

    it('should change destination properly', function () {
        scope.volumeConfiguration.datastore = JSON.parse('{"Datastore":{"Id":{"InternalDatastoreName":"datastore-12","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81Datastore (88.3GB / 99.8GB Free)"},"IsEnabled":true}');
        scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.DATASTORE;
        scope.onReplicationDestinationChange();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore).toBeDefined();

        scope.sharedVolumePotentials.OptionalExistingDisk = {ReplicationDestination: 'dest', DisplayName: 'name'};
        scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.EXISTING;
        scope.onReplicationDestinationChange();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk).toBeDefined();

        scope.volumeConfiguration.raw_device = {Destination: {}, DisplayName: 'test'};
        scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.NEW_DISK;
        scope.onReplicationDestinationChange();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.RawDevice).toBeDefined();


        scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.PRESEED;
        scope.onReplicationDestinationChange();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk).toBeDefined();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk.SpecificDisk).toBeDefined();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk.SpecificDisk.HypervisorType).toEqual(enums.HypervisorType.VCenter);
    });
    it('should properly change datastore', function () {
        scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.DATASTORE;
        scope.volumeConfiguration.thin = false;

        var value = JSON.parse('{"Datastore":{"Id":{"InternalDatastoreName":"datastore-12","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81Datastore (88.3GB / 99.8GB Free)"},"IsEnabled":true}');
        scope.onDatastoreChange(value);

        expect(scope.sharedVolumeProperties.TargetAddress).toEqual('ZNest81Datastore (88.3GB / 99.8GB Free)');
        expect(angular.equals(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination, {
            Datastore: {
                IsThin: false,
                TargetDatastore: {
                    InternalDatastoreName: 'datastore-12',
                    ServerIdentifier: {ServerGuid: '09d0d3b4-78d0-47c1-ad38-d01887e6d589'}
                }
            }
        })).toBeTruthy();
    });

    it('should call to zAlert when thin provisioning was true', function () {
        scope.volumeConfiguration.thin = scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore = true;
        scope.initialThin = scope.sharedVolumeProperties.IsSourceThinProvisioned = true;
        scope.translations = {'EDIT_VOLUMES.WARNING_TITLE': 'test', 'EDIT_VOLUMES.WARNING_DESCRIPTION': 'test1'};
        scope.onThinProvisionChange();

        expect(scope.isShowThinWarning).toBeTruthy();
    });
    it('should not call to zAlert when thin provisioning was false', function () {
        scope.initialThin = false;
        scope.onThinProvisionChange();
        expect(scope.isShowThinWarning).toBeFalsy();
    });

    it('should find datastore within collection by given target', function () {
        var source = JSON.parse('[{"Datastore":{"Id":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"[ds_cluster]datastore1 (345MB / 0.50GB Free)"},"IsEnabled":true},{"Datastore":{"Id":{"InternalDatastoreName":"datastore-12","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81Datastore (88.3GB / 99.8GB Free)"},"IsEnabled":true},{"Datastore":{"Id":{"InternalDatastoreName":"datastore-224","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"public (445GB / 799GB Free)"},"IsEnabled":true},{"Datastore":{"Id":null,"DatastoreClusterIdentifier":{"InternalName":"group-p219","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DisplayName":"ds_cluster"},"IsEnabled":true}]'),
            target = JSON.parse('{"Datastore":{"IsThin":false,"TargetDatastore":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}}}');

        var result = scope._findDatastore(source, target);

        expect(result).toEqual(source[0]);
    });

    it('should find find raw device within collection', function () {
        var source = JSON.parse('[{"Destination":{"Mode":"testMode1","Device":{"InternalDeviceName":"test1","ServerIdentifier":{"ServerGuid":"abc1"}}},"DisplayName":"MSFT iSCSI Disk 1","IsEnabled":false},{"Destination":{"Mode":"testMode1","Device":{"InternalDeviceName":"test2","ServerIdentifier":{"ServerGuid":"abc2"}}},"DisplayName":"MSFT iSCSI Disk 2","IsEnabled":false}]'),
            target = {
                RawDevice: {
                    "Mode": "testMode1",
                    "Device": {"InternalDeviceName": "test1", "ServerIdentifier": {"ServerGuid": "abc1"}}
                }
            };

        var result = scope._findRawDevice(source, target);
        expect(result.DisplayName).toEqual('MSFT iSCSI Disk 1');
    });

    it('should properly init data for existing disk with preseed path', function () {
        scope.sharedVolumePotentials = false;
        scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination = {ExistingDisk: {SpecificDisk: {VmdkPath: 'path'}}};
        scope._init();
        expect(scope.volumeConfiguration.replicationDestinationType).toEqual(dataCollectionFactory.REPLICATION_TYPE.PRESEED);
        expect(scope.volumeConfiguration.preSeedText).toEqual('path');
    });
    it('should properly init data for datastore', function () {
        scope.sharedVolumePotentials = false;
        scope.sharedVolumeProperties.IsSourceThinProvisioned = true;
        var ref = scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings;
        ref.VolumeReplicationDestination = {Datastore: {IsThin: true}};
        scope._init();
        expect(scope.volumeConfiguration.replicationDestinationType).toEqual(dataCollectionFactory.REPLICATION_TYPE.DATASTORE);
        expect(scope.initialThin).toBeTruthy();
    });
    it('should properly init data for storagepod', function () {
        scope.sharedVolumePotentials = false;
        var ref = scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings;
        ref.VolumeReplicationDestination = {StoragePod: {IsThin: true}};
        scope._init();
        expect(scope.volumeConfiguration.replicationDestinationType).toEqual(dataCollectionFactory.SCVMM_REPLICATION_TYPE.STORAGE);
        expect(scope.initialThin).toBeFalsy();
    });
    it('should properly init data for rdm', function () {
        var ref = scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings;
        ref.VolumeReplicationDestination = {ExistingDisk: {VMIdentifier: {InternalVmName: 'test'}}};
        scope._init();
        expect(scope.volumeConfiguration.replicationDestinationType).toEqual(dataCollectionFactory.REPLICATION_TYPE.EXISTING);
        expect(scope.volumeConfiguration.existing).toEqual('test');
    });
    it('should properly init data for rawdevice', function () {
        scope.sharedVolumePotentials = false;
        var ref = scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings;
        ref.VolumeReplicationDestination = {RawDevice: {}};
        scope._init();
        expect(scope.volumeConfiguration.replicationDestinationType).toEqual(dataCollectionFactory.REPLICATION_TYPE.NEW_DISK);
    });

    it('should properly init data for preseed', function () {
        var dest = new vos.VolumeReplicationDestination();
        var ds = JSON.parse('[{"Datastore":{"Id":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"[ds_cluster]datastore1 (345MB / 0.50GB Free)"},"IsEnabled":true},{"Datastore":{"Id":{"InternalDatastoreName":"datastore-12","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81Datastore (88.3GB / 99.8GB Free)"},"IsEnabled":true},{"Datastore":{"Id":{"InternalDatastoreName":"datastore-224","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"public (445GB / 799GB Free)"},"IsEnabled":true},{"Datastore":{"Id":null,"DatastoreClusterIdentifier":{"InternalName":"group-p219","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DisplayName":"ds_cluster"},"IsEnabled":true}]');
        ds.Datastore = {};
        scope._initPreSeed(dest, ds);
        expect(dest.ExistingDisk).toBeDefined();
        expect(dest.ExistingDisk.SpecificDisk).toBeDefined();
        expect(dest.ExistingDisk.SpecificDisk.HypervisorType).toEqual(enums.HypervisorType.VCenter);

        scope.isScvmm = true;
        scope._initPreSeed(dest, ds);
        expect(dest.ExistingDisk.SpecificDisk.HypervisorType).toEqual(enums.HypervisorType.Scvmm);
    });

    it('should properly change values by watchers', function () {
        scope.$digest();
        scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore = {};
        scope.form = {editVolume: {$invalid: true}};
        scope.volumeConfiguration.thin = true;
        scope.volumeConfiguration.swap = true;
        scope.$digest();

        expect(scope.saveButton.disabled).toBeTruthy();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.Datastore.IsThin).toBeTruthy();
        expect(scope.sharedVolumeProperties.Swap).toBeTruthy();
    });
});
