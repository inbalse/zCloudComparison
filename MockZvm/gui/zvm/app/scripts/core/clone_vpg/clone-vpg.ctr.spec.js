'use strict';

describe('cloneVpgControllerTest', function () {
    var scope, controller, factory, configureCheckpointFactory, datastores, vpgName, vpgId, checkpoint, openPlace;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data:{VirtualizationProviderType: null}});
    }));

    beforeEach(inject(function ($controller, $rootScope, _$translate_, _cloneVpgFactory_, vos, _configureCheckpointFactory_) {
        scope = $rootScope.$new();
        factory = _cloneVpgFactory_;
        configureCheckpointFactory = _configureCheckpointFactory_;

        datastores = [];
        vpgName = 'testVpgName';
        vpgId = new vos.ProtectionGroupIdentifier();
        vpgId.GroupGuid = 'VPG id';
        checkpoint = {"Identifier": {"Identifier": 9978}, "TimeStamp": "2014-09-17T04:39:19.164Z", "Tag": null, "Vss": false};
        openPlace = 'test place';

        controller = $controller('cloneVpgController', {$scope: scope, $translate: _$translate_, cloneVpgFactory: factory, datastores: datastores,
            vpgName: vpgName, vpgId: vpgId, checkpoint: checkpoint, openPlace:openPlace, configureCheckpointFactory: configureCheckpointFactory});
    }));

    it('should have all the props and funcs in place', function () {
        //props
        expect(scope.loading).toBeFalsy('testVpgName');
        expect(scope.vpgName).toEqual(vpgName);
        expect(scope.vpgId).toEqual(vpgId);
        expect(scope.datastores).toEqual(datastores);
        expect(scope.data.checkpoint).toEqual(checkpoint);
        expect(scope.data.datastore).toEqual(null);
        expect(scope.forms).toEqual({});

        //funcs
        expect(scope.handleConfigureCheckpointClick).toBeDefined();
        expect(scope.handleSave).toBeDefined();
        expect(scope.handleCancel).toBeDefined();
    });

    it('should call configureCheckpointFactory.open when the configure checkpoint button clicked', function () {
        spyOn(configureCheckpointFactory, 'open').and.callThrough();
        scope.handleConfigureCheckpointClick();
        expect(configureCheckpointFactory.open).toHaveBeenCalled();
    });

    it('should not require datastores if its empty', function () {
        expect(scope.isDatastoreRequired).toBeFalsy();
    })
});
