'use strict';

describe('Create vpg nic mac editor service', function () {
    var createVpgNicMacEditorService, createVpgNicConstants;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_createVpgNicMacEditorService_, _createVpgNicConstants_) {
        createVpgNicMacEditorService = _createVpgNicMacEditorService_;
        createVpgNicConstants = _createVpgNicConstants_;
    }));

    it('should initialize the editor', function () {
        var editor = createVpgNicMacEditorService.getEditor('prop');

        expect(editor.className).toEqual(createVpgNicConstants.EDITOR_CLASSES.MAC);
        expect(editor.propName).toEqual('prop');
        expect(editor.optionsCollection).toEqual([{display: 'Reset'}]);
        expect(editor.searchEnabled).toBeFalsy();
        expect(typeof editor.uiSelectModel).toBe('function');
        expect(typeof editor.applyValue).toBe('function');
        expect(typeof editor.loadValue).toBe('function');
        expect(typeof editor.serializeValue).toBe('function');
    });

    it('should clone the editor object', function () {
        var editor = createVpgNicMacEditorService.getEditor('prop');
        var editor2 = createVpgNicMacEditorService.getEditor('prop');

        expect(editor).not.toBe(editor2);
    });

    it('should apply failover mac address value', function () {
        var item = {},
            value = 'Reset',
            prop = createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC;

        var editor = createVpgNicMacEditorService.getEditor('prop');

        _.set(item, 'FailoverSettings.VCDNetworkSettings.NewMacAddress.MacAddress', null);
        editor.applyValue(item, value, prop);
        expect(item.FailoverSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toEqual('');
        expect(item[prop]).toEqual(value);

        value = '00:00:00:00';
        editor.applyValue(item, value, prop);
        expect(item.FailoverSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toEqual(value);
        expect(item[prop]).toEqual(value);


        value = null;
        item = {};
        _.set(item, 'FailoverSettings.VCDNetworkSettings.NewMacAddress.MacAddress', null);
        editor.applyValue(item, value, prop);
        expect(item.FailoverSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toBe(null);
        expect(item[prop]).toBeUndefined();
    });

    it('should apply test mac address value', function () {
        var item = {},
            value = 'Reset',
            prop = createVpgNicConstants.COLUMNS.VCD.TEST_MAC;

        var editor = createVpgNicMacEditorService.getEditor('prop');


        _.set(item, 'TestSettings.VCDNetworkSettings.NewMacAddress.MacAddress', null);
        editor.applyValue(item, value, prop);
        expect(item.TestSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toEqual('');
        expect(item[prop]).toEqual(value);

        value = '00:00:00:00';
        editor.applyValue(item, value, prop);
        expect(item.TestSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toEqual(value);
        expect(item[prop]).toEqual(value);


        value = null;
        item = {};
        _.set(item, 'TestSettings.VCDNetworkSettings.NewMacAddress.MacAddress', null);
        editor.applyValue(item, value, prop);
        expect(item.TestSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toBe(null);
        expect(item[prop]).toBeUndefined();
    });

    it('should load the mac address values', function () {
        var editor = createVpgNicMacEditorService.getEditor('prop'),
            item = {};

        _.set(item, 'FailoverSettings.VCDNetworkSettings.NicInfo.MacAddress', '1');
        var result = editor.loadValue(item, createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC);
        expect(result).toEqual('1');
        expect(editor.optionsCollection[1]).toEqual({display: '1'});
    });

    it('should serialize the mac address value', function () {
        var model = {
                display: '1'
            },
            editor = createVpgNicMacEditorService.getEditor('prop'),
            result = editor.serializeValue(model);

        expect(result).toEqual('1');
    });

    it('should get mac address by vcd type', function () {
        var editor = createVpgNicMacEditorService.getEditor('prop'),
            item = {},
            result = editor.uiSelectModel(item, createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC);
        expect(result).toBeNull();

        result = editor.uiSelectModel(item, createVpgNicConstants.COLUMNS.VCD.TEST_MAC);
        expect(result).toBeNull();

        _.set(item, 'FailoverSettings.VCDNetworkSettings.NicInfo.MacAddress', '1');
        result = editor.uiSelectModel(item, createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC);
        expect(result).toEqual('1');

        _.set(item, 'TestSettings.VCDNetworkSettings.NicInfo.MacAddress', '1');
        result = editor.uiSelectModel(item, createVpgNicConstants.COLUMNS.VCD.TEST_MAC);
        expect(result).toEqual('1');
    });
});
