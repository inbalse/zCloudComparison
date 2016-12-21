describe('siteSettingsModel', function () {
    var siteSettingsModel, zertoServiceFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_siteSettingsModel_, _zertoServiceFactory_) {
        siteSettingsModel = _siteSettingsModel_;
        zertoServiceFactory = _zertoServiceFactory_;
    }));


    it('should contain defined variables', function () {
        expect(siteSettingsModel.settings).toBeDefined();
        expect(siteSettingsModel.isValid).toBeDefined();
        expect(siteSettingsModel.load).toBeDefined();
        expect(siteSettingsModel.save).toBeDefined();
        expect(siteSettingsModel.set).toBeDefined();
        expect(siteSettingsModel.testEmail).toBeDefined();
    });

    it('should call zertoService to get data', function () {
        spyOn(zertoServiceFactory, 'GetAdvancedSiteSettings').and.callThrough();
        siteSettingsModel.load();
        expect(zertoServiceFactory.GetAdvancedSiteSettings).toHaveBeenCalled();
    });

    it('should set data to model', function () {
        var data = 'data';
        siteSettingsModel.set(data);
        expect(siteSettingsModel.settings).toEqual(data);
    });

    it('should save data via zertoService', function () {
        siteSettingsModel.settings = 'settings';
        spyOn(zertoServiceFactory, 'SetAdvancedSiteSettings').and.callThrough();
        siteSettingsModel.save();
        expect(zertoServiceFactory.SetAdvancedSiteSettings).toHaveBeenCalledWith(siteSettingsModel.settings);
    });

    it('should test email settings via zertoService', function () {
        siteSettingsModel.settings.EmailConfiguration = 'email';
        spyOn(zertoServiceFactory, 'TestEmailSettings').and.callThrough();
        siteSettingsModel.testEmail();
        expect(zertoServiceFactory.TestEmailSettings).toHaveBeenCalledWith(siteSettingsModel.settings.EmailConfiguration);
    });

});
