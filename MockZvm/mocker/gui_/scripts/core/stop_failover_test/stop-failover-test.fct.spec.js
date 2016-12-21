'use strict';

describe('stopFailoverTestFactory', function () {
    var factory, service, modal, alert;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$uibModal_, _stopFailoverTestFactory_, _zertoServiceFactory_, _zAlertFactory_) {
        factory = _stopFailoverTestFactory_;
        service = _zertoServiceFactory_;
        modal = _$uibModal_;
        alert = _zAlertFactory_;
    }));


    it('should have all of the interfaces in place', function () {
        expect(factory.stopTestByIds).toBeDefined();
        expect(factory.close).toBeDefined();
        expect(factory.stop).toBeDefined();

        expect(factory.modalInstance).toEqual(null);
        expect(factory.deferred).toEqual(null);
        expect(factory.collection).toEqual([]);
    });

    it('should call zertoServiceFactory.GetStopTestScreen when stopTestByIds is called', function () {
        spyOn(service, 'GetStopTestScreen').and.callThrough();
        factory.stopTestByIds([]);
        expect(service.GetStopTestScreen).toHaveBeenCalled();
    });
});
