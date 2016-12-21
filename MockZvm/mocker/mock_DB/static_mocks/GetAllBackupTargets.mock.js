module.exports = function GetAllBackupTargets() {
    return {
        "BackupTargets": [{
            "ConnectivityState": 1,
            "RestorePoints": {"NumberOfSuccessfullRuns": 0, "TotalNumberOfRuns": 0},
            "ActiveJobs": 0,
            "IsEdit": true,
            "IsDelete": true,
            "ID": {"Identifier": "960f1817-f881-47f9-b642-2741a99bca13"},
            "DisplayName": "test",
            "IsCompressionEnabled": true,
            "RepositoryType": 0,
            "SMBData": null,
            "LocalData": {"Path": "C:\\tmp"},
            "AWSData": null,
            "Capacity": 237973,
            "FreeSpace": 106104,
            "IsDefault": false
        }, {
            "ConnectivityState": 0,
            "RestorePoints": {"NumberOfSuccessfullRuns": 0, "TotalNumberOfRuns": 0},
            "ActiveJobs": 0,
            "IsEdit": true,
            "IsDelete": true,
            "ID": {"Identifier": "c511f2d3-674a-46fd-894a-9a5078d2d714"},
            "DisplayName": "rep",
            "IsCompressionEnabled": true,
            "RepositoryType": 1,
            "SMBData": {PathToFolder: 'C:\\tmp'},
            "LocalData": {"Path": "C:\\tmp"},
            "AWSData": null,
            "Capacity": 237973,
            "FreeSpace": 106104,
            "IsDefault": false
        }, {
            "ConnectivityState": 0,
            "RestorePoints": {"NumberOfSuccessfullRuns": 0, "TotalNumberOfRuns": 0},
            "ActiveJobs": 0,
            "IsEdit": true,
            "IsDelete": true,
            "ID": {"Identifier": "c511f2d3-674a-46fd-894a-9a5078d2d715"},
            "DisplayName": "rep",
            "IsCompressionEnabled": true,
            "RepositoryType": 2,
            "SMBData": null,
            "LocalData": {"Path": "C:\\tmp"},
            "AWSData": {"Path": 'someAWSpath'},
            "Capacity": 237973,
            "FreeSpace": 106104,
            "IsDefault": false
        }], "IsAddEnabled": true
    }
};
