'use strict';

angular.module('zvmApp.filters')
    .filter('datastoreNestedFormatter', function ($translate) {
        return function (row, cell, value) {
            if (!value) {
                return '';
            }
            return (value.Datastore && value.Datastore && value.Datastore.Datastore.DisplayName) ?
                value.Datastore.Datastore.DisplayName : $translate.instant('RESTORE_WIZARD.FILTERS.DEFAULT');
        };
    });
