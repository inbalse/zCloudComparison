'use strict';

angular.module('zvmApp.core')
    .factory('siteSettingsModel', function ($q, zertoServiceFactory) {
        var siteSettingsModel = {};

        siteSettingsModel.settings = {};
        siteSettingsModel.isValid = true;

        siteSettingsModel.load = function () {
            return zertoServiceFactory.GetAdvancedSiteSettings().then(siteSettingsModel.set);
        };

        siteSettingsModel.set = function (result) {
            siteSettingsModel.settings = result;
        };

        siteSettingsModel.save = function () {
            return zertoServiceFactory.SetAdvancedSiteSettings(siteSettingsModel.settings);
        };

        siteSettingsModel.testEmail = function () {
            return zertoServiceFactory.TestEmailSettings(siteSettingsModel.settings.EmailConfiguration);
        };

        return siteSettingsModel;
    });
