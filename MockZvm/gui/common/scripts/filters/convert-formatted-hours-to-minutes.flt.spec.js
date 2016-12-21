'use strict';

describe('convert formatted hh:mm to minutes', function () {
    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_) {
        filter = _$filter_('convertFormatHoursToMinutes');
    }));

    it("should return the right minutes", function () {
        expect(filter('09:23')).toEqual(563);
    });

    it("should return 15 minutes", function () {
        expect(filter('00:15')).toEqual(15);
    });
});