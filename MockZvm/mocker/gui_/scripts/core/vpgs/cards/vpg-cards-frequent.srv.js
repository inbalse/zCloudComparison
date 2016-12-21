/**
 * Created by nir.moreno on 13/07/2016.
 */
'use strict';
angular.module('zvmApp.services')
    .constant('cardsFrequentFieldsConstants', {
        PREFIX: 'cardsFrequentFields',
        MAXSIZE: 5,
        FIELD_TYPE: {
            SORT: 'sort',
            FILTER: 'filter'
        },
        FREQUENT_PERIOD_IN_DAYS: 14
    })
    .service('vpgCardsFrequentService', function (basil, cardsFrequentFieldsConstants, tweaksService) {

        var vpgCardsFrequentService = this,
            frequentPeriodInDays = tweaksService.getTweak('t_cardsFrequentFieldsPeriodInDays', cardsFrequentFieldsConstants.FREQUENT_PERIOD_IN_DAYS);

        vpgCardsFrequentService.allFrequentData = basil.get(cardsFrequentFieldsConstants.PREFIX) || {
                sort: [],
                filter: []
            };

        vpgCardsFrequentService.orderFrequentSortItemsInHeadOfArray = function (items) {
            return orderFrequentItemsInHeadOfArray(items, cardsFrequentFieldsConstants.FIELD_TYPE.SORT);
        };
        vpgCardsFrequentService.orderFrequentFilterItemsInHeadOfArray = function (items) {
            return orderFrequentItemsInHeadOfArray(items, cardsFrequentFieldsConstants.FIELD_TYPE.FILTER);
        };

        vpgCardsFrequentService.checkIfFrequentSortExist = function (item) {
            return checkIfFrequentExist(item, cardsFrequentFieldsConstants.FIELD_TYPE.SORT);
        };
        vpgCardsFrequentService.checkIfFrequentFilterExist = function (item) {
            return checkIfFrequentExist(item, cardsFrequentFieldsConstants.FIELD_TYPE.FILTER);
        };

        vpgCardsFrequentService.pushSortField = function (sort) {
            return pushField(sort, cardsFrequentFieldsConstants.FIELD_TYPE.SORT);
        };
        vpgCardsFrequentService.pushFilterField = function (field) {
            return pushField(field, cardsFrequentFieldsConstants.FIELD_TYPE.FILTER);
        };

        //region private
        function checkIfFrequentExist(item, type) {
            var fieldToCheck = item.field,
                twoWeeksAgo = moment().subtract(frequentPeriodInDays, 'day');

            //check if frequent data exist
            if (_.isNullOrUndefined(vpgCardsFrequentService.allFrequentData)) {
                return false;
            }

            // remove frequent fields that live more than 2 weeks
            _.remove(vpgCardsFrequentService.allFrequentData[type], function (frequentField) {
                return twoWeeksAgo.isAfter(_.head(frequentField.usages));
            });

            //find the most frequent fields - the first element is the most frequent
            var mostFrequentData = vpgCardsFrequentService.allFrequentData[type].slice(0, cardsFrequentFieldsConstants.MAXSIZE);

            return !!_.find(mostFrequentData, {field: fieldToCheck});
        }

        function pushField(element, type) {
            var orderArray = [],
                frequentFieldGroupsArrangedByUsageNumber = {},
                frequent = _.find(vpgCardsFrequentService.allFrequentData[type], {field: element.field});

            if (_.isNullOrUndefined(frequent)) {
                vpgCardsFrequentService.allFrequentData[type].push({
                    field: element.field,
                    usages: [new Date()]
                });
            }
            else {
                frequent.usages.unshift(new Date());

                var twoWeeksAgo = moment().subtract(frequentPeriodInDays, 'day');

                // remove usages that longer than 14 days
                _.remove(frequent.usages, function (useDate) {
                    return twoWeeksAgo.isAfter(useDate);
                });
            }

            // sort the frequent fields to arrays by their usage number. each array will stored by key name of the array length
            _.forEach(vpgCardsFrequentService.allFrequentData[type], function (frequentField) {
                if (_.isNullOrUndefined(frequentFieldGroupsArrangedByUsageNumber[frequentField.usages.length])) {
                    frequentFieldGroupsArrangedByUsageNumber[frequentField.usages.length] = [frequentField];
                } else {
                    frequentFieldGroupsArrangedByUsageNumber[frequentField.usages.length].push(frequentField);
                }
            });

            // sort each array to store the most recent usages first
            _.forEach(frequentFieldGroupsArrangedByUsageNumber, function (groupOfFrequentFieldsWithSameUsageNumber, key) {

                frequentFieldGroupsArrangedByUsageNumber[key] = _.sortBy(groupOfFrequentFieldsWithSameUsageNumber, function (frequentFieldInGroup) {
                    return new Date(_.head(frequentFieldInGroup.usages));
                });
            });

            // concat to a single array - start with the most usage fields ...
            _.forEach(frequentFieldGroupsArrangedByUsageNumber, function (groupOfFrequentFieldsWithSameUsageNumber) {
                orderArray = orderArray.concat(groupOfFrequentFieldsWithSameUsageNumber);
            });

            vpgCardsFrequentService.allFrequentData[type] = orderArray.reverse();

            basil.set(cardsFrequentFieldsConstants.PREFIX, vpgCardsFrequentService.allFrequentData);
        }

        function orderFrequentItemsInHeadOfArray(items, type) {
            var result = [],
                found;

            // the most frequent item is in the head of the array - the first 5 items are the most frequent.
            var mostFrequentDataFromLocalStorage = vpgCardsFrequentService.allFrequentData[type].slice(0, cardsFrequentFieldsConstants.MAXSIZE);

            // map the frequents from Field to full Object
            _.forEach(mostFrequentDataFromLocalStorage, function (frequentField) {
                found = _.find(items, {field: frequentField.field});
                if (!_.isNullOrUndefined(found)) {
                    result.push(found);
                }
            });

            // return array with up to 5 frequent items the head.
            return _.uniq(result.concat(items), function (item) {
                if (_.isNull(item)) {
                    return false;
                }
                return item.field;
            });
        }
        //endregion
    });
