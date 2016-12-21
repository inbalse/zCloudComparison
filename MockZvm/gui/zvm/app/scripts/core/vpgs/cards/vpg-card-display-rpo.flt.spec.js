'use strict';

describe('VPG card display rpo filter controller', function () {
    var displayRPOFilter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($filter) {
        displayRPOFilter = $filter('vpgCardDisplayRpo');
    }));

    it('should return NA when rpo value is invalid', function () {
        var result = displayRPOFilter(0),
            expected = {display: 'NA', units: undefined, mainNumber: undefined, secondaryNumber: undefined};
        expect(result).toEqual(expected);
        result = displayRPOFilter(-1);
        expect(result).toEqual(expected);
        result = displayRPOFilter(3955710);
        expect(result).toEqual(expected);
        result = displayRPOFilter(3955711);
        expect(result).toEqual(expected);
    });

    it('should return the number of seconds', function () {
        var result = displayRPOFilter(32);
        expect(result).toEqual({ display: '32', units: 'TIME_UNITS.SEC', mainNumber: 32, secondaryNumber: null });
    });

    it('should return the number of minutes', function () {
        var result = displayRPOFilter(74);
        expect(result).toEqual({ display: '01:14', units: 'TIME_UNITS.MIN', mainNumber: 1, secondaryNumber: 14 });
        result = displayRPOFilter(474);
        expect(result).toEqual({ display: '07:54', units: 'TIME_UNITS.MIN', mainNumber: 7, secondaryNumber: 54 });
    });

    it('should return the number of hours', function () {
        var result = displayRPOFilter(3806);
        expect(result).toEqual({ display: '01:03', units: 'TIME_UNITS.HOUR', mainNumber: 1, secondaryNumber: 3 });
        result = displayRPOFilter(9813);
        expect(result).toEqual({ display: '02:43', units: 'TIME_UNITS.HOURS', mainNumber: 2, secondaryNumber: 43 });
    });

    it('should return the number of days', function () {
        var result = displayRPOFilter(105952);
        expect(result).toEqual({ display: '01:05', units: 'TIME_UNITS.DAY', mainNumber: 1, secondaryNumber: 5 });
        result = displayRPOFilter(241813);
        expect(result).toEqual({ display: '02:19', units: 'TIME_UNITS.DAYS', mainNumber: 2, secondaryNumber: 19 });
    });
});
