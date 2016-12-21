'use strict';

describe('Email and Reporting Controller', function () {
    var ctrl, rootScope, testScope, siteSettingsFactory, siteSettingsModel, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_, _siteSettingsModel_) {
        globalStateModel = _globalStateModel_;
        siteSettingsModel = _siteSettingsModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };

        siteSettingsModel.settings = {
            EmailConfiguration: {
                BackupNotificationScheduleTimeOfDay: 0
            }
        }
    }));

    beforeEach(inject(function ($rootScope, $controller, _siteSettingsFactory_) {
        rootScope = $rootScope;
        testScope = $rootScope.$new();
        siteSettingsFactory = _siteSettingsFactory_;

        siteSettingsFactory.settings.EmailConfiguration = {
            BackupNotificationScheduleTimeOfDay: 0
        };

        ctrl = $controller('emailSettingsController', {$scope: testScope, siteSettingsFactory: siteSettingsFactory});
    }));


    it('should have all variables defined', function () {
        expect(testScope.settings).toBeDefined();
        expect(testScope.daysOfWeek).toBeDefined();
        expect(testScope.SchedulePeriodType).toBeDefined();
        expect(testScope.disableSend).toBeDefined();
    });


    it('should contain defind function for sending emails', function () {
        expect(testScope.sendEmail).toBeDefined();
    });

    it('should parse data properly to model on change', function () {
        testScope.settings.BackupNotificationScheduleTimeOfDay = 170;
        testScope.$digest();
        expect(testScope.settings.BackupNotificationScheduleTimeOfDay).toEqual(170);
    });

    it('should enable button on model change', function () {
        testScope.settings = {
            SmtpServerAddress: 'asd',
            SmtpServerPort: 25,
            From: 'asd@asd.com',
            ToAddresses: [
                {ToAddress: 'asd@asd.com'},
                {ToAddress: 'asd@asd.com'}
            ]
        };
        testScope.forms = {emailSettings: {$valid: true}};
        testScope.$digest();

        expect(siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.EMAILS].valid).toBeTruthy();
        expect(siteSettingsModel.isValid).toBeTruthy();
        expect(testScope.disableSend).toBeFalsy();
    });

    it('should disable button on model change', function () {
        testScope.forms = {emailSettings: {$valid: false}};
        testScope.$digest();

        expect(siteSettingsFactory.tabs[3].valid).toBeFalsy();
        expect(siteSettingsModel.isValid).toBeFalsy();
        expect(testScope.disableSend).toBeTruthy();
    });
});
