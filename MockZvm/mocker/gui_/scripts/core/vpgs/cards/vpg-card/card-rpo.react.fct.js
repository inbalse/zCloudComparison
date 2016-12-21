(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('vpgCardRPOConstants', {
            DISPLAY_NAME: 'VPGCardRPOComponent',
            CONTAINER_CLASS: 'vpgs-cards-component__card-rpo-container ',
            RPO_CLASS: 'vpgs-cards-component__card-rpo',
            CARD_UNITS_CONTAINER_CLASS: 'vpgs-cards-component__card-units-container',
            CARD_RPO_TEXT_CLASS: 'vpgs-cards-component__card-rpo-text',
            CARD_UNITS_CLASS: 'vpgs-cards-component__card-rpo-units'
        })
        .factory('VPGCardRPOComponentFactory', function (VPGCardGaugeComponentFactory, vpgCardRPOConstants, vpgCardDisplayRpoConstants) {

            return React.createClass({
                displayName: vpgCardRPOConstants.DISPLAY_NAME,
                isRpoValid: function (rpo) {
                    return rpo > vpgCardDisplayRpoConstants.MIN_RPO && rpo < vpgCardDisplayRpoConstants.MAX_RPO;
                },
                render: function () {
                    var item = this.props.item;
                    return React.createElement(
                        'div',
                        {className: vpgCardRPOConstants.CONTAINER_CLASS},
                        React.createElement(VPGCardGaugeComponentFactory, {
                            guid: item.Identifier.GroupGuid,
                            rpo: item.gauge.rpo,
                            sla: item.gauge.sla
                        }),
                        React.createElement('label', {className: item.gauge.rpoCss}, item.ActualRPOObj.display),
                        this.isRpoValid(item.gauge.rpo) && React.createElement('div', {
                                className: vpgCardRPOConstants.CARD_UNITS_CONTAINER_CLASS
                            }, React.createElement('span', {
                                className: vpgCardRPOConstants.CARD_RPO_TEXT_CLASS
                            }, 'RPO'),
                            React.createElement('span', {
                                className: vpgCardRPOConstants.CARD_UNITS_CLASS
                            }, ' (' + item.gauge.units + ')'))
                    );
                }
            });
        });
})(window.React);
