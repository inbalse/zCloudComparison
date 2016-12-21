'use strict';

angular.module('zvmApp.directives').directive('zPassword', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/common/directives/z_password/z-password.html',
        transclude: true,
        replace: false,
        scope: {
            model: '=',
            zDisabled: '=',
            required: '=',
            showText: '=',
            placeholderText: '@',
            change: '&',
            keyUp: '&'
        }
    };
});
