module.exports = function GetVCD2VCDInitialNetworksMapping() {
    return [{
        "OriginalOrgVdcNetworkValue": {
            "Id": {
                "Id": "00000000-0000-0000-0000-000000000000",
                "VCDId": "urn:vcloud:network:6a475e1b-9e15-4a55-ba66-d8071c847e82"
            }, "DisplayName": "ExtNet1Org2"
        },
        "ReverseReplicationTestOrgVdcNetworkValue": {"Id": null, "DisplayName": "[Isolated]"},
        "RecoveryOrgVdcNetworkValue": null,
        "RecoveryTestOrgVdcNetworkValue": {"Id": null, "DisplayName": "[Isolated]"}
    }];
};
