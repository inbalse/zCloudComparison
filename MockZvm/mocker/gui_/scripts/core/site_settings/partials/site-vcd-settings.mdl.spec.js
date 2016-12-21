describe('siteVcdSettingsModel', function () {
    var siteVcdSettingsModel,zertoServiceFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_siteVcdSettingsModel_,_zertoServiceFactory_) {
        siteVcdSettingsModel = _siteVcdSettingsModel_;
        zertoServiceFactory = _zertoServiceFactory_;
    }));


    it('should contain defined variables', function () {
        expect(siteVcdSettingsModel.data).toBeDefined();
        expect(siteVcdSettingsModel.isValid).toBeDefined();
        expect(siteVcdSettingsModel.load).toBeDefined();
        expect(siteVcdSettingsModel.save).toBeDefined();
        expect(siteVcdSettingsModel.set).toBeDefined();
    });

    it('should call zertoService to get data', function () {
        spyOn(zertoServiceFactory, 'GetVcloudDirectorConnectionSettings').and.callThrough();
        siteVcdSettingsModel.load();
        expect(zertoServiceFactory.GetVcloudDirectorConnectionSettings).toHaveBeenCalled();
    });

    it('should set data to model', function () {
        var data = 'data';
        siteVcdSettingsModel.set(data);
        expect(siteVcdSettingsModel.data).toEqual(data);
    });

    it('should save data via zertoService', function () {
        siteVcdSettingsModel.data = 'data';
        spyOn(zertoServiceFactory, 'SetVCDProxyConfiguration').and.callThrough();
        siteVcdSettingsModel.save();
        expect(zertoServiceFactory.SetVCDProxyConfiguration).toHaveBeenCalledWith(siteVcdSettingsModel.data);
    });


});
