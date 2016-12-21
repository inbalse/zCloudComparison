'use strict';
describe('storage Bytes to string filter', function () {

    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('storageBytesToStringfilter');
    }));

    it("should return 0 value", function(){
        expect(filter(0)).toEqual('0');
    });

    it("should return 2 KB value", function(){
        expect(filter(2048)).toEqual('2 KB');
    });

    it("should return 1 GB value", function(){
        expect(filter(1024 * 1024 * 1024)).toEqual('1.00 GB');
    });

    it("should return 1 TB value", function(){
        expect(filter(1024 * 1024 * 1024 * 1024)).toEqual('1.00 TB');
    });

});