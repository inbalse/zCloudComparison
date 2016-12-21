'use strict';

describe('Display RPO filter', function () {
    var displayRpoFilter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($filter) {
        displayRpoFilter = $filter('displayRPO');
    }));

    it('should remove padding zero if time is under 10 seconds', function(){
        expect(displayRpoFilter(6)).toEqual('6 sec');
    });

    it('should return the display rpo', function () {
        expect(displayRpoFilter(1200)).toEqual('20:00 min');
        expect(displayRpoFilter(129)).toEqual('02:09 min');
        expect(displayRpoFilter(4129)).toEqual('01:08:49 hours');
        expect(displayRpoFilter(56)).toEqual('56 sec');
    });

    it('should return NA if value is out of bounds', function(){
        expect(displayRpoFilter(0)).toEqual('NA');
        expect(displayRpoFilter(-50)).toEqual('NA');
        expect(displayRpoFilter(3955710)).toEqual('NA');
        expect(displayRpoFilter(4955710)).toEqual('NA');
    });
});