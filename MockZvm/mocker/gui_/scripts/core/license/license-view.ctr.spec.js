'use strict';

describe('License view', function () {
    var testScope, testLicenseViewController, testZertoServiceFactory,
        testzAlertFactory, state;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, $state, _vos_, _zAlertFactory_) {
        testScope = $rootScope.$new();

        testZertoServiceFactory = jasmine.createSpyObj('zertoServiceFactory', ['GetSitePairingScreen', 'SaveLicense', 'Pair']);
        testZertoServiceFactory.GetSitePairingScreen.and.returnValue({
            then: function (resolve, fail) {
                return resolve({});
            }
        });

        state = jasmine.createSpyObj('$state', ['go']);

        testZertoServiceFactory.SaveLicense.and.returnValue({
            then: function (resolve) {
                return resolve({});
            }
        });

        testZertoServiceFactory.Pair.and.returnValue({
            then: function (resolve) {
                return resolve({});
            }
        });

        testzAlertFactory = jasmine.createSpyObj('_zAlertFactory_', ['fail']);


        testLicenseViewController = $controller('licenseViewController', {
            $scope: testScope, zertoServiceFactory: testZertoServiceFactory, vos: _vos_,
            zAlertFactory: testzAlertFactory, $state: state, globalStateModel: {data: {}}
        });

    }));


    it("should have the initial function and properties in place", function () {
        expect(testScope.LICENSE).toBe('license');
        expect(testScope.PAIR).toBe('pair');
        expect(testScope.checked).toBe('license');
        expect(testScope.forms).toBeDefined();
        expect(testScope.values).toBeDefined();
        expect(testScope.loading).toBe(false);
        expect(testScope.submitForm).toBeDefined();
        expect(testScope.sendPair).toBeDefined();
        expect(testScope.sendLicense).toBeDefined();
    });

    it("sould call zertoService GetSitePairingScreen loads", function () {
        expect(testZertoServiceFactory.GetSitePairingScreen).toHaveBeenCalled();
    });

    it("should call scope.sendLicense when in license mode and form is submited", function () {
        spyOn(testScope, 'sendLicense').and.callThrough();
        testScope.checked = 'license';
        testScope.submitForm();
        expect(testScope.sendLicense).toHaveBeenCalled();
    });

    it("should call scope.sendPair when in pair mode and form is submited", function () {
        spyOn(testScope, 'sendPair').and.callThrough();
        testScope.checked = 'pair';
        testScope.submitForm();
        expect(testScope.sendPair).toHaveBeenCalled();

    });

    it("should show error when the zertoService returns an error on pair", function () {
        testZertoServiceFactory.Pair.and.returnValue({
            then: function (resolve, fail) {
                return fail({});
            }
        });

        testScope.checked = 'pair';
        testScope.submitForm();

        expect(testzAlertFactory.fail).toHaveBeenCalled();
    });

    it("should show error when the zertoService returns an error on SaveLicense", function () {
        testZertoServiceFactory.SaveLicense.and.returnValue({
            then: function (resolve, fail) {
                return fail({});
            }
        });

        testScope.checked = 'license';
        testScope.submitForm();

        expect(testzAlertFactory.fail).toHaveBeenCalled();
    });

});
