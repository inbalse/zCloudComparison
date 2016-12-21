'use strict';
angular.module('zvmApp.services')
    .constant('cardListConstants', {
        DISPLAY_NAME: 'CardListComponent',
        CONTAINER_SELECTOR: '.cards-component__container',
        CARDS_CONTROL_SELECTOR: '.cards-controls',
        FILTER_BTN_SELECTOR: '.cards-control-filter-btn',
        SCROLL_CONTAINER_CLASS: 'cards-view-component',
        SCROLL_CONTAINER_REF: 'Container',
        GRID_SCROLL_REF: 'GridScroll',
        SCROLL_CLASS: 'cards-view-component--scroll',
        ROW_CLASS: 'cards-view-component__row',
        // COLUMN_WIDTH: 360,
        ROW_HEIGHT: 208,
        OVERSCAN_ROW_COUNT: 2,
        DEFAULT_GROUP_BY_ID: '',
        THREE_CARD_PER_ROW: 1024,
        FOUR_CARD_PER_ROW: 1366,
        FIVE_CARD_PER_ROW: 1920,
        GROUP_BY_OFFSET: 15
    })
    .service('cardListComponentService', function (cardListConstants, dataSortService, cardGroupByConstants) {
        var cardListComponentService = this;

        var selectedItems = [];

        cardListComponentService.reset = function () {
            selectedItems = [];
        };

        cardListComponentService.addSelectedItems = function (itemIds) {
            selectedItems = selectedItems.concat(itemIds);
        };
        cardListComponentService.addSelectedItem = function (itemId) {
            selectedItems.push(itemId);
        };
        cardListComponentService.removeSelectedItem = function (itemId) {
            _.remove(selectedItems, function (id) {
                return _.isEqual(itemId, id);
            });
        };
        cardListComponentService.isItemSelected = function (itemId) {
            return _.contains(selectedItems, itemId);
        };

        cardListComponentService.calculateRowsCount = function (itemsLength, cardsPerRow) {
            return Math.ceil(itemsLength / cardsPerRow);
        };

        cardListComponentService.isGroupSelected = function (groupBy) {
            return !_.isEqual(groupBy.id, cardListConstants.DEFAULT_GROUP_BY_ID);
        };

        cardListComponentService.getCardsPerRow = function (width) {
            if (width < cardListConstants.FOUR_CARD_PER_ROW) {
                return 3;
            } else if (width >= cardListConstants.FOUR_CARD_PER_ROW && width < cardListConstants.FIVE_CARD_PER_ROW) {
                return 4;
            } else {
                return 5;
            }
        };

        cardListComponentService.getItemsCount = function (arr) {
            var result = 0;
            _.forEach(arr, function (o) {
                result += o.length;
            });
            return result;
        };

        cardListComponentService.getChunks = function (data, cardsPerRow, groupBy) {
            var result;

            if (!cardListComponentService.isGroupSelected(groupBy)) {
                result = _.chunk(data, cardsPerRow);
                return result;
            }

            result = [];
            var header, items, chunks;
            for (var i = 0, length = data.length; i < length; i += 2) {
                header = data[i];
                items = data[i + 1];
                header.index = i;
                chunks = _.chunk(items, cardsPerRow);
                header.collapseRange = {from: result.length, to: result.length + chunks.length + 1};
                result.push(header);
                Array.prototype.push.apply(result, chunks);
            }

            return result;

        };


        cardListComponentService.getRowHeight = function (view, index, collapsedGroups, cardsPerRow) {
            var row = view[index];
            if (!_.isArray(row)) {
                return cardGroupByConstants.HEADER_HEIGHT;
            }

            var isHidden = _.find(collapsedGroups, function (group) {
                return group.collapseRange.from < index && index < group.collapseRange.to;
            });

            if (!_.isNullOrUndefined(isHidden)) {
                return 0;
            }
            if (cardsPerRow < 5) {
                return 190;
            }
            return cardListConstants.ROW_HEIGHT;
        };

        cardListComponentService.getActualLength = function (items) {
            var count = 0;
            _.forEach(items, function (item) {
                if (!_.isNullOrUndefined(item)) {
                    ++count;
                }
            });

            return count;
        };
    });
