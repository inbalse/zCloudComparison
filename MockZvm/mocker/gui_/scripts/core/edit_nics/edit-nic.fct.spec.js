'use strict';

describe('edit nic factory', function () {
    var factory, modal;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_, _nicEditFactory_) {
        factory = _nicEditFactory_;
        modal = _$uibModal_;
    }));

    it('should have function defined', function () {
        expect(factory.open).toBeDefined();
        expect(factory.close).toBeDefined();
        expect(factory.save).toBeDefined();
    });

    it('should open the modal', function () {
        spyOn(modal, 'open');
        factory.open();
        expect(modal.open).toHaveBeenCalledWith({
                templateUrl: 'scripts/core/edit_nics/edit-nic.html',
                windowClass: 'nic-edit-modal',
                controller: 'nicEditController',
                backdrop: false,
                resolve: {
                    selectedNics: jasmine.any(Function),
                    potentials: jasmine.any(Function)
                }
            }
        );
    });

    it('should close the modal', function () {
        factory.open();
        spyOn(factory.deferred, 'reject');
        spyOn(factory.modalInstance, 'dismiss');
        factory.close();
        expect(factory.deferred.reject).toHaveBeenCalledWith(null);
        expect(factory.modalInstance.dismiss).toHaveBeenCalled();
    });

    it('should save the modal', function () {
        factory.open();
        factory.modalInstance.close = angular.noop;

        spyOn(factory.deferred, 'resolve');
        spyOn(factory.modalInstance, 'close');

        var value = {dummy: true};
        factory.save(value);
        expect(factory.deferred.resolve).toHaveBeenCalledWith(value);
        expect(factory.modalInstance.close).toHaveBeenCalled();
    });
});
