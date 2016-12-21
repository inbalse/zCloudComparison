'use strict';

angular.module('zvmApp.core')
    .service('createVpgInitDataService', function ($q, vpgService, vmsService, networksService, storageService, globalStateModel,
                                                   helperService, createVPGHelperFactory, zertoServiceFactory, enums, zAlertFactory, vos) {

            //Optional id is a pre selected vm or vApp to add to the vpg

            var initDataService = this;

            initDataService.init = function (isEdit, isReverse, optionalId) {
                vpgService.resetData();
                vpgService.setIsZssp(globalStateModel.data.IsPortal);
                vpgService.setIsInEditMode(isEdit);
                vpgService.setIsReverse(isReverse);
                vpgService.setCreateValidationFlags(new vos.VPGConfigurationCreateModifiersVisualObject(!isReverse)); // true is not reverse
                vpgService.setEditValidationFlags(new vos.VPGConfigurationUpdateModifiersVisualObject(false, false, false, false, false));
                initOptionalId(optionalId);
                initTargetSiteTypes();
            };

            initDataService.setVpgSettings = function (vpgSettings) {
                initInitial(vpgSettings);
                initVms(vpgSettings);

                initSourceAndTargetSites(vpgSettings);

                initTargetOrgvDC();

                initComputeResources();

                storageService.initVolumes(vmsService.getInitializedSelectedVms());

                initNics(vmsService.getInitializedSelectedVms());

                networksService.setIsUsingVappNetworkMapping();


                initZORG(vpgSettings);

                //Bug 26620 set custom sla in edit mode
                setIsSlaCustom();

                return initTargetComputeResource(vpgSettings);
            };

            function initInitial(vpgSettings) {
                if (_.isEmpty(vpgService.getVpgName())) {
                    vpgService.setVpgName(vpgSettings.Config.Name);
                }
                if (!_.isEmpty(globalStateModel.siteName)) {
                    vpgService.setSiteName(globalStateModel.siteName);
                }

                vpgService.setVpgSettings(vpgSettings);

                vpgService.setPriority(vpgSettings.Config.Configuration.Priority);
            }

            function initVms(vpgSettings) {
                vmsService.setProtectedVms(_.cloneDeep(vpgSettings.Config.VirtualMachines));

                vmsService.setSelectedVms(helperService.virtualMachinesToValueObjects(vpgSettings.Config.VirtualMachines));

                var isSourceVCD = _.isEqual(vpgService.getEntitySource(), enums.VpgEntityType.VCDvApp);
                if (isSourceVCD) {

                    /*TODO: check if this is needed for edit vpg, in create vpg recovery validation we could check for
                      TODO: vmsService.getProtectedVappSettings() in edit and vmsService.getSelectedVcdVapp CHECK ZSSP create and edit too
                     */
                    vmsService.setSelectedVCDVappFromProtectedSettings(vmsService.getProtectedVappSettings());
                    vpgService.setIsSourceVcd(true);

                } else {
                    vmsService.appendBootOrderGroup(vmsService.getSelectedVms());
                }

            }

            function initSourceAndTargetSites(vpgSettings) {
                vpgService.setSourceSiteType(vpgService.getEntitySource());
                vpgService.setTargetSite(vpgSettings.TargetSiteInfo.PotentialReplicationSiteInitialInfo);

                var targetSiteTypes = vpgService.getTargetSiteTypes();
                vpgService.setTargetSiteType(targetSiteTypes[vpgService.getEntityTarget()]);
            }

            function initTargetOrgvDC() {
                storageService.findAndSetTargetOrgvDC();
            }

            function initComputeResources() {
                var targetOrgvDC = storageService.getTargetOrgVdc();
                if (_.isNullOrUndefined(targetOrgvDC)) {
                    return;
                }
                vpgService.setComputeResources({Networks: targetOrgvDC.PotentialVCDVappNetworks});
                var recoveryVAppSettings = vpgService.getRecoveryVappSettings();
                recoveryVAppSettings.VCDVappSettings.VCDVAppNetworks = targetOrgvDC.PotentialVCDVappNetworks;
            }

            function initNics(vms) {
                if (vpgService.isVcdVapp()) {
                    networksService.initVCDNicsList(vms);
                } else {
                    networksService.initNicsPerVms(vms);
                }
            }

            function initTargetComputeResource(vpgSettings) {
                var targetComputeResource = vpgService.getTargetComputeResource();
                var targetHost;

                if (!_.isNullOrUndefined(targetComputeResource)) {
                    targetHost = createVPGHelperFactory.findTargetHost(targetComputeResource, vpgSettings);
                }

                if (!_.isNullOrUndefined(targetHost)) {
                    //is aws targetHost is empty
                    vpgService.setTargetHost(targetHost.ComputeResource);

                    return getTargetHostRecoveryComputeResource(vpgSettings, targetHost)
                        .then(setTargetHostDetailsToVpgSettings);
                }

                return setTargetHostDetailsToVpgSettings();
            }

            function initZORG(vpgSettings) {
                vpgService.initZORG(vpgSettings.Config.ZertoOrganizationIdentifier);
            }

            function getTargetHostRecoveryComputeResource(vpgSettings, targetHost) {
                if (vpgService.isReverse()) {
                    return zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(vpgSettings.ProtectionGroupId, targetHost.ComputeResource.BaseComputeResourceIdentifier);
                } else {
                    return zertoServiceFactory.GetRecoveryComputeResource(vpgSettings.ProtectionGroupId, vpgSettings.Config.OwnersId, targetHost.ComputeResource.BaseComputeResourceIdentifier);
                }
            }

            function initTargetSiteTypes() {
                var targetSiteTypes = {};
                targetSiteTypes[enums.VpgEntityType.HyperV] = {
                    type: 'HyperV',
                    value: enums.VpgEntityType.HyperV
                };
                targetSiteTypes[enums.VpgEntityType.Aws] = {
                    type: 'AWS',
                    value: enums.VpgEntityType.Aws
                };
                targetSiteTypes[enums.VpgEntityType.VCDvApp] = {
                    type: 'vCD',
                    value: enums.VpgEntityType.VCDvApp
                };
                targetSiteTypes[enums.VpgEntityType.VCVpg] = {
                    type: 'VC',
                    value: enums.VpgEntityType.VCVpg
                };
                targetSiteTypes[enums.VpgEntityType.Azure] = {
                    type: 'Azure',
                    value: enums.VpgEntityType.Azure
                };

                vpgService.setTargetSiteTypes(targetSiteTypes);
            }

            function initOptionalId(optionalId) {
                if (_.isNullOrUndefined(optionalId)) {
                    return;
                }
                if (optionalId.hasOwnProperty('InternalVAppName')) {
                    vpgService.setVappIdentifer(optionalId);
                } else if(optionalId.hasOwnProperty('VcdVappIdentifier')){
                    vpgService.setVappIdentifer(optionalId);
                } else {
                    vpgService.setOptionalVmIdToAdd(optionalId);
                }
            }

            function setTargetHostDetailsToVpgSettings(potentials) {
                var deferred = $q.defer(),
                    vpgSettings = vpgService.getVpgSettings();

                networksService.setCopyNatRulesAvailable(vpgSettings.Config.Configuration.CopyNatRulesOptions !== enums.CopyNatRulesOptions.DontCopy);

                if (!_.isNullOrUndefined(potentials)) {
                    setTargetHostDetailsFromPotentials(vpgSettings, potentials);
                }

                if (networksService.isUsingVappNetworkMapping()) {
                    var vpgId = vpgService.getProtectionGroupId(),
                        ownersId = vpgSettings.Config.OwnersId,
                        targetVirtualDataCenterId = vpgService.getRecoveryVappSettings().VCDVappSettings.TargetVirtualDatacenter.Id;

                    if (vpgService.isReverse()) {
                        getReverseVCD2VCDPotentialOrgNetworks(ownersId, vpgId, targetVirtualDataCenterId);
                    } else {
                        getVCD2VCDPotentialOrgNetworks(ownersId, vmsService.getProtectedVappSettings().VCDVappSettings.OrgVirtualDatacenter.Id, vpgId, targetVirtualDataCenterId);
                    }
                }
                storageService.initServiceProfile(true);
                storageService.initVolumes(vmsService.getInitializedSelectedVms());


                var optionalVmIdToAdd = vpgService.getOptionalVmIdToAdd();
                if (_.isNullOrUndefined(optionalVmIdToAdd)) {
                    deferred.resolve();
                } else {
                    var foundVM = vmsService.findVmById(vmsService.getPotentialVms(), optionalVmIdToAdd);

                    if (_.isNullOrUndefined(foundVM)) {
                        deferred.resolve();
                    } else {
                        helperService.initSelectedVMs(
                            [foundVM],
                            vpgSettings.getTargetSiteType(),
                            vpgService.getTargetSite().OwnersId.Id,
                            vpgService.getProtectionGroupId())
                            .then(function () {
                                vmsService.getSelectedVms().push(foundVM);
                                deferred.resolve();
                            });
                    }
                }

            }

            function setTargetHostDetailsFromPotentials(vpgSettings, potentials) {
                vpgService.setComputeResources(potentials);

                setStorageFromPotentials(potentials, vpgSettings);
            }

            function setStorageFromPotentials(potentials, vpgSettings) {
                var foundDs = storageService.findDatastoreById(vpgSettings, potentials);
                if (!_.isNullOrUndefined(foundDs)) {
                    storageService.setTargetDatastore(foundDs.Datastore);
                }

                var recoveryFolder = vpgSettings.Config.Defaults.TargetFolder,
                    targetFolder = storageService.findTargetFolder(potentials.PotentialFolders, recoveryFolder);

                if (!_.isNullOrUndefined(targetFolder)) {
                    storageService.setTargetFolder(targetFolder);
                }
            }

            function getReverseVCD2VCDPotentialOrgNetworks(ownersId, vpgId, targetVirtualDataCenterId) {
                zertoServiceFactory.GetReverseVCD2VCDPotentialOrgNetworks(ownersId, vpgId, targetVirtualDataCenterId)
                    .then(vpgService.updateVappNetworkMappingPotentials);
            }

            function getVCD2VCDPotentialOrgNetworks(ownersId, orgVirtualDatacenterId, vpgId, targetVirtualDataCenterId) {
                zertoServiceFactory.GetVCD2VCDPotentialOrgNetworks(ownersId, orgVirtualDatacenterId, vpgId, targetVirtualDataCenterId)
                    .then(vpgService.updateVappNetworkMappingPotentials);
            }

            function setIsSlaCustom() {
                var serviceProfile = storageService.getServiceProfile();
                if (!_.isNullOrUndefined(serviceProfile)) {
                    var selectedPotential = storageService.getServiceProfileById(serviceProfile.SelectedIdentifier);
                    storageService.setIsSlaCustom(selectedPotential.IsEditable);
                }
            }
        }
    );
