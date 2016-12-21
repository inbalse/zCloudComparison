(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('cardTitleConstants', {
            DISPLAY_NAME: 'VPGCardInfoComponent',
            TITLE_CLASS: 'vpgs-cards-component__card-title',
            LINK_CLASS: 'vpgs-cards-component__card-title-link',
            NAME_TEXT_CLASS: 'vpgs-cards-component__card-title-text',
            NUM_VMS_CLASS: 'vpgs-cards-component__card-title-vms'
        })
        .factory('VPGCardTitleComponentFactory', function (CardCheckBoxComponentFactory, AlertsTooltipComponentFactory,
                                                           cardTitleConstants, cardCheckboxConstants) {
            return React.createClass({
                displayName: cardTitleConstants.DISPLAY_NAME,
                mouseOver: function () {
                    this.setState({hover: true});
                },
                mouseOut: function () {
                    this.setState({hover: false});
                },
                getInitialState: function () {
                    return {
                        hover: false
                    };
                },
                render: function () {
                    var item = this.props.item;
                    return React.createElement(
                        'div',
                        {className: cardTitleConstants.TITLE_CLASS},
                        React.createElement(
                            'div',
                            {
                                className: cardTitleConstants.LINK_CLASS
                            },
                            React.createElement('a', {
                                href: '#/' + item.NameObj.nameText.location,
                                className: cardTitleConstants.NAME_TEXT_CLASS,
                                'data-vms': ' (' + item.NumberOfVms + ')'
                            },   item.Name)
                            // React.createElement('span', {
                            //     className: cardTitleConstants.NUM_VMS_CLASS
                            // }, ' (' + item.NumberOfVms +')')
                        ),
                        React.createElement(
                            'label',
                            {className: cardCheckboxConstants.CHECKBOX_CLASS},
                            React.createElement(CardCheckBoxComponentFactory, {
                                toggleCheckbox: this.props.toggleCheckbox,
                                item: item
                            }),
                            React.createElement('span', {htmlFor: cardCheckboxConstants.ID_PREFIX + item.id})
                        ),
                        React.createElement('span', {
                            ref: 'vpgIcon',
                            className: item.AlertStatusObj.classNames,
                            onMouseOver: this.mouseOver, onMouseOut: this.mouseOut
                        }),
                        this.state.hover && item.AlertStatus !== 0 && React.createElement(AlertsTooltipComponentFactory, {
                            alertTips: item.AlertTips,
                            parent: this.refs.vpgIcon
                        })
                    );
                }
            });


        });
})(window.React);
