'use strict';

angular.module('zvmApp.services')
    .service('saveNicsService', function (vos) {
        var saveNicService = this;


        saveNicService.save = function (nic, settings, applyIpSettings) {

            var FOLVCenterNetworkSettings = nic.FailoverSettings.VCenterNetworkSettings,
                FOTVCenterNetworkSettings = nic.TestSettings.VCenterNetworkSettings,
                FOLSettingsVCenterNetworkSettings = settings.FailoverSettings.VCenterNetworkSettings,
                FOTSettingsVCenterNetworkSettings = settings.TestSettings.VCenterNetworkSettings;

            setRecoveryNetwork(FOLVCenterNetworkSettings, FOLSettingsVCenterNetworkSettings.RecoveryNetwork);
            setRecoveryNetwork(FOTVCenterNetworkSettings, FOTSettingsVCenterNetworkSettings.RecoveryNetwork);

            setShouldReplaceMacAddress(FOLVCenterNetworkSettings, FOLSettingsVCenterNetworkSettings.ShouldReplaceMacAddress);
            setShouldReplaceMacAddress(FOTVCenterNetworkSettings, FOTSettingsVCenterNetworkSettings.ShouldReplaceMacAddress);

            if (!applyIpSettings) {
                return;
            }
            setDNSSuffix(FOLVCenterNetworkSettings, FOLSettingsVCenterNetworkSettings.DnsSuffix);
            setDNSSuffix(FOTVCenterNetworkSettings, FOTSettingsVCenterNetworkSettings.DnsSuffix);

            setIPConfiguration(FOLVCenterNetworkSettings, FOLSettingsVCenterNetworkSettings.IP);
            setIPConfiguration(FOTVCenterNetworkSettings, FOTSettingsVCenterNetworkSettings.IP);
        };

        function setRecoveryNetwork(vCenterNetworkSettings, recoveryNetwork) {
            if (_.isNullOrUndefined(recoveryNetwork)) {
                return;
            }
            vCenterNetworkSettings.RecoveryNetwork = recoveryNetwork;
        }

        function setShouldReplaceMacAddress(vCenterNetworkSettings, shouldReplaceMacAddress) {
            vCenterNetworkSettings.ShouldReplaceMacAddress = shouldReplaceMacAddress;
        }

        function setDNSSuffix(vCenterNetworkSettings, dnsSuffix) {
            vCenterNetworkSettings.DnsSuffix = dnsSuffix;
        }

        function setIPConfiguration(VCenterNetworkSettings, settingsIPObject) {
            if (_.isNullOrUndefined(settingsIPObject)) {
                VCenterNetworkSettings.IP = null;
                return;
            }
            //init the object if there was no configuration
            VCenterNetworkSettings.IP = VCenterNetworkSettings.IP || new vos.IPSettings();

            VCenterNetworkSettings.IP.IsDhcp = settingsIPObject.IsDhcp;
            VCenterNetworkSettings.IP.PrimaryDns = settingsIPObject.PrimaryDns;
            VCenterNetworkSettings.IP.SecondaryDns = settingsIPObject.SecondaryDns;
            VCenterNetworkSettings.IP.StaticIP = settingsIPObject.StaticIP;
            VCenterNetworkSettings.IP.SubnetMask = settingsIPObject.SubnetMask;
            VCenterNetworkSettings.IP.Gateway = settingsIPObject.Gateway;

        }
    });
