'use strict';

angular.module('zvmApp.directives')
    .constant('borderArrowClasses',
    {
        ALL: 'z-arrow',
        UP: 'z-arrow-up',
        DOWN: 'z-arrow-down',
        LEFT: 'z-arrow-left',
        RIGHT: 'z-arrow-right'
    })
    .directive('borderArrow', ['borderArrowClasses', function (borderArrowClasses) {
        return{
            restrict: 'A',
            link: function (scope, element, attr) {
                if (attr.borderArrow === '') {
                    throw 'borderArrow not specified';
                }
                var css_class = borderArrowClasses.ALL + ' ';
                switch (attr.borderArrow) {
                    case 'up':
                        css_class += borderArrowClasses.UP;
                        break;
                    case 'right':
                        css_class += borderArrowClasses.RIGHT;
                        break;
                    case 'down':
                        css_class += borderArrowClasses.DOWN;
                        break;
                    case 'left':
                        css_class += borderArrowClasses.LEFT;
                        break;
                    default:
                        css_class += borderArrowClasses.UP;
                }

                element.append('<div class="' + css_class + '"></div>');

            }
        };
    }]);