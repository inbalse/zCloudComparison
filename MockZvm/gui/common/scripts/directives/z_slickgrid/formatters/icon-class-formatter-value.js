'use strict';

angular.module('zvmApp.directives')
    .filter('iconClassFormatterValue', function () {
        return function (className, prop) {
            return function (row, cell, value) {

                var disabledClass = value.hasOwnProperty('isDisabled') && value.isDisabled ? 'checkbox-disabled' : '';

                if (prop) {
                    return '<span class="' + disabledClass + ' ' + className + '-' + !!value[prop] + '"></span>';
                } else {
                    return '<span class="' + disabledClass + ' ' + className + '-' + !!value + '"></span>';
                }

            };
        };
    });
