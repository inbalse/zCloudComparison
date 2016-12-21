'use strict';

angular.module('zvmApp.core')
    .service('createVpgRecoveryService', function (publicCloudSettingsService, storageService, vmsService, vpgService, networksService, enums) {

        var createVpgRecoveryService = this;

        createVpgRecoveryService.getDefaultTargetFolder = function () {
            return storageService.getTargetFolder();
        };

        createVpgRecoveryService.changeTargetFolder = function (selectedTargetFolder) {
            storageService.applyDefaultFolder(vmsService.getInitializedSelectedVms(), selectedTargetFolder);
            storageService.setTargetFolder(selectedTargetFolder);
            vpgService.handleChangingDefaultValues();
        };

        createVpgRecoveryService.changeGuestCustomization = function (value) {
            var recoveryVappSettings = vpgService.getRecoveryVappSettings();

            if (angular.isDefined(value)) {
                recoveryVappSettings.VCDVappSettings.DisableGuestCustomization = !value;
            }
        };

        createVpgRecoveryService.onToggleCopyNatRulesCheckbox = function (isEnabled) {
            var vpgSettings = vpgService.getVpgSettings();
            //update CopyNatRulesOptions if checkbox is changed
            if (!isEnabled && !vpgService.isReverse()) {
                vpgSettings.Config.Configuration.CopyNatRulesOptions = enums.CopyNatRulesOptions.DontCopy;
            } else if (vpgSettings.Config.Configuration.CopyNatRulesOptions === enums.CopyNatRulesOptions.DontCopy) {
                //if enable use default
                vpgSettings.Config.Configuration.CopyNatRulesOptions = enums.CopyNatRulesOptions.CopyAsIs;
            }
        };

        createVpgRecoveryService.copyNatRulesChange = function (value) {
            networksService.setCopyNatRules(value);
        };

        createVpgRecoveryService.getSelectedNatRule = function () {
            var vpgSettings = vpgService.getVpgSettings();
            return vpgSettings.Config.Configuration.CopyNatRulesOptions;
        };

        createVpgRecoveryService.processOrgVdcMappings = function () {
            var networkMapping = vpgService.getRecoveryVappSettings().VCDVappSettings.OrgVdcNetworkMapping;
            _.forEach(networkMapping, function (item) {
                item.id = JSON.stringify(item.OriginalOrgVdcNetworkValue);
            });
            return networkMapping;
        };

        createVpgRecoveryService.disableVmSettings = function (value) {
            var awsVpgFailoverCloudSettings = publicCloudSettingsService.getPublicCloudFailoverSettings(),
                awsVpgFailoverTestCloudSettings = publicCloudSettingsService.getPublicCloudFailoverTestSettings();

            if (angular.isDefined(value) && (vpgService.isAws())) {
                var securityFailover = awsVpgFailoverCloudSettings.SecurityGroups;
                var securityTest = awsVpgFailoverTestCloudSettings.SecurityGroups;

                if ((securityFailover && securityFailover.length === 0) ||
                    (securityTest && securityTest.length === 0)) {
                    return true;
                } else {
                    return !value;
                }
            }

            else if (vpgService.isAzure()) {
                return !value;
            }
        };
    });
