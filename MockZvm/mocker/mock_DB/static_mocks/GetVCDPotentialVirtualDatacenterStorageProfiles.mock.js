module.exports = function GetVCDPotentialVirtualDatacenterStorageProfiles() {
    return [{
        "Id": {
            "Id": "00000000-0000-0000-0000-000000000000",
            "VCDId": "urn:vcloud:vdcstorageProfile:1e4cc4ed-b7df-4fe1-99f5-19e7315b56e1"
        },
        "DisplayName": "SP \"Cluster IBM 2\"",
        "Enabled": true
    },
        {
            "Id": {
                "Id": "00000000-0000-0000-0000-000000000000",
                "VCDId": "urn:vcloud:vdcstorageProfile:7c25836c-0246-4986-8e5c-0e9357ee6ae6"
            },
            "DisplayName": "SP \"Cluster IBM 1\"",
            "Enabled": true
        },
        {
            "Id": {
                "Id": "00000000-0000-0000-0000-000000000000",
                "VCDId": "urn:vcloud:vdcstorageProfile:dc16e6b5-3782-4006-841e-1523dbdac82f"
            },
            "DisplayName": "* (Any)",
            "Enabled": true
        }];
};
