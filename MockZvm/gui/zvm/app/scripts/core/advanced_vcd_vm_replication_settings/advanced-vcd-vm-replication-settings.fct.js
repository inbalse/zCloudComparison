'use strict';

angular.module('zvmApp.core')
    .factory('advancedVcdVmReplicationSettingsFactory', function ($uibModal) {
        var advancedVcdVmReplicationSettingsFactory = {};

        advancedVcdVmReplicationSettingsFactory.modalInstance = null;
        advancedVcdVmReplicationSettingsFactory.data = null;

        advancedVcdVmReplicationSettingsFactory.openWindow = function (data) {
            advancedVcdVmReplicationSettingsFactory.data = data;
            advancedVcdVmReplicationSettingsFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/advanced_vcd_vm_replication_settings/advanced-vcd-vm-replication-settings.html',
                windowClass: 'advanced-vcd-vm-replication-settings',
                controller: 'advancedVcdVmReplicationSettingsPopup',
                backdrop: 'static',
                resolve: {
                    data: function () {
                        return angular.copy(data);
                    }
                }
            });

            return advancedVcdVmReplicationSettingsFactory.modalInstance.result;
        };

        return advancedVcdVmReplicationSettingsFactory;
    });
