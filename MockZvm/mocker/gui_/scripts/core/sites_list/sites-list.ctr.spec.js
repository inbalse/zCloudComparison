'use strict';
describe('Sites list controller', function () {
    var testScope, pairSitesFactory, analyticsEventsTypes, ctrl, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _pairSitesFactory_, _analyticsEventsTypes_, _globalStateModel_) {
        testScope = $rootScope.$new();
        pairSitesFactory = _pairSitesFactory_;
        analyticsEventsTypes = _analyticsEventsTypes_;
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType : 0
        };


        ctrl = $controller('sitesListController',
            {
                $scope: testScope,
                analyticsEventsTypes: analyticsEventsTypes,
                pairSitesFactory: pairSitesFactory
            });
    }));

    it('verify that pair function triggers an google analytics event', function(){
        spyOn(testScope, '$emit');
        testScope.handlePairSitesClick();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SITES.PAIR);
    });

    it('verify that un-pair function triggers an google analytics event', function(){
        spyOn(testScope, '$emit');
        testScope.handleUnpairSitesClick();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SITES.UNPAIR);
    });
});
