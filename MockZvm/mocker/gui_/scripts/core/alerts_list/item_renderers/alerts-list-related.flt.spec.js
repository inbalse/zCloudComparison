'use strict';
describe('Alerts list related column filter', function () {

    var filter, testRow = {'Entities':[{'Identifier':{'GroupGuid':'ac094959-25a6-466c-937d-9ebe5fa9901a'},'Name':'New VPG'}]};

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_) {
        filter = _$filter_('alertsListRelated');
    }));


    it("should return the entities as links", function(){
        expect(filter(testRow)).toEqual('<a href="#" >New VPG</a>');
    });
});