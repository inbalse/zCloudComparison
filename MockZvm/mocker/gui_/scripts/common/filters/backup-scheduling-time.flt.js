'use strict';

angular.module('zvmApp.filters')
    .filter('backupSchedulingFilter', function (enums, $filter, $translate) {
        var toUTCDate = function (date) {
            var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            return _utc;
        };
        var millisToUTCDate = function (millis) {
            return toUTCDate(new Date(millis));
        };
        return function (value, type) {
            var num = value.BackupSchedulingTime.RunningTimeOfDayInMinutes * 1000 * 60;
            if (type === enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended) {
                var time = $filter('date')(millisToUTCDate(num), 'HH:mm');

                if (value.BackupSchedulingTime.SchedulePeriodType === enums.SchedulePeriodType.Daily) {
                    return time + ' (' + $translate.instant('SCHEDULE_PERIOD_TYPES.DAILY') + ')';
                } else {
                    switch (value.BackupSchedulingTime.DayOfWeek) {
                        case enums.DayOfWeek.Sunday:
                            return time + ', ' + $translate.instant('DAYS.SUNDAY');
                        case enums.DayOfWeek.Monday:
                            return  time + ', ' + $translate.instant('DAYS.MONDAY');
                        case enums.DayOfWeek.Tuesday:
                            return  time + ', ' + $translate.instant('DAYS.TUESDAY');
                        case enums.DayOfWeek.Wednesday:
                            return  time + ', ' + $translate.instant('DAYS.WEDNESDAY');
                        case enums.DayOfWeek.Thursday:
                            return  time + ', ' + $translate.instant('DAYS.THURSDAY');
                        case enums.DayOfWeek.Friday:
                            return  time + ', ' + $translate.instant('DAYS.FRIDAY');
                        case enums.DayOfWeek.Saturday:
                            return  time + ', ' + $translate.instant('DAYS.SATURDAY');

                        default:
                            return '';
                    }
                }

            } else {
                return '';
            }
        };
    });