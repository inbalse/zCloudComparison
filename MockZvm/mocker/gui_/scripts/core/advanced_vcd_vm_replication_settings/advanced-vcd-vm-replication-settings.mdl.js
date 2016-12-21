'use strict';

angular.module('zvmApp.core')
    .factory('advancedVcdVmReplicationSettingsModel', function ($filter, objectTransformHelpersService, createVPGModel,
                                                                storageService, $q, busyOverlayService) {
        var advancedVcdVmReplicationSettingsModel = {};

        advancedVcdVmReplicationSettingsModel.processData = function (data) {

            var processed = data;

            processed = _.forEach(processed, function (item) {
                advancedVcdVmReplicationSettingsModel.processItem(item);
            });

            return processed;
        };

        advancedVcdVmReplicationSettingsModel.processItem = function (item) {
            item.id = item.InternalVirtualMachineId.ServerIdentifier.ServerGuid + item.InternalVirtualMachineId.InternalVmName;
            if (item.StorageProfile && item.StorageProfile.VCDStorageProfile) {
                item.StorageProfileObj = {
                    display: item.StorageProfile.VCDStorageProfile.DisplayName,
                    value: item.StorageProfile.VCDStorageProfile
                };
            } else {
                item.StorageProfileObj = {
                    display: '',
                    value: ''
                };
            }
            item.JournalHardLimitObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalHardLimit),
                value: item.JournalHardLimit
            };
            item.JournalWarningThresholdObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalWarningThreshold),
                value: item.JournalWarningThreshold
            };

        };

        advancedVcdVmReplicationSettingsModel.applyValueStorageProfile = function (item, state) {
            item.StorageProfileObj.display = state.DisplayName;
            item.StorageProfile.VCDStorageProfile = state;
        };

        advancedVcdVmReplicationSettingsModel.applyValueJournalHardLimit = function (item, state) {
            item.JournalHardLimit = state;
            objectTransformHelpersService.JournalLimitTypeGBtoMB(item.JournalHardLimit);
            item.JournalHardLimitObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalHardLimit),
                value: item.JournalHardLimit
            };
        };

        advancedVcdVmReplicationSettingsModel.applyValueJournalWarningThreshold = function (item, state) {
            item.JournalWarningThreshold = state;
            objectTransformHelpersService.JournalLimitTypeGBtoMB(item.JournalWarningThreshold);
            item.JournalWarningThresholdObj = {
                display: $filter('journalHardLimitGridLabelFilter')(item.JournalWarningThreshold),
                value: item.JournalWarningThreshold
            };
        };

        advancedVcdVmReplicationSettingsModel.getVCDPotentialStorageProfiles = function () {
            busyOverlayService.addToBlacklist('GetReverseVCDPotentialVirtualDatacenterStorageProfiles');
            busyOverlayService.addToBlacklist('GetVCDPotentialVirtualDatacenterStorageProfiles');

            var deferred = $q.defer();

            storageService.getVCDPotentialVirtualDatacenterStorageProfiles(
                createVPGModel.data.defaultVpgSettings.Config.OwnersId,
                createVPGModel.data.defaultVpgSettings.ProtectionGroupId,
                createVPGModel.data.defaultVpgSettings.Config.RecoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter.Id
            ).then(function (result) {
                var potentialVirtualDatacenterStorageProfiles = _.sortBy(result, 'DisplayName');
                potentialVirtualDatacenterStorageProfiles.forEach(function (storageProfile) {
                    storageProfile.isDisabled = !storageProfile.Enabled;
                });
                busyOverlayService.removeFromBlacklist('GetReverseVCDPotentialVirtualDatacenterStorageProfiles');
                busyOverlayService.removeFromBlacklist('GetVCDPotentialVirtualDatacenterStorageProfiles');

                deferred.resolve(potentialVirtualDatacenterStorageProfiles);
            });
            return deferred.promise;
        };

        return advancedVcdVmReplicationSettingsModel;
    });
