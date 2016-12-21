module.exports = function GetPotentialDatastoresForJournal() {
    return [{
        "Datastore": {
            DatastoreClusterIdentifier: null,
            DisplayName: "[DS_Cluster_1]BK1-30 DS (38.2GB free of 99.8GB)",
            "Id": {
                "InternalDatastoreName": "datastore-11",
                "ServerIdentifier": {
                    "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125",
                }
            }
        },
        "IsEnabled": true
    },
        {
            "Datastore": {
                "DatastoreClusterIdentifier": null,
                "DisplayName": "BK2BL2-14 DS (38.3GB free of 199GB)",
                "Id": {
                    "InternalDatastoreName": "datastore-28",
                    "ServerIdentifier": {
                        "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125"
                    }
                }
            },
            "IsEnabled": true
        },
        {
            "Datastore": {
                "DatastoreClusterIdentifier": null,
                "DisplayName": "[DS_Cluster_1]Cluster BK1-30 BK2BL2-14 DS1 (44.1GB free of 99.8GB)",
                "Id": {
                    "InternalDatastoreName": "datastore-70",
                    "ServerIdentifier": {
                        "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125"
                    }
                }
            },
            "IsEnabled": true
        },
        {
            "Datastore": {
                "DatastoreClusterIdentifier": {
                    "InternalName": "group-p71",
                    "ServerIdentifier": {
                        "ServerGuid": "f341a53f-ccc6-4728-af33-07bf7c255125"
                    }
                },
                "DisplayName": "DS_Cluster_1",
                "Id": null
            },
            "IsEnabled": true
        }
    ];
};
