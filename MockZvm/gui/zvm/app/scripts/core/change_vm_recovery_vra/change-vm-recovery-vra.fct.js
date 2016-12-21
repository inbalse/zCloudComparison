'use strict';

angular.module('zvmApp.core')
    .factory('changeVmRecoveryVraFactory', function ($uibModal, zertoServiceFactory, $q) {
        var changeVmRecoveryVraFactory = {};

        changeVmRecoveryVraFactory.modalInstance = null;
        changeVmRecoveryVraFactory.promise = null;

       // var res = {"VmsList":[{"VirtualMachineVisualObject":{"DisplayName":"smalldebian5","Id":{"InternalVmName":"vm-3156","ServerIdentifier":{"ServerGuid":"c7a99c33-3bad-467b-8405-fbf8fd361d9e"}}},"ProtectionGroupIdentifier":{"GroupGuid":"1bc20581-756c-4d9a-97fc-9889d0dba471"},"ProtectionGroupName":"2","VirtualMachineSizeInGB":0.7353515625,"NumberOfVolumes":1,"VmHardwareVersion":"vmx-07","Status":2,"Selected":false,"Direction":1,"ZertoOrganization":""},{"VirtualMachineVisualObject":{"DisplayName":"smalldebian17","Id":{"InternalVmName":"vm-3073","ServerIdentifier":{"ServerGuid":"c7a99c33-3bad-467b-8405-fbf8fd361d9e"}}},"ProtectionGroupIdentifier":{"GroupGuid":"e6bcece9-ef72-495b-ab63-f712e46830d9"},"ProtectionGroupName":"try","VirtualMachineSizeInGB":0.48046875,"NumberOfVolumes":1,"VmHardwareVersion":"vmx-07","Status":2,"Selected":false,"Direction":1,"ZertoOrganization":""},{"VirtualMachineVisualObject":{"DisplayName":"smalldebian10","Id":{"InternalVmName":"vm-3098","ServerIdentifier":{"ServerGuid":"c7a99c33-3bad-467b-8405-fbf8fd361d9e"}}},"ProtectionGroupIdentifier":{"GroupGuid":"e6bcece9-ef72-495b-ab63-f712e46830d9"},"ProtectionGroupName":"try","VirtualMachineSizeInGB":0.734375,"NumberOfVolumes":1,"VmHardwareVersion":"vmx-07","Status":2,"Selected":false,"Direction":1,"ZertoOrganization":""},{"VirtualMachineVisualObject":{"DisplayName":"smalldebian7","Id":{"InternalVmName":"vm-3117","ServerIdentifier":{"ServerGuid":"c7a99c33-3bad-467b-8405-fbf8fd361d9e"}}},"ProtectionGroupIdentifier":{"GroupGuid":"e6bcece9-ef72-495b-ab63-f712e46830d9"},"ProtectionGroupName":"try","VirtualMachineSizeInGB":0.736328125,"NumberOfVolumes":1,"VmHardwareVersion":"vmx-07","Status":2,"Selected":false,"Direction":1,"ZertoOrganization":""},{"VirtualMachineVisualObject":{"DisplayName":"19498 (759b66e9-968f-4c7e-876b-95e4f39b1f52)","Id":{"InternalVmName":"vm-560","ServerIdentifier":{"ServerGuid":"21bb9d00-496e-40e4-a078-daa265e98f13"}}},"ProtectionGroupIdentifier":{"GroupGuid":"5e18abce-f00d-4201-ad45-cc1484e13b16"},"ProtectionGroupName":"cloud1-->cloud2","VirtualMachineSizeInGB":0.48046875,"NumberOfVolumes":1,"VmHardwareVersion":"vmx-07","Status":2,"Selected":false,"Direction":1,"ZertoOrganization":"Hosting1"}],"AvailableHostList":[{"HostInfo":{"BaseComputeResourceIdentifier":{"InternalName":"host-11","Type":0,"ServerIdentifier":{"ServerGuid":"a8fed6cd-68ed-4f16-9a03-e1ac683c2828"}},"ResourcePoolIdentifier":null,"DisplayName":"172.20.149.20"},"Recommended":false}],"ExplanationList":[],"NotificationsList":[],"SelectedHost":null};

        changeVmRecoveryVraFactory.open = function (vraId) {
            changeVmRecoveryVraFactory.deferred = $q.defer();
            changeVmRecoveryVraFactory.vraId = vraId; //BaseComputeResourceIdentifier
            zertoServiceFactory.GetInitChangeHostScreen(vraId).then(function (result) {
                changeVmRecoveryVraFactory.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/change_vm_recovery_vra/change-vm-recovery-vra.html',
                    windowClass: 'change-vm-recovery-vra',
                    controller: 'changeVmRecoveryVraController',
                    resolve: {
                        result: function () {
                            return result;
                        }
                    }
                });
            });
            return changeVmRecoveryVraFactory.deferred.promise;
        };

        changeVmRecoveryVraFactory.validateData = function(data){
            return  zertoServiceFactory.ValidateChangeHostScreen(changeVmRecoveryVraFactory.vraId, data);
        };


        changeVmRecoveryVraFactory.close = function () {
            changeVmRecoveryVraFactory.deferred.reject(null);
            changeVmRecoveryVraFactory._clear();
        };

        changeVmRecoveryVraFactory.save = function(data){
            zertoServiceFactory.ExecuteChangeHost(changeVmRecoveryVraFactory.vraId, data);
            changeVmRecoveryVraFactory._clear();
        };

        changeVmRecoveryVraFactory._clear = function(){
            changeVmRecoveryVraFactory.modalInstance.dismiss('close');
            changeVmRecoveryVraFactory.vraId = null;
        };

        return changeVmRecoveryVraFactory;
    });
