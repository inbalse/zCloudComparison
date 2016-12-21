'use strict';

angular.module('zvmApp.filters')
    .filter('progressFormatter', function () {
        return function (row, cell, value) {
            if (value && (!_.isEmpty(value.value) || !_.isEmpty(value.display))) {
                var tempString;
                if (value.showProgress) {
                    tempString = '<span class="progress-span">' + value.display + ' (' + value.value + '%)</span>';
                } else {
                    tempString = '<span class="progress-span">' + value.display + '</span>';
                }

                if (value.showProgress) {
                    tempString += '<div class="progress slimNoValueProgressBar">' +
                        '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="' + value.value + '" aria-valuemin="0" aria-valuemax="100" style="width:' + value.value + '%"></div>' +
                        '</div>';
                }
                return tempString;

            } else {
                return '';
            }
        };
    });
