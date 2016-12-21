'use strict';
describe('Edit columns controller', function () {
    var controller, testScope, editColumnsModel, editColumnsFactory;

    beforeEach(module('zvmTest'));

    describe('change columns editor', function () {
        beforeEach(inject(function ($injector, $controller, $q, $rootScope, $translate, _editColumnsFactory_, _editColumnsModel_) {
            testScope = $rootScope.$new();
            editColumnsModel = _editColumnsModel_;

            testScope.translations = {};
            editColumnsFactory = _editColumnsFactory_;
            /// --- mock data ----
            editColumnsFactory.data = {
                selectedView: 'General',
                gridId:'gridId',
                columns: [
                    {displayName: 'name', visible: true, views: ['General']},
                    {displayName: 'id', visible: false, views: ['General']}
                ],
                columnsByPresetFunc: function () {
                    return [];
                },
                openForCreate: false
            };

            editColumnsFactory.modalInstance = {dismiss: function () { }};

            editColumnsFactory.deferred = {resolve: function (viewName) {}};

            controller = $controller('editColumnsController', {$scope: testScope, editColumnsFactory: editColumnsFactory, editColumnsModel:editColumnsModel});
        }));

        it("should have user interaction function defined", function () {
            expect(testScope.okButton).toBeDefined();
            expect(testScope.close).toBeDefined();
        });

        it("should check properties defined", function () {
            expect(testScope.loading).toBeDefined();
            expect(testScope.data).toBeDefined();
        });

        it("should have cancel and submit handlers for the buttons", function () {
            expect(testScope.buttons[1].handler).toEqual(testScope.save);
            expect(testScope.buttons[0].handler).toEqual(testScope.close);
        });

        it("should call the ok function and call the setNewColumnsList function", function () {
            spyOn(editColumnsFactory, 'close').and.callThrough();
            testScope.save();
            expect(editColumnsFactory.close).toHaveBeenCalled();
        });
    });

    describe('create new view editor', function () {
        beforeEach(inject(function ($injector, $controller, $q, $rootScope, $translate, _editColumnsFactory_) {
            testScope = $rootScope.$new();

            testScope.translations = {};
            editColumnsFactory = _editColumnsFactory_;
            /// --- mock data ----
            editColumnsFactory.data = {
                selectedView: 'General',
                columns: [
                    {displayName: 'name', visible: true, views: ['General']},
                    {displayName: 'id', visible: false, views: ['General']}
                ],
                columnsByPresetFunc: function () {
                    return [];
                },
                openForCreate: true,
                storeObj:{
                    gridId: 'gridId',
                    default: 'default'
                }
            };

            controller = $controller('editColumnsController', {$scope: testScope, editColumnsFactory: editColumnsFactory});
        }));

        it("should check the dialog for creating a new view", function () {
            expect(testScope.okButton.handler).toEqual(testScope.save);
        });


        it("should check the dialog button validation if selected less that 4 columns in create and edit mode", function () {
            editColumnsFactory.data.columns = [
                {displayName: 'vpgName', visible: true, views: ['General']},
                {displayName: 'vm', visible: true, views: ['General']},
                {displayName: 'cool', visible: true, views: ['General']},
                {displayName: 'bad', visible: false, views: ['General']},
                {displayName: 'status', visible: false, views: ['General']}];

            testScope.columnsSelectedChange();
            expect(testScope.okButton.disabled).toBeTruthy();

            editColumnsFactory.data.columns[3].visible = true;

            testScope.columnsSelectedChange();
            expect(testScope.okButton.disabled).toBeFalsy();
        });

    });
});
