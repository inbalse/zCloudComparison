'use strict';

describe('Create vpg nic network editor service', function () {
    var createVpgNicNetworkVCDEditorService, vpgService, enums, createVpgNicConstants;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_createVpgNicNetworkVCDEditorService_, _vpgService_, _createVpgNicConstants_, _enums_) {

        createVpgNicNetworkVCDEditorService = _createVpgNicNetworkVCDEditorService_;
        createVpgNicConstants = _createVpgNicConstants_;
        vpgService = _vpgService_;
        vpgService.getComputeResources = function () {
            return {
                Networks: [
                    {dummy: 1},
                    {dummy: 2},
                    {dummy: 3}
                ]
            };
        };

        enums = _enums_;
    }));

    it('should initialize the editor', function () {
        var editor = createVpgNicNetworkVCDEditorService.getEditor('prop');

        expect(editor.className).toEqual(createVpgNicConstants.EDITOR_CLASSES.NETWORK.VCD);
        expect(editor.propName).toEqual('prop');
        expect(editor.optionsCollection()).toEqual([
            {dummy: 1},
            {dummy: 2},
            {dummy: 3}
        ]);
        expect(editor.searchEnabled).toBeFalsy();
        expect(typeof editor.uiSelectModel).toBe('function');
        expect(typeof editor.applyValue).toBe('function');
        expect(typeof editor.loadValue).toBe('function');
        expect(typeof editor.serializeValue).toBe('function');
        expect(typeof editor.getItemDisplayProperty).toBe('function');
    });

    it('should clone the editor object', function () {
        var editor = createVpgNicNetworkVCDEditorService.getEditor('prop');
        var editor2 = createVpgNicNetworkVCDEditorService.getEditor('prop');

        expect(editor).not.toBe(editor2);
    });

    it('should return the display property', function () {
        var editor = createVpgNicNetworkVCDEditorService.getEditor('prop'),
            result = editor.getItemDisplayProperty();

        expect(result).toEqual('NetworkName');
    });

    it('should serialize the nic network value', function () {
        var editor = createVpgNicNetworkVCDEditorService.getEditor('prop'),
            result, dummy = {};

        dummy[editor.getItemDisplayProperty()] = 1;

        result = editor.serializeValue(dummy);
        expect(result).toEqual(1);
    });

    it('should get network name by type', function () {
        var editor = createVpgNicNetworkVCDEditorService.getEditor('prop'),
            result, item = {};

        _.set(item, 'FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName', 'Name');
        _.set(item, 'TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName', 'Name2');

        result = editor.uiSelectModel(item, createVpgNicConstants.COLUMNS.FAILOVER_NETWORK);
        expect(result).toEqual('Name');
        result = editor.uiSelectModel(item, createVpgNicConstants.COLUMNS.TEST_NETWORK);
        expect(result).toEqual('Name2');
    });

    it('should apply the vcd network', function () {
        var editor = createVpgNicNetworkVCDEditorService.getEditor('prop'),
            prop = createVpgNicConstants.COLUMNS.FAILOVER_NETWORK, item = {};

        _.set(item, 'FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName', null);

        editor.applyValue(item, 'Name', prop);

        expect(item.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName).toEqual('Name');
        expect(item[prop]).toEqual('Name');
    });

    it('should set ip mode to none when selecting none network', function () {
        var editor = createVpgNicNetworkVCDEditorService.getEditor('prop'),
            prop = createVpgNicConstants.COLUMNS.FAILOVER_NETWORK, item = {};

        _.set(item, 'FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName', null);
        _.set(item, 'FailoverSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType', enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool);

        editor.applyValue(item, 'none', prop);
        expect(item.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName).toEqual('none');
        expect(item.FailoverSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType).toEqual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.None);
        expect(item[prop]).toEqual('none');
    });
});

