'use strict';

describe('Events List Controller', function () {
    var scope, $controllerConstructor, eventsListModel, siteSettingsFactory, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function($controller, $rootScope, _eventsListModel_, _siteSettingsFactory_) {
        scope = $rootScope.$new();
        eventsListModel = _eventsListModel_;
        siteSettingsFactory= _siteSettingsFactory_;
        $controllerConstructor = $controller('eventsListController', {$scope: scope, eventsListModel: eventsListModel, siteSettingsFactory: siteSettingsFactory});
    }));

    it("should show data as empty", function(){
        expect(scope.data).toBeUndefined();
    });

    it("should check function defined", function () {
        expect(scope.handleApplyClick).toBeDefined();
        expect(scope.handleResetClick).toBeDefined();
    });

    it("should check default event type", function(){
        expect(scope.eventType).toEqual(1);
    });
});
