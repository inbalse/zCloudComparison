'use strict';
angular.module('zvmApp.core')
    .controller('vpgsCardsController', function ($scope, cardListComponentService, vpgsCardsModel, vpgsModel, vpgsActionsService, vpgCardsFrequentService,
                                                 zNotificationService, zNotificationConstant, cardsFilterService, zTabsStateService, zTabsStateConstants, analyticsEventsTypes) {
        var vpgsCardsCtrl = this;

        vpgsCardsCtrl.groupBy = zTabsStateService.getTabGroupBy(zTabsStateConstants.LIST.VPGS) || vpgsCardsModel.getDefaultGroupBy();
        vpgsCardsCtrl.search = zTabsStateService.getTabSearch(zTabsStateConstants.LIST.VPGS);
        vpgsCardsCtrl.search.columns = vpgsCardsModel.getCardsColumnDefs();
        vpgsCardsCtrl.filters = zTabsStateService.getTabFilters(zTabsStateConstants.LIST.VPGS);
        vpgsCardsCtrl.sort = zTabsStateService.getTabSort(zTabsStateConstants.LIST.VPGS) || vpgsCardsModel.getDefaultSortBy();
        vpgsCardsCtrl.searchModelOptions = {debounce: 250};
        vpgsCardsCtrl.sortBy = vpgsCardsModel.getSelectedSortBy(vpgsCardsCtrl.sort);
        vpgsCardsCtrl.sortItems = vpgCardsFrequentService.orderFrequentSortItemsInHeadOfArray(vpgsCardsModel.getSortByValues());

        cardListComponentService.addSelectedItems(vpgsCardsModel.getSelectedVPGIds());
        vpgsCardsCtrl.vpgsList = [];
        vpgsCardsCtrl.showFilters = vpgsCardsModel.getShowFiltersState();
        vpgsCardsCtrl.isFilterActive = vpgsCardsModel.isFilterButtonActive(vpgsCardsCtrl.filters);

        vpgsCardsCtrl.sort.name = vpgsCardsModel.getSelectedSortBy(vpgsCardsCtrl.sort).name;
        vpgsCardsCtrl.groupByFn = cardsFilterService.getSortGroupValues;

        var statusFilterSubscriber = zNotificationService.getSubscriber(zNotificationConstant.STATUS_FILTER_CHANGE);
        var defaultQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_DEFAULT_QUERY);
        var personalQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_PERSONAL_QUERY);

        vpgsCardsCtrl.groupFilterFn = function (groups) {
            var frequent = _.remove(groups, {name: 'Frequent:'});
            var orderedGroup = groups.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            return _.union(frequent, orderedGroup);
        };

        var onStatusFilterChange = function () {
            vpgsCardsCtrl.prepareRender(vpgsCardsModel.processData({ProtectionGroups : vpgsModel.getInitialItems()}));
        };

        statusFilterSubscriber.promise.then(null, null, onStatusFilterChange);

        var setSort = function (selectedSort) {
            vpgsCardsCtrl.sort = selectedSort;
            zTabsStateService.setTabSort(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.sort.sortField, vpgsCardsCtrl.sort.sortAsc);
            vpgsCardsCtrl.sortBy = vpgsCardsModel.getSelectedSortBy(vpgsCardsCtrl.sort);
            vpgsCardsCtrl.sort.name = vpgsCardsCtrl.sortBy.name;
            vpgsCardsCtrl.sort.isChanged = true;
        };

        var setGroupBy = function (selectedGroup) {
            vpgsCardsCtrl.groupBy = selectedGroup;
            zTabsStateService.setTabGroupBy(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.groupBy);
        };

        var setFilters = function (selectedFilters) {
            vpgsCardsCtrl.filters = selectedFilters;
            zTabsStateService.setTabFilters(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.search.columns, vpgsCardsCtrl.filters);
            vpgsCardsCtrl.isFilterActive = vpgsCardsModel.isFilterButtonActive(vpgsCardsCtrl.filters);
            vpgsCardsCtrl.showFilters = vpgsCardsCtrl.isFilterActive;
            vpgsCardsModel.updateSelectedFiltersDisplay();
        };

        var runQuery = function (query) {
            setSort(query.sort);
            setGroupBy(query.groupBy);
            setFilters(query.filters);
            vpgsCardsCtrl.prepareRender(vpgsCardsModel.processData({ProtectionGroups : vpgsModel.getInitialItems()}));
        };

        var runDefaultQuery = function () {
            var defaultQuery = {};
            defaultQuery.filters = [];
            defaultQuery.sort = vpgsCardsModel.getDefaultSortBy();
            defaultQuery.groupBy = vpgsCardsModel.getDefaultGroupBy();
            runQuery(defaultQuery);
        };

        defaultQuerySubscriber.promise.then(null, null, runDefaultQuery);

        var runPersonalQuery = function (personalQuery) {
            runQuery(personalQuery);
        };

        personalQuerySubscriber.promise.then(null, null, runPersonalQuery);

        vpgsCardsCtrl.sortValuesGroup = function (column) {
            return cardsFilterService.getSortGroupValues(column);
        };

        vpgsCardsCtrl.onActionClick = function (item, action) {
            vpgsActionsService.execute(item, action);
        };

        vpgsCardsCtrl.onGroupByChange = function () {
            zTabsStateService.setTabGroupBy(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.groupBy);
            vpgsCardsCtrl.prepareRender();

            //GA
            $scope.$emit(analyticsEventsTypes.VPGS.GRID_VIEW.GROUP, {groupByField: vpgsCardsCtrl.groupBy.text});
        };

        vpgsCardsCtrl.onSearchChange = function () {
            zTabsStateService.setTabSearch(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.search.term);
            vpgsCardsCtrl.prepareRender();

            //GA
            $scope.$emit(analyticsEventsTypes.VPGS.GRID_VIEW.SEARCH, {searchInputText: vpgsCardsCtrl.search.term});
        };

        vpgsCardsCtrl.onSortByChange = function () {
            zTabsStateService.setTabSort(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.sortBy.field, vpgsCardsCtrl.sort.sortAsc);
            vpgCardsFrequentService.pushSortField(vpgsCardsCtrl.sortBy);
            vpgsCardsCtrl.sort.sortField = vpgsCardsCtrl.sortBy.field;
            vpgsCardsCtrl.sort.name = vpgsCardsCtrl.sortBy.name;
            vpgsCardsCtrl.sort.isChanged = true;
            vpgsCardsCtrl.sortItems = vpgCardsFrequentService.orderFrequentSortItemsInHeadOfArray(_.cloneDeep(vpgsCardsCtrl.sortItems));
            vpgsCardsCtrl.prepareRender();

            //GA
            $scope.$emit(analyticsEventsTypes.VPGS.GRID_VIEW.SORT, {sortByField: vpgsCardsCtrl.sortBy.name});
        };

        vpgsCardsCtrl.onFilterChange = function (filters) {
            vpgsCardsCtrl.filters = filters;
            zTabsStateService.setTabFilters(zTabsStateConstants.LIST.VPGS, vpgsCardsCtrl.search.columns, filters);
            vpgsCardsCtrl.prepareRender();
            vpgsCardsModel.updateSelectedFiltersDisplay();
            vpgsCardsCtrl.isFilterActive = vpgsCardsModel.isFilterButtonActive(filters);
        };

        vpgsCardsCtrl.prepareRender = function (items) {
            vpgsCardsCtrl.vpgsList = vpgsCardsModel.prepareRender(items, vpgsCardsCtrl.search, vpgsCardsCtrl.sort, vpgsCardsCtrl.groupBy, vpgsCardsCtrl.filters);
            if (vpgsCardsCtrl.sort.isChanged) {
                vpgsCardsCtrl.sort.isChanged = false;
                vpgsCardsModel.forceRender();
            }
        };

        vpgsCardsCtrl.toggleShowFilters = function () {
            vpgsCardsCtrl.showFilters = !vpgsCardsCtrl.showFilters;
            vpgsCardsModel.setShowFiltersState(vpgsCardsCtrl.showFilters);
            vpgsCardsModel.updateSelectedFiltersDisplay();
        };

        vpgsCardsCtrl.toggleSortOrder = function () {
            vpgsCardsCtrl.sort.sortAsc = !vpgsCardsCtrl.sort.sortAsc;

            var field = _.find(vpgsCardsCtrl.search.columns, function (column) {
                return vpgsCardsCtrl.sort.sortField === column.field;
            });

            vpgsCardsCtrl.onSortByChange(field);
        };

        vpgsCardsCtrl.getInitialItems = function () {
            return vpgsCardsModel.getInitialItems();
        };

        $scope.$on('$destroy', function () {
            zNotificationService.unSubscribe(statusFilterSubscriber, zNotificationConstant.STATUS_FILTER_CHANGE, false);
            zNotificationService.unSubscribe(defaultQuerySubscriber, zNotificationConstant.RUN_DEFAULT_QUERY, false);
            zNotificationService.unSubscribe(personalQuerySubscriber, zNotificationConstant.RUN_PERSONAL_QUERY, false);
        });

        vpgsCardsModel.renameNameColumn(vpgsCardsCtrl.filters);

        vpgsCardsModel.register($scope).then(null, null, vpgsCardsCtrl.prepareRender);
    });

angular.module('zvmApp.directives').directive('vpgsCardsList', function (reactDirective, CardListComponentFactory) {
    return reactDirective(CardListComponentFactory);
});
