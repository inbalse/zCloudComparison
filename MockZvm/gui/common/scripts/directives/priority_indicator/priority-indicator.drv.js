'use strict';

angular.module('zvmApp.directives').directive(  'priorityIndicator', function (enums) {
    function getClass(priority) {
        var css_class = 'priority-medium';
        switch (parseInt(priority)) {
            case enums.ProtectionGroupPriority.Low:
                css_class = 'priority-low';
                break;
            case enums.ProtectionGroupPriority.High:
                css_class = 'priority-high';
                break;
            default:
                css_class = 'priority-medium';
                break;
        }
        return css_class;
    }

    return {
        restrict: 'E',
        templateUrl: 'scripts/common/directives/priority_indicator/priority-indicator.html',
        scope: {
            priority: '='
        },
        link: function (scope, elem) {
            elem.addClass(getClass(scope.priority));

            scope.$watch('priority', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    elem.addClass(getClass(newValue));
                }
            });

        }
    };
});