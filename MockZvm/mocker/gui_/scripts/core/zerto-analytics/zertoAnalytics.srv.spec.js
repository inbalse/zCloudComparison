'use strict';
describe('Zerto Analytics service', function () {
    var testScope, serviceScope, window,
        zertoAnalyticsService, zertoAnalyticsEventsFactory,
        zertoServiceUpdaterFactory, analyticsEventsTypes, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_zertoAnalyticsService_, $rootScope, $window, _zertoAnalyticsEventsFactory_, _zertoServiceUpdaterFactory_, _analyticsEventsTypes_, _globalStateModel_) {

        zertoAnalyticsService = _zertoAnalyticsService_;
        serviceScope = $rootScope;
        testScope = $rootScope.$new();
        zertoAnalyticsEventsFactory = _zertoAnalyticsEventsFactory_;
        zertoServiceUpdaterFactory = _zertoServiceUpdaterFactory_;
        analyticsEventsTypes = _analyticsEventsTypes_;
        window = $window;
        globalStateModel = _globalStateModel_;
        window.ga = angular.noop;

        globalStateModel.data = {
            IsPortal : false,
            SiteIdentifier : {
                SiteGuid : 'siteGuid'
            }
        };
    }));

    it('should subscribe to zertoService for updates when event service start sent', function () {
        spyOn(testScope, '$emit').and.callThrough();
        spyOn(zertoServiceUpdaterFactory, 'register').and.callThrough();
        spyOn(zertoAnalyticsService, 'subscribeToDataChanges').and.callThrough();

        zertoAnalyticsService.start();
        testScope.$emit(analyticsEventsTypes.ANALYTICS.SERVICE.START);

        expect(zertoAnalyticsService.subscribeToDataChanges).toHaveBeenCalled();
        expect(zertoServiceUpdaterFactory.register).toHaveBeenCalled();
    });

    it('should unregister from zertoService updates when event service stop sent and the service was running before', function () {
        spyOn(testScope, '$emit').and.callThrough();
        spyOn(zertoServiceUpdaterFactory, 'unregister').and.callThrough();
        spyOn(zertoAnalyticsService, 'unSubscribeToDataChanges').and.callThrough();

        zertoAnalyticsService.start();
        testScope.$emit(analyticsEventsTypes.ANALYTICS.SERVICE.START);

        testScope.$emit(analyticsEventsTypes.ANALYTICS.SERVICE.STOP);
        expect(zertoAnalyticsService.unSubscribeToDataChanges).toHaveBeenCalled();
        expect(zertoServiceUpdaterFactory.unregister).toHaveBeenCalled();
    });

    it('should verify that start service will register to start and stop events', function () {
        var startAndStopEventsCounter = 2;
        spyOn(serviceScope, '$on').and.callThrough();
        zertoAnalyticsService.start();

        expect(serviceScope.$on).toHaveBeenCalled();
        expect(serviceScope.$on.calls.count()).toBe(startAndStopEventsCounter);
    });

    it('should verify that start service EVENT will register to all analytics events', function () {
        var startAndStopEventsCounter = 2;

        spyOn(serviceScope, '$on').and.callThrough();

        //don't want that subscribe function will start (subscribe fn should register to zertoService - what leads to $rootScope.%on to have been called)
        spyOn(zertoAnalyticsService, 'subscribeToDataChanges');
        spyOn(zertoAnalyticsService, 'registerAnalyticsEvents').and.callThrough();

        zertoAnalyticsService.start();
        testScope.$emit(analyticsEventsTypes.ANALYTICS.SERVICE.START);

        expect(serviceScope.$on).toHaveBeenCalled();
        expect(zertoAnalyticsService.registerAnalyticsEvents).toHaveBeenCalled();
        expect(serviceScope.$on.calls.count()).toBe(Object.keys(zertoAnalyticsEventsFactory).length + startAndStopEventsCounter);
    });


});
