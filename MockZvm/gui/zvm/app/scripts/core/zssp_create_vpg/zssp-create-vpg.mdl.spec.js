'use strict';

describe('Zssp create vpg model', function () {
    var testScope, enums, zsspCreateVPGModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zertoServiceFactory_, _enums_, $translate, _zsspCreateVPGModel_) {
        testScope = $rootScope.$new();

        zsspCreateVPGModel = _zsspCreateVPGModel_;

        enums = _enums_;
        /// --- mock data ----
        zsspCreateVPGModel.data = {"initialSitesInfo": {"LocalVCDVapps": [], "LocalVCVms": [
            {"DisplayName": "evgeny_vm1 - testing recovery - testing recovery(1)", "Id": {"InternalVmName": "vm-430", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "SizeInMb": 193},
            {"DisplayName": "kobi_vm(2) - testing recovery(1)", "Id": {"InternalVmName": "vm-429", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "SizeInMb": 121},
            {"DisplayName": "evgeny_vm1 - testing recovery - testing recovery", "Id": {"InternalVmName": "vm-410", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "SizeInMb": 298},
            {"DisplayName": "UBER VM - testing recovery(1) - testing recovery", "Id": {"InternalVmName": "vm-431", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "SizeInMb": 4262},
            {"DisplayName": "kobi_vm(2) - testing recovery", "Id": {"InternalVmName": "vm-409", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "SizeInMb": 226},
            {"DisplayName": "evgeny_vm1 - testing recovery - testing recovery(1) - testing recovery", "Id": {"InternalVmName": "vm-434", "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}}, "SizeInMb": 193}
        ],  "TargetSites": [
            {"OwnersId": {"Id": {"OwnersGuid": "e1eae0d9-7ce7-472c-be43-946934b644b9"}, "DisplayName": "gui_local (Local)", "IsLocal": true}, "SiteId": {"SiteGuid": "f745ff65-fdd0-4d56-b26f-764db2f6cea7"}, "IsConnected": true, "IsVCenterEnabled": true, "IsVCDEnabled": false, "IsPublicCloud": false, "IsCustomerSite": false}
        ]}, "targetSite": null, "selectedVCDVapp": null, "sourceSiteType": {"sourceType": 0}, "showVcVms": true, "showVCDVapps": false, "vcVms": null, "targetVirtualDatacenter": null, "targetResourcePool": null, "targetDs": null, "serviceProfile": {}, "targetDatastoreData": [], "targetOrgVDCDropDownData": [], "targetResourcePoolDropDownData": [], "serviceProfileDropDownData": []};

    }));

    it("should check the data structure definitions", function () {
        expect(zsspCreateVPGModel.data.initialSitesInfo).toBeDefined();
        expect(zsspCreateVPGModel.data.targetSite).toBeDefined();
        expect(zsspCreateVPGModel.data.selectedVCDVapp).toBeDefined();
        expect(zsspCreateVPGModel.data.sourceSiteType).toBeDefined();
        expect(zsspCreateVPGModel.data.showVcVms).toBeDefined();
        expect(zsspCreateVPGModel.data.showVCDVapps).toBeDefined();
        expect(zsspCreateVPGModel.data.vcVms).toBeDefined();
        expect(zsspCreateVPGModel.data.targetVirtualDatacenter).toBeDefined();
        expect(zsspCreateVPGModel.data.targetResourcePool).toBeDefined();
        expect(zsspCreateVPGModel.data.targetDs).toBeDefined();
        expect(zsspCreateVPGModel.data.serviceProfile).toBeDefined();
        expect(zsspCreateVPGModel.data.targetDatastoreData).toBeDefined();
        expect(zsspCreateVPGModel.data.targetOrgVDCDropDownData).toBeDefined();
        expect(zsspCreateVPGModel.data.targetResourcePoolDropDownData).toBeDefined();
        expect(zsspCreateVPGModel.data.serviceProfileDropDownData).toBeDefined();
    });

    it("should check the vms process function", function () {
        var vms = zsspCreateVPGModel.processVms(zsspCreateVPGModel.data.initialSitesInfo.LocalVCVms);
        expect(vms[0].Size).toEqual('193.0 MB');
        expect(vms[0].id).toEqual('09d0d3b4-78d0-47c1-ad38-d01887e6d589vm-430');
    });
});
