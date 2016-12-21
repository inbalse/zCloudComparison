'use strict';

describe('create vpg run job filter', function () {
    var enums, filter;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_, _enums_) {
        enums = _enums_;
        filter = _$filter_('summaryRunJobFilter');
    }));

    it("should return undefined in case that object is invalid", function () {
        expect(filter()).toEqual(undefined);
    });
    it("should return empty in case that object is empty", function () {
        expect(filter({})).toEqual('');
    });
    it("should return parsed object", function () {
        expect(filter({SchedulePeriodType: 1, DayOfWeek: 1, RunningTimeOfDayInMinutes: 500})).toEqual('ENUM.SCHEDULE_PERIOD_TYPE.1, ENUM.DAYS.1 AT 08:20');
    });
});