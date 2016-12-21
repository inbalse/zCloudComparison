'use strict';

angular.module('zvmApp.services')
    .factory('vpgApiFactory', function () {
        var vpgApiFactory = {};
        vpgApiFactory.vpgApi = function (ActualRPO, Entities, IOPS, LastTest, Name, OrganizationName,
                                         Priority, ProgressPercentage, ProvisionedStorageInMB, SourceSite,
                                         State, TargetSite, ThroughputInMB, UsedStorageInMB, VmsCount, VpgIdentifier) {
            this.ActualRPO = ActualRPO;
            this.Entities = Entities;
            this.IOPS = IOPS;
            this.LastTest = LastTest;
            this.Name = Name;
            this.OrganizationName = OrganizationName;
            this.Priority = Priority;
            this.ProgressPercentage = ProgressPercentage;
            this.ProvisionedStorageInMB = ProvisionedStorageInMB;
            this.SourceSite = SourceSite;
            this.State = State;
            this.TargetSite = TargetSite;
            this.ThroughputInMB = ThroughputInMB;
            this.UsedStorageInMB = UsedStorageInMB;
            this.VmsCount = VmsCount;
            this.VpgIdentifier = VpgIdentifier;
        };

        vpgApiFactory.vpgCheckpointApi = function (CheckpointIdentifier, Tag, TimeStamp, Vss) {
            this.CheckpointIdentifier = CheckpointIdentifier;
            this.Tag = Tag;
            this.TimeStamp = TimeStamp;
            this.Vss = Vss;
        };

        vpgApiFactory.vpgDateCheckpointsInfoApi = function (Count, Date) {
            this.Count = Count;
            this.Date = Date;
        };

        vpgApiFactory.vpgCheckpointsSummaryApi = function (VpgDateCheckpointsInfo) {
            this.VpgDateCheckpointsInfo = VpgDateCheckpointsInfo;
        };

        return {
            vpgApi: vpgApiFactory.vpgApi,
            vpgCheckpointApi: vpgApiFactory.vpgCheckpointApi,
            vpgDateCheckpointsInfoApi: vpgApiFactory.vpgDateCheckpointsInfoApi,
            vpgCheckpointsSummaryApi: vpgApiFactory.vpgCheckpointsSummaryApi
        };
    })
    .service('vpgApi', function (zertoApi) {
        var vpgApi = this;

        vpgApi.getVpgCheckpoints = function (VpgId) {
            var _url = _.template('vpgs/<%=VpgId%>/checkpoints');
            return zertoApi.makeRequestWrapper('GET', _url({VpgId: VpgId}));
        };

        // vpgApi.getVpgCheckpointsSummary = function (VpgId, timezoneOffset) {
        //     var _url = _.template('vpgs/<%=VpgId%>/checkpoints/summary?clientGmtOffsetInMinutes=<%=clientGmtOffsetInMinutes%>');
        //     return zertoApi.makeRequestWrapper('GET', _url({VpgId: VpgId, clientGmtOffsetInMinutes: timezoneOffset}));
        // };

        vpgApi.GetVPGCheckpointsStats = function (vpgId) {
            var _url = _.template('vpgs/<%=VpgId%>/checkpoints/stats');
            return zertoApi.makeRequestWrapper('GET', _url({VpgId: vpgId}));
        };

        vpgApi.getVpgCheckpoint = function (VpgId, CheckpointId) {
            var _url = _.template('vpgs/<%=VpgId%>/checkpoints/<%=CheckpointId%>');
            return zertoApi.makeRequestWrapper('GET', _url({VpgId: VpgId, CheckpointId: CheckpointId}));
        };

        vpgApi.filterVpgCheckpoints = function (VpgId, filter) {
            var _url = _.template('vpgs/<%=VpgId%>/checkpoints?<%=params%>');
            return zertoApi.makeRequestWrapper('GET', _url({VpgId: VpgId, params: $.param(filter)}));
        };

        vpgApi.getVpgs = function getVpgs() {
            return zertoApi.makeRequestWrapper('GET', 'vpgs');
        };

        vpgApi.filterVpgs = function filterVpgs(filter) {
            var _url = _.template('vpgs?<%=params%>');
            return zertoApi.makeRequestWrapper('GET', _url({params: $.param(filter)}));
        };
    });
