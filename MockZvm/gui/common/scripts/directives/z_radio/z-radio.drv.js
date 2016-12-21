'use strict';

angular.module('zvmApp.directives').directive('zRadio', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/common/directives/z_radio/z-radio.html',
        transclude: true,
        replace: true,
        scope: {
            model: '=',
            value: '=',
            name: '@',
            zDisabled: '=',
            change: '&',
            useIndeterminate: '=',
            onClick: '='
        },
        link: function (scope, elem, attrs, ctrl, transclude) {

            if (!scope.useIndeterminate) {
                scope.model = angular.isUndefined(scope.model) ? false : scope.model;
            } else if (angular.isUndefined(scope.model)) {
                elem.find('input[type="radio"]')[0].indeterminate = true;
            }

            var text = transclude(scope.$parent, function (clone) {
                return clone.children();
            });

            elem.find('span.z-radio-transclude').replaceWith(text);

        }
    };
});
