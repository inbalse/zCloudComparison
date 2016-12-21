'use strict';

angular.module('zvmApp.services')
    .constant('zTabsStateConstants', {
        PREFIX: {
            GROUP: 'z_state_group_',
            FILTER: 'z_state_filter_',
            SORT: 'z_state_sort_',
            SEARCH_COLUMNS: 'z_state_search_'
        },
        LIST: {
            VPGS: 'vpgs_view',
            VMS: 'vms_view',
            SITES: 'sites_view'
        }
    })
    .service('zTabsStateService', function ($translate, zTabsStateConstants, zSlickGridViewService, zSlickGridFilterTypes, basil) {
        var zTabsState = this,
            currentTabId, searchTerm = '',
            defaultGroup = {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            };

        zTabsState.setTabGroupBy = function (tabId, group) {
            basil.set(zTabsStateConstants.PREFIX.GROUP + tabId, group);
        };

        zTabsState.getTabGroupBy = function (tabId) {
            return basil.get(zTabsStateConstants.PREFIX.GROUP + tabId) || defaultGroup;
        };

        zTabsState.setTabSearch = function (tabId, term) {
            if (_.isNullOrUndefined(currentTabId) || !_.isEqual(tabId, currentTabId)) {
                currentTabId = tabId;
            }
            searchTerm = term;
        };

        zTabsState.getTabSearch = function (tabId) {
            if (!_.isNullOrUndefined(currentTabId) && !_.isEqual(currentTabId, tabId)) {
                searchTerm = '';
            }
            return {
                term: searchTerm
            };
        };

        zTabsState.setTabSort = function (tabId, sortField, isAsc) {
            basil.set(zTabsStateConstants.PREFIX.SORT + tabId, {sortField: sortField, sortAsc: isAsc});
        };

        zTabsState.getTabSort = function (tabId) {
            return basil.get(zTabsStateConstants.PREFIX.SORT + tabId);
        };
        zTabsState.clearTabSort = function (tabId) {
            return basil.remove(zTabsStateConstants.PREFIX.SORT + tabId);
        };

        zTabsState.setTabFilters = function (tabId, dataColumns, columnsWithFilterValues) {
            var filters = mapFilters(dataColumns, columnsWithFilterValues);
            basil.set(zTabsStateConstants.PREFIX.FILTER + tabId, filters);
        };


        zTabsState.getTabFilters = function (tabId) {
            var filters = basil.get(zTabsStateConstants.PREFIX.FILTER + tabId);
            momentizeDates(filters);
            return filters || [];
        };

        function momentizeDates(filters) {
            _.forEach(filters, function (filter) {
                if (_.isNullOrUndefined(filter.filter) || !_.isEqual(filter.filter, zSlickGridFilterTypes.DATE)) {
                    return;
                }

                if (!_.isArray(filter.dateValues)) {
                    return;
                }

                if (_.isEmpty(filter.dateValues)) {
                    return;
                }

                filter.dateValues[0] = moment(filter.dateValues[0]);
                filter.dateValues[1] = moment(filter.dateValues[1]);
            });
        }

        function mapFilters(dataColumns, columnsWithFilterValues) {
            var viewColumn;
            _.forEach(columnsWithFilterValues, function (columnDef) {
                viewColumn = _.find(dataColumns, {field: columnDef.field});
                if (_.isNullOrUndefined(viewColumn)) return;

                viewColumn.isFilterActive = columnDef.isFilterActive;
                viewColumn.isSelected = columnDef.isSelected;
                // viewColumn.index = columnDef.index;

                switch (columnDef.filter) {
                    case zSlickGridFilterTypes.WILDCARD:
                        viewColumn.wildcardValues = columnDef.wildcardValues ? columnDef.wildcardValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.RANGE:
                        viewColumn.rangeValues = columnDef.rangeValues ? columnDef.rangeValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                        viewColumn.rangeValues = columnDef.rangeValues ? columnDef.rangeValues.slice(0) : null;
                        viewColumn.rangeTypeMultiplier = columnDef.rangeTypeMultiplier;
                        break;
                    case zSlickGridFilterTypes.MULTI_SELECT:
                        viewColumn.filterValues = columnDef.filterValues ? columnDef.filterValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.PERCENTAGE:
                        viewColumn.percentageValues = columnDef.percentageValues ? columnDef.percentageValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.DATE:
                        viewColumn.dateValues = columnDef.dateValues ? columnDef.dateValues.slice(0) : null;
                        break;
                }
            });

            return dataColumns;
        }

    });
