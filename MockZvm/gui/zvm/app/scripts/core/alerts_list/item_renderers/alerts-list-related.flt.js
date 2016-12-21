'use strict';

angular.module('zvmApp.filters')
    .filter('alertsListRelated', function () {

        return function (data) {

            var links = '';
            _.forEach(data.Entities, function (item) {
               links = links + '<a href="#" >' + item.Name + '</a>, ';
            });
            if (links.length > 1) {
                links = links.substr(0, links.length - 2);
            }
            return links;
        };
    });