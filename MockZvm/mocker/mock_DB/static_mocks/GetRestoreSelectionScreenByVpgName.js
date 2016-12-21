module.exports = function GetRestoreSelectionScreenByVpgName() {
    return {
        "DisplayName": "Qwerty",
        "Instances": [{
            "BackupJobIdentifier": {
                "Identifier": "0902620d-4025-4d27-904e-0656658a9920"
            },
            "BackupTargetIdentifier": {
                "Identifier": "0867b5ad-e193-4200-8135-fc846cdb467a"
            },
            "SiteIdentifier": {
                "SiteGuid": "e67eb594-382d-4929-b6cb-121cbbdf6143"
            },
            "ProtectionGroupName": "Qwerty",
            "PointInTime": "2016-10-19T06:58:12.000Z",
            "RestoreSiteName": "Site 3",
            "Status": "Full",
            "RepositoryName": "Kirill",
            "ZorgName": null,
            "FullVMs": 2,
            "TotalVMs": 2,
            "FullVolumes": 20,
            "TotalVolumes": 20,
            "VMs": [{
                "VmName": "10 vol",
                "Status": "Full",
                "FullVolumes": 10,
                "TotalVolumes": 10
            },
                {
                    "VmName": "10 vol(2)",
                    "Status": "Full",
                    "FullVolumes": 10,
                    "TotalVolumes": 10
                }],
            "PotentialRestoreTypes": [{
                "RestoreType": 0
            }],
            "IsRestoreEnabled": true,
            "Compressed": true
        }]
    };
};
