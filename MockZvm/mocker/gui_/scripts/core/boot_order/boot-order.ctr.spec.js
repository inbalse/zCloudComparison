'use strict';

describe('bootOrderControllerTest', function () {
    var scope, controller, factory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _bootOrderFactory_) {
        scope = $rootScope.$new();
        factory = _bootOrderFactory_;
        var entities = {};
        var items = {};
        var trans = function (value) {
            return {then: function (resolve) {
                return resolve({});
            }}
        };
        var data = {Groups: [
            {BootGroupIdentifier: {}, Name: 'test1', Machines: {'Id': {}, 'DisplayName': 'vmTest1'}, Settings: {BootDelay: 0, ShutdownDelay: 0, WaitForTools: false}},
            {BootGroupIdentifier: {}, Name: 'test2', Machines: {'Id': {}, 'DisplayName': 'vmTest2'}, Settings: {BootDelay: 40, ShutdownDelay: 0, WaitForTools: false}}
        ]};
        controller = $controller('bootOrderController', {$scope: scope, data: data, entities: entities, items: items, bootOrderFactory: factory});
    }));

    it('should have handlers defined', function () {
        expect(scope.data).toBeDefined();
        expect(scope.handleSaveClicked).toBeDefined();
        expect(scope.handleCancelClicked).toBeDefined();
        expect(scope.handleAddGroupClicked).toBeDefined();
        expect(scope.toggle).toBeDefined();
        expect(scope.removeGroup).toBeDefined();
        expect(scope.checkIfRemoveEnable).toBeDefined();
        expect(scope.checkIfGroup).toBeDefined();
        expect(scope.checkIfEditable).toBeDefined();
    });

    it('should check if "group list" update', function () {
        expect(scope.list.length).toEqual(2);
    });

    it('should check if data after adding groups', function () {
        scope.handleAddGroupClicked();
        scope._updateGroups(scope.list);

        expect(scope.data.Groups.length).toEqual(3);
    });
});
