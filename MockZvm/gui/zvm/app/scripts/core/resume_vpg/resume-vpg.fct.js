'use strict';

angular.module('zvmApp.core')
    .factory('resumeVpgFactory', function (zAlertFactory, zertoServiceFactory, $translate) {
        var resumeVpgFactory = {};

        resumeVpgFactory.resume = function resume(vpgIds) {
            var title = $translate.instant('VPG_LIST.MORE_BUTTON.RESUME');
            var warning = $translate.instant('VPG_LIST.MORE_BUTTON.RESUME_WARNING');

            zAlertFactory.warn(title, warning, function (event) {
                if (event.target.name === zAlertFactory.buttons.OK) {
                    zertoServiceFactory.ResumeProtectionGroups(vpgIds);
                }
            });
        };

        return resumeVpgFactory;
    });
