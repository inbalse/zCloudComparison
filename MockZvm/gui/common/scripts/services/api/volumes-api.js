'use strict';

angular.module('zvmApp.services')
    .factory('volumesApiFactory', function () {

        var volumesApiFactory = {};

        volumesApiFactory.VolumeInfo = function (Name, VolumeIdentifier) {
            this.Name = Name;
            this.VolumeIdentifier = VolumeIdentifier;
        };
        return {VolumeInfo: volumesApiFactory.VolumeInfo};
    })
    .service('volumesApiService', function ($q, volumesApiFactory, zertoApi) {
        var volumesApiService = this;

        volumesApiService.getVmVolumes = function (vmIdentifier) {
            var _urlTemplate = _.template('Volumes?VmIdentifier=<%VmIdentifier%>');
            return zertoApi.makeRequestWrapper('GET', _urlTemplate({VmIdentifier: vmIdentifier}));
        };

    });
