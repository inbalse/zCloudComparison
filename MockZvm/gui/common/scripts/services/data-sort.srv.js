'use strict';
angular.module('zvmApp.services')
    .service('dataSortService', function () {
        var sortService = this;
        sortService.getComparer = function (field, isAsc) {
            var sign = isAsc ? 1 : -1;

            return function (dataRow1, dataRow2) {
                var value1 = getSortValue(dataRow1[field]),
                    value2 = getSortValue(dataRow2[field]);
                if (_.isString(value1) && _.isString(value2)) {
                    value1 = value1.toLowerCase();
                    value2 = value2.toLowerCase();
                }
                var s = 0;
                if (value1 === value2) {
                    s = (getFallbackValue(dataRow1) > getFallbackValue(dataRow2) ? 1 : -1) * sign;
                } else {
                    s = ((value1 > value2 ? 1 : -1)) * sign;
                }
                return s;
            }
        };

        function getFallbackValue(dataRow) {
            if (dataRow.sortIndex) {
                return dataRow.sortIndex;
            }

            return dataRow.id;
        }

        function getSortValue(value) {
            var sortValue;
            if (value && value.hasOwnProperty('sortValue')) {
                sortValue = value.sortValue;
            } else if (value && value.hasOwnProperty('filterValue')) {
                sortValue = value.filterValue || '';
            } else if (value && value.hasOwnProperty('display')) {
                sortValue = value.display;
            } else if (value && value.hasOwnProperty('value')) {
                sortValue = value.value || '';
            } else {
                sortValue = (value !== undefined && value !== null) ? value : '';
            }
            return sortValue;

        }
    });
