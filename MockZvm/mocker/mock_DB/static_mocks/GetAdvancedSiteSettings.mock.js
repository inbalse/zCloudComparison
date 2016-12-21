module.exports = function GetAdvancedSiteSettings() {
    return {
        "PrePostOperationTimeoutInSec": 300,
        "ReplicationPauseTimeInMinutesDefault": 0,
        "PerformanceGraphGraphScale": {
            "Iops": 0,
            "BandwidthInMB": 0,
            "ThroughputInMB": 0,
            "RPOInSeconds": 0,
            "CPU": 0,
            "VraLocalMemory": 0,
            "VraRemoteMemory": 0
        },
        "MoveCommitWaitInSec": 0,
        "MoveRollbackWaitInSec": 536870911,
        "IoCongestionParams": {
            "BadIoLatencyMs": 40,
            "NumBadIosInPeriod": 5,
            "PeriodDurationMs": 5000,
            "NumBadPeriodsForCongested": 3,
            "IsEnabled": true
        },
        "IsCallHomeEnabled": true,
        "EmailConfiguration": {
            "IsEnabled": false,
            "SmtpServerAddress": "",
            "SmtpServerPort": 25,
            "From": "",
            "To": "",
            "ToAddresses": [],
            "BackupNotificationEnabled": false,
            "BackupNotificationScheduleType": 0,
            "BackupNotificationScheduleDayOfWeek": 1,
            "BackupNotificationScheduleTimeOfDay": 420
        },
        "BandwidthSettings": {
            "Enabled": true,
            "FromTimeInMinutes": 0,
            "ToTimeInMinutes": 0,
            "MaxBandwidthInLBpsInTime": 0,
            "MaxBandwidthInLBpsOutsideTime": 0,
            "TimeBasedBandwidthEnabled": false
        },
        "CloudPortalConfig": {"CloudPortalExternalHostName": ""},
        "AllowCreationOfSelfProtectedVpg": true,
        "ResourcesReportSettings": {"Resolution": 1, "TimeOfDayInMinutes": 60},
        "PublicCloudSiteSettings": {"PublicCloudInstanceTypeIdentifier": {"InstanceType": "m3.xlarge"}}
    };
};



