'use strict';

describe('create-vpg - nics - vc grid', function () {

    var createVpgNicVCGridService,
        createVpgNicConstants,
        networksService,
        createVPGModel,
        enums,
        innerFilterSpy, filter,
        createVpgNicNetworkEditorService;

    beforeEach(module('zvmTest'));

    beforeEach(function () {
        innerFilterSpy = jasmine.createSpy();
        filter = jasmine.createSpy().and.returnValue(innerFilterSpy);

        module(function ($provide) {
            $provide.value('$filter', filter);
        });
    });

    beforeEach(inject(function (_createVpgNicVCGridService_, _createVpgNicNetworkEditorService_, _createVpgNicConstants_, _networksService_, _createVPGModel_, _enums_) {
        createVpgNicVCGridService = _createVpgNicVCGridService_;
        createVpgNicConstants = _createVpgNicConstants_;
        createVpgNicNetworkEditorService = _createVpgNicNetworkEditorService_;
        networksService = _networksService_;
        createVPGModel = _createVPGModel_;
        enums = _enums_;
        createVPGModel.data = {};
    }));

    it('should init the vc grid object', function () {
        var source = '',
            target = '';

        //init nics for grid
        networksService.setVmsNicsList([1, 2, 3]);

        var gridObj = createVpgNicVCGridService.init(source, target);


        expect(gridObj.id).toEqual(createVpgNicConstants.GRID.IDS.VC);
        expect(gridObj.data).toEqual(networksService.getVmsNicsList());
        expect(gridObj.groupByValues).toEqual(createVpgNicConstants.GRID.GROUP_BY_VALUES);
        expect(typeof gridObj.onValidationUpdate).toBe('function');
        expect(gridObj.onValidationUpdate().then).toBeDefined();


        expect(gridObj.customOptions.showSearch).toBe(true);
        expect(typeof gridObj.customOptions.editCommandHandler).toBe('function');
        expect(Array.isArray(gridObj.customOptions.columns)).toBe(true);
    });

    it('should verify grid columns', function () {
        var columns = createVpgNicVCGridService.getColumnDefs();
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.VM_NAME', createVpgNicConstants.COLUMNS.VM_NAME)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.NIC_NAME', createVpgNicConstants.COLUMNS.VC.NIC_NAME)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.PROTECTED_NETWORK', createVpgNicConstants.COLUMNS.VC.PROTECTED_NETWORK)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.FAILOVER_NETWORK', createVpgNicConstants.COLUMNS.FAILOVER_NETWORK)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.FAILOVER_IP', createVpgNicConstants.COLUMNS.FAILOVER_IP)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.TEST_NETWORK', createVpgNicConstants.COLUMNS.TEST_NETWORK)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.TEST_IP', createVpgNicConstants.COLUMNS.TEST_IP)).toBe(true);

        function findNameAndField(name, field) {
            var result = false;
            columns.forEach(function (c) {
                result = result || (c.name === name && c.field === field);
            });

            return result;
        }

    });

    it('should test grid handle command', function () {
        var result,
            column = {},
            command = {
                execute: angular.noop
            };

        spyOn(command, 'execute');

        column.field = createVpgNicConstants.COLUMNS.FAILOVER_IP;
        result = createVpgNicVCGridService.handleCommand(column, command);
        expect(result).toEqual(false);

        column.field = createVpgNicConstants.COLUMNS.TEST_IP;
        result = createVpgNicVCGridService.handleCommand(column, command);
        expect(result).toEqual(false);

        column.field = createVpgNicConstants.COLUMNS.FAILOVER_NETWORK;
        result = createVpgNicVCGridService.handleCommand(column, command);
        expect(result).toEqual(true);

        column.field = createVpgNicConstants.COLUMNS.VC.PROTECTED_NETWORK;
        result = createVpgNicVCGridService.handleCommand(column, command);
        expect(result).toEqual(true);

        expect(command.execute).toHaveBeenCalledTimes(4);

    });

    describe('it should test getIpInfoTextAndPosition', function () {
        var source, target, isTestIp, result;
        it('should test vc to vc', function () {
            source = enums.VpgEntityType.VCVpg;
            target = enums.VpgEntityType.VCVpg;
            createVpgNicVCGridService.init(source, target);

            isTestIp = false;
            result = createVpgNicVCGridService.getIpInfoTextAndPosition(isTestIp);
            expect(result).toEqual({text: 'EDIT_NIC.VC_TO_VC_INFO', top: 35, left: 140});
            isTestIp = true;
            result = createVpgNicVCGridService.getIpInfoTextAndPosition(isTestIp);
            expect(result).toEqual({text: 'EDIT_NIC.VC_TO_VC_INFO', top: 120, left: 35});
        });

        it('should test hyperv to hyperv', function () {
            source = enums.VpgEntityType.HyperV;
            target = enums.VpgEntityType.HyperV;
            createVpgNicVCGridService.init(source, target);

            isTestIp = false;
            result = createVpgNicVCGridService.getIpInfoTextAndPosition(isTestIp);
            expect(result).toEqual({text: 'EDIT_NIC.HYPER_V_TO_HYPER_V', top: 35, left: 140});
            isTestIp = true;
            result = createVpgNicVCGridService.getIpInfoTextAndPosition(isTestIp);
            expect(result).toEqual({text: 'EDIT_NIC.HYPER_V_TO_HYPER_V', top: 120, left: 35});
        });

        it('should test others types', function () {
            source = enums.VpgEntityType.VCDvApp;
            target = enums.VpgEntityType.VCDvApp;
            createVpgNicVCGridService.init(source, target);

            isTestIp = false;
            result = createVpgNicVCGridService.getIpInfoTextAndPosition(isTestIp);
            expect(result).toEqual({text: 'EDIT_NIC.MIXED_TYPE_INFO', top: 52, left: 150});
            isTestIp = true;
            result = createVpgNicVCGridService.getIpInfoTextAndPosition(isTestIp);
            expect(result).toEqual({text: 'EDIT_NIC.MIXED_TYPE_INFO', top: 154, left: 56});
        });
    });

    it('should get the nic network editor', function () {
        var prop = 'test';
        createVpgNicVCGridService.getNicNetworkEditor(prop);
        expect(filter).toHaveBeenCalledWith('zInlineDropdownEditor');
        expect(innerFilterSpy).toHaveBeenCalledWith(createVpgNicNetworkEditorService.getEditor(prop));
    });

});
