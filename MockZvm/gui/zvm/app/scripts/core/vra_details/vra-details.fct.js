'use strict';

angular.module('zvmApp.core')

    .factory('vraDetailsFactory', function ($q, $state, vos, zertoServiceUpdaterFactory, enums) {
        var vraDetailsFactory = {};


        vraDetailsFactory.initDetailsFactory = function (InternalHostName, ServerIdentifier) {
            vraDetailsFactory.internalHostName = InternalHostName;
            vraDetailsFactory.serverGuid = ServerIdentifier;
        };

        var operationDetails = 'GetVraDetailsScreen';
        vraDetailsFactory.registerToDetails = function (scope) {
            var serverIdentifier = new vos.ServerIdentifier(vraDetailsFactory.serverGuid);
            var hostIdentifier = new vos.HostIdentifier(vraDetailsFactory.internalHostName, serverIdentifier);
            //auDetails = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetVraDetailsScreen, [hostIdentifier]);
            return zertoServiceUpdaterFactory.register(scope, operationDetails, [hostIdentifier], false, null, true);
        };

        vraDetailsFactory.unregisterDetails = function () {
            zertoServiceUpdaterFactory.unregisterAll(operationDetails);
        };

        var operationEvents = 'GetActivityScreenVisualObject';
        vraDetailsFactory.registerToEvents = function (scope, hostId, hostName) {

            var defaultFilter = new vos.ActivityScreenQueryCriterias();
            defaultFilter.EventGeneralTypes = new vos.EventGeneralTypesCriteria();
            defaultFilter.EventGeneralTypes.EventGeneralType = enums.SystemEventType_GeneralEventType.Events;
            defaultFilter.TimeRange = new vos.TimeCriteria();
            defaultFilter.TimeRange.From = moment().startOf('month').toDate();
            defaultFilter.TimeRange.To = moment().add(1, 'days').toDate();
            defaultFilter.MaxResult = 200;
            defaultFilter.RelatedEntities = [];
            var relatedEntity = new vos.CommandTaskRelatedEntityVisualObject();
            relatedEntity.HostId = new vos.HostIdentifier(hostName, new vos.ServerIdentifier(hostId));
            defaultFilter.RelatedEntities.push(relatedEntity);
            //auEvents = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetActivityScreenVisualObject, [defaultFilter]);

            return zertoServiceUpdaterFactory.register(scope, operationEvents, [defaultFilter], false);
        };

        vraDetailsFactory.unregisterEvents = function () {
            zertoServiceUpdaterFactory.unregisterAll(operationEvents);
        };

        return vraDetailsFactory;
    });
