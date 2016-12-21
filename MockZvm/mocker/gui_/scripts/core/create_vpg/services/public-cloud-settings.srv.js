'use strict';

angular.module('zvmApp.core')
    .service('publicCloudSettingsService', function (createVPGModel) {
        var publicCloudSettingsService = this;
        publicCloudSettingsService.hasRecoveryCloudSettings = function () {
            var settings = _.get(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings', null);
            return !_.isNullOrUndefined(settings);
        };

        publicCloudSettingsService.getPublicCloudFailoverSettings = function () {
            return _.get(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings', null);
        };

        publicCloudSettingsService.setPublicCloudFailoverSettings = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings = value;
        };

        publicCloudSettingsService.setPublicCloudFailoverPcn = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.Pcn = value;
        };

        publicCloudSettingsService.getPublicCloudFailoverPcn = function () {
            return _.get(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.Pcn', null);
        };

        publicCloudSettingsService.setFailoverPublicCloudInstanceTypeVisualObject = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.PublicCloudInstanceTypeVisualObject = value;
        };

        publicCloudSettingsService.getFailoverPublicCloudInstanceTypeVisualObject = function () {
            return _.get(
                createVPGModel,
                'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.PublicCloudInstanceTypeVisualObject',
                null);
        };

        publicCloudSettingsService.setPublicCloudFailoverSecurityGroups = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.SecurityGroups = value;
        };

        publicCloudSettingsService.getPublicCloudFailoverSecurityGroups = function () {
            return _.get(
                createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.SecurityGroups, null);
        };

        publicCloudSettingsService.setPublicCloudFailoverSubnet = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.Subnet = value;
        };

        publicCloudSettingsService.getPublicCloudFailoverSubnet = function () {
            return _.get(
                createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.Subnet', null);

        };

        publicCloudSettingsService.getPublicCloudFailoverTestSettings = function () {
            return _.get(createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings', null);
        };

        publicCloudSettingsService.setPublicCloudFailoverTestSettings = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings = value;
        };

        publicCloudSettingsService.setPublicCloudFailoverTestPcn = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.Pcn = value;
        };

        publicCloudSettingsService.getPublicCloudFailoverTestPcn = function () {
            return _.get(
                createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.Pcn', null);

        };

        publicCloudSettingsService.setFailoverTestPublicCloudInstanceTypeVisualObject = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.PublicCloudInstanceTypeVisualObject = value;
        };

        publicCloudSettingsService.getFailoverTestPublicCloudInstanceTypeVisualObject = function () {
            return _.get(
                createVPGModel,
                'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.PublicCloudInstanceTypeVisualObject',
                null);
        };

        publicCloudSettingsService.setPublicCloudFailoverTestSecurityGroups = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.SecurityGroups = value;
        };

        publicCloudSettingsService.getPublicCloudFailoverTestSecurityGroups = function () {
            return _.get(
                createVPGModel, 'data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.SecurityGroups',
                null);

        };

        publicCloudSettingsService.setPublicCloudFailoverTestSubnet = function (value) {
            createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.Subnet = value;
        };

        publicCloudSettingsService.getPublicCloudFailoverTestSubnet = function () {
            return _.get(
                createVPGModel.data.defaultVpgSettings.Config.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.Subnet, null);

        };

        publicCloudSettingsService.savePublicCloudVMs = function (result) {
            createVPGModel.savePublicCloudVMs(result);
        };
    });
