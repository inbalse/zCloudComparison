module.exports = function GetInfoForEditingReverseConfigForMultipleVolumes() {
    return {
        "PotentialDatastores": [{
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-10",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (455MB free of 0.50GB)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-582",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81 DS (45.6GB free of 99.8GB)"
            }, "IsEnabled": true
        }], "OptionalExistingDisk": null, "PotentialRawDevices": [], "IsThinSelectionEnabled": true
    };
};
