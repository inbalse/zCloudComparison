'use strict';

angular.module('zvmApp.filters')
    .filter('publicCloudSecurityGroupsFormatter', function () {
        return function (row, cell, value) {
            return _.isEmpty(value) ? 'None' : _.pluck(value, 'Name').join(', ');
        };
    });
