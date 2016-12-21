    'use strict';

angular.module('zvmApp.directives').service('zSlickGridSearchService', function () {
    var zSlickGridSearchService = this;

    //search prop
    var LABEL = 'label';
    var DISPLAY = 'display';
    var FIELD = 'field';

    var found = false;

    function isRankHigher(a, b, term) {
        var a_i = a.toLowerCase().indexOf(term);
        var b_i = b.toLowerCase().indexOf(term);
        if (a_i < b_i) {
            return false;
        }
        if (a_i === b_i) {
            return (a.length > b.length);
        }
        return true;
    }

    function getValueByPriority(newValue, currentValue, searchTerm) {
        return (angular.isDefined(currentValue) && isRankHigher(newValue, currentValue, searchTerm)) ? currentValue : newValue;
    }

    //check user search input equals to value property
    function subsumedText(item, value, searchTerm) {
        if (_.contains(value.toLowerCase(), searchTerm)) {
            found = true;
            item.zerto_sort_priority = getValueByPriority(value, item.zerto_sort_priority, searchTerm);
        }
    }

    //recursive search inner column values
    function innerSearch(item, val, searchTerm) {
        _.forIn(val, function (innerVal, innerKey) {
            if (innerVal && angular.isString(innerVal)) {
                if (_.isEqual(innerKey, LABEL) || _.isEqual(innerKey, DISPLAY)) {
                    subsumedText(item, innerVal, searchTerm);
                }
            } else {
                innerSearch(item, innerVal, searchTerm);
            }
        });
    }

    zSlickGridSearchService.search = function (searchTerm, data, columns) {
        var searchData = [];

        if (data.length && searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            searchData = _.filter(data, function (item) {
                found = false;
                delete item.zerto_sort_priority;

                _.forIn(item, function (val, key) {
                    //search only columns in grid
                    if (_.contains(_.pluck(columns, FIELD), key)) {
                        //search just string property
                        if (angular.isString(val)) {
                            subsumedText(item, val, searchTerm);
                        } else {
                            innerSearch(item, val, searchTerm);
                        }
                    }
                });
                return found;
            });

            //sort data by priority value that find
            searchData.sort(function (a, b) {
                return isRankHigher(a.zerto_sort_priority, b.zerto_sort_priority, searchTerm) ? 1 : -1;
            });
        }

        return searchData;
    };

    //create to run tests
    zSlickGridSearchService._private = {
        isRankHigher: isRankHigher,
        getValueByPriority: getValueByPriority,
        subsumedText: subsumedText,
        innerSearch: innerSearch
    };
});
