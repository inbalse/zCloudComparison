'use strict';

describe("Alerts status button View directive", function () {
    var scope, element, enums, vos,$state;

    beforeEach(module('zvmTest'));

    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, $compile, _enums_) {
        enums = _enums_;

        element = $compile('<alerts-status-button></alerts-status-button>')($rootScope.$new());

        scope = element.scope();

        scope.$digest();
    }));

    it('should load normal class', function () {
        scope.initializeStatusButtonClass(enums.ProtectionGroupAlertStatus.Normal);
        expect(scope.alertsStatusButtonClass).toEqual('normalAlertsStatusButtonClass');
    });

    it('should load error class', function () {
        scope.initializeStatusButtonClass(enums.ProtectionGroupAlertStatus.Error);
        expect(scope.alertsStatusButtonClass).toEqual('errorAlertsStatusButtonClass');
    });

    it('should load warning class', function () {
        scope.initializeStatusButtonClass(enums.ProtectionGroupAlertStatus.Warning);
        expect(scope.alertsStatusButtonClass).toEqual('warningAlertsStatusButtonClass');
    });

    it('should load "NO ALERTS text', function () {
        scope.initializeStatusButtonText(0);
        expect(scope.statusText).toEqual(scope.translations['ALERTS_STATUS.NO_ALERTS']);
    });

    it('should load "X ALERTS text', function () {
        scope.initializeStatusButtonText(6);
        expect(scope.statusText).toEqual("6 " + scope.translations['ALERTS_STATUS.ALERTS']);
    });

    it('should load "1 ALERT text', function () {
        scope.initializeStatusButtonText(1);
        expect(scope.statusText).toEqual(scope.translations['ALERTS_STATUS.ONE_ALERT']);
    });
});
