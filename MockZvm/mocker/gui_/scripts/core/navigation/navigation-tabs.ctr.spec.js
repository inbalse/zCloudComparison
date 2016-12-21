'use strict';

describe('navigation tabs controller', function () {
    var controller, testScope, navigationTabsFactory, state, globalStateModel, summaryMinimalModel, basil, pairSitesFactory, vraInstallFactory, zertoServiceFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $state, _navigationTabsFactory_, _globalStateModel_, _summaryMinimalModel_, _basil_, _pairSitesFactory_, _vraInstallFactory_, _zertoServiceFactory_) {
        state = $state;
        navigationTabsFactory = _navigationTabsFactory_;
        summaryMinimalModel = _summaryMinimalModel_;
        zertoServiceFactory = _zertoServiceFactory_;
        basil = _basil_;
        pairSitesFactory = _pairSitesFactory_;
        vraInstallFactory = _vraInstallFactory_;
        navigationTabsFactory.dynamicTabs = [
            {id: '1', title: 'test', route: 'test.route({id:1})', active: false},
            {id: '2', title: 'test2', route: 'test2.route({id:2})', active: false}
        ];
        testScope = $rootScope.$new();
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {};
        globalStateModel.data.IsPortal = true;

        zertoServiceFactory.GetVraListScreen = function(){return {then:function(callBack){ return callBack({CanInstallAdditionalVras:true})}}};

        controller = $controller('navigationTabsController', {'$scope': testScope, '$state': state,
            'navigationTabsFactory': navigationTabsFactory, 'globalStateModel': globalStateModel,
            'summaryMinimalModel': summaryMinimalModel, 'basil': basil, 'pairSitesFactory':pairSitesFactory, 'vraInstallFactory':vraInstallFactory, zertoServiceFactory:zertoServiceFactory});

        spyOn(state, 'go');
        spyOn(summaryMinimalModel, 'register');
        spyOn(basil, 'set');
        spyOn(pairSitesFactory, 'showPairSites');
        spyOn(vraInstallFactory, 'showInstallVra');

    }));

    it('should have all functions defined', function () {
        expect(testScope.initStaticTabs).toBeDefined();
        expect(testScope.initDynamicTabs).toBeDefined();
        expect(testScope.onTabCloseClick).toBeDefined();
        expect(testScope._activateTabs).toBeDefined();
        expect(testScope.navigateToSites).toBeDefined();
        expect(testScope.navigateToVra).toBeDefined();
        expect(testScope.$watch).toBeDefined();
        expect(testScope.mainStaticTabs).toBeDefined();
    });

    it('should have navigate to sites', function () {
        testScope.navigateToSites();
        expect(state.go).toHaveBeenCalledWith('main.sites', Object({ quickPair: true }));
    });

    it('should have navigate to setup vra', function () {
        testScope.navigateToVra();
        expect(state.go).toHaveBeenCalledWith('main.setup.vras', Object({ quickInstall: true }));
    });

    it('should have set local storage when close site popover called', function () {
        testScope.closeSites();
        expect(basil.set).toHaveBeenCalledWith('isPopoverSitesBeenClose', 'sitePopoverBeenClose');
    });

    it('should load proper number of tabs', function () {
        expect(testScope.mainStaticTabs.length).toEqual(8);
        expect(testScope.dynamicTabs.length).toEqual(2);
    });

    it('should go to vpgs state when dynamic tab is closed in zssp', function () {

        testScope.onTabCloseClick({preventDefault: function () {
        }}, '1');
        expect(state.go).toHaveBeenCalledWith('test2.route', {id: '2'});

        testScope.onTabCloseClick({preventDefault: function () {
        }}, '2');
        expect(state.go).toHaveBeenCalledWith('main.vpgs');
    });

    it('should go to dashboard state when dynamic tab is closed in regular', function () {

        globalStateModel.data.IsPortal = false;

        testScope.onTabCloseClick({preventDefault: function () {
        }}, '1');
        expect(state.go).toHaveBeenCalledWith('test2.route', {id: '2'});

        testScope.onTabCloseClick({preventDefault: function () {
        }}, '2');
        expect(state.go).toHaveBeenCalledWith('main.dashboard');
    });
});
