/**
 * Created by guy.golan on 5/2/2016.
 */
'use strict';
angular.module('zvmApp.services')
    .constant('viewSwitchConstants', {
        CARD_CLASS: 'view-switch--cards',
        LIST_CLASS: 'view-switch--grid'
    })
    .component('viewSwitch', {
        bindings: {
            cardsState: '@',
            gridState: '@'
        },
        templateUrl: 'scripts/core/view_switch/view-switch.html',
        controller: function ($rootScope, $state, viewSwitchConstants) {
            var ctrl = this;

            setState();

            $rootScope.$on('$stateChangeSuccess', function () {
                setState();
            });

            function setState() {
                if ($state.current.isCardView) {
                    ctrl.switchTypeClass = viewSwitchConstants.CARD_CLASS;
                } else {
                    ctrl.switchTypeClass = viewSwitchConstants.LIST_CLASS;
                }
            }

        }
    });
