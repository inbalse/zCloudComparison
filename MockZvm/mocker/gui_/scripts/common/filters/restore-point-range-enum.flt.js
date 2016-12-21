'use strict';

angular.module('zvmApp.filters')
    .filter('restorePointRangeEnum', function (enums, $translate) {
        return function (enumValue, type) {

            if (type === enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended) {
                switch (enumValue) {
                    case enums.RestorePointRangeType.NineMonths:
                        return $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.NINE_MONTHS');
                    case enums.RestorePointRangeType.OneMonth:
                        return $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.ONE_MOTH');
                    case enums.RestorePointRangeType.OneWeek:
                        return $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.ONE_WEEK');
                    case enums.RestorePointRangeType.OneYear:
                        return $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.ONE_YEAR');
                    case enums.RestorePointRangeType.SixMonths:
                        return $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.SIX_MONTHS');
                    case enums.RestorePointRangeType.ThreeMonths:
                        return $translate.instant('ENUM.RESTORE_POINT_RANG_TYPE.THREE_MONTHS');

                    default:
                        return enumValue;
                }
            } else {
                return '';
            }
        };
    });