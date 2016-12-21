'use strict';

angular.module('zvmApp.core')
    .service('helperService', function ($filter, $q, zertoServiceFactory, vos) {

        var helperService = this;

        helperService.initVmsForGrid = function (vms) {
            _.each(vms, function (item) {
                item.id = createVmIdForGrid(item);
                item.SizeInMbFiltered = {
                    display: $filter('mbToStringConvertorFilter')(item.SizeInMb),
                    value: item.SizeInMb,
                    filterValue: item.SizeInMb
                };


                //one to many
                if (!_.isNullOrUndefined(item.ProtectedVmVpgsInfo)) {
                    item.ProtectedVmVpgsInfo.isProtected = item.ProtectedVmVpgsInfo.TotalNumberOfVpgs > 0;
                    item.ProtectedVmVpgsInfo.sortValue = item.ProtectedVmVpgsInfo.TotalNumberOfVpgs > 0;
                }
            });
        };

        helperService.initVcdVappForGrid = function (vapp) {
            _.each(vapp, function (vapp) {
                vapp.id = getVcdVappId(vapp);
                vapp.Vapp.display = vapp.Vapp.DisplayName;

                //one to many
                if (!_.isNullOrUndefined(vapp.Vapp.ProtectedVCDVappVpgsInfo)) {
                    vapp.Vapp.isProtected = vapp.Vapp.ProtectedVCDVappVpgsInfo.TotalNumberOfVpgs > 0;
                }
            });
        };

        helperService.findAndRemoveVmsFromPotential = function (vms, idToRemove) {
            return _.remove(vms, function (potVm) {
                return _.isEqual(potVm.Id, idToRemove);
            });
        };

        helperService.initSelectedVMs = function (vms, targetSiteType, targetSite, vpgId) {
            var promiseQueue = [],
                vmsArr = [];

            _.forEach(vms, function (vm) {
                promiseQueue.push(zertoServiceFactory.GetInitialSettingsForVirtualMachine(vm.Id, targetSiteType.value, targetSite.OwnersId.Id, vpgId)
                    .then(function (vmSettings) {
                        vmSettings._isNewVm = true;
                        vmsArr.push(vmSettings);
                    }, function () {
                    }));
            });

            return $q.all(promiseQueue)
                .then(function () {
                    return vmsArr;
                });
        };

        helperService.virtualMachinesToValueObjects = function (col) {
            var result = [];
            _.forEach(col, function (vm) {
                var item = new vos.PotentialVirtualMachineToProtectVisualObject();
                item.id = createVmIdForGrid(vm);     // to remove this line.
                item.Id = vm.InternalVirtualMachineId;
                item.DisplayName = vm.Name;
                item.SizeInMb = vm.StorageUsageInfo.ProvisionedStorageSizeInMB;
                item.SizeInMbFiltered = {
                    display: $filter('mbToStringConvertorFilter')(vm.StorageUsageInfo.ProvisionedStorageSizeInMB),
                    value: vm.StorageUsageInfo.ProvisionedStorageSizeInMB,
                    filterValue: vm.StorageUsageInfo.ProvisionedStorageSizeInMB
                };

                result.push(item);
            });

            return result;
        };

        helperService.getTargetHostBaseComputeResourceIdentifierByVmId = function(vms, vmId) {
            var vm = _.find(vms, {InternalVirtualMachineId: vmId});

            if (_.isNullOrUndefined(vm)) {
                return null;
            }

            return vm.TargetHost.BaseComputeResourceIdentifier;
        };

        function getVcdVappId(vApp) {
            if (_.isNullOrUndefined(vApp.Vapp)) {
                return vApp.VCDVappSettings.VCDVappId;
            }
            return vApp.Vapp.VcdVappIdentifier.VCDId;
        }

        /*****************
         * Private
         * */
        function createVmIdForGrid(vm) {
            if (vm.InternalVirtualMachineId) {
                return vm.InternalVirtualMachineId.InternalVmName + vm.InternalVirtualMachineId.ServerIdentifier.ServerGuid;
            } else {
                return vm.Id.InternalVmName + vm.Id.ServerIdentifier.ServerGuid;
            }

        }

    });
