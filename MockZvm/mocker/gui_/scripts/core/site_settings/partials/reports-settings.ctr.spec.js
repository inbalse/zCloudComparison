'use strict';

describe('reports settings Controller', function () {
    var ctrl, rootScope, testScope, siteSettingsModel, enums, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($rootScope, $controller, _siteSettingsModel_, _enums_, _dataCollectionFactory_, _vos_) {
        rootScope = $rootScope;
        testScope = $rootScope.$new();

        enums = _enums_;

        siteSettingsModel = _siteSettingsModel_;
        siteSettingsModel.settings.ResourcesReportSettings = new _vos_.ResourcesReportSettings(enums.ResourcesReportSettings_SamplingResolution.Daily, 0);

        ctrl = $controller('reportsSettingsController', {$scope: testScope, siteSettingsModel: siteSettingsModel});
    }));

    it('should check all object and function to be defined', function () {
        expect(testScope.data).toBeDefined();
        expect(testScope.resourceReportsCollection).toBeDefined();
        expect(testScope.isHourEnabled).toBeDefined();
    });



    it('should check that data is proper values', function () {
        expect(testScope.data).toEqual(siteSettingsModel.settings);
    });


    it('should check isHourEnabled false', function () {
        var enumValue = enums.ResourcesReportSettings_SamplingResolution.Daily;
        testScope.data.ResourcesReportSettings.Resolution = enumValue;
        testScope.handleSamplingRateChange(); //change to hourly

        expect(testScope.isHourEnabled).toBeFalsy();
    });
});
