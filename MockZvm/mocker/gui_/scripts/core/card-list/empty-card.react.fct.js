(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .factory('EmptyCardComponentFactory', function (cardConstants) {
            return React.createClass({
                displayName: 'EmptyCardComponent',
                render: function () {
                    return React.createElement('div', {
                        className: cardConstants.CARD_CELL_CLASS
                    });
                }
            });
        });
})(window.React);
