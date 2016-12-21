'use strict';
describe('Busy Overlay Component', function () {
    var busyOverlayService, component, scope, $componentController;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, _$componentController_, _busyOverlayService_) {
        scope = $rootScope.$new();
        $componentController = _$componentController_;
        busyOverlayService = _busyOverlayService_;
        component = $componentController('busyOverlay', {$scope: scope});
    }));

    it('should set loader value to true when adding operation', function () {
        busyOverlayService.addOperation('test');
        scope.$digest();
        expect(component.showLoader).toBeTruthy();
    });

    it('should set loader value to false when removing operation', function () {
        var operation = 'test';
        busyOverlayService.addOperation(operation);
        busyOverlayService.removeOperation(operation);
        scope.$digest();
        expect(component.showLoader).toBeFalsy();

    });

});
