'use strict';

describe('journalHardLimitGridLabelFilterTest', function () {

    var filter,enums;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_,_enums_) {
        filter = _$filter_('journalHardLimitGridLabelFilter');
        enums = _enums_;
    }));

    it("should give a right label based on the input", function () {
        expect(filter({Type:enums.JournalLimitType.Unlimited,Limit:2})).toEqual('Unlimited');

        expect(filter({Type:enums.JournalLimitType.Percentage,Limit:46})).toEqual('46%');

        expect(filter({Type:enums.JournalLimitType.Megabytes,Limit:8 * 1024})).toEqual('8GB');
    });
});
