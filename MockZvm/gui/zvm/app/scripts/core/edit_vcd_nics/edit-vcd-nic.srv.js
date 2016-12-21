'use strict';

angular.module('zvmApp.core')
    .service('editVCDNicService', function ($translate, vpgService, zertoServiceFactory, nicVCDEditFactory, enums, globalConstants) {
        var editVCDNicService = this,
            isBulk = false,
            nicObject, getVNicIPConfigList,
            macFailoverAddressList = [],
            macTestAddressList = [];

        //region INIT
        editVCDNicService.init = function (selectedNics) {
            initLists();

            if (selectedNics.length > 1) {
                nicObject = getBulkNic(selectedNics);
                initBulkData();
                isBulk = true;
            } else {
                nicObject = selectedNics[0];
                initData();
                isBulk = false;
            }

        };

        function initLists() {
            getVNicIPConfigList = [
                {label: 'IP Pool', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool},
                {label: 'DHCP', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp},
                {label: 'Static- IP Pool', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual},
                {label: 'None', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.None}
            ];

            macFailoverAddressList = [
                {label: 'Reset', value: ''}
            ];

            macTestAddressList = [
                {label: 'Reset', value: ''}
            ];

        }
        function initBulkData() {
            getVNicIPConfigList.splice(2, 1); //remove static ip
        }

        function initData() {
            var failoverMac = nicObject.FailoverSettings.VCDNetworkSettings.NicInfo.MacAddress;
            macFailoverAddressList.push({label: failoverMac, value: failoverMac});

            var testMac = nicObject.TestSettings.VCDNetworkSettings.NicInfo.MacAddress;
            macTestAddressList.push({label: testMac, value: testMac});
        }


        editVCDNicService.getPotentialNetworks = function () {
            var resources = vpgService.getComputeResources();
            return resources.Networks;
        };

        editVCDNicService.getFailoverVCDNetworkSettings = function () {
            return nicObject.FailoverSettings.VCDNetworkSettings;
        };

        editVCDNicService.getTestVCDNetworkSettings = function () {
            return nicObject.TestSettings.VCDNetworkSettings;
        };

        function getBulkNic(selectedNics) {
            var nicObject = selectedNics[0],
                nicFailoverVCD = nicObject.FailoverSettings.VCDNetworkSettings,
                nicTestVCD = nicObject.TestSettings.VCDNetworkSettings;


            _.forEach(selectedNics, function (nextNic) {
                //if value is same by all then put it in nicObject
                var nextFailoverVCD = nextNic.FailoverSettings.VCDNetworkSettings;
                var nextTestVCD = nextNic.TestSettings.VCDNetworkSettings;

                if (!_.isEqual(nextNic.IsIPConfigurationEnabled, nicObject.IsIPConfigurationEnabled)) {
                    nicObject.IsIPConfigurationEnabled = false;
                }

                setVAppNetworkName(nextFailoverVCD, nicFailoverVCD);
                setVAppNetworkName(nextTestVCD, nicTestVCD);

                setNewMacAddress(nextFailoverVCD, nicFailoverVCD);
                setNewMacAddress(nextTestVCD, nicTestVCD);

                setIpModeType(nextFailoverVCD, nicFailoverVCD);
                setIpModeType(nextTestVCD, nicTestVCD);

                setIPAddress(nextFailoverVCD, nicFailoverVCD);
                setIPAddress(nextTestVCD, nicTestVCD);

            });
            return nicObject;
        }

        function setVAppNetworkName(nextVCD, nicVCD) {
            if (nextVCD.NicInfo.VappNetworkName !== nicVCD.NicInfo.VappNetworkName) {
                nicVCD.NicInfo.VappNetworkName = null;
            }
        }

        function setNewMacAddress(nextVCD, nicVCD) {
            if (nextVCD.NewMacAddress && !_.isEqual(nextVCD.NewMacAddress.MacAddress,
                    nicVCD.NewMacAddress.MacAddress)) {

                nicVCD.NewMacAddress.MacAddress = null;
            }
        }

        function setIpModeType(nextVCD, nicVCD) {

            if (!_.isEqual(nextVCD.NicInfo.IPMode.IpModeType,
                    nicVCD.NicInfo.IPMode.IpModeType)) {

                nicVCD.NicInfo.IPMode.IpModeType = null;
            }
        }

        function setIPAddress(nextVCD, nicVCD) {
            if (!_.isEqual(nextVCD.NicInfo.IpAddress, nicVCD.NicInfo.IpAddress)) {
                nicVCD.NicInfo.IpAddress = null;
            }
        }

        //endregion

        //region BUTTONS
        editVCDNicService.initButtons = function () {
            return [                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: close,
                    disabled: false
                }, {
                    label: $translate.instant('MODAL.OK'),
                    handler: save,
                    disabled: false
                }
            ];
        };

        function close() {
            nicVCDEditFactory.close();
        }

        function save() {
            nicVCDEditFactory.save(nicObject);
        }

        editVCDNicService.copyToFOT = function () {
            nicObject.TestSettings = _.cloneDeep(nicObject.FailoverSettings);
        };

        editVCDNicService.copyToFO = function () {
            nicObject.FailoverSettings = _.cloneDeep(nicObject.TestSettings);
        };

        editVCDNicService.close = function() {
            close();
        };
        //endregion

        //region GETTERS
        editVCDNicService.getVappNetworkName = function (VCDNetworkSettings) {
            return VCDNetworkSettings.NicInfo.VappNetworkName;
        };
        editVCDNicService.getIPModeType = function (VCDNetworkSettings) {
            return VCDNetworkSettings.NicInfo.IPMode.IpModeType;
        };
        editVCDNicService.getIPAddress = function(VCDNetworkSettings) {
            return VCDNetworkSettings.NicInfo.IpAddress;
        };
        editVCDNicService.getMACAddress = function(VCDNetworkSettings) {
            return VCDNetworkSettings.NewMacAddress.MacAddress;
        };
        editVCDNicService.getMacFailoverAddressList = function () {
            return macFailoverAddressList;
        };
        editVCDNicService.getMacTestAddressList = function () {
            return macTestAddressList;
        };
        editVCDNicService.getVNicIPConfigList = function () {
            return getVNicIPConfigList;
        };
        editVCDNicService.isBulk = function () {
            return isBulk;
        };
        editVCDNicService.getNicObject = function () {
            return nicObject;
        };
        editVCDNicService.isIpListDisabled = function (VCDNetworkSettings) {
            return _.isEqual(VCDNetworkSettings.NicInfo.IPMode.IpModeType, enums.VCDNetworkIpMode_VCDNetworkIpModeType.None);
        };
        editVCDNicService.isNetworkTypeManual = function (type) {
            return _.isEqual(type, enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual);
        };
        editVCDNicService.isIPConfigurationEnabled = function () {
            return nicObject.IsIPConfigurationEnabled;
        };
        editVCDNicService.isVCDToVCD = function () {
            return vpgService.isVCDToVCD();
        };
        //endregion

        //region SETTERS
        editVCDNicService.setVAppNetworkName = function (VCDNetworkSettings, name) {
            VCDNetworkSettings.NicInfo.VappNetworkName = name;
            if (_.isEmpty(name)) {
                return;
            }
            if (_.isEqual(name, globalConstants.NONE_NETWORK)) {
                editVCDNicService.setIPModeType(VCDNetworkSettings, enums.VCDNetworkIpMode_VCDNetworkIpModeType.None);
            }
        };
        editVCDNicService.setMACAddress = function (VCDNetworkSettings, macAddress) {
            VCDNetworkSettings.NewMacAddress.MacAddress = macAddress;
        };
        editVCDNicService.setIPModeType = function (VCDNetworkSettings, type) {
            VCDNetworkSettings.NicInfo.IPMode.IpModeType = type;
            if (!_.isEqual(type, enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual)) {
                VCDNetworkSettings.NicInfo.IpAddress = null;
            }
        };
        editVCDNicService.setIPAddress = function (VCDNetworkSettings, ipAddress) {
            VCDNetworkSettings.NicInfo.IpAddress = ipAddress;
        };

        //endregion
    });
