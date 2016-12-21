/**
 * Created by guy.golan on 8/14/2016.
 */
'use strict';
angular.module('zvmApp.directives')
    .directive('filterAutoClose', function () {
        return {
            restrict: 'A',
            link: function () {
                var body = angular.element(document.body);
                body.on('click', function (event) {
                    if (angular.element(event.target).parents('.daterangepicker').length ||
                        angular.element(event.target).hasClass('daterangepicker') ||
                        angular.element(event.target).parents('.slick-header-menu').length ||
                        angular.element(event.target).hasClass('slick-header-menu')) {
                        event.stopPropagation();
                    }
                });
            }
        };
    });

