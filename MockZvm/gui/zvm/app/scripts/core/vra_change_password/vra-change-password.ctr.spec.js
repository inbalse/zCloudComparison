'use strict';

describe('VRA change password controller', function () {
    var controller, testScope, zertoServiceFactory, vraChangePasswordFactory, hostIdentifiers, zAlertFactory, isVibUsed, eSXiHostLower51;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zertoServiceFactory_, _vraChangePasswordFactory_, _zAlertFactory_) {
        testScope = $rootScope.$new();
        zertoServiceFactory = _zertoServiceFactory_;
        vraChangePasswordFactory = _vraChangePasswordFactory_;
        zAlertFactory = _zAlertFactory_;
        testScope.translations = {};
        eSXiHostLower51 = {};

        vraChangePasswordFactory.modalInstance = {
            dismiss: function () {}
        };

        spyOn(zAlertFactory, 'warn');
        spyOn(zertoServiceFactory, 'ChangeHostsPassword');

        testScope.mockEventTargetWarnOk = { target: { name: 'MODAL.OK' }};
        testScope.mockEventTargetWarnCancel = { target: { name: 'MODAL.CANCEL'}};

        hostIdentifiers = [
            {"hostIdentifier": {"InternalName": "host-9", "Type": 0, "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}}
        ];

        isVibUsed = true;

        controller = $controller('vraChangePasswordController', {$scope: testScope,
            vraChangePasswordFactory: vraChangePasswordFactory, zertoServiceFactory: zertoServiceFactory, hostIdentifiers: hostIdentifiers,vibUsed:isVibUsed, zAlertFactory: zAlertFactory, eSXiHostLower51: eSXiHostLower51});
    }));


    it("should have property be defined", function () {
        expect(testScope.loading).toBeFalsy();
        expect(testScope.isHostPasswordRequired).toBeTruthy();
        expect(testScope.isCheckBoxDisable).toBeTruthy();
        expect(testScope.showPasswordText).toBeFalsy();
        expect(testScope.hostIdentifiers).toEqual(hostIdentifiers);
        expect(testScope.credentialsObj).toBeDefined();
        expect(testScope.forms).toEqual({});
        expect(testScope.translations).toBeDefined();

    });

    it("should have function be defined", function () {
        expect(testScope.save).toBeDefined();
        expect(testScope.close).toBeDefined();
        expect(testScope._handleWarnModalClick).toBeDefined();
        expect(testScope.initButtons).toBeDefined();
    });

    it('should have click save handler', function () {
        testScope.save();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should have click cancel in warn alert modal handler', function () {
        testScope._handleWarnModalClick(testScope.mockEventTargetWarnCancel);
        expect(testScope.mockEventTargetWarnCancel.target.name).toEqual('MODAL.CANCEL');
        expect(zertoServiceFactory.ChangeHostsPassword).not.toHaveBeenCalled();
    });
});
