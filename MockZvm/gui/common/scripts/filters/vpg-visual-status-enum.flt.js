'use strict';

angular.module('zvmApp.filters')
    .filter('vpgVisualStatusEmun', function (enums, $translate) {
        return function (enumValue) {

            switch (enumValue) {
                case enums.VpgVisualStatus.Initializing:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.INITIALIZING');
                case enums.VpgVisualStatus.MeetingSLA:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.MEETING_SLA');
                case enums.VpgVisualStatus.NotMeetingSLA:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.NOT_MEETING_SLA');
                case enums.VpgVisualStatus.FailingOver:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.FAILING_OVER');
                case enums.VpgVisualStatus.Moving:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.MOVING');
                case enums.VpgVisualStatus.Deleting:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.DELETING');
                case enums.VpgVisualStatus.HistoryNotMeetingSLA:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.HISTORY_NOT_MEETING_SLA');
                case enums.VpgVisualStatus.RpoNotMeetingSLA:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.RPO_NOT_MEETING_SLA');
                case enums.VpgVisualStatus.Recovered:
                    return $translate.instant('ENUM.VPG_VISUAL_STATUS.RECOVERED');

                default:
                    return enumValue;
            }
        };
    });
