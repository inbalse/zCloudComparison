'use strict';

describe('restoreBulkEditController', function () {
    var controller, scope, restoreBulkEditFactory, zertoServiceFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _restoreBulkEditFactory_, _zertoServiceFactory_) {
        scope = $rootScope.$new();
        zertoServiceFactory = _zertoServiceFactory_;
        restoreBulkEditFactory = _restoreBulkEditFactory_;

        restoreBulkEditFactory._promise = {
            resolve: function () {

            },
            reject: function () {

            }};
        restoreBulkEditFactory._closeWindow = function () {

        };
        controller = $controller('restoreBulkEditController', {$scope: scope, item: {}, hosts: [], datastores: [], zertoServiceFactory: zertoServiceFactory, restoreBulkEditFactory: restoreBulkEditFactory});
    }));

    it('should contain defined functions and variables', function () {
        expect(scope.loading).toBeDefined();
        expect(scope.item).toBeDefined();
        expect(scope.hosts).toBeDefined();
        expect(scope.handleSaveClicked).toBeDefined();
        expect(scope.handleCancel).toBeDefined();
        expect(scope.processTranslations).toBeDefined();
    });

    it('should call factory when save is clicked', function () {
        spyOn(restoreBulkEditFactory, 'save').and.callThrough();
        scope.handleSaveClicked();
        expect(restoreBulkEditFactory.save).toHaveBeenCalledWith({});
    });

    it('should call factory when close is clicked', function () {
        spyOn(restoreBulkEditFactory, 'close').and.callThrough();
        scope.handleCancel();
        expect(restoreBulkEditFactory.close).toHaveBeenCalled();
    });

});
