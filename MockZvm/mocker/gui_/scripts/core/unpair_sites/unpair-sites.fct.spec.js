'use strict';

describe('unpairSitesFactory', function () {
    var factory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_unpairSitesFactory_) {
        factory = _unpairSitesFactory_;
    }));

    it('should have properties and function defined', function () {
        expect(factory.sitesToUnpairCollection).toBeNull();
        expect(factory.deferred).toBeNull();
        expect(factory.startUnpair).toBeDefined();
        expect(factory.createUnpairMessage).toBeDefined();
    });

    //this test sucks and should be rewrittent when we have translations in UT
    it('should create a message for the window to show', function () {
        var result = factory.createUnpairMessage([
            {HostName: '1', NumberOfVpgs: 0},
            {HostName: '2', NumberOfVpgs: 2},
            {HostName: '3', NumberOfVpgs: 1}
        ]);
        expect(result).toEqual('UNPAIR_SITES.UNPAIR_MESSAGE_WITH_VPGS');

        var result2 = factory.createUnpairMessage([
            {HostName: '1', NumberOfVpgs: 0},
            {HostName: '2', NumberOfVpgs: 0},
            {HostName: '3', NumberOfVpgs: 0}
        ]);
        expect(result2).toEqual('UNPAIR_SITES.UNPAIR_MESSAGE_NO_VPGS');
    });
});
