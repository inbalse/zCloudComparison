'use strict';

angular.module('zvmApp.core')
    .factory('siteSettingsPublicCloudModel', function ($q, zertoServiceFactory, publicCloudHelper) {
        var siteSettingsPublicCloudModel = {};

        siteSettingsPublicCloudModel.isValid = true;

        siteSettingsPublicCloudModel.load = function () {
            return zertoServiceFactory.GetPublicCloudInstanceTypes().then(siteSettingsPublicCloudModel.set);
        };

        siteSettingsPublicCloudModel.set = function (result) {
            siteSettingsPublicCloudModel.instanceFamilyPotentials = publicCloudHelper.createFamilyInstanceList(result);
        };

        return siteSettingsPublicCloudModel;
    });
