'use strict';
angular.module('zvmApp.services')
    //TODO merge with grid ext.headerfilters
    .service('dataFilterService', function (zSlickGridFilterTypes) {
        var filterService = this;
        var col, fieldValue, rangeValues, value;
        filterService.filter = function (items, columns) {
            return _.filter(items, function (item) {
                value = true;
                for (var i = 0; i < columns.length; i++) {
                    col = columns[i];
                    switch (col.filter) {
                        case zSlickGridFilterTypes.WILDCARD:
                            var wildcardValues = col.wildcardValues;
                            var filterObject = getFilterObj(item[col.field]);
                            fieldValue = filterObject.hasOwnProperty('value') ? filterObject.value : filterObject;
                            if (typeof fieldValue === 'string' && wildcardValues && wildcardValues.length > 0) {
                                fieldValue = fieldValue.toLowerCase();
                                _.forEach(wildcardValues, function (wildCard) {
                                    value = value & fieldValue.indexOf(wildCard.toLowerCase()) !== -1;
                                });
                            }
                            break;
                        case zSlickGridFilterTypes.RANGE:
                            rangeValues = col.rangeValues;
                            if (rangeValues && rangeValues.length > 1) {
                                if (rangeValues[0] !== '' && rangeValues[1] !== '') {
                                    fieldValue = getFilterObj(item[col.field]).value;
                                    value = value & fieldValue >= parseInt(rangeValues[0],10) & fieldValue <= parseInt(rangeValues[1]);
                                }
                            }
                            break;
                        case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                            rangeValues = col.rangeValues;
                            if (rangeValues && rangeValues.length > 1) {
                                fieldValue = getFilterObj(item[col.field]).value;
                                value = value & fieldValue >= (_.floor(parseFloat(rangeValues[0]), 2) * col.rangeTypeMultiplier) & fieldValue <= (_.ceil(parseFloat(rangeValues[1]), 2) * col.rangeTypeMultiplier);
                            }
                            break;
                        case zSlickGridFilterTypes.MULTI_SELECT:
                            var filterValues = col.filterValues;
                            if (filterValues && filterValues.length > 0) {
                                var fieldObj = getFilterObj(item[col.field]);
                                fieldValue = fieldObj.value;
                                var prop = fieldObj.prop;
                                if (prop) {
                                    filterValues = _.pluck(filterValues, prop);
                                }
                                value = value & _.contains(filterValues, fieldValue);
                            }

                            break;
                        case zSlickGridFilterTypes.PERCENTAGE:
                            var percentageValues = col.percentageValues;
                            if (percentageValues && percentageValues.length > 0) {
                                value = value & item[col.field] <= percentageValues[0];
                            }
                            break;
                        case zSlickGridFilterTypes.DATE:
                            var dateValues = col.dateValues;
                            if (dateValues && dateValues.length > 1) {
                                fieldValue = getFilterObj(item[col.field]).value;
                                 value = value & dateValues[0].isBefore(fieldValue) & dateValues[1].isAfter(fieldValue);
                                // value = value & dateValues[0] <= fieldValue & dateValues[1] >= fieldValue;
                            }
                            break;
                    }
                }

                return value;
            });
        };


        function getFilterObj(value) {
            var prop;
            if (value && value.hasOwnProperty('filterValue')) {
                value = value.filterValue;
                prop = 'filterValue';
            } else if (value && value.hasOwnProperty('value')) {
                value = value.value;
                prop = 'value';
            } else if (value && value.hasOwnProperty('display')) {
                value = value.display;
                prop = 'display';
            }
            return {
                'value': (value !== undefined && value !== null) ? value : '',
                'prop': prop
            };

        }
    });
