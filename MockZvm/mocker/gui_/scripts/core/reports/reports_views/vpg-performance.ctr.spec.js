'use strict';
describe('vpgPerformanceController controller', function () {
    var controller, testScope, tempData, potenialVpgs;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate) {
        testScope = $rootScope.$new();
        tempData = 'Date,Value\r\n20141019121416,40,20\r\n20141019121421,50,26\r\n20141019121421,40,30\r\n20141019121441,30,10\r\n20141019121441,12,20\r\n20141020121501,70,30';
        potenialVpgs = [{"Identifier":{"GroupGuid":"08e94d51-de70-4a1f-bb66-629b59f6f3ae"},"Name":"xxxx"},{"Identifier":{"GroupGuid":"23d77048-f8e0-4f34-9509-53d7c9b60310"},"Name":"yyy"},{"Identifier":{"GroupGuid":"90057398-aea3-446e-9cb3-d6c624dc5547"},"Name":"zzzz"}];

        controller = $controller('vpgPerformanceController', {$scope: testScope, $translate: $translate});
    }));

    it("should check declared variables and functions", function () {
        expect(testScope.reportsForm).toBeDefined();
        expect(testScope.reportsInputs).toBeDefined();
        expect(testScope.colors).toEqual(['#A6006F', '#15D1C4', '#5CB800', '#0060A6', '#ED892D']);
        expect(testScope.apply).toBeDefined();
        expect(testScope.init).toBeDefined();
        expect(testScope.getChartDataByVpgs).toBeDefined();
    });

});
