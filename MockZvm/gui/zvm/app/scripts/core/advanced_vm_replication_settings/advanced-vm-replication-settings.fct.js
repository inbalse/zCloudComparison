'use strict';

angular.module('zvmApp.core')
    .factory('advancedVmReplicationSettingsFactory', function ($uibModal) {
        var advancedVmReplicationSettingsFactory = {};

        advancedVmReplicationSettingsFactory.modalInstance = null;

        advancedVmReplicationSettingsFactory.openWindow = function (refreshValidations) {
            advancedVmReplicationSettingsFactory.refreshValidations = refreshValidations;
            advancedVmReplicationSettingsFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/advanced_vm_replication_settings/advanced-vm-replication-settings.html',
                windowClass: 'advanced-vm-replication-settings',
                controller: 'advancedVmReplicationSettingsPopup',
                backdrop: 'static'
            });

            return advancedVmReplicationSettingsFactory.modalInstance.result;
        };

        return advancedVmReplicationSettingsFactory;
    });
