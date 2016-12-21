/**
 * Created by liron on 17/05/2015.
 */

'use strict';

angular.module('zvmApp.core')
    .factory('recoveryFolderVmSettingsModel', function ($q, zertoServiceFactory, vpgService, busyOverlayService) {
        var recoveryFolderVmSettingsModel = {};

        recoveryFolderVmSettingsModel.processData = function (data) {

            var processed = data;

            processed = _.forEach(processed, function (item) {
                recoveryFolderVmSettingsModel.processItem(item);
            });

            return processed;
        };

        recoveryFolderVmSettingsModel.processItem = function (item) {
            item.id = item.InternalVirtualMachineId.InternalVmName;
            if (item.TargetFolder) {
                item.RecoveryFolder = {display: item.TargetFolder.DisplayName, value: item.TargetFolder};
            } else {
                item.RecoveryFolder = {display: '', value: item.TargetFolder};
            }
        };

        recoveryFolderVmSettingsModel.applyValueRecoveryFolder = function (item, state) {
            if (state) {
                item.RecoveryFolder.display = state.DisplayName;
            } else {
                item.RecoveryFolder.display = '';
            }
            item.RecoveryFolder.value = state;
            item.TargetFolder = state;

        };

        recoveryFolderVmSettingsModel.getRecoveryFolders = function (item) {

            function onGetRecoveryFoldersSuccess(result) {
                busyOverlayService.removeFromBlacklist('GetRecoveryComputeResourceForReverseConfig');
                busyOverlayService.removeFromBlacklist('GetRecoveryComputeResource');

                var res = result.PotentialFolders ? result.PotentialFolders : [];
                deferred.resolve(res);
            }

            var deferred = $q.defer();

            busyOverlayService.addToBlacklist('GetRecoveryComputeResourceForReverseConfig');
            busyOverlayService.addToBlacklist('GetRecoveryComputeResource');


            if (vpgService.isReverse()) {
                zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(vpgService.getProtectionGroupId(), item.TargetHost.BaseComputeResourceIdentifier)
                    .then(onGetRecoveryFoldersSuccess);
            } else {
                zertoServiceFactory.GetRecoveryComputeResource(vpgService.getProtectionGroupId(), vpgService.getTargetSite().OwnersId.Id, item.TargetHost.BaseComputeResourceIdentifier)
                    .then(onGetRecoveryFoldersSuccess);
            }
            return deferred.promise;
        };

        return recoveryFolderVmSettingsModel;
    });

