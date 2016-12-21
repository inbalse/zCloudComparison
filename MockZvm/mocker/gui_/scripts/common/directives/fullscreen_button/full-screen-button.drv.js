'use strict';

angular.module('zvmApp.directives').directive('fullScreenButton', function () {
    return {
        replace: true,
        restrict: 'E',
        template: '<button type="button" class="btn btn-link pull-right" ><span class="z-toggle-fullscreen z-toggle-fullscreen-on"></span></button>',
        link: function (scope, elem) {
            elem.on('click', function () {
                var viewContainer = $('.viewContainer');
                if (viewContainer.hasClass('full-screened')) {
                    viewContainer.removeClass('full-screened');
                    $('span',elem).removeClass('z-toggle-fullscreen-off').addClass('z-toggle-fullscreen-on');

                }
                else {
                    viewContainer.addClass('full-screened');
                    $('span',elem).addClass('z-toggle-fullscreen-off').removeClass('z-toggle-fullscreen-on');
                }

                $(window).resize();
            });

            scope.$on('$destroy', function () {
                elem.off('click');
            });
        }
    };
});
