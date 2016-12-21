'use strict';

describe('recoveryFolderVmSettingsControllerTest', function () {
    var scope, recoveryFolderVmSettingsFactory, recoveryFolderVmSettingsModel, editVmFolderFactory, controller, createVPGModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $injector, $rootScope,_$translate_, _recoveryFolderVmSettingsFactory_, _recoveryFolderVmSettingsModel_, _editVmFolderFactory_, _createVPGModel_) {
        scope = $rootScope.$new();
        recoveryFolderVmSettingsFactory = _recoveryFolderVmSettingsFactory_;
        recoveryFolderVmSettingsModel = _recoveryFolderVmSettingsModel_;
        editVmFolderFactory = _editVmFolderFactory_;
        createVPGModel = _createVPGModel_;

        recoveryFolderVmSettingsFactory.data = {
            isScvmm: false,
            defaultVpgSettings: {
                TargetSiteInfo: {
                    PotentialReplicationDestinations: [{
                        "ComputeResource": {
                            "BaseComputeResourceIdentifier": {
                                "InternalName": "host-14",
                                "Type": 0,
                                "ServerIdentifier": {"ServerGuid": "598e5def-3500-4409-a691-d25b5cd10d22"}
                            }, "ResourcePoolIdentifier": null, "DisplayName": "[Cluster]172.20.205.5"
                        }, "IsSuitableForRecovery": true, "RecoveryImpossibleReason": null
                    }]
                },
                Id: {},
                Config: {
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
                            TargetFolder: 'default',
                            StorageProfile: null
                        },
                        {
                            InternalVirtualMachineId: {
                                InternalVmName: 'InternalVmName2',
                                ServerIdentifier: {ServerGuid: 'ServerGuid2'}
                            },
                            JournalHardLimit: 3,
                            JournalWarningThreshold: 4,
                            TargetFolder: 'default',
                            StorageProfile: null
                        }
                    ]
                }
            }
        };

        scope.data = recoveryFolderVmSettingsFactory.data;

        controller = $controller('recoveryFolderVmSettingsController', {
            $scope: scope,
            $translate: _$translate_,
            recoveryFolderVmSettingsFactory: recoveryFolderVmSettingsFactory,
            recoveryFolderVmSettingsModel: recoveryFolderVmSettingsModel,
            editVmFolderFactory: editVmFolderFactory
        });

        scope.gridObj = {
            recoveryFolderVmSettingsGrid: {
                updateData: function () {
                }
            }
        };

        scope.selectedItems = scope.data.defaultVpgSettings.Config.VirtualMachines;
        createVPGModel.data = {targetSite: {OwnersId: {}}};
    }));

    it("should have functions on scope", function () {
        expect(scope.data).toBeDefined();
        expect(scope.gridData).toBeDefined();
        expect(scope.gridObj.recoveryFolderVmSettingsGrid).toBeDefined();
        expect(scope.customOptions).toBeDefined();
        expect(scope.selectedItems).toBeDefined();
        expect(scope.handleEditSelectedClick).toBeDefined();
        expect(scope.onEditVmFolderFactoryResultSave).toBeDefined();
        expect(scope.selectedItemsChange).toBeDefined();
    });

    it('it should properly assign values when result is returned', function () {
        var result = {
            TargetFolder: {DisplayName: 'Test'}
        };
        scope.onEditVmFolderFactoryResultSave(result);
        var e = [ { InternalVirtualMachineId : { InternalVmName : 'InternalVmName1', ServerIdentifier : { ServerGuid : 'ServerGuid1' } }, JournalHardLimit : 1, JournalWarningThreshold : 2, TargetFolder : { DisplayName : 'Test' }, StorageProfile : null, id : 'InternalVmName1', RecoveryFolder : { display : 'Test', value : { DisplayName : 'Test' } } }, { InternalVirtualMachineId : { InternalVmName : 'InternalVmName2', ServerIdentifier : { ServerGuid : 'ServerGuid2' } }, JournalHardLimit : 3, JournalWarningThreshold : 4, TargetFolder : { DisplayName : 'Test' }, StorageProfile : null, id : 'InternalVmName2', RecoveryFolder : { display : 'Test', value : { DisplayName : 'Test' } } } ];
        expect(scope.selectedItems).toEqual(e);
    });
});
