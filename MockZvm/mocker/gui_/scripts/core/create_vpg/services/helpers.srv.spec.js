'use strict';
describe('Create-VPG Helper service', function () {
    var helperService, $filter, $q, zertoServiceFactory, vos;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$q_, _vos_, _$filter_, _helperService_, _zertoServiceFactory_) {
        $q = _$q_;
        vos = _vos_;
        $filter = _$filter_;
        helperService = _helperService_;
        zertoServiceFactory = _zertoServiceFactory_;
    }));

    it('should init Vms for grid', function () {
        var vm = {
            "ProtectedHostName": "172.20.123.5",
            "DisplayName": "MosheLabDC01",
            "Id": {
                "InternalVmName": "vm-2445",
                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
            },
            "SizeInMb": 54276
        };

        helperService.initVmsForGrid([vm]);

        expect(vm.SizeInMbFiltered).toBeDefined();

        //one to many stuff
        expect(vm.ProtectedVmVpgsInfo).not.toBeDefined();
    });

    it('should init Vms for grid - one to many', function () {
        var vm = {
            "ProtectedHostName": "172.20.123.5",
            "ProtectedVmVpgsInfo": {"TotalNumberOfVpgs": 0, "KnownProtectedVmVpgsInfo": []},
            "DisplayName": "MosheLabDC01",
            "Id": {
                "InternalVmName": "vm-2445",
                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
            },
            "SizeInMb": 54276
        };

        helperService.initVmsForGrid([vm]);

        expect(vm.SizeInMbFiltered).toBeDefined();

        //one to many stuff
        expect(vm.ProtectedVmVpgsInfo.isProtected).toBe(vm.ProtectedVmVpgsInfo.TotalNumberOfVpgs > 0);
        expect(vm.ProtectedVmVpgsInfo.sortValue).toBe(vm.ProtectedVmVpgsInfo.TotalNumberOfVpgs > 0);
    });

    it('should init VCD Vapp for grid', function () {
        var vApp = {
            "Vapp": {
                "DisplayName": "SdVapp1Org3",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:895cbb2e-ec24-493f-8299-9ee05e27021a"
                }
            },
            "OwningVirtualDataCenterName": "OrgVcdSiteD3"
        };

        helperService.initVcdVappForGrid([vApp]);

        expect(vApp.Vapp.display).toBeDefined();

        //one to many stuff
        expect(vApp.ProtectedVmVpgsInfo).not.toBeDefined();
    });

    it('should init VCD Vapp grid - one to many', function () {
        var vApp = {
            "Vapp": {
                "DisplayName": "SdVapp1Org3",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:895cbb2e-ec24-493f-8299-9ee05e27021a"
                },
                "ProtectedVCDVappVpgsInfo": {"TotalNumberOfVpgs": 2}
            },
            "OwningVirtualDataCenterName": "OrgVcdSiteD3"
        };

        helperService.initVcdVappForGrid([vApp]);

        expect(vApp.Vapp.display).toBeDefined();

        //one to many stuff
        expect(vApp.Vapp.isProtected).toBe(vApp.Vapp.ProtectedVCDVappVpgsInfo.TotalNumberOfVpgs > 0);
    });

    it('should find And Remove Vms From Potential function', function () {
        var vms = [
                {
                    "ProtectedHostName": "172.20.123.5",
                    "DisplayName": "MosheLabDC01",
                    "Id": {
                        "InternalVmName": "vm-2445",
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    },
                    "SizeInMb": 56276
                },
                {
                    "ProtectedHostName": "172.20.123.6",
                    "DisplayName": "MosheLabDC02",
                    "Id": {
                        "InternalVmName": "vm-2446",
                        "ServerIdentifier": {"ServerGuid": "2272da3a-bf7a-48cf-b13a-c857b47a2293"}
                    },
                    "SizeInMb": 51276
                }
            ],
            originalVmsLength = vms.length,
            idToRemove = {
                "InternalVmName": "vm-2445",
                "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
            };

        helperService.findAndRemoveVmsFromPotential(vms, idToRemove);

        expect(_.find(vms, idToRemove)).toBeUndefined();
        expect(vms.length).toBe(originalVmsLength - 1);
    });

    it('should not find And Remove Vms From Potential function', function () {
        var vms = [
                {
                    "ProtectedHostName": "172.20.123.5",
                    "DisplayName": "MosheLabDC01",
                    "Id": {
                        "InternalVmName": "vm-2445",
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    },
                    "SizeInMb": 56276
                },
                {
                    "ProtectedHostName": "172.20.123.6",
                    "DisplayName": "MosheLabDC02",
                    "Id": {
                        "InternalVmName": "vm-2446",
                        "ServerIdentifier": {"ServerGuid": "2272da3a-bf7a-48cf-b13a-c857b47a2293"}
                    },
                    "SizeInMb": 51276
                }
            ],
            originalVmsLength = vms.length,
            idToRemove = {
                "InternalVmName": "internalVmName",
                "ServerIdentifier": {"ServerGuid": "serverGuid"}
            };

        helperService.findAndRemoveVmsFromPotential(vms, idToRemove);

        expect(vms.length).toBe(originalVmsLength);
    });

    it('should init selected VMs successfully', function () {
        var vms = [
                {
                    "ProtectedHostName": "172.20.123.5",
                    "DisplayName": "MosheLabDC01",
                    "Id": {
                        "InternalVmName": "vm-2445",
                        "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                    },
                    "SizeInMb": 56276
                },
                {
                    "ProtectedHostName": "172.20.123.6",
                    "DisplayName": "MosheLabDC02",
                    "Id": {
                        "InternalVmName": "vm-2446",
                        "ServerIdentifier": {"ServerGuid": "2272da3a-bf7a-48cf-b13a-c857b47a2293"}
                    },
                    "SizeInMb": 51276
                }
            ],
            targetSiteType = {value: 1},
            targetSite = {
                OwnersId: {
                    Id: '123456789ID'
                }
            },
            vpgId = "vpgId";

        spyOn(zertoServiceFactory, 'GetInitialSettingsForVirtualMachine').and.callFake(function () {
            var vmSettings = {},
                p = $q.defer();

            p.resolve(vmSettings);

            return p.promise;
        });

        helperService.initSelectedVMs(vms, targetSiteType, targetSite, vpgId).then(function (vmsArray) {
            expect(vmsArray).toBeDefined();
            expect(vmsArray.length).toBe(vms.length);
            _.forEach(vmsArray, function (vm) {
                expect(vm._isNewVm).toBeTruthy();
            });
        });
    });

    it('should check virtual MachinesToValueObjects function', function () {
        var vm = {
                "ProtectedHostName": "172.20.123.5",
                "DisplayName": "MosheLabDC01",
                "InternalVirtualMachineId": {
                    "InternalVmName": "vm-2445",
                    "ServerIdentifier": {"ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"}
                },
                "SizeInMb": 56276,
                "Name": "VMName",
                "StorageUsageInfo": {"ProvisionedStorageSizeInMB": 8}
            },
            initializedVms, vmToCheck;

        initializedVms = helperService.virtualMachinesToValueObjects([vm]);
        vmToCheck = _.head(initializedVms);

        expect(vmToCheck.id).toBeDefined();
        expect(vmToCheck.Id).toBe(vm.InternalVirtualMachineId);
        expect(vmToCheck.SizeInMbFiltered).toBeDefined();
        expect(vmToCheck.SizeInMb).toBe(vm.StorageUsageInfo.ProvisionedStorageSizeInMB);
    });
});
