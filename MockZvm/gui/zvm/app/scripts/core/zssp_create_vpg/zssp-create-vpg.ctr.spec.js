'use strict';

describe('Zssp create vpg controller', function () {
    var controller, testScope, zertoServiceFactory, enums, zsspCreateVPGModel, deferred;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zertoServiceFactory_, _enums_, $translate, _zsspCreateVPGModel_, $q) {
        testScope = $rootScope.$new();

        zsspCreateVPGModel = _zsspCreateVPGModel_;

        zertoServiceFactory = _zertoServiceFactory_;
        enums = _enums_;

        deferred = $q.defer();
        deferred.resolve('somevalue');

        spyOn(zertoServiceFactory, 'CloudPortalCreateProtectionGroup').and.returnValue(deferred.promise);
        /// --- mock data ----
        zsspCreateVPGModel.data = {
            "initialSitesInfo": {
                "LocalVCDVapps": [],
                "LocalVCVms": [{
                    "DisplayName": "gui-test-vm_1_GB_VOLUME - testing recovery",
                    "Id": {
                        "InternalVmName": "vm-690",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 1242
                }, {
                    "DisplayName": "gui-local-IN_RESOURCE_POOL-2 - testing recovery",
                    "Id": {
                        "InternalVmName": "vm-706",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 226
                }, {
                    "DisplayName": "gui-local-IN_RESOURCE_POOL-2",
                    "Id": {
                        "InternalVmName": "vm-663",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 226
                }, {
                    "DisplayName": "gui-local-IN_RESOURCE_POOL-1 - testing recovery",
                    "Id": {
                        "InternalVmName": "vm-707",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 226
                }, {
                    "DisplayName": "vapp-vm-test",
                    "Id": {
                        "InternalVmName": "vm-752",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 226
                }, {
                    "DisplayName": "liron-local-vm - testing recovery",
                    "Id": {
                        "InternalVmName": "vm-708",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 226
                }, {
                    "DisplayName": "gui-local-IN_RESOURCE_POOL-1",
                    "Id": {
                        "InternalVmName": "vm-664",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 226
                }, {
                    "DisplayName": "kobi-local-vm - testing recovery",
                    "Id": {
                        "InternalVmName": "vm-691",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "SizeInMb": 226
                }],
                "TargetSites": [{
                    "OwnersId": {
                        "Id": {"OwnersGuid": "f5004f87-3426-43ca-be14-9938a2e20ece"},
                        "DisplayName": "gui_localat Zerto (Local)",
                        "IsLocal": true
                    },
                    "SiteId": {"SiteGuid": "135d6a0c-709f-4212-b036-dee72184bb85"},
                    "IsConnected": true,
                    "IsVCenterEnabled": true,
                    "IsVCDEnabled": false,
                    "IsPublicCloud": false,
                    "IsCustomerSite": false
                }]
            },
            "targetSite": null,
            "selectedVCDVapp": null,
            "sourceSiteType": {"sourceType": 0},
            "showVcVms": true,
            "showVCDVapps": false,
            "vcVms": null,
            "targetVirtualDatacenter": null,
            "targetResourcePool": null,
            "targetDs": null,
            "serviceProfile": {},
            "targetDatastoreData": [],
            "targetOrgVDCDropDownData": [],
            "targetResourcePoolDropDownData": [],
            "serviceProfileDropDownData": []
        };
        controller = $controller('zsspCreateVpgController', {
            $scope: testScope,
            zsspCreateVPGModel: zsspCreateVPGModel,
            zertoServiceFactory: zertoServiceFactory,
            enums: enums,
            $translate: $translate
        });
    }));

    it("should check definitions in controller", function () {
        expect(testScope.loading).toBeFalsy();
        expect(testScope.forms).toBeDefined();
        expect(testScope.selectedItems).toBeDefined();
        expect(testScope.customOptions).toBeDefined();
        expect(testScope.handleSave).toBeDefined();
        expect(testScope.handleVcdVappItemChange).toBeDefined();
        expect(testScope.validateForm).toBeDefined();
        expect(testScope.setAdvancedButton).toBeDefined();
    });

    it("should check the source type to vms", function () {
        expect(testScope.data.sourceSiteType.sourceType).toEqual(enums.VpgEntityType.VCVpg);
        expect(testScope.gridData.length).toEqual(8);
    });

    it("should check the validate function", function () {
        expect(testScope.validateForm()).toBeFalsy();
        testScope.selectedItems = testScope.gridData[0];
        expect(testScope.validateForm()).toBeTruthy();
    });

    it("should check the handleSave function", function () {
        testScope.selectedItems = testScope.gridData[0];
        testScope.data.targetResourcePool = {Id: 'xxxx'};
        testScope.data.targetDs = {Datastore: {Id: 'xxxx'}};
        testScope.data.targetSite = {SiteId: 'xxxx'};
        testScope.targetType = enums.VpgEntityType.VCVpg;
        testScope.handleSave();
        expect(zertoServiceFactory.CloudPortalCreateProtectionGroup).toHaveBeenCalled();
    });


    it("should check that advanced button is disabled when service profile is not 'custom'", function () {
        testScope.forms.zsspForm = {};
        testScope.forms.zsspForm.$valid = true;
        testScope.data.serviceProfile = {
            "ServiceProfileIdentifier": {"InternalId": "5243b432-9a2c-4004-a779-f093107e611a"},
            "DisplayName": "System Service Profile",
            "Description": "System Service Profile",
            "IsDefault": true,
            "NeedsManage": false
        };
        testScope.setAdvancedButton();
        expect(testScope.advancedButtonDisabled).toBeTruthy();
    });

    it("should check that advanced button is enabled when service profile is 'custom'", function () {
        testScope.forms.zsspForm = {};
        testScope.forms.zsspForm.$valid = true;
        testScope.data.serviceProfile = {
            "ServiceProfileIdentifier": {"InternalId": "11111111-1111-1111-1111-111111111111"},
            "DisplayName": "Custom",
            "Description": "Custom",
            "IsDefault": false,
            "NeedsManage": true
        };
        testScope.setAdvancedButton();
        expect(testScope.advancedButtonDisabled).toBeFalsy();
    });


});
