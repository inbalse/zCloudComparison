(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('cardRowConstants', {
            DISPLAY_NAME: 'CardRowComponent'
        })
        .factory('CardRowComponentFactory', function (CardComponentFactory, EmptyCardComponentFactory, cardRowConstants) {
            return React.createClass({
                displayName: cardRowConstants.DISPLAY_NAME,
                onActionClick: function (item, action) {
                    this.props.onActionClick(item, action);
                },
                render: function () {
                    var that = this,
                        view = [];
                    Array.prototype.push.apply(view, this.props.items);
                    while (view.length < this.props.cardsPerRow) {
                        view.push(null);
                    }

                    return React.createElement('div', {className: this.props.classNames},
                        view.map(function (item, i) {
                            if (_.isNullOrUndefined(item)) {
                                return React.createElement(EmptyCardComponentFactory, {
                                    key: i
                                });
                            }
                            return React.createElement(CardComponentFactory, {
                                item: item,
                                cardType: that.props.cardType,
                                key: i,
                                index: i,
                                onActionClick: that.onActionClick,
                                toggleCheckbox: that.props.toggleCheckbox
                            });
                        })
                    );
                }
            });
        });
})(window.React);
