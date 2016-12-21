'use strict';

angular.module('zvmApp.filters')
    .filter('testPeriodFilter', function ($translate) {
        return function (input) {
            if (!input) {
                return $translate.instant('NONE');
            }

            var res = $translate.instant('NONE');

            switch (input) {
                case 0:
                    res = $translate.instant('NONE');
                    break;
                case 43200:
                    res = '1 ' + $translate.instant('METRICS.MONTH');
                    break;
                case 131040:
                    res = '3 ' + $translate.instant('METRICS.MONTHS');
                    break;
                case 262080:
                    res = '6 ' + $translate.instant('METRICS.MONTHS');
                    break;
                case 394560:
                    res = '9 ' + $translate.instant('METRICS.MONTHS');
                    break;
                case 525600:
                    res = '12 ' + $translate.instant('METRICS.MONTHS');
                    break;
            }

            return res;

        };
    });