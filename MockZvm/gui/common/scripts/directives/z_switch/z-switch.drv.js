'use strict';

angular.module('zvmApp.directives').directive('zSwitch', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/common/directives/z_switch/z-switch.html',
        transclude: true,
        replace: false,
        scope: {
            model: '=',
            disabled: '=',
            change: '&',
            labels: '='
        },
        link: function (scope, elem) {
            if (angular.isUndefined(scope.model)) {
               $(elem).find('input[type="checkbox"]')[0].indeterminate =  scope.isIndeterminate = true;
            }


        }
    };
});