'use strict';
describe("vpg status charts controller", function () {
    var controller, testScope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $translate) {
        testScope = $rootScope.$new();
        controller = $controller('vraChartsController', {$scope: testScope, $translate: $translate});
    }));

    it("should check the definitions", function () {

        expect(testScope.stateParams).toBeDefined();
        expect(testScope.showCPUChart).toBeFalsy();
        expect(testScope.showLocalChart).toBeFalsy();
        expect(testScope.showRemoteChart).toBeFalsy();

    });
});