(function (React, ReactDOM) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('alertsTooltipConstants', {
            DISPLAY_NAME: 'AlertsTooltipComponent',
            WRAPPER_ID: 'alerts-tooltip-wrapper',
            WRAPPER_OFFSET: 25,
            CONTAINER_CLASS: 'alerts-tooltip__container',
            TITLE_CLASS: 'alerts-tooltip__title',
            ALERT_LIST_CLASS: 'alerts-tooltip__alerts-list',
            FOOTER_CLASS: 'alerts-tooltip__footer',
            MAX_ALERTS: 3

        })
        .factory('AlertsTooltipComponentFactory', function (AlertsTooltipItemComponentFactory, $translate, alertsTooltipConstants, $uibPosition) {

            return React.createClass({
                displayName: alertsTooltipConstants.DISPLAY_NAME,
                propTypes: {
                    parent: React.PropTypes.object.isRequired,
                    alertTips: React.PropTypes.object.isRequired
                },
                componentDidMount: function () {
                    var wrapper = alertsTooltipConstants.WRAPPER_ID && document.getElementById(alertsTooltipConstants.WRAPPER_ID);
                    if (!wrapper) {
                        wrapper = document.createElement('div');
                        wrapper.id = alertsTooltipConstants.WRAPPER_ID;
                        document.body.appendChild(wrapper);
                    }
                    this.wrapperElement = wrapper;
                    this.componentDidUpdate();
                },
                componentDidUpdate: function () {
                    var alerts = this.props.alertTips.Alerts.slice(0, alertsTooltipConstants.MAX_ALERTS);
                    ReactDOM.render(React.createElement('div', {
                            className: alertsTooltipConstants.CONTAINER_CLASS
                        },
                        React.createElement('div', {className: alertsTooltipConstants.TITLE_CLASS},
                            $translate.instant('ALERTS_TOOLTIP_COMPONENT.ACTIVE_ALERTS')
                        ),
                        React.createElement('div', {className: alertsTooltipConstants.ALERT_LIST_CLASS},
                            alerts.map(function (alert, i) {
                                return React.createElement(AlertsTooltipItemComponentFactory, {
                                    key: i,
                                    alertLevel: alert.AlertLevel,
                                    description: alert.Description,
                                    siteName: alert.SiteName
                                });
                            })
                        ),
                        this.showMoreActiveAlerts(this.props.alertTips.TotalNumberOfAlerts, alerts.length)
                    ), this.wrapperElement);

                    this.positionTooltip(this.props.parent, this.wrapperElement);

                },
                componentWillUnmount: function () {
                    document.body.removeChild(this.wrapperElement);
                },
                render: function () {
                    return null;
                },
                positionTooltip: function (parent, wrapper) {
                    if (!parent) {
                        return;
                    }
                    var tooltip = wrapper.firstChild,
                        pos = $uibPosition.positionElements(parent, tooltip, 'auto', true);
                    wrapper.style.position = 'absolute';
                    wrapper.style.zIndex = 9999;
                    wrapper.style.top = pos.top + 'px';
                    wrapper.style.left = pos.left + 'px';
                },
                showMoreActiveAlerts: function (totalAlerts, displayedAlerts) {
                    var moreAlerts = totalAlerts - displayedAlerts;

                    if (moreAlerts === 0) {
                        return null;
                    }

                    var text = moreAlerts === 1 ? $translate.instant('ALERTS_TOOLTIP_COMPONENT.MORE_ALERT') : $translate.instant('ALERTS_TOOLTIP_COMPONENT.MORE_ALERTS');

                    return React.createElement('div', {className: alertsTooltipConstants.FOOTER_CLASS},
                        moreAlerts + ' ' + text);
                }
            })
                ;

        });
})(window.React, window.ReactDOM);
