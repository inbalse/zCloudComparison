'use strict';
angular.module('zvmApp.filters')
    .constant('vpgCardDisplayRpoConstants', {
        NA: 'NA',
        MIN_RPO: 0,
        MAX_RPO: 3955710,
        SEC_IN_HOUR: 3600,
        SEC_IN_MINUTE: 60,
        SEC_IN_DAY: 86400,
        S: 's',
        M: 'm',
        H: 'h',
        D: 'd'
    })
    .filter('vpgCardDisplayRpo', function ($translate, vpgCardDisplayRpoConstants) {

        return function (rpo) {
            if (rpo <= vpgCardDisplayRpoConstants.MIN_RPO || rpo >= vpgCardDisplayRpoConstants.MAX_RPO) {
                return result(vpgCardDisplayRpoConstants.NA);
            }

            var d, h, m, s, display, units;
            if (rpo < vpgCardDisplayRpoConstants.SEC_IN_MINUTE) {
                s  = rpo;
                units = calcUnits(rpo, vpgCardDisplayRpoConstants.S);
                return result(s.toString(), s, null, units);

            } else if (rpo < vpgCardDisplayRpoConstants.SEC_IN_HOUR) {
                m = calcMinutes(rpo);
                s = calcSeconds(rpo);
                display = concat(m, s);
                units = calcUnits(m, vpgCardDisplayRpoConstants.M);
                return result(display, m, s, units);

            } else if (rpo < vpgCardDisplayRpoConstants.SEC_IN_DAY) {
                m = calcMinutes(rpo);
                h = calcHours(rpo);
                display = concat(h, m);
                units = calcUnits(h, vpgCardDisplayRpoConstants.H);
                return result(display, h, m, units);

            } else {
                h = calcHours(rpo);
                d = calcDays(rpo);
                display = concat(d, h);
                units = calcUnits(d, vpgCardDisplayRpoConstants.D);
                return result(display, d, h, units);
            }


        };

        function concat(main, secondary) {
            main = main.toString();

            if (secondary === 0) {
                return padding(main);
            }

            secondary = secondary.toString();

            return padding(main) + ':' + padding(secondary);
        }

        function calcDays(seconds) {
            return Math.floor(seconds / vpgCardDisplayRpoConstants.SEC_IN_DAY);
        }

        function calcHours(seconds) {
            return Math.floor((seconds % vpgCardDisplayRpoConstants.SEC_IN_DAY) / vpgCardDisplayRpoConstants.SEC_IN_HOUR);
        }

        function calcMinutes(seconds) {
            return Math.floor(((seconds % vpgCardDisplayRpoConstants.SEC_IN_DAY) %
                vpgCardDisplayRpoConstants.SEC_IN_HOUR) /
                vpgCardDisplayRpoConstants.SEC_IN_MINUTE);
        }

        function calcSeconds(seconds) {
            return ((seconds % vpgCardDisplayRpoConstants.SEC_IN_DAY) %
                vpgCardDisplayRpoConstants.SEC_IN_HOUR) %
                vpgCardDisplayRpoConstants.SEC_IN_MINUTE;
        }

        function calcUnits(time, type) {
            switch (type) {
                case vpgCardDisplayRpoConstants.S:
                    return $translate.instant('TIME_UNITS.SEC');
                case vpgCardDisplayRpoConstants.M:
                    return $translate.instant('TIME_UNITS.MIN');
                case vpgCardDisplayRpoConstants.H:
                    return time === 1 ? $translate.instant('TIME_UNITS.HOUR') : $translate.instant('TIME_UNITS.HOURS');
                case vpgCardDisplayRpoConstants.D:
                    return time === 1 ? $translate.instant('TIME_UNITS.DAY') : $translate.instant('TIME_UNITS.DAYS');
            }
        }

        function padding(digit) {
            return digit.length > 1 ? digit : '0' + digit;
        }
        function result(display, main, secondary, units) {
            return {
                display: display,
                units: units,
                mainNumber: main,
                secondaryNumber: secondary
            };
        }
    });
