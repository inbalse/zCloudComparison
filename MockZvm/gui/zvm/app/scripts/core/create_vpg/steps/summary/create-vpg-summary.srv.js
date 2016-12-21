/**
 * Created by nir.moreno on 21/03/2016.
 */
/**
 * Created by nir.moreno on 21/03/2016.
 */
'use strict';

angular.module('zvmApp.core')
    .constant('entityClasses', {
        VCVpg: 'entities-item-vc',
        VCDvApp: 'entities-item-vcd',
        HyperV: 'entities-item-hyper-v',
        Aws: 'entities-item-aws',
        Azure: 'entities-item-azure'
    })
    .service('createVpgSummaryService', function (createVPGModel, vpgService, vmsService, networksService, storageService, publicCloudSettingsService, entityClasses, enums) {

        var summaryService = this;

        summaryService.getSiteName = function () {
            return vpgService.getSiteName();
        };

        summaryService.getVpgName = function () {
            return vpgService.getVpgName();
        };

        summaryService.getVpgPriority = function () {
            return vpgService.getPriority();
        };

        summaryService.getSelectedZORGName = function () {
            return getSelectedZORG().OrganizationName;
        };

        summaryService.getTargetSiteName = function () {
            return vpgService.getTargetSiteInfo().OwnersId.DisplayName;
        };

        summaryService.getTotalProvisionedSpace = function () {
            return vpgService.getTotalProvisionedSpace();
        };

        summaryService.getTargetHostName = function () {
            var targetHost = vpgService.getTargetHost();
            if (_.isNullOrUndefined(targetHost)) {
                return null;
            }
            return targetHost.DisplayName;
        };

        //region PUBLIC CLOUDS
        summaryService.isAws = function () {
            return vpgService.isAws();
        };

        summaryService.isAzure = function () {
            return vpgService.isAzure();
        };

        summaryService.getPublicCloudFailoverSecurityGroupNames = function () {
            var awsFailOverSettings = getPublicCloudFailoverSettings();
            return getSecurityGroupsText(awsFailOverSettings.SecurityGroups);
        };

        summaryService.getPublicCloudFailoverTestSecurityGroupNames = function () {
            var awsFailOverTestSettings = getPublicCloudFailoverTestSettings();
            return getSecurityGroupsText(awsFailOverTestSettings.SecurityGroups);
        };

        summaryService.getPublicCloudFailoverPcnName = function () {
            var publicCloudFailOverTestSettings = getPublicCloudFailoverSettings();
            return publicCloudFailOverTestSettings.Pcn.Name;
        };

        summaryService.getPublicCloudFailoverTestPcnName = function () {
            var awsFailOverTestSettings = getPublicCloudFailoverTestSettings();
            return awsFailOverTestSettings.Pcn.Name;
        };

        summaryService.getPublicCloudFailoverSubnetName = function () {
            var publicCloudFailOverTestSettings = getPublicCloudFailoverSettings();
            return publicCloudFailOverTestSettings.Subnet.Name;
        };

        summaryService.getPublicCloudFailoverTestSubnetName = function () {
            var awsFailOverTestSettings = getPublicCloudFailoverTestSettings();
            return awsFailOverTestSettings.Subnet.Name;
        };

        summaryService.getPublicCloudFailoverInstanceFamilyName = function () {
            var publicCloudFailOverTestSettings = getPublicCloudFailoverSettings();
            return publicCloudFailOverTestSettings.PublicCloudInstanceTypeVisualObject.FamilyName;
        };

        summaryService.getPublicCloudFailoverTestInstanceFamilyName = function () {
            var awsFailOverTestSettings = getPublicCloudFailoverTestSettings();
            return awsFailOverTestSettings.PublicCloudInstanceTypeVisualObject.FamilyName;
        };

        summaryService.getPublicCloudFailoverInstanceType = function () {
            var publicCloudFailOverTestSettings = getPublicCloudFailoverSettings();
            return publicCloudFailOverTestSettings.PublicCloudInstanceTypeVisualObject.Id.InstanceType;
        };

        summaryService.getPublicCloudFailoverTestInstanceType = function () {
            var awsFailOverTestSettings = getPublicCloudFailoverTestSettings();
            return awsFailOverTestSettings.PublicCloudInstanceTypeVisualObject.Id.InstanceType;
        };
        //endregion

        summaryService.getSelectedBackupTargetName = function () {
            var backupDetails = getBackupTargetDetails();
            if (_.isNullOrUndefined(backupDetails)) {
                return;
            }
            return backupDetails.DisplayName;
        };

        summaryService.getSourceTypeClass = function () {
            return getEntityTypeClass(vpgService.getVpgSettingsEntities().Source);

        };

        summaryService.isScvmm = function () {
            return vpgService.isScvmm();
        };

        summaryService.isVCDvApp = function () {
            return vpgService.isVcdVapp();
        };

        summaryService.isVCVpg = function () {
            return vpgService.isVCVpg();
        };

        summaryService.getTargetTypeClass = function () {
            return getEntityTypeClass(vpgService.getVpgSettingsEntities().Target);
        };

        summaryService.getDefaultTargetDataStoreName = function () {
            var datastore = vpgService.getDefaultTargetDataStore();
            if (_.isNullOrUndefined(datastore)) {
                return null;
            }
            return datastore.DisplayName;
        };

        summaryService.getTargetOrgVdcName = function () {
            return getTargetOrgVdc().VirtualDatacenter.DisplayName;
        };

        summaryService.getServiceProfileName = function () {
            return storageService.getServiceProfileName();
        };

        summaryService.getMinimalJournalLengthInMinutes = function () {
            return storageService.getMinimalJournalLengthInMinutes();
        };

        summaryService.getRPOThresholdInSeconds = function () {
            return storageService.getRPOThresholdInSeconds();
        };

        summaryService.getMaxTestIntervalInMinutes = function () {
            return vpgService.getMaxTestIntervalInMinutes();
        };

        summaryService.getWanCompression = function () {
            return networksService.getWanCompression();
        };

        summaryService.getInitializedSelectedVms = function () {
            return vmsService.getInitializedSelectedVms();
        };

        //region Display conditions
        summaryService.showSummaryHost = function () {
            return !summaryService.isAzure() && !summaryService.isAws() && !_.isNullOrUndefined(summaryService.getTargetHostName());
        };

        summaryService.getIsBackupEnabled = function () {
            return storageService.getIsBackupEnabled();
        };

        summaryService.showTargetDataStore = function () {
            return getTargetSiteType().value === enums.VpgEntityType.VCVpg || !_.isNullOrUndefined(summaryService.getDefaultTargetDataStoreName());
        };

        summaryService.showTargetFolder = function () {
            var isScvmm = summaryService.isScvmm(),
                isVmConfigurable = vpgService.getConfigurationFlags().IsVmFolderConfigurable;

            return !isScvmm || isVmConfigurable;
        };

        summaryService.isUsingVappNetworkMapping = function () {
            return networksService.isUsingVappNetworkMapping();
        };

        summaryService.getDefaultFailoverNetworkName = function () {
            var failoverNetwork = networksService.getDefaultFailoverNetwork();
            if (_.isNullOrUndefined(failoverNetwork)) {
                return;
            }
            return failoverNetwork.DisplayName || failoverNetwork.NetworkName;
        };

        summaryService.getDisableGuestCustomization = function () {
            var recoverySettings = getRecoveryVappSettings();
            return recoverySettings.VCDVappSettings.DisableGuestCustomization;
        };

        summaryService.getDefaultTargetFolderDisplayName = function () {
            var defaultTargetFolder = storageService.getDefaultTargetFolder();
            if(!_.isNullOrUndefined(defaultTargetFolder)){
                return defaultTargetFolder.DisplayName;
            }
            return null;
        };

        summaryService.getDefaultTestNetworkName = function () {
            var testNetwork = networksService.getDefaultTestNetwork();
            if (_.isNullOrUndefined(testNetwork)) {
                return;
            }
            return testNetwork.DisplayName || testNetwork.NetworkName;
        };

        summaryService.getBackupDeletePointRange = function () {
            return getConfigurationBackup().DeleteBackup.RestorePointRange;
        };

        summaryService.getBackupSchedulerRunningTime = function () {
            return getConfigurationBackup().Scheduler.RunningTime;
        };

        summaryService.getBackupSchedulerRetry = function () {
            return getConfigurationBackup().Scheduler.Retry;
        };

        summaryService.showTargetOrgvDC = function () {
            return getTargetSiteType().value === enums.VpgEntityType.VCDvApp;
        };

        summaryService.showNetworkMapping = function () {
            return summaryService.isUsingVappNetworkMapping() && !_.isNullOrUndefined(getTargetOrgVdc());
        };

        summaryService.showServiceProfile = function () {
            return !_.isNullOrUndefined(storageService.getServiceProfile());
        };

        summaryService.showSelectedZORG = function () {
            return !_.isNullOrUndefined(getSelectedZORG());
        };

        summaryService.showBackupTargetDetails = function () {
            return !_.isNullOrUndefined(getBackupTargetDetails());
        };

        //endregion

        function getSecurityGroupsText(securityGroups) {
            if (_.isNullOrUndefined(securityGroups)) {
                return;
            }
            return _.pluck(securityGroups, 'Name').toString();
        }

        function getEntityTypeClass(type) {
            var className;
            switch (type) {
                case enums.VpgEntityType.VCVpg:
                    className = entityClasses.VCVpg;
                    break;
                case enums.VpgEntityType.VCDvApp:
                    className = entityClasses.VCDvApp;
                    break;
                case enums.VpgEntityType.HyperV:
                    className = entityClasses.HyperV;
                    break;
                case enums.VpgEntityType.Aws:
                    className = entityClasses.Aws;
                    break;
                case enums.VpgEntityType.Azure:
                    className = entityClasses.Azure;
                    break;
            }

            return className;
        }

        function getTargetSiteType() {
            return vpgService.getTargetSiteType();
        }

        function getTargetOrgVdc() {
            return vpgService.getTargetOrgVdc();
        }

        function getSelectedZORG() {
            return vpgService.getSelectedZorg();
        }

        function getBackupTargetDetails() {
            return storageService.getBackupTargetDetails();
        }

        function getConfigurationBackup() {
            return storageService.getConfigurationBackup();
        }

        function getPublicCloudFailoverSettings() {
            return publicCloudSettingsService.getPublicCloudFailoverSettings();
        }

        function getPublicCloudFailoverTestSettings() {
            return publicCloudSettingsService.getPublicCloudFailoverTestSettings();
        }

        function getRecoveryVappSettings() {
            return vpgService.getRecoveryVappSettings();
        }
    });

