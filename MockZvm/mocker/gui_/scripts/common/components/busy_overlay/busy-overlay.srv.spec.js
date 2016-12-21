'use strict';
describe('Busy Overlay Service', function () {
    var busyOverlayService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_busyOverlayService_) {
        busyOverlayService = _busyOverlayService_;
    }));

    it('should display overlay when adding operation', function () {
        spyOn(busyOverlayService.$$showDeferred,'notify');
        busyOverlayService.addOperation('test');
        expect(busyOverlayService.$$showDeferred.notify).toHaveBeenCalled();
    });

    it('should notify remove overlay when there are no more operations', function () {
        spyOn(busyOverlayService.$$showDeferred,'notify');
        spyOn(busyOverlayService.$$hideDeferred,'notify');
        busyOverlayService.addOperation('test');
        busyOverlayService.addOperation('test2');
        busyOverlayService.addOperation('test3');
        expect(busyOverlayService.$$showDeferred.notify).toHaveBeenCalled();
        busyOverlayService.removeOperation('test');
        busyOverlayService.removeOperation('test2');
        busyOverlayService.removeOperation('test3');
        expect(busyOverlayService.$$hideDeferred.notify).toHaveBeenCalled();
    });

    it('should not display overlay for blacklisted operations', function () {
        spyOn(busyOverlayService.$$showDeferred,'notify');

        var operation = 'test';
        busyOverlayService.addToBlacklist(operation);
        busyOverlayService.addOperation(operation);
        expect(busyOverlayService.$$showDeferred.notify).not.toHaveBeenCalled();

    });


    it('should remove duplicate operations', function () {
        spyOn(busyOverlayService.$$hideDeferred,'notify');
        var operation = 'test3';
        busyOverlayService.addOperation(operation);
        busyOverlayService.addOperation(operation);
        busyOverlayService.removeOperation(operation);
        busyOverlayService.removeOperation(operation);
        expect(busyOverlayService.$$hideDeferred.notify).toHaveBeenCalled();

    });

    it('should remove blacklisted item from the list', function(){
        spyOn(busyOverlayService.$$showDeferred,'notify');

        var operation = 'test';
        busyOverlayService.addToBlacklist(operation);
        busyOverlayService.removeFromBlacklist(operation);
        busyOverlayService.addOperation(operation);
        expect(busyOverlayService.$$showDeferred.notify).toHaveBeenCalled();
    });

    it('should notify only once when adding multiple operation', function(){
        spyOn(busyOverlayService.$$showDeferred,'notify');
        busyOverlayService.addOperation('test');
        busyOverlayService.addOperation('test2');
        busyOverlayService.addOperation('test3');
        expect(busyOverlayService.$$showDeferred.notify).toHaveBeenCalledTimes(1);
    });

    it('should keep loader running when there operations left running', function(){
        spyOn(busyOverlayService.$$hideDeferred,'notify');

        busyOverlayService.addOperation('test');
        busyOverlayService.addOperation('test2');
        busyOverlayService.removeOperation('test');
        expect(busyOverlayService.$$hideDeferred.notify).not.toHaveBeenCalled();
    });
});
