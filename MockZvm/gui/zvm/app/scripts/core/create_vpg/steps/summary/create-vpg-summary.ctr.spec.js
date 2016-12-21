'use strict';

describe('create vpg step', function () {
    var scope, model, controller, factory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _createVPGFactory_, _createVPGModel_) {
        scope = $rootScope.$new();
        model = _createVPGModel_;
        model.data = {defaultVpgSettings: {Config: {Configuration: {Backup: {Target: {SelectedTarget: null}}}}}};
        factory = _createVPGFactory_;
        spyOn(scope, '$watch').and.callThrough();
        controller = $controller('createVPGSummaryController', {$scope: scope});
    }));

    it('should contain defined variables', function () {
        expect(scope.forms).toBeDefined();
        expect(scope.createVPGModel).toBeDefined();
    });
});
