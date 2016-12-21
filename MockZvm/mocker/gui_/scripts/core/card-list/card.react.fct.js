(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('cardConstants', {
            DISPLAY_NAME: 'CardComponent',
            CARD_CELL_CLASS: 'cards-view-component__cell'
        })
        .factory('CardComponentFactory', function (cardConstants) {
            return React.createClass({
                displayName: cardConstants.DISPLAY_NAME,
                onActionClick: function (item, action) {
                    this.props.onActionClick(item, action);
                },
                render: function () {
                    return React.createElement('div', {
                            className: cardConstants.CARD_CELL_CLASS
                        },

                        React.createElement(this.props.cardType, {
                            item: this.props.item,
                            toggleCheckbox: this.props.toggleCheckbox,
                            onActionClick: this.onActionClick
                        }));
                }
            });
        });
})(window.React);
