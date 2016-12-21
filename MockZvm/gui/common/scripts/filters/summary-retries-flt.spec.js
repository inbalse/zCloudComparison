'use strict';

describe('create vpg retries filter', function () {
    var enums, filter;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_, _enums_) {
        enums = _enums_;
        filter = _$filter_('summaryRetriesFilter');
    }));

    it('should return undefined in case that object is invalid', function () {
        expect(filter()).toEqual('NOT_DEFINED');
    });

});