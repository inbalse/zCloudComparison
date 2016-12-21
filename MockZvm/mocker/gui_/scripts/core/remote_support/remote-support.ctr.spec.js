'use strict';
describe('remoteSupport controller', function () {
    var controller, testScope, remoteSupportApiService, remoteSupportFactory, tweaksService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate, _remoteSupportApiService_, _remoteSupportFactory_, _tweaksService_) {
        testScope = $rootScope.$new();
        remoteSupportApiService = _remoteSupportApiService_;
        remoteSupportFactory = _remoteSupportFactory_;
        tweaksService = _tweaksService_;
        controller = $controller('remoteSupportController', {$scope: testScope, $translate: $translate});
    }));

    it("should check declared variables and functions", function () {
        expect(testScope.loading).toBeDefined();
        expect(testScope.forms).toBeDefined();
        expect(testScope.remoteSupportInfo).toBeDefined();
        expect(testScope.close).toBeDefined();
        expect(testScope.cancel).toBeDefined();
        expect(testScope.save).toBeDefined();
    });

    it("should check init function", function () {
        spyOn(remoteSupportApiService, 'getRemoteSupportSettings').and.callThrough();
        testScope._private.init();
        expect(remoteSupportApiService.getRemoteSupportSettings).toHaveBeenCalled();
        expect(testScope.remoteSupportInfo.timeFrame).toBe(2);
        expect(testScope.remoteSupportInfo.oldTimeFrame).toBe(2);
        expect(testScope.loading).toBeFalsy();
    });

    it("should check calculateEndDate function", function () {
        var endData = testScope._private.calculateEndDate(moment("2016-02-08 09:35"), 2);
        expect(endData).toEqual("02/08/2016 at 12PM");
    });

    it("should check getSettingsSuccess function - EnabledForPeriod", function () {
        var result = {
            EnabledForPeriod: {
                PeriodInHours: 2
            },
            EnabledForCase: null,
            Disabled: false
        };
        testScope._private.getSettingsSuccess(result);
        expect(testScope.remoteSupportInfo.timeFrame).toBe(0);
        expect(testScope.remoteSupportInfo.oldTimeFrame).toBe(0);
    });

    it("should check getSettingsSuccess function - EnabledForCase", function () {
        var result = {
            EnabledForPeriod: null,
            EnabledForCase: {
                CaseNumber: '999999'
            },
            Disabled: false
        };
        testScope._private.getSettingsSuccess(result);
        expect(testScope.remoteSupportInfo.timeFrame).toBe(1);
        expect(testScope.remoteSupportInfo.oldTimeFrame).toBe(1);
    });

    it("should check save function - EnabledForPeriod", function () {
        remoteSupportFactory.modalInstance = { dismiss: function () {} };
        testScope.remoteSupportInfo.timeFrame = 0;
        var settings = {
            EnabledForPeriod: {
                PeriodInHours: tweaksService.getTweak('t_remoteSupportPeriodInDays', 30) * 24
            }
        };
        spyOn(remoteSupportApiService, 'setRemoteSupportSettings').and.callThrough();
        testScope.save();
        expect(remoteSupportApiService.setRemoteSupportSettings).toHaveBeenCalledWith(settings);
    });

    it("should check save function - EnabledForCase", function () {
        remoteSupportFactory.modalInstance = { dismiss: function () {} };
        testScope.remoteSupportInfo.timeFrame = 1;
        testScope.remoteSupportInfo.caseNumber = '999999';
        var settings = {
            EnabledForCase: {
                CaseNumber: '999999'
            }
        };
        spyOn(remoteSupportApiService, 'setRemoteSupportSettings').and.callThrough();
        testScope.save();
        expect(remoteSupportApiService.setRemoteSupportSettings).toHaveBeenCalledWith(settings);
    });
});
