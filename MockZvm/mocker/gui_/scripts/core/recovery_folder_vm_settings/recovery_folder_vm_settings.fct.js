'use strict';

angular.module('zvmApp.core')
    .factory('recoveryFolderVmSettingsFactory', function ($uibModal, zertoServiceFactory, vpgService, vmsService) {
        var recoveryFolderVmSettingsFactory = {};

        recoveryFolderVmSettingsFactory.modalInstance = null;
        recoveryFolderVmSettingsFactory.data = null;

        recoveryFolderVmSettingsFactory.openWindow = function (data, refreshValidations) {
            recoveryFolderVmSettingsFactory.data = _.cloneDeep(data);
            recoveryFolderVmSettingsFactory.refreshValidations = refreshValidations;
            recoveryFolderVmSettingsFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/recovery_folder_vm_settings/recovery_folder_vm_settings.html',
                windowClass: 'advanced-vm-replication-settings',
                controller: 'recoveryFolderVmSettingsController',
                backdrop: 'static'
            });
        };

        recoveryFolderVmSettingsFactory.save = function (value) {
            vmsService.setInitializedSelectedVms(value);
            recoveryFolderVmSettingsFactory.refreshValidations.call();
        };

        recoveryFolderVmSettingsFactory.getPotentialFoldersForSelectedVms = function (selectedHostsIdent) {
            if (vpgService.isReverse()) {
                return zertoServiceFactory.GetRecoveryComputeResourceForReverseConfigBulk(vpgService.getProtectionGroupId(), selectedHostsIdent);
            } else {
                return zertoServiceFactory.GetRecoveryComputeResourceBulk(vpgService.getProtectionGroupId(), vpgService.getTargetSite().OwnersId.Id, selectedHostsIdent);
            }
        };

        return recoveryFolderVmSettingsFactory;
    });
