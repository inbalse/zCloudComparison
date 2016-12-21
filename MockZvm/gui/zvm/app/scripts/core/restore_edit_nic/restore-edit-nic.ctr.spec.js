'use strict';

describe('restoreEditNicController', function () {
    var controller, scope, restoreEditNicFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _restoreEditNicFactory_) {
        scope = $rootScope.$new();
        restoreEditNicFactory = _restoreEditNicFactory_;

        restoreEditNicFactory._promise = {
            resolve: function () {

            },
            reject: function () {

            }};
        restoreEditNicFactory._closeWindow = function () {

        };

        controller = $controller('restoreEditNicController', {$scope: scope, item: {}, potentials: [], isBulk: false, restoreEditNicFactory: restoreEditNicFactory});
    }));

    it('should contain defined variables and functions', function () {
        expect(scope.loading).toBeDefined();
        expect(scope.item).toBeDefined();
        expect(scope.potentials).toBeDefined();
        expect(scope.isBulk).toBeDefined();
        expect(scope.handleSaveClicked).toBeDefined();
        expect(scope.handleCancel).toBeDefined();
        expect(scope.processTranslations).toBeDefined();
    });

    it('should call factory when save is clicked', function () {
        spyOn(restoreEditNicFactory, 'save').and.callThrough();
        scope.handleSaveClicked();
        expect(restoreEditNicFactory.save).toHaveBeenCalledWith({});
    });

    it('should call factory when close is clicked', function () {
        spyOn(restoreEditNicFactory, 'close').and.callThrough();
        scope.handleCancel();
        expect(restoreEditNicFactory.close).toHaveBeenCalled();
    });
});
