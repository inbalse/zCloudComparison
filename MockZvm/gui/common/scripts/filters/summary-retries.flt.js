'use strict';

angular.module('zvmApp.filters')
    .filter('summaryRetriesFilter', function ($translate) {
        return function (obj) {
            if (!obj) {
                return $translate.instant('NOT_DEFINED');
            }

            if (obj.ShouldRetryOnFailure) {
                var tempMinsApart = obj.RetryIntervalInMinutes === 1 ? $translate.instant('CREATE_VPG.MIN_APART') : $translate.instant('CREATE_VPG.MINS_APART');
                return $translate.instant('CREATE_VPG.AUTOMATIC') + ', ' + obj.RetryTimes + ' ' + $translate.instant('CREATE_VPG.TIMES') + ', ' + obj.RetryIntervalInMinutes + ' ' + tempMinsApart;

            }
            else {
                return $translate.instant('NOT_DEFINED');
            }
        };
    });