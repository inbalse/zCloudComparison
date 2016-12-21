'use strict';

describe('Datastore Controller', function () {
    var scope, $controllerConstructor, datastoreModel, groupByService, siteSettingsFactory;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data: {VirtualizationProviderType: null}});
    }));

    beforeEach(inject(function ($controller, $rootScope, _datastoreModel_, _groupByService_, _siteSettingsFactory_) {
        scope = $rootScope.$new();
        datastoreModel = _datastoreModel_;
        groupByService = _groupByService_;
        siteSettingsFactory = _siteSettingsFactory_;
        spyOn(datastoreModel, "showByZerto");
        spyOn(siteSettingsFactory, "showSiteSettings");
        $controllerConstructor = $controller("datastoreController", {
            $scope: scope,
            datastoreModel: datastoreModel,
            siteSettingsFactory: siteSettingsFactory
        });
    }));

    it("should check the number of columns in grid", function () {
        scope.handleSiteSettingsClick();
        expect(siteSettingsFactory.showSiteSettings).toHaveBeenCalledWith(siteSettingsFactory.tabsIndices.SITESETTINGS);
    });

    it("should call model's showByZerto on showByChange ", function () {
        scope.showByChange();
        expect(datastoreModel.showByZerto).toHaveBeenCalled();
    });

});
