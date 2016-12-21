'use strict';

angular.module('zvmApp.core')

    .factory('vpgDetailsFactory', function ($q, vos, zertoServiceUpdaterFactory) {
        var vpgDetailsFactory = {};

        var vpgOperation = 'GetProtectionGroupDetailsScreen';
        var eventsOperation = 'GetVpgRecentActivity';

        vpgDetailsFactory.initDetailsFactory = function (vpgId) {
            vpgDetailsFactory.protectionGroupIdentifier = vpgId;
        };

        vpgDetailsFactory.registerToDetails = function (scope) {
            var protectionGroupIdentifier = new vos.ProtectionGroupIdentifier(vpgDetailsFactory.protectionGroupIdentifier);
            return zertoServiceUpdaterFactory.register(scope, vpgOperation, [protectionGroupIdentifier], false, null, true);
        };

        vpgDetailsFactory.unregisterDetails = function () {
            zertoServiceUpdaterFactory.unregisterAll(vpgOperation);
        };

        vpgDetailsFactory.registerToEvents = function (scope) {
            var deferred = $q.defer(),
                protectionGroupIdentifier,
                mapResult;

            protectionGroupIdentifier = new vos.ProtectionGroupIdentifier(vpgDetailsFactory.protectionGroupIdentifier);
            zertoServiceUpdaterFactory.register(scope, eventsOperation, [protectionGroupIdentifier], false).then(null, null, function (result) {
                mapResult = _mapEventsFromHtml(result);
                deferred.resolve(mapResult);
            });

            return deferred.promise;
        };

        vpgDetailsFactory.unregisterVPGEvents = function () {
            zertoServiceUpdaterFactory.unregisterAll(eventsOperation);
        };

        var _mapEventsFromHtml = function (result) {
            _.each(result.Events, function (event) {
                if (_.isHtml(event.Description)) {
                    event.Description = _.wrapContentWithHtmlTag(event.Description , 'span');
                }
            });

            return result;
        };

        return vpgDetailsFactory;
    });
