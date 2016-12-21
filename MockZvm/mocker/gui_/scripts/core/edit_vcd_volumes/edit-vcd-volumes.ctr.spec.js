'use strict';

describe('editVCDVolumesController', function () {

    var controller, scope, editVCDVolumesFactory, sharedVolumePotentials, sharedVolumeProperties, deferred, dataCollectionFactory, vos, zAlertFactory;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, $q, _editVCDVolumesFactory_, _dataCollectionFactory_, _vos_, _zAlertFactory_) {
        vos = _vos_;
        scope = $rootScope.$new();
        dataCollectionFactory = _dataCollectionFactory_;
        editVCDVolumesFactory = _editVCDVolumesFactory_;
        editVCDVolumesFactory.save = function () {
            deferred = $q.defer();
            return deferred.promise;
        };
        editVCDVolumesFactory.closeWindow = function () {
            deferred = $q.defer();
            return deferred.promise;
        };

        zAlertFactory = _zAlertFactory_;

        sharedVolumePotentials = JSON.parse('{"replicationDestinationTypes":[{"label":"Yes, vmdk file","value":4},{"label":"Yes, vmdk file","value":3}],"IsThinSelectionEnabled":true}');

        sharedVolumeProperties = JSON.parse('{"SourceAddress":"[ZNest83Datastore]:NoamVcdVappVm41 (b4a584ea-084d-4230-8e71-8a9610170fed)/NoamVcdVappVm41 (b4a584ea-084d-4230-8e71-8a9610170fed).vmdk","TargetAddress":null,"Swap":false,"ProvisionedSizeInMB":8,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"42 2c e2 36 e4 69 a2 86-36 f2 08 9e 75 f2 68 c2","InstanceUuid":"50 2c 89 73 88 a4 17 25-4f 68 c0 f9 b2 06 80 17"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"VCDDatastore":{"IsThin":true}}}},"IsSourceThinProvisioned":true}');

        controller = $controller('editVCDVolumesController', {$scope: scope, sharedVolumePotentials: sharedVolumePotentials, sharedVolumeProperties: sharedVolumeProperties, editVCDVolumesFactory: editVCDVolumesFactory, zAlertFactory: _zAlertFactory_, isScvmm: false });

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
        expect(scope.onThinProvisionChange).toBeDefined();
        expect(scope._init).toBeDefined();
        expect(scope._initPreSeed).toBeDefined();
        expect(scope.processTranslations).toBeDefined();
        expect(scope.browse).toBeDefined();
        expect(scope.onFileBrowseSave).toBeDefined();
    });

    it('should check for proper logic when handleSaveClick occured', function () {
        spyOn(editVCDVolumesFactory, 'save').and.callThrough();
        spyOn(scope, 'close').and.callThrough();

        scope.handleSaveClick();

        expect(editVCDVolumesFactory.save).toHaveBeenCalledWith(JSON.parse('{"SourceAddress":"[ZNest83Datastore]:NoamVcdVappVm41 (b4a584ea-084d-4230-8e71-8a9610170fed)/NoamVcdVappVm41 (b4a584ea-084d-4230-8e71-8a9610170fed).vmdk","TargetAddress":null,"Swap":false,"ProvisionedSizeInMB":8,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"42 2c e2 36 e4 69 a2 86-36 f2 08 9e 75 f2 68 c2","InstanceUuid":"50 2c 89 73 88 a4 17 25-4f 68 c0 f9 b2 06 80 17"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0,"DlpDescription":"Scsi(0:0)"},"Settings":{"IsSwap":false,"VolumeReplicationDestination":{"VCDDatastore":{"IsThin":true}}}},"IsSourceThinProvisioned":true}'));

        expect(scope.close).toHaveBeenCalled();
    });

    it('should change destination properly to vcddatastore', function () {
        scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE;
        scope.onReplicationDestinationChange();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore).toBeDefined();
    });

    it('should change destination properly to preseed', function () {
        scope.volumeConfiguration.replicationDestinationType = dataCollectionFactory.REPLICATION_TYPE.PRESEED;
        scope.onReplicationDestinationChange();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.ExistingDisk).toBeDefined();
    });

    it('should call to zAlert when thin provisioning was true', function () {
        scope.volumeConfiguration.thin = scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore = true;
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


    it('should properly init data for existing disk with preseed path', function () {
        scope.sharedVolumePotentials = false;
        scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination = {ExistingDisk: {SpecificDisk: {VmdkPath: 'path'}}};
        scope._init();
        expect(scope.volumeConfiguration.replicationDestinationType).toEqual(dataCollectionFactory.REPLICATION_TYPE.PRESEED);
        expect(scope.volumeConfiguration.preSeedText).toEqual('path');
    });


    it('should properly change values by watchers', function () {
        scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore = {};
        scope.form = {editVolume: {$invalid: true}};
        scope.volumeConfiguration.thin = true;
        scope.volumeConfiguration.swap = true;
        scope.$digest();

        expect(scope.saveButton.disabled).toBeTruthy();
        expect(scope.sharedVolumeProperties.InternalVolumeManagementSettings.Settings.VolumeReplicationDestination.VCDDatastore.IsThin).toBeTruthy();
        expect(scope.sharedVolumeProperties.Swap).toBeTruthy();
    });
});
