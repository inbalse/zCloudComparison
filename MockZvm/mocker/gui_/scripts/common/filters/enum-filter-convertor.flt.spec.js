'use strict';
describe('Enum to string convertor filter', function () {

    var filter,enums;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_,_enums_) {
        filter = _$filter_('enumConvertor');
        enums = _enums_;
    }));

    it("should return completed for tasks status", function () {
        expect(filter('TASK_STATUS',enums.CommandTaskRecordStateVisualObject.Completed)).toEqual('ENUM.TASK_STATUS.5');
    });

});
