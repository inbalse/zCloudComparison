'use strict';

describe('restoreVolumesController', function () {
    var controller, parentScope, scope, restoreEditVolumeFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _restoreEditVolumeFactory_) {
        restoreEditVolumeFactory = _restoreEditVolumeFactory_;

        parentScope = $rootScope.$new();
        parentScope.item = {};
        parentScope.potentials = {Datastores: []};
        scope = parentScope.$new();

        controller = $controller('restoreVolumesController', {$scope: scope, restoreEditVolumeFactory: restoreEditVolumeFactory});

        scope.gridObj = {grid:{ updateData: function () { }}};
    }));


    it('should contain defined variables and functions', function () {
        expect(scope.handleEditSelectedClick).toBeDefined();
        expect(scope.onEditFactoryResult).toBeDefined();
        expect(scope.gridObj.grid).toBeDefined();
        expect(scope.item).toBeDefined();
        expect(scope.potentials).toBeDefined();
        expect(scope.restoreVolumesColumnsDefs).toBeDefined();
        expect(scope.selectedItems).toBeDefined();
        expect(scope.restoreVolumesOptions).toBeDefined();
        expect(scope.onSelection).toBeDefined();
        expect(scope.updateGrid).toBeDefined();
    });

    it('should editnicfactory when edit button clicked', function () {
        spyOn(restoreEditVolumeFactory, 'openEdit').and.callThrough();
        scope.handleEditSelectedClick();
        expect(restoreEditVolumeFactory.openEdit).toHaveBeenCalledWith([], {Datastores: []});
    });

    it('should assign result item data to all selected items', function () {
        scope.item.Volumes = [
            {Destination: {}, Path: 'Path1'},
            {Destination: {}, Path: 'Path2'},
            {Destination: {}, Path: 'Path3'}
        ];
        scope.selectedItems = [
            {Destination: {}, Path: 'Path1'},
            {Destination: {}, Path: 'Path2'}
        ];

        scope.onEditFactoryResult(
            {
                IsThinEnabled: true,
                Destination: {Datastore: 'Datastore'}
            });


        expect(angular.equals(scope.item.Volumes, [
            { Destination: { Datastore: { Datastore: 'Datastore' } }, Path: 'Path1', IsThinEnabled: true },
            { Destination: { Datastore: { Datastore: 'Datastore' } }, Path: 'Path2', IsThinEnabled: true },
            { Destination: {  }, Path: 'Path3' }
        ])).toBeTruthy();
    });
});
