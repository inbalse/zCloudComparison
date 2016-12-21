'use strict';

describe('performance settings Controller', function () {
    var ctrl, testScope, rootScope, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($rootScope, $controller, siteSettingsModel) {
        rootScope = $rootScope;
        testScope = $rootScope.$new();

        siteSettingsModel.settings = {BandwidthSettings: {MaxBandwidthInLBpsOutsideTime: 0, MaxBandwidthInLBpsInTime: 0}};
        ctrl = $controller('performanceController', {$scope: testScope, siteSettingsModel: siteSettingsModel});

    }));

    it('should contain defined variables', function () {
        expect(testScope.bandwidthMultiplier).toBeDefined();
        expect(testScope.hourMultiplier).toBeDefined();
        expect(testScope.outsideTimeBandwidth).toBeDefined();
        expect(testScope.insideTimeBandwidth).toBeDefined();
        expect(testScope.hoursCollection).toBeDefined();
        expect(testScope.minutesCollection).toBeDefined();
    });

    it('should check for functions to be defined', function () {
        expect(testScope.private.assignBandwidthOutsideTime).toBeDefined();
        expect(testScope.private.assignBandwidthInsideTime).toBeDefined();
    });

    it('should check that assignBandwidthOutsideTime function properly multiples data by 256', function () {
        testScope.private.assignBandwidthOutsideTime(1);
        expect(testScope.bandwidthSettings.MaxBandwidthInLBpsOutsideTime).toBe(256);
    });

    it('should check that assignBandwidthInsideTime function properly multiples data by 256', function () {
        testScope.private.assignBandwidthInsideTime(1);
        expect(testScope.bandwidthSettings.MaxBandwidthInLBpsInTime).toBe(256);
    });

    it('should verify min & max values for Bandwidth throttling and Time-based throttling', function () {
        expect(testScope.inSideSliderConfig.from).toEqual(5);
        expect(testScope.outSideSliderConfig.from).toEqual(5);
        expect(testScope.inSideSliderConfig.to).toEqual(100);
        expect(testScope.outSideSliderConfig.to).toEqual(100);
    });
});
