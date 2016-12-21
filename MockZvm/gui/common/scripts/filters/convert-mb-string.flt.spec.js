'use strict';
describe('MB value to string converter filter', function () {
    var filter;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('mbToStringConvertor');
    }));


    it('should return the string value of GB', function(){
        expect(filter(94833)).toEqual('92.6 GB');
    });

    it('should return the string value of TB', function(){
        expect(filter(12020202)).toEqual('11.5 TB');
    });

    it('should return the string value of mb', function(){
        expect(filter(400)).toEqual('400.0 MB');
    });
});