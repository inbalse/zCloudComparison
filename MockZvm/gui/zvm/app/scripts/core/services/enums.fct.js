'use strict';
angular.module('zvmApp.services').factory('enums', function(){
    
    /* jshint ignore:start */
    var enums = {};
    /**
     * Enum for BackupTargetState values.
     * @readonly
     * @enum {number}
     */
    enums.BackupTargetState = {
        Connected: 0,
        Disconnected: 1
    };
    /**
     * Enum for BackupTargetType values.
     * @readonly
     * @enum {number}
     */
    enums.BackupTargetType = {
        Local: 0,
        ServerMessageBlock: 1,
        AmazonS3: 2
    };
    /**
     * Enum for ChangeHostVmVisualObject_ChangeHostValidationStatus values.
     * @readonly
     * @enum {number}
     */
    enums.ChangeHostVmVisualObject_ChangeHostValidationStatus = {
        Good: 0,
        Bad: 1,
        Natural: 2,
        Warning: 3
    };
    /**
     * Enum for CommandTaskRecordSortType values.
     * @readonly
     * @enum {number}
     */
    enums.CommandTaskRecordSortType = {
        None: 0,
        StatusAndDate: 1
    };
    /**
     * Enum for CommandTaskRecordStateVisualObject values.
     * @readonly
     * @enum {number}
     */
    enums.CommandTaskRecordStateVisualObject = {
        FirstUnusedValue: 0,
        InProgress: 1,
        WaitingForUserInput: 2,
        Paused: 3,
        Failed: 4,
        Completed: 5,
        Cancelling: 6
    };
    /**
     * Enum for CommandTaskStatusFilterVisualObject values.
     * @readonly
     * @enum {number}
     */
    enums.CommandTaskStatusFilterVisualObject = {
        Running: 0,
        Completed: 1,
        Failed: 2,
        WaitingForUserInput: 3
    };
    /**
     * Enum for ComputeResourceType values.
     * @readonly
     * @enum {number}
     */
    enums.ComputeResourceType = {
        Host: 0,
        Cluster: 1
    };
    /**
     * Enum for CopyNatRulesOptions values.
     * @readonly
     * @enum {number}
     */
    enums.CopyNatRulesOptions = {
        DontCopy: 0,
        CopyAsIs: 1,
        ConvertAutoToManualAndRetainExternalIp: 2
    };
    /**
     * Enum for DatastoreAlertStatusVisualObject values.
     * @readonly
     * @enum {number}
     */
    enums.DatastoreAlertStatusVisualObject = {
        Error: 0,
        Normal: 1,
        Warning: 2,
        NotAvailable: 3
    };
    /**
     * Enum for DatastoreAvailabilityStatusVisualObject values.
     * @readonly
     * @enum {number}
     */
    enums.DatastoreAvailabilityStatusVisualObject = {
        Available: 0,
        Maintenance: 1,
        EnteringMaintenance: 2,
        Unavailable: 3
    };
    /**
     * Enum for DayOfWeek values.
     * @readonly
     * @enum {number}
     */
    enums.DayOfWeek = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };
    /**
     * Enum for ExtensionTask_ZCommand values.
     * @readonly
     * @enum {number}
     */
    enums.ExtensionTask_ZCommand = {
        FirstUnusedValue: 0,
        CreateProtectionGroup: 1,
        RemoveProtectionGroup: 2,
        FailOver: 3,
        FailOverTest: 4,
        StopFailOverTest: 5,
        Move: 6,
        GetCheckpointList: 7,
        ProtectVM: 8,
        UnprotectVM: 9,
        AddVMToProtectionGroup: 10,
        RemoveVMFromProtectionGroup: 11,
        InstallVra: 12,
        UninstallVra: 13,
        GetVMSettings: 14,
        UpdateProtectionGroup: 15,
        InsertTaggedCP: 16,
        WaitForCP: 17,
        HandleMirrorPromotion: 18,
        ActivateAllMirrors: 19,
        LogCollection: 20,
        ClearCheckpoints: 21,
        ForceReconfigurationOfNewVM: 22,
        ClearSite: 23,
        ForceRemoveProtectionGroup: 24,
        ForceUpdateProtectionGroup: 25,
        ForceKillProtectionGroup: 26,
        PrePostScript: 27,
        InitFullSync: 28,
        Pair: 29,
        Unpair: 30,
        AddPeerVraInfo: 31,
        RemovePeerVraInfo: 32,
        InstallCloudConnector: 33,
        UninstallCloudConnector: 34,
        HandleFirstSyncDone: 35,
        Clone: 36,
        MoveBeforeCommit: 37,
        MoveRollback: 38,
        MoveCommit: 39,
        UpgradeVra: 40,
        MaintainHost: 41,
        NotSupportedInThisVersion: 42,
        MoveProtectionGroupToManualOperationNeeded: 43,
        FailoverBeforeCommit: 44,
        FailoverCommit: 45,
        FailoverRollback: 46,
        ChangeVraIpSetting: 47,
        PauseProtectionGroup: 48,
        ResumeProtectionGroup: 49,
        BulkUpgradeVras: 50,
        BulkUninstallVras: 51,
        ChangeVraPassword: 52,
        ChangeRecoveryHost: 53,
        ChangeRecoveryHostForProtectionGroup: 54,
        VpgBackup: 55,
        RedeployCloudConnector: 56,
        RestoreVpg: 57,
        VpgDeleteBackup: 58,
        SubmitSupportTicket: 59,
        PreScript: 60,
        PostScript: 61,
        ChangeVraPasswordIpSettings: 62,
        FlrJournalMount: 63,
        FlrJournalUnmount: 64,
        StartVMsWithOrder: 65
    };
    /**
     * Enum for HypervisorType values.
     * @readonly
     * @enum {number}
     */
    enums.HypervisorType = {
        VCenter: 0,
        Scvmm: 1,
        None: 2
    };
    /**
     * Enum for InWizardValidationTypeVisualObject values.
     * @readonly
     * @enum {number}
     */
    enums.InWizardValidationTypeVisualObject = {
        LocalDuplicateVpgName: 0,
        ZeroDiskOnSourceVm: 1,
        RecoveryHost: 2,
        RecoveryDatastoreVm: 3,
        JournalSpaceConfiguredForVm: 4,
        AllowedCreationOfSelfProtectedVpg: 5,
        ValidateZorg: 6,
        AWSUpperLimitOnSourceVm: 7,
        VcdPreseedDisks: 8,
        RecoveryDatastoreVolume: 9,
        FolNetwork: 10,
        FotNetwork: 11,
        NicIpSetting: 12,
        BackupScheduler: 13,
        BakupCompetabilty: 14,
        DuplicateVpgName: 15,
        ProtectedVmName: 16,
        ProtectedVolumeSupportedByVcd: 17,
        DefaultComputeResourceCanSeeDefaultJournalDatastore: 18,
        DefaultComputeResourceCanSeeDefaultRecoveryDatastore: 19,
        VmComputeResourceCanSeeVmRecoveryDatastore: 20,
        VmComputeResourceCanSeeVolumeRecoveryDatastore: 21,
        RecoveryOrgVdc: 22,
        ReverseReplicationValidation: 23,
        OneToManyBCValidation: 24
    };
    /**
     * Enum for JournalLimitType values.
     * @readonly
     * @enum {number}
     */
    enums.JournalLimitType = {
        Unlimited: 0,
        Megabytes: 1,
        Percentage: 2
    };
    /**
     * Enum for MoveNextAction values.
     * @readonly
     * @enum {number}
     */
    enums.MoveNextAction = {
        Rollback: 0,
        Commit: 1,
        None: 2
    };
    /**
     * Enum for PairingVisualStatus values.
     * @readonly
     * @enum {number}
     */
    enums.PairingVisualStatus = {
        Paired: 0,
        Pairing: 1,
        Unpairing: 2
    };
    /**
     * Enum for ProtectionGroupAlertStatus values.
     * @readonly
     * @enum {number}
     */
    enums.ProtectionGroupAlertStatus = {
        Normal: 0,
        Warning: 1,
        Error: 2,
        Pairing: 3,
        Unpairing: 4
    };
    /**
     * Enum for ProtectionGroupPriority values.
     * @readonly
     * @enum {number}
     */
    enums.ProtectionGroupPriority = {
        Low: 0,
        Medium: 1,
        High: 2
    };
    /**
     * Enum for ProtectionGroupStateVisual values.
     * @readonly
     * @enum {number}
     */
    enums.ProtectionGroupStateVisual = {
        Protected: 0,
        Recovery: 1,
        SelfProtected: 2
    };
    /**
     * Enum for RecoveryOperationStatus values.
     * @readonly
     * @enum {number}
     */
    enums.RecoveryOperationStatus = {
        Unknown: 0,
        Succeed: 1,
        Failed: 2,
        PassedByUser: 3,
        FailedByUser: 4
    };
    /**
     * Enum for RecoveryProtectionGroupsSLABreachSorting values.
     * @readonly
     * @enum {number}
     */
    enums.RecoveryProtectionGroupsSLABreachSorting = {
        LargestBreachGap: 0,
        LongestTotalBreachTime: 1
    };
    /**
     * Enum for RecoveryProtectionGroupsSLASorting values.
     * @readonly
     * @enum {number}
     */
    enums.RecoveryProtectionGroupsSLASorting = {
        TargetRPO: 0,
        ActualRPO: 1,
        ActualRTO: 2,
        RPOActualToTargetDiff: 3
    };
    /**
     * Enum for RecoveryType values.
     * @readonly
     * @enum {number}
     */
    enums.RecoveryType = {
        Failover: 0,
        Move: 1,
        FailoverTest: 2
    };
    /**
     * Enum for Resolution values.
     * @readonly
     * @enum {number}
     */
    enums.Resolution = {
        All: 0,
        Daily: 1,
        Weekly: 2,
        Monthly: 3
    };
    /**
     * Enum for ResourcesReportSettings_SamplingResolution values.
     * @readonly
     * @enum {number}
     */
    enums.ResourcesReportSettings_SamplingResolution = {
        Hourly: 0,
        Daily: 1
    };
    /**
     * Enum for RestoreIpType values.
     * @readonly
     * @enum {number}
     */
    enums.RestoreIpType = {
        Dhcp: 0,
        Static: 1,
        Same: 2
    };
    /**
     * Enum for RestorePointRangeType values.
     * @readonly
     * @enum {number}
     */
    enums.RestorePointRangeType = {
        OneWeek: 0,
        OneMonth: 1,
        ThreeMonths: 2,
        SixMonths: 3,
        NineMonths: 4,
        OneYear: 5
    };
    /**
     * Enum for RestoreType values.
     * @readonly
     * @enum {number}
     */
    enums.RestoreType = {
        VC: 0,
        VCD: 1
    };
    /**
     * Enum for RetentionPolicyVisualObject_VQRetentionPolicyEnum values.
     * @readonly
     * @enum {number}
     */
    enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum = {
        Standard: 0,
        Extended: 1
    };
    /**
     * Enum for SchedulePeriodType values.
     * @readonly
     * @enum {number}
     */
    enums.SchedulePeriodType = {
        Daily: 0,
        Weekly: 1
    };
    /**
     * Enum for SiteLicenseType values.
     * @readonly
     * @enum {number}
     */
    enums.SiteLicenseType = {
        Cloud: 0,
        Enterprise: 1,
        Customer: 2,
        Unknown: 3,
        ZCA: 4
    };
    /**
     * Enum for StorageResourceType values.
     * @readonly
     * @enum {number}
     */
    enums.StorageResourceType = {
        Datastore: 0,
        Cluster: 1
    };
    /**
     * Enum for SupportTicketResultStatus values.
     * @readonly
     * @enum {number}
     */
    enums.SupportTicketResultStatus = {
        Success: 0,
        InvalidEmailForAccount: 1,
        NoLicense: 2,
        ServerInternalError: 3,
        Running: 4,
        CommunicationException: 5,
        Aborted: 6,
        Exception: 7,
        UnknownTask: 8
    };
    /**
     * Enum for SystemEventType_GeneralEventType values.
     * @readonly
     * @enum {number}
     */
    enums.SystemEventType_GeneralEventType = {
        All: 0,
        Events: 1,
        Alerts: 2
    };
    /**
     * Enum for SystemStateAlertLevel values.
     * @readonly
     * @enum {number}
     */
    enums.SystemStateAlertLevel = {
        Warning: 0,
        Error: 1
    };
    /**
     * Enum for TestStatus values.
     * @readonly
     * @enum {number}
     */
    enums.TestStatus = {
        Unknown: 0,
        FailedBySystem: 1,
        AbortedByFailoverCommand: 2,
        AbortedBySystem: 3,
        FailedByUser: 4,
        Success: 5,
        CurrentlyRunning: 6
    };
    /**
     * Enum for TicketSeverity values.
     * @readonly
     * @enum {number}
     */
    enums.TicketSeverity = {
        Low: 0,
        Medium: 1,
        High: 2,
        Critical: 3
    };
    /**
     * Enum for TicketType values.
     * @readonly
     * @enum {number}
     */
    enums.TicketType = {
        Problem: 0,
        FeatureRequest: 1,
        Question: 2
    };
    /**
     * Enum for VCDNetworkFenceMode_VCDNetworkFenceModeType values.
     * @readonly
     * @enum {number}
     */
    enums.VCDNetworkFenceMode_VCDNetworkFenceModeType = {
        Isolated: 0,
        Natrouted: 1,
        Bridged: 2
    };
    /**
     * Enum for VCDNetworkIpMode_VCDNetworkIpModeType values.
     * @readonly
     * @enum {number}
     */
    enums.VCDNetworkIpMode_VCDNetworkIpModeType = {
        IPPool: 0,
        Manual: 1,
        Dhcp: 2,
        None: 3
    };
    /**
     * Enum for VMVolumeType values.
     * @readonly
     * @enum {number}
     */
    enums.VMVolumeType = {
        Scsi: 0,
        Ide: 1
    };
    /**
     * Enum for VolumeMode values.
     * @readonly
     * @enum {number}
     */
    enums.VolumeMode = {
        Flat: 0,
        RdmVirtual: 1,
        RdmPhysical: 2,
        Delta: 3
    };
    /**
     * Enum for VpgActiveProcesses_FailOverTest_TestStage values.
     * @readonly
     * @enum {number}
     */
    enums.VpgActiveProcesses_FailOverTest_TestStage = {
        InTest: 0,
        Starting: 1,
        Stopping: 2
    };
    /**
     * Enum for VpgActiveProcesses_PausedVpg_PauseStage values.
     * @readonly
     * @enum {number}
     */
    enums.VpgActiveProcesses_PausedVpg_PauseStage = {
        Paused: 0,
        Pausing: 1,
        Resuming: 2
    };
    /**
     * Enum for VpgBackupJobSummaryStatusVisualObject values.
     * @readonly
     * @enum {number}
     */
    enums.VpgBackupJobSummaryStatusVisualObject = {
        Running: 0,
        Scheduled: 1,
        InActive: 2,
        Aborting: 3
    };
    /**
     * Enum for VpgBackupLastRunResultVisualObject values.
     * @readonly
     * @enum {number}
     */
    enums.VpgBackupLastRunResultVisualObject = {
        FullSuccess: 0,
        PartialSuccess: 1,
        Failed: 2,
        Aborted: 3,
        NotAvailable: 4
    };
    /**
     * Enum for VpgEntityType values.
     * @readonly
     * @enum {number}
     */
    enums.VpgEntityType = {
        VCVpg: 0,
        VCvApp: 1,
        VCDvApp: 2,
        Aws: 3,
        HyperV: 4,
        Azure: 5
    };
    /**
     * Enum for VPGRetentionPolicyType values.
     * @readonly
     * @enum {number}
     */
    enums.VPGRetentionPolicyType = {
        StandardDR: 0,
        ExtendedDR: 1
    };
    /**
     * Enum for VPGVisualState values.
     * @readonly
     * @enum {number}
     */
    enums.VPGVisualState = {
        Protecting: 0,
        Promoting: 1,
        Test: 2,
        NeedsConfiguration: 3,
        Updating: 4,
        FailingOver: 5,
        StartingFailoverTest: 6,
        CleaningUpfailoverTest: 7,
        Moving: 8,
        FailoverBeforeCommit: 9,
        FailoverCommit: 10,
        FailoverRollback: 11,
        MovingBeforeCommit: 12,
        MovingRollback: 13,
        MovingCommit: 14,
        Removing: 15,
        Error: 16,
        EmptyVApp: 17,
        DisconnectedFromPeer: 18,
        DisconnectedFromPeerNoRecoveryPoints: 19,
        RecoveryPossible: 20,
        RollingBack: 21,
        PendingRemove: 22,
        ReplicationPaused: 23,
        Paused: 24,
        Pausing: 25,
        Resuming: 26,
        RecoveryStorageProfileError: 27,
        Sync: 28,
        InitialSyncSinglePhase: 29,
        FullSync: 30,
        DeltaSync: 31,
        VolumeInitialSyncSinglePhase: 32,
        VolumeFullSync: 33,
        VolumeDeltaSync: 34,
        BitmapSync: 35,
        CreatingVpg: 36,
        Backup: 37
    };
    /**
     * Enum for VpgVisualStatus values.
     * @readonly
     * @enum {number}
     */
    enums.VpgVisualStatus = {
        Initializing: 0,
        MeetingSLA: 1,
        NotMeetingSLA: 2,
        RpoNotMeetingSLA: 3,
        HistoryNotMeetingSLA: 4,
        FailingOver: 5,
        Moving: 6,
        Deleting: 7,
        Recovered: 8
    };
    /**
     * Enum for VpgVisualSubStatus values.
     * @readonly
     * @enum {number}
     */
    enums.VpgVisualSubStatus = {
        None: 0,
        InitialSync: 1,
        Creating: 2,
        VolumeInitialSync: 3,
        Sync: 4,
        RecoveryPossible: 5,
        DeltaSync: 6,
        NeedsConfiguration: 7,
        Error: 8,
        EmptyProtectionGroup: 9,
        DisconnectedFromPeerNoRecoveryPoints: 10,
        FullSync: 11,
        VolumeDeltaSync: 12,
        VolumeFullSync: 13,
        FailingOverCommitting: 14,
        FailingOverBeforeCommit: 15,
        FailingOverRollingBack: 16,
        Promoting: 17,
        MovingCommitting: 18,
        MovingBeforeCommit: 19,
        MovingRollingBack: 20,
        Deleting: 21,
        PendingRemove: 22,
        BitmapSync: 23,
        DisconnectedFromPeer: 24,
        ReplicationPausedUserInitiated: 25,
        ReplicationPausedSystemInitiated: 26,
        RecoveryStorageProfileError: 27,
        RollingBack: 28,
        RecoveryStorageError: 29,
        JournalStorageError: 30,
        VmNotProtectedError: 31,
        JournalOrRecoveryMissingError: 32
    };
    /**
     * Enum for VraListScreenTreeNodeVisualType values.
     * @readonly
     * @enum {number}
     */
    enums.VraListScreenTreeNodeVisualType = {
        Root: 0,
        Cluster: 1,
        Host: 2,
        OrphanedHost: 3
    };
    /**
     * Enum for VraStatusVisual values.
     * @readonly
     * @enum {number}
     */
    enums.VraStatusVisual = {
        Installed: 0,
        UnsupportedEsxVersion: 1,
        NotInstalled: 2,
        Installing: 3,
        Removing: 4,
        InstallationError: 5,
        HostPasswordChanged: 6,
        UpdatingIpSettings: 7,
        DuringChangeHost: 8,
        HostInMaintenanceMode: 9
    };
    /**
     * Enum for VraUpgradeStatus values.
     * @readonly
     * @enum {number}
     */
    enums.VraUpgradeStatus = {
        None: 0,
        UpgradeAvailable: 1,
        Upgrading: 2,
        UpgradeFailed: 3,
        LatestVersion: 4
    };
    
    return enums;
    /* jshint ignore:end */
});
