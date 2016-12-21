describe('zertoServiceUpdaterFactory', function () {
    var factory, operation;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_zertoServiceUpdaterFactory_) {
        factory = _zertoServiceUpdaterFactory_;

        operation = 'AcknowledgeTaskSummary';
    }));


    it('should contain defined functions and variables', function () {
        expect(factory._operationsQueue).toBeDefined();
        expect(factory._interval).toBeDefined();
        expect(factory.register).toBeDefined();
        expect(factory.unregister).toBeDefined();
        expect(factory.unregisterAll).toBeDefined();
        expect(factory.updateTimeout).toBeDefined();
        expect(factory.update).toBeDefined();
        expect(factory.tick).toBeDefined();
    });

    it('should register scope for updates', function () {
        var scope = {
            $id: 1, $on: function () {
            }
        };
        factory.register(scope, operation, [], false);
        expect(factory._operationsQueue.length).toEqual(1);
        expect(factory._operationsQueue[0].fname).toEqual(operation);
        expect(factory._operationsQueue[0].params).toEqual([]);
        expect(factory._operationsQueue[0].showBusyOverlay).toBeFalsy();
        expect(factory._operationsQueue[0].scopes[0].scopeId).toEqual(1);
    });

    it('should unregister scope from updates', function () {
        var scope = {
            $id: 1, $on: function () {
            }
        };
        factory.register(scope, operation, [], false);
        factory.unregister(scope, operation, []);
        expect(factory._operationsQueue.length).toEqual(0);
    });

    it('should unregister all', function () {
        var scope1 = {
            $id: 1, $on: function () {
            }
        };
        var scope2 = {
            $id: 2, $on: function () {
            }
        };
        factory.register(scope1, operation, [], false);
        factory.register(scope2, operation, [], false);
        factory.unregisterAll(operation);

        expect(factory._operationsQueue.length).toEqual(0);
    });

    //it('it should update properly ', function () {
    //    spyOn(timeout, 'cancel').and.callThrough();
    //    spyOn(factory, 'tick').and.callThrough();
    //
    //    var scope = {
    //        $id: 1, $on: function () {
    //        }
    //    };
    //    factory.register(scope, operation, [], false);
    //
    //    factory.update();
    //    expect(timeout.cancel).toHaveBeenCalled();
    //    timeout.flush(50);
    //    expect(factory.tick).toHaveBeenCalled();
    //    expect(factory.updateTimeout).toBeNull();
    //});
});
