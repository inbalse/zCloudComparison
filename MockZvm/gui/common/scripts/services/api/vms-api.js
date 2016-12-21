'use strict';

angular.module('zvmApp.services')
    .factory('vmsApiFactory', function () {
        var vmsApiFactory = {};
        vmsApiFactory.VmApi = function (ActualRPO, Entities, IOPS, LastTest, OrganizationName, Priority,
                                        ProvisionedStorageInMB, SourceSite, Status,
                                        SubStatus, TargetSite, ThroughputInMB, UsedStorageInMB,
                                        VmIdentifier, VmName, Volumes, VpgName, EnabledActions) {

            this.ActualRPO = ActualRPO;
            this.Entities = Entities;
            this.IOPS = IOPS;
            this.LastTest = LastTest;
            this.OrganizationName = OrganizationName;
            this.Priority = Priority;
            this.ProvisionedStorageInMB = ProvisionedStorageInMB;
            this.SourceSite = SourceSite;
            this.Status = Status;
            this.SubStatus = SubStatus;
            this.TargetSite = TargetSite;
            this.ThroughputInMB = ThroughputInMB;
            this.UsedStorageInMB = UsedStorageInMB;
            this.VmIdentifier = VmIdentifier;
            this.VmName = VmName;
            this.Volumes = Volumes;
            this.VpgName = VpgName;
            this.EnabledActions = EnabledActions;
        };

        vmsApiFactory.VmVolumeApi = function (VmVolumeIdentifier) {
            this.VmVolumeIdentifier = VmVolumeIdentifier;
        };

        return {VmApi: vmsApiFactory.VmApi, VmVolumeApi: vmsApiFactory.VmVolumeApi};
    })
    .service('vmsApiService', function ($q, vmsApiFactory, zertoApi) {
        var vmsApiService = this;

        vmsApiService.getVms = function () {
            return zertoApi.makeRequestWrapper('GET', 'vms');
        };

        vmsApiService.getVm = function (VmIdentifier, vpgIdentifier) {
            var _urlTemplate = _.template('vms/<%=VmIdentifier%>?VpgIdentifier=<%=VpgIdentifier%>');
            return zertoApi.makeRequestWrapper('GET', _urlTemplate({
                VpgIdentifier: vpgIdentifier,
                VmIdentifier: VmIdentifier
            }));
        };
    });
