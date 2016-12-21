'use strict';

angular.module('zvmApp.services')
    .service('saveVCDNicsService', function (enums) {
        var saveVCDNicService = this;

        saveVCDNicService.save = function (nic, settings, applyIpSettings) {
            var FOLVCDNetworkSettings = nic.FailoverSettings.VCDNetworkSettings,
                FOTVCDNetworkSettings = nic.TestSettings.VCDNetworkSettings,
                FOLSettingsVCDNetworkSettings = settings.FailoverSettings.VCDNetworkSettings,
                FOTSettingsVCDNetworkSettings = settings.TestSettings.VCDNetworkSettings;


            setVappNetworkName(FOLVCDNetworkSettings, FOLSettingsVCDNetworkSettings.NicInfo.VappNetworkName);
            setVappNetworkName(FOTVCDNetworkSettings, FOTSettingsVCDNetworkSettings.NicInfo.VappNetworkName);

            setMacAddress(FOLVCDNetworkSettings, FOLSettingsVCDNetworkSettings.NewMacAddress.MacAddress);
            setMacAddress(FOTVCDNetworkSettings, FOTSettingsVCDNetworkSettings.NewMacAddress.MacAddress);

            setIPModeType(FOLVCDNetworkSettings, FOLSettingsVCDNetworkSettings.NicInfo.IPMode.IpModeType);
            setIPModeType(FOTVCDNetworkSettings, FOTSettingsVCDNetworkSettings.NicInfo.IPMode.IpModeType);

            if (!applyIpSettings) {
                return;
            }

            setIPAddress(FOLVCDNetworkSettings, FOLSettingsVCDNetworkSettings.NicInfo.IpAddress);
            setIPAddress(FOTVCDNetworkSettings, FOTSettingsVCDNetworkSettings.NicInfo.IpAddress);
        };

        function setVappNetworkName(VCDNetworkSettings, vAppNetworkName) {
            if (_.isNullOrUndefined(vAppNetworkName)) {
                return;
            }

            VCDNetworkSettings.NicInfo.VappNetworkName = vAppNetworkName;
        }

        function setMacAddress(VCDNetworkSettings, macAddress) {
            if (_.isNullOrUndefined(macAddress)) {
                return;
            }
            VCDNetworkSettings.NewMacAddress.MacAddress = macAddress;
        }

        function setIPModeType(VCDNetworkSettings, ipModeType) {
            if (_.isNullOrUndefined(ipModeType)) {
                return;
            }
            VCDNetworkSettings.NicInfo.IPMode.IpModeType = ipModeType;
        }

        function setIPAddress(VCDNetworkSettings, ipAddress) {
            if (!_.isEqual(VCDNetworkSettings.NicInfo.IPMode.IpModeType, enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual)) {
                VCDNetworkSettings.NicInfo.IpAddress = null;
                return;
            }

            VCDNetworkSettings.NicInfo.IpAddress = ipAddress;
        }
    });
