module.exports = function GetVCenterPotentialRestoreSecondaryEntities() {
    return {
        "Datastores": [{
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-10",
                    "ServerIdentifier": {
                        "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                    }
                },
                "DatastoreClusterIdentifier": null,
                "DisplayName": "BA6BL01-04_NTAP_DS2"
            },
            "IsEnabled": true
        },
            {
                "Datastore": {
                    "Id": {
                        "InternalDatastoreName": "datastore-11",
                        "ServerIdentifier": {
                            "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                        }
                    },
                    "DatastoreClusterIdentifier": null,
                    "DisplayName": "BA6BL01-04_NTAP_DS"
                },
                "IsEnabled": true
            }],
        "Networks": [{
            "Id": {
                "ServerIdentifier": {
                    "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                },
                "InternalType": "Network",
                "InternalName": "network-12"
            },
            "DisplayName": "VM Network"
        }],
        "Folders": [{
            "Id": {
                "InternalFolderName": "group-v3",
                "ServerIdentifier": {
                    "ServerGuid": "3bad11be-8295-4c63-a538-70be5fcb60d1"
                }
            },
            "DisplayName": "/"
        }]
    };
};
