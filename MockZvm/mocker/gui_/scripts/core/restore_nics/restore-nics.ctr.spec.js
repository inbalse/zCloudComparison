'use strict';

describe('restoreNicsPopup', function () {
    var controller, scope, restoreEditNicFactory, item, potentials;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _restoreEditNicFactory_) {
        scope = $rootScope.$new();

        item = {"DisplayName":"Network adapter 1","VNicIdentifier":{"Name":"Network adapter 1"},"VCenterVNicRestoreConfiguration":{"Network":{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-21"},"DisplayName":"dvPortGroup","_uiSelectChoiceDisabled":false},"IsNewMacAddress":false,"IPConfiguration":{"Type":2,"IP":null,"SubnetMask":null,"Gateway":null,"PrimaryDns":null,"SecondaryDns":null,"DnsSuffix":null},"IsIPConfigurationEnabled":true},"VcdVNicRestoreConfiguration":null,"id":0};
        potentials = {"Datastores":[{"Datastore":{"Id":{"InternalDatastoreName":"datastore-10","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"datastore1"},"IsEnabled":true},{"Datastore":{"Id":{"InternalDatastoreName":"datastore-16","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DatastoreClusterIdentifier":null,"DisplayName":"ZNest83Datastore"},"IsEnabled":true}],"Networks":[{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"Network","InternalName":"network-11"},"DisplayName":"VM Network","_uiSelectChoiceDisabled":false},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-34"},"DisplayName":"dvs.VCDVSinternal network-6a06bc05-f704-474e-91b1-6fbcd7faa79d","_uiSelectChoiceDisabled":false},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-145"},"DisplayName":"dvs.VCDVSNoamNetworkIso-f9a84b4e-7bc1-434d-8a38-b0c4e47a357b","_uiSelectChoiceDisabled":false},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-378"},"DisplayName":"dvs.VCDVSKobi network-5028025c-0916-4b72-8a8d-b21d3a4942fe","_uiSelectChoiceDisabled":false},{"Id":{"ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"},"InternalType":"DistributedVirtualPortgroup","InternalName":"dvportgroup-21"},"DisplayName":"dvPortGroup","_uiSelectChoiceDisabled":false}],"Folders":[{"Id":{"InternalFolderName":"group-v3","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"/"},{"Id":{"InternalFolderName":"group-v143","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Service VMs"},{"Id":{"InternalFolderName":"group-v48","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"NoamVcdVapp4 (7c6a7547-4140-4176-a7f8-669e4bb060e4)"},{"Id":{"InternalFolderName":"group-v43","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vApp_system_1 (87817a3c-cbbc-446d-8497-2ee07d11404e)"},{"Id":{"InternalFolderName":"group-v42","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"NoamOrgVCD2 (22759e18-f8b0-499e-a90b-0652cc2f0724)"},{"Id":{"InternalFolderName":"group-v318","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Guy_vApp(3) (1303db43-aba9-47aa-a143-df492f0500c5)"},{"Id":{"InternalFolderName":"group-v373","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"kobi-vapp-test (b52cf07a-80ff-40f0-a16d-780b6a7e4624)"},{"Id":{"InternalFolderName":"group-v129","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"naom vm (15bc6809-8ccd-4595-91ab-420c6a9af690)"},{"Id":{"InternalFolderName":"group-v351","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vApp_liron2 (9bc61db3-35b7-4ed4-8aea-be4ccf8499d3)"},{"Id":{"InternalFolderName":"group-v30","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"orgvdc (2c7e1564-54f8-4b29-960e-23be9f24dd74)"},{"Id":{"InternalFolderName":"group-v41","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"NoamOrgInc (043816c2-b470-4be7-807a-2cb3e3567cee)"},{"Id":{"InternalFolderName":"group-v29","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"ORG (d446e662-c129-487a-a594-8d2f06550ec1)"},{"Id":{"InternalFolderName":"group-v31","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Service VMs"},{"Id":{"InternalFolderName":"group-v131","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"[Default]ZertoRecoveryFolder"},{"Id":{"InternalFolderName":"group-v183","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Zerto_guy_7e24c83d-299d-42d7-b863-d833a66b1e0b"},{"Id":{"InternalFolderName":"group-v215","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"Zerto_org_e8385638-4a6d-459f-b704-c43662cd6ab6"},{"Id":{"InternalFolderName":"group-v142","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vcd"},{"Id":{"InternalFolderName":"group-v28","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"DisplayName":"vcloud"}]};
        scope.potentials = {Networks: []};
        restoreEditNicFactory = _restoreEditNicFactory_;
        controller = $controller('restoreNicsPopup', {$scope: scope, restoreEditNicFactory: restoreEditNicFactory, item:item, potentials:potentials});

        scope.gridObj= {grid:{updateData: function () { }}};
        scope.item = item;
        scope.potentials = potentials;
    }));


    it('should contain defined variables and functions', function () {
        expect(scope.handleEditSelectedClick).toBeDefined();
        expect(scope.onEditFactoryResult).toBeDefined();
        expect(scope.gridObj).toBeDefined();
        expect(scope.item).toBeDefined();
        expect(scope.potentials).toBeDefined();
        expect(scope.restoreNicsColumnsDefs).toBeDefined();
        expect(scope.selectedItems).toBeDefined();
        expect(scope.restoreNicsOptions).toBeDefined();
        expect(scope.onSelection).toBeDefined();
        expect(scope.updateGrid).toBeDefined();
    });

    it('should editnicfactory when edit button clicked', function () {
        spyOn(restoreEditNicFactory, 'openEdit').and.callThrough();
        scope.handleEditSelectedClick();
        expect(restoreEditNicFactory.openEdit).toHaveBeenCalledWith([], potentials);
    });

    it('should assign result item data to all selected items', function () {
        scope.item.VNics = [
            {VCenterVNicRestoreConfiguration: {}, VNicIdentifier: {Name: 'Name1'}},
            {VCenterVNicRestoreConfiguration: {}, VNicIdentifier: {Name: 'Name2'}},
            {VCenterVNicRestoreConfiguration: {}, VNicIdentifier: {Name: 'Name3'}}
        ];
        scope.selectedItems = [
            {VNicIdentifier: {Name: 'Name1'}},
            {VNicIdentifier: {Name: 'Name2'}}
        ];

        scope.onEditFactoryResult(
            {
                DisplayName: 'DisplayName',
                VCenterVNicRestoreConfiguration: {IPConfiguration: 'IPConfiguration',
                    IsIPConfigurationEnabled: 'IsIPConfigurationEnabled',
                    IsNewMacAddress: 'IsNewMacAddress',
                    Network: 'Network'
                }
            });

        expect(scope.item.VNics).toEqual([{"VCenterVNicRestoreConfiguration":{"IPConfiguration":"IPConfiguration","IsIPConfigurationEnabled":"IsIPConfigurationEnabled","IsNewMacAddress":"IsNewMacAddress","Network":"Network"},"VNicIdentifier":{"Name":"Name1"},"DisplayName":"DisplayName"},{"VCenterVNicRestoreConfiguration":{"IPConfiguration":"IPConfiguration","IsIPConfigurationEnabled":"IsIPConfigurationEnabled","IsNewMacAddress":"IsNewMacAddress","Network":"Network"},"VNicIdentifier":{"Name":"Name2"},"DisplayName":"DisplayName"},{"VCenterVNicRestoreConfiguration":{},"VNicIdentifier":{"Name":"Name3"}}]);
    });

});
