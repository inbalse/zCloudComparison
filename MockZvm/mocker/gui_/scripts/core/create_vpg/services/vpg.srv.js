'use strict';

angular.module('zvmApp.core')
    .service('vpgService', function (createVPGModel, vos, zertoServiceFactory, enums, globalStateModel, storageService,
                                     dataCollectionFactory, networksService, helperService, zAlertFactory) {

        var vpgService = this;

        vpgService.resetData = function () {
            createVPGModel.reset();
        };

        vpgService.setVpgSettings = function (vpgSettings) {
            createVPGModel.setVpgSettings(vpgSettings);
        };

        vpgService.getVpgSettings = function () {
            return createVPGModel.getVpgSettings();
        };

        vpgService.getVpgConfig = function () {
            return createVPGModel.getConfig();
        };

        vpgService.updateVappNetworkMappingPotentials = function (result) {
            createVPGModel.setPotentialMappingNetworks(result.PotentialRecoveryNetworks);
            createVPGModel.setPotentialReverseMappingNetworks(result.PotentialReverseTestNetworks);
        };

        vpgService.getVcdVappSettings = function () {
            return createVPGModel.getVcdVappSettings();
        };

        vpgService.setSiteName = function (siteName) {
            createVPGModel.setSiteName(siteName);
        };
        vpgService.getSiteName = function () {
            return createVPGModel.getSiteName();
        };

        vpgService.getSourceSiteType = function () {
            return createVPGModel.getSourceSiteType();
        };

        vpgService.setSourceSiteType = function (siteType) {
            return createVPGModel.setSourceSiteType({sourceType: siteType});
        };

        vpgService.setIsSourceVcd = function (value) {
            createVPGModel.setIsSourceVcd(value);
        };

        vpgService.setIsZssp = function (isZssp) {
            createVPGModel.setIsZssp(isZssp);
        };

        vpgService.clearVpgObject = function () {
            createVPGModel.setVpgSettings(null);
        };

        vpgService.setIsInEditMode = function (isEdit) {
            createVPGModel.setIsInEditMode(isEdit);
        };

        vpgService.isInEditMode = function () {
            return createVPGModel.isInEditMode();
        };

        vpgService.setIsReverse = function (isReverse) {
            createVPGModel.setIsReverse(isReverse);
        };
        vpgService.isReverse = function () {
            return createVPGModel.isReverse();
        };
        vpgService.isZssp = function () {
            return createVPGModel.isZssp();
        };
        vpgService.isScvmm = function () {
            return createVPGModel.isScvmm();
        };

        vpgService.isSourceVcd = function () {
            return createVPGModel.isSourceVcd();
        };
        vpgService.isVcdVapp = function () {
            return createVPGModel.isVcdVapp();
        };
        vpgService.isVCVpg = function () {
            return createVPGModel.isVCVpg();
        };

        vpgService.isCompressionConfigurable = function () {
            return createVPGModel.isCompressionConfigurable();
        };
        vpgService.isAws = function () {
            return createVPGModel.isAws();
        };
        vpgService.isAzure = function () {
            return createVPGModel.isAzure();
        };
        vpgService.isPublicCloud = function () {
            return vpgService.isAzure() || vpgService.isAws();
        };

        vpgService.getOneToManyState = function () {
            var siteInfo = vpgService.getInitialSitesInfo();
            return {isAllowed: siteInfo.AllowOneToMany, reason: siteInfo.DisallowedOneToManyReason};
        };

        vpgService.setDefaultBootOrder = function () {
            // set default bootOrder group only once
            if (_.isNullOrUndefined(createVPGModel.getBootOrderGroups())) {
                createVPGModel.setBootOrderGroups([{
                    Machines: [],
                    BootGroupIdentifier: {Guid: '00000000-0000-0000-0000-000000000000'},
                    Name: 'Default',
                    Settings: {BootDelay: 0, ShutdownDelay: 0, WaitForTools: false}
                }]);
            }
        };
        vpgService.setWanCompression = function (value) {
            createVPGModel.setWanCompression(value);
        };

        vpgService.getVpgName = function () {
            return createVPGModel.getVpgName();
        };
        vpgService.setVpgName = function (vpgName) {
            createVPGModel.setVpgName(vpgName);
        };

        vpgService.getPriority = function () {
            return createVPGModel.getPriority();
        };
        vpgService.setPriority = function (priority) {
            createVPGModel.setPriority(priority);
        };

        vpgService.initZORG = function (zertoOrganizationIdentifier) {
            if (vpgService.isZssp()) {
                return;
            }

            if (_.isNullOrUndefined(zertoOrganizationIdentifier)) {
                return;
            }
            var selectedZorg = _.find(createVPGModel.getPotentialZertoOrganization(), function (z) {
                return _.isEqual(z.Identifier, zertoOrganizationIdentifier);
            });
            vpgService.setSelectedZorg(selectedZorg);
        };

        vpgService.getSelectedZorg = function () {
            return createVPGModel.getSelectedZorg();
        };
        vpgService.setSelectedZorg = function (zorg) {
            createVPGModel.setSelectedZorg(zorg);
        };

        vpgService.getZertoOrganizationIdentifier = function () {
            return createVPGModel.getZertoOrganizationIdentifier();
        };
        vpgService.setZertoOrganizationIdentifier = function (organizationIdentifier) {
            createVPGModel.setZertoOrganizationIdentifier(organizationIdentifier);
        };

        vpgService.getPotentialZertoOrganization = function () {
            return createVPGModel.getPotentialZertoOrganization();
        };

        vpgService.setTargetSite = function (target) {
            createVPGModel.setTargetSite(target);
        };
        vpgService.getTargetSite = function () {
            return createVPGModel.getTargetSite();
        };

        vpgService.getTargetSiteInfo = function () {
            return createVPGModel.getTargetSiteInfo();
        };

        vpgService.getTargetSiteType = function () {
            return createVPGModel.getTargetSiteType();
        };
        vpgService.setTargetSiteType = function (siteType) {
            createVPGModel.setTargetSiteType(siteType);
        };

        vpgService.getTargetHost = function () {
            return createVPGModel.getTargetHost();
        };
        vpgService.setTargetHost = function (targetHost) {
            return createVPGModel.setTargetHost(targetHost);
        };

        vpgService.getDefaultTargetDataStore = function () {
            return createVPGModel.getDefaultTargetDataStore();
        };
        vpgService.setDefaultTargetDataStore = function (targetDataStore) {
            createVPGModel.setDefaultTargetDataStore(targetDataStore);
        };

        vpgService.getComputeResources = function () {
            return createVPGModel.getComputeResources();
        };
        vpgService.setComputeResources = function (computeResource) {
            createVPGModel.setComputeResources(computeResource);
        };

        vpgService.getPotentialTargetHosts = function () {
            return createVPGModel.getPotentialTargetHosts();
        };
        vpgService.getPotentialSiteTypes = function () {
            return createVPGModel.getPotentialSiteTypes();
        };
        vpgService.getTargetOrgVdc = function () {
            return createVPGModel.getTargetOrgVdc();
        };
        vpgService.getInitialSitesInfo = function () {
            return createVPGModel.getInitialSitesInfo();
        };

        vpgService.getTargetComputeResource = function () {
            return createVPGModel.getConfigDefaults().TargetComputeResource;
        };

        vpgService.getMaxTestIntervalInMinutes = function () {
            return createVPGModel.getMaxTestIntervalInMinutes();
        };

        vpgService.initTargetSiteTypeCollection = function (targetSite) {
            var types = [];
            if (targetSite.VirtualizationProviderType === enums.VpgEntityType.HyperV) {
                types.push({type: 'HyperV', value: enums.VpgEntityType.HyperV});
            }
            if (targetSite.VirtualizationProviderType === enums.VpgEntityType.Aws) {
                types.push({type: 'AWS', value: enums.VpgEntityType.Aws});
            }
            if (targetSite.VirtualizationProviderType === enums.VpgEntityType.Azure) {
                types.push({type: 'Azure', value: enums.VpgEntityType.Azure});
            }
            if (targetSite.IsVCDEnabled) {
                types.push({type: 'vCD', value: enums.VpgEntityType.VCDvApp});
            }
            if (targetSite.IsVCenterEnabled) {
                types.push({type: 'VC', value: enums.VpgEntityType.VCVpg});
            }
            createVPGModel.setPotentialSiteTypes(types);
        };
        vpgService.getDefaultVPGSettings = function (targetSite, type) {
            //if the user changes the target site type we need to clear some fields
            createVPGModel.setTargetOrgVdc(null);
            createVPGModel.setTargetHost(null);

            var promise;

            if (vpgService.isSourceVcd()) {
                promise = zertoServiceFactory.GetDefaultSettingsForNewProtectionGroupVCDVappContext(createVPGModel.getSelectedVcdVapp().Vapp.VcdVappIdentifier, type, targetSite.SiteId);
            } else {
                promise = zertoServiceFactory.GetDefaultSettingsForNewProtectionGroup(targetSite.SiteId, type);
            }

            return promise.then(function (result) {
                createVPGModel.setVpgDefaultSettingIsRejected(false);
                onGotDefaultSettings(result);
            }, function (error) {
                createVPGModel.setVpgDefaultSettingIsRejected(true);
                zAlertFactory.fail('Error', error.faultString);
            });
        };

        vpgService.getRecoveryComputeResources = function (protectionGroupIdentifier, targetSiteOwnersIdentifier, targetHostComputeResourceIdentifier) {
            return createVPGModel.isReverse() ?
                zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(protectionGroupIdentifier, targetHostComputeResourceIdentifier) :
                zertoServiceFactory.GetRecoveryComputeResource(protectionGroupIdentifier, targetSiteOwnersIdentifier, targetHostComputeResourceIdentifier);
        };

        vpgService.getRecoveryComputeResourcesBulk = function (baseComputeResourceIdentifiers) {
            var protectionGroupId = vpgService.getProtectionGroupId(),
                targetSite = vpgService.getTargetSite();

            return vpgService.isReverse() ?
                zertoServiceFactory.GetRecoveryComputeResourceForReverseConfigBulk(protectionGroupId, baseComputeResourceIdentifiers) :
                zertoServiceFactory.GetRecoveryComputeResourceBulk(protectionGroupId, targetSite.OwnersId.Id, baseComputeResourceIdentifiers);
        };

        vpgService.applyRecoveryComputeResource = function (computedResources) {
            vpgService.setComputeResources(computedResources);
            networksService.setSelectedDefaultNetworks();
            createVPGModel.setSelectedDataStore();
            createVPGModel._applyNewHostSelection();
        };

        vpgService.setVappIdentifer = function (id) {
            createVPGModel.setVappIdentifer(id);
        };
        vpgService.getVappIdentifier = function () {
            return createVPGModel.getVappIdentifier();
        };
        vpgService.setOptionalVmIdToAdd = function (id) {
            createVPGModel.setOptionalVmIdToAdd(id);
        };
        vpgService.getOptionalVmIdToAdd = function () {
            return createVPGModel.getOptionalVmIdToAdd();
        };

        vpgService.setInitSingleSiteType = function (value) {
            createVPGModel.setInitSingleSiteType(value);
        };
        vpgService.getInitSingleSiteType = function () {
            return createVPGModel.getInitSingleSiteType();
        };

        vpgService.getSelectedTestPeriod = function () {
            return createVPGModel.getSelectedTestPeriod();
        };
        vpgService.setSelectedTestPeriod = function (testPeriod) {
            createVPGModel.setSelectedTestPeriod(testPeriod);
        };
        vpgService.getDefaultTestPeriodCollection = function () {
            return dataCollectionFactory.TEST_PERIOD;
        };


        vpgService.setProtectionGroupId = function (id) {
            createVPGModel.setProtectionGroupId(id);
        };

        vpgService.getProtectionGroupId = function () {
            return createVPGModel.getProtectionGroupId();
        };

        vpgService.initSelectedVmsHandler = function (vms) {
            _.each(vms, function (vm) {
                createVPGModel.addVmToSelectedVms(vm);
            });

            applyAllDefaultVmSettings(vms);
            vms = createVPGModel.getInitializedSelectedVms();

            if (createVPGModel.data.defaultVpgSettings.Entities.Target !== enums.VpgEntityType.VCDvApp) {
                networksService.initNicsPerVms(vms);
            } else {
                networksService.initVCDNicsList(vms);
            }
            storageService.initVolumes(vms);
        };

        vpgService.getTotalProvisionedSpace = function () {
            return createVPGModel.getTotalProvisionedSpace();
        };

        vpgService.getVpgSettingsEntities = function () {
            return vpgService.getVpgSettings().Entities;
        };

        vpgService.getConfigurationFlags = function () {
            return createVPGModel.getConfigurationFlags();
        };

        vpgService.getRecoveryVappSettings = function () {
            return createVPGModel.getRecoveryVappSettings();
        };

        vpgService.getScriptingSettings = function () {
            return createVPGModel.getScriptingSettings();
        };

        vpgService.setScriptingSettings = function (scriptingSettings) {
            createVPGModel.setScriptingSettings(scriptingSettings);
        };

        vpgService.setEditValidationFlags = function (validationFlags) {
            createVPGModel.setEditValidationFlags(validationFlags);
        };
        vpgService.setCreateValidationFlags = function (validationFlags) {
            createVPGModel.setCreateValidationFlags(validationFlags);
        };

        vpgService.getTargetSiteTypes = function () {
            return createVPGModel.getTargetSiteTypes();
        };
        vpgService.setTargetSiteTypes = function (targetSiteTypes) {
            createVPGModel.setTargetSiteTypes(targetSiteTypes);
        };

        vpgService.isVappDropdownEnabledFunc = function () {
            return !createVPGModel.isInEditMode();
        };
        vpgService.isVCDToVCD = function () {
            return createVPGModel.isVCDToVCD();
        };

        vpgService.applyTargetVDC = function (clear, targetOrgVdc, newVms) {

            if (!targetOrgVdc) {
                return;
            }

            var initializedSelectedVms = createVPGModel.getInitializedSelectedVms();
            var vpgSettings = createVPGModel.getVpgSettings();
            var config = createVPGModel.getConfig();
            var protectionGroupId = createVPGModel.getProtectionGroupId();

            //set potential networks for the next step
            vpgService.setComputeResources({Networks: targetOrgVdc.PotentialVCDVappNetworks});

            if (clear) {
                if (!_.isEmpty(initializedSelectedVms)) {
                    if (!createVPGModel.isUsingVappNetworkMapping()) {
                        networksService.vcdClearVMsNetworks(initializedSelectedVms);
                    }
                    storageService.vcdClearVMsVolumes(initializedSelectedVms);
                }
                networksService.clearVDCNetworks();
            }

            networksService.setSelectedDefaultNetworks(newVms);

            if (!config.RecoveryVappSettings) {
                config.RecoveryVappSettings = new vos.VPGDetailsRecoveryVappSettings();
            }
            if (!config.RecoveryVappSettings.VCDVappSettings) {
                config.RecoveryVappSettings.VCDVappSettings = new vos.VPGDetailsRecoveryVCDVappSettings();
            }

            config.RecoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter = targetOrgVdc.VirtualDatacenter;
            config.RecoveryVappSettings.VCDVappSettings.VCDVAppNetworks = targetOrgVdc.PotentialVCDVappNetworks;


            //TODO: add unit test if clear is true change default storage profile even if it already exists
            if (vpgSettings.ConfigurationFlags.IsStorageProfileEnabled) {
                var vmsIdentifierList = _.pluck(config.VirtualMachines, 'InternalVirtualMachineId');
                storageService.getDefaultStorageProfileAndApply(config.OwnersId, protectionGroupId, targetOrgVdc.VirtualDatacenter.Id, vmsIdentifierList, clear);
            }

            if (createVPGModel.isUsingVappNetworkMapping()) {
                if (createVPGModel.isReverse()) {
                    zertoServiceFactory.GetReverseVCD2VCDPotentialOrgNetworks(
                        config.OwnersId,
                        vpgSettings.ProtectionGroupId,
                        config.RecoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter.Id)
                        .then(vpgService.updateVappNetworkMappingPotentials);
                } else {
                    zertoServiceFactory.GetVCD2VCDPotentialOrgNetworks(
                        config.OwnersId,
                        config.ProtectedVappSettings.VCDVappSettings.OrgVirtualDatacenter.Id,
                        vpgSettings.ProtectionGroupId,
                        config.RecoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter.Id)
                        .then(vpgService.updateVappNetworkMappingPotentials);
                }
                zertoServiceFactory.GetVCD2VCDInitialNetworksMapping(
                    vpgSettings.Config.OwnersId,
                    vpgSettings.ProtectionGroupId,
                    vpgSettings.Config.ProtectedVappSettings.VCDVappSettings.VCDVappId).then(function (result) {
                    vpgSettings.Config.RecoveryVappSettings.VCDVappSettings.OrgVdcNetworkMapping = result;
                });
            }
        };

        vpgService.handleChangingDefaultValues = function () {
            return createVPGModel.handleChangingDefaultValues();
        };

        vpgService.setInitialSiteInfo = function (siteInfo) {
            createVPGModel.setInitialSiteInfo(siteInfo);
        };

        vpgService.initSourceSiteTypeCollection = function (siteInfo) {
            createVPGModel.initSourceSiteTypeCollection(siteInfo);
        };

        vpgService.getEntitySource = function () {
            return createVPGModel.getEntitySource();
        };
        vpgService.getEntityTarget = function () {
            return createVPGModel.getEntityTarget();
        };

        vpgService.setBackupTargetDetails = function (backupDetails) {
            createVPGModel.setBackupTargetDetails(backupDetails);
        };

        vpgService.clearReplicationStep = function () {
            createVPGModel.setTargetOrgVdc(null);
            createVPGModel.setTargetHost(null);
            createVPGModel.setTargetSite(null);
            createVPGModel.setTargetSiteType(null);
            vpgService.setSelectedZorg(null);
            createVPGModel.setPotentialZertoOrganization([]);
        };

        function onGotDefaultSettings(result) {

            createVPGModel.initVpgSettings(result);
            var initializedSelectedVms = createVPGModel.getInitializedSelectedVms();
            var selectedVms = createVPGModel.getSelectedVms();

            // BE doesn't provide us with default folder in hyperV
            if (createVPGModel.isScvmm()) {
                createVPGModel.initDefaultFolderInHyperV();
                storageService.applyDefaultFolder(initializedSelectedVms, storageService.getDefaultTargetFolder());
            }

            storageService.initServiceProfile();

            _.each(initializedSelectedVms, function (vm) {
                vm._isNewVm = true;
            });

            //For some reason the backend default copy nat rules is option 2, by default it should be don't copy

            if (createVPGModel.isInEditMode()) {
                createVPGModel.setCopyNatRulesAvailable(result.Config.Configuration.CopyNatRulesOptions !== enums.CopyNatRulesOptions.DontCopy);
            } else {
                networksService.setCopyNatRules(enums.CopyNatRulesOptions.DontCopy);
                createVPGModel.setCopyNatRulesAvailable(false);
            }

            if (!createVPGModel.isSourceVcd()) {
                //now after we know the target site and target site type
                //we can get the default VMs settings
                helperService.initSelectedVMs(selectedVms, vpgService.getTargetSiteType(), vpgService.getTargetSite(), vpgService.getProtectionGroupId())
                    .then(vpgService.initSelectedVmsHandler);

            } else if (vpgService.isAws() || vpgService.isAzure()) {
                storageService.initVolumes(initializedSelectedVms);
            }

            createVPGModel.data.defaultJournal = storageService.initJournalObject(storageService.getMinimalJournalLengthInMinutes());
            createVPGModel.data.defaultFailoverNetwork = null;
            createVPGModel.data.defaultTestNetwork = null;
            createVPGModel.data.isUsingVappNetworkMapping = (createVPGModel.checkOrgVirtualDatacenterExists() || createVPGModel.isReverse()) &&
                createVPGModel.data.defaultVpgSettings.Entities.Source === enums.VpgEntityType.VCDvApp && createVPGModel.data.defaultVpgSettings.Entities.Target === enums.VpgEntityType.VCDvApp;
            createVPGModel.initSelectedZorg();
        }

        function applyAllDefaultVmSettings(vms) {
            vms = vms ? vms : createVPGModel.getInitializedSelectedVms();
            var vpgSettings = createVPGModel.getVpgSettings();
            var defaultConfig = createVPGModel.getConfigDefaults();

            if (defaultConfig.FailoverNetwork) {
                networksService.applyDefaultFailoverNetwork(vms, defaultConfig.FailoverNetwork);
            }
            if (defaultConfig.TestNetwork) {
                networksService.applyDefaultTestNetwork(vms, defaultConfig.TestNetwork);
            }

            if (defaultConfig.FailoverVCDVAppNetwork) {
                networksService.applyDefaultVCDFailoverNetwork(vms, defaultConfig.FailoverVCDVAppNetwork);
            }
            if (defaultConfig.TestVCDVAppNetwork) {
                networksService.applyDefaultVCDTestNetwork(vms, defaultConfig.TestVCDVAppNetwork);
            }

            if (defaultConfig.TargetDatastore) {
                storageService.applyDefaultDatastore(vms, defaultConfig.TargetDatastore);
            }

            if (defaultConfig.TargetComputeResource) {
                networksService.applyDefaultHost(vms, defaultConfig.TargetComputeResource);
            }

            if (defaultConfig.TargetFolder) {
                storageService.applyDefaultFolder(vms, defaultConfig.TargetFolder);
            }

            if (vpgSettings.Entities.Target === enums.VpgEntityType.VCDvApp) {
                vpgService.applyTargetVDC(false, storageService.getTargetOrgVdc(), vms);
            }
            storageService.applyDefaultJournalLimits(vms);
            storageService.applyDefaultJournalDatastore();
        }
    });
