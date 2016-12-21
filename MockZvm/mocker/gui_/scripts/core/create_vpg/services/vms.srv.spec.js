'use strict';

describe('Vms service', function () {
    var vmsService, $q, createVPGModel, storageService, zertoServiceFactory, publicCloudSettingsService, helperService, vpgService, enums, vos;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_vmsService_, _createVPGModel_, _storageService_, _zertoServiceFactory_,
                                _publicCloudSettingsService_, _helperService_, _vpgService_, _enums_, _vos_) {
        vmsService = _vmsService_;
        createVPGModel = _createVPGModel_;
        storageService = _storageService_;
        zertoServiceFactory = _zertoServiceFactory_;
        publicCloudSettingsService = _publicCloudSettingsService_;
        helperService = _helperService_;
        vpgService = _vpgService_;
        enums = _enums_;
        vos = _vos_;
    }));

    it('should get the selected vms', function () {
        var vms = [{a: true}, {b: false}];
        spyOn(createVPGModel, 'getSelectedVms').and.returnValue(vms);
        vmsService.getSelectedVms();
        expect(createVPGModel.getSelectedVms).toHaveBeenCalled();
        expect(createVPGModel.getSelectedVms()).toBe(createVPGModel.getSelectedVms());
    });

    it('should set the selected vms', function () {
        var vms = [{a: true}, {b: false}];
        spyOn(createVPGModel, 'setSelectedVms');
        vmsService.setSelectedVms(vms);
        expect(createVPGModel.setSelectedVms).toHaveBeenCalledWith(vms);
    });

    it('should get the initialized selected vms', function () {
        var vms = [{a: true}, {b: false}];
        spyOn(createVPGModel, 'getInitializedSelectedVms').and.returnValue(vms);
        vmsService.getInitializedSelectedVms();
        expect(createVPGModel.getInitializedSelectedVms).toHaveBeenCalled();
        expect(createVPGModel.getInitializedSelectedVms()).toBe(createVPGModel.getInitializedSelectedVms());
    });

    it('should set the initialized selected vms', function () {
        var vms = [{a: true}, {b: false}];
        spyOn(createVPGModel, 'setInitializedSelectedVms');
        vmsService.setInitializedSelectedVms(vms);
        expect(createVPGModel.setInitializedSelectedVms).toHaveBeenCalledWith(vms);
    });

    it('should get the protected vms', function () {
        var vms = [{a: true}, {b: false}];
        spyOn(createVPGModel, 'getProtectedVms').and.returnValue(vms);
        vmsService.getProtectedVms();
        expect(createVPGModel.getProtectedVms).toHaveBeenCalled();
        expect(createVPGModel.getProtectedVms()).toBe(createVPGModel.getProtectedVms());
    });

    it('should set the protected vms', function () {
        var vms = [{a: true}, {b: false}];
        spyOn(createVPGModel, 'setProtectedVms');
        vmsService.setProtectedVms(vms);
        expect(createVPGModel.setProtectedVms).toHaveBeenCalledWith(vms);
    });

    describe('boot order function', function () {
        var groups;
        beforeEach(function () {
            groups = [{
                "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
                "Name": "Default",
                "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                "Machines": [{
                    "DisplayName": "Dummy2",
                    "Id": {
                        "InternalVmName": "vm-34",
                        "ServerIdentifier": {"ServerGuid": "3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5"}
                    }
                }]
            }, {
                "BootGroupIdentifier": {"Guid": "00000000-0000-0000-0000-000000000001"},
                "Name": "Not Default",
                "Settings": {"BootDelay": 0, "WaitForTools": false, "ShutdownDelay": 0},
                "Machines": []
            }];
        });

        it('should get the boot groups', function () {
            var bootGroups = [{a: true}, {b: false}];
            spyOn(createVPGModel, 'getBootOrderGroups').and.returnValue(bootGroups);
            vmsService.getBootOrderGroups();
            expect(createVPGModel.getBootOrderGroups).toHaveBeenCalled();
            expect(createVPGModel.getBootOrderGroups()).toBe(createVPGModel.getBootOrderGroups());

        });

        it('should set the boot groups', function () {
            var bootGroups = [{a: true}, {b: false}];
            spyOn(createVPGModel, 'setBootOrderGroups');
            vmsService.setBootOrderGroups(bootGroups);
            expect(createVPGModel.setBootOrderGroups).toHaveBeenCalledWith(bootGroups);
        });

        it('should remove vm ids from the boot groups', function () {

            _.set(createVPGModel, 'data.tmpVpgSettings.BootOrderGroups', groups);

            var id = "vm-34";
            vmsService.removeVmFromBootorder([id]);

            var newGroups = vmsService.getBootOrderGroups();
            expect(newGroups[0].Machines.length).toBe(0);

        });

        it('should add new vm to the boot order default group', function () {
            _.set(createVPGModel, 'data.tmpVpgSettings.BootOrderGroups', groups);
            var dummyVm = {a: 1};
            vmsService.addNewVmToBootorder(dummyVm);
            var defaultGroup = vmsService.getDefaultGroup(groups);
            expect(defaultGroup.Machines.length).toBe(2);
        });

        it('should append a new boot order group', function () {
            spyOn(createVPGModel, 'appendBootOrderGroup');
            var someVms = [{a: 1}, {b: 1}];
            vmsService.appendBootOrderGroup(someVms);
            expect(createVPGModel.appendBootOrderGroup).toHaveBeenCalledWith(someVms);
        });

        it('should get the default boot order group', function () {
            _.set(createVPGModel, 'data.tmpVpgSettings.BootOrderGroups', groups);
            var group = vmsService.getDefaultGroup(vmsService.getBootOrderGroups());
            expect(group.Name).toEqual('Default');
        });

    });

    it('should create vm id for grid', function () {
        var vm = {};
        _.set(vm, 'InternalVirtualMachineId.InternalVmName', 'vm-12');
        _.set(vm, 'InternalVirtualMachineId.ServerIdentifier.ServerGuid', '3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5');
        var result = vmsService.createVmIdForGrid(vm);
        expect(result).toEqual('vm-123b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5');

        vm = {};
        _.set(vm, 'Id.InternalVmName', 'vm-12');
        _.set(vm, 'Id.ServerIdentifier.ServerGuid', '3b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5');
        result = vmsService.createVmIdForGrid(vm);
        expect(result).toEqual('vm-123b3b6df8-8d8d-4dc8-9ac4-646cbfeec0e5');

    });

    it('should check to prevent applying selected vm change', function () {
        var result = vmsService.preventSelectedVMsChange(false);
        expect(result).toBe(true);
        result = vmsService.preventSelectedVMsChange(true, false, false);
        expect(result).toBe(false);
        result = vmsService.preventSelectedVMsChange(true, false, true);
        expect(result).toBe(false);
        result = vmsService.preventSelectedVMsChange(true, true, false);
        expect(result).toBe(false);
        result = vmsService.preventSelectedVMsChange(true, true, true);
        expect(result).toBe(true);
    });

    it('should merge the current and the selected vms', function () {

        var current = [{InternalVmName: 'vm-1', ServerIdentifier: {ServerGuid: '123'}}, {
                InternalVmName: 'vm-2',
                ServerIdentifier: {ServerGuid: '123'}
            }],
            selected = [{InternalVmName: 'vm-2', ServerIdentifier: {ServerGuid: '123'}}, {
                InternalVmName: 'vm-5',
                ServerIdentifier: {ServerGuid: '123'}
            }];

        var result = vmsService.mergeInitializedAndSeletcedVms(current, selected);
        expect(result.length).toBe(3);

        expect(result[0].InternalVmName).toEqual('vm-1');
        expect(result[1].InternalVmName).toEqual('vm-2');
        expect(result[2].InternalVmName).toEqual('vm-5');
    });

    it('should find vm items', function () {
        var current = [{InternalVmName: 'vm-1', ServerIdentifier: {ServerGuid: '123'}}, {
                InternalVmName: 'vm-2',
                ServerIdentifier: {ServerGuid: '123'}
            }],
            selected = [{InternalVmName: 'vm-2', ServerIdentifier: {ServerGuid: '123'}}, {
                InternalVmName: 'vm-5',
                ServerIdentifier: {ServerGuid: '123'}
            }];

        var merged = vmsService.mergeInitializedAndSeletcedVms(current, selected);

        var result = vmsService.findVMItems(merged, current);

        expect(result[0].InternalVmName).toEqual('vm-5');
    });

    it('should get the added and removed vms', function () {
        //setup
        var current = [
                {
                    Name: 'a',
                    InternalVirtualMachineId: {
                        InternalVmName: 'vm-1',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                },
                {
                    Name: 'b',
                    InternalVirtualMachineId: {
                        InternalVmName: 'vm-2',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                }
            ],
            selected = [
                {
                    Name: 'b',
                    Id: {
                        InternalVmName: 'vm-2',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                },
                {
                    Name: 'c',
                    Id: {
                        InternalVmName: 'vm-5',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                }
            ];
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.VirtualMachines', current);
        _.set(createVPGModel, 'data.tmpVpgSettings.vms', selected);

        //check
        spyOn(vmsService, 'mergeInitializedAndSeletcedVms').and.callThrough();
        var result = vmsService.getAddedRemovedVms();

        expect(vmsService.mergeInitializedAndSeletcedVms).toHaveBeenCalledWith(
            _.pluck(createVPGModel.getInitializedSelectedVms(), 'InternalVirtualMachineId'),
            _.pluck(createVPGModel.getSelectedVms(), 'Id')
        );

        expect(result.added[0].InternalVmName).toEqual('vm-5');
        expect(result.removed[0].InternalVmName).toEqual('vm-1');
    });

    it('should remove vms from vpg settings and call init volumes', function () {
        var current = [
                {
                    Name: 'a',
                    InternalVirtualMachineId: {
                        InternalVmName: 'vm-1',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                },
                {
                    Name: 'b',
                    InternalVirtualMachineId: {
                        InternalVmName: 'vm-2',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                }
            ],
            selected = [
                {
                    Name: 'b',
                    Id: {
                        InternalVmName: 'vm-2',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                },
                {
                    Name: 'c',
                    Id: {
                        InternalVmName: 'vm-5',
                        ServerIdentifier: {ServerGuid: '123'}
                    }
                }
            ];
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.VirtualMachines', current);
        _.set(createVPGModel, 'data.tmpVpgSettings.vms', selected);

        var selectedVmsIds = _.pluck(createVPGModel.getSelectedVms(), 'Id'),
            removed = vmsService.getAddedRemovedVms().removed;


        spyOn(storageService, 'initVolumes');
        vmsService.removeVmsFromVpgSettings(removed, selectedVmsIds);

        var initializedSelectedVms = vmsService.getInitializedSelectedVms();
        expect(initializedSelectedVms[0].Name).toEqual('b');
        expect(initializedSelectedVms.length).toEqual(1);
        expect(storageService.initVolumes).toHaveBeenCalledWith(selectedVmsIds);
    });

    it('should not alter initialized vms when removed list is empty', function () {
        var current = [
            {
                Name: 'a',
                InternalVirtualMachineId: {
                    InternalVmName: 'vm-1',
                    ServerIdentifier: {ServerGuid: '123'}
                }
            },
            {
                Name: 'b',
                InternalVirtualMachineId: {
                    InternalVmName: 'vm-2',
                    ServerIdentifier: {ServerGuid: '123'}
                }
            }
        ];
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.VirtualMachines', current);

        spyOn(storageService, 'initVolumes');
        vmsService.removeVmsFromVpgSettings([]);
        var initializedSelectedVms = vmsService.getInitializedSelectedVms();
        expect(initializedSelectedVms.length).toEqual(2);
        expect(storageService.initVolumes).not.toHaveBeenCalled();
    });

    it('should send vms for initialization', function () {
        var user = {user: 1};
        spyOn(vpgService, 'initSelectedVmsHandler');
        spyOn(helperService, 'initSelectedVMs').and.returnValue({
            then: function (callback) {
                callback(user)
            }
        });
        _.set(createVPGModel, 'data.targetSiteType', 1);
        _.set(createVPGModel, 'data.targetSite', 2);
        _.set(createVPGModel, 'data.protectionGroupId', '000');

        var added = ['000', '111', '222'];
        var vmsList = [{Id: '000'}, {Id: '111'}, {Id: '222'}];
        vmsService.sendVmsForInitialization(added);
        expect(helperService.initSelectedVMs).toHaveBeenCalledWith(vmsList, vpgService.getTargetSiteType(), vpgService.getTargetSite(), vpgService.getProtectionGroupId());
        expect(vpgService.initSelectedVmsHandler).toHaveBeenCalledWith(user);
    });

    it('should not apply selected vms change when there is no vpg object', function () {
        spyOn(createVPGModel, 'isVpgObjectExist').and.returnValue(true);
        spyOn(createVPGModel, 'isVpgContainsVms').and.returnValue(true);
        spyOn(vpgService, 'isInEditMode').and.returnValue(true);
        spyOn(vmsService, 'preventSelectedVMsChange').and.returnValue(true);
        spyOn(vmsService, 'getAddedRemovedVms');

        vmsService.applySelectedVMsChange();
        expect(vmsService.getAddedRemovedVms).not.toHaveBeenCalled();
    });

    it('should not apply selected vms change when there is vpg object and there are no vms and were not in edit mode', function () {
        spyOn(createVPGModel, 'isVpgObjectExist').and.returnValue(true);
        spyOn(createVPGModel, 'isVpgContainsVms').and.returnValue(false);
        spyOn(vpgService, 'isInEditMode').and.returnValue(false);
        spyOn(vmsService, 'preventSelectedVMsChange').and.returnValue(true);
        spyOn(vmsService, 'getAddedRemovedVms');

        vmsService.applySelectedVMsChange();
        expect(vmsService.getAddedRemovedVms).not.toHaveBeenCalled();
    });

    it('should not apply selected vms change', function () {
        var addedRemoved = {added: ['1', '2'], removed: ['3', '4']};
        spyOn(createVPGModel, 'isVpgObjectExist').and.returnValue(true);
        spyOn(createVPGModel, 'isVpgContainsVms').and.returnValue(true);
        spyOn(createVPGModel, 'getTargetSite').and.returnValue(true);
        spyOn(createVPGModel, 'getTargetSiteType').and.returnValue(true);
        spyOn(vpgService, 'isInEditMode').and.returnValue(true);
        spyOn(vmsService, 'preventSelectedVMsChange').and.returnValue(false);
        spyOn(vmsService, 'getAddedRemovedVms').and.returnValue(addedRemoved);
        spyOn(vmsService, 'removeVmsFromVpgSettings');
        spyOn(vmsService, 'sendVmsForInitialization').and.returnValue({then: angular.noop});
        var result = vmsService.applySelectedVMsChange();
        expect(vmsService.getAddedRemovedVms).toHaveBeenCalled();
        expect(vmsService.removeVmsFromVpgSettings).toHaveBeenCalledWith(addedRemoved.removed);
        expect(vmsService.sendVmsForInitialization).toHaveBeenCalledWith(addedRemoved.added);
        expect(result.then).toBeDefined();
    });

    it('should not call send vms for init when there is no target site or target site type', function () {
        var addedRemoved = {added: ['1', '2'], removed: ['3', '4']};
        spyOn(createVPGModel, 'isVpgObjectExist').and.returnValue(true);
        spyOn(createVPGModel, 'isVpgContainsVms').and.returnValue(true);
        spyOn(createVPGModel, 'getTargetSite').and.returnValue(false);
        spyOn(createVPGModel, 'getTargetSiteType').and.returnValue(true);
        spyOn(vpgService, 'isInEditMode').and.returnValue(true);
        spyOn(vmsService, 'preventSelectedVMsChange').and.returnValue(false);
        spyOn(vmsService, 'getAddedRemovedVms').and.returnValue(addedRemoved);
        spyOn(vmsService, 'removeVmsFromVpgSettings');
        spyOn(vmsService, 'sendVmsForInitialization');
        vmsService.applySelectedVMsChange();
        expect(vmsService.getAddedRemovedVms).toHaveBeenCalled();
        expect(vmsService.sendVmsForInitialization).not.toHaveBeenCalled();
    });

    it('should clear the targets', function () {
        createVPGModel.data = {};
        vpgService.setTargetSite(1);
        vpgService.setTargetSiteType(1);
        storageService.setTargetOrgVdc(1);
        vmsService.clearTargets();
        expect(vpgService.getTargetSite()).toBeNull();
        expect(vpgService.getTargetSiteType()).toBeNull();
        expect(storageService.getTargetOrgVdc()).toBeNull();
    });

    it('should call set potentials vms when source is vc vpg when clear vms is called', function () {
        createVPGModel.data = {};
        createVPGModel.data.tmpVpgSettings = {};
        createVPGModel.data.sourceSiteType = {sourceType: enums.VpgEntityType.VCVpg};

        vmsService.setPotentialVms([{a: 1}, {b: 1}]);
        vmsService.setSelectedVms([{a: 3}, {b: 4}]);

        spyOn(vmsService, 'setPotentialVms');
        vmsService.clearVms();
        expect(vmsService.setPotentialVms).toHaveBeenCalledWith([{a: 1}, {b: 1}, {a: 3}, {b: 4}]);
    });

    it('should clear the vms', function () {
        createVPGModel.data = {
            tmpVpgSettings: {},
            sourceSiteType: {
                sourceType: enums.VpgEntityType.VCVpg
            }
        };

        spyOn(vmsService, 'setSelectedVms');
        vmsService.clearVms();
        expect(vmsService.setSelectedVms).toHaveBeenCalledWith([]);
    });

    it('should toggle vcd selected', function () {
        createVPGModel.data = {};
        spyOn(createVPGModel, 'setIsSourceVcd');
        vmsService.toggleVcdSelected(true);
        expect(createVPGModel.setIsSourceVcd).toHaveBeenCalledWith(true);

        vmsService.toggleVcdSelected(false);
        expect(createVPGModel.setIsSourceVcd).toHaveBeenCalledWith(false);
    });

    it('should not add vcd vapp when vcdVapp is null', function () {
        createVPGModel.data = {tmpVpgSettings: {}};
        spyOn(createVPGModel, 'setSelectedVcdVapp');
        var result = vmsService.addVcdVappAndSelectVms(null);
        expect(createVPGModel.setSelectedVcdVapp).not.toHaveBeenCalled();
        expect(result.then).toBeDefined();
    });

    it('should call set selected vcd vapp when add vcd vappp is called with a new vapp', function () {
        createVPGModel.data = {tmpVpgSettings: {}};
        var vapp = {Vapp: {VcdVappIdentifier: {VCDId: 1}}};
        spyOn(createVPGModel, 'setSelectedVcdVapp');
        vmsService.addVcdVappAndSelectVms(vapp);
        expect(createVPGModel.setSelectedVcdVapp).toHaveBeenCalledWith(vapp);
    });

    it('should get the vcd vapp vms', function () {
        createVPGModel.data = {defaultVpgSettings: {}, tmpVpgSettings: {vapp: {Vapp: {VcdVappIdentifier: {VCDId: 2}}}}};
        var vapp = {Vapp: {VcdVappIdentifier: {VCDId: 1}}};
        spyOn(zertoServiceFactory, 'GetSelectedVcdVappVms').and.returnValue({
            then: function (callback) {
                callback()
            }
        });
        spyOn(vmsService, 'setDefaultVmsToVcdVapp');
        vmsService.addVcdVappAndSelectVms(vapp);
        expect(zertoServiceFactory.GetSelectedVcdVappVms).toHaveBeenCalledWith(vapp.Vapp.VcdVappIdentifier);
        expect(vmsService.setDefaultVmsToVcdVapp).not.toHaveBeenCalled();
    });

    it('should set the vms to vcd vapp', function () {
        createVPGModel.data = {
            targetSite: true, targetSiteType: true, defaultVpgSettings: {},
            tmpVpgSettings: {vapp: {Vapp: {VcdVappIdentifier: {VCDId: 2}}}}
        };
        var vapp = {Vapp: {VcdVappIdentifier: {VCDId: 1}}};
        spyOn(zertoServiceFactory, 'GetSelectedVcdVappVms').and.returnValue({
            then: function (callback) {
                callback();
            }
        });
        spyOn(vmsService, 'setDefaultVmsToVcdVapp').and.returnValue({
            then: angular.noop
        });
        vmsService.addVcdVappAndSelectVms(vapp, true);
        expect(zertoServiceFactory.GetSelectedVcdVappVms).toHaveBeenCalledWith(vapp.Vapp.VcdVappIdentifier);

        expect(vmsService.setDefaultVmsToVcdVapp).toHaveBeenCalled();
    });

    it('should get the protected vapp settings', function () {
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.ProtectedVappSettings', {a: 1});
        spyOn(createVPGModel, 'getProtectedVappSettings').and.callThrough();
        var result = vmsService.getProtectedVappSettings();
        expect(createVPGModel.getProtectedVappSettings).toHaveBeenCalled();
        expect(result).toEqual({a: 1});
    });

    it('should get the selected vcd vapp', function () {
        _.set(createVPGModel, 'data.tmpVpgSettings.vapp', {a: 1});
        spyOn(createVPGModel, 'getSelectedVcdVapp').and.callThrough();
        var result = vmsService.getSelectedVcdVapp();
        expect(createVPGModel.getSelectedVcdVapp).toHaveBeenCalled();
        expect(result).toEqual({a: 1});
    });

    it('should set the selected vcd vapp', function () {
        _.set(createVPGModel, 'data.tmpVpgSettings.vapp', null);
        spyOn(createVPGModel, 'setSelectedVcdVapp').and.callThrough();
        vmsService.setSelectedVcdVapp({a: 1});
        expect(createVPGModel.setSelectedVcdVapp).toHaveBeenCalledWith({a: 1});
    });

    it('should create validation flags', function () {
        createVPGModel.data = {};
        vpgService.setIsReverse(false);
        var result = vmsService.createValidationFlags();
        expect(result).toEqual(new vos.VPGConfigurationCreateModifiersVisualObject(true));

        vpgService.setIsReverse(true);
        result = vmsService.createValidationFlags();
        expect(result).toEqual(new vos.VPGConfigurationCreateModifiersVisualObject(false));
    });

    it('should check if vm folder is configurable', function () {
        _.set(createVPGModel, 'data.defaultVpgSettings.ConfigurationFlags.IsVmFolderConfigurable', true);
        spyOn(createVPGModel, 'isVmFolderConfigurable').and.callThrough();
        var result = vmsService.isVmFolderConfigurable();
        expect(result).toBe(true);
    });

    it('should apply public cloud to vms', function () {
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.VirtualMachines', [{_isNewVm: true}, {_isNewVm: false}]);
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings', {
            "Pcn": {
                "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
            },
            "Subnet": {
                "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
            },
            "SecurityGroups": [{
                "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
            }],
            "PublicCloudInstanceTypeVisualObject": {
                "Id": {"InstanceType": "Standard_D3"},
                "Name": "Standard_D3",
                "FamilyName": "D-series"
            }
        });
        _.set(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings', {
            "Pcn": {
                "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
            },
            "Subnet": {
                "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
            },
            "SecurityGroups": [{
                "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
            }],
            "PublicCloudInstanceTypeVisualObject": {
                "Id": {"InstanceType": "Standard_D3"},
                "Name": "Standard_D3",
                "FamilyName": "D-series"
            }
        });

        vmsService.applyPublicCloudToVms();

        var result = vmsService.getInitializedSelectedVms();

        expect(result).toEqual([{
            "_isNewVm": true,
            "CloudVmSettings": {
                "FailoverSettings": {
                    "Pcn": {
                        "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                        "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
                    },
                    "Subnet": {
                        "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                        "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
                    },
                    "SecurityGroups": [{
                        "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                        "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
                    }],
                    "PublicCloudInstanceTypeVisualObject": {
                        "Id": {"InstanceType": "Standard_D3"},
                        "Name": "Standard_D3",
                        "FamilyName": "D-series"
                    }
                },
                "FailoverTestSettings": {
                    "Pcn": {
                        "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure (10.2.0.0/16)",
                        "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure"}
                    },
                    "Subnet": {
                        "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default(10.2.0.0/24) | default | Global",
                        "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/virtualNetworks/GilWinAzure/subnets/default"}
                    },
                    "SecurityGroups": [{
                        "Name": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure | GilWinAzure",
                        "Id": {"Identifier": "/subscriptions/f241e8fd-3c84-43eb-8e79-3ec50bd47e60/resourceGroups/GilWinAzure/providers/Microsoft.Network/networkSecurityGroups/GilWinAzure"}
                    }],
                    "PublicCloudInstanceTypeVisualObject": {
                        "Id": {"InstanceType": "Standard_D3"},
                        "Name": "Standard_D3",
                        "FamilyName": "D-series"
                    }
                }
            }
        }, {"_isNewVm": false}]);
    });

    it('should set the selected vcd vapp from protected settings', function () {
        createVPGModel.data = {tmpVpgSettings: {}};
        var protectedVappSettings = {};
        _.set(protectedVappSettings, 'VCDVappSettings.VCDVappDisplayName', 'name');
        _.set(protectedVappSettings, 'VCDVappSettings.OrgVirtualDatacenter.DisplayName', 'name2');
        _.set(protectedVappSettings, 'VCDVappSettings.VCDVappId', '000');
        vpgService.setIsReverse(true);
        var vcdVApp = new vos.VCDVappTableEntry('NA');
        vcdVApp.Vapp = new vos.VCDVappVisualObject(protectedVappSettings.VCDVappSettings.VCDVappDisplayName, null,
            protectedVappSettings.VCDVappSettings.VCDVappId);

        spyOn(helperService, 'initVcdVappForGrid');
        spyOn(createVPGModel, 'setSelectedVcdVapp');


        vmsService.setSelectedVCDVappFromProtectedSettings(protectedVappSettings);
        expect(helperService.initVcdVappForGrid).toHaveBeenCalledWith([vcdVApp]);
        expect(createVPGModel.setSelectedVcdVapp).toHaveBeenCalledWith(vcdVApp);

        vpgService.setIsReverse(false);
        vcdVApp.OwningVirtualDataCenterName = 'name2';
        vmsService.setSelectedVCDVappFromProtectedSettings(protectedVappSettings);
        expect(helperService.initVcdVappForGrid).toHaveBeenCalledWith([vcdVApp]);
        expect(createVPGModel.setSelectedVcdVapp).toHaveBeenCalledWith(vcdVApp);
    });

    it('should find vms by id', function () {
        var vms = [{Name: 'a', Id: 1}, {Name: 'aB', Id: 2}];
        var id = 1;
        var result = vmsService.findVmById(vms, id);

        expect(result.Name).toEqual('a');
    });

    it('should set default vms to vcd vapp', function () {
        createVPGModel.data = {tmpVpgSettings: {}};
        var site = '1', type = 1, vappId = '000',
            vpgSettings = {Config: {VirtualMachines: [{b: 1}, {c: 3}, {d: 5}], ProtectedVappSettings: {a: 1}}};
        spyOn(zertoServiceFactory, 'GetDefaultSettingsForNewProtectionGroupVCDVappContext').and.returnValue({
            then: function (callback) {
                callback(vpgSettings);
            }
        });
        spyOn(createVPGModel, 'setProtectedVappSettings');
        spyOn(helperService, 'initVmsForGrid');
        spyOn(vmsService, 'setSelectedVms').and.callThrough();
        spyOn(_, 'assign');

        vmsService.setDefaultVmsToVcdVapp(site, type, vappId);
        expect(zertoServiceFactory.GetDefaultSettingsForNewProtectionGroupVCDVappContext).toHaveBeenCalledWith(vappId, type, site);
        expect(createVPGModel.setProtectedVappSettings).toHaveBeenCalledWith(vpgSettings.Config.ProtectedVappSettings);
        expect(helperService.initVmsForGrid).toHaveBeenCalledWith(vpgSettings.Config.VirtualMachines);
        expect(vmsService.setSelectedVms).toHaveBeenCalledWith(vpgSettings.Config.VirtualMachines);
        expect(_.assign).toHaveBeenCalledWith(vmsService.getSelectedVms(), {_isNewVm: true});
    });

    it('should calculate the vms size', function () {
        var vms = [{SizeInMb: 5}, {SizeInMb: 15}, {SizeInMb: 3}],
            result = vmsService.getVmsSize(vms);


        expect(result).toEqual(23);
    });
});
