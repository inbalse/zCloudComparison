'use strict';

angular.module('zvmApp.core')
    .controller('nicEditController', function ($scope, editNicService, selectedNics, potentials, createVpgNicConstants) {
        //region EVENTS
        $scope.copyToFot = function () {
            editNicService.copyToFOT();
            initFormData($scope.data.testSettings, editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.changeIpConfig);
        };

        $scope.copyToFo = function () {
            editNicService.copyToFO();
            initFormData($scope.data.failoverSettings, editNicService.getFailoverSettingsVCenterNetworkSettings(),
                $scope.data.testSettings.changeIpConfig);
        };

        $scope.onFailoverSettingsRecoveryNetworkChange = function () {
            editNicService.setSettingsRecoveryNetwork(editNicService.getFailoverSettingsVCenterNetworkSettings(),
                $scope.data.failoverSettings.recoveryNetwork);
        };

        $scope.onTestSettingsRecoveryNetworkChange = function () {
            editNicService.setSettingsRecoveryNetwork(editNicService.getTestSettingsVCenterNetworkSettings(),
                $scope.data.testSettings.recoveryNetwork);
        };

        $scope.onFailoverSettingsShouldReplaceMacAddress = function () {
            editNicService.setSettingsShouldReplaceMacAddress(editNicService.getFailoverSettingsVCenterNetworkSettings(),
                $scope.data.failoverSettings.shouldReplaceMacAddress);

        };

        $scope.onTestSettingsShouldReplaceMacAddress = function () {
            editNicService.setSettingsShouldReplaceMacAddress(editNicService.getTestSettingsVCenterNetworkSettings(),
                $scope.data.testSettings.shouldReplaceMacAddress);
        };

        $scope.onChangeIpConfFailoverChange = function () {
            var config = $scope.data.failoverSettings.changeIpConfig;
            $scope.data.failoverSettings.isIpConfigEnabled = editNicService.isIpConfigEnabled(config);
            $scope.data.failoverSettings.isDNSEnabled = editNicService.isDNSEnabled(config);
            editNicService.setChangeIpConf(
                editNicService.getFailoverSettingsVCenterNetworkSettings(),
                config,
                editNicService.getChangeIpConfFailover(),
                true);

        };

        $scope.onChangeIpConfTestChange = function () {
            var config = $scope.data.testSettings.changeIpConfig;
            $scope.data.testSettings.isIpConfigEnabled = editNicService.isIpConfigEnabled(config);
            $scope.data.testSettings.isDNSEnabled = editNicService.isDNSEnabled(config);
            editNicService.setChangeIpConf(
                editNicService.getTestSettingsVCenterNetworkSettings(),
                config,
                editNicService.getChangeIpConfTest(),
                false);
        };

        $scope.onFailoverStaticIPChange = function () {
            editNicService.setStaticIP(editNicService.getFailoverSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.staticIP);
        };

        $scope.onTestStaticIPChange = function () {
            editNicService.setStaticIP(editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.testSettings.staticIP);
        };

        $scope.onFailoverSubnetMaskChange = function () {
            editNicService.setSubnetMask(editNicService.getFailoverSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.subnetMask);
        };

        $scope.onTestSubnetMaskChange = function () {
            editNicService.setSubnetMask(editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.testSettings.subnetMask);
        };

        $scope.onFailoverGatewayChange = function () {
            editNicService.setGateway(editNicService.getFailoverSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.gateway);
        };

        $scope.onTestGatewayChange = function () {
            editNicService.setGateway(editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.testSettings.gateway);
        };

        $scope.onFailoverPrimaryDNSChange = function () {
            editNicService.setPrimaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.primaryDNS);
        };

        $scope.onTestPrimaryDNSChange = function () {
            editNicService.setPrimaryDNS(editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.testSettings.primaryDNS);
        };

        $scope.onFailoverSecondaryDNSChange = function () {
            editNicService.setSecondaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.secondaryDNS);
        };

        $scope.onTestSecondaryDNSChange = function () {
            editNicService.setSecondaryDNS(editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.testSettings.secondaryDNS);
        };

        $scope.onFailoverDNSSuffixChange = function () {
            editNicService.setDNSSuffix(editNicService.getFailoverSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.dnsSuffix);
        };

        $scope.onTestDNSSuffixChange = function () {
            editNicService.setDNSSuffix(editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.testSettings.dnsSuffix);
        };

        $scope.close = function () {
            editNicService.close();
        };
        //endregion

        //region CONDITIONS
        $scope.isFailoverIPConfigDisabledOrBulk = function () {
            return !$scope.data.failoverSettings.isIpConfigEnabled || $scope.data.isBulk;
        };

        $scope.isTestIPConfigDisabledOrBulk = function () {
            return !$scope.data.testSettings.isIpConfigEnabled || $scope.data.isBulk;
        };

        $scope.isFailoverStaticIPRequired = function () {
            return $scope.isIPConfigurationAndFailoverIpConfigEnabled() && !$scope.data.isBulk;
        };

        $scope.isTestStaticIPRequired = function () {
            return $scope.isIPConfigurationAndTestIpConfigEnabled() && !$scope.data.isBulk;
        };

        $scope.isIPConfigurationAndFailoverIpConfigEnabled = function () {
            return $scope.data.failoverSettings.isIpConfigEnabled && $scope.data.isIPConfigurationEnabled;
        };

        $scope.isIPConfigurationAndTestIpConfigEnabled = function () {
            return $scope.data.testSettings.isIpConfigEnabled && $scope.data.isIPConfigurationEnabled;
        };

        $scope.isNetworkListNotEmpty = function () {
            return !_.isEmpty($scope.data.networksList);
        };
        //endregion

        //region INIT
        $scope.initNicsStep = function () {
            $scope.data = {
                failoverSettings: {},
                testSettings: {}
            };

            editNicService.init(selectedNics);

            initView();
            initData();
        };

        function initView() {
            $scope.data.isBulk = editNicService.isBulk();
            $scope.data.isIPConfigurationEnabled = editNicService.isIPConfigurationEnabled();
            $scope.data.createMacList = editNicService.getMacList();
            $scope.data.changeVnicIPConfList = editNicService.getNicIPConfigList();
            $scope.data.buttons = editNicService.initButtons();
            $scope.data.failoverSettings.changeIpConfig = editNicService.getChangeIpConfFailover();
            $scope.data.testSettings.changeIpConfig = editNicService.getChangeIpConfTest();

        }

        function initData() {
            setNetworksList(potentials.Networks);
            initFormData($scope.data.failoverSettings, editNicService.getFailoverSettingsVCenterNetworkSettings(), $scope.data.failoverSettings.changeIpConfig);
            initFormData($scope.data.testSettings, editNicService.getTestSettingsVCenterNetworkSettings(), $scope.data.testSettings.changeIpConfig);
        }

        function initFormData(dataSettings, vCenterNetworkSettings, config) {
            dataSettings.recoveryNetwork = editNicService.getSettingsRecoveryNetwork(vCenterNetworkSettings);
            dataSettings.shouldReplaceMacAddress = editNicService.getSettingsShouldReplaceMacAddress(vCenterNetworkSettings);
            dataSettings.staticIP = editNicService.getStaticIP(vCenterNetworkSettings);
            dataSettings.subnetMask = editNicService.getSubnetMask(vCenterNetworkSettings);
            dataSettings.gateway = editNicService.getGateway(vCenterNetworkSettings);
            dataSettings.primaryDNS = editNicService.getPrimaryDNS(vCenterNetworkSettings);
            dataSettings.secondaryDNS = editNicService.getSecondaryDNS(vCenterNetworkSettings);
            dataSettings.dnsSuffix = editNicService.getDNSSuffix(vCenterNetworkSettings);
            dataSettings.isIpConfigEnabled = editNicService.isIpConfigEnabled(config);
            dataSettings.isDNSEnabled = editNicService.isDNSEnabled(config);
            setIpConfiguration(dataSettings);
        }

        function setNetworksList(networks) {
            $scope.data.networksList = networks;
            if (_.isEmpty(networks)) {
                $scope.data.failoverSettings.recoveryNetwork = null;
                $scope.onFailoverSettingsRecoveryNetworkChange();
                $scope.data.testSettings.recoveryNetwork = null;
                $scope.onTestSettingsRecoveryNetworkChange();
            }

        }

        function setIpConfiguration(dataSettings) {
            if (dataSettings.isDNSEnabled) {
                dataSettings.changeIpConfig = dataSettings.isIpConfigEnabled ? createVpgNicConstants.IP_CFG_VALUES.STATIC : createVpgNicConstants.IP_CFG_VALUES.DHCP;
            } else {
                dataSettings.changeIpConfig = createVpgNicConstants.IP_CFG_VALUES.NO;
            }
        }

        $scope.initNicsStep();
        //endregion

        $scope.$watch('data.nicForm.$valid', function (isValid) {
            $scope.data.buttons[1].disabled = !isValid;
        });


    });
