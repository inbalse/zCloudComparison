'use strict';

describe('VPGS cards controller', function () {
    var vpgsCardsCtrl, scope, vpgsCardsModel, zTabsStateConstants, vpgsActionsService, zTabsStateService, vpgCardsFrequentService;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data: {IsPortal: false}});
    }));

    beforeEach(inject(function ($q, $controller, $rootScope, _vpgsCardsModel_, _zTabsStateConstants_, _vpgsActionsService_, _zTabsStateService_, _vpgCardsFrequentService_) {
        scope = $rootScope.$new();
        vpgsCardsModel = _vpgsCardsModel_;
        zTabsStateConstants = _zTabsStateConstants_;
        vpgsActionsService = _vpgsActionsService_;
        zTabsStateService = _zTabsStateService_;
        vpgCardsFrequentService = _vpgCardsFrequentService_;

        vpgsCardsCtrl = $controller("vpgsCardsController", {
            $scope: scope,
            vpgsCardsModel: vpgsCardsModel,
            zTabsStateConstants: zTabsStateConstants,
            vpgsActionsService: vpgsActionsService,
            zTabsStateService: zTabsStateService
        });

    }));

    it('should have a default group by', function () {
        expect(vpgsCardsCtrl.groupBy).toBeDefined();
    });

    it('should have a debounce while searching', function () {
        expect(vpgsCardsCtrl.searchModelOptions).toEqual({debounce: 250});
    });

    it('should set tab group by on group change and render', function () {
        vpgsCardsCtrl.groupBy = {x: 1};

        spyOn(zTabsStateService, 'setTabGroupBy');
        spyOn(vpgsCardsCtrl, 'prepareRender');
        vpgsCardsCtrl.onGroupByChange();
        expect(zTabsStateService.setTabGroupBy).toHaveBeenCalledWith(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.groupBy);
        expect(vpgsCardsCtrl.prepareRender).toHaveBeenCalled();
    });

    it('should set tab group by on group change and render', function () {
        vpgsCardsCtrl.search = {
            term: {
                x: 1
            }
        };
        spyOn(zTabsStateService, 'setTabSearch');
        spyOn(vpgsCardsCtrl, 'prepareRender');
        vpgsCardsCtrl.onSearchChange();
        expect(zTabsStateService.setTabSearch).toHaveBeenCalledWith(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.search.term);
        expect(vpgsCardsCtrl.prepareRender).toHaveBeenCalled();
    });

    it('should call execute with item and action', function () {
        var item = {x: 1},
            action = 5;
        spyOn(vpgsActionsService, 'execute');
        vpgsCardsCtrl.onActionClick(item, action);
        expect(vpgsActionsService.execute).toHaveBeenCalledWith(item, action);
    });


    it('should set tab sort', function () {
        vpgsCardsCtrl.sort.sortAsc = true;
        vpgsCardsCtrl.sortBy = {
            field: 'Direction',
            isAsc: true
        };
        vpgsCardsCtrl.sortItems = vpgsCardsModel.getSortByValues();

        spyOn(zTabsStateService, 'setTabSort');
        spyOn(vpgsCardsCtrl, 'prepareRender');
        vpgsCardsCtrl.onSortByChange();
        expect(vpgsCardsCtrl.sort.sortField).toEqual(vpgsCardsCtrl.sortBy.field);
        expect(vpgsCardsCtrl.sort.isChanged).toEqual(true);
        expect(zTabsStateService.setTabSort).toHaveBeenCalledWith(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.sortBy.field, vpgsCardsCtrl.sortBy.isAsc);
        expect(vpgsCardsCtrl.prepareRender).toHaveBeenCalled();
    });

    it('should render card items', function () {
        var items = [{a: 1}, {b: 2}];
        vpgsCardsCtrl.search = {x: 1};
        vpgsCardsCtrl.sort = {y: 2};
        vpgsCardsCtrl.groupBy = {z: 3};
        vpgsCardsCtrl.filters = {j: 4};
        spyOn(vpgsCardsModel, 'prepareRender');
        vpgsCardsCtrl.prepareRender(items);
        expect(vpgsCardsModel.prepareRender).toHaveBeenCalledWith(items, vpgsCardsCtrl.search, vpgsCardsCtrl.sort, vpgsCardsCtrl.groupBy, vpgsCardsCtrl.filters);

    });

    it('should force render on sort', function () {
        var items = [{a: 1}, {b: 2}];
        vpgsCardsCtrl.sort = {y: 2, isChanged: true};
        spyOn(vpgsCardsModel, 'forceRender');
        vpgsCardsCtrl.prepareRender(items);
        expect(vpgsCardsCtrl.sort.isChanged).toEqual(false);
        expect(vpgsCardsModel.forceRender).toHaveBeenCalled();
    });

    it('should toggle filters view', function () {
        spyOn(vpgsCardsModel, 'updateSelectedFiltersDisplay');
        spyOn(vpgsCardsModel, 'setShowFiltersState');
        vpgsCardsCtrl.showFilters = true;
        vpgsCardsCtrl.toggleShowFilters();
        expect(vpgsCardsCtrl.showFilters).toBe(false);
        expect(vpgsCardsModel.updateSelectedFiltersDisplay).toHaveBeenCalled();
        expect(vpgsCardsModel.setShowFiltersState).toHaveBeenCalledWith(vpgsCardsCtrl.showFilters);

    });

    it('should sort cards order', function () {
        vpgsCardsCtrl.sort = {
            sortAsc: true,
            sortField: 'NameObj'
        };
        vpgsCardsCtrl.search.columns = vpgsCardsModel.getCardsColumnDefs();

        vpgsCardsCtrl.toggleSortOrder();
        expect(vpgsCardsCtrl.sort.sortAsc).toBe(false);
    });

    it('should apply filter changes', function () {
        var filters = {x: 1, y: 2};
        spyOn(zTabsStateService, 'setTabFilters');
        spyOn(vpgsCardsCtrl, 'prepareRender');
        spyOn(vpgsCardsModel, 'updateSelectedFiltersDisplay');
        spyOn(vpgsCardsModel, 'isFilterButtonActive');
        vpgsCardsCtrl.onFilterChange(filters);
        expect(zTabsStateService.setTabFilters).toHaveBeenCalledWith(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.search.columns, filters);
        expect(vpgsCardsCtrl.prepareRender).toHaveBeenCalled();
        expect(vpgsCardsModel.updateSelectedFiltersDisplay).toHaveBeenCalled();
        expect(vpgsCardsModel.isFilterButtonActive).toHaveBeenCalledWith(filters);
    });
});
