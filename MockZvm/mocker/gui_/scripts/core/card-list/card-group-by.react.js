(function(React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('cardGroupByConstants', {
            DISPLAY_NAME: 'CardGroupByComponent',
            CONTAINER_CLASS: 'cards-list__groupby-container',
            HEADER_CLASS: 'cards-list__groupby-header',
            HEADER_HEIGHT: 35,
            LIST_CLASS: 'cards-list__groupby-list',
            GROUP_INFO: 'cards-list__groupby-info',
            GROUP_NAME: 'cards-list__groupby-name',
            GROUP_VALUE: 'cards-list__groupby-value',
            GROUP_COUNT: 'cards-list__groupby-count',
            GROUP_TOGGLE_CLASS: 'cards-list__groupby-toggle',
            GROUP_COLLAPSED_CLASS: 'cards-list__groupby-toggle--collapsed',
            GROUP_EXPANDED_CLASS: 'cards-list__groupby-toggle--expanded'

        }).factory('GroupHeaderComponentFactory', function ($filter, cardListComponentService, cardGroupByConstants) {
            return React.createClass({
                displayName: cardGroupByConstants.DISPLAY_NAME,
                toggleCollapseGroup: function () {
                    this.props.toggleCollapseGroup(this.props.data);
                },
                getCollapseState: function (collapsed) {
                    var result = [cardGroupByConstants.GROUP_TOGGLE_CLASS];

                    result.push(!_.isNullOrUndefined(collapsed) ? cardGroupByConstants.GROUP_COLLAPSED_CLASS : cardGroupByConstants.GROUP_EXPANDED_CLASS);

                    return $filter('classNamesFormatter')(result);
                },
                render: function () {
                    return React.createElement('div', {className: cardGroupByConstants.CONTAINER_CLASS},
                        React.createElement('div', {className: cardGroupByConstants.HEADER_CLASS},
                            React.createElement('div', {className: cardGroupByConstants.GROUP_INFO},
                                React.createElement('div', {className: cardGroupByConstants.GROUP_NAME}, this.props.data.name + ':'),
                                this.getGroupDisplay(),
                                React.createElement('div', {className: cardGroupByConstants.GROUP_COUNT}, '(' + this.props.data.count + ' items)')
                            ),
                            React.createElement('div', {
                                className: this.getCollapseState(this.props.collapsed),
                                onClick: this.toggleCollapseGroup
                            })
                        )
                    );
                },
                getGroupDisplay: function () {
                    if (_.isFunction(this.props.data.formatter)) {
                        return React.createElement('div', {
                            className: cardGroupByConstants.GROUP_VALUE,
                            dangerouslySetInnerHTML: {__html: this.props.data.formatter(null, null, this.props.data.value)}
                        });
                    }

                    return React.createElement('div', {
                        className: cardGroupByConstants.GROUP_VALUE
                    }, this.props.data.value);
                }
            });

        });
})(window.React);
