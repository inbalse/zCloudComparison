'use strict';

//todo fix template url after separate to solutions zvm/zcm

describe('Site Settings Controller', function () {
    var ctrl, testScope, rootScope, siteSettingsFactory, globalStateModel, siteSettingsModel, siteDetailsModel, siteVcdSettingsModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($rootScope, $controller, _siteSettingsFactory_, _siteSettingsModel_, _siteDetailsModel_, _siteVcdSettingsModel_) {
        siteDetailsModel = _siteDetailsModel_;
        siteSettingsModel = _siteSettingsModel_;
        siteVcdSettingsModel = _siteVcdSettingsModel_;
        siteSettingsFactory = _siteSettingsFactory_;

        rootScope = $rootScope;
        testScope = $rootScope.$new();

        ctrl = $controller('siteSettingsController',
            {
                tabSelectedIndex: siteSettingsFactory.tabsIndices.SITESETTINGS,
                $scope: testScope,
                siteSettingsModel: siteSettingsModel,
                siteSettingsFactory: siteSettingsFactory,
                siteVcdSettingsModel: siteVcdSettingsModel,
                siteDetailsModel: siteDetailsModel
            });
    }));

    it('should check definition state of variables', function () {
        expect(testScope.selection).toBeDefined();
        expect(testScope.settings).toBeDefined();
        expect(testScope.saveKey).toBeDefined();
        expect(testScope.applyKey).toBeDefined();
        expect(testScope.cancelKey).toBeDefined();
        expect(testScope.tabs).toBeDefined();
    });

    it('should check definition state of functions', function () {
        expect(testScope.handleSaveClick).toBeDefined();
        expect(testScope.handleApplyClick).toBeDefined();
        expect(testScope.handleCancelClick).toBeDefined();
        expect(testScope.showTabByIndex).toBeDefined();
        expect(testScope.disableButtons).toBeDefined();
        expect(testScope.showTabByIndex).toBeDefined();
        expect(testScope.cancelKey).toBeDefined();
        expect(testScope.tabs).toBeDefined();
    });

    it('should check that listeners are defined', function () {
        expect(testScope.listeners.validity).toBeDefined();
    });

    it('should check that showTabByIndex() assigns proper values', function () {
        testScope.showTabByIndex(1);
        expect(testScope.tabs[1].active).toBeTruthy();
        expect(testScope.selection).toBe(1);
    });

    it('should activate proper tab by index', function () {
        testScope.showTabByIndex(0);
        expect(testScope.tabs[0].active).toBeTruthy();
    });
    it('should save all model data', function () {
        spyOn(siteSettingsModel, 'save').and.callThrough();
        spyOn(siteDetailsModel, 'save').and.callThrough();
        spyOn(siteVcdSettingsModel, 'save').and.callThrough();

        testScope.saveAll();

        expect(siteSettingsModel.save).toHaveBeenCalled();
        expect(siteDetailsModel.save).toHaveBeenCalled();
        expect(siteVcdSettingsModel.save).not.toHaveBeenCalled();

        siteSettingsFactory.cloudSettingsChanged = true;
        testScope.saveAll();

        expect(siteSettingsModel.save).toHaveBeenCalled();
        expect(siteDetailsModel.save).toHaveBeenCalled();
        expect(siteVcdSettingsModel.save).toHaveBeenCalled();

    });

    it('should apply and close site settings', function () {
        spyOn(testScope, 'saveAll');
        spyOn(siteSettingsFactory, 'closeSiteSettings');

        testScope.handleSaveClick();

        expect(testScope.saveAll).toHaveBeenCalled();
        expect(siteSettingsFactory.closeSiteSettings).toHaveBeenCalled();
    });

    it('should apply site settings', function () {
        spyOn(testScope, 'saveAll');

        testScope.handleApplyClick();

        expect(testScope.saveAll).toHaveBeenCalled();
    });

    it('should close site settings without saving', function () {
        spyOn(siteSettingsFactory, 'closeSiteSettings');
        testScope.handleCancelClick();
        expect(siteSettingsFactory.closeSiteSettings).toHaveBeenCalled();
    });

    it('should open site settings on specified tab', function () {
        var index = 1;
        testScope.showTabByIndex(index);

        expect(testScope.selection).toEqual(index);
        expect(testScope.tabs[index].active).toBeTruthy();
        expect(testScope.currentTab).toEqual('settings_SITE_SETTINGS.PERFORMANCE.TAB_TITLE');
    });

    it('should return css class according to tab state', function () {
        var index = 1;
        expect(testScope.tabClass(index)).toEqual('');
        testScope.tabs[index].active = true;
        expect(testScope.tabClass(index)).toEqual('active');
    });

    it('should disable/enable buttons', function () {
        testScope.disableButtons(true);
        expect(testScope.saveButton.disabled).toBeTruthy();
        expect(testScope.applyButton.disabled).toBeTruthy();

        testScope.disableButtons(false);
        expect(testScope.saveButton.disabled).toBeFalsy();
        expect(testScope.applyButton.disabled).toBeTruthy();
    });

    it('should validate models', function () {
        spyOn(testScope, 'disableButtons').and.callThrough();
        testScope.validateModels();
        //all models are valid initially
        expect(testScope.disableButtons).toHaveBeenCalledWith(false);

        siteDetailsModel.isValid = false;
        testScope.validateModels();
        //if at least one model is invalid, we should disable buttons
        expect(testScope.disableButtons).toHaveBeenCalledWith(false);
    });

    it('should check permission denied', function () {
        testScope.isManageSiteEnabled = false;
        testScope.disableButtons(!testScope.isManageSiteEnabled);
        expect(testScope.saveButton.disabled).toBeTruthy();
    });

    it('should check permission allowed', function () {
        testScope.isManageSiteEnabled = true;
        testScope.disableButtons(!testScope.isManageSiteEnabled);
        expect(testScope.saveButton.disabled).toBeFalsy();
    });
});
