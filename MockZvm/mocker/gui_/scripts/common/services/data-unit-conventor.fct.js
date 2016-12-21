'use strict';
angular.module('zvmApp.services')
    .factory('dataUnitConvertorService', function () {

        var dataUnitConvertorService = {};

        dataUnitConvertorService.storageMegaBytesToString = function (value) {
            return dataUnitConvertorService.storageBytesToString(value * 1024 * 1024);
        };

        dataUnitConvertorService.storageBytesToString = function (value) {
            if (value === 0) {
                return '0';
            }

            if(value === 'N/A'){
                return value;
            }

            if (value < 2048) {
                return value.toFixed(0) + ' B';
            }
            var numberOfKilobytes = value / 1024;
            if (numberOfKilobytes < 2048) {
                return numberOfKilobytes.toFixed(0) + ' KB';
            }
            var numberOfMegaBytes = numberOfKilobytes / 1024;
            if (numberOfMegaBytes < 1024) {
                return numberOfMegaBytes.toFixed(0) + ' MB';
            }
            var numberOfGigaBytes = numberOfMegaBytes / 1024;
            if (numberOfGigaBytes < 10) {
                return numberOfGigaBytes.toFixed(2) + ' GB';
            }
            if (numberOfGigaBytes < 100) {
                return numberOfGigaBytes.toFixed(1) + ' GB';
            }
            if (numberOfGigaBytes < 1024) {
                return numberOfGigaBytes.toFixed(0) + ' GB';
            }
            var numberOfTeraBytes = numberOfGigaBytes / 1024;
            if (numberOfTeraBytes < 10) {
                return numberOfTeraBytes.toFixed(2) + ' TB';
            }
            if (numberOfTeraBytes < 100) {
                return numberOfTeraBytes.toFixed(1) + ' TB';
            }
            return numberOfTeraBytes.toFixed(0) + ' TB';
        };

        dataUnitConvertorService.sizeTypes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        dataUnitConvertorService.sizeToStringConvertor = function (value, typeIndex) {
            if (value < 1024 || typeIndex === dataUnitConvertorService.sizeTypes.length - 1) {
                return value.toFixed(1) + ' ' + dataUnitConvertorService.sizeTypes[typeIndex];
            }

            return dataUnitConvertorService.sizeToStringConvertor(value / 1024.0, typeIndex + 1, 1);
        };

        return dataUnitConvertorService;
    });
