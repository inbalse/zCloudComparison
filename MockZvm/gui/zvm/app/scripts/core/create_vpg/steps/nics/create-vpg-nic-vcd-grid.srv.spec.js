'use strict';

describe('create-vpg - nics - vc grid', function () {

    var createVpgNicVCDGridService,
        createVpgNicConstants,
        networksService,
        createVPGModel,
        vpgService,
        enums,
        innerFilterSpy, filter,
        createVpgNicNetworkVCDEditorService,
        createVpgNicMacEditorService;

    beforeEach(module('zvmTest'));

    beforeEach(function () {
        innerFilterSpy = jasmine.createSpy();
        filter = jasmine.createSpy().and.returnValue(innerFilterSpy);

        module(function ($provide) {
            $provide.value('$filter', filter);
        });
    });

    beforeEach(inject(function (_createVpgNicVCDGridService_, _createVpgNicNetworkVCDEditorService_, _createVpgNicConstants_,
                                _createVpgNicMacEditorService_,
                                _vpgService_, _networksService_, _createVPGModel_, _enums_) {
        createVpgNicVCDGridService = _createVpgNicVCDGridService_;
        createVpgNicConstants = _createVpgNicConstants_;
        createVpgNicNetworkVCDEditorService = _createVpgNicNetworkVCDEditorService_;
        createVpgNicMacEditorService = _createVpgNicMacEditorService_;
        networksService = _networksService_;
        createVPGModel = _createVPGModel_;
        vpgService = _vpgService_;
        enums = _enums_;
        createVPGModel.data = {};

        vpgService.setVpgSettings({
            Entities: {Target: {}, Source: {}}
        });
    }));


    it('should init the vcd grid object', function () {
        //init nics for grid
        networksService.setVmsVcdNicsList([1, 2, 3]);

        var isVCDToVCD = true;
        var gridObj = createVpgNicVCDGridService.init(isVCDToVCD);

        expect(gridObj.id).toEqual(createVpgNicConstants.GRID.IDS.VCDvVCD);
        expect(gridObj.data).toEqual(networksService.getVmsVcdNicsList());
        expect(gridObj.groupByValues).toEqual(createVpgNicConstants.GRID.GROUP_BY_VALUES);
        expect(gridObj.viewByValues).toEqual(createVpgNicConstants.GRID.VIEW_BY_VALUES);
        expect(typeof gridObj.onValidationUpdate).toBe('function');
        expect(gridObj.onValidationUpdate().then).toBeDefined();

        expect(gridObj.customOptions.showSearch).toBe(true);
        expect(typeof gridObj.customOptions.editCommandHandler).toBe('function');
        expect(Array.isArray(gridObj.customOptions.columns)).toBe(true);

        isVCDToVCD = false;
        gridObj = createVpgNicVCDGridService.init(isVCDToVCD);
        expect(gridObj.id).toEqual(createVpgNicConstants.GRID.IDS.VCvVCD);
    });

    it('should verify grid columns', function () {
        var isVCDToVCD = true,
            columns = createVpgNicVCDGridService.getColumnDefs(isVCDToVCD);

        expect(findNameAndField('NIC#', createVpgNicConstants.COLUMNS.VCD.INDEX)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.VM_NAME', createVpgNicConstants.COLUMNS.VM_NAME)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.F_CONNECTED_TO_ORG_VDC_NETWORK', createVpgNicConstants.COLUMNS.VCD.FAILOVER_CONNECTED)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.T_CONNECTED_TO_ORG_VDC_NETWORK', createVpgNicConstants.COLUMNS.VCD.TEST_CONNECTED)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.F_USE_PRIMARY_NIC', createVpgNicConstants.COLUMNS.VCD.FAILOVER_PRIMARY)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.T_USE_PRIMARY_NIC', createVpgNicConstants.COLUMNS.VCD.TEST_PRIMARY)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.IP_ADDRESS', createVpgNicConstants.COLUMNS.FAILOVER_IP)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.IP_ADDRESS', createVpgNicConstants.COLUMNS.TEST_IP)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.FAILOVER_MAC_ADDRESS', createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.TEST_MAC_ADDRESS', createVpgNicConstants.COLUMNS.VCD.TEST_MAC)).toBe(true);

        isVCDToVCD = false;
        columns = createVpgNicVCDGridService.getColumnDefs(isVCDToVCD);

        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.VCD_NETWORK', createVpgNicConstants.COLUMNS.FAILOVER_NETWORK)).toBe(true);
        expect(findNameAndField('CREATE_VPG_NICS.COLUMNS.VCD_NETWORK', createVpgNicConstants.COLUMNS.TEST_NETWORK)).toBe(true);

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
                execute: angular.noop,
                editor: {}
            };

        spyOn(command, 'execute');

        column.field = createVpgNicConstants.COLUMNS.VCD.FAILOVER_CONNECTED;
        result = createVpgNicVCDGridService.handleVCDCommand(column, command);
        expect(result).toEqual(true);
        expect(command.editor.applyValue).toBe(networksService.applyValueFailoverConnected);

        column.field = createVpgNicConstants.COLUMNS.VCD.TEST_CONNECTED;
        result = createVpgNicVCDGridService.handleVCDCommand(column, command);
        expect(result).toEqual(true);
        expect(command.editor.applyValue).toBe(networksService.applyValueTestConnected);

        column.field = createVpgNicConstants.COLUMNS.VCD.FAILOVER_PRIMARY;
        result = createVpgNicVCDGridService.handleVCDCommand(column, command);
        expect(result).toEqual(false);
        expect(command.editor.applyValue).toBe(createVpgNicVCDGridService.applyValueFailoverPrimary);

        column.field = createVpgNicConstants.COLUMNS.VCD.TEST_PRIMARY;
        result = createVpgNicVCDGridService.handleVCDCommand(column, command);
        expect(command.editor.applyValue).toBe(createVpgNicVCDGridService.applyValueTestPrimary);
        expect(result).toEqual(false);

        command.editor = {};
        column.field = createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC;
        result = createVpgNicVCDGridService.handleVCDCommand(column, command);
        expect(command.editor.applyValue).toBe(undefined);

        expect(result).toEqual(true);


        expect(command.execute).toHaveBeenCalledTimes(5);

    });

    it('should get the nic vcd network editor', function () {
        var prop = 'test';
        createVpgNicVCDGridService.getNicVcdNetworkEditor(prop);
        expect(filter).toHaveBeenCalledWith('zInlineDropdownEditor');
        expect(innerFilterSpy).toHaveBeenCalledWith(createVpgNicNetworkVCDEditorService.getEditor(prop));
    });

    it('should get the mac address editor', function () {
        var prop = 'test';
        createVpgNicVCDGridService.getMacAddressVcdEditor(prop);
        expect(filter).toHaveBeenCalledWith('zInlineDropdownEditor');
        expect(innerFilterSpy).toHaveBeenCalledWith(createVpgNicMacEditorService.getEditor(prop));
    });

    it('should apply failover primary', function () {
        var item = {cool: 1};
        spyOn(createVpgNicVCDGridService, 'resetPrimaryNicGrid');
        spyOn(networksService, 'applyValueFailoverPrimary');
        createVpgNicVCDGridService.applyValueFailoverPrimary(item);
        expect(createVpgNicVCDGridService.resetPrimaryNicGrid).toHaveBeenCalledWith(item, 'FailoverSettings', 'FailoverPrimary');
        expect(networksService.applyValueFailoverPrimary).toHaveBeenCalledWith(item);
    });

    it('should apply test primary', function () {
        var item = {cool: 1};
        spyOn(createVpgNicVCDGridService, 'resetPrimaryNicGrid');
        spyOn(networksService, 'applyValueTestPrimary');
        createVpgNicVCDGridService.applyValueTestPrimary(item);
        expect(createVpgNicVCDGridService.resetPrimaryNicGrid).toHaveBeenCalledWith(item, 'TestSettings', 'TestPrimary');
        expect(networksService.applyValueTestPrimary).toHaveBeenCalledWith(item);
    });

    it('should reset primary nic', function () {
        var gridObj = createVpgNicVCDGridService.init(true);
        gridObj.data = [
            {
                vmId: {
                    InternalVmName: 1
                },
                FailoverPrimary:true,
                FailoverSettings: {
                    VCDNetworkSettings: {
                        NicInfo: {
                            IsPrimary: true
                        }

                    }
                }
            }, {
                vmId: {
                    InternalVmName: 1
                },
                FailoverPrimary:true,
                FailoverSettings: {
                    VCDNetworkSettings: {
                        NicInfo: {
                            IsPrimary: true
                        }

                    }
                }
            },
            {
                vmId: {
                    InternalVmName: 3
                },
                FailoverPrimary:true,
                FailoverSettings: {
                    VCDNetworkSettings: {
                        NicInfo: {
                            IsPrimary: true
                        }

                    }
                }
            }
        ];
        var item = {
            vmId: {
                InternalVmName: 1
            }
        };
        gridObj.grid = {
            updateData: angular.noop
        };
        spyOn(gridObj.grid, 'updateData');

        createVpgNicVCDGridService.resetPrimaryNicGrid(item, 'FailoverSettings', 'FailoverPrimary');

        expect(gridObj.grid.updateData).toHaveBeenCalledWith(gridObj.data);

        expect(gridObj.data[0].FailoverPrimary).toBe(false);
        expect(gridObj.data[0].FailoverSettings.VCDNetworkSettings.NicInfo.IsPrimary).toBe(false);
        expect(gridObj.data[1].FailoverPrimary).toBe(false);
        expect(gridObj.data[1].FailoverSettings.VCDNetworkSettings.NicInfo.IsPrimary).toBe(false);
        expect(gridObj.data[2].FailoverPrimary).toBe(true);
        expect(gridObj.data[2].FailoverSettings.VCDNetworkSettings.NicInfo.IsPrimary).toBe(true);

    });


});
