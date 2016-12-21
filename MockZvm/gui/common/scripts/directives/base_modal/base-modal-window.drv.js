'use strict';

angular.module('zvmApp.directives')
    .directive('baseModalWindow', function (onlineHelpFactory) {
        return{
            restrict: 'E',
            transclude: true,
            templateUrl: 'scripts/common/directives/base_modal/base-modal-window.html',
            scope: {
                modalTitle: '@',
                close: '=',
                help: '@',
                loading: '=',
                disabled: '=',
                btns: '=',
                busy: '='
            },
            link: function (scope) {
                scope.handleHelpClick = function () {
                    onlineHelpFactory.showHelpPage(scope.help);
                };
            }
        };
    });
