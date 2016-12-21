'use strict';

angular.module('zvmApp.services')
    .factory('checkActiveState', function ($state) {
        var service = {};

        service.byPartialName = function (tabs) {
            _.each(tabs, function (tab) {
                var tempRoute = tab.route.split('(')[0];
                if (tab.id && tab.name) {
                    tab.active = $state.includes(tempRoute, {id: tab.id, name: tab.name});
                } else if (tab.id && !tab.name) {
                    tab.active = $state.includes(tempRoute, {id: tab.id});
                } else {
                    tab.active = $state.includes(tab.route);
                }
            });
        };

        service.byFullName = function (tabs) {
            _.each(tabs, function (tab) {
                tab.active = $state.is(tab.route, $state.params);
            });
        };

        return service;
    });