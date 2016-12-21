'use strict';

describe('Create vpg nic network editor service', function () {
    var createVpgNicNetworkEditorService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_createVpgNicNetworkEditorService_) {
        createVpgNicNetworkEditorService = _createVpgNicNetworkEditorService_;
    }));

    it('should return the editor with with the supplied property', function () {
        var prop = 'testProp';
        var editor = createVpgNicNetworkEditorService.getEditor(prop);

        expect(editor.propName).toEqual(prop);
    });

    it('should get test settings when property is test network', function () {
        var item = {
                TestSettings: {
                    VCenterNetworkSettings: {
                        RecoveryNetwork: {}
                    }
                }
            },
            prop = 'TestNetwork';
        var editor = createVpgNicNetworkEditorService.getEditor(prop);
        var network = editor.uiSelectModel(item, prop); // gets VCenterNetworkSettings.RecoveryNetwork
        expect(network).not.toBeNull();
        network = editor.loadValue(item, prop); // gets VCenterNetworkSettings.RecoveryNetwork
        expect(network).not.toBeNull();

    });

    it('should get failover settings when property is failover network', function () {
        var item = {
                FailoverSettings: {
                    VCenterNetworkSettings: {
                        RecoveryNetwork: {}
                    }
                }
            },
            prop = 'FailoverNetwork';

        var editor = createVpgNicNetworkEditorService.getEditor(prop);
        var network = editor.uiSelectModel(item, prop); // gets VCenterNetworkSettings.RecoveryNetwork
        expect(network).not.toBeNull();
        network = editor.loadValue(item, prop); // gets VCenterNetworkSettings.RecoveryNetwork
        expect(network).not.toBeNull();
    });

    it('should apply test network to test settings when property is test network', function () {
        var item = {
                TestSettings: {
                    VCenterNetworkSettings: {
                        RecoveryNetwork: null
                    }
                }
            },
            value = {}, //just not null
            prop = 'TestNetwork';

        var editor = createVpgNicNetworkEditorService.getEditor(prop);
        editor.applyValue(item,value,prop);
        var network = editor.loadValue(item,prop);
        expect(network).not.toBeNull();
    });

    it('should get failover settings when property is failover network', function () {
        var item = {
                FailoverSettings: {
                    VCenterNetworkSettings: {
                        RecoveryNetwork: null
                    }
                }
            },
            value = {}, //just not null
            prop = 'FailoverNetwork';

        var editor = createVpgNicNetworkEditorService.getEditor(prop);
        editor.applyValue(item,value,prop);
        var network = editor.loadValue(item,prop);
        expect(network).not.toBeNull();
    });

    it('should check search is disabled', function () {
        var editor = createVpgNicNetworkEditorService.getEditor('');

        expect(editor.searchEnabled).toBeFalsy();
    });
});
