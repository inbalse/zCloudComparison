'use strict';

describe('state time difference filter', function () {
    var stateTimeDifferenceFilter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($filter) {
        stateTimeDifferenceFilter = $filter('stateTimeDifference');
    }));

    it('should return the time display difference', function () {
        var result = stateTimeDifferenceFilter(31);
        expect(result).toEqual('31 seconds');
        result = stateTimeDifferenceFilter(60);
        expect(result).toEqual('1 minute');
        result = stateTimeDifferenceFilter(120);
        expect(result).toEqual('2 minutes');
        result = stateTimeDifferenceFilter(1652);
        expect(result).toEqual('27 minutes, 32 seconds');
        result = stateTimeDifferenceFilter(3899);
        expect(result).toEqual('1 hour, 4 minutes, 59 seconds');
        result = stateTimeDifferenceFilter(86400);
        expect(result).toEqual('1 day');
        result = stateTimeDifferenceFilter(96499);
        expect(result).toEqual('1 day, 2 hours, 48 minutes, 19 seconds');
        result = stateTimeDifferenceFilter(196499);
        expect(result).toEqual('2 days, 6 hours, 34 minutes, 59 seconds');

        result = stateTimeDifferenceFilter(0);
        expect(result).toEqual('');
    });
});
