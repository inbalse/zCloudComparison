'use strict';

angular.module('zvmApp.models')
    .factory('dashboardModel', function (vos, enums, zertoServiceUpdaterFactory) {
        var dashboardModel = {};

        dashboardModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetSummaryScreenInformation', []);
        };

        dashboardModel.unregister = function (scope) {
            return zertoServiceUpdaterFactory.unregister(scope, 'GetSummaryScreenInformation', []);
        };

        var defaultFilter = new vos.ActivityScreenQueryCriterias();
        defaultFilter.EventGeneralTypes = new vos.EventGeneralTypesCriteria();
        defaultFilter.EventGeneralTypes.EventGeneralType = enums.SystemEventType_GeneralEventType.Events;
        defaultFilter.TimeRange = new vos.TimeCriteria();
        defaultFilter.TimeRange.From = moment().startOf('month').toDate();
        defaultFilter.TimeRange.To = moment().add(1, 'days').toDate();
        defaultFilter.MaxResult = 25;

        dashboardModel.registerToEvents = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetActivityScreenVisualObject', [defaultFilter]);
        };

        dashboardModel.unregisterEvents = function (scope) {
            return zertoServiceUpdaterFactory.unregister(scope, 'GetActivityScreenVisualObject', [defaultFilter]);
        };

        dashboardModel.registerVPGS = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetMinimalVpgList', [defaultFilter]);
        };

        dashboardModel.unregisterVPGS = function (scope) {
            return zertoServiceUpdaterFactory.unregister(scope, 'GetMinimalVpgList', [defaultFilter]);
        };

        return dashboardModel;
    });
