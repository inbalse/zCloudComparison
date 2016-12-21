'use strict';

describe('advancedVcdVmReplicationSettingsPopupTest', function () {
    var parent, scope, controller, advancedVcdVmReplicationSettingsModel, createVPGModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _advancedVcdVmReplicationSettingsModel_, _createVPGModel_) {
        parent = $rootScope.$new();
        createVPGModel = _createVPGModel_;

        createVPGModel.data ={isReverse:false};

        parent.data = {
            defaultVpgSettings: {
                Id: {},
                Config: {
                    ProtectionGroupId: {},
                    OwnersId: {"OwnersGuid":"57ab2759-39bc-4a9f-9674-6a128eba1d42"},
                    RecoveryVappSettings: {"VCDVappSettings":{"TargetVirtualDatacenter":{"Id":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:vdc:22759e18-f8b0-499e-a90b-0652cc2f0724"},"DisplayName":"NoamOrgVCD2"},"VCDVAppNetworks":[{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:2986498e-09d7-4e5b-b989-e8d0ecce23c4"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"externalNetwork","OrgNetwork":null,"IpScopes":[]},{"RecoveryOrganizationVCDOrgNetwork":{"Id":"00000000-0000-0000-0000-000000000000","VCDId":"urn:vcloud:network:eee3536e-a889-4e55-8332-bfe4aeff8c08"},"FenceMode":{"FenceModeType":2},"IpScope":null,"NetworkName":"NoamNetworkIso","OrgNetwork":null,"IpScopes":[]},{"RecoveryOrganizationVCDOrgNetwork":null,"FenceMode":{"FenceModeType":0},"IpScope":null,"NetworkName":"none","OrgNetwork":null,"IpScopes":[{"Netmask":"0.0.0.0","Gateway":"0.0.0.0","IpRanges":[]}]}]}},
                    Configuration: {
                        ManageJournalSettings: {
                            JournalWarningThresholdPerVM: {Limit: 10240, Type: 1},
                            JournalHardLimitPerVM: {Limit: 10240, Type: 1}
                        }
                    },
                    VirtualMachines: [
                        {
                            InternalVirtualMachineId: {
                                InternalVmName: 'InternalVmName1',
                                ServerIdentifier: {ServerGuid: 'ServerGuid1'}
                            },
                            JournalHardLimit: 1,
                            JournalWarningThreshold: 2,
                            StorageProfile: null
                        },
                        {
                            InternalVirtualMachineId: {
                                InternalVmName: 'InternalVmName2',
                                ServerIdentifier: {ServerGuid: 'ServerGuid2'}
                            },
                            JournalHardLimit: 3,
                            JournalWarningThreshold: 4,
                            StorageProfile: null
                        }
                    ]
                }
            }
        };

        scope = parent.$new();


        advancedVcdVmReplicationSettingsModel = _advancedVcdVmReplicationSettingsModel_;
        controller = $controller('advancedVcdVmReplicationSettingsPopup', {
            $scope: scope,
            advancedVcdVmReplicationSettingsModel: advancedVcdVmReplicationSettingsModel
        });
        scope.selectedItems = parent.data.defaultVpgSettings.Config.VirtualMachines;
        scope.gridObj = {
            advancedVcdVmSettingsGrid:{
                updateData:function(){}
            }
        };

        spyOn(advancedVcdVmReplicationSettingsModel, 'processItem');
        spyOn(scope.gridObj.advancedVcdVmSettingsGrid, 'updateData');
    }));

    it("shoule have functions and variables on scope", function () {
        expect(scope.data).toBeDefined();
        expect(scope.groupByValues).toBeDefined();
        expect(scope.gridObj.advancedVcdVmSettingsGrid).toBeDefined();
        expect(scope.selectedItems).toBeDefined();
        expect(scope.vmsGridOptions).toBeDefined();
        //functions
        expect(scope.handleApplyDefaultsClick).toBeDefined();
        expect(scope.handleEditSelectedClick).toBeDefined();
        expect(scope.onEditVcdVMFactoryResultSave).toBeDefined();
    });

    it('should call processItem in model and update current grid when result is returned', function () {
        var result = {
            StorageProfile: {
                VCDStorageProfile: {DisplayName: 'DisplayName'}
            },
            JournalHardLimit: 10,
            JournalWarningThreshold: 10
        };
        scope.onEditVcdVMFactoryResultSave(result);
        expect(advancedVcdVmReplicationSettingsModel.processItem).toHaveBeenCalled();
        expect(scope.gridObj.advancedVcdVmSettingsGrid.updateData).toHaveBeenCalled();
        expect(angular.equals(parent.data.defaultVpgSettings.Config.VirtualMachines, [{"InternalVirtualMachineId":{"InternalVmName":"InternalVmName1","ServerIdentifier":{"ServerGuid":"ServerGuid1"}},"JournalHardLimit":10,"JournalWarningThreshold":10,"StorageProfile":{"VCDStorageProfile":{"DisplayName":"DisplayName"}}},{"InternalVirtualMachineId":{"InternalVmName":"InternalVmName2","ServerIdentifier":{"ServerGuid":"ServerGuid2"}},"JournalHardLimit":10,"JournalWarningThreshold":10,"StorageProfile":{"VCDStorageProfile":{"DisplayName":"DisplayName"}}}])).toBeTruthy();
    });
});

