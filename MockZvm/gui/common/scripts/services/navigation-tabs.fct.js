'use strict';

angular.module('zvmApp.services')
    .factory('navigationTabsFactory', function () {
        var navigationTabsFactory = {};

        navigationTabsFactory.dynamicTabs = [];
        navigationTabsFactory.ellipsisCollection = [];

        navigationTabsFactory.addTab = function (value) {
            if(!navigationTabsFactory.isTabInDropDownList(value)) {
                if (!navigationTabsFactory.getTab(value.id, value.name)) {
                    value.dynamic = true;
                    value.active = true;
                    navigationTabsFactory.dynamicTabs.push(value);
                    navigationTabsFactory.dynamicTabsAdded();
                }
           }else{
                navigationTabsFactory.openTabExistingInEllipsis();
            }
        };

        navigationTabsFactory.changeTabName = function(value){
            navigationTabsFactory.getTab(value.id, value.name).title = value.title;
        };
        navigationTabsFactory.removeTab = function (id, name) {
            if (name) {
                _.remove(navigationTabsFactory.dynamicTabs, function (item) {
                    return item.id === id && item.name === name;
                });
            } else {
                _.remove(navigationTabsFactory.dynamicTabs, function (item) {
                    return item.id === id;
                });
            }
        };

        navigationTabsFactory.selectTab = function (id, name) {
            var found = navigationTabsFactory.getTab(id, name);

            if (found) {
                found.active = true;
            }
        };

        navigationTabsFactory.getTab = function (id, name) {
            if (name) {
                return _.find(navigationTabsFactory.dynamicTabs, function (item) {
                    return item.id === id && item.name === name;
                });
            } else {
                return _.find(navigationTabsFactory.dynamicTabs, function (item) {
                    return item.id === id;
                });
            }

        };

        navigationTabsFactory.isTabInDropDownList = function(value){
            return _.findIndex(navigationTabsFactory.ellipsisCollection, {title:value.title}) !== -1;
        };

        return navigationTabsFactory;
    });
