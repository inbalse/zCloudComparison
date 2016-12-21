'use strict';

describe('test dashboardModel', function () {
    var model;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_dashboardModel_) {
        model = _dashboardModel_;
    }));

    it("should test defined functions", function () {
        expect(model.register).toBeDefined();
        expect(model.unregister).toBeDefined();
        expect(model.registerToEvents).toBeDefined();
        expect(model.unregisterEvents).toBeDefined();
        expect(model.registerVPGS).toBeDefined();
        expect(model.unregisterVPGS).toBeDefined();
    });
});
