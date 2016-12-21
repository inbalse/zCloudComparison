(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('alertsTooltipItemConstants', {
            DISPLAY_NAME: 'AlertsTooltipItemComponent',
            ALERT_ITEM_CLASS: 'alerts-tooltip__alert-item',
            ALERT_ITEM_ICON: 'alerts-tooltip__alert-icon',
            ALERT_ITEM_PREFIX: 'alerts-list-level-status',
            ALERT_ITEM_SITE_NAME: 'alerts-tooltip__alert-site-name',
            ALERT_ITEM_DESCRIPTION: 'alerts-tooltip__alert-description'
        })
        .factory('AlertsTooltipItemComponentFactory', function (alertsTooltipItemConstants) {
            return React.createClass({
                displayName: alertsTooltipItemConstants.DISPLAY_NAME,

                render: function () {
                    return React.createElement('div', {className: alertsTooltipItemConstants.ALERT_ITEM_CLASS},
                        React.createElement('div', {className: alertsTooltipItemConstants.ALERT_ITEM_ICON},
                            React.createElement('div', {
                                className: alertsTooltipItemConstants.ALERT_ITEM_PREFIX + ' ' +
                                alertsTooltipItemConstants.ALERT_ITEM_PREFIX + '-' + this.props.alertLevel
                            })
                        ),
                        React.createElement('div', {className: alertsTooltipItemConstants.ALERT_ITEM_SITE_NAME},
                            React.createElement('span', null, this.props.siteName)
                        ),
                        React.createElement('div', {className: alertsTooltipItemConstants.ALERT_ITEM_DESCRIPTION},
                            this.props.description
                        )
                    );
                }
            });
        });
})(window.React);
