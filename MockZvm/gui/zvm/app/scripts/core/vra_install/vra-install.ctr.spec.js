'use strict';

describe('VRA install controller', function () {
    var controller, testScope, zertoServiceFactory, testVraEditFactory, enums, vos, testVraInstallFactory, translate, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zertoServiceFactory_, _enums_, _vos_, $compile, $translate, _vraInstallFactory_, _vraEditFactory_) {
        testScope = $rootScope.$new();

        zertoServiceFactory = _zertoServiceFactory_;
        enums = _enums_;
        vos = _vos_;

        /// --- mock data ----
        testVraInstallFactory = _vraInstallFactory_;

        testVraEditFactory = _vraEditFactory_;

        testVraInstallFactory.hosts = [];

        testVraEditFactory.selectedVra = {installedUsingSshKey: false};

        globalStateModel = {data: {VirtualizationProviderType: 0}};

        translate = $translate;

        controller = $controller('vraInstallController', {
            $scope: testScope,
            vraInstallFactory: testVraInstallFactory,
            zertoServiceFactory: zertoServiceFactory,
            enums: enums,
            vos: vos,
            $translate: translate,
            vraEditFactory: testVraEditFactory,
            globalStateModel: globalStateModel
        });


    }));

    function createLastInstallVraMock() {
        var vraScreenItemData = new vos.VraListScreenItem();
        vraScreenItemData.HostInfo = new vos.ComputeResourceVisualObject();
        vraScreenItemData.HostInfo.BaseComputeResourceIdentifier = new vos.BaseComputeResourceIdentifier();
        vraScreenItemData.HostInfo.BaseComputeResourceIdentifier.InternalName = 'host-9';
        vraScreenItemData.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier = new vos.ServerIdentifier();
        vraScreenItemData.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid = '09d0d3b4-78d0-47c1-ad38-d01887e6d589';
        vraScreenItemData.HostInfo.DisplayName = '172.20.200.2';

        vraScreenItemData.VraInfo = new vos.InstalledVraInfoVisualObject();
        vraScreenItemData.VraInfo.BandwidthGroup = 'new Group';
        vraScreenItemData.VraInfo.Datastore = new vos.DatastoreVisualObject();
        vraScreenItemData.VraInfo.Datastore.Id = new vos.DatastoreIdentifier();
        vraScreenItemData.VraInfo.Datastore.Id.InternalDatastoreName = 'datastore-12';
        vraScreenItemData.VraInfo.Datastore.Id.ServerIdentifier = new vos.ServerIdentifier();
        vraScreenItemData.VraInfo.Datastore.Id.ServerIdentifier.ServerGuid = '09d0d3b4-78d0-47c1-ad38-d01887e6d589';
        vraScreenItemData.VraInfo.IpConfiguration = new vos.VraIpConf();
        vraScreenItemData.VraInfo.IpConfiguration.DefaultGw = '30.30.30.30';
        vraScreenItemData.VraInfo.IpConfiguration.Ip = '10.10.10.10';
        vraScreenItemData.VraInfo.IpConfiguration.NetMask = '20.20.20.20';
        vraScreenItemData.VraInfo.IsDhcpConf = false;
        vraScreenItemData.VraInfo.MemoryInGB = 2;
        vraScreenItemData.VraInfo.Network = new vos.VirtualNetworkVisualObject();
        vraScreenItemData.VraInfo.Network.Id = new vos.NetworkIdentifier();
        vraScreenItemData.VraInfo.Network.Id.ServerIdentifier = new vos.ServerIdentifier();
        vraScreenItemData.VraInfo.Network.Id.ServerIdentifier.ServerGuid = '09d0d3b4-78d0-47c1-ad38-d01887e6d589';
        vraScreenItemData.VraInfo.installedUsingSshKey = false;
        return vraScreenItemData;
    }

    it("should have user interaction funciton defined", function () {
        expect(testScope.changedHost).toBeDefined();
        expect(testScope.close).toBeDefined();
        expect(testScope.cancel).toBeDefined();
        expect(testScope.installHandler).toBeDefined();
    });

    it("should check properties defined", function () {
        expect(testScope.loading).toBeDefined();
        expect(testScope.forms).toBeDefined();
        expect(testScope.vraInstallObject).toBeDefined();
        expect(testScope.vraInstallObject.NetMask).toEqual('255.255.255.0');
        expect(testScope.vraInstallObject.amountRam).toEqual(3);
        expect(testScope.networkTypes).toBeDefined();
        expect(testScope.buttons).toBeDefined();
    });

    it("should have cancel and submit handlers for the buttons", function () {
        expect(testScope.buttons[1].handler).toEqual(testScope.installHandler);
        expect(testScope.buttons[0].handler).toEqual(testScope.cancel);
    });

    it("should call the install function and call the installVra function", function () {
        spyOn(testScope, 'installVra');
        testScope.installHandler();
        expect(testScope.installVra).toHaveBeenCalled();
    });

    it("should check the mock data from factory of hosts when opening the dialog", function () {
        testVraInstallFactory.createHostMock([]);
        testVraInstallFactory.showInstallVra();
        expect(testVraInstallFactory.hosts.length).toEqual(2);
    });

    it("should return loading false after init", function () {
        expect(testScope.loading).toBeFalsy();
    });

    it("should check init network type ", function () {
        expect(testScope.vraInstallObject.networkType).toEqual('1');
        expect(testScope.isNetworkDisabled).toBeFalsy();
    });

    it("should check the selected host", function () {
        testVraInstallFactory.createHostMock([]);
        testScope.vraInstallObject.host = testVraInstallFactory.hosts[0];
        testScope.changedHost();
        expect(testScope.isUserNamePasswordRequered).toBeFalsy();
        expect(testScope.vraInstallObject.password).toEqual('');

        //reset model to null when host is change (Bug 25957)
        expect(testScope.vraInstallObject.dataStore).toEqual(null);
        expect(testScope.vraInstallObject.network).toEqual(null);
    });

    it("should check the getHostIdentifier function", function () {
        testVraInstallFactory.createHostMock([]);
        testScope.vraInstallObject.host = testVraInstallFactory.hosts[0];
        var testHostIdentifer = testScope.getHostIdentifier();
        expect(testHostIdentifer.InternalHostName).toEqual('host-9');
    });

    it("should find the right host in the list of hosts", function () {
        testVraInstallFactory.createHostMock([]);
        testScope.vraInstallObject.host = testVraInstallFactory.hosts[0];

        var result = testScope.findHostInList(testScope.vraInstallObject.host.HostInfo.BaseComputeResourceIdentifier);
        expect(result).toBeDefined();
    });

    it("should check an edit of a vra to install", function () {
        spyOn(testScope, 'changedHost');
        testVraInstallFactory.createHostMock([]);
        testVraInstallFactory.vraLastInstalled = createLastInstallVraMock();
        testScope.setEditParameters();
        expect(testScope.vraInstallObject.host).toBeDefined();
        expect(testScope.vraInstallObject.amountRam).toBeDefined();
        expect(testScope.vraLastInstalled.VraInfo.IsDhcpConf).toBeFalsy();
        expect(testScope.vraInstallObject.networkType).toEqual('1');
        expect(testScope.vraInstallObject.Ip).toEqual('10.10.10.10');
        expect(testScope.vraInstallObject.NetMask).toEqual('20.20.20.20');
        expect(testScope.vraInstallObject.DefaultGw).toEqual('30.30.30.30');
        expect(testScope.changedHost).toHaveBeenCalled();
    });

    it('should clear last loaded vra when window is closed', function () {
        testVraInstallFactory.modalInstance = {close: angular.noop};
        testVraInstallFactory.vraLastInstalled = {};
        testScope.close();
        expect(testVraInstallFactory.vraLastInstalled).not.toBeDefined();
    });

    it('should clear last loaded vra when window is cancelled', function () {
        testVraInstallFactory.modalInstance = {dismiss: angular.noop};
        testVraInstallFactory.vraLastInstalled = {};
        testScope.cancel();
        expect(testVraInstallFactory.vraLastInstalled).not.toBeDefined();
    });
});
