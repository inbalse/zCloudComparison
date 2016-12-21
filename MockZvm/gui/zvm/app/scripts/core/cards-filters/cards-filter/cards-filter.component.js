'use strict';
angular.module('zvmApp.components')
    .component('cardFilter', {
        templateUrl: 'scripts/core/cards-filters/cards-filter/cards-filter.html',
        bindings: {
            column: '<',
            items: '<',
            onFilterChange: '&'
        },
        controller: function ($scope, cardsFilterService, zSlickGridFilterTypes, zNotificationService, zNotificationConstant) {
            var ctrl = this,
                filterNotifier,
                multiSelectLoaded = false;
            ctrl.$onInit = function () {
                initFilters();


                //TODO: when using angular 1.5.9 change to $doCheck lifecycle method
                filterNotifier = zNotificationService.getSubscriber(zNotificationConstant.CARD_FILTER_CHANGE);
                filterNotifier.promise.then(null, null, updateValues);
            };

            //workaround for multi select display values
            ctrl.$onChanges = function () {
                if (!multiSelectLoaded && _.size(ctrl.items) > 0 && _.isEqual(ctrl.column.filter, zSlickGridFilterTypes.MULTI_SELECT)) {
                    initFilters();
                    multiSelectLoaded = true;
                }


            };

            ctrl.applyFilter = function (values) {
                switch (ctrl.column.filter) {
                    case zSlickGridFilterTypes.WILDCARD:
                        //cardsFilterService.applyWildcardFilter(ctrl.column, ctrl.wildcardValues);
                        cardsFilterService.applyWildcardFilter(ctrl.column, values);
                        ctrl.wildcardValues = values;
                        break;
                    case zSlickGridFilterTypes.RANGE:
                        cardsFilterService.applyRangeFilter(ctrl.column, values);
                        //cardsFilterService.applyRangeFilter(ctrl.column, ctrl.rangeValues);
                        ctrl.rangeValues = values;
                        break;
                    case zSlickGridFilterTypes.MULTI_SELECT:
                        cardsFilterService.applyMultiSelectFilter(ctrl.column, values);
                        //cardsFilterService.applyMultiSelectFilter(ctrl.column, ctrl.filterValues);
                        break;
                    case zSlickGridFilterTypes.PERCENTAGE:
                        //TODO:
                        break;
                    case zSlickGridFilterTypes.DATE:
                        cardsFilterService.applyDateFilter(ctrl.column, values);
                        ctrl.dateValues = values;

                        //cardsFilterService.applyDateFilter(ctrl.column, ctrl.dateValues);
                        break;
                    case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                        cardsFilterService.applyRangeSizeFilter(ctrl.column, values.range, values.multiplier);
                        ctrl.rangeValues = values.range;
                        ctrl.rangeTypeMultiplier = values.multiplier;

                        // cardsFilterService.applyRangeSizeFilter(ctrl.column, ctrl.rangeValues, ctrl.rangeTypeMultiplier);
                        break;
                }
                ctrl.column.isDropdownVisible = false;
                ctrl.onFilterChange();
            };

            ctrl.clearFilter = function () {
                switch (ctrl.column.filter) {
                    case zSlickGridFilterTypes.WILDCARD:
                        cardsFilterService.clearWildcardFilter(ctrl.column);
                        ctrl.wildcardValues = null;
                        break;
                    case zSlickGridFilterTypes.RANGE:
                        cardsFilterService.clearRangeFilter(ctrl.column);
                        ctrl.rangeValues = null;
                        break;
                    case zSlickGridFilterTypes.MULTI_SELECT:
                        cardsFilterService.clearMultiSelectFilter(ctrl.column);
                        _.forEach(ctrl.filterValues, function (option) {
                            option.checked = false;
                        });
                        break;
                    case zSlickGridFilterTypes.PERCENTAGE:
                        break;
                    case zSlickGridFilterTypes.DATE:
                        cardsFilterService.clearDateFilter(ctrl.column);
                        ctrl.dateValues = null;
                        break;
                    case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                        cardsFilterService.clearRangeSizeFilter(ctrl.column);
                        ctrl.rangeValues = null;
                        ctrl.rangeTypeMultiplier = 1;
                        break;
                }

                ctrl.column.isDropdownVisible = false;
                ctrl.onFilterChange();
            };

            ctrl.cancel = function () {
                ctrl.column.isDropdownVisible = false;
            };

            ctrl.$onDestroy = function () {
                zNotificationService.unSubscribe(filterNotifier, zNotificationConstant.CARD_FILTER_CHANGE);
                filterNotifier = null;
            };

            function updateValues() {
                //Refresh multiselect values
                if (ctrl.column) {
                    var data = cardsFilterService.initMultiSelect(ctrl.column, ctrl.items);
                    ctrl.filterValues = data.values;
                }
            }

            function initFilters() {
                var data;
                switch (ctrl.column.filter) {
                    case zSlickGridFilterTypes.WILDCARD:
                        data = cardsFilterService.initWildcard(ctrl.column);
                        ctrl.wildcardValues = data.values ? data.values[0] : null;
                        ctrl.filterTemplate = data.template;
                        break;
                    case zSlickGridFilterTypes.RANGE:
                        data = cardsFilterService.initRange(ctrl.column);
                        ctrl.rangeValues = data.values;
                        ctrl.filterTemplate = data.template;
                        break;
                    case zSlickGridFilterTypes.MULTI_SELECT:
                        data = cardsFilterService.initMultiSelect(ctrl.column, ctrl.items);
                        ctrl.filterValues = data.values;
                        ctrl.filterTemplate = data.template;
                        break;
                    case zSlickGridFilterTypes.PERCENTAGE:
                        //TODO: not used at the moment, seems incomplete in grid also
                        break;
                    case zSlickGridFilterTypes.DATE:
                        data = cardsFilterService.initDate(ctrl.column);
                        ctrl.dateValues = data.values;
                        ctrl.eventsDateRangeList = data.eventsDateRangeList;
                        ctrl.filterTemplate = data.template;
                        break;
                    case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                        data = cardsFilterService.initRangeSize(ctrl.column);
                        ctrl.rangeValues = data.values;
                        ctrl.rangeTypeMultiplier = data.rangeTypeMultiplier || 1;
                        ctrl.filterTemplate = data.template;
                        break;
                }
            }
        }
    });
