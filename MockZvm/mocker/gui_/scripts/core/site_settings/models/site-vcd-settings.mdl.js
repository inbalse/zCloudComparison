'use strict';

angular.module('zvmApp.core')
    .factory('siteVcdSettingsModel', function (zertoServiceFactory) {
        var siteVcdSettingsModel = {};
        siteVcdSettingsModel.isValid = true;
        siteVcdSettingsModel.data = {Enabled: false};

        siteVcdSettingsModel.save = function () {
            return zertoServiceFactory.SetVCDProxyConfiguration(siteVcdSettingsModel.data);
        };

        siteVcdSettingsModel.load = function () {
            return zertoServiceFactory.GetVcloudDirectorConnectionSettings().then(siteVcdSettingsModel.set);
        };

        siteVcdSettingsModel.set = function (result) {
            siteVcdSettingsModel.data = result;
        };


        return siteVcdSettingsModel;
    });
