'use strict';

angular.module('zvmApp.core')
    .controller('vpgParametersController', function ($scope, enums, dataCollectionFactory, vpgDetailsFactory, $translate, zAlertFactory) {
        $scope.loading = true;

        $scope.setData = function (result) {
            var shortEnum = enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum;
            $scope.vpgData = result;

            $scope.RetentionPolicy = $scope.vpgData.VpgConfiguration.Configuration.IsBackupEnabled ? shortEnum.Extended : shortEnum.Standard;
            $scope.isScvmm = $scope.vpgData.Entities.Target === enums.VpgEntityType.HyperV;
            $scope.textLabel = $scope.isScvmm ? $translate.instant('VPG_DETAILS.PARAMETERS.STORAGE_PROFILE') : $translate.instant('VPG_DETAILS.PARAMETERS.RECOVERY_DATASTORE');
            $scope.jornalSizeLabel = $scope.isScvmm ? $translate.instant('VPG_DETAILS.PARAMETERS.JOURNAL_SIZE_STORAGE') : $translate.instant('VPG_DETAILS.PARAMETERS.JOURNAL_SIZE_DATASTORE');
            $scope.isVcToVc = $scope.vpgData.Entities.Target === enums.VpgEntityType.VCVpg && $scope.vpgData.Entities.Target === enums.VpgEntityType.VCVpg;
            $scope.isPublicCloud = $scope.vpgData.Entities.Target === enums.VpgEntityType.Aws || $scope.vpgData.Entities.Target === enums.VpgEntityType.Azure;
            $scope.isAws = $scope.vpgData.Entities.Target === enums.VpgEntityType.Aws;
            $scope.isVcd = $scope.vpgData.Entities.Target === enums.VpgEntityType.VCDvApp;
            $scope.isSourceVcd = $scope.vpgData.Entities.Source === enums.VpgEntityType.VCDvApp;
            $scope.isVcdToVcd = $scope.vpgData.Entities.Source === enums.VpgEntityType.VCDvApp && $scope.vpgData.Entities.Target === enums.VpgEntityType.VCDvApp;
            $scope.copyNatOption = $scope.vpgData.VpgConfiguration.Configuration.CopyNatRulesOptions;
            $scope.copyNatAvailable = $scope.vpgData.VpgConfiguration.Configuration.CopyNatServiceAvailable;
            $scope.copyNatOptionLabel = $scope.copyNatOption ? _.result(_.find(dataCollectionFactory.COPY_NAT_SERVICE_COLLECTION, 'value', $scope.copyNatOption), 'label') : '';

            $scope._updateZorgName($scope.vpgData.SitesInfo);

            $scope.AwsFailoverGroupsBuilder = '';
            $scope.AwsFailoverTestGroupsBuilder = '';

            if ($scope.vpgData.VpgConfiguration.Defaults.RecoveryCloudSettings !== null) {
                $scope.AwsFailoverGroupsCount = $scope.vpgData.VpgConfiguration.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.SecurityGroups.length;
                $scope.AwsFailoverTestGroupsCount = $scope.vpgData.VpgConfiguration.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.SecurityGroups.length;
                $scope.failoverInstance = $scope.vpgData.VpgConfiguration.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.PublicCloudInstanceTypeVisualObject.Name;
                $scope.testInstance = $scope.vpgData.VpgConfiguration.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.PublicCloudInstanceTypeVisualObject.Name;

                _.each($scope.vpgData.VpgConfiguration.Defaults.RecoveryCloudSettings.CloudVpgFailoverCloudSettings.SecurityGroups, function (group) {
                    $scope.AwsFailoverGroupsBuilder += group.Name + ', ';
                });

                _.each($scope.vpgData.VpgConfiguration.Defaults.RecoveryCloudSettings.CloudVpgFailoverTestCloudSettings.SecurityGroups, function (group) {
                    $scope.AwsFailoverTestGroupsBuilder += group.Name + ', ';
                });
            }

            $scope.journalSLAinMinutes = $scope.vpgData.VpgConfiguration.Configuration.MinimalJournalLenghtInMinutes;
            $scope.loading = false;
        };

        vpgDetailsFactory.registerToDetails($scope).then(null, null, $scope.setData);

        $scope.AwsGroupsShow = function (groupType) {
            var groups, title;
            if (groupType === 'failover') {
                title = $translate.instant('VPG_DETAILS.PARAMETERS.FAILOVER_MOVE_SECURITY_GROUPS');
                groups = $scope.AwsFailoverGroupsBuilder;
            } else {
                title = $translate.instant('VPG_DETAILS.PARAMETERS.FAILOVER_TEST_SECURITY_GROUPS');
                groups = $scope.AwsFailoverTestGroupsBuilder;
            }
            zAlertFactory.info(title, groups);
        };

        $scope._updateZorgName = function (sitesInfo) {
            if (angular.isDefined(sitesInfo)) {
                if (sitesInfo.CustomerName && sitesInfo.CustomerName.toLowerCase() !== 'n/a') {
                    $scope.showZertoOrg = true;
                    $scope.zorgName = sitesInfo.CustomerName;
                } else {
                    $scope.showZertoOrg = false;
                }
            }
        };
    });
