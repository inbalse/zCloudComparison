module.exports = function GetVCD2VCDPotentialOrgNetworks() {
    return {
        "PotentialReverseTestNetworks": [{
            "Id": {
                "Id": "00000000-0000-0000-0000-000000000000",
                "VCDId": "urn:vcloud:network:6a475e1b-9e15-4a55-ba66-d8071c847e82"
            }, "DisplayName": "ExtNet1Org2"
        }, {"Id": null, "DisplayName": "[Isolated]"}],
        "PotentialRecoveryNetworks": [{
            "Id": {
                "Id": "00000000-0000-0000-0000-000000000000",
                "VCDId": "urn:vcloud:network:35e45522-eca6-4b75-9500-88c1d027557e"
            }, "DisplayName": "ExtNet1Org1"
        }, {"Id": null, "DisplayName": "[Isolated]"}]
    };
};
