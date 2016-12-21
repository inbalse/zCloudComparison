'use strict';
angular.module('zvmApp.components')
    .component('cardsFilters', {
        templateUrl: 'scripts/core/cards-filters/cards-filters.html',
        bindings: {
            filteredColumns: '<',
            columns: '<',
            items: '<',
            onFilterChange: '&'
        },
        controller: function ($scope, $timeout, cardsFilterService, zSlickGridFilterTypes, vpgsCardsModel, vpgCardsFrequentService, zNotificationService, zNotificationConstant, $rootScope, analyticsEventsTypes) {
            var ctrl = this,
                initShowTimeout,
                columnsWithFilter;

            var defaultQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_DEFAULT_QUERY);
            var personalQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_PERSONAL_QUERY);

            ctrl.groupByFn = cardsFilterService.getFilterGroupValues;

            ctrl.selectedColumns = [[null]];

            var runPersonalQuery = function (personalQuery) {
                ctrl.selectedColumns = [[null]];
                ctrl.filteredColumns = personalQuery.filters;
                initFunction();
            };

            personalQuerySubscriber.promise.then(null, null, runPersonalQuery);

            ctrl.addColumnFilter = function (column) {
                if (_.isNullOrUndefined(column) || column.isSelected) {
                    return;
                }

                column.isSelected = true;
                vpgCardsFrequentService.pushFilterField(column);
                cardsFilterService.addSelectedColumn(ctrl.selectedColumns,column);
                cardsFilterService.notifySelectedChange();
                ctrl.onFilterChange({filters: columnsWithFilter});
                ctrl.filterItems = [];

                initShowTimeout = $timeout(function () {
                    column.isDropdownVisible = true;
                    ctrl.filterItems = vpgCardsFrequentService.orderFrequentFilterItemsInHeadOfArray(columnsWithFilter);
                });

                //GA
                $rootScope.$emit(analyticsEventsTypes.VPGS.GRID_VIEW.FILTER, {filterByField:column.name});
            };

            ctrl.removeColumnFilter = function (column) {
                cardsFilterService.removeSelectedColumn(ctrl.selectedColumns,column);
                ctrl.onFilterChanged();
                cardsFilterService.notifySelectedChange();
                ctrl.onFilterChange({filters: columnsWithFilter});
            };

            ctrl.clearAll = function () {
                cardsFilterService.removeAllSelectedColumns(ctrl.selectedColumns);
                ctrl.selectedColumns = [[null]];
                addDefaultColumns();
                ctrl.onFilterChanged();
            };

            defaultQuerySubscriber.promise.then(null, null, ctrl.clearAll);

            ctrl.onFilterChanged = function () {
                ctrl.onFilterChange({filters: columnsWithFilter});
            };

            ctrl.$onInit = function () {
                initFunction();
            };

            var initFunction = function () {
                columnsWithFilter = vpgCardsFrequentService.orderFrequentFilterItemsInHeadOfArray(cardsFilterService.getColumnsWithFilter(ctrl.filteredColumns, ctrl.columns));

                ctrl.filterItems = columnsWithFilter;
                initColumns();
            };

            ctrl.groupFilterFn = function (groups) {
                var frequent = _.remove(groups, {name: 'Frequent:'});
                var orderedGroup = groups.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
                return _.union(frequent, orderedGroup);
            };


            ctrl.$onDestroy = function () {
                $timeout.cancel(initShowTimeout);
                zNotificationService.unSubscribe(defaultQuerySubscriber, zNotificationConstant.RUN_DEFAULT_QUERY, false);
                zNotificationService.unSubscribe(personalQuerySubscriber, zNotificationConstant.RUN_PERSONAL_QUERY, false);
            };

            function initColumns() {
                addDefaultColumns();
                addExistingColumns();
                cardsFilterService.notifySelectedChange();
            }

            function addDefaultColumns() {
                _.forEach(columnsWithFilter, function (column) {
                    if (column.card_default) {
                        cardsFilterService.addSelectedColumn(ctrl.selectedColumns,column);
                        column.isSelected = true;
                    }
                });

                _.forEach(ctrl.filterItems, function (filter) {
                    if (filter.card_default) {
                        filter.ignore = true;
                    }
                });
            }

            function addExistingColumns() {
                _.forEach(columnsWithFilter, function (column) {
                    if (column.isSelected && !column.card_default) {
                        cardsFilterService.addSelectedColumn(ctrl.selectedColumns,column);
                    }
                });

            }
        }
    });
