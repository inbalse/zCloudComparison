module.exports = function GetHostEntitiesForVraInstall() {
    return {
        "Datastores": [{
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-10",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "datastore1 (345MB / 0.50GB Free)"
            }, "IsEnabled": false
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-12",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "ZNest81Datastore (92.3GB / 99.8GB Free)"
            }, "IsEnabled": true
        }, {
            "Datastore": {
                "Id": {
                    "InternalDatastoreName": "datastore-224",
                    "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                }, "DatastoreClusterIdentifier": null, "DisplayName": "public (462GB / 799GB Free)"
            }, "IsEnabled": true
        }],
        "Networks": [{
            "Id": {
                "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"},
                "InternalType": "Network",
                "InternalName": "network-11"
            }, "DisplayName": "VM Network"
        }]
    };
};
