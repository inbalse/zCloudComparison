'use strict';

angular.module('zvmApp.core')
    .controller('createVPGRecoveryController', function ($scope, $filter, vos, enums, publicCloudVmSettingsFactory,
                                                         recoveryFolderVmSettingsFactory, publicCloudHelper,
                                                         createVpgRecoveryService,
                                                         createVpgRecoveryAwsService,
                                                         createVpgRecoveryNetworksService,
                                                         createVpgRecoveryScriptsService,
                                                         vpgService,
                                                         vmsService,
                                                         networksService,
                                                         publicCloudSettingsService) {

        var awsVpgFailoverCloudSettings = publicCloudSettingsService.getPublicCloudFailoverSettings(),
            awsVpgFailoverTestCloudSettings = publicCloudSettingsService.getPublicCloudFailoverTestSettings();

        var queueAndExecuteCommand = function (item, column, editCommand) {
            editCommand.execute();
            $scope.$emit('wizard:FormValidationChanged');
        };

        $scope.forms = {};
        $scope.recovery = {};
        $scope.partials = {
            aws: 'scripts/core/create_vpg/steps/recovery/partials/publicClouds/cloud-aws.html',
            azure: 'scripts/core/create_vpg/steps/recovery/partials/publicClouds/cloud-azure.html'
        };
        $scope.customOptions = {
            columns: createVpgRecoveryNetworksService.getColumns(),
            showCheckbox: false,
            editCommandHandler: queueAndExecuteCommand
        };
        $scope.groupsExtraSettings = createVpgRecoveryNetworksService.getGroupExtraSettings();

        $scope.onFailoverNetworkChange = function () {
            if (!$scope.data.defaultFailoverNetwork) {
                return;
            }

            createVpgRecoveryNetworksService.failoverNetworkChange($scope.data.defaultFailoverNetwork);
        };

        $scope.onTestNetworkChange = function () {
            if (!$scope.data.defaultTestNetwork) {
                return;
            }

            createVpgRecoveryNetworksService.testNetworkChange($scope.data.defaultTestNetwork);
        };

        $scope.onTargetFolderChange = function () {
            createVpgRecoveryService.changeTargetFolder($scope.data.selectedTargetFolder);
            $scope.$emit('wizard:FormValidationChanged');
        };

        //region ========================== AWS ==========================

        $scope.$watch('forms.recoveryForm.$valid', function (value) {
            $scope.vmSettingsDisabled = createVpgRecoveryService.disableVmSettings(value);
            $scope.$emit('wizard:FormValidationChanged');
        });

        $scope.handlePublicCloudVmSettings = function () {
            publicCloudVmSettingsFactory.openWindow(vpgService.getVpgSettings(), vpgService.getTargetSiteType())
                .then(createVpgRecoveryAwsService.savePublicCloudVMs);
        };

        //pcn failover
        $scope.onFailoverPcnChanged = function () {
            $scope.awsData.failoverPcnData =
                createVpgRecoveryAwsService.getPcnData($scope.awsData.awsFailoverPcn, awsVpgFailoverCloudSettings, false);
            $scope.$broadcast('wizard:hideErrors');
        };

        //pcn failover test
        $scope.onFailoverTestPcnChanged = function () {
            $scope.awsData.failoverTestPcnData =
                createVpgRecoveryAwsService.getPcnData($scope.awsData.awsFailoverTestPcn, awsVpgFailoverTestCloudSettings, true);
            $scope.$broadcast('wizard:hideErrors');
        };

        $scope.onSecurityGroupsChanged = function () {
            createVpgRecoveryAwsService.securityGroupsChange($scope.awsData.failoverPcnData.securityGroups);
            $scope.vmSettingsDisabled = createVpgRecoveryService.disableVmSettings($scope.forms.recoveryForm.$valid);
            $scope.$emit('wizard:FormValidationChanged');
        };

        $scope.onSecurityTestGroupsChanged = function () {
            createVpgRecoveryAwsService.securityTestGroupsChange($scope.awsData.failoverTestPcnData.securityGroups);
            $scope.vmSettingsDisabled = createVpgRecoveryService.disableVmSettings($scope.forms.recoveryForm.$valid);
            $scope.$emit('wizard:FormValidationChanged');
        };

        $scope.onFailoverSubnetChanged = function () {
            createVpgRecoveryAwsService.failoverSubnetChange($scope.awsData.failoverPcnData.subnet);
        };

        $scope.onFailoverTestSubnetChanged = function () {
            createVpgRecoveryAwsService.failoverTestSubnetChange($scope.awsData.failoverTestPcnData.subnet);
        };

        $scope.onSelectedFolInstanceFamily = function () {
            if (createVpgRecoveryAwsService.isDifferentFailoverFamilyInstanceSelected($scope.awsData.selectedFolInstanceFamily)) {
                $scope.awsData.instanceFolList = $scope.awsData.selectedFolInstanceFamily.instances;
                $scope.awsData.selectedFailoverInstanceType = null;
                $scope.onAwsFailoverInstanceTypeDefaultsChanged();
            }
        };

        $scope.onSelectedTestInstanceFamily = function () {
            if (createVpgRecoveryAwsService.isDifferentFailoverTestFamilyInstanceSelected($scope.awsData.selectedTestInstanceFamily)) {
                $scope.awsData.instanceTestList = $scope.awsData.selectedTestInstanceFamily.instances;
                $scope.awsData.selectedTestInstanceType = null;
                $scope.onAwsTestInstanceTypeDefaultsChanged();
            }
        };

        $scope.onAwsFailoverInstanceTypeDefaultsChanged = function () {
            createVpgRecoveryAwsService.instanceTypeDefaultsChange($scope.awsData.selectedFailoverInstanceType);
        };

        $scope.onAwsTestInstanceTypeDefaultsChanged = function () {
            createVpgRecoveryAwsService.testInstanceTypeDefaultsChange($scope.awsData.selectedTestInstanceType);
        };

        var initInstanceLists = function () {
            var targetSiteInfo = vpgService.getTargetSiteInfo();

            $scope.awsData = {};

            $scope.awsData.awsPotentialPcns = targetSiteInfo.PotentialPublicCloudPcns.PotentialPcns;

            $scope.awsData.awsFailoverPcn =
                createVpgRecoveryAwsService.lastAWSFailoverSavedPcn =
                    awsVpgFailoverCloudSettings.Pcn;
            $scope.onFailoverPcnChanged();

            $scope.awsData.awsFailoverTestPcn =
                createVpgRecoveryAwsService.lastAWSTestSavedPcn =
                    awsVpgFailoverTestCloudSettings.Pcn;
            $scope.onFailoverTestPcnChanged();

            if ($scope.data.isPublicCloud) {
                $scope.awsData.familyTypes = publicCloudHelper.createFamilyInstanceList(targetSiteInfo.PotentialPublicCloudInstanceTypeVisualObjects);
                if (!$scope.awsData.selectedFolInstanceFamily) {
                    $scope.awsData.selectedFailoverInstanceType = awsVpgFailoverCloudSettings.PublicCloudInstanceTypeVisualObject;
                    $scope.awsData.selectedFolInstanceFamily = publicCloudHelper.selectFamilyFromInstance($scope.awsData.selectedFailoverInstanceType, $scope.awsData.familyTypes);
                    $scope.awsData.instanceFolList = (_.isNullOrUndefined($scope.awsData.selectedFolInstanceFamily)) ? [] : $scope.awsData.selectedFolInstanceFamily.instances;
                }
                if (!$scope.awsData.selectedTestInstanceFamily) {
                    $scope.awsData.selectedTestInstanceType = awsVpgFailoverTestCloudSettings.PublicCloudInstanceTypeVisualObject;
                    $scope.awsData.selectedTestInstanceFamily = publicCloudHelper.selectFamilyFromInstance($scope.awsData.selectedTestInstanceType, $scope.awsData.familyTypes);
                    $scope.awsData.instanceTestList = (_.isNullOrUndefined($scope.awsData.selectedTestInstanceFamily)) ? [] : $scope.awsData.selectedTestInstanceFamily.instances;
                }
            }
        };

        $scope.securityGroupEvents = {
            onItemSelect: $scope.onSecurityGroupsChanged,
            onItemDeselect: $scope.onSecurityGroupsChanged,
            onSelectAll: $scope.onSecurityGroupsChanged,
            onDeselectAll: $scope.onSecurityGroupsChanged
        };

        $scope.securityTestGroupEvents = {
            onItemSelect: $scope.onSecurityTestGroupsChanged,
            onItemDeselect: $scope.onSecurityTestGroupsChanged,
            onSelectAll: $scope.onSecurityTestGroupsChanged,
            onDeselectAll: $scope.onSecurityTestGroupsChanged
        };

        //region ========================== PrePostScripts ==========================
        $scope.onPreScriptsChange = function () {
            var scriptsSetting = new vos.SingleScriptVisualObject($scope.data.preScriptCommand, $scope.data.preScriptParameters, $scope.data.preScriptTimeout);
            createVpgRecoveryScriptsService.setPreRecoveryScripts(scriptsSetting);
        };

        $scope.onPostScriptsChange = function () {
            var scriptsSetting = new vos.SingleScriptVisualObject($scope.data.postScriptCommand, $scope.data.postScriptParameters, $scope.data.postScriptTimeout);
            createVpgRecoveryScriptsService.setPostRecoveryScripts(scriptsSetting);
        };
        //endregion     ===============================================================


        $scope.onGuestCustomizationChanged = function () {
            createVpgRecoveryService.changeGuestCustomization($scope.recovery.guestCustomization);
        };

        $scope.onToggleCopyNatRulesCheckbox = function () {
            createVpgRecoveryService.onToggleCopyNatRulesCheckbox($scope.data.enableCopyNatServiceDropDown);
            $scope.data.copyNatRuleOption = createVpgRecoveryService.getSelectedNatRule();
        };
        $scope.onCopyNatRulesChanged = function () {
            createVpgRecoveryService.copyNatRulesChange($scope.data.copyNatRuleOption);
        };


        $scope.handleFolderVMSettingsClicked = function () {
            recoveryFolderVmSettingsFactory.openWindow(vmsService.getInitializedSelectedVms(), refreshValidations);
        };

        function refreshValidations() {
            $scope.$emit('wizard:FormValidationChanged');
        }

        function initRecoveryStep() {
            var targetSiteType = vpgService.getTargetSiteType(),
                vpgSettings = vpgService.getVpgSettings(),
                sourceSiteType = vpgService.getSourceSiteType(),
                preRecoveryScripts = createVpgRecoveryScriptsService.getPreRecoveryScripts(),
                postRecoveryScripts = createVpgRecoveryScriptsService.getPostRecoveryScripts(),
                isVcdVapp = vpgService.isVcdVapp(),
                isVcVpg = vpgService.isVCVpg(),
                isZssp = vpgService.isZssp(),
                isAws = vpgService.isAws(),
                isAzure = vpgService.isAzure(),
                isPublicCloud = isAws || isAzure;

            $scope.data = {
                targetSiteType: targetSiteType,
                targetHost: vpgService.getTargetHost(),
                sourceSiteType: sourceSiteType,
                enableCopyNatServiceDropDown: networksService.isCopyNatRulesAvailable() && !vpgService.isReverse(),
                copyNatServiceAvailable: networksService.isCopyNatServiceAvailable(),
                copyNatRulesCollection: networksService.getCopyNatRulesOptions(),
                copyNatRuleOption: createVpgRecoveryService.getSelectedNatRule(),
                isUsingVappNetworkMapping: networksService.isUsingVappNetworkMapping(),
                isSourceVcd: vpgService.isSourceVcd(),
                isPortal: isZssp,
                isAws: isAws,
                isAzure: isAzure,
                isPublicCloud: isPublicCloud,
                isVmFolderConfigurable: !isPublicCloud && isVcVpg && !isZssp && vmsService.isVmFolderConfigurable(),
                isVcdVapp: isVcdVapp,
                isReverse: vpgService.isReverse(),
                showVmFolder: !isPublicCloud && (!networksService.isUsingVappNetworkMapping() || isVcVpg) && !isZssp && vmsService.isVmFolderConfigurable(),
                isPrePostScriptsEnabled: vpgService.getTargetSiteInfo().IsPrePostScriptsEnabled,
                isFolderVMsettingsDisable: !isPublicCloud && sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp,
                selectedTargetFolder: createVpgRecoveryService.getDefaultTargetFolder(),
                isFirstAwsLoadingFailover: vpgService.isInEditMode(),
                defaultFailoverNetwork: createVpgRecoveryNetworksService.getDefaultFailoverNetwork(),
                defaultTestNetwork: createVpgRecoveryNetworksService.getDefaultTestNetwork(),
                preScriptCommand: preRecoveryScripts.Command,
                preScriptParameters: preRecoveryScripts.Parameters,
                preScriptTimeout: preRecoveryScripts.TimeoutInSeconds,
                postScriptCommand: postRecoveryScripts.Command,
                postScriptParameters: postRecoveryScripts.Parameters,
                postScriptTimeout: postRecoveryScripts.TimeoutInSeconds,
                potentialNetworks: [],
                potentialFolders: []
            }
            ;

            if (isPublicCloud && publicCloudSettingsService.hasRecoveryCloudSettings()) {
                createVpgRecoveryAwsService.initAwsLists();
                initInstanceLists();
            }

            if (vpgSettings.Config.RecoveryVappSettings && vpgSettings.Config.RecoveryVappSettings.VCDVappSettings) {
                $scope.recovery.guestCustomization = !vpgSettings.Config.RecoveryVappSettings.VCDVappSettings.DisableGuestCustomization;
            }

            if (networksService.isUsingVappNetworkMapping()) {
                $scope.mappingData = createVpgRecoveryService.processOrgVdcMappings();
            }

            if (!isPublicCloud) {
                var computeResources = vpgService.getComputeResources();
                if (!_.isNullOrUndefined(computeResources)) {
                    $scope.data.potentialNetworks = computeResources.Networks;
                    $scope.data.potentialFolders = computeResources.PotentialFolders;
                }
            }
        }

        initRecoveryStep();
    });
