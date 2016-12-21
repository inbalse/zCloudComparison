'use strict';
describe('convert format seconds filter', function () {

    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('convertFormatSecondsFilter');
    }));

    it("should return NA value", function(){
        expect(filter(-1)).toEqual('NA');
    });

    it("should return 5 sec", function(){
        expect(filter(5)).toEqual('5 sec');
    });

    it("should return 'HH:mm:ss' format", function(){
        expect(filter(3662)).toEqual('01:01:02 hours');
    });

    it("should return 'HH:mm' format", function(){
        expect(filter(3660)).toEqual('01:01 hours');
    });

    it("should return 'H' format", function(){
        expect(filter(3600)).toEqual('1 hours');
    });

    it("should return 'mm:ss' format", function(){
        expect(filter(62)).toEqual('01:02 min');
    });

    it("should return 'm' format", function(){
        expect(filter(60)).toEqual('1 min');
    });
});