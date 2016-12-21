'use strict';

angular.module('zvmApp.filters')
    .filter('storageMBToStringfilter', function (dataUnitConvertorService) {
        return function (value) {
            return dataUnitConvertorService.storageMegaBytesToString(value);
        };
    });