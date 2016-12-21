/**
 * Created by liron on 20/05/2015.
 */
'use strict';

describe('editVmFolderControllerTest', function () {
    var controller, scope, factory, service, translate;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, $translate, _editVmFolderFactory_) {
        scope = $rootScope.$new();
        translate = $translate;
        factory = _editVmFolderFactory_;

        var vm = angular.fromJson('{"InternalVirtualMachineId":{"InternalVmName":"vm-297","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"Name":"kobi vm 1(1)(2)(1)(1) - testing recovery","SourceHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.200.2"},"SourceDatastore":{"Id":{"InternalDatastoreName":"datastore-12","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81Datastore"},"TargetHost":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.200.2"},"TargetDatastore":{"Id":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"[ds_cluster]datastore1 (345MB / 0.50GB Free)"},"StorageUsageInfo":{"ProvisionedStorageSizeInMB":222,"UsedStorageSizeInMB":8,"RecoveryStorageSizeInMB":0},"Volumes":[{"SourceAddress":"[ZNest81Datastore]:GUI Local VRA/9c3f451c-2db1-400f-9c79-783da1984f25/vm-281/kobi vm 1(1)(2)(1)(1)/kobi vm 1.vmdk","TargetAddress":"[ds_cluster]datastore1 (345MB / 0.50GB Free)","Swap":false,"ProvisionedSizeInMB":8,"InternalVolumeManagementSettings":{"DiskLocationParams":{"VMUuids":{"Uuid":"56 4d 0f aa db 4b 1d 7a-7f 16 9e 8b 92 f4 37 19","InstanceUuid":"52 09 60 45 a5 3a 9e 0c-9d 3e 6e 3d 97 df 14 8e"},"UnitNumber":0,"ControllerNumber":0,"VolumeType":0},"Settings":{"VolumeReplicationDestination":{"Datastore":{"IsThin":false,"TargetDatastore":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}}}}},"IsSourceThinProvisioned":false}],"NetworkInterfaces":[{"InternalIdentifier":{"Name":"Network adapter 1"},"SourceNetwork":{"VcenterNetwork":{"Id":{"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"},"InternalType":"Network","InternalName":"network-11"},"DisplayName":"VM Network"},"VCDNetwork":null},"FailoverSettings":{"VCenterNetworkSettings":{"RecoveryNetwork":null,"IP":null,"DnsSuffix":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":null},"TestSettings":{"VCenterNetworkSettings":{"RecoveryNetwork":null,"IP":null,"DnsSuffix":null,"ShouldReplaceMacAddress":false},"VCDNetworkSettings":null},"IsIPConfigurationEnabled":false,"MacAddress":"00:50:56:bd:3d:86"}],"TargetFolder":"Test","StorageProfile":null,"JournalHardLimit":{"Type":1,"Limit":10240},"JournalWarningThreshold":{"Type":1,"Limit":10240},"JournalDatastores":[{"Id":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"[ds_cluster]datastore1 (345MB / 0.50GB Free)"}]}');
        var potentialFolders = [{},{},{}];
        var selectedVmsCount = 2;
        controller = $controller('editVmFolderController', {$scope: scope, editVmFolderFactory: factory, $translate: translate, potentialFolders: potentialFolders, vm: vm, selectedVmsCount:selectedVmsCount});
    }));

    it('should have interface in place', function () {
        expect(scope.handleSaveClick).toBeDefined();
        expect(scope.handleCancelClick).toBeDefined();
        expect(scope.close).toBeDefined();
    });

    it('should check data', function () {
        expect(scope.vm.TargetFolder).toEqual('Test');
        expect(scope.potentialFolders.length).toEqual(3);
    });
});
