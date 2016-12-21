'use strict';

describe('group by filter', function () {

    var filter;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('groupBy');
    }));

    it("should return protected direction html to header group", function () {
        var row = {label: '0', field:'Direction', totalChildren: function() {} };
        spyOn(row, 'totalChildren').and.returnValue(2);
        expect(filter(row)).toEqual('<div class="z-group-div-pos">Protected<span class="z-group-span-pos">2 Items</span></div>');
    });

    it("should return recovey direction html to header group", function () {
        var row = {label: '1', field:'Direction', totalChildren: function() {} };
        spyOn(row, 'totalChildren').and.returnValue(2);
        expect(filter(row)).toEqual('<div class="z-group-div-pos">Recovery<span class="z-group-span-pos">2 Items</span></div>');
    });

    it("should return self direction html to header group", function () {
        var row = {label: '2', field:'Direction', totalChildren: function() {} };
        spyOn(row, 'totalChildren').and.returnValue(2);
        expect(filter(row)).toEqual('<div class="z-group-div-pos">Self<span class="z-group-span-pos">2 Items</span></div>');
    });

    it("should return field  html to header group", function () {
        var row = {label: 'name', field:'SourceSiteName', totalChildren: function() {} };
        spyOn(row, 'totalChildren').and.returnValue(2);
        expect(filter(row)).toEqual('<div class="z-group-div-pos">name<span class="z-group-span-pos">2 Items</span></div>');
    });

});
