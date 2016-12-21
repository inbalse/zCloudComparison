/**
 * Created by nir.moreno on 22/03/2016.
 */
'use strict';

angular.module('zvmApp.core')
    .service('vmsService', function ($q, createVPGModel, storageService, zertoServiceFactory, publicCloudSettingsService, helperService, vpgService, enums, vos) {

        var vmsService = this;

        vmsService.getSelectedVms = function () {
            return createVPGModel.getSelectedVms();
        };
        vmsService.setSelectedVms = function (vms) {
            createVPGModel.setSelectedVms(vms);
        };

        vmsService.getInitializedSelectedVms = function () {
            return createVPGModel.getInitializedSelectedVms();
        };
        vmsService.setInitializedSelectedVms = function (selectedVms) {
            createVPGModel.setInitializedSelectedVms(selectedVms);
        };

        vmsService.setProtectedVms = function (protectedVms) {
            createVPGModel.setProtectedVms(protectedVms);
        };
        vmsService.getProtectedVms = function () {
            return createVPGModel.getProtectedVms();
        };
        vmsService.addVmToSelected = function (vm) {
            createVPGModel.addVmToSelected(vm);
        };

        vmsService.getPotentialVms = function () {
            return createVPGModel.getPotentialVms();
        };
        vmsService.setPotentialVms = function (vms) {
            createVPGModel.setPotentialVms(vms);
        };

        vmsService.getBootOrderGroups = function () {
            return createVPGModel.getBootOrderGroups();
        };
        vmsService.setBootOrderGroups = function (groups) {
            createVPGModel.setBootOrderGroups(groups);
        };

        vmsService.removeVmFromBootorder = function (vmsIds) {
            var groups = createVPGModel.getBootOrderGroups();
            _.forEach(vmsIds, function (rVM) { //rVM - remove vm
                _.forEach(groups, function (group) {
                    _.remove(group.Machines, function (vmItem) {
                        return _.isEqual(vmItem.Id.InternalVmName, rVM);
                    });
                });
            });
        };


        vmsService.getDefaultGroup = function (groups) {
            return _.find(groups, {Name: 'Default'});
        };

        vmsService.addNewVmToBootorder = function (vms) {
            var groups = createVPGModel.getBootOrderGroups();
            var defaultBootorderGroup = vmsService.getDefaultGroup(groups);
            _.forEach(vms, function (vm) {
                defaultBootorderGroup.Machines.push(vm);
            });
        };

        vmsService.appendBootOrderGroup = function (vms) {
            createVPGModel.appendBootOrderGroup(vms);
        };

        vmsService.createVmIdForGrid = function (vm) {
            if (vm.InternalVirtualMachineId) {
                return vm.InternalVirtualMachineId.InternalVmName + vm.InternalVirtualMachineId.ServerIdentifier.ServerGuid;
            } else {
                return vm.Id.InternalVmName + vm.Id.ServerIdentifier.ServerGuid;
            }

        };

        vmsService.preventSelectedVMsChange = function (isVpgObjectExist, isVpgContainsVms, isInEditMode) {
            if (!isVpgObjectExist) {
                return true;
            }

            return isVpgContainsVms && isInEditMode;


        };

        vmsService.mergeInitializedAndSeletcedVms = function (currentVmsIds, selectedVmsIds) {
            //merge the two lists while removing the doubles
            return _.uniq(_.union(currentVmsIds, selectedVmsIds), function (item) {
                return item.InternalVmName + item.ServerIdentifier.ServerGuid;
            });


        };

        vmsService.findVMItems = function (merged, vmIds) {
            return _.filter(merged, function (obj) {
                return !_.findWhere(vmIds, obj);
            });
        };

        vmsService.getAddedRemovedVms = function () {
            var currentVmsIds = _.pluck(createVPGModel.getInitializedSelectedVms(), 'InternalVirtualMachineId'),
                selectedVmsIds = _.pluck(createVPGModel.getSelectedVms(), 'Id'),
                merged = vmsService.mergeInitializedAndSeletcedVms(currentVmsIds, selectedVmsIds);

            return {
                added: vmsService.findVMItems(merged, currentVmsIds),
                removed: vmsService.findVMItems(merged, selectedVmsIds)
            };
        };

        vmsService.removeVmsFromVpgSettings = function (removed, selectedVms) {
            //remove items from the VPG settings Value object
            if (!_.isEmpty(removed)) {
                _.forEach(removed, function (rItem) {
                    _.remove(createVPGModel.getInitializedSelectedVms(), function (item) {
                        return _.isEqual(item.InternalVirtualMachineId, rItem);
                    });
                });
                storageService.initVolumes(selectedVms);
            }

        };

        vmsService.sendVmsForInitialization = function (added) {
            //send the added collection for initialization (with the ZVM)
            var vmsList = _.map(added, function (addedId) {
                return {Id: addedId};
            });

            return helperService.initSelectedVMs(vmsList, vpgService.getTargetSiteType(), vpgService.getTargetSite(),
                vpgService.getProtectionGroupId())
                .then(vpgService.initSelectedVmsHandler);
        };

        vmsService.applySelectedVMsChange = function () {
            var deferred = $q.defer();

            if (vmsService.preventSelectedVMsChange(createVPGModel.isVpgObjectExist(),
                    createVPGModel.isVpgContainsVms(), vpgService.isInEditMode())) {
                deferred.resolve();
                return deferred.promise;
            }

            var addedRemovedVms = vmsService.getAddedRemovedVms();

            vmsService.removeVmsFromVpgSettings(addedRemovedVms.removed);


            if (createVPGModel.getTargetSite() && createVPGModel.getTargetSiteType()) {
                vmsService.sendVmsForInitialization(addedRemovedVms.added).then(deferred.resolve);
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        };

        vmsService.clearTargets = function () {
            vpgService.setTargetSite(null);
            vpgService.setTargetSiteType(null);
            storageService.setTargetOrgVdc(null);
        };

        vmsService.clearVms = function () {
            var potentialVms = vmsService.getPotentialVms();

            if (_.isEqual(vpgService.getSourceSiteType().sourceType, enums.VpgEntityType.VCVpg)) {
                vmsService.setPotentialVms(potentialVms.concat(vmsService.getSelectedVms()));
            }

            vmsService.setSelectedVms([]);
        };

        vmsService.toggleVcdSelected = function (selected) {
            createVPGModel.setIsSourceVcd(!!selected);
        };

        vmsService.addVcdVappAndSelectVms = function (vcdVapp, shouldApplyDefaults) {
            var deferred = $q.defer(),
                targetSite = vpgService.getTargetSite(),
                targetSiteType = vpgService.getTargetSiteType(),
                selectedVcdVapp = createVPGModel.getSelectedVcdVapp();

            if (_.isNullOrUndefined(vcdVapp)) {
                deferred.reject();
                return deferred.promise;
            }

            createVPGModel.setSelectedVcdVapp(vcdVapp);

            //check if vcdVapp reselect clear the replication tab data to update new vcdVapp settings and get vapp vms (bug26693)
            if (createVPGModel.data.defaultVpgSettings && selectedVcdVapp && vcdVapp.Vapp.VcdVappIdentifier.VCDId !== selectedVcdVapp.Vapp.VcdVappIdentifier.VCDId) {
                vpgService.clearReplicationStep();
            }

            zertoServiceFactory.GetSelectedVcdVappVms(vcdVapp.Vapp.VcdVappIdentifier).then(function (vms) {
                helperService.initVmsForGrid(vms);
                var vmsSize = vmsService.getVmsSize(vms);
                if (!(shouldApplyDefaults && targetSite && targetSiteType)) {
                    return deferred.resolve({vms: vms, vmsSize: vmsSize});
                }

                vmsService.setDefaultVmsToVcdVapp(targetSite.SiteId, targetSiteType.value, vcdVapp.Vapp.VcdVappIdentifier)
                    .then(deferred.resolve({vms: vms, vmsSize: vmsSize}));
            });

            return deferred.promise;
        };

        vmsService.getProtectedVappSettings = function () {
            return createVPGModel.getProtectedVappSettings();
        };

        vmsService.getSelectedVcdVapp = function () {
            return createVPGModel.getSelectedVcdVapp();
        };
        vmsService.setSelectedVcdVapp = function (vapp) {
            createVPGModel.setSelectedVcdVapp(vapp);
        };

        vmsService.createValidationFlags = function () {
            return new vos.VPGConfigurationCreateModifiersVisualObject(!vpgService.isReverse());
        };

        vmsService.isVmFolderConfigurable = function () {
            return createVPGModel.isVmFolderConfigurable();
        };

        vmsService.applyPublicCloudToVms = function () {
            var virtualVms = createVPGModel.getInitializedSelectedVms(),
                publicCloudVpgFailoverCloudSettings = publicCloudSettingsService.getPublicCloudFailoverSettings(),
                publicCloudVpgFailoverTestCloudSettings = publicCloudSettingsService.getPublicCloudFailoverTestSettings();

            _.forEach(virtualVms, function (item) {
                if (item._isNewVm) {
                    if (_.isNullOrUndefined(item.CloudVmSettings)) {
                        item.CloudVmSettings = {};
                    }

                    if (_.isNullOrUndefined(item.CloudVmSettings.FailoverSettings)) {
                        item.CloudVmSettings.FailoverSettings = {};
                        item.CloudVmSettings.FailoverSettings = publicCloudVpgFailoverCloudSettings;
                    } else {
                        _.forEach(publicCloudVpgFailoverCloudSettings, function (value, key) {
                            item.CloudVmSettings.FailoverSettings[key] = value;
                        });
                    }

                    if (_.isNullOrUndefined(item.CloudVmSettings.FailoverTestSettings)) {
                        item.CloudVmSettings.FailoverTestSettings = {};
                        item.CloudVmSettings.FailoverTestSettings = publicCloudVpgFailoverTestCloudSettings;
                    } else {
                        _.forEach(publicCloudVpgFailoverTestCloudSettings, function (value, key) {
                            item.CloudVmSettings.FailoverTestSettings[key] = value;
                        });
                    }

                }
            });
        };

        vmsService.setSelectedVCDVappFromProtectedSettings = function (protectedVappSettings) {

            var vcdVApp = new vos.VCDVappTableEntry();
            vcdVApp.Vapp = new vos.VCDVappVisualObject(protectedVappSettings.VCDVappSettings.VCDVappDisplayName, null,
                protectedVappSettings.VCDVappSettings.VCDVappId);

            if (vpgService.isReverse()) {
                vcdVApp.OwningVirtualDataCenterName = 'NA';
            } else {
                vcdVApp.OwningVirtualDataCenterName = protectedVappSettings.VCDVappSettings.OrgVirtualDatacenter.DisplayName;
            }

            helperService.initVcdVappForGrid([vcdVApp]);
            createVPGModel.setSelectedVcdVapp(vcdVApp);
        };

        vmsService.findVmById = function (vms, vmId) {
            return _.find(vms, function (potVm) {
                return _.isEqual(potVm.Id, vmId);
            });
        };


        vmsService.setDefaultVmsToVcdVapp = function(site, type, vappId) {
            return zertoServiceFactory.GetDefaultSettingsForNewProtectionGroupVCDVappContext(vappId, type, site)
                .then(function (vpgSettings) {
                    createVPGModel.setProtectedVappSettings(vpgSettings.Config.ProtectedVappSettings);
                    var vms = vpgSettings.Config.VirtualMachines;
                    helperService.initVmsForGrid(vms);
                    vmsService.setSelectedVms(vms);
                    _.assign(vmsService.getSelectedVms(), {_isNewVm: true});
                });
        };

        vmsService.getVmsSize = function(vms) {
            var vcdVMsSize = 0;
            _.each(vms, function (item) {
                vcdVMsSize += item.SizeInMb;
            });
            return vcdVMsSize;
        }
    });
