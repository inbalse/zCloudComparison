'use-strict';

describe('Site Details Controller', function () {
    var ctrl, rootScope, testScope, siteDetailsModel, siteSettingsFactory, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($rootScope, $controller, _siteDetailsModel_, _siteSettingsFactory_) {
        rootScope = $rootScope;
        testScope = $rootScope.$new();
        siteDetailsModel = _siteDetailsModel_;
        siteSettingsFactory = _siteSettingsFactory_;

        ctrl = $controller('siteDetailsController', {
            $scope: testScope,
            siteDetailsModel: siteDetailsModel,
            siteSettingsFactory: siteSettingsFactory
        });


    }));

    it('should have defined variables', function () {
        expect(testScope.forms).toBeDefined();
        expect(testScope.siteDetailsModel).toBeDefined();
        expect(testScope.onlyNumbers).toBeDefined();
        expect(testScope.isPublicCloud).toBeDefined();
        expect(testScope.userNameText).toBeDefined();
        expect(testScope.userPasswordText).toBeDefined();
    });


    it('should emit validity when form validity changes', function () {
        spyOn(testScope, '$emit');
        testScope.forms = {siteDetails: {$valid: true}};
        testScope.$digest();

        expect(testScope.$emit).toHaveBeenCalledWith(siteSettingsFactory.events.VALIDITY);
        expect(siteDetailsModel.isValid).toBeTruthy();
        expect(siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.SITESETTINGS].valid).toBeTruthy();
    });

    it('should emit validity when form validity changes', function () {
        spyOn(testScope, '$emit');
        testScope.forms = {siteDetails: {$valid: false}};
        testScope.$digest();

        expect(testScope.$emit).toHaveBeenCalledWith(siteSettingsFactory.events.VALIDITY);
        expect(siteDetailsModel.isValid).toBeFalsy();
        expect(siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.SITESETTINGS].valid).toBeFalsy();
    });
});
