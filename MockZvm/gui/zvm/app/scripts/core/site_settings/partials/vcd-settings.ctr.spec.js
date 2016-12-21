'use-strict';

describe('VCD settings Controller', function () {
    var ctrl, rootScope, testScope, siteVcdSettingsModel, siteSettingsFactory, globalStateModel, configureProviderVdcFactory, staticRoutesFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($rootScope, $controller, _siteVcdSettingsModel_, _siteSettingsFactory_, _configureProviderVdcFactory_, _staticRoutesFactory_) {
        rootScope = $rootScope;
        testScope = $rootScope.$new();
        siteSettingsFactory = _siteSettingsFactory_;
        siteVcdSettingsModel = _siteVcdSettingsModel_;
        configureProviderVdcFactory = _configureProviderVdcFactory_;
        staticRoutesFactory = _staticRoutesFactory_;

        ctrl = $controller('vcdSettingsController', {
            $scope: testScope,
            siteVcdSettingsModel: siteVcdSettingsModel,
            siteSettingsFactory: siteSettingsFactory,
            configureProviderVdcFactory: configureProviderVdcFactory,
            staticRoutesFactory: staticRoutesFactory
        });
    }));


    it('has properties defined', function () {
        expect(testScope.forms).toBeDefined();
        expect(testScope.showAMPQPass).toBeDefined();
        expect(testScope.showVcdPassword).toBeDefined();
        expect(testScope.data).toBeDefined();
        expect(testScope.handleConfigureProviderVdc).toBeDefined();
        expect(testScope.handleStaticRoutes).toBeDefined();
    });

    it('should set flags on truthy validity check', function () {
        spyOn(testScope, '$emit');
        testScope.forms = {cloudSettings: {$valid: true}};
        testScope.$digest();

        expect(testScope.$emit).toHaveBeenCalledWith(siteSettingsFactory.events.VALIDITY);
        expect(siteVcdSettingsModel.isValid).toBeTruthy();
        expect(siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.VCD].valid).toBeTruthy();
    });

    it('should set flags on falsy validity check', function () {
        spyOn(testScope, '$emit');
        testScope.forms = {cloudSettings: {$valid: false}};
        testScope.$digest();

        expect(testScope.$emit).toHaveBeenCalledWith(siteSettingsFactory.events.VALIDITY);
        expect(siteVcdSettingsModel.isValid).toBeFalsy();
        expect(siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.VCD].valid).toBeFalsy();
    });

    it('should set flag if the form is dirty', function () {
        spyOn(testScope.watchers, 'clearDirtyWatcher');
        testScope.forms = {cloudSettings: {$dirty: true}};
        testScope.applyButton = {};
        testScope.validateModels = function(){};
        testScope.$digest();

        expect(siteSettingsFactory.cloudSettingsChanged).toBeTruthy();
        expect(testScope.watchers.clearDirtyWatcher).toHaveBeenCalled();
    });

    //it('should call open in configureProviderVdcFactory', function () {
    //    spyOn(configureProviderVdcFactory,'open');
    //    testScope.handleConfigureProviderVdc();
    //    expect(configureProviderVdcFactory.open).toHaveBeenCalled();
    //});
    //
    //it('should call openWindow in staticRoutesFactory', function () {
    //    spyOn(staticRoutesFactory,'openWindow');
    //    testScope.handleStaticRoutes();
    //    expect(staticRoutesFactory.openWindow).toHaveBeenCalled();
    //});

});
