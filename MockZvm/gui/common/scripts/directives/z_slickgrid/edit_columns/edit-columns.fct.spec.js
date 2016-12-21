'use strict';

describe('edit columns factory', function () {

    //==========================================================================
    //  Add / remove columns from view
    //==========================================================================
    describe('edit columns', function () {

        var editColumnsFactory;

        beforeEach(function () {
            module('zvmTest');

            inject(function ($q, _editColumnsFactory_) {
                editColumnsFactory = _editColumnsFactory_;
                editColumnsFactory.deferred = $q.defer();
            });

        });

        it('should check for variables to be defined', function () {
            expect(editColumnsFactory.close).toBeDefined();
        });

        it("should test the open dialog parameters init", function () {
            var listOfColumnsPerView = [
                {displayName: 'name', visible: true, views: ['General']},
                {displayName: 'id', visible: false, views: ['General']}
            ];
            var data = {columns: listOfColumnsPerView};
            editColumnsFactory.openPopUpDialog(data);
            expect(editColumnsFactory.data).toEqual(data);
        });
    });

    //==========================================================================
    //  Create new template view
    //==========================================================================
    xdescribe('create new view', function () {
        var editColumnsFactory;

        beforeEach(function () {
            module('zvmTest');

            inject(function ($q, _editColumnsFactory_) {
                editColumnsFactory = _editColumnsFactory_;
                editColumnsFactory.openForCreate = true;
                editColumnsFactory.deferred = $q.defer();
            });

        });

        it("should test adding a new view", function () {
            editColumnsFactory.originaListOfColumns = [
                {displayName: 'name', visible: true, views: ['General']},
                {displayName: 'id', visible: false, views: ['General']}
            ];
            editColumnsFactory.listOfColumnsPerView = [
                {displayName: 'name', visible: true, views: ['General']},
                {displayName: 'id', visible: false, views: ['General']}
            ];
            editColumnsFactory.listOfViews = ['General', 'Other'];
            editColumnsFactory.resolve('NewView');
            expect(editColumnsFactory.originaListOfColumns[0].views).toEqual(['NewView', 'General']);

        });
    });
});
