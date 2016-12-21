module.exports = function GetStopTestScreen() {
    return {
        "ProtectionGroups": [{
            "Id": {"GroupGuid": "fb039d0f-4b57-45fe-8c02-cc3ec5215f2a"},
            "Name": "xxx",
            "State": 0,
            "IsCurrentlyTesting": true,
            "ElapsedTimeInActiveTestInSeconds": 11351,
            "CurrentTestCheckPoint": {
                "Identifier": {"Identifier": 15},
                "TimeStamp": "2015-08-17T07:16:25.000Z",
                "Tag": null,
                "Vss": false
            },
            "Direction": 2,
            "ActiveProcesses": {
                "RunningFailOverTest": {"ProgressValue": 0, "StopEnabled": true, "Stage": 0},
                "RunningClone": null,
                "Paused": null,
                "IsVpgNowPaused": false,
                "IsResumeEnabled": false,
                "RunningBackup": null,
                "IsStopFOTEnabled": false,
                "VpgUpdate": null,
                "TimebombInfo": null
            }
        }]
    };
};
