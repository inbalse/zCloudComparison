'use strict';

angular.module('zvmApp.filters')
    .filter('mbToStringConvertorFilter', function (dataUnitConvertorService) {
        return function (value) {
            if (value === 0) {
                return dataUnitConvertorService.sizeToStringConvertor(0, 1);
            }
            return dataUnitConvertorService.sizeToStringConvertor(Math.abs(value), 1);
        };
    })
    .filter('gridMbToStringConvertorFilter', function (dataUnitConvertorService) {
        return function (value) {
            if (value === 0) {
                return dataUnitConvertorService.sizeToStringConvertor(0, 1);
            }
            return dataUnitConvertorService.sizeToStringConvertor(Math.abs(value), 1);
        };
    })
    .filter('mbToStringReverseConvertorFilter', function ($filter) {
        return function (value) {
            var str = $filter('mbToStringConvertorFilter')(value);
            var rest = str.slice(str.length - 2, str.length);
            var num = str.slice(0, str.length - 2);

            var mb = 0;
            switch (rest) {
                case 'GB':
                    mb = num * 1024;
                    break;
                case 'MB':
                    mb = num;
                    break;
                case 'KB':
                    mb = num / 1024;
                    break;
                case 'TB':
                    mb = num * 1048576;
                    break;
                default:
                    mb = num;
                    break;
            }

            return parseFloat(mb);
        };
    }).filter('mbToGbConverterFilter', function () {
    return function (mb) {
        return mb === 0 ? mb : mb / 1000;
    };
});
