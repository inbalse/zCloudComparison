'use strict';
describe('VPG Tasks list model', function () {
    var testScope, tasksVPGModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $rootScope, _tasksVPGModel_) {
        testScope = $rootScope.$new();
        tasksVPGModel = _tasksVPGModel_;

    }));

    it("should check definitions", function () {
        expect(tasksVPGModel.register).toBeDefined();
    });
});