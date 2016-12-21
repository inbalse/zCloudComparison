'use strict';

angular.module('zvmApp.filters')
    .filter('storageBytesToStringfilter', function (dataUnitConvertorService) {
        return function (value) {
            return dataUnitConvertorService.storageBytesToString(value);
        };
    });