'use strict';

angular.module('zvmApp.services')
    .factory('vmsPerCheckpointsApiFactory', function () {
        var vmsPerCheckpointsApiFactory = {};
        vmsPerCheckpointsApiFactory.checkpointApi = function (href, rel, type, vmIdentifier, vmName) {

            this.Link = {
                href: href,
                rel: rel,
                type: type
            };
            this.VmIdentifier = vmIdentifier;
            this.VmName = vmName;
        };

        return {checkpointApi: vmsPerCheckpointsApiFactory.checkpointApi};
    })
    .service('vmsPerCheckpointsApiService', function (zertoApi) {
        var vmsPerCheckpointsApiService = this,
            urlTemplate = _.template('vpgs/<%=vpgIdentifier%>/CheckpointVms?checkpointIdentifier=<%=cpIdentifier%>');


        //build correct rest api url
        var createRestUrl = function (vpgIdentifier, cpIdentifier) {
            return urlTemplate({
                vpgIdentifier: vpgIdentifier,
                cpIdentifier: cpIdentifier
            });
        };

        vmsPerCheckpointsApiService.getVmsPerCheckpoint = function (vpgId, cpId) {
            return zertoApi.makeRequestWrapper('GET', createRestUrl(vpgId, cpId));
        };
    });
