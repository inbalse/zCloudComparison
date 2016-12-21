'use-strict';

describe('site settings factory', function () {
    var siteSettingsFactory, rootScope, globalStateModel;

    beforeEach(function () {
        module('zvmTest');

        inject(function (_globalStateModel_) {
            globalStateModel = _globalStateModel_;
            globalStateModel.data = {
                VirtualizationProviderType: 0
            };
        });

        inject(function ($rootScope, _siteSettingsFactory_) {
            rootScope = $rootScope;
            siteSettingsFactory = _siteSettingsFactory_;
        });
    });

    it('should check for variables to be defined', function () {
        expect(siteSettingsFactory.BandwidthInLBpsOpts).toBeDefined();
        expect(siteSettingsFactory.events).toBeDefined();
        expect(siteSettingsFactory.tabsIndices).toBeDefined();
        expect(siteSettingsFactory.tabIndex).toBeDefined();
        expect(siteSettingsFactory.private.hourTranslation).toBeDefined();
        expect(siteSettingsFactory.private.minutesTranslation).toBeDefined();

    });

    it("should contain defined functions ", function () {
        expect(siteSettingsFactory.showSiteSettings).toBeDefined();
        expect(siteSettingsFactory.closeSiteSettings).toBeDefined();
        expect(siteSettingsFactory.showHelpSite).toBeDefined();
    });


});
