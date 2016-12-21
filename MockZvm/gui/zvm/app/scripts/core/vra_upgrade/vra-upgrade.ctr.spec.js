'use strict';

describe('VRA upgrade controller', function () {
    var controller, testScope, parentScope, zertoServiceFactory, vraUpgradeFactory, selectedVra, latestVraVersion, zAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zertoServiceFactory_, _vraUpgradeFactory_, _zAlertFactory_) {
        parentScope = $rootScope.$new();
        testScope = parentScope.$new();

        zertoServiceFactory = _zertoServiceFactory_;
        vraUpgradeFactory = _vraUpgradeFactory_;
        zAlertFactory = _zAlertFactory_;

        selectedVra = [
            {"id":"09d0d3b4-78d0-47c1-ad38-d01887e6d589172.20.200.2","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"},"InternalName":"host-9","IsGhost":true,"IsPartOfCluster":false,"IsEditEnabled":true,"IsUninstallEnabled":true,"IsUpgradeEnabled":false,"IsChangePasswordEnabled":true,"IsChangeHostEnabled":false,"HostAddress":"172.20.200.2","HostVersion":"5.5","AlertStatus":"Error","VRAName":"GUI Local VRA","VRAStatus":0,"VRAAddress":"","VRAVersion":"VRA_LIST.STATES_MAP.4","VRAGroup":"default_group","VRARAM":0,"DS":"ZNest81Datastore","DSCluser":"","VCNetwork":"VM Network","NumVPGs":2,"NumVMs":8,"NumVolumes":12,"NumProtectedVPGs":2,"NumProtectedVMs":4,"NumProtectedVolumes":6,"NumRecoveryVPGs":2,"NumRecoveryVMs":4,"NumRecoveryVolumes":6,"VraInfo":{"State":{"Status":0,"InstallOrUninstallProgress":0,"AlertStatus":2,"AlertTips":{"Alerts":[{"Description":"Recovery volume on host 172.20.200.2 was deleted from the Hypervisor. Delete the VPG and recreate it to restart the protection of the virtual machines.","SiteName":"gui_local","AlertLevel":1},{"Description":"Recovery volume on host 172.20.200.2 was deleted from the Hypervisor. Delete the VPG and recreate it to restart the protection of the virtual machines.","SiteName":"gui_local","AlertLevel":1},{"Description":"Recovery volume on host 172.20.200.2 was deleted from the Hypervisor. Delete the VPG and recreate it to restart the protection of the virtual machines.","SiteName":"gui_local","AlertLevel":1}],"HasMore":true,"TotalNumberOfAlerts":10,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":10},"GhostStatus":{"IsGhost":true},"MaintenanceStatus":{"MaintainedGroups":[],"State":5,"Progress":536870911},"UpgradeStatus":4,"UpgradeDetails":"Latest Version","IsEditEnabled":true,"IsChangePasswordEnabled":true,"IsUpgradeEnabled":false,"IsUninstallEnabled":true,"IsChangeHostEnabled":false},"HostInfo":{"BaseComputeResourceIdentifier":{"InternalName":"host-9","Type":0,"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.200.2"},"VraInfo":{"Datastore":{"Id":{"InternalDatastoreName":"datastore-12","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest81Datastore"},"StoragePod":null,"Network":{"Id":{"ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"},"InternalType":"Network","InternalName":"network-11"},"DisplayName":"VM Network"},"IpConfiguration":{"Ip":"","NetMask":"","DefaultGw":"","PeerNetwork":"","PeerNetMask":"","PeerGw":""},"InstalledVraVersion":"4.0","IsDhcpConf":true,"BandwidthGroup":"default_group","MemoryInGB":0,"VraVM":{"DisplayName":"GUI Local VRA","Id":{"InternalVmName":"vm-296","ServerIdentifier":{"ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}}},"Version":{"Version":"5.5","Build":"1331820","HostCredentialRequired":true},"LastError":null,"IsPartOfCluster":false,"ProtectedCounters":{"Vpgs":2,"Vms":4,"PromotingVms":0,"TestOrRecoverBeforeCommitVms":0,"Volumes":6,"StorageSizeInMB":240},"RecoveryCounters":{"Vpgs":2,"Vms":4,"PromotingVms":0,"TestOrRecoverBeforeCommitVms":0,"Volumes":6,"StorageSizeInMB":240},"SelfProtectedVpgs":2,"OwningClusterName":""},"DisplayName":"172.20.200.2","CurrentVersion":"4.0","Details":"Latest Version","ClusterName":""}
        ];
        latestVraVersion = '4.0 Build 040005999';


        vraUpgradeFactory.modalInstance = {
            dismiss: function () {
            }
        };

        spyOn(zAlertFactory, 'warn');

        testScope.mockEventTargetWarnOk = {target: {name: 'MODAL.OK'}};
        testScope.mockEventTargetWarnCancel = {target: {name: 'MODAL.CANCEL'}};
        testScope.saveButton = {disable: false};
        testScope.vraData = selectedVra;
        testScope.latestVraVersion = latestVraVersion;


        controller = $controller('vraUpgradeControllerPopup', {
            $scope: testScope,
            selectedVra: selectedVra,
            latestVraVersion: latestVraVersion
        });
    }));

    it("should have property be defined", function () {
        expect(testScope.vraData).toEqual(selectedVra);
        expect(testScope.latestVraVersion).toEqual(latestVraVersion);
        expect(testScope.customOptions).toBeDefined();
        expect(testScope.selectedItems).toBeDefined();

    });

    it("should have function be defined", function () {
        expect(testScope.getSummerySyncSize).toBeDefined();
        expect(testScope.selectedItemsChange).toBeDefined();
    });

    it('should have selected items change handler', function () {
        spyOn(testScope, 'getSummerySyncSize');
        testScope.selectedItemsChange();
        expect(testScope.vraCount).toEqual(testScope.selectedItems.length);
        expect(testScope.getSummerySyncSize).toHaveBeenCalled();
    });

    it('should have click ok in warn alert modal handler', function () {
        spyOn(testScope, 'getVraIdentifier');
        testScope._handleWarnModalClick(testScope.mockEventTargetWarnOk);
        expect(testScope.mockEventTargetWarnOk.target.name).toEqual('MODAL.OK');
        expect(testScope.getVraIdentifier).toHaveBeenCalled();
        spyOn(zertoServiceFactory, 'UpgradeVras').and.callThrough();
    });

    it('should have click cancel in warn alert modal handler', function () {
        spyOn(zertoServiceFactory, 'UpgradeVras');
        testScope._handleWarnModalClick(testScope.mockEventTargetWarnCancel);
        expect(testScope.mockEventTargetWarnCancel.target.name).toEqual('MODAL.CANCEL');
        expect(zertoServiceFactory.UpgradeVras).not.toHaveBeenCalled();
    });

    it('should have click save handler', function () {
        testScope.save();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });
});
