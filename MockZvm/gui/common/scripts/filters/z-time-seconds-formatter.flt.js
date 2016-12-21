'use strict';

angular.module('zvmApp.filters')
    .filter('zTimeSecondsFormatter', function () {
        var hr, min, sec, suffix;

        var TIME = {
            ZERO: '00',
            SEC: ' sec',
            MIN: ' min',
            HR: ' hours',
            SEPARATOR: ':'
        };

        var pad = function (n, width) {
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        };

        var separator = function (time, isFullFormat) {
            return isFullFormat ? time + TIME.SEPARATOR : (time !== TIME.ZERO ? time + TIME.SEPARATOR : '');
        };

        return function (seconds, format, isFullFormat, isSuffix) {

            hr = pad(Math.floor(seconds / 3600), 2);
            min = pad(Math.floor(seconds / 60) % 60, 2);
            sec = pad(Math.floor(seconds) % 60, 2);

            if (angular.isDefined(isSuffix) && isSuffix === true) {
                suffix = TIME.SEC;
                if (hr !== TIME.ZERO) {
                    suffix = TIME.HR;
                } else if (min !== TIME.ZERO) {
                    suffix = TIME.MIN;
                }
            } else {
                suffix = '';
            }

            switch (format) {
                case 'HH': {
                    return hr + suffix;
                }
                case 'HH:MM': {
                    return separator(hr, isFullFormat) + min + suffix;
                }
                case 'HH:MM:SS': {
                    return separator(hr, isFullFormat) + separator(min, isFullFormat) + sec + suffix;
                }
            }
        };
    });

