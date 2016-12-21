'use strict';

angular.module('zvmApp.directives').directive('zCheckbox', function () {
    return {
        require: '?ngModel',
        restrict: 'E',
        templateUrl: 'scripts/common/directives/z_checkbox/z-checkbox.html',
        transclude: true,
        replace: true,
        scope: {
            model: '=',
            change: '&',
            preChange: '&',
            zDisabled: '=',
            useIndeterminate: '='
        },
        link: function (scope, elem, attrs, ngModel, transclude) {

            if (!scope.useIndeterminate) {
                scope.model = angular.isUndefined(scope.model) ? false : scope.model;
            } else if (angular.isUndefined(scope.model)) {
                elem.find('input[type="checkbox"]')[0].indeterminate = true;
            }

            var text = transclude(scope.$parent, function (clone) {
                return clone.children();
            });

            elem.find('span.z-checkbox-transclude').replaceWith(text);

            // added due to "Bug 25833 - CP's list is not filtered automatically and the sort not working properly"
            if (angular.isFunction(scope.change)) {
                scope.$watch('model', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        scope.change();
                    }
                });
            }
        }
    };
});
