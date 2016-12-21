'use strict';
describe('storage MB to string filter', function () {

    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('storageMBToStringfilter');
    }));

    it("should return 0 value", function(){
        expect(filter(0)).toEqual('0');
    });

    it("should return 5 MB value", function(){
        expect(filter(5)).toEqual('5 MB');
    });

    it("should return 1 GB value", function(){
        expect(filter(1024)).toEqual('1.00 GB');
    });

    it("should return 1 TB value", function(){
        expect(filter(1048576)).toEqual('1.00 TB');
    });

    it("should return 512 KB value", function(){
        expect(filter(0.5)).toEqual('512 KB');
    });
});