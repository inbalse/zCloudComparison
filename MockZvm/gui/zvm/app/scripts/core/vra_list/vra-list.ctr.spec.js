'use strict';

describe('VRA list window', function () {
    var controller, testScope, vraInstallFactory, trans, groupByService, globalStateModel, analyticsEventsTypes, vraListEvents;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _groupByService_, _globalStateModel_, _analyticsEventsTypes_, _vraListEvents_) {
        testScope = $rootScope.$new();

        vraListEvents = _vraListEvents_;
        analyticsEventsTypes = _analyticsEventsTypes_;
        groupByService = _groupByService_;
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {};

        controller = $controller('vraListController', {$scope: testScope});
    }));


    it("should show data as empty", function () {
        expect(testScope.data).toBeUndefined();
    });

    it("should check grid definitions", function () {
        expect(testScope.customOptions).toBeDefined();
    });

    it("should check number of columns in grid", function () {
        expect(testScope.customOptions.columns.length).toEqual(22);
    });

    it("should check definitions of open var install function", function () {
        expect(testScope.openInstallVra).toBeDefined();
    });

    it("should check defined parameters", function () {
        expect(testScope.selectedItems).toBeDefined();
        expect(testScope.isUninstallDisabled).toBeTruthy();
        expect(testScope.installEnabled).toBeFalsy();
    });

    it("should check uninstall definition", function () {
        spyOn(testScope, 'isUninstallContainRecoveryVps');
        expect(testScope.uninstallVra).toBeDefined();
        testScope.uninstallVra();
        expect(testScope.isUninstallContainRecoveryVps).toHaveBeenCalled();
    });

    it("should check the checkIfIsUninstallVRAEnabled function", function () {
        expect(testScope.checkIfIsUninstallVRAEnabled).toBeDefined();
        testScope.vraSelectedItems = [];
        expect(testScope.checkIfIsUninstallVRAEnabled()).toBeFalsy();
    });

    it('verify that new-VRA triggers an google analytics event', function () {
        spyOn(testScope, '$emit');
        testScope.openInstallVra();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.NEW_VRA.START);
    });

    it('verify that edit-VRA triggers an google analytics event', function () {
        spyOn(testScope, '$emit');
        testScope.openEditVra();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.EDIT_VRA.START);
    });

    it('verify that delete-VRA triggers an google analytics event', function () {
        spyOn(testScope, '$emit');
        testScope.uninstallVra();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.DELETE_VRA);
    });


    describe("Row button test", function () {
        var e, args;
        beforeEach(function () {
            e = {
                preventDefault: function () {
                },
                target: {}
            };
            args = {
                row: {
                    ID: '1234'
                }
            };
            testScope.gridObj = {
                grid: {
                    getDataItem: function () {
                        return args.row;
                    }
                }
            };
        });

        it('should trigger an google analytics event when clicking on recycle bin', function () {
            e.target.value = vraListEvents.vraDelete;
            spyOn(testScope, '$emit');
            testScope.rowClick(e, args);
            expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.DELETE_VRA);
        });

        it('should trigger an google analytics event when clicking on edit button', function () {
            e.target.value = vraListEvents.vraEdit;
            spyOn(testScope, '$emit');
            testScope.rowClick(e, args);
            expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.EDIT_VRA.START);
        });

    });

});
