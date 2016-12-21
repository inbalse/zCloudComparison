'use strict';
angular.module('zvmApp.filters')
    .filter('linksFormatter', function () {
        return function (row, cell, value) {
            var links = '',
                data = _.isNullOrUndefined(value.value) ? value : value.value;
            _.forEach(data, function (item) {
                links = links + ' <a title="' + item.Name + '" href="#/main/vpg_details?id=' + item.Identifier.GroupGuid + '">' + item.Name + '</a>';
            });
            return links;
        };
    }).filter('linksFormatterExtended', function () {
    return function (arrayName) {
        return function (row, cell, value) {
            var links = '';

            _.forEach(value[arrayName], function (item) {
                links = links + ' <a title="' + item.Name + '" href="#/main/vpg_details?id=' + item.Identifier.GroupGuid + '">' + item.Name + '</a>';
            });
            return links;
        };
    };
});
