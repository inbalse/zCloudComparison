describe('restoreBulkEditFactory', function () {
    var factory, modal, q;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$uibModal_, _$q_, _restoreBulkEditFactory_) {
        factory = _restoreBulkEditFactory_;
        modal = _$uibModal_;
        q = _$q_;
    }));


    it('should contain defined functions and variables', function () {
        expect(factory.openEdit).toBeDefined();
        expect(factory.createSharedObject).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.close).toBeDefined();
        expect(factory._closeWindow).toBeDefined();
    });


    it('should create shared object', function () {
        var result = factory.createSharedObject([
            {ComputeResource: '123', Datastore: '234', IsPowerOn: true},
            {ComputeResource: '123', Datastore: '234', IsPowerOn: true}
        ]);
        expect(result).toEqual({ComputeResource: '123', Datastore: '234', IsPowerOn: true});

        result = factory.createSharedObject([
            {ComputeResource: '123', Datastore: '234', IsPowerOn: true},
            {ComputeResource: '', Datastore: '', IsPowerOn: false}
        ]);
        expect(result).toEqual({ComputeResource: null, Datastore: null, IsPowerOn: undefined});
    });
});
