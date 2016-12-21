describe('siteSettingsVersionsModel', function () {
    var siteSettingsVersionsModel;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data:{VirtualizationProviderType: null}});
    }));

    beforeEach(inject(function (_siteSettingsVersionsModel_) {
        siteSettingsVersionsModel = _siteSettingsVersionsModel_;
    }));


    it('should contain defined variables', function () {
        expect(siteSettingsVersionsModel.model).toBeDefined();
        expect(siteSettingsVersionsModel.init).toBeDefined();
    });

    it('should contain private defined variables', function () {
        expect(siteSettingsVersionsModel._self.generateVersion).toBeDefined();
        expect(siteSettingsVersionsModel._self.generateUpdate).toBeDefined();
    });

    it("should return the supported updates result version 4", function () {
        var testRow = {EsxVersion: '4.0', EsxUpdate: '4'};
        expect(siteSettingsVersionsModel._self.generateUpdate(testRow)).toEqual('4.0U1, 4.0U2, 4.0U3, 4.0U4');
    });

    it("should return the supported updates result version 5.5", function () {
        var testRow = {EsxVersion: '5.5', EsxUpdate: '1'};
        expect(siteSettingsVersionsModel._self.generateUpdate(testRow)).toEqual('5.5, 5.5U1');
    });

    it("should return the esx version 4", function () {
        var esxVersion = '4.0';
        expect(siteSettingsVersionsModel._self.generateVersion(esxVersion)).toEqual('ESX / ESXi 4.0');
    });

    it("should return the esx version 5.5", function () {
        var esxVersion = '5.5';
        expect(siteSettingsVersionsModel._self.generateVersion(esxVersion)).toEqual('ESXi 5.5');
    });
});
