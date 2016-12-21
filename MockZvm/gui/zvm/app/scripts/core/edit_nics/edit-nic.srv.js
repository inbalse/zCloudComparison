'use strict';

angular.module('zvmApp.core')
    .service('editNicService', function ($q, $translate, vpgService, vmsService, zertoServiceFactory, nicEditFactory, createVpgNicConstants, zAlertFactory) {
        var editNicService = this,
            isInMultiNicVM = false,
            isBulk = false,
            gatewayExist = {
                originalFailoverSettingsGatewayExist: false,
                originalTestSettingsGatewayExist: false
            },
            nicObject;


        //region INIT
        editNicService.init = function (selectedNics) {
            editNicService.setIsInMultiNicVM(selectedNics);
            if (selectedNics.length > 1) {
                nicObject = getBulkNic(selectedNics);
                isBulk = true;
            } else {
                nicObject = selectedNics[0];
                isBulk = false;
                initData();
            }

        };

        function initData() {
            editNicService.initIpConfiguration(nicObject, 'changeIpConfFailover', 'FailoverSettings', 'originalFailoverSettingsGatewayExist');
            editNicService.initIpConfiguration(nicObject, 'changeIpConfTest', 'TestSettings', 'originalTestSettingsGatewayExist');
        }

        editNicService.initIpConfiguration = function (nicObj, ipConf, settings, gatewayExistType) {
            if (nicObj[settings].VCenterNetworkSettings.IP) {
                if (nicObj[settings].VCenterNetworkSettings.IP.IsDhcp) {
                    nicObj[ipConf] = createVpgNicConstants.IP_CFG_VALUES.DHCP;
                } else {
                    nicObj[ipConf] = createVpgNicConstants.IP_CFG_VALUES.STATIC;
                }
                if (!_.isNullOrUndefined(nicObject[settings].VCenterNetworkSettings.IP.Gateway)) {
                    gatewayExist[gatewayExistType] = true;
                }

            } else {
                nicObj[ipConf] = createVpgNicConstants.IP_CFG_VALUES.NO;
            }
        };

        function getBulkNic(selectedNics) {
            var nicObject = selectedNics[0],
                nicFailOverVC = nicObject.FailoverSettings.VCenterNetworkSettings,
                nicTestVC = nicObject.TestSettings.VCenterNetworkSettings;

            _.forEach(selectedNics, function (nextNic) {
                //if value is same by all then put it in nicObject
                var nextFailOverVC = nextNic.FailoverSettings.VCenterNetworkSettings,
                    nextTestVC = nextNic.TestSettings.VCenterNetworkSettings;

                if (!_.isEqual(nextNic.IsIPConfigurationEnabled, nicObject.IsIPConfigurationEnabled)) {
                    nicObject.IsIPConfigurationEnabled = false;
                }

                setRecoveryNetworks(nextFailOverVC, nicFailOverVC);
                setRecoveryNetworks(nextTestVC, nicTestVC);

                setValueInBulkObject(nicFailOverVC, nextFailOverVC, false, 'ShouldReplaceMacAddress');

                setValueInBulkObject(nicTestVC, nextTestVC, false, 'ShouldReplaceMacAddress');

                setFailoverIpConfig(nextFailOverVC, nicObject);
                setTestIpConfig(nextTestVC, nicObject);

                setBulkObject(nextFailOverVC, nicFailOverVC);
                setBulkObject(nextTestVC, nicTestVC);

                setValueInBulkObject(nicFailOverVC, nextFailOverVC, null, 'DnsSuffix');
                setValueInBulkObject(nicTestVC, nextTestVC, null, 'DnsSuffix');

            });


            return nicObject;
        }

        function setRecoveryNetworks(nextVC, nicVC) {
            if (nextVC.RecoveryNetwork &&
                getNicRecoveryNetworkInternalName(nextVC) === getNicRecoveryNetworkInternalName(nicVC)) {
                return;
            }
            nicVC.RecoveryNetwork = null;
        }

        function setFailoverIpConfig(nextFailOverVC, nicObject) {
            var nextChangeFailoverIpConfig = createVpgNicConstants.IP_CFG_VALUES.NO;
            //is dhcp of static or nothing
            if (nextFailOverVC.IP) {
                if (nextFailOverVC.IP.IsDhcp) {
                    nextChangeFailoverIpConfig = createVpgNicConstants.IP_CFG_VALUES.DHCP;     //DHCP
                } else {
                    nextChangeFailoverIpConfig = createVpgNicConstants.IP_CFG_VALUES.STATIC;     //Static
                }
            } else {
                nextChangeFailoverIpConfig = createVpgNicConstants.IP_CFG_VALUES.NO;         //NO
            }
            if (_.isNullOrUndefined(nicObject.changeIpConfFailover)) {
                nicObject.changeIpConfFailover = nextChangeFailoverIpConfig;
            } else if (!_.isEqual(nextChangeFailoverIpConfig, nicObject.changeIpConfFailover)) {
                nicObject.changeIpConfFailover = createVpgNicConstants.IP_CFG_VALUES.NO;
            }
        }

        function setTestIpConfig(nextTestVC, nicObject) {
            var nextChangeTestIpConfig = createVpgNicConstants.IP_CFG_VALUES.NO;
            //is dhcp of static or nothing
            if (nextTestVC.IP) {
                if (nextTestVC.IP.IsDhcp) {
                    nextChangeTestIpConfig = createVpgNicConstants.IP_CFG_VALUES.DHCP;     //DHCP
                } else {
                    nextChangeTestIpConfig = createVpgNicConstants.IP_CFG_VALUES.STATIC;     //Static
                }
            }

            if (_.isNullOrUndefined(nicObject.changeIpConfTest)) {
                nicObject.changeIpConfTest = nextChangeTestIpConfig;
            } else if (!_.isEqual(nextChangeTestIpConfig, nicObject.changeIpConfTest)) {
                nicObject.changeIpConfTest = createVpgNicConstants.IP_CFG_VALUES.NO;
            }
        }

        function setBulkObject(nextVC, nicVC) {
            if (nextVC.IP && nicVC.IP) {
                setBulkObjectIp(nextVC.IP, nicVC.IP, 'StaticIP');
                setBulkObjectIp(nextVC.IP, nicVC.IP, 'SubnetMask');
                setBulkObjectIp(nextVC.IP, nicVC.IP, 'Gateway');
                setBulkObjectIp(nextVC.IP, nicVC.IP, 'PrimaryDns');
                setBulkObjectIp(nextVC.IP, nicVC.IP, 'SecondaryDns');
            }
        }

        function setBulkObjectIp(nextObject, nicObject, property) {
            if (nextObject[property] !== nicObject[property]) {
                nicObject[property] = null;
            }
        }

        function setValueInBulkObject(nicObject, nicInList, noValue, property) {
            if (nicInList[property] !== nicObject[property]) {
                nicObject[property] = noValue;
            }
        }

        function getNicRecoveryNetworkInternalName(networkSettings) {
            return _.get(networkSettings, 'RecoveryNetwork.Id.InternalName', null);
        }

        //endregion

        //region BUTTONS

        editNicService.initButtons = function () {
            return [
                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: close,
                    disabled: false
                },
                {
                    label: $translate.instant('MODAL.OK'),
                    handler: save,
                    disabled: false
                }
            ];
        };
        function close() {
            nicEditFactory.close();
        }

        function save() {
            if (nicObject.changeIpConfFailover === createVpgNicConstants.IP_CFG_VALUES.NO) {
                nicObject.FailoverSettings.VCenterNetworkSettings.IP = null;
                nicObject.FailoverSettings.VCenterNetworkSettings.DnsSuffix = null;
            }

            if (nicObject.changeIpConfTest === createVpgNicConstants.IP_CFG_VALUES.NO) {
                nicObject.TestSettings.VCenterNetworkSettings.IP = null;
                nicObject.TestSettings.VCenterNetworkSettings.DnsSuffix = null;
            }

            nicEditFactory.save(nicObject);
        }

        editNicService.copyToFOT = function () {
            nicObject.TestSettings = _.cloneDeep(nicObject.FailoverSettings);
            nicObject.changeIpConfTest = _.cloneDeep(nicObject.changeIpConfFailover);
        };

        editNicService.copyToFO = function () {
            nicObject.FailoverSettings = _.cloneDeep(nicObject.TestSettings);
            nicObject.changeIpConfFailover = _.cloneDeep(nicObject.changeIpConfTest);
        };

        editNicService.close = function () {
            close();
        };

        //endregion

        //region GETTERS
        editNicService.getIsInMultiNicVM = function () {
            return isInMultiNicVM;
        };
        editNicService.getFailoverSettingsVCenterNetworkSettings = function () {
            return nicObject.FailoverSettings.VCenterNetworkSettings;
        };

        editNicService.getTestSettingsVCenterNetworkSettings = function () {
            return nicObject.TestSettings.VCenterNetworkSettings;
        };

        editNicService.getSettingsShouldReplaceMacAddress = function (vCenterNetworkSettings) {
            return vCenterNetworkSettings.ShouldReplaceMacAddress;
        };

        editNicService.getSettingsRecoveryNetwork = function (vCenterNetworkSettings) {
            return vCenterNetworkSettings.RecoveryNetwork;
        };

        editNicService.getStaticIP = function (vCenterNetworkSettings) {
            if (_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                return;
            }
            return vCenterNetworkSettings.IP.StaticIP;
        };

        editNicService.getSubnetMask = function (vCenterNetworkSettings) {
            if (_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                return;
            }
            return vCenterNetworkSettings.IP.SubnetMask;
        };

        editNicService.getGateway = function (vCenterNetworkSettings) {
            if (_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                return;
            }
            return vCenterNetworkSettings.IP.Gateway;
        };

        editNicService.getPrimaryDNS = function (vCenterNetworkSettings) {
            if (_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                return;
            }
            return vCenterNetworkSettings.IP.PrimaryDns;
        };

        editNicService.getSecondaryDNS = function (vCenterNetworkSettings) {
            if (_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                return;
            }
            return vCenterNetworkSettings.IP.SecondaryDns;
        };

        editNicService.getDNSSuffix = function (vCenterNetworkSettings) {
            return vCenterNetworkSettings.DnsSuffix;
        };

        editNicService.getMacList = function () {
            return [
                {label: $translate.instant('EDIT_NIC.YES'), value: true},
                {label: $translate.instant('EDIT_NIC.NO'), value: false}
            ];
        };

        editNicService.getNicIPConfigList = function () {
            return [
                {label: $translate.instant('EDIT_NIC.NO'), value: createVpgNicConstants.IP_CFG_VALUES.NO},
                {label: $translate.instant('EDIT_NIC.YES_DHCP'), value: createVpgNicConstants.IP_CFG_VALUES.DHCP},
                {label: $translate.instant('EDIT_NIC.YES_STATIC'), value: createVpgNicConstants.IP_CFG_VALUES.STATIC}
            ];
        };

        editNicService.getChangeIpConfFailover = function () {
            return nicObject.changeIpConfFailover;
        };

        editNicService.getChangeIpConfTest = function () {
            return nicObject.changeIpConfTest;
        };

        editNicService.isBulk = function () {
            return isBulk;
        };

        editNicService.isIpConfigEnabled = function (config) {
            return _.isEqual(config, createVpgNicConstants.IP_CFG_VALUES.STATIC);
        };

        editNicService.isDNSEnabled = function (config) {
            return _.isEqual(config, createVpgNicConstants.IP_CFG_VALUES.STATIC) ||
                _.isEqual(config, createVpgNicConstants.IP_CFG_VALUES.DHCP);
        };

        editNicService.isIPConfigurationEnabled = function () {
            return nicObject.IsIPConfigurationEnabled;
        };

        editNicService.getNicObject = function () {
            return nicObject;
        };

        function getInfoText(changeIpConfValue, currentChangeIpConfig) {
            if (!isInMultiNicVM) {
                return;
            }

            if (_.isEqual(changeIpConfValue, createVpgNicConstants.IP_CFG_VALUES.STATIC) && !_.isEqual(currentChangeIpConfig, createVpgNicConstants.IP_CFG_VALUES.STATIC)) {

                zAlertFactory.info($translate.instant('EDIT_NIC.SUB_TITLE'), $translate.instant('EDIT_NIC.INFO_TEXT'));
            }
        }

        function getOrCreateIPObject(vCenterNetworkSettings) {
            if (_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                vCenterNetworkSettings.IP = {};
            }
            return vCenterNetworkSettings.IP;
        }

        //endregion

        //region SETTERS
        editNicService.setIsInMultiNicVM = function (selectedNics) {
            isInMultiNicVM = _.some(selectedNics, {'isInMultiNicVM': true});
        };
        editNicService.getGatewayExist = function () {
            return gatewayExist;
        };

        editNicService.setSettingsRecoveryNetwork = function (vCenterNetworkSettings, recoveryNetwork) {
            vCenterNetworkSettings.RecoveryNetwork = recoveryNetwork;
        };

        editNicService.setSettingsShouldReplaceMacAddress = function (vCenterNetworkSettings, shouldReplaceMacAddress) {
            vCenterNetworkSettings.ShouldReplaceMacAddress = shouldReplaceMacAddress;
        };

        editNicService.setChangeIpConf = function (vCenterNetworkSettings, newChangeIpConfig, currentChangeIpConfig, isFailover) {

            getInfoText(newChangeIpConfig, currentChangeIpConfig);

            if (_.isNullOrUndefined(newChangeIpConfig)) {
                return;
            }

            if (_.isEqual(newChangeIpConfig, createVpgNicConstants.IP_CFG_VALUES.NO)) {
                vCenterNetworkSettings.IP = null;
                if (isFailover) {
                    nicObject.changeIpConfFailover = createVpgNicConstants.IP_CFG_VALUES.NO;
                } else {
                    nicObject.changeIpConfTest = createVpgNicConstants.IP_CFG_VALUES.NO;
                }
                return;
            }

            editNicService.setIsDHCP(vCenterNetworkSettings, _.isEqual(newChangeIpConfig, createVpgNicConstants.IP_CFG_VALUES.DHCP), isFailover);

            if (_.isEqual(newChangeIpConfig, createVpgNicConstants.IP_CFG_VALUES.DHCP) && vCenterNetworkSettings.IP) {
                vCenterNetworkSettings.IP.StaticIP = null;
                vCenterNetworkSettings.IP.SubnetMask = null;
                vCenterNetworkSettings.IP.Gateway = null;
            }
        };

        editNicService.setStaticIP = function (vCenterNetworkSettings, ip) {
            var ipObject = getOrCreateIPObject(vCenterNetworkSettings);
            ipObject.StaticIP = ip;
        };

        editNicService.setSubnetMask = function (vCenterNetworkSettings, ip) {
            var ipObject = getOrCreateIPObject(vCenterNetworkSettings);
            ipObject.SubnetMask = ip;
        };

        editNicService.setGateway = function (vCenterNetworkSettings, ip, isFailover) {
            var ipObject = getOrCreateIPObject(vCenterNetworkSettings);
            ipObject.Gateway = ip;

            if (!isInMultiNicVM) {
                return;
            }

            if (isFailover) {
                if (gatewayExist.originalFailoverSettingsGatewayExist) { //is valid and there is Failover Gateway configured
                    zAlertFactory.info($translate.instant('EDIT_NIC.SUB_TITLE'), $translate.instant('EDIT_NIC.INFO_TEXT'));
                    //show this meassage once when edit
                    gatewayExist.originalFailoverSettingsGatewayExist = false;
                }
                return;
            }

            if (gatewayExist.originalTestSettingsGatewayExist) { //is valid and there is Test Gateway configured
                zAlertFactory.info($translate.instant('EDIT_NIC.SUB_TITLE'), $translate.instant('EDIT_NIC.INFO_TEXT'));
                //show this meassage once when edit
                gatewayExist.originalTestSettingsGatewayExist = false;
            }
        };

        editNicService.setPrimaryDNS = function (vCenterNetworkSettings, ip) {
            var ipObject = getOrCreateIPObject(vCenterNetworkSettings);

            ipObject.PrimaryDns = ip;

        };

        editNicService.setSecondaryDNS = function (vCenterNetworkSettings, ip) {
            var ipObject = getOrCreateIPObject(vCenterNetworkSettings);
            ipObject.SecondaryDns = ip;
        };

        editNicService.setDNSSuffix = function (vCenterNetworkSettings, suffix) {
            vCenterNetworkSettings.DnsSuffix = suffix;
        };

        editNicService.setIsDHCP = function (vCenterNetworkSettings, isDHCP, isFailover) {
            if (!isDHCP && !_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                vCenterNetworkSettings.IP.IsDhcp = false;
                return;
            }

            if (isDHCP) {
                if (_.isNullOrUndefined(vCenterNetworkSettings.IP)) {
                    vCenterNetworkSettings.IP = {};
                }
                vCenterNetworkSettings.IP.IsDhcp = true;
                if (isFailover) {
                    nicObject.changeIpConfFailover = createVpgNicConstants.IP_CFG_VALUES.DHCP;
                } else {
                    nicObject.changeIpConfTest = createVpgNicConstants.IP_CFG_VALUES.DHCP;
                }
            } else {
                if (isFailover) {
                    nicObject.changeIpConfFailover = createVpgNicConstants.IP_CFG_VALUES.STATIC;
                } else {
                    nicObject.changeIpConfTest = createVpgNicConstants.IP_CFG_VALUES.STATIC;
                }
            }
        };

        //endregion
    });
