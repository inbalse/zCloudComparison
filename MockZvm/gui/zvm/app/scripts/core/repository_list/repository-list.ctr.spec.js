'use strict';

describe('Repository list window', function () {
    var controller, testScope, zAlertFactory, entityEvents, groupByService, siteSettingsFactory, globalStateModel, repositoryEditFactory, analyticsEventsTypes;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($injector, $controller, $rootScope, _groupByService_, _siteSettingsFactory_, _zAlertFactory_, _entityEvents_, _repositoryEditFactory_, _analyticsEventsTypes_) {
        testScope = $rootScope.$new();
        siteSettingsFactory = _siteSettingsFactory_;
        groupByService = _groupByService_;
        zAlertFactory = _zAlertFactory_;
        entityEvents = _entityEvents_;
        repositoryEditFactory = _repositoryEditFactory_;
        analyticsEventsTypes = _analyticsEventsTypes_;
        controller = $controller('repositoryListController', {
            $scope: testScope, siteSettingsFactory: siteSettingsFactory,
            zAlertFactory: zAlertFactory, entityEvents: entityEvents, repositoryEditFactory: repositoryEditFactory
        });
    }));

    it("should show data as empty", function () {
        expect(testScope.data).toBeUndefined();
    });

    it("should check declared functions", function () {
        expect(testScope.addRepository).toBeDefined();
        expect(testScope.selectedItemsChange).toBeDefined();
    });

    it("should check grid definitions", function () {
        expect(testScope.customOptions).toBeDefined();
        expect(testScope.customOptions.multiSelect).toBeFalsy();
    });

    it("should enable menu options when selecting an item", function () {
        var dummyRepo = {};
        testScope.selectedItems.push(dummyRepo);
        spyOn(testScope, 'isMenuOptionsEnabled').and.returnValue(true);
    });

    it("should open a delete repository modal with a repository id", function () {
        spyOn(zAlertFactory, 'warn');
        testScope.deleteRepo("some guid");
        expect(testScope.deleteId).toEqual(jasmine.any(String));
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('verify that new-Repository triggers an google analytics event', function () {
        spyOn(testScope, '$emit');
        testScope.addRepository();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.NEW_REPOSITORY);
    });

    it('verify that edit-Repository triggers an google analytics event', function () {
        spyOn(testScope, '$emit');
        testScope.selectedItems = [{id:1234}];
        testScope.openEditRepo();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.EDIT_REPOSITORY);
    });

    it('verify that delete-Repository triggers an google analytics event', function () {
        spyOn(testScope, '$emit');
        testScope.selectedItems = [{id:1234}];
        testScope.menuDeleteRepo();
        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.DELETE_REPOSITORY);
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

        it("should open an edit repository modal when clicking on row edit button", function () {
            e.target.value = entityEvents.editEntity;
            var repository = args.row;
            spyOn(repositoryEditFactory, 'open');
            testScope.rowClick(e, args);
            expect(repositoryEditFactory.open).toHaveBeenCalledWith(false, repository.ID);
        });

        it("should open a delete repository modal when clicking on row recycle bin", function () {
            e.target.value = entityEvents.deleteEntity;
            var repository = args.row;
            spyOn(testScope, 'deleteRepo');
            testScope.rowClick(e, args);
            expect(testScope.deleteRepo).toHaveBeenCalledWith(repository.ID);
        });

        it('should trigger an google analytics event when clicking on recycle bin', function () {
            e.target.value = entityEvents.deleteEntity;
            var repository = args.row;
            spyOn(testScope, '$emit');
            testScope.rowClick(e, args);
            expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.DELETE_REPOSITORY);
        });

        it('should trigger an google analytics event when clicking on edit button', function () {
            e.target.value = entityEvents.editEntity;
            var repository = args.row;
            spyOn(testScope, '$emit');
            testScope.rowClick(e, args);
            expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETUP.EDIT_REPOSITORY);
        });

    });

    describe("Menu buttons", function () {
        it("should edit the selected repository when click the menu edit button", function () {
            var dummyRepo = {
                ID: '1234'
            };
            testScope.selectedItems.push(dummyRepo);
            spyOn(repositoryEditFactory, 'open');
            testScope.openEditRepo();
            expect(repositoryEditFactory.open).toHaveBeenCalledWith(false, dummyRepo.ID);
        });

        it("should warn delete the selected repository when click the menu delete button", function () {
            var dummyRepo = {
                ID: '1234'
            };
            testScope.selectedItems.push(dummyRepo);
            spyOn(testScope, 'deleteRepo');
            testScope.menuDeleteRepo();
            expect(testScope.deleteRepo).toHaveBeenCalledWith(dummyRepo.ID);
        });
    });
});
