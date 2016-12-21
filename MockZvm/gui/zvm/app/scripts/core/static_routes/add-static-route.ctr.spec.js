'use strict';

describe('addStaticRoutesControllerTest', function () {
    var scope, controller, data, modalInstance;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, vos, $uibModal) {
        scope = $rootScope.$new();

        data = {isGroup: true,
            id: vos.RouteGroupIdentifier,
            editable: true,
            title: 'test',
            items: []};

        modalInstance = { close: function() {}, dismiss: function() {} };
        controller = $controller('addStaticRoutesController', {$scope: scope, result: data, $uibModalInstance:modalInstance});

        spyOn(modalInstance, 'close');

    }));

    it('should check data', function () {
        expect(scope.data).toBeDefined();
        expect(scope.data.title).toEqual('test');
        expect(scope.staticRouteObj.address).toEqual('');
        expect(scope.staticRouteObj.subnetMask).toEqual('');
        expect(scope.staticRouteObj.gateway).toEqual('');
    });

    it('should check save data', function () {
        scope.staticRouteObj.address = '111.111.111.1'
        scope.staticRouteObj.subnetMask = '111.111.111.12'
        scope.staticRouteObj.gateway = '111.111.111.13'

        scope.save();

        expect(scope.data.items.length).toEqual(1);
        expect(scope.data.items[0].destination).toEqual('111.111.111.1');
        expect(scope.data.items[0].netmask).toEqual('111.111.111.12');
        expect(scope.data.items[0].gateway).toEqual('111.111.111.13');
    });
});
