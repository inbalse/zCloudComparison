'use strict';

describe('staticRoutesControllerTest', function () {
    var scope, controller, factory, vos;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _staticRoutesFactory_, _vos_) {
        scope = $rootScope.$new();
        factory = _staticRoutesFactory_;
        vos = _vos_;

        var data = [{Editable: true, Name:'test', RouteGroupIdentifier: {Guid:'7891011'},
            StaticRoutes:[{Identifier:{Guid:'1110987'},
                            Destination: '222.222.222.2',
                            Gateway: '222.222.222.2',
                            Netmask: '222.222.222.2'}]}];

        controller = $controller('staticRoutesController', {$scope: scope, result: data, staticRoutesFactory: factory, vos:vos});
    }));

    it('should check list data', function () {
        expect(scope.list[0].isGroup).toBeTruthy();
        expect(scope.list[0].editable).toBeTruthy();
        expect(scope.list[0].title).toEqual('test');
        expect(scope.list[0].items.length).toEqual(1);
    });

    it('should check if list after adding group', function () {
        scope.handleAddGroupClicked();
        expect(scope.list.length).toEqual(2);
    });

    it('should check _updateGroups function', function () {
        scope._updateGroups([{ isGroup: true,
                                id: vos.RouteGroupIdentifier,
                                editable: true,
                                title: 'test',
                                items: [{isGroup: false,
                                            id: vos.StaticRouteIdentifier(),
                                            destination:  '111.111.111.111',
                                            gateway: '111.111.111.111',
                                            netmask: '111.111.111.111'
                                            }]}]);
        expect(scope.data.length).toEqual(1);
        expect(scope.data[0].Name).toEqual('test');
        expect(scope.data[0].StaticRoutes.length).toEqual(1);
    });

    it('should check save handler', function () {
        spyOn(factory,'save');
        scope.handleSave();
        expect(factory.save).toHaveBeenCalled();
    });
});
