'use strict';

describe('createVPGModelTest', function () {
    var model, dataCollectionFactory, enums, resetObject, zertoServiceFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_createVPGModel_, _dataCollectionFactory_, _enums_, _zertoServiceFactory_) {
        model = _createVPGModel_;
        dataCollectionFactory = _dataCollectionFactory_;
        enums = _enums_;
        zertoServiceFactory = _zertoServiceFactory_;

        resetObject = {
            tmpVpgSettings: {
                isTmp: true
            },
            copyNatRulesCollection: dataCollectionFactory.COPY_NAT_SERVICE_COLLECTION,
            priority: enums.ProtectionGroupPriority.Medium,
            RPOAlert: 1,
            isSlaCustom: true
        };
    }));

    it('should have functions and properties', function () {
        expect(model.reset).toBeDefined();
        expect(model.setVpgSettings).toBeDefined();
        expect(model.getTargetHostRecoveryComputeResource).toBeDefined();
        expect(model.initSelectedZorg).toBeDefined();
        expect(model.getDefaultNetworkNone).toBeDefined();
        expect(model.valueValidate).toBeDefined();
        expect(model.appendBootOrderGroup).toBeDefined();
        expect(model.initSourceSiteTypeCollection).toBeDefined();
        expect(model._applyNewHostSelection).toBeDefined();
        expect(model._applyNewHostSelectionToVM).toBeDefined();
        expect(model.setSelectedDataStore).toBeDefined();
        expect(model.preDoneValidations).toBeDefined();
        expect(model.sendCreateVPG).toBeDefined();
        expect(model.sendUpdateVPG).toBeDefined();
        expect(model._updateVPG).toBeDefined();
        expect(model._createRemovedVMList).toBeDefined();
        expect(model._getNicProtectedIP).toBeDefined();
        expect(model._updateStorageProfileForVM).toBeDefined();
        expect(model.checkOrgVirtualDatacenterExists).toBeDefined();
        expect(model.getTotalProvisionedSpace).toBeDefined();
        expect(model.handleChangingDefaultValues).toBeDefined();
        expect(model.getPotentialVms).toBeDefined();
        expect(model.getConfigDefaults).toBeDefined();
        expect(model.getConfig).toBeDefined();
        expect(model.getVpgSettings).toBeDefined();
        expect(model.getVcdVappSettings).toBeDefined();
        expect(model.getTargetOrgVdc).toBeDefined();
        expect(model.setTargetOrgVdc).toBeDefined();
        expect(model.setProtectionGroupId).toBeDefined();
        expect(model.getProtectionGroupId).toBeDefined();
        expect(model.setPotentialVms).toBeDefined();
        expect(model.extendVpgSettings).toBeDefined();
        expect(model.setIsSourceVcd).toBeDefined();
        expect(model.setConfigDefaultsByKey).toBeDefined();
        expect(model.getEditValidationFlags).toBeDefined();
        expect(model.setEditValidationFlags).toBeDefined();
        expect(model.getCreateValidationFlags).toBeDefined();
        expect(model.setCreateValidationFlags).toBeDefined();
        expect(model.setPotentialMappingNetworks).toBeDefined();
        expect(model.getPotentialMappingNetworks).toBeDefined();
    });

    it('should check is reset object build correctly', function () {
        model.reset();
        expect(model.data).toEqual(resetObject);
    });

    it('should check function calling per not reverse type', function () {
        spyOn(zertoServiceFactory, 'GetRecoveryComputeResourceForReverseConfig');
        spyOn(zertoServiceFactory, 'GetRecoveryComputeResource');

        var vpgSettings = {ProtectionGroupId: 1, Config: {OwnersId: 2}};
        var targetHost = {ComputeResource: {BaseComputeResourceIdentifier: 11}};

        model.data = {isReverseMode: false};
        model.getTargetHostRecoveryComputeResource(vpgSettings, targetHost);
        expect(zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig).not.toHaveBeenCalled();
        expect(zertoServiceFactory.GetRecoveryComputeResource).toHaveBeenCalled();
    });

    it('should check function calling per reverse type', function () {
        spyOn(zertoServiceFactory, 'GetRecoveryComputeResourceForReverseConfig');
        spyOn(zertoServiceFactory, 'GetRecoveryComputeResource');

        var vpgSettings = {ProtectionGroupId: 1, Config: {OwnersId: 2}};
        var targetHost = {ComputeResource: {BaseComputeResourceIdentifier: 11}};

        model.data = {isReverseMode: true};
        model.getTargetHostRecoveryComputeResource(vpgSettings, targetHost);
        expect(zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig).toHaveBeenCalled();
        expect(zertoServiceFactory.GetRecoveryComputeResource).not.toHaveBeenCalled();
    });

    describe('Boot Groups functionality', function () {
        it('should return true for BootGroup without VMs if there is just one empty group', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: []}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeTruthy();
        });

        it('should return true for BootGroup without VMs for at least one group without VMs', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: [{}]}, {Machines: []}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeTruthy();
        });

        it('should return false for BootGroup with VMs for one group with one VM', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: [{}]}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeFalsy();
        });

        it('should return false for BootGroup with VMs for groups with at least one VM', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: [{}]}, {Machines: [{}]}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeFalsy();
        });
    });

});
describe('Boot Groups functionality', function () {
        it('should return true for BootGroup without VMs if there is just one empty group', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: []}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeTruthy();
        });

        it('should return true for BootGroup without VMs for at least one group without VMs', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: [{}]}, {Machines: []}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeTruthy();
        });

        it('should return false for BootGroup with VMs for one group with one VM', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: [{}]}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeFalsy();
        });

        it('should return false for BootGroup with VMs for groups with at least one VM', function () {
            model.data = {defaultVpgSettings: {Config: {Configuration: {BootOrder: {Groups: [{Machines: [{}]}, {Machines: [{}]}]}}}}};
            expect(model.hasEmptyBootGroups()).toBeFalsy();
        });
    });
