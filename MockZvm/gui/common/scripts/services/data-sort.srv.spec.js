'use strict';

describe('data sort service', function () {
    var dataSortService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_dataSortService_) {
        dataSortService = _dataSortService_;
    }));

    it('should sort asc', function () {
        var data = [{name: 'c'}, {name: 'b'}, {name: 's'}, {name: 'a'}];
        data.sort(dataSortService.getComparer('name', true));
        expect(data).toEqual([{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 's'}]);
    });

    it('should sort desc', function () {
        var data = [{name: 'c'}, {name: 'b'}, {name: 's'}, {name: 'a'}];
        data.sort(dataSortService.getComparer('name', false));
        expect(data).toEqual([{name: 's'}, {name: 'c'}, {name: 'b'}, {name: 'a'}]);
    });
    
    it('should sort by sort value if provided', function(){
        var data = [{name: {display: 'a', sortValue:1}}, {name: {display: 'c', sortValue:4}}, {name: {display: 's', sortValue:3}}, {name: {display: 'c', sortValue:2}}];
        data.sort(dataSortService.getComparer('name', true));
        expect(data).toEqual([{name: {display: 'a', sortValue:1}}, {name: {display: 'c', sortValue:2}}, {name: {display: 's', sortValue:3}}, {name: {display: 'c', sortValue:4}}]);
    });

    it('should sort by filterValue value if provided', function(){
        var data = [{name: {display: 'a', filterValue:1}}, {name: {display: 'c', filterValue:4}}, {name: {display: 's', filterValue:3}}, {name: {display: 'c', filterValue:2}}];
        data.sort(dataSortService.getComparer('name', true));
        expect(data).toEqual([{name: {display: 'a', filterValue:1}}, {name: {display: 'c', filterValue:2}}, {name: {display: 's', filterValue:3}}, {name: {display: 'c', filterValue:4}}]);
    });

    it('should sort by value if provided', function(){
        var data = [{name: {display: 'a'}}, {name: {display: 'j'}}, {name: {display: 's'}}, {name: {display: 'c'}}];
        data.sort(dataSortService.getComparer('name', true));
        expect(data).toEqual([{name: {display: 'a'}}, {name: {display: 'c'}}, {name: {display: 'j'}}, {name: {display: 's'}}]);
    });

    it('should sort by value if provided', function(){
        var data = [{name: {display: 'a', value:1}}, {name: {display: 'c', value:4}}, {name: {display: 's', value:3}}, {name: {display: 'c', value:2}}];
        data.sort(dataSortService.getComparer('name', true));
        expect(data).toEqual([{name: {display: 'a', value:1}}, {name: {display: 'c', value:2}}, {name: {display: 's', value:3}}, {name: {display: 'c', value:4}}]);
    });
});