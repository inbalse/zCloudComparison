'use strict';

angular.module('zvmApp.core'
).controller('nicVCDEditController', function ($scope, editVCDNicService, selectedNics) {

    //region EVENTS
    $scope.copyToFot = function () {
        editVCDNicService.copyToFOT();
        initFormData($scope.data.failoverSettings,editVCDNicService.getFailoverVCDNetworkSettings());
        initFormData($scope.data.testSettings,editVCDNicService.getTestVCDNetworkSettings());
    };

    $scope.copyToFo = function () {
        editVCDNicService.copyToFO();
        initFormData($scope.data.failoverSettings,editVCDNicService.getFailoverVCDNetworkSettings());
        initFormData($scope.data.testSettings,editVCDNicService.getTestVCDNetworkSettings());
    };

    $scope.onFailoverVAppNetworkNameChange = function () {
        editVCDNicService.setVAppNetworkName(editVCDNicService.getFailoverVCDNetworkSettings(), $scope.data.failoverSettings.vAppNetworkName);
        $scope.data.isFailoverIpListDisabled = editVCDNicService.isIpListDisabled(editVCDNicService.getFailoverVCDNetworkSettings());
    };

    $scope.onTestVAppNetworkNameChange = function () {
        editVCDNicService.setVAppNetworkName(editVCDNicService.getTestVCDNetworkSettings(), $scope.data.testSettings.vAppNetworkName);
        $scope.data.isTestIpListDisabled = editVCDNicService.isIpListDisabled(editVCDNicService.getTestVCDNetworkSettings());
    };

    $scope.onFailoverMacAddressChange = function(){
        editVCDNicService.setMACAddress(editVCDNicService.getFailoverVCDNetworkSettings(),$scope.data.failoverSettings.macAddress);
    };

    $scope.onTestMacAddressChange = function(){
        editVCDNicService.setMACAddress(editVCDNicService.getTestVCDNetworkSettings(),$scope.data.testSettings.macAddress);
    };

    $scope.onFailoverIpModeTypeChange = function () {
        var type = $scope.data.failoverSettings.IpModeType;
        $scope.data.failoverSettings.isIpConfigEnabled = editVCDNicService.isNetworkTypeManual(type);
        editVCDNicService.setIPModeType(editVCDNicService.getFailoverVCDNetworkSettings(), type);
    };

    $scope.onTestIpModeTypeChange = function () {
        var type = $scope.data.testSettings.IpModeType;
        $scope.data.testSettings.isIpConfigEnabled = editVCDNicService.isNetworkTypeManual(type);
        editVCDNicService.setIPModeType(editVCDNicService.getTestVCDNetworkSettings(), type);
    };

    $scope.onFailoverIpAddressChange = function () {
        editVCDNicService.setIPAddress(editVCDNicService.getFailoverVCDNetworkSettings(),$scope.data.failoverSettings.ipAddress);
    };

    $scope.onTestIpAddressChange = function () {
        editVCDNicService.setIPAddress(editVCDNicService.getTestVCDNetworkSettings(),$scope.data.testSettings.ipAddress);
    };

    $scope.close = function () {
        editVCDNicService.close();
    };
    //endregion

    //region CONDITIONS
    $scope.isIPConfigurationAndFailoverIpConfigEnabled = function () {
        return $scope.data.failoverSettings.isIpConfigEnabled && $scope.data.isIPConfigurationEnabled;
    };
    $scope.isIPConfigurationAndTestIpConfigEnabled = function () {
        return $scope.data.testSettings.isIpConfigEnabled && $scope.data.isIPConfigurationEnabled;
    };
    //endregion

    //region INIT
    initVCDNicsStep();

    function initVCDNicsStep() {
        $scope.data = {
            failoverSettings: {},
            testSettings: {}
        };

        editVCDNicService.init(selectedNics);
        initView();
        initData();
    }

    function initView() {
        $scope.data.isBulk = editVCDNicService.isBulk();
        $scope.data.showNetworksSelection = !editVCDNicService.isVCDToVCD();
        $scope.data.isIPConfigurationEnabled = editVCDNicService.isIPConfigurationEnabled();
        $scope.data.macFailoverAddressList = editVCDNicService.getMacFailoverAddressList();
        $scope.data.macTestAddressList = editVCDNicService.getMacTestAddressList();
        $scope.data.changeVnicIPConfList = editVCDNicService.getVNicIPConfigList();
        $scope.data.buttons = editVCDNicService.initButtons();
        $scope.data.networksList = editVCDNicService.getPotentialNetworks();
    }

    function initData() {
        initFormData($scope.data.failoverSettings,editVCDNicService.getFailoverVCDNetworkSettings());
        initFormData($scope.data.testSettings,editVCDNicService.getTestVCDNetworkSettings());
    }

    function initFormData(dataSettings,VCDNetworkSettings) {
        dataSettings.vAppNetworkName = editVCDNicService.getVappNetworkName(VCDNetworkSettings);
        dataSettings.IpModeType = editVCDNicService.getIPModeType(VCDNetworkSettings);
        dataSettings.ipAddress = editVCDNicService.getIPAddress(VCDNetworkSettings);
        dataSettings.macAddress = editVCDNicService.getMACAddress(VCDNetworkSettings);
        dataSettings.isIpConfigEnabled = editVCDNicService.isNetworkTypeManual(dataSettings.IpModeType);
    }

    //endregion
    $scope.$watch('data.nicForm.$valid', function(isValid) {
        $scope.data.buttons[1].disabled = !isValid;
    });
});
