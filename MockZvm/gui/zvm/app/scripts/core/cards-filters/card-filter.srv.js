/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.services')
    .constant('cardsFiltersConstants', {
        FILTER_PER_ROW: 6,
        SECTION: {
            GENERAL: 'General',
            PERFORMANCE: 'Performance',
            BACKUP: 'Backup'
        },
        TEMPLATES: {
            WILDCARD: 'scripts/core/cards-filters/cards-filter/wildcard/wildcard-filter.html',
            RANGE: 'scripts/core/cards-filters/cards-filter/range/range-filter.html',
            MULTI_SELECT: {
                DISPLAY: 'scripts/core/cards-filters/cards-filter/multiselect/display-formatter/display-formatter.html',
                CLASS: 'scripts/core/cards-filters/cards-filter/multiselect/class-formatter/class-formatter.html',
                CLASS_GROUP: 'scripts/core/cards-filters/cards-filter/multiselect/class-group-formatter/class-group-formatter.html',
                BACKUP_STATUS: 'scripts/core/cards-filters/cards-filter/multiselect/backup-status-formatter/backup-status-formatter.html'
            },
            DATE: 'scripts/core/cards-filters/cards-filter/date/date-filter.html',
            MB_OR_GB_RANGE: 'scripts/core/cards-filters/cards-filter/range-mb-gb/range-filter.html'
        },
        DATE_FILTER_VALUES: {
            'Today': moment(),
            'Week': [moment().startOf('week'), moment()],
            'Month': [moment().startOf('month'), moment()],
            'Quarter': [moment().startOf('quarter'), moment()],
            'Year': [moment().startOf('year'), moment()]
        }
    })
    .service('cardsFilterService', function (cardsFiltersConstants, multiSelectClassConstants, zSlickGridFilterTypes, zNotificationConstant, zNotificationService, $translate, vpgCardsFrequentService) {
            var cardsFilter = this,
                selectedNotifier = zNotificationService.getNotifier(zNotificationConstant.CARD_SELECTED_FILTER_CHANGE);

            //region INIT
            cardsFilter.initWildcard = function (column) {
                return {
                    values: column.wildcardValues ? column.wildcardValues.slice(0) : null,
                    template: cardsFiltersConstants.TEMPLATES.WILDCARD
                };
            };
            cardsFilter.initRange = function (column) {
                var values = parseRangeValues(column);
                return {
                    values: values,
                    template: cardsFiltersConstants.TEMPLATES.RANGE
                };
            };
            cardsFilter.initRangeSize = function (column) {
                var values = parseRangeValues(column);
                return {
                    values: values,
                    rangeTypeMultiplier: column.rangeTypeMultiplier || 1,
                    template: cardsFiltersConstants.TEMPLATES.MB_OR_GB_RANGE
                };
            };
            cardsFilter.initMultiSelect = function (column, items) {
                return parseFilterValues(items, column);
            };
            cardsFilter.initDate = function (column) {
                var values = parseDateValues(column);

                return {
                    values: values,
                    eventsDateRangeList: cardsFiltersConstants.DATE_FILTER_VALUES,
                    template: cardsFiltersConstants.TEMPLATES.DATE
                };
            };

            cardsFilter.getSortGroupValues = function (column) {
                return cardsFilter.getGroupValues(column, vpgCardsFrequentService.checkIfFrequentSortExist);
            };

            cardsFilter.getFilterGroupValues = function (column) {
                return cardsFilter.getGroupValues(column, vpgCardsFrequentService.checkIfFrequentFilterExist);
            };


            cardsFilter.getGroupValues = function (column, checkFrequentFn) {
                var result;

                if (checkFrequentFn(column)) {
                    result = $translate.instant('VPG_CARDS.FREQUENT');
                } else if (_.contains(column.views, '') || _.contains(column.views, cardsFiltersConstants.SECTION.GENERAL) || column.views.length > 1) {
                    result = $translate.instant('VPG_CARDS.GENERAL');
                } else if (_.contains(column.views, cardsFiltersConstants.SECTION.PERFORMANCE)) {
                    result = $translate.instant('VPG_CARDS.PERFORMANCE_AND_STORAGE');
                } else if (_.contains(column.views, cardsFiltersConstants.SECTION.BACKUP)) {
                    result = $translate.instant('VPG_CARDS.OFFSITE_BACKUPS');
                }

                return result + ':';
            };

            cardsFilter.getColumnsWithFilter = function (filteredColumns, columns) {
                //if there is no saved filters take it from the model columns
                var result = _.filter(filteredColumns, function (column) {
                    return !_.isNullOrUndefined(column.filter);
                });

                if (!_.isEmpty(result)) {
                    return result;
                }

                return _.filter(columns, function (column) {
                    return !_.isNullOrUndefined(column.filter);
                });


            };
            //endregion

            //region APPLY
            cardsFilter.applyWildcardFilter = function (column, wildcardValues) {
                column.wildcardValues = [];
                column.wildcardValues[0] = wildcardValues || '';
                column.isFilterActive = !_.isEmpty(column.wildcardValues) && !_.isEmpty(column.wildcardValues[0]);
            };
            cardsFilter.applyRangeFilter = function (column, rangeValues) {
                rangeValues = rangeValues || {};
                column.rangeValues = [];
                column.rangeValues[0] = rangeValues.from;
                column.rangeValues[1] = rangeValues.to;
                column.isFilterActive = _.size(column.rangeValues) > 1 && isValidNumber(column.rangeValues[0]) && isValidNumber(column.rangeValues[1]);
            };
            cardsFilter.applyDateFilter = function (column, dateValues) {
                dateValues = dateValues || {};
                column.dateValues = [];
                column.dateValues[0] = dateValues.startDate || {};
                column.dateValues[1] = dateValues.endDate || {};

                column.isFilterActive = (column.dateValues[0]._isAMomentObject || false) && (column.dateValues[1]._isAMomentObject || false);
            };
            cardsFilter.applyRangeSizeFilter = function (column, rangeValues, rangeTypeMultiplier) {
                rangeValues = rangeValues || {};
                column.rangeValues = [];
                column.rangeValues[0] = rangeValues.from;
                column.rangeValues[1] = rangeValues.to;
                column.rangeTypeMultiplier = parseInt(rangeTypeMultiplier, 10);

                column.isFilterActive = _.size(column.rangeValues) > 1 && isValidNumber(column.rangeValues[0], true) && isValidNumber(column.rangeValues[1], true);
            };
            cardsFilter.applyMultiSelectFilter = function (column, filterValues) {
                var result = [], isActive = false;
                _.forEach(filterValues, function (option) {
                    if (option.checked) {
                        result.push(option.value);
                        isActive = true;
                    }
                });
                column.filterValues = result;
                column.isFilterActive = isActive;//!_.isEmpty(column.filterValues) && !_.isEmpty(column.filterValues[0]);
            };
            //endregion

            //region CLEAR
            cardsFilter.clearWildcardFilter = function (column) {
                column.wildcardValues = null;
                column.isFilterActive = false;
            };
            cardsFilter.clearRangeFilter = function (column) {
                column.rangeValues = null;
                column.isFilterActive = false;
            };
            cardsFilter.clearDateFilter = function (column) {
                column.dateValues = null;
                column.isFilterActive = false;
            };
            cardsFilter.clearRangeSizeFilter = function (column) {
                column.rangeValues = null;
                column.rangeTypeMultiplier = null;
                column.isFilterActive = false;
            };
            cardsFilter.clearMultiSelectFilter = function (column) {
                column.filterValues = null;
                column.isFilterActive = false;

            };
            //endregion

            cardsFilter.getSelectedNotifier = function () {
                return selectedNotifier;
            };

            cardsFilter.notifySelectedChange = function () {
                selectedNotifier.notify({key: zNotificationConstant.CARD_SELECTED_FILTER_CHANGE});
            };

            cardsFilter.indexColumns = function (columns) {
                _.forEach(columns, function (column, index) {
                    column.index = index;
                });
            };

            cardsFilter.addSelectedColumn = function (selectedColumns, column) {
                var lastRow = _.last(selectedColumns);

                lastRow.splice(_.indexOf(lastRow, null), 1);

                if (_.indexOf(selectedColumns, lastRow) === 0) {
                    addRow(lastRow, column, cardsFiltersConstants.FILTER_PER_ROW - 1);
                    return;
                }

                addRow(lastRow, column, cardsFiltersConstants.FILTER_PER_ROW);

                function addRow(row, column, maxLength) {
                    row.push(column);
                    if (row.length < maxLength) {
                        row.push(null);
                    } else if (_.isEqual(lastRow.length, maxLength)) {
                        selectedColumns.push([null]);
                    }
                }
            };

            cardsFilter.removeSelectedColumn = function (selectedColumns, column) {
                clearFilter(column);
                var flatten = _.flatten(selectedColumns);
                selectedColumns.length = 0;
                selectedColumns.push([null]);
                _.remove(flatten, function (c) {
                    if (_.isNull(c)) {
                        return true;
                    }
                    return _.isEqual(c.field, column.field);
                });
                _.forEach(flatten, function (c) {
                    cardsFilter.addSelectedColumn(selectedColumns, c);
                });
            };

            cardsFilter.removeAllSelectedColumns = function (selectedColumns) {
                var flatten = _.flatten(selectedColumns);
                _.forEach(flatten, function (c) {
                    if (_.isNull(c)) {
                        return;
                    }
                    clearFilter(c);
                });
            };

            function parseRangeValues(column) {
                var values = column.rangeValues ? column.rangeValues.slice(0) : null;
                if (_.isNullOrUndefined(values)) {
                    return {};
                }

                return {
                    from: parseFloat(values [0]),
                    to: parseFloat(values [1])
                };
            }

            function parseDateValues(column) {
                var values = column.dateValues ? column.dateValues.slice(0) : null;
                if (_.isNullOrUndefined(values)) {
                    return {};
                }
                var startDate = _.isDate(values[0]) ? moment(values[0]) : values[0],
                    endDate = _.isDate(values[1]) ? moment(values[1]) : values[1];

                column.dateValues[0] = startDate;
                column.dateValues[1] = endDate;
                return {
                    startDate: startDate,
                    endDate: endDate
                };
            }

            function parseFilterValues(items, column) {
                var selectedValues = column.filterValues ? column.filterValues.slice(0) : null;

                var filtered = _.uniq(items, function (item) {
                    return getDisplayFilterValue(item[column.field]);
                });

                var values = _.map(filtered, function (item) {
                    return {
                        field: column.field,
                        formatterClass: column.formatter_class,
                        value: item[column.field],
                        checked: isValueChecked(item, selectedValues, column.field)
                    };
                });

                values = _.sortBy(values, function (item) {
                    return item.value;
                });


                var template;
                switch (column.card_formatter) {
                    case multiSelectClassConstants.FORMATTER_TYPE.DISPLAY:
                        template = cardsFiltersConstants.TEMPLATES.MULTI_SELECT.DISPLAY;
                        break;
                    case multiSelectClassConstants.FORMATTER_TYPE.CLASS:
                        template = cardsFiltersConstants.TEMPLATES.MULTI_SELECT.CLASS;
                        break;
                    case multiSelectClassConstants.FORMATTER_TYPE.CLASS_GROUP:
                        template = cardsFiltersConstants.TEMPLATES.MULTI_SELECT.CLASS_GROUP;
                        break;
                    case multiSelectClassConstants.FORMATTER_TYPE.BACKUP_STATUS:
                        template = cardsFiltersConstants.TEMPLATES.MULTI_SELECT.BACKUP_STATUS;
                        break;
                }

                return {
                    values: values,
                    template: template
                };
            }

            function getDisplayFilterValue(value) {
                if (value.hasOwnProperty('filterValue')) {
                    return value.filterValue;
                } else if (value.hasOwnProperty('value')) {
                    return value.value;
                } else if (value.hasOwnProperty('display')) {
                    return value.display;
                }

                return !_.isNullOrUndefined(value) ? value : '';
            }

            function getFilterValue(item) {
                if (item.hasOwnProperty('filterValue')) {
                    return item.filterValue;
                } else if (item.hasOwnProperty('value')) {
                    return item.value;
                } else if (item.hasOwnProperty('display')) {
                    return item.display;
                }

                return !_.isNullOrUndefined(item) ? item : '';
            }

            function isValueChecked(value, selectedValues, field) {
                if (_.isNullOrUndefined(selectedValues)) {
                    return false;
                }

                var selected = _.find(selectedValues, function (selectedValue) {
                    return _.isEqual(getFilterValue(value[field]), getFilterValue(selectedValue));
                });

                return !_.isNullOrUndefined(selected);
            }

            function isValidNumber(value, isFloat) {
                value = isFloat ? parseFloat(value) : parseInt(value, 10);
                return _.isNumber(value) && !_.isNaN(value);
            }

            function clearFilter(column) {
                switch (column.filter) {
                    case zSlickGridFilterTypes.WILDCARD:
                        cardsFilter.clearWildcardFilter(column);
                        break;
                    case zSlickGridFilterTypes.RANGE:
                        cardsFilter.clearRangeFilter(column);
                        break;
                    case zSlickGridFilterTypes.MULTI_SELECT:
                        cardsFilter.clearMultiSelectFilter(column);
                        break;
                    case zSlickGridFilterTypes.PERCENTAGE:
                        break;
                    case zSlickGridFilterTypes.DATE:
                        cardsFilter.clearDateFilter(column);
                        break;
                    case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                        cardsFilter.clearRangeSizeFilter(column);
                        break;
                }

                column.isFilterActive = false;
                column.isSelected = false;
                column.isDropdownVisible = false;
            }
        }
    );
