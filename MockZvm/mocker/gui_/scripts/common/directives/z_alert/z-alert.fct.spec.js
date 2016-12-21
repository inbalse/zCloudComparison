'use strict';
describe("Alerts Factory", function () {
    var zAlertFactory, translate;

    var translations = [];

    beforeEach(function () {
        module('zvmTest');

        inject(function (_zAlertFactory_) {
            zAlertFactory = _zAlertFactory_;
        });

        spyOn(zAlertFactory.private, 'alert');

    });

    it("should check that window classes are specified", function () {
        expect(zAlertFactory.windowClasses).toEqual({
            INFO: 'z-alert-info',
            HELP: 'z-alert-help',
            SUCCESS: 'z-alert-success',
            FAIL: 'z-alert-fail',
            WARN: 'z-alert-warn'
        });
    });

    it("should check that success function triggers proper alert state", function () {
        zAlertFactory.success("title", "description");
        expect(zAlertFactory.private.alert).toHaveBeenCalled();
    });
    it("should check that fail function triggers proper alert state", function () {
        zAlertFactory.fail("title", "description");
        expect(zAlertFactory.private.alert).toHaveBeenCalled();
    });
    it("should check that info function triggers proper alert state", function () {
        zAlertFactory.info("title", "description");
        expect(zAlertFactory.private.alert).toHaveBeenCalled();
    });
    it("should check that help function triggers proper alert state", function () {
        zAlertFactory.help("title", "description");
        expect(zAlertFactory.private.alert).toHaveBeenCalled();
    });
    it("should check that warn function triggers proper alert state", function () {
        zAlertFactory.warn("title", "description");
        expect(zAlertFactory.private.alert).toHaveBeenCalled();
    });

    it("should check that warn with checkbox function triggers proper alert state", function () {
        zAlertFactory.warnCheck("title", "description",function(){},'checkbox text');
        expect(zAlertFactory.private.alert).toHaveBeenCalled();
    });
});
