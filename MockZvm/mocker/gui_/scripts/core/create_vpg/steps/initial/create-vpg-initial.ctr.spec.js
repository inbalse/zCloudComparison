'use strict';

describe('createVPGInitialControllerTest', function () {
    var scope, model, controller;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _createVPGModel_) {
        scope = $rootScope.$new();
        model = _createVPGModel_;

        spyOn(scope, '$watch').and.callThrough();

        model.data = {defaultVpgSettings: {Config: { Configuration: {Priority: 0}, Name: 'test1'}}};

        controller = $controller('createVPGInitialController', {$scope: scope, createVPGModel: model});
    }));

    it('should have props and functions', function () {
        expect(scope.data).toEqual({"vpgName":"test1","priority":0,"priorityCollection":[{"enum":2,"label":"ENUM.PRIORITY.2"},{"enum":1,"label":"ENUM.PRIORITY.1"},{"enum":0,"label":"ENUM.PRIORITY.0"}]});
    });

    it('should apply new name to the VPG config if the defaults are initiated', function () {
        model.data.defaultVpgSettings.Config.Name = 'test1';
        scope.data.vpgName = 'test2';

        scope.handleNameChange();
        expect(model.data.defaultVpgSettings.Config.Name).toEqual(scope.data.vpgName)
    });
});
