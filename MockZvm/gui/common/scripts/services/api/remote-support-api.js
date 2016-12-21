'use strict';
angular.module('zvmApp.services')
    .factory('remoteSupportApiFactory', function () {
        var remoteSupportApiFactory = {};
        remoteSupportApiFactory.RemoteSupportApi = function (EnabledForPeriod, EnabledForCase, Disabled) {
            this.EnabledForPeriod = EnabledForPeriod;
            this.EnabledForCase = EnabledForCase;
            this.Disabled = Disabled;
        };

        return {RemoteSupportApi: remoteSupportApiFactory.RemoteSupportApi};
    })
    .service('remoteSupportApiService', function (zertoApi) {
        var remoteSupportApiService = this,
            url = 'localsite/settings/logs';

        remoteSupportApiService.getRemoteSupportSettings = function () {
            return zertoApi.makeRequestWrapper('GET', url);
        };

        remoteSupportApiService.setRemoteSupportSettings = function (settings) {
            return zertoApi.makeRequestWrapper('PUT', url, settings);
        };

    });