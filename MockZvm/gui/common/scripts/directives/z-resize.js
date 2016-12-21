'use strict';
angular.module('zvmApp.directives')
    .directive('zResize', function($window) {
    return {
        link: function($scope) {
            angular.element($window).on('resize', $window._.debounce(function() {
                $scope.$broadcast('zResize::resize');
            },500));
        }
    };
});