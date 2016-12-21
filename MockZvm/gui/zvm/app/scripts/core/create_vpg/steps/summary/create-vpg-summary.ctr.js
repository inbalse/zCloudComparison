'use strict';

angular.module('zvmApp.core')
    .controller('createVPGSummaryController', function ($scope, $translate, createVpgSummaryService) {
        $scope.data = {};

        initSummary();

        function initSummary() {
            initGeneral();
            initReplication();
            initRecovery();
            initBackup();
            initVms();
        }

        function initGeneral() {
            $scope.data.vpgName = createVpgSummaryService.getVpgName();
            $scope.data.priority = createVpgSummaryService.getVpgPriority();
            $scope.data.sourceSiteClass = createVpgSummaryService.getSourceTypeClass();
            $scope.data.targetSiteClass = createVpgSummaryService.getTargetTypeClass();
            $scope.data.ownersSiteName = createVpgSummaryService.getSiteName();
            $scope.data.targetSiteName = createVpgSummaryService.getTargetSiteName();
        }

        function initReplication() {
            $scope.data.showNetworkMapping = createVpgSummaryService.showNetworkMapping();
            $scope.data.minimalJournalLengthInMinutes = createVpgSummaryService.getMinimalJournalLengthInMinutes();
            $scope.data.rpoThressholdInSeconds = createVpgSummaryService.getRPOThresholdInSeconds();
            $scope.data.maxTestIntervalInMinutes = createVpgSummaryService.getMaxTestIntervalInMinutes();
            $scope.data.wanCompressionEnabled = createVpgSummaryService.getWanCompression();

            if (createVpgSummaryService.showSelectedZORG()) {
                $scope.data.showSelectedZORG = true;
                $scope.data.selectedZORGName = createVpgSummaryService.getSelectedZORGName();
            }

            if (createVpgSummaryService.showSummaryHost()) {
                $scope.data.showSummaryHost = true;
                $scope.data.targetHostName = createVpgSummaryService.getTargetHostName();
            }

            if (createVpgSummaryService.showTargetDataStore()) {
                $scope.data.showTargetDataStore = true;
                $scope.data.targetDataStoreName = createVpgSummaryService.getDefaultTargetDataStoreName();
            }

            if (createVpgSummaryService.showTargetOrgvDC()) {
                $scope.data.showTargetOrgvDC = true;
                $scope.data.targetOrgVdcName = createVpgSummaryService.getTargetOrgVdcName();
            }

            if (createVpgSummaryService.showServiceProfile()) {
                $scope.data.showServiceProfile = true;
                $scope.data.serviceProfileName = createVpgSummaryService.getServiceProfileName();
            }
        }

        function initRecovery() {

            if (createVpgSummaryService.isAws()) {
                initAws();
            } else if(createVpgSummaryService.isAzure()){
              initAzure();
            } else {
                if (createVpgSummaryService.isVCDvApp()) {
                    $scope.data.isVCDvApp = true;

                    $scope.data.disableGuestCustomization = createVpgSummaryService.getDisableGuestCustomization();
                }

                $scope.data.isUsingVappNetworkMapping = createVpgSummaryService.isUsingVappNetworkMapping();

                if (!$scope.data.isUsingVappNetworkMapping) {
                    $scope.data.failoverNetworkName = createVpgSummaryService.getDefaultFailoverNetworkName();
                    $scope.data.testNetworkName = createVpgSummaryService.getDefaultTestNetworkName();
                }
            }


            if (createVpgSummaryService.showTargetFolder()) {
                $scope.data.showTargetFolder = true;

                if (createVpgSummaryService.isVCVpg()) {
                    $scope.data.showVCVpgFolder = true;
                    $scope.data.defaultTargetFolder = createVpgSummaryService.getDefaultTargetFolderDisplayName();
                }
            }
        }

        function initBackup() {
            $scope.data.storageText = createVpgSummaryService.isScvmm() ? $translate.instant('CREATE_VPG_SUMMARY.STORAGE') : $translate.instant('CREATE_VPG_SUMMARY.DATASTORE');
            if (createVpgSummaryService.getIsBackupEnabled()) {
                $scope.data.isBackupEnabled = true;

                if (createVpgSummaryService.showBackupTargetDetails()) {
                    $scope.data.showBackupDetails = true;
                    $scope.data.backupDisplayName = createVpgSummaryService.getSelectedBackupTargetName();
                }

                $scope.data.backupRestorePointRange = createVpgSummaryService.getBackupDeletePointRange();
                $scope.data.backupSchedulerRunningTime = createVpgSummaryService.getBackupSchedulerRunningTime();
                $scope.data.backupSchedulerRetry = createVpgSummaryService.getBackupSchedulerRetry();

            }
        }

        function initVms() {
            $scope.data.selectedVms = createVpgSummaryService.getInitializedSelectedVms();
            $scope.data.totalProvisionedSpace = createVpgSummaryService.getTotalProvisionedSpace();
        }

        function initAws() {
            $scope.data.isAws = true;
            initPublicCloud();
        }

        function initAzure(){
            $scope.data.isAzure = true;
            initPublicCloud();
        }

        function initPublicCloud(){
            $scope.data.isPublicCloud = true;

            //Failover
            $scope.data.failoverPcnName= createVpgSummaryService.getPublicCloudFailoverPcnName();
            $scope.data.failoverSubnetName = createVpgSummaryService.getPublicCloudFailoverSubnetName();
            $scope.data.failoverSecurityGroups = createVpgSummaryService.getPublicCloudFailoverSecurityGroupNames();
            $scope.data.failoverInstanceFamilyName = createVpgSummaryService.getPublicCloudFailoverInstanceFamilyName();
            $scope.data.failoverInstanceType = createVpgSummaryService.getPublicCloudFailoverInstanceType();

            //Failover test
            $scope.data.failoverTestPcnName = createVpgSummaryService.getPublicCloudFailoverTestPcnName();
            $scope.data.failoverTestSubnetName = createVpgSummaryService.getPublicCloudFailoverTestSubnetName();
            $scope.data.failoverTestSecurityGroups = createVpgSummaryService.getPublicCloudFailoverTestSecurityGroupNames();
            $scope.data.failoverTestInstanceFamilyName = createVpgSummaryService.getPublicCloudFailoverTestInstanceFamilyName();
            $scope.data.failoverTestInstanceType = createVpgSummaryService.getPublicCloudFailoverTestInstanceType();
        }

    });
