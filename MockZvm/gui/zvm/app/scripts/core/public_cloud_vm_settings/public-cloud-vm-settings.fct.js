'use strict';

angular.module('zvmApp.core')
    .factory('publicCloudVmSettingsFactory', function ($q, $uibModal) {
        var publicCloudVmSettingsFactory = {};

        publicCloudVmSettingsFactory.modalInstance = null;

        publicCloudVmSettingsFactory.openWindow = function(vpgSettings, publicCloudType){
            publicCloudVmSettingsFactory.deferred = $q.defer();
            publicCloudVmSettingsFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/public_cloud_vm_settings/public-cloud-vm-settings.html',
                windowClass: 'public-cloud-vm-settings',
                controller: 'publicCloudVMSettingsController',
                backdrop: 'static',
                resolve: {
                    vpgSettings: function () {
                        return angular.copy(vpgSettings);
                    },
                    publicCloudType : function (){
                        return publicCloudType;
                    }
                }
            });

            return publicCloudVmSettingsFactory.deferred.promise;
        };

        publicCloudVmSettingsFactory.save = function(virtualMachines){
            publicCloudVmSettingsFactory.deferred.resolve(virtualMachines);
        };

        return publicCloudVmSettingsFactory;
    });
