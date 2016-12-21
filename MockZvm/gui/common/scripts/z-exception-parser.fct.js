'use strict';

angular.module('zvmApp.services')
    .factory('zExceptionParser', function () {
        var zExceptionParser = {};

        zExceptionParser.faultCodeIs = function (reason, faultCode) {
            return reason && reason.faultCode === faultCode;
        };

        zExceptionParser.exceptionIs = function (reason, exception) {
            return reason && angular.isString(reason.faultString) &&
                reason.faultString.indexOf(exception) !== -1;
        };

        return zExceptionParser;
    });
