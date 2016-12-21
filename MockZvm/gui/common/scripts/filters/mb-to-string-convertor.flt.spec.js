'use strict';
describe('mb to String convertor filter', function () {

    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('mbToStringConvertorFilter');
    }));

    it("should return 0.0 MB value", function(){
        expect(filter(0)).toEqual('0.0 MB');
    });

    it("should return 0.0 MB value", function(){
        expect(filter(900)).toEqual('900.0 MB');
    });

    it("should return 1.0 GB value", function(){
        expect(filter(1024)).toEqual('1.0 GB');
    });
});