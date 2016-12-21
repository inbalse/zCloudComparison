'use strict';

angular.module('zvmApp.filters')
    .filter('requiredFieldValidator', function () {
        return function (value) {
            if (value === null || value === undefined || !value.length) {
                return {valid: false, msg: 'This is a required field'};
            } else {
                return {valid: true, msg: null};
            }
        };
    });
