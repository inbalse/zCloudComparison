'use strict';
describe('restore point rangeEnum filter', function () {

    var filter, enums;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_,_enums_) {
        enums = _enums_;
        filter = _$filter_('restorePointRangeEnum');
    }));

    it("should return empty value", function(){
        expect(filter(enums.RestorePointRangeType.NineMonths)).toEqual('');
    });

    it("should return 9 Months", function(){
        expect(filter(enums.RestorePointRangeType.NineMonths, enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended)).toEqual('ENUM.RESTORE_POINT_RANG_TYPE.NINE_MONTHS');
    });
});