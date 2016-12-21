'use strict';

angular.module('zvmApp.core')
    .factory('publicCloudNetworkEditFactory', function ($uibModal, $q) {
        var publicCloudNetworkEditFactory = {};

        publicCloudNetworkEditFactory.deferred = null;

        publicCloudNetworkEditFactory.open = function (selectedVms) {

            publicCloudNetworkEditFactory.deferred = $q.defer();

            var oneVm;
            var isBulk = false;
            if (selectedVms.length > 1) {
                oneVm = publicCloudNetworkEditFactory.getBulkVm(selectedVms);
                isBulk = true;
            } else {
                oneVm = _.cloneDeep(selectedVms[0]);
            }

            publicCloudNetworkEditFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/public_cloud_vm_settings/editor/public-cloud-network-edit.html',
                windowClass: 'public-cloud-edit-modal',
                controller: 'publicCloudNetworkEditController',
                backdrop: false,
                resolve: {
                    oneVm: function () {
                        return oneVm;
                    },
                    isBulk: function() {
                        return isBulk;
                    }
                }
            });
            return publicCloudNetworkEditFactory.deferred.promise;
        };

        publicCloudNetworkEditFactory.save = function (value) {
            publicCloudNetworkEditFactory.deferred.resolve(value);
            publicCloudNetworkEditFactory.modalInstance.close();
        };

        publicCloudNetworkEditFactory.close = function () {
            publicCloudNetworkEditFactory.deferred.reject(null);
            publicCloudNetworkEditFactory.modalInstance.close();
        };

        publicCloudNetworkEditFactory.getBulkVm = function (selectedVms) {

            var vmObject = _.cloneDeep(selectedVms[0]);
            var vmNetworkFailOver = vmObject.CloudVmSettings.FailoverSettings;
            var vmNetworkFailOverTest = vmObject.CloudVmSettings.FailoverTestSettings;

            _.forEach(selectedVms, function (nextVM) {

                var nextNetworkFailOver = nextVM.CloudVmSettings.FailoverSettings;
                var nextNetworkFailOverTest = nextVM.CloudVmSettings.FailoverTestSettings;

                //Pcn - failover
                if (vmNetworkFailOver.Pcn && vmNetworkFailOver.Pcn.Id.Identifier !== nextNetworkFailOver.Pcn.Id.Identifier) {
                    vmNetworkFailOver.Pcn = undefined;
                    vmNetworkFailOver.Subnet = undefined;
                    vmNetworkFailOver.SecurityGroups = [];
                }
                else {
                    //subnet - failover
                    if (vmNetworkFailOver.Subnet && vmNetworkFailOver.Subnet.Id.Identifier !== nextNetworkFailOver.Subnet.Id.Identifier) {
                        vmNetworkFailOver.Subnet = undefined;
                    }
                    //sub groups - failover
                    if (!_.isEqual(vmNetworkFailOver.SecurityGroups,nextNetworkFailOver.SecurityGroups)) {
                        vmNetworkFailOver.SecurityGroups = [];
                    }
                }

                //Pcn - failover test
                if (vmNetworkFailOverTest.Pcn && vmNetworkFailOverTest.Pcn.Id.Identifier !== nextNetworkFailOverTest.Pcn.Id.Identifier) {
                    vmNetworkFailOverTest.Pcn = undefined;
                    vmNetworkFailOverTest.Subnet = undefined;
                    vmNetworkFailOverTest.SecurityGroups = [];
                }
                else {
                    //subnet - failover test
                    if (vmNetworkFailOverTest.Subnet && vmNetworkFailOverTest.Subnet.Id.Identifier !== nextNetworkFailOverTest.Subnet.Id.Identifier) {
                        vmNetworkFailOverTest.Subnet = undefined;
                    }

                    //sub groups - failover test
                    if (!_.isEqual(vmNetworkFailOverTest.SecurityGroups,nextNetworkFailOverTest.SecurityGroups)) {
                        vmNetworkFailOverTest.SecurityGroups = [];
                    }
                }

                //instasne type - failover
                if (vmNetworkFailOver.PublicCloudInstanceTypeVisualObject &&
                    !_.isEqual(vmNetworkFailOver.PublicCloudInstanceTypeVisualObject,nextNetworkFailOver.PublicCloudInstanceTypeVisualObject)) {
                    vmNetworkFailOver.PublicCloudInstanceTypeVisualObject = undefined;
                }

                //instasne type - failover test
                if (vmNetworkFailOverTest.PublicCloudInstanceTypeVisualObject &&
                    !_.isEqual(vmNetworkFailOverTest.PublicCloudInstanceTypeVisualObject,nextNetworkFailOverTest.PublicCloudInstanceTypeVisualObject)) {
                    vmNetworkFailOverTest.PublicCloudInstanceTypeVisualObject = undefined;
                }

            });
            return vmObject;
        };

        return publicCloudNetworkEditFactory;
    });
