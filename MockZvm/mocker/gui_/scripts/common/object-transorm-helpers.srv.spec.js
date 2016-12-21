'use strict';

describe('objectTransformHelpersTest', function () {
    var enums, vos, service;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_enums_, _vos_, objectTransformHelpersService) {
        enums = _enums_;
        vos = _vos_;
        service = objectTransformHelpersService;
    }));

    it('should transform MB to GB for Journal Limit Value object', function () {
        var mbToGb = {Type: enums.JournalLimitType.Megabytes, Limit: 10240};

        service.JournalLimitTypeMBtoGB(mbToGb);
        expect(mbToGb.Limit).toEqual(10);
    });
    it('should transform MB to GB for Journal Limit Value object', function () {
        var gbToMb = {Type: enums.JournalLimitType.Megabytes, Limit: 10};

        service.JournalLimitTypeGBtoMB(gbToMb);
        expect(gbToMb.Limit).toEqual(10240);
    });
});