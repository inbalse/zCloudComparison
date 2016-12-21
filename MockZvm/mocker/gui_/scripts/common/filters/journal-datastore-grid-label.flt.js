'use strict';

angular.module('zvmApp.filters')
    .filter('journalDatastoreGridLabelFilter', function () {
        return function (row) {
            if (row) {
                return row.DisplayName;
            }
            return '';
        };
    })
    .filter('journalDatastoreGridLabelOrAutoFilter', function () {
        return function (row) {
            if (row) {
                return row.DisplayName;
            }
            return 'Auto';
        };
    });
