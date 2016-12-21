module.exports = function GetVCDProviderVirtualDatacenters() {
    return {
        "Potential": [{
            "Id": {
                "Id": "00000000-0000-0000-0000-000000000000",
                "VCDId": "urn:vcloud:providervdc:71e5bf09-56ca-4e43-b344-588efff927b9"
            },
            "DisplayName": "PVDC1",
            "Datastores": [{
                "Id": {
                    "InternalDatastoreName": "datastore-13",
                    "ServerIdentifier": {"ServerGuid": "bbeae52f-9037-49f2-88d1-c21b6432313b"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "BA5-21 IBM DS"
            }, {
                "Id": {
                    "InternalDatastoreName": "datastore-812",
                    "ServerIdentifier": {"ServerGuid": "bbeae52f-9037-49f2-88d1-c21b6432313b"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "BA5-21 DS2"
            }]
        }],
        "Current": [
            {
                "Id": {
                    "Id": "00000000-0000-0000-0000-000000000000",
                    "VCDId": "urn:vcloud:providervdc:71e5bf09-56ca-4e43-b344-588efff927b9"
                },
                "DisplayName": "PVDC1",
                "DatastoreSettings": [{
                    "Id": {
                        "InternalDatastoreName": "datastore-812",
                        "ServerIdentifier": {"ServerGuid": "bbeae52f-9037-49f2-88d1-c21b6432313b"}
                    },
                    "Journal": false,
                    "Preseed": false,
                    "Enable": false,
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "BA5-21 DS2",
                    "PresentedAs": "BA5-21 DS2"
                }]
            }
        ], "UseOnly": true
    };
};
