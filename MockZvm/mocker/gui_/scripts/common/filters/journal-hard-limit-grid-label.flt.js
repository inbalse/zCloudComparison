'use strict';

angular.module('zvmApp.filters')
    .filter('journalHardLimitGridLabelFilter', function (enums) {
        return function (row) {
            if (row) {
                var data = row;

                if (parseInt(data.Type) === parseInt(enums.JournalLimitType.Megabytes)) {
                    return data.Limit / 1024 + 'GB';
                } else if (parseInt(data.Type) === parseInt(enums.JournalLimitType.Percentage)) {
                    return data.Limit + '%';
                }
            }
            return 'Unlimited';
        };
    });
