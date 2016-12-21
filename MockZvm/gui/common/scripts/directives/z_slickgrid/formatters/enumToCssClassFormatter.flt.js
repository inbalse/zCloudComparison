'use strict';

angular.module('zvmApp.filters')
    .filter('enumToCssClassFormatter', function () {
        return function (className) {
            return function (row, cell, value) {

                return '<div class="' + className + '-' + value + '"></div>';
            };
        };
    })
    .filter('enumToCssClassGroupFormatter', function () {
        return function (className) {
            return function (row, cell, value) {

                return '<div class="' + className + ' ' + className + '-' + value + '"></div>';
            };
        };
    })
    .filter('enumToCssWithTooltipClassFormatter', function () {
        return function (className) {
            return function (row, cell, value) {
                if (angular.isUndefined(value)) {
                    return '<div class="' + className + '-' + value + '"></div>';
                } else {
                    return '<div title="' + value.title + '" class="' + className + '-' + value.display + '"></div>';
                }
            };
        };
    })
        
    .filter('textWithEnumToCssClassFormatter', function () {
        return function (className, propertyForEnum) {
            return function (row, cell, value, columnDef, context) {
                var enumValue;

                if (angular.isObject(value)) {
                    enumValue = (propertyForEnum && context[propertyForEnum]) ? context[propertyForEnum].value : '0';
                } else {
                    enumValue = (propertyForEnum && context[propertyForEnum]) ? context[propertyForEnum] : '0';
                }

                var tempStr = '<div class="' + className + '-' + enumValue + '">';
                tempStr += angular.isObject(value) ? '<span>' + value.display + '</span>' : '<span>' + value + '</span>';
                tempStr += '</div>';


                return tempStr;
            };
        };
    })
    .filter('textWithEnumTypeObjectToCssClassFormatter', function () {
        return function (className) {
            return function (row, cell, value) {

                var tempStr = '<div class="' + className + '-' + value.value + '">';
                tempStr += '<span>' + value.display + '</span>';
                tempStr += '</div>';


                return tempStr;
            };
        };
    })
    .filter('textTranslatedWithEnumToCssClassFormatter', function () {
        return function (className, propertyForDisplay) {
            return function (row, cell, value, columnDef, context) {

                var tempStr = '<div class="' + className + '-' + value + '">';

                tempStr += '<span>' + context[propertyForDisplay] + '</span>';
                tempStr += '</div>';
                return tempStr;
            };
        };
    });



