(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('vpgCardConstants', {
            DISPLAY_NAME: 'VPGCardComponent',
            CARD_CLASS: 'vpgs-cards-component__card',
            CARD_SELECTED: 'vpgs-cards-component__card--selected',
            CARD_OPERATION: 'vpgs-cards-component__card--operation'
        })
        .factory('VPGCardComponentFactory', function ($filter, VPGCardTitleComponentFactory, VPGCardInfoComponentFactory, cardListComponentService,
                                                        VPGCardRPOComponentFactory, VPGCardProgressComponentFactory,
                                                      vpgCardConstants) {
            return React.createClass({
                displayName: vpgCardConstants.DISPLAY_NAME,
                onActionClick: function (action) {
                    this.props.onActionClick(this.props.item, action);
                },
                getInitialState: function () {
                    return {cardClass: this.getCardClass(this.props)};
                },
                toggleCheckbox: function (item, state) {
                    this.props.toggleCheckbox(item, state);
                    this.setState({cardClass: this.getCardClass(this.props)});
                },
                componentWillReceiveProps: function(nextProps){
                    this.setState({cardClass: this.getCardClass(nextProps)});
                },
                getCardClass: function (props) {
                    var result = [vpgCardConstants.CARD_CLASS];
                    if (cardListComponentService.isItemSelected(props.item.Identifier.GroupGuid)) {
                        result.push(vpgCardConstants.CARD_SELECTED);
                    }

                    if (!_.isNullOrUndefined(props.item.progress)) {
                        result.push(vpgCardConstants.CARD_OPERATION);
                    }

                    return $filter('classNamesFormatter')(result);
                },
                render: function () {
                    var item = this.props.item;
                    return React.createElement(
                        'div',
                        {className: this.state.cardClass},
                        React.createElement(VPGCardTitleComponentFactory, {
                            item: item,
                            toggleCheckbox: this.toggleCheckbox
                        }),
                        React.createElement(VPGCardInfoComponentFactory, {item: item}),
                        React.createElement(VPGCardRPOComponentFactory, {item: item}),
                        React.createElement(VPGCardProgressComponentFactory, {
                            progress: item.progress,
                            onActionClick: this.onActionClick
                        })
                    );
                }
            });
        });
})(window.React);
