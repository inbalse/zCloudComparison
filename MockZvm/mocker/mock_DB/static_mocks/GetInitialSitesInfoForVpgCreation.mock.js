module.exports = function GetInitialSitesInfoForVpgCreation() {
    return {
        "LocalVCDVapps": [{
            "Vapp": {
                "DisplayName": "SdVapp1Org3",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:895cbb2e-ec24-493f-8299-9ee05e27021a"
                }
            }, "OwningVirtualDataCenterName": "OrgVcdSiteD3"
        }, {
            "Vapp": {
                "DisplayName": "VPG_CLOUD2",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:2cb5fe06-dc64-4609-9e17-674f8ebc78e2"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD2"
        }, {
            "Vapp": {
                "DisplayName": "SdVapp4Org2",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:6c8781f8-488a-403f-86a4-d2a9fb071c0f"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD2"
        }, {
            "Vapp": {
                "DisplayName": "Sd56VolsVapp",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:aa660ab6-61a6-46b5-87d6-179c030fce3f"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD2"
        }, {
            "Vapp": {
                "DisplayName": "SdVapp3Org2",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:b26549ba-5e30-4ce6-af92-e997e1fb9000"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD2"
        }, {
            "Vapp": {
                "DisplayName": "SdVapp1Org2",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:ba3003b0-5935-4781-90a6-3d1ddbd94376"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD2"
        }, {
            "Vapp": {
                "DisplayName": "SdVapp2Org2",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:f3fbd522-07fb-4a1a-95e8-f72cb84bc13a"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD2"
        }, {
            "Vapp": {
                "DisplayName": "sdvApp1",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:3a518ad1-a809-451f-be80-64433788f206"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD1"
        }, {
            "Vapp": {
                "DisplayName": "rhelVapp1",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:8590f336-5466-4753-8a49-e774c3f0a7f8"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD1"
        }, {
            "Vapp": {
                "DisplayName": "rhelVapp3",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:9c9ebaa0-558b-439f-896a-110361ecb144"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD1"
        }, {
            "Vapp": {
                "DisplayName": "rhelVapp4",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:d3ada32b-48a6-49f9-a92b-fc1e03690772"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD1"
        }, {
            "Vapp": {
                "DisplayName": "rhelVapp2",
                "VcdVappIdentifier": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:vapp:fab1122f-b22d-42ff-93a2-6705216d9839"
                }
            }, "OwningVirtualDataCenterName": "OrgvDCSiteD1"
        }],
        "TargetSites": [{
            "OwnersId": {
                "Id": {"OwnersGuid": "aebe9ef5-754d-4742-bcfc-1ca1b708de16"},
                "DisplayName": "SiteC(172.20.149.88)",
                "IsLocal": false
            },
            "SiteId": {"SiteGuid": "a7ba31b8-6c90-4f13-b7ee-8e1cb0978204"},
            "IsConnected": true,
            "IsVCenterEnabled": true,
            "IsVCDEnabled": true,
            "VirtualizationProviderType": 0
        }],
        "AllowSourceVcenter": true,
        "PotentialZertoOrganization": [{
            "Identifier": {"Guid": "a313fb95-35f4-4681-95e8-93d0ecc9676b"},
            "OrganizationName": "HostingVcdZorg",
            "CrmIdentifier": "",
            "EnableCustomProfile": true
        }, {
            "Identifier": {"Guid": "00000000-0000-0000-0000-000000000000"},
            "OrganizationName": "No Organization",
            "CrmIdentifier": "No Contact",
            "EnableCustomProfile": true
        }],
        "AllowOneToMany":true,
        "DisallowedOneToManyReason":""
    };
};

