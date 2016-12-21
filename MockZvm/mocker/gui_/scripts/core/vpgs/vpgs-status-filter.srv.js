'use strict';
angular.module('zvmApp.services')
    .factory('vpgsStatusFilterService', function (enums, zNotificationService, zNotificationConstant) {
            var vpgsStatusFilterService = {};
            var statusFilterNotifier = zNotificationService.getNotifier(zNotificationConstant.STATUS_FILTER_CHANGE);

            vpgsStatusFilterService.statusFilter = {
                showNormal: true,
                showWarning: true,
                showError: true,
                normalCount: null,
                warningCount: null,
                errorCount: null
            };

            vpgsStatusFilterService.statusFilterChanged = function () {
                statusFilterNotifier.notify({key: zNotificationConstant.STATUS_FILTER_CHANGE});
            };

            vpgsStatusFilterService.getVpgsFilteredByStatus = function (vpgs) {
                var result = [];
                var normalCount = 0, warningCount = 0, errorCount = 0;
                _.forEach(vpgs, function (vpg) {
                    switch (vpg.AlertStatus) {
                        case enums.ProtectionGroupAlertStatus.Warning :
                        {
                            warningCount++;
                            if (vpgsStatusFilterService.statusFilter.showWarning) {
                                result.push(vpg);
                            }
                            break;
                        }
                        case enums.ProtectionGroupAlertStatus.Error:
                        {
                            errorCount++;
                            if (vpgsStatusFilterService.statusFilter.showError) {
                                result.push(vpg);
                            }
                            break;
                        }
                        default :
                        {
                            normalCount++;
                            if (vpgsStatusFilterService.statusFilter.showNormal) {
                                result.push(vpg);
                            }
                            break;
                        }
                    }
                });
                vpgsStatusFilterService.statusFilter.normalCount = normalCount;
                vpgsStatusFilterService.statusFilter.warningCount = warningCount;
                vpgsStatusFilterService.statusFilter.errorCount = errorCount;
                return result;
            };

            return vpgsStatusFilterService;
        }
    );

