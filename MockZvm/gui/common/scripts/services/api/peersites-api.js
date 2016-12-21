'use strict';

angular.module('zvmApp.services')
    .factory('peerSitesApiFactory', function () {

        var peerSitesFactory = {};
        peerSitesFactory.peerSiteApi = function (HostName, IncomingThroughputInMb, Location, Name,
                                                 OutgoingBandWidth, PairingStatus, Port, ProvisionedStorage,
                                                 SiteIdentifier, UsedStorage, Version) {
            this.HostName = HostName;
            this.IncomingThroughputInMb = IncomingThroughputInMb;
            this.Location = Location;
            this.Name = Name;
            this.OutgoingBandWidth = OutgoingBandWidth;
            this.PairingStatus = PairingStatus;
            this.Port = Port;
            this.ProvisionedStorage = ProvisionedStorage;
            this.SiteIdentifier = SiteIdentifier;
            this.UsedStorage = UsedStorage;
            this.Version = Version;
        };
        return {peerSiteApi: peerSitesFactory.peerSiteApi};
    })
    .service('peerSitesApiService', function (zertoApi) {

        var peerSitesService = this;

        peerSitesService.endpoint = 'peersites';
        peerSitesService.getSite = function (siteId) {
            var _url = _.template(peerSitesService.endpoint + '/<%=siteId%>');
            return zertoApi.makeRequestWrapper('GET', _url({siteId: siteId}));
        };

        peerSitesService.getSites = function () {
            return zertoApi.makeRequestWrapper('GET', peerSitesService.endpoint);
        };

        peerSitesService.getSitesWithInterval = function (scope) {
            return zertoApi.makeRequestInterval(scope, 'GET', peerSitesService.endpoint);
        };

        peerSitesService.filterSites = function (id, filter) {
            var _url = _.template(peerSitesService.endpoint + '?<%=params%>');
            return zertoApi.makeRequestWrapper('GET', _url({params: $.param(filter)}));
        };
    });
