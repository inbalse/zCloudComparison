(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .constant('vpgCardInfoConstants', {
            DISPLAY_NAME: 'VPGCardInfoComponent',
            INFO_CLASS: 'vpgs-cards-component__card-info',
            ITEM_CLASS: 'vpgs-cards-component__card-info-item',
            NAME_CLASS: 'vpgs-cards-component__card-info-name',
            SLA_CLASS: 'vpgs-cards-component__card-info-sla'
        })
        .factory('VPGCardInfoComponentFactory', function ($translate, $filter, vpgCardInfoConstants) {

            return React.createClass({
                displayName: vpgCardInfoConstants.DISPLAY_NAME,
                render: function () {
                    var item = this.props.item;
                    var displayRPO = $filter('vpgCardDisplayRpo')(item.ConfiguredRPO);
                    return React.createElement(
                        'div',
                        {className: vpgCardInfoConstants.INFO_CLASS},
                        React.createElement('span', {
                            className: item.directionIcon
                        }),
                        React.createElement('span', {
                            className: item.TargetTypeObj.classNames
                        }),
                        React.createElement(
                            'span',
                            {
                                className: $filter('classNamesFormatter')([vpgCardInfoConstants.ITEM_CLASS, vpgCardInfoConstants.NAME_CLASS]),
                                title: item.TargetSiteName
                            },
                            item.TargetSiteName
                        ),
                        React.createElement(
                            'span',
                            {className: $filter('classNamesFormatter')([vpgCardInfoConstants.ITEM_CLASS, vpgCardInfoConstants.SLA_CLASS])},
                            $translate.instant('CREATE_VPG_REPLICATION.SLA') + ': ' + displayRPO.mainNumber + ' ' + displayRPO.units
                        )
                    );
                }
            });
        });
})(window.React);
