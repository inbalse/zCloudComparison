'use strict';

describe('time seconds converter filter', function () {
    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('zTimeSecondsFormatter');
    }));

    it("should return full format time with suffix", function(){
        expect(filter(240, 'HH:MM:SS', true, true)).toEqual('00:04:00 min');
    });

    it("should return full format time without suffix", function(){
        expect(filter(240, 'HH:MM:SS', true)).toEqual('00:04:00');
    });

    it("should return middle format time without suffix", function(){
        expect(filter(240, 'HH:MM', true)).toEqual('00:04');
    });

    it("should return short format time without suffix", function(){
        expect(filter(240, 'HH', true)).toEqual('00');
    });

    it("should return short format time with seconds and suffix", function(){
        expect(filter(24, 'HH:MM:SS', false, true)).toEqual('24 sec');
    });

    it("should return short format time with minutes and suffix", function(){
        expect(filter(240, 'HH', true, true)).toEqual('00 min');
    });

    it("should return short format time hours and suffix", function(){
        expect(filter(24000, 'HH', true, true)).toEqual('06 hours');
    });

    it("should return full format time with seconds without suffix", function(){
        expect(filter(24, 'HH:MM:SS', true)).toEqual('00:00:24');
    });

    it("should return full format time with seconds without suffix", function(){
        expect(filter(3213565, 'HH:MM:SS', true)).toEqual('892:39:25');
    });

});
