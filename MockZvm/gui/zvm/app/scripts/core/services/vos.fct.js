'use strict';
angular.module('zvmApp.services').factory('vos', function(){
    
    /* jshint ignore:start */
    var vos = {};
    /**
     * @param {string} [Version] {@link string}
     * @constructor
     */
    vos.AboutScreenVisualObject = function(Version){
        /** @type {string} */
        this.Version = Version;
    };
    /**
     * @param {string[]} [Entities] {@link string[]}
     * @param {vos.EventGeneralTypesCriteria} [EventGeneralTypes] {@link vos.EventGeneralTypesCriteria}
     * @param {string[]} [EventHelpIds] {@link string[]}
     * @param {string[]} [EventTypes] {@link string[]}
     * @param {number} [MaxResult] {@link number}
     * @param {string[]} [PeerSites] {@link string[]}
     * @param {vos.CommandTaskRelatedEntityVisualObject[]} [RelatedEntities] {@link vos.CommandTaskRelatedEntityVisualObject[]}
     * @param {vos.TimeCriteria} [TimeRange] {@link vos.TimeCriteria}
     * @param {string[]} [Users] {@link string[]}
     * @param {string[]} [VpgNames] {@link string[]}
     * @constructor
     */
    vos.ActivityScreenQueryCriterias = function(Entities, EventGeneralTypes, EventHelpIds, EventTypes, MaxResult, PeerSites, RelatedEntities, TimeRange, Users, VpgNames){
        /** @type {string[]} */
        this.Entities = Entities;
        /** @type {vos.EventGeneralTypesCriteria} */
        this.EventGeneralTypes = EventGeneralTypes;
        /** @type {string[]} */
        this.EventHelpIds = EventHelpIds;
        /** @type {string[]} */
        this.EventTypes = EventTypes;
        /** @type {number} */
        this.MaxResult = MaxResult;
        /** @type {string[]} */
        this.PeerSites = PeerSites;
        /** @type {vos.CommandTaskRelatedEntityVisualObject[]} */
        this.RelatedEntities = RelatedEntities;
        /** @type {vos.TimeCriteria} */
        this.TimeRange = TimeRange;
        /** @type {string[]} */
        this.Users = Users;
        /** @type {string[]} */
        this.VpgNames = VpgNames;
    };
    /**
     * @param {string} [BannedReason] {@link string}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.EventVisualObject[]} [Events] {@link vos.EventVisualObject[]}
     * @param {vos.ActivityScreenQueryCriterias} [QueryCriteriasOptions] {@link vos.ActivityScreenQueryCriterias}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.ActivityScreenVisualObject = function(BannedReason, Details, Events, QueryCriteriasOptions, State){
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.EventVisualObject[]} */
        this.Events = Events;
        /** @type {vos.ActivityScreenQueryCriterias} */
        this.QueryCriteriasOptions = QueryCriteriasOptions;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {vos.PerformanceGraphScaleValues} [PerformanceGraphGraphScale] {@link vos.PerformanceGraphScaleValues}
     * @param {number} [PrePostOperationTimeoutInSec] {@link number}
     * @param {number} [ReplicationPauseTimeInMinutesDefault] {@link number}
     * @param {number} [MoveCommitWaitInSec] {@link number}
     * @param {number} [MoveRollbackWaitInSec] {@link number}
     * @param {vos.VraIoCongestionControlParams} [IoCongestionParams] {@link vos.VraIoCongestionControlParams}
     * @param {boolean} [IsCallHomeEnabled] {@link boolean}
     * @param {vos.EventsEmailConfiguration} [EmailConfiguration] {@link vos.EventsEmailConfiguration}
     * @param {vos.BandwidthLimitSettings} [BandwidthSettings] {@link vos.BandwidthLimitSettings}
     * @param {vos.CloudPortalConfiguration} [CloudPortalConfig] {@link vos.CloudPortalConfiguration}
     * @param {boolean} [AllowCreationOfSelfProtectedVpg] {@link boolean}
     * @param {vos.ResourcesReportSettings} [ResourcesReportSettings] {@link vos.ResourcesReportSettings}
     * @param {vos.PublicCloudSiteSettings} [PublicCloudSiteSettings] {@link vos.PublicCloudSiteSettings}
     * @param {vos.RolesAndPermissionsSettings} [RolesAndPermissionsSettings] {@link vos.RolesAndPermissionsSettings}
     * @param {boolean} [ShouldEnterMMDuringRemediation] {@link boolean}
     * @constructor
     */
    vos.AdvancedSiteSettings = function(PerformanceGraphGraphScale, PrePostOperationTimeoutInSec, ReplicationPauseTimeInMinutesDefault, MoveCommitWaitInSec, MoveRollbackWaitInSec, IoCongestionParams, IsCallHomeEnabled, EmailConfiguration, BandwidthSettings, CloudPortalConfig, AllowCreationOfSelfProtectedVpg, ResourcesReportSettings, PublicCloudSiteSettings, RolesAndPermissionsSettings, ShouldEnterMMDuringRemediation){
        /** @type {vos.PerformanceGraphScaleValues} */
        this.PerformanceGraphGraphScale = PerformanceGraphGraphScale;
        /** @type {number} */
        this.PrePostOperationTimeoutInSec = PrePostOperationTimeoutInSec;
        /** @type {number} */
        this.ReplicationPauseTimeInMinutesDefault = ReplicationPauseTimeInMinutesDefault;
        /** @type {number} */
        this.MoveCommitWaitInSec = MoveCommitWaitInSec;
        /** @type {number} */
        this.MoveRollbackWaitInSec = MoveRollbackWaitInSec;
        /** @type {vos.VraIoCongestionControlParams} */
        this.IoCongestionParams = IoCongestionParams;
        /** @type {boolean} */
        this.IsCallHomeEnabled = IsCallHomeEnabled;
        /** @type {vos.EventsEmailConfiguration} */
        this.EmailConfiguration = EmailConfiguration;
        /** @type {vos.BandwidthLimitSettings} */
        this.BandwidthSettings = BandwidthSettings;
        /** @type {vos.CloudPortalConfiguration} */
        this.CloudPortalConfig = CloudPortalConfig;
        /** @type {boolean} */
        this.AllowCreationOfSelfProtectedVpg = AllowCreationOfSelfProtectedVpg;
        /** @type {vos.ResourcesReportSettings} */
        this.ResourcesReportSettings = ResourcesReportSettings;
        /** @type {vos.PublicCloudSiteSettings} */
        this.PublicCloudSiteSettings = PublicCloudSiteSettings;
        /** @type {vos.RolesAndPermissionsSettings} */
        this.RolesAndPermissionsSettings = RolesAndPermissionsSettings;
        /** @type {boolean} */
        this.ShouldEnterMMDuringRemediation = ShouldEnterMMDuringRemediation;
    };
    /**
     * @param {vos.ZertoOrganizationIdentifier} [Id] {@link vos.ZertoOrganizationIdentifier}
     * @param {string} [Name] {@link string}
     * @constructor
     */
    vos.AlertAffectedOrg = function(Id, Name){
        /** @type {vos.ZertoOrganizationIdentifier} */
        this.Id = Id;
        /** @type {string} */
        this.Name = Name;
    };
    /**
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {vos.ProtectionGroupIdentifier} [Identifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [Name] {@link string}
     * @param {vos.VMIdentifier} [SampleVM] {@link vos.VMIdentifier}
     * @constructor
     */
    vos.AlertAffectedVPG = function(Direction, Identifier, Name, SampleVM){
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.Identifier = Identifier;
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.VMIdentifier} */
        this.SampleVM = SampleVM;
    };
    /**
     * @param {vos.AlertVisualObject[]} [Alerts] {@link vos.AlertVisualObject[]}
     * @constructor
     */
    vos.AlertsScreenVisualObject = function(Alerts){
        /** @type {vos.AlertVisualObject[]} */
        this.Alerts = Alerts;
    };
    /**
     * @param {vos.AlertTipVisualObject[]} [Alerts] {@link vos.AlertTipVisualObject[]}
     * @param {boolean} [HasMore] {@link boolean}
     * @param {number} [TotalNumberOfAlerts] {@link number}
     * @param {number} [TotalNumberOfErrors] {@link number}
     * @param {number} [TotalNumberOfWarnings] {@link number}
     * @constructor
     */
    vos.AlertsTipVisualObject = function(Alerts, HasMore, TotalNumberOfAlerts, TotalNumberOfErrors, TotalNumberOfWarnings){
        /** @type {vos.AlertTipVisualObject[]} */
        this.Alerts = Alerts;
        /** @type {boolean} */
        this.HasMore = HasMore;
        /** @type {number} */
        this.TotalNumberOfAlerts = TotalNumberOfAlerts;
        /** @type {number} */
        this.TotalNumberOfErrors = TotalNumberOfErrors;
        /** @type {number} */
        this.TotalNumberOfWarnings = TotalNumberOfWarnings;
    };
    /**
     * @param {enums.SystemStateAlertLevel} [AlertLevel] {@link enums.SystemStateAlertLevel}
     * @param {string} [Description] {@link string}
     * @param {string} [SiteName] {@link string}
     * @param {date} [StartTime] {@link date}
     * @constructor
     */
    vos.AlertTipVisualObject = function(AlertLevel, Description, SiteName, StartTime){
        /** @type {enums.SystemStateAlertLevel} */
        this.AlertLevel = AlertLevel;
        /** @type {string} */
        this.Description = Description;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {date} */
        this.StartTime = StartTime;
    };
    /**
     * @param {vos.AlertAffectedOrg[]} [AffectedOrgs] {@link vos.AlertAffectedOrg[]}
     * @param {vos.HostIdentifier} [Affectedhost] {@link vos.HostIdentifier}
     * @param {string} [AlertEntity] {@link string}
     * @param {string} [Description] {@link string}
     * @param {vos.AlertAffectedVPG[]} [Entities] {@link vos.AlertAffectedVPG[]}
     * @param {string} [HelpId] {@link string}
     * @param {string} [Id] {@link string}
     * @param {boolean} [IsDismissed] {@link boolean}
     * @param {enums.SystemStateAlertLevel} [Level] {@link enums.SystemStateAlertLevel}
     * @param {string} [SiteName] {@link string}
     * @param {date} [StartTime] {@link date}
     * @constructor
     */
    vos.AlertVisualObject = function(AffectedOrgs, Affectedhost, AlertEntity, Description, Entities, HelpId, Id, IsDismissed, Level, SiteName, StartTime){
        /** @type {vos.AlertAffectedOrg[]} */
        this.AffectedOrgs = AffectedOrgs;
        /** @type {vos.HostIdentifier} */
        this.Affectedhost = Affectedhost;
        /** @type {string} */
        this.AlertEntity = AlertEntity;
        /** @type {string} */
        this.Description = Description;
        /** @type {vos.AlertAffectedVPG[]} */
        this.Entities = Entities;
        /** @type {string} */
        this.HelpId = HelpId;
        /** @type {string} */
        this.Id = Id;
        /** @type {boolean} */
        this.IsDismissed = IsDismissed;
        /** @type {enums.SystemStateAlertLevel} */
        this.Level = Level;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {date} */
        this.StartTime = StartTime;
    };
    /**
     * @param {boolean} [AllowCreateVpg] {@link boolean}
     * @constructor
     */
    vos.AuthorizedActionsVisualObject = function(AllowCreateVpg){
        /** @type {boolean} */
        this.AllowCreateVpg = AllowCreateVpg;
    };
    /**
     * @param {string} [AccessKey] {@link string}
     * @param {string} [Bucket] {@link string}
     * @param {string} [Path] {@link string}
     * @param {string} [SecretKey] {@link string}
     * @constructor
     */
    vos.AWSBackupTargetDetailsVisualObject = function(AccessKey, Bucket, Path, SecretKey){
        /** @type {string} */
        this.AccessKey = AccessKey;
        /** @type {string} */
        this.Bucket = Bucket;
        /** @type {string} */
        this.Path = Path;
        /** @type {string} */
        this.SecretKey = SecretKey;
    };
    /**
     * @param {boolean[]} [Hours] {@link boolean[]}
     * @constructor
     */
    vos.BackupDailyWindowVisualObject = function(Hours){
        /** @type {boolean[]} */
        this.Hours = Hours;
    };
    /**
     * @param {string} [Identifier] {@link string}
     * @constructor
     */
    vos.BackupJobIdentifier = function(Identifier){
        /** @type {string} */
        this.Identifier = Identifier;
    };
    /**
     * @param {number} [RetryIntervalInMinutes] {@link number}
     * @param {number} [RetryTimes] {@link number}
     * @param {boolean} [ShouldRetryOnFailure] {@link boolean}
     * @constructor
     */
    vos.BackupRetryVisualObject = function(RetryIntervalInMinutes, RetryTimes, ShouldRetryOnFailure){
        /** @type {number} */
        this.RetryIntervalInMinutes = RetryIntervalInMinutes;
        /** @type {number} */
        this.RetryTimes = RetryTimes;
        /** @type {boolean} */
        this.ShouldRetryOnFailure = ShouldRetryOnFailure;
    };
    /**
     * @param {enums.DayOfWeek} [DayOfWeek] {@link enums.DayOfWeek}
     * @param {number} [RunningTimeOfDayInMinutes] {@link number}
     * @param {enums.SchedulePeriodType} [SchedulePeriodType] {@link enums.SchedulePeriodType}
     * @constructor
     */
    vos.BackupRunningTimeVisualObject = function(DayOfWeek, RunningTimeOfDayInMinutes, SchedulePeriodType){
        /** @type {enums.DayOfWeek} */
        this.DayOfWeek = DayOfWeek;
        /** @type {number} */
        this.RunningTimeOfDayInMinutes = RunningTimeOfDayInMinutes;
        /** @type {enums.SchedulePeriodType} */
        this.SchedulePeriodType = SchedulePeriodType;
    };
    /**
     * @param {enums.DayOfWeek} [DayOfWeek] {@link enums.DayOfWeek}
     * @param {enums.SchedulePeriodType} [SchedulePeriodType] {@link enums.SchedulePeriodType}
     * @constructor
     */
    vos.BackupScheduledPeriodVisualObject = function(DayOfWeek, SchedulePeriodType){
        /** @type {enums.DayOfWeek} */
        this.DayOfWeek = DayOfWeek;
        /** @type {enums.SchedulePeriodType} */
        this.SchedulePeriodType = SchedulePeriodType;
    };
    /**
     * @param {vos.BackupRetryVisualObject} [Retry] {@link vos.BackupRetryVisualObject}
     * @param {vos.BackupRunningTimeVisualObject} [RunningTime] {@link vos.BackupRunningTimeVisualObject}
     * @param {vos.BackupWindowVisualObject} [Window] {@link vos.BackupWindowVisualObject}
     * @constructor
     */
    vos.BackupSchedulerSettingsVisualObject = function(Retry, RunningTime, Window){
        /** @type {vos.BackupRetryVisualObject} */
        this.Retry = Retry;
        /** @type {vos.BackupRunningTimeVisualObject} */
        this.RunningTime = RunningTime;
        /** @type {vos.BackupWindowVisualObject} */
        this.Window = Window;
    };
    /**
     * @param {vos.SingleScriptVisualObject} [PostScript] {@link vos.SingleScriptVisualObject}
     * @constructor
     */
    vos.BackupScriptingVisualObject = function(PostScript){
        /** @type {vos.SingleScriptVisualObject} */
        this.PostScript = PostScript;
    };
    /**
     * @param {vos.DeleteBackupSettingsVisualObject} [DeleteBackup] {@link vos.DeleteBackupSettingsVisualObject}
     * @param {vos.BackupSchedulerSettingsVisualObject} [Scheduler] {@link vos.BackupSchedulerSettingsVisualObject}
     * @param {vos.BackupScriptingVisualObject} [Scripting] {@link vos.BackupScriptingVisualObject}
     * @param {vos.BackupTargetSettingsVisualObject} [Target] {@link vos.BackupTargetSettingsVisualObject}
     * @constructor
     */
    vos.BackupSettingsVisualObject = function(DeleteBackup, Scheduler, Scripting, Target){
        /** @type {vos.DeleteBackupSettingsVisualObject} */
        this.DeleteBackup = DeleteBackup;
        /** @type {vos.BackupSchedulerSettingsVisualObject} */
        this.Scheduler = Scheduler;
        /** @type {vos.BackupScriptingVisualObject} */
        this.Scripting = Scripting;
        /** @type {vos.BackupTargetSettingsVisualObject} */
        this.Target = Target;
    };
    /**
     * @param {vos.AWSBackupTargetDetailsVisualObject} [AWSData] {@link vos.AWSBackupTargetDetailsVisualObject}
     * @param {number} [Capacity] {@link number}
     * @param {string} [DisplayName] {@link string}
     * @param {number} [FreeSpace] {@link number}
     * @param {vos.BackupTargetIdentifier} [ID] {@link vos.BackupTargetIdentifier}
     * @param {boolean} [IsCompressionEnabled] {@link boolean}
     * @param {boolean} [IsDefault] {@link boolean}
     * @param {vos.LocalBackupTargetDetailsVisualObject} [LocalData] {@link vos.LocalBackupTargetDetailsVisualObject}
     * @param {enums.BackupTargetType} [RepositoryType] {@link enums.BackupTargetType}
     * @param {vos.SmbBackupTargetDetailsVisualObject} [SMBData] {@link vos.SmbBackupTargetDetailsVisualObject}
     * @constructor
     */
    vos.BackupTargetDetailsVisualObject = function(AWSData, Capacity, DisplayName, FreeSpace, ID, IsCompressionEnabled, IsDefault, LocalData, RepositoryType, SMBData){
        /** @type {vos.AWSBackupTargetDetailsVisualObject} */
        this.AWSData = AWSData;
        /** @type {number} */
        this.Capacity = Capacity;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {number} */
        this.FreeSpace = FreeSpace;
        /** @type {vos.BackupTargetIdentifier} */
        this.ID = ID;
        /** @type {boolean} */
        this.IsCompressionEnabled = IsCompressionEnabled;
        /** @type {boolean} */
        this.IsDefault = IsDefault;
        /** @type {vos.LocalBackupTargetDetailsVisualObject} */
        this.LocalData = LocalData;
        /** @type {enums.BackupTargetType} */
        this.RepositoryType = RepositoryType;
        /** @type {vos.SmbBackupTargetDetailsVisualObject} */
        this.SMBData = SMBData;
    };
    /**
     * @constructor
     */
    vos.BackupTargetExtendedDetailsVisualObject = function(){
    };
    /**
     * @param {vos.BackupTargetExtendedDetailsVisualObject[]} [BackupTargets] {@link vos.BackupTargetExtendedDetailsVisualObject[]}
     * @param {boolean} [IsAddEnabled] {@link boolean}
     * @constructor
     */
    vos.BackupTargetExtendedDetailsVisualObjectScreen = function(BackupTargets, IsAddEnabled){
        /** @type {vos.BackupTargetExtendedDetailsVisualObject[]} */
        this.BackupTargets = BackupTargets;
        /** @type {boolean} */
        this.IsAddEnabled = IsAddEnabled;
    };
    /**
     * @param {string} [Identifier] {@link string}
     * @constructor
     */
    vos.BackupTargetIdentifier = function(Identifier){
        /** @type {string} */
        this.Identifier = Identifier;
    };
    /**
     * @param {number} [NumberOfSuccessfullRuns] {@link number}
     * @param {number} [TotalNumberOfRuns] {@link number}
     * @constructor
     */
    vos.BackupTargetRestorePointsInfo = function(NumberOfSuccessfullRuns, TotalNumberOfRuns){
        /** @type {number} */
        this.NumberOfSuccessfullRuns = NumberOfSuccessfullRuns;
        /** @type {number} */
        this.TotalNumberOfRuns = TotalNumberOfRuns;
    };
    /**
     * @param {vos.BackupTargetIdentifier} [SelectedTarget] {@link vos.BackupTargetIdentifier}
     * @constructor
     */
    vos.BackupTargetSettingsVisualObject = function(SelectedTarget){
        /** @type {vos.BackupTargetIdentifier} */
        this.SelectedTarget = SelectedTarget;
    };
    /**
     * @param {string} [ErrorMsg] {@link string}
     * @param {number} [FreeSpaceInMB] {@link number}
     * @param {boolean} [IsAvailable] {@link boolean}
     * @param {boolean} [IsFolderExist] {@link boolean}
     * @param {number} [TotalSpaceInMB] {@link number}
     * @constructor
     */
    vos.BackupTargetValidationVisualObject = function(ErrorMsg, FreeSpaceInMB, IsAvailable, IsFolderExist, TotalSpaceInMB){
        /** @type {string} */
        this.ErrorMsg = ErrorMsg;
        /** @type {number} */
        this.FreeSpaceInMB = FreeSpaceInMB;
        /** @type {boolean} */
        this.IsAvailable = IsAvailable;
        /** @type {boolean} */
        this.IsFolderExist = IsFolderExist;
        /** @type {number} */
        this.TotalSpaceInMB = TotalSpaceInMB;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.BackupTargetIdentifier} [Identifier] {@link vos.BackupTargetIdentifier}
     * @param {boolean} [IsCompressionEnabled] {@link boolean}
     * @param {boolean} [IsDefault] {@link boolean}
     * @constructor
     */
    vos.BackupTargetVisualObject = function(DisplayName, Identifier, IsCompressionEnabled, IsDefault){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.BackupTargetIdentifier} */
        this.Identifier = Identifier;
        /** @type {boolean} */
        this.IsCompressionEnabled = IsCompressionEnabled;
        /** @type {boolean} */
        this.IsDefault = IsDefault;
    };
    /**
     * @param {vos.BackupDailyWindowVisualObject[]} [Days] {@link vos.BackupDailyWindowVisualObject[]}
     * @constructor
     */
    vos.BackupWeeklyWindowVisualObject = function(Days){
        /** @type {vos.BackupDailyWindowVisualObject[]} */
        this.Days = Days;
    };
    /**
     * @param {boolean} [ShouldTerminateIfExceedsWindow] {@link boolean}
     * @param {vos.BackupWeeklyWindowVisualObject} [WeeklyWindow] {@link vos.BackupWeeklyWindowVisualObject}
     * @constructor
     */
    vos.BackupWindowVisualObject = function(ShouldTerminateIfExceedsWindow, WeeklyWindow){
        /** @type {boolean} */
        this.ShouldTerminateIfExceedsWindow = ShouldTerminateIfExceedsWindow;
        /** @type {vos.BackupWeeklyWindowVisualObject} */
        this.WeeklyWindow = WeeklyWindow;
    };
    /**
     * @param {boolean} [Enabled] {@link boolean}
     * @param {number} [FromTimeInMinutes] {@link number}
     * @param {number} [MaxBandwidthInLBpsInTime] {@link number}
     * @param {number} [MaxBandwidthInLBpsOutsideTime] {@link number}
     * @param {boolean} [TimeBasedBandwidthEnabled] {@link boolean}
     * @param {number} [ToTimeInMinutes] {@link number}
     * @constructor
     */
    vos.BandwidthLimitSettings = function(Enabled, FromTimeInMinutes, MaxBandwidthInLBpsInTime, MaxBandwidthInLBpsOutsideTime, TimeBasedBandwidthEnabled, ToTimeInMinutes){
        /** @type {boolean} */
        this.Enabled = Enabled;
        /** @type {number} */
        this.FromTimeInMinutes = FromTimeInMinutes;
        /** @type {number} */
        this.MaxBandwidthInLBpsInTime = MaxBandwidthInLBpsInTime;
        /** @type {number} */
        this.MaxBandwidthInLBpsOutsideTime = MaxBandwidthInLBpsOutsideTime;
        /** @type {boolean} */
        this.TimeBasedBandwidthEnabled = TimeBasedBandwidthEnabled;
        /** @type {number} */
        this.ToTimeInMinutes = ToTimeInMinutes;
    };
    /**
     * @param {string} [InternalName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @param {enums.ComputeResourceType} [Type] {@link enums.ComputeResourceType}
     * @constructor
     */
    vos.BaseComputeResourceIdentifier = function(InternalName, ServerIdentifier, Type){
        /** @type {string} */
        this.InternalName = InternalName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
        /** @type {enums.ComputeResourceType} */
        this.Type = Type;
    };
    /**
     * @constructor
     */
    vos.BaseStorageObject = function(){
    };
    /**
     * @param {vos.BillingItemValueObject[]} [Children] {@link vos.BillingItemValueObject[]}
     * @param {date} [FromDate] {@link date}
     * @param {string} [Org] {@link string}
     * @param {string} [SiteA] {@link string}
     * @param {string} [SiteB] {@link string}
     * @param {enums.ProtectionGroupStateVisual} [State] {@link enums.ProtectionGroupStateVisual}
     * @param {date} [ToDate] {@link date}
     * @param {number} [TotalDays] {@link number}
     * @param {number} [TotalDaysVmCount] {@link number}
     * @param {string} [VPG] {@link string}
     * @param {vos.ProtectionGroupIdentifier} [VPGId] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [Vm] {@link string}
     * @param {vos.ZertoVMIdentifier} [VmId] {@link vos.ZertoVMIdentifier}
     * @constructor
     */
    vos.BillingItemValueObject = function(Children, FromDate, Org, SiteA, SiteB, State, ToDate, TotalDays, TotalDaysVmCount, VPG, VPGId, Vm, VmId){
        /** @type {vos.BillingItemValueObject[]} */
        this.Children = Children;
        /** @type {date} */
        this.FromDate = FromDate;
        /** @type {string} */
        this.Org = Org;
        /** @type {string} */
        this.SiteA = SiteA;
        /** @type {string} */
        this.SiteB = SiteB;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.State = State;
        /** @type {date} */
        this.ToDate = ToDate;
        /** @type {number} */
        this.TotalDays = TotalDays;
        /** @type {number} */
        this.TotalDaysVmCount = TotalDaysVmCount;
        /** @type {string} */
        this.VPG = VPG;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.VPGId = VPGId;
        /** @type {string} */
        this.Vm = Vm;
        /** @type {vos.ZertoVMIdentifier} */
        this.VmId = VmId;
    };
    /**
     * @param {number} [Month] {@link number}
     * @param {string} [VmCount] {@link string}
     * @param {number} [VmCountRaw] {@link number}
     * @param {number} [Year] {@link number}
     * @param {vos.DayUsageValueObject[]} [children] {@link vos.DayUsageValueObject[]}
     * @constructor
     */
    vos.BillingMonthDetailsValueObject = function(Month, VmCount, VmCountRaw, Year, children){
        /** @type {number} */
        this.Month = Month;
        /** @type {string} */
        this.VmCount = VmCount;
        /** @type {number} */
        this.VmCountRaw = VmCountRaw;
        /** @type {number} */
        this.Year = Year;
        /** @type {vos.DayUsageValueObject[]} */
        this.children = children;
    };
    /**
     * @param {string} [Guid] {@link string}
     * @constructor
     */
    vos.BootGroupIdentifier = function(Guid){
        /** @type {string} */
        this.Guid = Guid;
    };
    /**
     * @param {number} [BootDelay] {@link number}
     * @param {number} [ShutdownDelay] {@link number}
     * @param {boolean} [WaitForTools] {@link boolean}
     * @constructor
     */
    vos.BootOrderGroupSettingsVisualObject = function(BootDelay, ShutdownDelay, WaitForTools){
        /** @type {number} */
        this.BootDelay = BootDelay;
        /** @type {number} */
        this.ShutdownDelay = ShutdownDelay;
        /** @type {boolean} */
        this.WaitForTools = WaitForTools;
    };
    /**
     * @param {vos.BootGroupIdentifier} [BootGroupIdentifier] {@link vos.BootGroupIdentifier}
     * @param {vos.VirtualMachineVisualObject[]} [Machines] {@link vos.VirtualMachineVisualObject[]}
     * @param {string} [Name] {@link string}
     * @param {vos.BootOrderGroupSettingsVisualObject} [Settings] {@link vos.BootOrderGroupSettingsVisualObject}
     * @constructor
     */
    vos.BootOrderGroupVisualObject = function(BootGroupIdentifier, Machines, Name, Settings){
        /** @type {vos.BootGroupIdentifier} */
        this.BootGroupIdentifier = BootGroupIdentifier;
        /** @type {vos.VirtualMachineVisualObject[]} */
        this.Machines = Machines;
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.BootOrderGroupSettingsVisualObject} */
        this.Settings = Settings;
    };
    /**
     * @param {vos.BootOrderGroupVisualObject[]} [Groups] {@link vos.BootOrderGroupVisualObject[]}
     * @constructor
     */
    vos.BootOrderScreenVisualObject = function(Groups){
        /** @type {vos.BootOrderGroupVisualObject[]} */
        this.Groups = Groups;
    };
    /**
     * @param {vos.ComputeResourceVisualObject} [HostInfo] {@link vos.ComputeResourceVisualObject}
     * @param {boolean} [Recommended] {@link boolean}
     * @constructor
     */
    vos.ChangeHostRecoveryHostVisualObject = function(HostInfo, Recommended){
        /** @type {vos.ComputeResourceVisualObject} */
        this.HostInfo = HostInfo;
        /** @type {boolean} */
        this.Recommended = Recommended;
    };
    /**
     * @param {vos.ChangeHostRecoveryHostVisualObject[]} [AvailableHostList] {@link vos.ChangeHostRecoveryHostVisualObject[]}
     * @param {vos.ChangeHostValidationExplanationVisualObject[]} [ExplanationList] {@link vos.ChangeHostValidationExplanationVisualObject[]}
     * @param {string[]} [NotificationsList] {@link string[]}
     * @param {vos.ComputeResourceVisualObject} [SelectedHost] {@link vos.ComputeResourceVisualObject}
     * @param {vos.ChangeHostVmVisualObject[]} [VmsList] {@link vos.ChangeHostVmVisualObject[]}
     * @constructor
     */
    vos.ChangeHostScreenVisualObject = function(AvailableHostList, ExplanationList, NotificationsList, SelectedHost, VmsList){
        /** @type {vos.ChangeHostRecoveryHostVisualObject[]} */
        this.AvailableHostList = AvailableHostList;
        /** @type {vos.ChangeHostValidationExplanationVisualObject[]} */
        this.ExplanationList = ExplanationList;
        /** @type {string[]} */
        this.NotificationsList = NotificationsList;
        /** @type {vos.ComputeResourceVisualObject} */
        this.SelectedHost = SelectedHost;
        /** @type {vos.ChangeHostVmVisualObject[]} */
        this.VmsList = VmsList;
    };
    /**
     * @param {string} [Explanation] {@link string}
     * @param {vos.VirtualMachineVisualObject[]} [VirtualMachines] {@link vos.VirtualMachineVisualObject[]}
     * @constructor
     */
    vos.ChangeHostValidationExplanationVisualObject = function(Explanation, VirtualMachines){
        /** @type {string} */
        this.Explanation = Explanation;
        /** @type {vos.VirtualMachineVisualObject[]} */
        this.VirtualMachines = VirtualMachines;
    };
    /**
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {number} [NumberOfVolumes] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [ProtectionGroupName] {@link string}
     * @param {boolean} [Selected] {@link boolean}
     * @param {enums.ChangeHostVmVisualObject_ChangeHostValidationStatus} [Status] {@link enums.ChangeHostVmVisualObject_ChangeHostValidationStatus}
     * @param {number} [VirtualMachineSizeInGB] {@link number}
     * @param {vos.VirtualMachineVisualObject} [VirtualMachineVisualObject] {@link vos.VirtualMachineVisualObject}
     * @param {string} [VmHardwareVersion] {@link string}
     * @param {string} [ZertoOrganization] {@link string}
     * @constructor
     */
    vos.ChangeHostVmVisualObject = function(Direction, NumberOfVolumes, ProtectionGroupIdentifier, ProtectionGroupName, Selected, Status, VirtualMachineSizeInGB, VirtualMachineVisualObject, VmHardwareVersion, ZertoOrganization){
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {number} */
        this.NumberOfVolumes = NumberOfVolumes;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupIdentifier = ProtectionGroupIdentifier;
        /** @type {string} */
        this.ProtectionGroupName = ProtectionGroupName;
        /** @type {boolean} */
        this.Selected = Selected;
        /** @type {enums.ChangeHostVmVisualObject_ChangeHostValidationStatus} */
        this.Status = Status;
        /** @type {number} */
        this.VirtualMachineSizeInGB = VirtualMachineSizeInGB;
        /** @type {vos.VirtualMachineVisualObject} */
        this.VirtualMachineVisualObject = VirtualMachineVisualObject;
        /** @type {string} */
        this.VmHardwareVersion = VmHardwareVersion;
        /** @type {string} */
        this.ZertoOrganization = ZertoOrganization;
    };
    /**
     * @param {vos.CheckpointIdentifier} [Identifier] {@link vos.CheckpointIdentifier}
     * @param {boolean} [IsProtected] {@link boolean}
     * @param {string} [Tag] {@link string}
     * @param {date} [TimeStamp] {@link date}
     * @param {boolean} [Vss] {@link boolean}
     * @constructor
     */
    vos.CheckPoint = function(Identifier, IsProtected, Tag, TimeStamp, Vss){
        /** @type {vos.CheckpointIdentifier} */
        this.Identifier = Identifier;
        /** @type {boolean} */
        this.IsProtected = IsProtected;
        /** @type {string} */
        this.Tag = Tag;
        /** @type {date} */
        this.TimeStamp = TimeStamp;
        /** @type {boolean} */
        this.Vss = Vss;
    };
    /**
     * @param {number} [Identifier] {@link number}
     * @constructor
     */
    vos.CheckpointIdentifier = function(Identifier){
        /** @type {number} */
        this.Identifier = Identifier;
    };
    /**
     * @param {vos.CheckPoint[]} [ScrollerCheckPoints] {@link vos.CheckPoint[]}
     * @param {vos.CheckPoint[]} [TaggedCheckPoints] {@link vos.CheckPoint[]}
     * @constructor
     */
    vos.CheckpointSelectionScreenVisualObject = function(ScrollerCheckPoints, TaggedCheckPoints){
        /** @type {vos.CheckPoint[]} */
        this.ScrollerCheckPoints = ScrollerCheckPoints;
        /** @type {vos.CheckPoint[]} */
        this.TaggedCheckPoints = TaggedCheckPoints;
    };
    /**
     * @param {vos.CheckPoint} [Checkpoint] {@link vos.CheckPoint}
     * @param {string} [CloneStatus] {@link string}
     * @param {vos.DatastoreVisualObject} [Datastore] {@link vos.DatastoreVisualObject}
     * @param {boolean} [IsAbortCloneEnabled] {@link boolean}
     * @param {vos.VpgProgressDetailsVisualObject} [Progress] {@link vos.VpgProgressDetailsVisualObject}
     * @constructor
     */
    vos.CloneStatusVisualObject = function(Checkpoint, CloneStatus, Datastore, IsAbortCloneEnabled, Progress){
        /** @type {vos.CheckPoint} */
        this.Checkpoint = Checkpoint;
        /** @type {string} */
        this.CloneStatus = CloneStatus;
        /** @type {vos.DatastoreVisualObject} */
        this.Datastore = Datastore;
        /** @type {boolean} */
        this.IsAbortCloneEnabled = IsAbortCloneEnabled;
        /** @type {vos.VpgProgressDetailsVisualObject} */
        this.Progress = Progress;
    };
    /**
     * @param {string} [FamilyName] {@link string}
     * @param {vos.PublicCloudInstanceTypeIdentifier} [Id] {@link vos.PublicCloudInstanceTypeIdentifier}
     * @param {string} [Name] {@link string}
     * @constructor
     */
    vos.CloudInstanceTypeVisualObject = function(FamilyName, Id, Name){
        /** @type {string} */
        this.FamilyName = FamilyName;
        /** @type {vos.PublicCloudInstanceTypeIdentifier} */
        this.Id = Id;
        /** @type {string} */
        this.Name = Name;
    };
    /**
     * @param {vos.VirtualPrivateCloudIdentifier} [Id] {@link vos.VirtualPrivateCloudIdentifier}
     * @param {string} [Name] {@link string}
     * @constructor
     */
    vos.CloudPcnVisualObject = function(Id, Name){
        /** @type {vos.VirtualPrivateCloudIdentifier} */
        this.Id = Id;
        /** @type {string} */
        this.Name = Name;
    };
    /**
     * @param {string} [CloudPortalExternalHostName] {@link string}
     * @constructor
     */
    vos.CloudPortalConfiguration = function(CloudPortalExternalHostName){
        /** @type {string} */
        this.CloudPortalExternalHostName = CloudPortalExternalHostName;
    };
    /**
     * @param {vos.CloudPotentialPcnVisualObject[]} [PotentialPcns] {@link vos.CloudPotentialPcnVisualObject[]}
     * @constructor
     */
    vos.CloudPotentialPcnsListObject = function(PotentialPcns){
        /** @type {vos.CloudPotentialPcnVisualObject[]} */
        this.PotentialPcns = PotentialPcns;
    };
    /**
     * @param {vos.SecurityGroupIdentifier} [DefaultSecurityGroup] {@link vos.SecurityGroupIdentifier}
     * @param {vos.SubnetIdentifier} [DefaultSubnet] {@link vos.SubnetIdentifier}
     * @param {vos.CloudPcnVisualObject} [Pcn] {@link vos.CloudPcnVisualObject}
     * @param {vos.CloudSecurityGroupVisualObject[]} [SecurityGroups] {@link vos.CloudSecurityGroupVisualObject[]}
     * @param {vos.CloudSubnetVisualObject[]} [Subnets] {@link vos.CloudSubnetVisualObject[]}
     * @constructor
     */
    vos.CloudPotentialPcnVisualObject = function(DefaultSecurityGroup, DefaultSubnet, Pcn, SecurityGroups, Subnets){
        /** @type {vos.SecurityGroupIdentifier} */
        this.DefaultSecurityGroup = DefaultSecurityGroup;
        /** @type {vos.SubnetIdentifier} */
        this.DefaultSubnet = DefaultSubnet;
        /** @type {vos.CloudPcnVisualObject} */
        this.Pcn = Pcn;
        /** @type {vos.CloudSecurityGroupVisualObject[]} */
        this.SecurityGroups = SecurityGroups;
        /** @type {vos.CloudSubnetVisualObject[]} */
        this.Subnets = Subnets;
    };
    /**
     * @param {vos.CloudVpgCloudSettings} [CloudVpgFailoverCloudSettings] {@link vos.CloudVpgCloudSettings}
     * @param {vos.CloudVpgCloudSettings} [CloudVpgFailoverTestCloudSettings] {@link vos.CloudVpgCloudSettings}
     * @constructor
     */
    vos.CloudRecoverySettings = function(CloudVpgFailoverCloudSettings, CloudVpgFailoverTestCloudSettings){
        /** @type {vos.CloudVpgCloudSettings} */
        this.CloudVpgFailoverCloudSettings = CloudVpgFailoverCloudSettings;
        /** @type {vos.CloudVpgCloudSettings} */
        this.CloudVpgFailoverTestCloudSettings = CloudVpgFailoverTestCloudSettings;
    };
    /**
     * @param {vos.SecurityGroupIdentifier} [Id] {@link vos.SecurityGroupIdentifier}
     * @param {string} [Name] {@link string}
     * @constructor
     */
    vos.CloudSecurityGroupVisualObject = function(Id, Name){
        /** @type {vos.SecurityGroupIdentifier} */
        this.Id = Id;
        /** @type {string} */
        this.Name = Name;
    };
    /**
     * @param {string} [ApplicationName] {@link string}
     * @param {string} [AwsBucketName] {@link string}
     * @param {string} [ClientId] {@link string}
     * @param {string} [ResourceName] {@link string}
     * @param {string} [StorageAccountName] {@link string}
     * @param {string} [Subscription] {@link string}
     * @constructor
     */
    vos.CloudSiteSettingsVisualObject = function(ApplicationName, AwsBucketName, ClientId, ResourceName, StorageAccountName, Subscription){
        /** @type {string} */
        this.ApplicationName = ApplicationName;
        /** @type {string} */
        this.AwsBucketName = AwsBucketName;
        /** @type {string} */
        this.ClientId = ClientId;
        /** @type {string} */
        this.ResourceName = ResourceName;
        /** @type {string} */
        this.StorageAccountName = StorageAccountName;
        /** @type {string} */
        this.Subscription = Subscription;
    };
    /**
     * @param {vos.SubnetIdentifier} [Id] {@link vos.SubnetIdentifier}
     * @param {string} [Name] {@link string}
     * @constructor
     */
    vos.CloudSubnetVisualObject = function(Id, Name){
        /** @type {vos.SubnetIdentifier} */
        this.Id = Id;
        /** @type {string} */
        this.Name = Name;
    };
    /**
     * @param {vos.CloudPcnVisualObject} [Pcn] {@link vos.CloudPcnVisualObject}
     * @param {string} [PrimaryIp] {@link string}
     * @param {vos.CloudInstanceTypeVisualObject} [PublicCloudInstanceTypeVisualObject] {@link vos.CloudInstanceTypeVisualObject}
     * @param {vos.CloudSecurityGroupVisualObject[]} [SecurityGroups] {@link vos.CloudSecurityGroupVisualObject[]}
     * @param {vos.CloudSubnetVisualObject} [Subnet] {@link vos.CloudSubnetVisualObject}
     * @constructor
     */
    vos.CloudVmSettingsVisualObject = function(Pcn, PrimaryIp, PublicCloudInstanceTypeVisualObject, SecurityGroups, Subnet){
        /** @type {vos.CloudPcnVisualObject} */
        this.Pcn = Pcn;
        /** @type {string} */
        this.PrimaryIp = PrimaryIp;
        /** @type {vos.CloudInstanceTypeVisualObject} */
        this.PublicCloudInstanceTypeVisualObject = PublicCloudInstanceTypeVisualObject;
        /** @type {vos.CloudSecurityGroupVisualObject[]} */
        this.SecurityGroups = SecurityGroups;
        /** @type {vos.CloudSubnetVisualObject} */
        this.Subnet = Subnet;
    };
    /**
     * @param {vos.CloudPcnVisualObject} [Pcn] {@link vos.CloudPcnVisualObject}
     * @param {vos.CloudInstanceTypeVisualObject} [PublicCloudInstanceTypeVisualObject] {@link vos.CloudInstanceTypeVisualObject}
     * @param {vos.CloudSecurityGroupVisualObject[]} [SecurityGroups] {@link vos.CloudSecurityGroupVisualObject[]}
     * @param {vos.CloudSubnetVisualObject} [Subnet] {@link vos.CloudSubnetVisualObject}
     * @constructor
     */
    vos.CloudVpgCloudSettings = function(Pcn, PublicCloudInstanceTypeVisualObject, SecurityGroups, Subnet){
        /** @type {vos.CloudPcnVisualObject} */
        this.Pcn = Pcn;
        /** @type {vos.CloudInstanceTypeVisualObject} */
        this.PublicCloudInstanceTypeVisualObject = PublicCloudInstanceTypeVisualObject;
        /** @type {vos.CloudSecurityGroupVisualObject[]} */
        this.SecurityGroups = SecurityGroups;
        /** @type {vos.CloudSubnetVisualObject} */
        this.Subnet = Subnet;
    };
    /**
     * @param {string} [Identifier] {@link string}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @constructor
     */
    vos.CommandTaskIdentifier = function(Identifier, SiteId){
        /** @type {string} */
        this.Identifier = Identifier;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
    };
    /**
     * @param {boolean} [IsAbortBackupEnabled] {@link boolean}
     * @param {boolean} [IsCancelable] {@link boolean}
     * @param {boolean} [IsFlrBrowseEnabled] {@link boolean}
     * @param {boolean} [IsFlrUnmountEnabled] {@link boolean}
     * @param {boolean} [IsRecoverRollbackEnabled] {@link boolean}
     * @param {boolean} [IsResumeEnabled] {@link boolean}
     * @param {boolean} [IsStopFailoverTestEnabled] {@link boolean}
     * @constructor
     */
    vos.CommandTaskRecordButtonsState = function(IsAbortBackupEnabled, IsCancelable, IsFlrBrowseEnabled, IsFlrUnmountEnabled, IsRecoverRollbackEnabled, IsResumeEnabled, IsStopFailoverTestEnabled){
        /** @type {boolean} */
        this.IsAbortBackupEnabled = IsAbortBackupEnabled;
        /** @type {boolean} */
        this.IsCancelable = IsCancelable;
        /** @type {boolean} */
        this.IsFlrBrowseEnabled = IsFlrBrowseEnabled;
        /** @type {boolean} */
        this.IsFlrUnmountEnabled = IsFlrUnmountEnabled;
        /** @type {boolean} */
        this.IsRecoverRollbackEnabled = IsRecoverRollbackEnabled;
        /** @type {boolean} */
        this.IsResumeEnabled = IsResumeEnabled;
        /** @type {boolean} */
        this.IsStopFailoverTestEnabled = IsStopFailoverTestEnabled;
    };
    /**
     * @param {enums.CommandTaskRecordStateVisualObject} [CurrentState] {@link enums.CommandTaskRecordStateVisualObject}
     * @param {number} [Progress] {@link number}
     * @constructor
     */
    vos.CommandTaskRecordStateAndProgressVisualObject = function(CurrentState, Progress){
        /** @type {enums.CommandTaskRecordStateVisualObject} */
        this.CurrentState = CurrentState;
        /** @type {number} */
        this.Progress = Progress;
    };
    /**
     * @param {vos.CommandTaskRecordButtonsState} [CommandTaskRecordButtonsState] {@link vos.CommandTaskRecordButtonsState}
     * @param {date} [Completed] {@link date}
     * @param {string} [Information] {@link string}
     * @param {string} [InitiatedBy] {@link string}
     * @param {boolean} [IsCancellable] {@link boolean}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupId] {@link vos.ProtectionGroupIdentifier}
     * @param {vos.CommandTaskRelatedEntityVisualObject[]} [RelatedEntities] {@link vos.CommandTaskRelatedEntityVisualObject[]}
     * @param {date} [Started] {@link date}
     * @param {vos.CommandTaskRecordStateAndProgressVisualObject} [StateAndProgress] {@link vos.CommandTaskRecordStateAndProgressVisualObject}
     * @param {vos.CommandTaskIdentifier} [TaskId] {@link vos.CommandTaskIdentifier}
     * @param {enums.ExtensionTask_ZCommand} [TaskType] {@link enums.ExtensionTask_ZCommand}
     * @param {vos.VPGDetailsScreenState} [VpgScreenState] {@link vos.VPGDetailsScreenState}
     * @constructor
     */
    vos.CommandTaskRecordVisualObject = function(CommandTaskRecordButtonsState, Completed, Information, InitiatedBy, IsCancellable, ProtectionGroupId, RelatedEntities, Started, StateAndProgress, TaskId, TaskType, VpgScreenState){
        /** @type {vos.CommandTaskRecordButtonsState} */
        this.CommandTaskRecordButtonsState = CommandTaskRecordButtonsState;
        /** @type {date} */
        this.Completed = Completed;
        /** @type {string} */
        this.Information = Information;
        /** @type {string} */
        this.InitiatedBy = InitiatedBy;
        /** @type {boolean} */
        this.IsCancellable = IsCancellable;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupId = ProtectionGroupId;
        /** @type {vos.CommandTaskRelatedEntityVisualObject[]} */
        this.RelatedEntities = RelatedEntities;
        /** @type {date} */
        this.Started = Started;
        /** @type {vos.CommandTaskRecordStateAndProgressVisualObject} */
        this.StateAndProgress = StateAndProgress;
        /** @type {vos.CommandTaskIdentifier} */
        this.TaskId = TaskId;
        /** @type {enums.ExtensionTask_ZCommand} */
        this.TaskType = TaskType;
        /** @type {vos.VPGDetailsScreenState} */
        this.VpgScreenState = VpgScreenState;
    };
    /**
     * @param {vos.FlrSessionIdentifier} [FlrSessionIdentifier] {@link vos.FlrSessionIdentifier}
     * @param {vos.HostIdentifier} [HostId] {@link vos.HostIdentifier}
     * @param {string} [Name] {@link string}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupId] {@link vos.ProtectionGroupIdentifier}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @constructor
     */
    vos.CommandTaskRelatedEntityVisualObject = function(FlrSessionIdentifier, HostId, Name, ProtectionGroupId, SiteId){
        /** @type {vos.FlrSessionIdentifier} */
        this.FlrSessionIdentifier = FlrSessionIdentifier;
        /** @type {vos.HostIdentifier} */
        this.HostId = HostId;
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupId = ProtectionGroupId;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
    };
    /**
     * @param {vos.BaseComputeResourceIdentifier} [BaseComputeResourceIdentifier] {@link vos.BaseComputeResourceIdentifier}
     * @param {string} [DisplayName] {@link string}
     * @param {vos.ResourcePoolIdentifier} [ResourcePoolIdentifier] {@link vos.ResourcePoolIdentifier}
     * @constructor
     */
    vos.ComputeResourceVisualObject = function(BaseComputeResourceIdentifier, DisplayName, ResourcePoolIdentifier){
        /** @type {vos.BaseComputeResourceIdentifier} */
        this.BaseComputeResourceIdentifier = BaseComputeResourceIdentifier;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.ResourcePoolIdentifier} */
        this.ResourcePoolIdentifier = ResourcePoolIdentifier;
    };
    /**
     * @param {string} [InternalDatacenterName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.DatacenterIdentifier = function(InternalDatacenterName, ServerIdentifier){
        /** @type {string} */
        this.InternalDatacenterName = InternalDatacenterName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.DatacenterIdentifier} [Identifier] {@link vos.DatacenterIdentifier}
     * @param {vos.VMFolderTreeVisualObject} [VmFolder] {@link vos.VMFolderTreeVisualObject}
     * @constructor
     */
    vos.DatacenterTreeVisualObject = function(DisplayName, Identifier, VmFolder){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.DatacenterIdentifier} */
        this.Identifier = Identifier;
        /** @type {vos.VMFolderTreeVisualObject} */
        this.VmFolder = VmFolder;
    };
    /**
     * @param {string} [InternalDatastoreName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.DatastoreIdentifier = function(InternalDatastoreName, ServerIdentifier){
        /** @type {string} */
        this.InternalDatastoreName = InternalDatastoreName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {boolean} [Enable] {@link boolean}
     * @param {vos.DatastoreIdentifier} [Id] {@link vos.DatastoreIdentifier}
     * @param {boolean} [Journal] {@link boolean}
     * @param {boolean} [Preseed] {@link boolean}
     * @param {string} [PresentedAs] {@link string}
     * @constructor
     */
    vos.DatastoreSettingsVisualObject = function(DisplayName, Enable, Id, Journal, Preseed, PresentedAs){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {boolean} */
        this.Enable = Enable;
        /** @type {vos.DatastoreIdentifier} */
        this.Id = Id;
        /** @type {boolean} */
        this.Journal = Journal;
        /** @type {boolean} */
        this.Preseed = Preseed;
        /** @type {string} */
        this.PresentedAs = PresentedAs;
    };
    /**
     * @param {vos.StorageResourceNode[]} [StorageResourceNodes] {@link vos.StorageResourceNode[]}
     * @constructor
     */
    vos.DatastoresScreenVisualObject = function(StorageResourceNodes){
        /** @type {vos.StorageResourceNode[]} */
        this.StorageResourceNodes = StorageResourceNodes;
    };
    /**
     * @param {vos.StoragePodIdentifier} [DatastoreClusterIdentifier] {@link vos.StoragePodIdentifier}
     * @param {string} [DisplayName] {@link string}
     * @param {vos.DatastoreIdentifier} [Id] {@link vos.DatastoreIdentifier}
     * @constructor
     */
    vos.DatastoreVisualObject = function(DatastoreClusterIdentifier, DisplayName, Id){
        /** @type {vos.StoragePodIdentifier} */
        this.DatastoreClusterIdentifier = DatastoreClusterIdentifier;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.DatastoreIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {boolean} [IsThin] {@link boolean}
     * @param {vos.DatastoreIdentifier} [TargetDatastore] {@link vos.DatastoreIdentifier}
     * @constructor
     */
    vos.DatastoreVolumeReplicationDestination = function(IsThin, TargetDatastore){
        /** @type {boolean} */
        this.IsThin = IsThin;
        /** @type {vos.DatastoreIdentifier} */
        this.TargetDatastore = TargetDatastore;
    };
    /**
     * @param {vos.DatastoreVisualObject} [Datastore] {@link vos.DatastoreVisualObject}
     * @constructor
     */
    vos.DatastoreVolumeRestoreDestinationVisualObject = function(Datastore){
        /** @type {vos.DatastoreVisualObject} */
        this.Datastore = Datastore;
    };
    /**
     * @param {number} [Day] {@link number}
     * @param {number} [Usage] {@link number}
     * @constructor
     */
    vos.DayUsageValueObject = function(Day, Usage){
        /** @type {number} */
        this.Day = Day;
        /** @type {number} */
        this.Usage = Usage;
    };
    /**
     * @param {enums.RestorePointRangeType} [RestorePointRange] {@link enums.RestorePointRangeType}
     * @constructor
     */
    vos.DeleteBackupSettingsVisualObject = function(RestorePointRange){
        /** @type {enums.RestorePointRangeType} */
        this.RestorePointRange = RestorePointRange;
    };
    /**
     * @param {string} [InternalDeviceName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.DeviceIdentifier = function(InternalDeviceName, ServerIdentifier){
        /** @type {string} */
        this.InternalDeviceName = InternalDeviceName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @constructor
     */
    vos.DiskBoxVisualObject = function(DisplayName){
        /** @type {string} */
        this.DisplayName = DisplayName;
    };
    /**
     * @param {number} [ControllerNumber] {@link number}
     * @param {number} [UnitNumber] {@link number}
     * @param {vos.VMUuids} [VMUuids] {@link vos.VMUuids}
     * @param {enums.VMVolumeType} [VolumeType] {@link enums.VMVolumeType}
     * @constructor
     */
    vos.DiskLocationParams = function(ControllerNumber, UnitNumber, VMUuids, VolumeType){
        /** @type {number} */
        this.ControllerNumber = ControllerNumber;
        /** @type {number} */
        this.UnitNumber = UnitNumber;
        /** @type {vos.VMUuids} */
        this.VMUuids = VMUuids;
        /** @type {enums.VMVolumeType} */
        this.VolumeType = VolumeType;
    };
    /**
     * @constructor
     */
    vos.EmailToAddress = function(){
    };
    /**
     * @param {string} [ErrorMsg] {@link string}
     * @param {enums.InWizardValidationTypeVisualObject} [ValidationType] {@link enums.InWizardValidationTypeVisualObject}
     * @constructor
     */
    vos.ErrorValidationTokenVisualObject = function(ErrorMsg, ValidationType){
        /** @type {string} */
        this.ErrorMsg = ErrorMsg;
        /** @type {enums.InWizardValidationTypeVisualObject} */
        this.ValidationType = ValidationType;
    };
    /**
     * @param {enums.SystemEventType_GeneralEventType} [EventGeneralType] {@link enums.SystemEventType_GeneralEventType}
     * @constructor
     */
    vos.EventGeneralTypesCriteria = function(EventGeneralType){
        /** @type {enums.SystemEventType_GeneralEventType} */
        this.EventGeneralType = EventGeneralType;
    };
    /**
     * @param {string} [EventGuid] {@link string}
     * @constructor
     */
    vos.EventIdentifier = function(EventGuid){
        /** @type {string} */
        this.EventGuid = EventGuid;
    };
    /**
     * @param {boolean} [ExistingVpg] {@link boolean}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [ProtectionGroupName] {@link string}
     * @constructor
     */
    vos.EventProtectionGroupVisualObject = function(ExistingVpg, ProtectionGroupIdentifier, ProtectionGroupName){
        /** @type {boolean} */
        this.ExistingVpg = ExistingVpg;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupIdentifier = ProtectionGroupIdentifier;
        /** @type {string} */
        this.ProtectionGroupName = ProtectionGroupName;
    };
    /**
     * @param {string} [From] {@link string}
     * @param {boolean} [IsEnabled] {@link boolean}
     * @param {string} [SmtpServerAddress] {@link string}
     * @param {number} [SmtpServerPort] {@link number}
     * @param {string} [To] {@link string}
     * @param {vos.EmailToAddress[]} [ToAddresses] {@link vos.EmailToAddress[]}
     * @param {boolean} [BackupNotificationEnabled] {@link boolean}
     * @param {enums.DayOfWeek} [BackupNotificationScheduleDayOfWeek] {@link enums.DayOfWeek}
     * @param {number} [BackupNotificationScheduleTimeOfDay] {@link number}
     * @param {enums.SchedulePeriodType} [BackupNotificationScheduleType] {@link enums.SchedulePeriodType}
     * @constructor
     */
    vos.EventsEmailConfiguration = function(From, IsEnabled, SmtpServerAddress, SmtpServerPort, To, ToAddresses, BackupNotificationEnabled, BackupNotificationScheduleDayOfWeek, BackupNotificationScheduleTimeOfDay, BackupNotificationScheduleType){
        /** @type {string} */
        this.From = From;
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
        /** @type {string} */
        this.SmtpServerAddress = SmtpServerAddress;
        /** @type {number} */
        this.SmtpServerPort = SmtpServerPort;
        /** @type {string} */
        this.To = To;
        /** @type {vos.EmailToAddress[]} */
        this.ToAddresses = ToAddresses;
        /** @type {boolean} */
        this.BackupNotificationEnabled = BackupNotificationEnabled;
        /** @type {enums.DayOfWeek} */
        this.BackupNotificationScheduleDayOfWeek = BackupNotificationScheduleDayOfWeek;
        /** @type {number} */
        this.BackupNotificationScheduleTimeOfDay = BackupNotificationScheduleTimeOfDay;
        /** @type {enums.SchedulePeriodType} */
        this.BackupNotificationScheduleType = BackupNotificationScheduleType;
    };
    /**
     * @param {string} [Description] {@link string}
     * @param {string} [Entity] {@link string}
     * @param {vos.EventIdentifier} [EventIdentifier] {@link vos.EventIdentifier}
     * @param {vos.CommandTaskRelatedEntityVisualObject[]} [EventRelatedEntities] {@link vos.CommandTaskRelatedEntityVisualObject[]}
     * @param {string} [EventType] {@link string}
     * @param {string} [HelpId] {@link string}
     * @param {string} [ProtectedSiteName] {@link string}
     * @param {vos.EventProtectionGroupVisualObject[]} [ProtectionGroupVisualObjects] {@link vos.EventProtectionGroupVisualObject[]}
     * @param {boolean} [Success] {@link boolean}
     * @param {date} [TimeStamp] {@link date}
     * @param {string} [User] {@link string}
     * @param {string} [ZertoOrganizationName] {@link string}
     * @constructor
     */
    vos.EventVisualObject = function(Description, Entity, EventIdentifier, EventRelatedEntities, EventType, HelpId, ProtectedSiteName, ProtectionGroupVisualObjects, Success, TimeStamp, User, ZertoOrganizationName){
        /** @type {string} */
        this.Description = Description;
        /** @type {string} */
        this.Entity = Entity;
        /** @type {vos.EventIdentifier} */
        this.EventIdentifier = EventIdentifier;
        /** @type {vos.CommandTaskRelatedEntityVisualObject[]} */
        this.EventRelatedEntities = EventRelatedEntities;
        /** @type {string} */
        this.EventType = EventType;
        /** @type {string} */
        this.HelpId = HelpId;
        /** @type {string} */
        this.ProtectedSiteName = ProtectedSiteName;
        /** @type {vos.EventProtectionGroupVisualObject[]} */
        this.ProtectionGroupVisualObjects = ProtectionGroupVisualObjects;
        /** @type {boolean} */
        this.Success = Success;
        /** @type {date} */
        this.TimeStamp = TimeStamp;
        /** @type {string} */
        this.User = User;
        /** @type {string} */
        this.ZertoOrganizationName = ZertoOrganizationName;
    };
    /**
     * @constructor
     */
    vos.Exception = function(){
    };
    /**
     * @param {vos.SpecificDisk} [SpecificDisk] {@link vos.SpecificDisk}
     * @param {vos.VMIdentifier} [VMIdentifier] {@link vos.VMIdentifier}
     * @param {Object} [SearchFlags] {@link Object}
     * @constructor
     */
    vos.ExistingDiskVolumeReplicationDestination = function(SpecificDisk, VMIdentifier, SearchFlags){
        /** @type {vos.SpecificDisk} */
        this.SpecificDisk = SpecificDisk;
        /** @type {vos.VMIdentifier} */
        this.VMIdentifier = VMIdentifier;
        /** @type {Object} */
        this.SearchFlags = SearchFlags;
    };
    /**
     * @param {vos.CheckpointIdentifier} [CheckpointIdentifier] {@link vos.CheckpointIdentifier}
     * @param {boolean} [ForceShutdown] {@link boolean}
     * @param {vos.MoveAutoContinueInfoVisual} [MoveAutoContinueInfo] {@link vos.MoveAutoContinueInfoVisual}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {boolean} [Shutdown] {@link boolean}
     * @constructor
     */
    vos.FailoverBeforeCommitGuiCommand = function(CheckpointIdentifier, ForceShutdown, MoveAutoContinueInfo, ProtectionGroupIdentifier, Shutdown){
        /** @type {vos.CheckpointIdentifier} */
        this.CheckpointIdentifier = CheckpointIdentifier;
        /** @type {boolean} */
        this.ForceShutdown = ForceShutdown;
        /** @type {vos.MoveAutoContinueInfoVisual} */
        this.MoveAutoContinueInfo = MoveAutoContinueInfo;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupIdentifier = ProtectionGroupIdentifier;
        /** @type {boolean} */
        this.Shutdown = Shutdown;
    };
    /**
     * @param {vos.CheckpointIdentifier} [CheckpointIdentifier] {@link vos.CheckpointIdentifier}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @constructor
     */
    vos.FailoverTestGuiCommand = function(CheckpointIdentifier, ProtectionGroupIdentifier){
        /** @type {vos.CheckpointIdentifier} */
        this.CheckpointIdentifier = CheckpointIdentifier;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupIdentifier = ProtectionGroupIdentifier;
    };
    /**
     * @param {enums.TestStatus} [Status] {@link enums.TestStatus}
     * @param {string} [Summary] {@link string}
     * @constructor
     */
    vos.FailoverTestResult = function(Status, Summary){
        /** @type {enums.TestStatus} */
        this.Status = Status;
        /** @type {string} */
        this.Summary = Summary;
    };
    /**
     * @param {string} [SessionGuid] {@link string}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @constructor
     */
    vos.FlrSessionIdentifier = function(SessionGuid, SiteId){
        /** @type {string} */
        this.SessionGuid = SessionGuid;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
    };
    /**
     * @param {string} [InternalFolderName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.FolderIdentifier = function(InternalFolderName, ServerIdentifier){
        /** @type {string} */
        this.InternalFolderName = InternalFolderName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {vos.CheckpointIdentifier} [CheckpointIdentifier] {@link vos.CheckpointIdentifier}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @constructor
     */
    vos.HasNoSharedVmsVisualObject = function(CheckpointIdentifier, ProtectionGroupIdentifier){
        /** @type {vos.CheckpointIdentifier} */
        this.CheckpointIdentifier = CheckpointIdentifier;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupIdentifier = ProtectionGroupIdentifier;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {number} [HistoryInMinutes] {@link number}
     * @constructor
     */
    vos.HistoryItemVisualObject = function(DisplayName, HistoryInMinutes){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {number} */
        this.HistoryInMinutes = HistoryInMinutes;
    };
    /**
     * @param {vos.AlertVisualObject[]} [Alerts] {@link vos.AlertVisualObject[]}
     * @param {vos.ComputeResourceVisualObject} [Host] {@link vos.ComputeResourceVisualObject}
     * @param {boolean} [IsGhost] {@link boolean}
     * @param {boolean} [IsSiteToVraConnectionOk] {@link boolean}
     * @param {boolean} [IsVraToVraConnectionOk] {@link boolean}
     * @param {vos.VirtualDatacenterVisualObject} [OrgVdc] {@link vos.VirtualDatacenterVisualObject}
     * @param {vos.AlertVisualObject[]} [ResourcePoolAlerts] {@link vos.AlertVisualObject[]}
     * @param {string} [VraName] {@link string}
     * @constructor
     */
    vos.HostDetailsForVpgTopologyVisualObject = function(Alerts, Host, IsGhost, IsSiteToVraConnectionOk, IsVraToVraConnectionOk, OrgVdc, ResourcePoolAlerts, VraName){
        /** @type {vos.AlertVisualObject[]} */
        this.Alerts = Alerts;
        /** @type {vos.ComputeResourceVisualObject} */
        this.Host = Host;
        /** @type {boolean} */
        this.IsGhost = IsGhost;
        /** @type {boolean} */
        this.IsSiteToVraConnectionOk = IsSiteToVraConnectionOk;
        /** @type {boolean} */
        this.IsVraToVraConnectionOk = IsVraToVraConnectionOk;
        /** @type {vos.VirtualDatacenterVisualObject} */
        this.OrgVdc = OrgVdc;
        /** @type {vos.AlertVisualObject[]} */
        this.ResourcePoolAlerts = ResourcePoolAlerts;
        /** @type {string} */
        this.VraName = VraName;
    };
    /**
     * @param {vos.PotentialDatastoreVisualObject[]} [Datastores] {@link vos.PotentialDatastoreVisualObject[]}
     * @param {vos.VirtualNetworkVisualObject[]} [Networks] {@link vos.VirtualNetworkVisualObject[]}
     * @constructor
     */
    vos.HostEntitiesForVraOrZccInstall = function(Datastores, Networks){
        /** @type {vos.PotentialDatastoreVisualObject[]} */
        this.Datastores = Datastores;
        /** @type {vos.VirtualNetworkVisualObject[]} */
        this.Networks = Networks;
    };
    /**
     * @param {string} [InternalHostName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.HostIdentifier = function(InternalHostName, ServerIdentifier){
        /** @type {string} */
        this.InternalHostName = InternalHostName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {string} [Build] {@link string}
     * @param {boolean} [HostCredentialRequired] {@link boolean}
     * @param {string} [Version] {@link string}
     * @param {boolean} [VibSupported] {@link boolean}
     * @constructor
     */
    vos.HostVersionVisualObject = function(Build, HostCredentialRequired, Version, VibSupported){
        /** @type {string} */
        this.Build = Build;
        /** @type {boolean} */
        this.HostCredentialRequired = HostCredentialRequired;
        /** @type {string} */
        this.Version = Version;
        /** @type {boolean} */
        this.VibSupported = VibSupported;
    };
    /**
     * @param {boolean} [HostCredentialRequired] {@link boolean}
     * @param {vos.ComputeResourceVisualObject} [HostInfo] {@link vos.ComputeResourceVisualObject}
     * @param {boolean} [VibSupported] {@link boolean}
     * @constructor
     */
    vos.HostVraInfoVisualObject = function(HostCredentialRequired, HostInfo, VibSupported){
        /** @type {boolean} */
        this.HostCredentialRequired = HostCredentialRequired;
        /** @type {vos.ComputeResourceVisualObject} */
        this.HostInfo = HostInfo;
        /** @type {boolean} */
        this.VibSupported = VibSupported;
    };
    /**
     * @param {boolean} [HasLicence] {@link boolean}
     * @param {boolean} [IsCreateSupportTicketEnabled] {@link boolean}
     * @param {boolean} [IsPortal] {@link boolean}
     * @param {boolean} [IsSessionValid] {@link boolean}
     * @param {enums.VpgEntityType} [VirtualizationProviderType] {@link enums.VpgEntityType}
     * @param {vos.SiteIdentifier} [SiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [SiteKey] {@link string}
     * @constructor
     */
    vos.InitialSessionValidation = function(HasLicence, IsCreateSupportTicketEnabled, IsPortal, IsSessionValid, VirtualizationProviderType, SiteIdentifier, SiteKey){
        /** @type {boolean} */
        this.HasLicence = HasLicence;
        /** @type {boolean} */
        this.IsCreateSupportTicketEnabled = IsCreateSupportTicketEnabled;
        /** @type {boolean} */
        this.IsPortal = IsPortal;
        /** @type {boolean} */
        this.IsSessionValid = IsSessionValid;
        /** @type {enums.VpgEntityType} */
        this.VirtualizationProviderType = VirtualizationProviderType;
        /** @type {vos.SiteIdentifier} */
        this.SiteIdentifier = SiteIdentifier;
        /** @type {string} */
        this.SiteKey = SiteKey;
    };
    /**
     * @param {boolean} [AllowOneToMany] {@link boolean}
     * @param {boolean} [AllowSourceVcenter] {@link boolean}
     * @param {string} [DisallowedOneToManyReason] {@link string}
     * @param {vos.VCDVappTableEntry[]} [LocalVCDVapps] {@link vos.VCDVappTableEntry[]}
     * @param {vos.ZertoOrganizationForVPGVisualObject[]} [PotentialZertoOrganization] {@link vos.ZertoOrganizationForVPGVisualObject[]}
     * @param {vos.PotentialReplicationSiteInitialInfo[]} [TargetSites] {@link vos.PotentialReplicationSiteInitialInfo[]}
     * @constructor
     */
    vos.InitialVPGManageInfoVisualObject = function(AllowOneToMany, AllowSourceVcenter, DisallowedOneToManyReason, LocalVCDVapps, PotentialZertoOrganization, TargetSites){
        /** @type {boolean} */
        this.AllowOneToMany = AllowOneToMany;
        /** @type {boolean} */
        this.AllowSourceVcenter = AllowSourceVcenter;
        /** @type {string} */
        this.DisallowedOneToManyReason = DisallowedOneToManyReason;
        /** @type {vos.VCDVappTableEntry[]} */
        this.LocalVCDVapps = LocalVCDVapps;
        /** @type {vos.ZertoOrganizationForVPGVisualObject[]} */
        this.PotentialZertoOrganization = PotentialZertoOrganization;
        /** @type {vos.PotentialReplicationSiteInitialInfo[]} */
        this.TargetSites = TargetSites;
    };
    /**
     * @param {enums.InWizardValidationTypeVisualObject} [ValidationType] {@link enums.InWizardValidationTypeVisualObject}
     * @constructor
     */
    vos.InputValidationTokenVisualObject = function(ValidationType){
        /** @type {enums.InWizardValidationTypeVisualObject} */
        this.ValidationType = ValidationType;
    };
    /**
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [Tag] {@link string}
     * @constructor
     */
    vos.InsertTaggedCheckpointGuiCommand = function(ProtectionGroupIdentifier, Tag){
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupIdentifier = ProtectionGroupIdentifier;
        /** @type {string} */
        this.Tag = Tag;
    };
    /**
     * @param {string} [BandwidthGroup] {@link string}
     * @param {vos.DatastoreVisualObject} [Datastore] {@link vos.DatastoreVisualObject}
     * @param {boolean} [InstalledUsingSshKey] {@link boolean}
     * @param {string} [InstalledVraVersion] {@link string}
     * @param {vos.VraIpConf} [IpConfiguration] {@link vos.VraIpConf}
     * @param {boolean} [IsDhcpConf] {@link boolean}
     * @param {number} [MemoryInGB] {@link number}
     * @param {vos.VirtualNetworkVisualObject} [Network] {@link vos.VirtualNetworkVisualObject}
     * @param {vos.StoragePodVisualObject} [StoragePod] {@link vos.StoragePodVisualObject}
     * @param {vos.VirtualMachineVisualObject} [VraVM] {@link vos.VirtualMachineVisualObject}
     * @constructor
     */
    vos.InstalledVraInfoVisualObject = function(BandwidthGroup, Datastore, InstalledUsingSshKey, InstalledVraVersion, IpConfiguration, IsDhcpConf, MemoryInGB, Network, StoragePod, VraVM){
        /** @type {string} */
        this.BandwidthGroup = BandwidthGroup;
        /** @type {vos.DatastoreVisualObject} */
        this.Datastore = Datastore;
        /** @type {boolean} */
        this.InstalledUsingSshKey = InstalledUsingSshKey;
        /** @type {string} */
        this.InstalledVraVersion = InstalledVraVersion;
        /** @type {vos.VraIpConf} */
        this.IpConfiguration = IpConfiguration;
        /** @type {boolean} */
        this.IsDhcpConf = IsDhcpConf;
        /** @type {number} */
        this.MemoryInGB = MemoryInGB;
        /** @type {vos.VirtualNetworkVisualObject} */
        this.Network = Network;
        /** @type {vos.StoragePodVisualObject} */
        this.StoragePod = StoragePod;
        /** @type {vos.VirtualMachineVisualObject} */
        this.VraVM = VraVM;
    };
    /**
     * @param {string} [Gateway] {@link string}
     * @param {boolean} [IsDhcp] {@link boolean}
     * @param {string} [PrimaryDns] {@link string}
     * @param {string} [SecondaryDns] {@link string}
     * @param {string} [StaticIP] {@link string}
     * @param {string} [SubnetMask] {@link string}
     * @constructor
     */
    vos.IPSettings = function(Gateway, IsDhcp, PrimaryDns, SecondaryDns, StaticIP, SubnetMask){
        /** @type {string} */
        this.Gateway = Gateway;
        /** @type {boolean} */
        this.IsDhcp = IsDhcp;
        /** @type {string} */
        this.PrimaryDns = PrimaryDns;
        /** @type {string} */
        this.SecondaryDns = SecondaryDns;
        /** @type {string} */
        this.StaticIP = StaticIP;
        /** @type {string} */
        this.SubnetMask = SubnetMask;
    };
    /**
     * @param {number} [ActualJournalHealthInMinutes] {@link number}
     * @param {string} [JournalHealthDescription] {@link string}
     * @param {number} [RequiredJournalHealthInMinutes] {@link number}
     * @constructor
     */
    vos.JournalHealthStatusVisualObject = function(ActualJournalHealthInMinutes, JournalHealthDescription, RequiredJournalHealthInMinutes){
        /** @type {number} */
        this.ActualJournalHealthInMinutes = ActualJournalHealthInMinutes;
        /** @type {string} */
        this.JournalHealthDescription = JournalHealthDescription;
        /** @type {number} */
        this.RequiredJournalHealthInMinutes = RequiredJournalHealthInMinutes;
    };
    /**
     * @param {number} [Limit] {@link number}
     * @param {enums.JournalLimitType} [Type] {@link enums.JournalLimitType}
     * @constructor
     */
    vos.JournalLimitVisualObject = function(Limit, Type){
        /** @type {number} */
        this.Limit = Limit;
        /** @type {enums.JournalLimitType} */
        this.Type = Type;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {number} [JournalWarningThresholdInPercent] {@link number}
     * @constructor
     */
    vos.JournalWarningThresholdItemVisualObject = function(DisplayName, JournalWarningThresholdInPercent){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {number} */
        this.JournalWarningThresholdInPercent = JournalWarningThresholdInPercent;
    };
    /**
     * @param {string} [Description] {@link string}
     * @param {string} [State] {@link string}
     * @param {date} [TestEndTime] {@link date}
     * @constructor
     */
    vos.LastTestSummary = function(Description, State, TestEndTime){
        /** @type {string} */
        this.Description = Description;
        /** @type {string} */
        this.State = State;
        /** @type {date} */
        this.TestEndTime = TestEndTime;
    };
    /**
     * @param {date} [ExpiryDate] {@link date}
     * @param {number} [LicenseId] {@link number}
     * @param {vos.LicenseQuantity} [Limit] {@link vos.LicenseQuantity}
     * @param {vos.LicenseQuantity} [MaxSites] {@link vos.LicenseQuantity}
     * @param {boolean} [ShowUsage] {@link boolean}
     * @param {vos.LicenseStatsValueObject[]} [SitesUsage] {@link vos.LicenseStatsValueObject[]}
     * @param {string} [Type] {@link string}
     * @param {string} [VersionForLicense] {@link string}
     * @constructor
     */
    vos.LicenseDetailsValueObject = function(ExpiryDate, LicenseId, Limit, MaxSites, ShowUsage, SitesUsage, Type, VersionForLicense){
        /** @type {date} */
        this.ExpiryDate = ExpiryDate;
        /** @type {number} */
        this.LicenseId = LicenseId;
        /** @type {vos.LicenseQuantity} */
        this.Limit = Limit;
        /** @type {vos.LicenseQuantity} */
        this.MaxSites = MaxSites;
        /** @type {boolean} */
        this.ShowUsage = ShowUsage;
        /** @type {vos.LicenseStatsValueObject[]} */
        this.SitesUsage = SitesUsage;
        /** @type {string} */
        this.Type = Type;
        /** @type {string} */
        this.VersionForLicense = VersionForLicense;
    };
    /**
     * @param {string} [Key] {@link string}
     * @constructor
     */
    vos.LicenseKey = function(Key){
        /** @type {string} */
        this.Key = Key;
    };
    /**
     * @param {number} [Num] {@link number}
     * @constructor
     */
    vos.LicenseQuantity = function(Num){
        /** @type {number} */
        this.Num = Num;
    };
    /**
     * @param {vos.LicenseDetailsValueObject} [Details] {@link vos.LicenseDetailsValueObject}
     * @param {boolean} [IsLicenseEnableWork] {@link boolean}
     * @param {boolean} [IsLicenseUpdateEnabled] {@link boolean}
     * @param {vos.LicenseKey} [Key] {@link vos.LicenseKey}
     * @constructor
     */
    vos.LicenseScreenValueObject = function(Details, IsLicenseEnableWork, IsLicenseUpdateEnabled, Key){
        /** @type {vos.LicenseDetailsValueObject} */
        this.Details = Details;
        /** @type {boolean} */
        this.IsLicenseEnableWork = IsLicenseEnableWork;
        /** @type {boolean} */
        this.IsLicenseUpdateEnabled = IsLicenseUpdateEnabled;
        /** @type {vos.LicenseKey} */
        this.Key = Key;
    };
    /**
     * @param {string} [SiteName] {@link string}
     * @param {vos.LicenseQuantity} [Usage] {@link vos.LicenseQuantity}
     * @constructor
     */
    vos.LicenseStatsValueObject = function(SiteName, Usage){
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {vos.LicenseQuantity} */
        this.Usage = Usage;
    };
    /**
     * @param {string} [Path] {@link string}
     * @constructor
     */
    vos.LocalBackupTargetDetailsVisualObject = function(Path){
        /** @type {string} */
        this.Path = Path;
    };
    /**
     * @param {vos.DatastoreVisualObject} [JournalDatastore] {@link vos.DatastoreVisualObject}
     * @param {vos.JournalLimitVisualObject} [JournalHardLimitPerVM] {@link vos.JournalLimitVisualObject}
     * @param {vos.JournalLimitVisualObject} [JournalWarningThresholdPerVM] {@link vos.JournalLimitVisualObject}
     * @constructor
     */
    vos.ManageJournalVisualObject = function(JournalDatastore, JournalHardLimitPerVM, JournalWarningThresholdPerVM){
        /** @type {vos.DatastoreVisualObject} */
        this.JournalDatastore = JournalDatastore;
        /** @type {vos.JournalLimitVisualObject} */
        this.JournalHardLimitPerVM = JournalHardLimitPerVM;
        /** @type {vos.JournalLimitVisualObject} */
        this.JournalWarningThresholdPerVM = JournalWarningThresholdPerVM;
    };
    /**
     * @param {vos.DiskLocationParams} [DiskLocationParams] {@link vos.DiskLocationParams}
     * @param {vos.ComputeResourceVisualObject} [SelectedComputeResource] {@link vos.ComputeResourceVisualObject}
     * @param {vos.DatastoreVisualObject} [SelectedDatastore] {@link vos.DatastoreVisualObject}
     * @param {vos.VMIdentifier} [VmIdentifier] {@link vos.VMIdentifier}
     * @constructor
     */
    vos.ManageSingleVolumeInfoInputParams = function(DiskLocationParams, SelectedComputeResource, SelectedDatastore, VmIdentifier){
        /** @type {vos.DiskLocationParams} */
        this.DiskLocationParams = DiskLocationParams;
        /** @type {vos.ComputeResourceVisualObject} */
        this.SelectedComputeResource = SelectedComputeResource;
        /** @type {vos.DatastoreVisualObject} */
        this.SelectedDatastore = SelectedDatastore;
        /** @type {vos.VMIdentifier} */
        this.VmIdentifier = VmIdentifier;
    };
    /**
     * @param {boolean} [IsThinSelectionEnabled] {@link boolean}
     * @param {vos.RecoveryExistingDisk} [OptionalExistingDisk] {@link vos.RecoveryExistingDisk}
     * @param {vos.PotentialDatastoreVisualObject[]} [PotentialDatastores] {@link vos.PotentialDatastoreVisualObject[]}
     * @param {vos.RecoveryRawDeviceVisualObject[]} [PotentialRawDevices] {@link vos.RecoveryRawDeviceVisualObject[]}
     * @constructor
     */
    vos.ManageSingleVolumeInfoVisualObject = function(IsThinSelectionEnabled, OptionalExistingDisk, PotentialDatastores, PotentialRawDevices){
        /** @type {boolean} */
        this.IsThinSelectionEnabled = IsThinSelectionEnabled;
        /** @type {vos.RecoveryExistingDisk} */
        this.OptionalExistingDisk = OptionalExistingDisk;
        /** @type {vos.PotentialDatastoreVisualObject[]} */
        this.PotentialDatastores = PotentialDatastores;
        /** @type {vos.RecoveryRawDeviceVisualObject[]} */
        this.PotentialRawDevices = PotentialRawDevices;
    };
    /**
     * @param {vos.VpgConfigurationVisualObject} [Config] {@link vos.VpgConfigurationVisualObject}
     * @param {vos.VPGConfigurationFlags} [ConfigurationFlags] {@link vos.VPGConfigurationFlags}
     * @param {vos.VpgEntities} [Entities] {@link vos.VpgEntities}
     * @param {boolean} [IsEnableVmJournalDatastoreSelection] {@link boolean}
     * @param {vos.ZertoOrganizationForVPGVisualObject[]} [PotentialZertoOrganization] {@link vos.ZertoOrganizationForVPGVisualObject[]}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupId] {@link vos.ProtectionGroupIdentifier}
     * @param {vos.PotentialReplicationTargetSite} [TargetSiteInfo] {@link vos.PotentialReplicationTargetSite}
     * @constructor
     */
    vos.ManageVPGInfoVisualObject = function(Config, ConfigurationFlags, Entities, IsEnableVmJournalDatastoreSelection, PotentialZertoOrganization, ProtectionGroupId, TargetSiteInfo){
        /** @type {vos.VpgConfigurationVisualObject} */
        this.Config = Config;
        /** @type {vos.VPGConfigurationFlags} */
        this.ConfigurationFlags = ConfigurationFlags;
        /** @type {vos.VpgEntities} */
        this.Entities = Entities;
        /** @type {boolean} */
        this.IsEnableVmJournalDatastoreSelection = IsEnableVmJournalDatastoreSelection;
        /** @type {vos.ZertoOrganizationForVPGVisualObject[]} */
        this.PotentialZertoOrganization = PotentialZertoOrganization;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupId = ProtectionGroupId;
        /** @type {vos.PotentialReplicationTargetSite} */
        this.TargetSiteInfo = TargetSiteInfo;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {number} [MaxJournalSizeInPercent] {@link number}
     * @constructor
     */
    vos.MaxJournalSizeItemVisualObject = function(DisplayName, MaxJournalSizeInPercent){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {number} */
        this.MaxJournalSizeInPercent = MaxJournalSizeInPercent;
    };
    /**
     * @param {boolean} [AreScriptsDefined] {@link boolean}
     * @param {boolean} [BootOrder] {@link boolean}
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {vos.VpgEntities} [Entities] {@link vos.VpgEntities}
     * @param {vos.ProtectionGroupIdentifier} [Identifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [Name] {@link string}
     * @param {string} [SourceSiteName] {@link string}
     * @param {vos.VPGDetailsScreenState} [State] {@link vos.VPGDetailsScreenState}
     * @param {string} [TargetSiteName] {@link string}
     * @constructor
     */
    vos.MinimalVPGListItem = function(AreScriptsDefined, BootOrder, Direction, Entities, Identifier, Name, SourceSiteName, State, TargetSiteName){
        /** @type {boolean} */
        this.AreScriptsDefined = AreScriptsDefined;
        /** @type {boolean} */
        this.BootOrder = BootOrder;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {vos.VpgEntities} */
        this.Entities = Entities;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.Identifier = Identifier;
        /** @type {string} */
        this.Name = Name;
        /** @type {string} */
        this.SourceSiteName = SourceSiteName;
        /** @type {vos.VPGDetailsScreenState} */
        this.State = State;
        /** @type {string} */
        this.TargetSiteName = TargetSiteName;
    };
    /**
     * @param {vos.MinimalVPGListItem[]} [ProtectionGroups] {@link vos.MinimalVPGListItem[]}
     * @constructor
     */
    vos.MinimalVPGListVisualObject = function(ProtectionGroups){
        /** @type {vos.MinimalVPGListItem[]} */
        this.ProtectionGroups = ProtectionGroups;
    };
    /**
     * @param {enums.MoveNextAction} [Action] {@link enums.MoveNextAction}
     * @param {boolean} [IsContinueOnPreScriptFailure] {@link boolean}
     * @param {boolean} [KeepSourceVMs] {@link boolean}
     * @param {vos.VpgConfigurationVisualObject} [PostMoveSettings] {@link vos.VpgConfigurationVisualObject}
     * @param {number} [TimeToWaitInSec] {@link number}
     * @constructor
     */
    vos.MoveAutoContinueInfoVisual = function(Action, IsContinueOnPreScriptFailure, KeepSourceVMs, PostMoveSettings, TimeToWaitInSec){
        /** @type {enums.MoveNextAction} */
        this.Action = Action;
        /** @type {boolean} */
        this.IsContinueOnPreScriptFailure = IsContinueOnPreScriptFailure;
        /** @type {boolean} */
        this.KeepSourceVMs = KeepSourceVMs;
        /** @type {vos.VpgConfigurationVisualObject} */
        this.PostMoveSettings = PostMoveSettings;
        /** @type {number} */
        this.TimeToWaitInSec = TimeToWaitInSec;
    };
    /**
     * @param {boolean} [ForceShutdown] {@link boolean}
     * @param {vos.MoveAutoContinueInfoVisual} [MoveAutoContinueInfo] {@link vos.MoveAutoContinueInfoVisual}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @constructor
     */
    vos.MoveBeforeCommitGuiCommand = function(ForceShutdown, MoveAutoContinueInfo, ProtectionGroupIdentifier){
        /** @type {boolean} */
        this.ForceShutdown = ForceShutdown;
        /** @type {vos.MoveAutoContinueInfoVisual} */
        this.MoveAutoContinueInfo = MoveAutoContinueInfo;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupIdentifier = ProtectionGroupIdentifier;
    };
    /**
     * @param {vos.ProtectionGroupIdentifier[]} [ProtectionGroupIdentifiers] {@link vos.ProtectionGroupIdentifier[]}
     * @param {string[]} [ProtectionGroupNames] {@link string[]}
     * @param {string} [ValuesAsCsv] {@link string}
     * @constructor
     */
    vos.MultipleGraphVisualObject = function(ProtectionGroupIdentifiers, ProtectionGroupNames, ValuesAsCsv){
        /** @type {vos.ProtectionGroupIdentifier[]} */
        this.ProtectionGroupIdentifiers = ProtectionGroupIdentifiers;
        /** @type {string[]} */
        this.ProtectionGroupNames = ProtectionGroupNames;
        /** @type {string} */
        this.ValuesAsCsv = ValuesAsCsv;
    };
    /**
     * @param {string} [InternalName] {@link string}
     * @param {string} [InternalType] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.NetworkIdentifier = function(InternalName, InternalType, ServerIdentifier){
        /** @type {string} */
        this.InternalName = InternalName;
        /** @type {string} */
        this.InternalType = InternalType;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {string} [OwnersGuid] {@link string}
     * @constructor
     */
    vos.OwnersIdentifier = function(OwnersGuid){
        /** @type {string} */
        this.OwnersGuid = OwnersGuid;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.OwnersIdentifier} [Id] {@link vos.OwnersIdentifier}
     * @param {boolean} [IsLocal] {@link boolean}
     * @constructor
     */
    vos.OwnersIdVisualObject = function(DisplayName, Id, IsLocal){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.OwnersIdentifier} */
        this.Id = Id;
        /** @type {boolean} */
        this.IsLocal = IsLocal;
    };
    /**
     * @param {string} [PeerGw] {@link string}
     * @param {string} [PeerNetMask] {@link string}
     * @param {string} [PeerNetwork] {@link string}
     * @constructor
     */
    vos.PairedSiteRouting = function(PeerGw, PeerNetMask, PeerNetwork){
        /** @type {string} */
        this.PeerGw = PeerGw;
        /** @type {string} */
        this.PeerNetMask = PeerNetMask;
        /** @type {string} */
        this.PeerNetwork = PeerNetwork;
    };
    /**
     * @param {boolean} [IsPauseEnabled] {@link boolean}
     * @param {boolean} [IsResumeEnabled] {@link boolean}
     * @param {boolean} [IsVpgNowPaused] {@link boolean}
     * @constructor
     */
    vos.PauseResumeVisualObject = function(IsPauseEnabled, IsResumeEnabled, IsVpgNowPaused){
        /** @type {boolean} */
        this.IsPauseEnabled = IsPauseEnabled;
        /** @type {boolean} */
        this.IsResumeEnabled = IsResumeEnabled;
        /** @type {boolean} */
        this.IsVpgNowPaused = IsVpgNowPaused;
    };
    /**
     * @param {enums.ProtectionGroupAlertStatus} [AlertStatus] {@link enums.ProtectionGroupAlertStatus}
     * @param {string} [CustomerName] {@link string}
     * @param {boolean} [HasDisksToKeep] {@link boolean}
     * @param {number} [IOPS] {@link number}
     * @param {number} [IncomingThroughputInMB] {@link number}
     * @param {string} [Location] {@link string}
     * @param {number} [NumberOfVpgs] {@link number}
     * @param {number} [OutgoingBandWidth] {@link number}
     * @param {vos.OwnersIdentifier} [OwnersId] {@link vos.OwnersIdentifier}
     * @param {number} [ProvisionedStorageInMB] {@link number}
     * @param {string} [SiteName] {@link string}
     * @param {number} [UsedStorageInMB] {@link number}
     * @param {vos.PeerProtectionLimitsUsage} [ProtectionLimitsUsage] {@link vos.PeerProtectionLimitsUsage}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {string} [HostName] {@link string}
     * @param {vos.ZertoVersion} [ZertoVersion] {@link vos.ZertoVersion}
     * @constructor
     */
    vos.PeerListScreenItem = function(AlertStatus, CustomerName, HasDisksToKeep, IOPS, IncomingThroughputInMB, Location, NumberOfVpgs, OutgoingBandWidth, OwnersId, ProvisionedStorageInMB, SiteName, UsedStorageInMB, ProtectionLimitsUsage, SiteId, HostName, ZertoVersion){
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.AlertStatus = AlertStatus;
        /** @type {string} */
        this.CustomerName = CustomerName;
        /** @type {boolean} */
        this.HasDisksToKeep = HasDisksToKeep;
        /** @type {number} */
        this.IOPS = IOPS;
        /** @type {number} */
        this.IncomingThroughputInMB = IncomingThroughputInMB;
        /** @type {string} */
        this.Location = Location;
        /** @type {number} */
        this.NumberOfVpgs = NumberOfVpgs;
        /** @type {number} */
        this.OutgoingBandWidth = OutgoingBandWidth;
        /** @type {vos.OwnersIdentifier} */
        this.OwnersId = OwnersId;
        /** @type {number} */
        this.ProvisionedStorageInMB = ProvisionedStorageInMB;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {number} */
        this.UsedStorageInMB = UsedStorageInMB;
        /** @type {vos.PeerProtectionLimitsUsage} */
        this.ProtectionLimitsUsage = ProtectionLimitsUsage;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {string} */
        this.HostName = HostName;
        /** @type {vos.ZertoVersion} */
        this.ZertoVersion = ZertoVersion;
    };
    /**
     * @param {vos.PeerListScreenItem[]} [PeerSites] {@link vos.PeerListScreenItem[]}
     * @param {vos.SiteDetailsVisualObject} [SiteDetails] {@link vos.SiteDetailsVisualObject}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.PeerListScreenVisualObject = function(PeerSites, SiteDetails, State){
        /** @type {vos.PeerListScreenItem[]} */
        this.PeerSites = PeerSites;
        /** @type {vos.SiteDetailsVisualObject} */
        this.SiteDetails = SiteDetails;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {number} [StorageUsedInMB] {@link number}
     * @param {number} [VmsCount] {@link number}
     * @constructor
     */
    vos.PeerProtectionLimitsUsage = function(StorageUsedInMB, VmsCount){
        /** @type {number} */
        this.StorageUsedInMB = StorageUsedInMB;
        /** @type {number} */
        this.VmsCount = VmsCount;
    };
    /**
     * @param {vos.RecoveryPeerStatusWithTimeVisualObject[]} [PeerStatusSamples] {@link vos.RecoveryPeerStatusWithTimeVisualObject[]}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {string} [SiteName] {@link string}
     * @constructor
     */
    vos.PeerRecoveryStatusOverTime = function(PeerStatusSamples, SiteId, SiteName){
        /** @type {vos.RecoveryPeerStatusWithTimeVisualObject[]} */
        this.PeerStatusSamples = PeerStatusSamples;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {string} */
        this.SiteName = SiteName;
    };
    /**
     * @param {number} [BandwidthInMB] {@link number}
     * @param {number} [CPU] {@link number}
     * @param {number} [Iops] {@link number}
     * @param {number} [RPOInSeconds] {@link number}
     * @param {number} [ThroughputInMB] {@link number}
     * @param {number} [VraLocalMemory] {@link number}
     * @param {number} [VraRemoteMemory] {@link number}
     * @constructor
     */
    vos.PerformanceGraphScaleValues = function(BandwidthInMB, CPU, Iops, RPOInSeconds, ThroughputInMB, VraLocalMemory, VraRemoteMemory){
        /** @type {number} */
        this.BandwidthInMB = BandwidthInMB;
        /** @type {number} */
        this.CPU = CPU;
        /** @type {number} */
        this.Iops = Iops;
        /** @type {number} */
        this.RPOInSeconds = RPOInSeconds;
        /** @type {number} */
        this.ThroughputInMB = ThroughputInMB;
        /** @type {number} */
        this.VraLocalMemory = VraLocalMemory;
        /** @type {number} */
        this.VraRemoteMemory = VraRemoteMemory;
    };
    /**
     * @param {vos.ProtectionGroupIdentifier} [Identifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [Name] {@link string}
     * @constructor
     */
    vos.PerformanceScreenPotentialProtectionGroup = function(Identifier, Name){
        /** @type {vos.ProtectionGroupIdentifier} */
        this.Identifier = Identifier;
        /** @type {string} */
        this.Name = Name;
    };
    /**
     * @param {vos.MultipleGraphVisualObject} [ActualRPOInSeconds] {@link vos.MultipleGraphVisualObject}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.MultipleGraphVisualObject} [IncomingIOPS] {@link vos.MultipleGraphVisualObject}
     * @param {vos.MultipleGraphVisualObject} [IncomingThroughputInMb] {@link vos.MultipleGraphVisualObject}
     * @param {vos.MultipleGraphVisualObject} [OutgoingBandWidth] {@link vos.MultipleGraphVisualObject}
     * @param {vos.PerformanceScreenPotentialProtectionGroup[]} [PotentialVpgs] {@link vos.PerformanceScreenPotentialProtectionGroup[]}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.PerformanceScreenVisualObject = function(ActualRPOInSeconds, Details, IncomingIOPS, IncomingThroughputInMb, OutgoingBandWidth, PotentialVpgs, State){
        /** @type {vos.MultipleGraphVisualObject} */
        this.ActualRPOInSeconds = ActualRPOInSeconds;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.MultipleGraphVisualObject} */
        this.IncomingIOPS = IncomingIOPS;
        /** @type {vos.MultipleGraphVisualObject} */
        this.IncomingThroughputInMb = IncomingThroughputInMb;
        /** @type {vos.MultipleGraphVisualObject} */
        this.OutgoingBandWidth = OutgoingBandWidth;
        /** @type {vos.PerformanceScreenPotentialProtectionGroup[]} */
        this.PotentialVpgs = PotentialVpgs;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {string} [Description] {@link string}
     * @param {string} [DisplayName] {@link string}
     * @param {boolean} [IsDefault] {@link boolean}
     * @param {boolean} [NeedsManage] {@link boolean}
     * @param {vos.ServiceProfileIdentifier} [ServiceProfileIdentifier] {@link vos.ServiceProfileIdentifier}
     * @constructor
     */
    vos.PortalServiceProfileVisualObject = function(Description, DisplayName, IsDefault, NeedsManage, ServiceProfileIdentifier){
        /** @type {string} */
        this.Description = Description;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {boolean} */
        this.IsDefault = IsDefault;
        /** @type {boolean} */
        this.NeedsManage = NeedsManage;
        /** @type {vos.ServiceProfileIdentifier} */
        this.ServiceProfileIdentifier = ServiceProfileIdentifier;
    };
    /**
     * @param {vos.DatastoreVisualObject} [Datastore] {@link vos.DatastoreVisualObject}
     * @param {boolean} [IsEnabled] {@link boolean}
     * @constructor
     */
    vos.PotentialDatastoreVisualObject = function(Datastore, IsEnabled){
        /** @type {vos.DatastoreVisualObject} */
        this.Datastore = Datastore;
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
    };
    /**
     * @param {vos.VirtualVdcOrgNetworkVisualObject[]} [PotentialRecoveryNetworks] {@link vos.VirtualVdcOrgNetworkVisualObject[]}
     * @param {vos.VirtualVdcOrgNetworkVisualObject[]} [PotentialReverseTestNetworks] {@link vos.VirtualVdcOrgNetworkVisualObject[]}
     * @constructor
     */
    vos.PotentialOrgVdcNetworksForMappingVisualObject = function(PotentialRecoveryNetworks, PotentialReverseTestNetworks){
        /** @type {vos.VirtualVdcOrgNetworkVisualObject[]} */
        this.PotentialRecoveryNetworks = PotentialRecoveryNetworks;
        /** @type {vos.VirtualVdcOrgNetworkVisualObject[]} */
        this.PotentialReverseTestNetworks = PotentialReverseTestNetworks;
    };
    /**
     * @param {boolean} [IsConnected] {@link boolean}
     * @param {boolean} [IsCustomerSite] {@link boolean}
     * @param {boolean} [IsVCDEnabled] {@link boolean}
     * @param {vos.OwnersIdVisualObject} [OwnersId] {@link vos.OwnersIdVisualObject}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {enums.VpgEntityType} [VirtualizationProviderType] {@link enums.VpgEntityType}
     * @constructor
     */
    vos.PotentialPortalReplicationSiteInitialInfo = function(IsConnected, IsCustomerSite, IsVCDEnabled, OwnersId, SiteId, VirtualizationProviderType){
        /** @type {boolean} */
        this.IsConnected = IsConnected;
        /** @type {boolean} */
        this.IsCustomerSite = IsCustomerSite;
        /** @type {boolean} */
        this.IsVCDEnabled = IsVCDEnabled;
        /** @type {vos.OwnersIdVisualObject} */
        this.OwnersId = OwnersId;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {enums.VpgEntityType} */
        this.VirtualizationProviderType = VirtualizationProviderType;
    };
    /**
     * @param {boolean} [IsConnected] {@link boolean}
     * @param {boolean} [IsVCDEnabled] {@link boolean}
     * @param {boolean} [IsVCenterEnabled] {@link boolean}
     * @param {vos.OwnersIdVisualObject} [OwnersId] {@link vos.OwnersIdVisualObject}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {enums.VpgEntityType} [VirtualizationProviderType] {@link enums.VpgEntityType}
     * @constructor
     */
    vos.PotentialReplicationSiteInitialInfo = function(IsConnected, IsVCDEnabled, IsVCenterEnabled, OwnersId, SiteId, VirtualizationProviderType){
        /** @type {boolean} */
        this.IsConnected = IsConnected;
        /** @type {boolean} */
        this.IsVCDEnabled = IsVCDEnabled;
        /** @type {boolean} */
        this.IsVCenterEnabled = IsVCenterEnabled;
        /** @type {vos.OwnersIdVisualObject} */
        this.OwnersId = OwnersId;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {enums.VpgEntityType} */
        this.VirtualizationProviderType = VirtualizationProviderType;
    };
    /**
     * @param {boolean} [IsConnected] {@link boolean}
     * @param {boolean} [IsPrePostScriptsEnabled] {@link boolean}
     * @param {vos.OwnersIdVisualObject} [OwnersId] {@link vos.OwnersIdVisualObject}
     * @param {vos.BackupTargetVisualObject[]} [PotentialBackupTargets] {@link vos.BackupTargetVisualObject[]}
     * @param {vos.CloudInstanceTypeVisualObject[]} [PotentialPublicCloudInstanceTypeVisualObjects] {@link vos.CloudInstanceTypeVisualObject[]}
     * @param {vos.CloudPotentialPcnsListObject} [PotentialPublicCloudPcns] {@link vos.CloudPotentialPcnsListObject}
     * @param {vos.RecoveryDestinationVisualObject[]} [PotentialReplicationDestinations] {@link vos.RecoveryDestinationVisualObject[]}
     * @param {vos.PotentialReplicationSiteInitialInfo} [PotentialReplicationSiteInitialInfo] {@link vos.PotentialReplicationSiteInitialInfo}
     * @param {vos.PotentialServiceProfileVisualObject[]} [PotentialServiceProfiles] {@link vos.PotentialServiceProfileVisualObject[]}
     * @param {vos.RecoveryVirtualDatacenter[]} [VCDVirtualDatacenters] {@link vos.RecoveryVirtualDatacenter[]}
     * @constructor
     */
    vos.PotentialReplicationTargetSite = function(IsConnected, IsPrePostScriptsEnabled, OwnersId, PotentialBackupTargets, PotentialPublicCloudInstanceTypeVisualObjects, PotentialPublicCloudPcns, PotentialReplicationDestinations, PotentialReplicationSiteInitialInfo, PotentialServiceProfiles, VCDVirtualDatacenters){
        /** @type {boolean} */
        this.IsConnected = IsConnected;
        /** @type {boolean} */
        this.IsPrePostScriptsEnabled = IsPrePostScriptsEnabled;
        /** @type {vos.OwnersIdVisualObject} */
        this.OwnersId = OwnersId;
        /** @type {vos.BackupTargetVisualObject[]} */
        this.PotentialBackupTargets = PotentialBackupTargets;
        /** @type {vos.CloudInstanceTypeVisualObject[]} */
        this.PotentialPublicCloudInstanceTypeVisualObjects = PotentialPublicCloudInstanceTypeVisualObjects;
        /** @type {vos.CloudPotentialPcnsListObject} */
        this.PotentialPublicCloudPcns = PotentialPublicCloudPcns;
        /** @type {vos.RecoveryDestinationVisualObject[]} */
        this.PotentialReplicationDestinations = PotentialReplicationDestinations;
        /** @type {vos.PotentialReplicationSiteInitialInfo} */
        this.PotentialReplicationSiteInitialInfo = PotentialReplicationSiteInitialInfo;
        /** @type {vos.PotentialServiceProfileVisualObject[]} */
        this.PotentialServiceProfiles = PotentialServiceProfiles;
        /** @type {vos.RecoveryVirtualDatacenter[]} */
        this.VCDVirtualDatacenters = VCDVirtualDatacenters;
    };
    /**
     * @param {vos.ComputeResourceVisualObject[]} [PotentialComputeResources] {@link vos.ComputeResourceVisualObject[]}
     * @param {vos.VirtualDatacenterVisualObject[]} [PotentialOrgVdc] {@link vos.VirtualDatacenterVisualObject[]}
     * @constructor
     */
    vos.PotentialRestoreMainEntities = function(PotentialComputeResources, PotentialOrgVdc){
        /** @type {vos.ComputeResourceVisualObject[]} */
        this.PotentialComputeResources = PotentialComputeResources;
        /** @type {vos.VirtualDatacenterVisualObject[]} */
        this.PotentialOrgVdc = PotentialOrgVdc;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.ProtectionGroupIdentifier[]} [Identifiers] {@link vos.ProtectionGroupIdentifier[]}
     * @param {boolean} [IsExists] {@link boolean}
     * @constructor
     */
    vos.PotentialRestoreSourceProtectionGroup = function(DisplayName, Identifiers, IsExists){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.ProtectionGroupIdentifier[]} */
        this.Identifiers = Identifiers;
        /** @type {boolean} */
        this.IsExists = IsExists;
    };
    /**
     * @param {vos.BackupTargetIdentifier} [BackupTargetIdentifier] {@link vos.BackupTargetIdentifier}
     * @param {string} [DisplayName] {@link string}
     * @param {vos.SiteIdentifier} [SiteIdentifier] {@link vos.SiteIdentifier}
     * @constructor
     */
    vos.PotentialRestoreSourceRepository = function(BackupTargetIdentifier, DisplayName, SiteIdentifier){
        /** @type {vos.BackupTargetIdentifier} */
        this.BackupTargetIdentifier = BackupTargetIdentifier;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.SiteIdentifier} */
        this.SiteIdentifier = SiteIdentifier;
    };
    /**
     * @param {vos.PotentialRestoreSourceProtectionGroup[]} [PotentialProtectionGroups] {@link vos.PotentialRestoreSourceProtectionGroup[]}
     * @param {vos.PotentialRestoreSourceRepository[]} [PotentialRepositories] {@link vos.PotentialRestoreSourceRepository[]}
     * @constructor
     */
    vos.PotentialRestoreSourcesScreenVisualObject = function(PotentialProtectionGroups, PotentialRepositories){
        /** @type {vos.PotentialRestoreSourceProtectionGroup[]} */
        this.PotentialProtectionGroups = PotentialProtectionGroups;
        /** @type {vos.PotentialRestoreSourceRepository[]} */
        this.PotentialRepositories = PotentialRepositories;
    };
    /**
     * @param {enums.RestoreType} [RestoreType] {@link enums.RestoreType}
     * @constructor
     */
    vos.PotentialRestoreType = function(RestoreType){
        /** @type {enums.RestoreType} */
        this.RestoreType = RestoreType;
    };
    /**
     * @param {vos.BackupScheduledPeriodVisualObject} [BackupScheduledPeriod] {@link vos.BackupScheduledPeriodVisualObject}
     * @param {string} [Description] {@link string}
     * @param {vos.HistoryItemVisualObject} [History] {@link vos.HistoryItemVisualObject}
     * @param {vos.ServiceProfileIdentifier} [Identifier] {@link vos.ServiceProfileIdentifier}
     * @param {boolean} [IsEditable] {@link boolean}
     * @param {vos.MaxJournalSizeItemVisualObject} [MaxJournalSize] {@link vos.MaxJournalSizeItemVisualObject}
     * @param {string} [Name] {@link string}
     * @param {vos.RestorePointRangeVisualObject} [RestorePointRange] {@link vos.RestorePointRangeVisualObject}
     * @param {vos.RetentionPolicyVisualObject} [RetentionPolicy] {@link vos.RetentionPolicyVisualObject}
     * @param {vos.RpoItemVisualObject} [Rpo] {@link vos.RpoItemVisualObject}
     * @param {vos.TestIntervalItemVisualObject} [TestInterval] {@link vos.TestIntervalItemVisualObject}
     * @param {vos.JournalWarningThresholdItemVisualObject} [WarningThreshold] {@link vos.JournalWarningThresholdItemVisualObject}
     * @constructor
     */
    vos.PotentialServiceProfileVisualObject = function(BackupScheduledPeriod, Description, History, Identifier, IsEditable, MaxJournalSize, Name, RestorePointRange, RetentionPolicy, Rpo, TestInterval, WarningThreshold){
        /** @type {vos.BackupScheduledPeriodVisualObject} */
        this.BackupScheduledPeriod = BackupScheduledPeriod;
        /** @type {string} */
        this.Description = Description;
        /** @type {vos.HistoryItemVisualObject} */
        this.History = History;
        /** @type {vos.ServiceProfileIdentifier} */
        this.Identifier = Identifier;
        /** @type {boolean} */
        this.IsEditable = IsEditable;
        /** @type {vos.MaxJournalSizeItemVisualObject} */
        this.MaxJournalSize = MaxJournalSize;
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.RestorePointRangeVisualObject} */
        this.RestorePointRange = RestorePointRange;
        /** @type {vos.RetentionPolicyVisualObject} */
        this.RetentionPolicy = RetentionPolicy;
        /** @type {vos.RpoItemVisualObject} */
        this.Rpo = Rpo;
        /** @type {vos.TestIntervalItemVisualObject} */
        this.TestInterval = TestInterval;
        /** @type {vos.JournalWarningThresholdItemVisualObject} */
        this.WarningThreshold = WarningThreshold;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VMIdentifier} [Id] {@link vos.VMIdentifier}
     * @param {string} [ProtectedHostName] {@link string}
     * @param {vos.ProtectedVmVpgsInfoVisualObject} [ProtectedVmVpgsInfo] {@link vos.ProtectedVmVpgsInfoVisualObject}
     * @param {number} [SizeInMb] {@link number}
     * @constructor
     */
    vos.PotentialVirtualMachineToProtectVisualObject = function(DisplayName, Id, ProtectedHostName, ProtectedVmVpgsInfo, SizeInMb){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VMIdentifier} */
        this.Id = Id;
        /** @type {string} */
        this.ProtectedHostName = ProtectedHostName;
        /** @type {vos.ProtectedVmVpgsInfoVisualObject} */
        this.ProtectedVmVpgsInfo = ProtectedVmVpgsInfo;
        /** @type {number} */
        this.SizeInMb = SizeInMb;
    };
    /**
     * @param {vos.PreSeedVolumeFileVisualObject[]} [Files] {@link vos.PreSeedVolumeFileVisualObject[]}
     * @param {number} [OriginalDiskSizeInBytes] {@link number}
     * @param {string[]} [SubFolders] {@link string[]}
     * @constructor
     */
    vos.PreSeedFolderContentVisualObject = function(Files, OriginalDiskSizeInBytes, SubFolders){
        /** @type {vos.PreSeedVolumeFileVisualObject[]} */
        this.Files = Files;
        /** @type {number} */
        this.OriginalDiskSizeInBytes = OriginalDiskSizeInBytes;
        /** @type {string[]} */
        this.SubFolders = SubFolders;
    };
    /**
     * @param {vos.DatastoreIdentifier} [Datastore] {@link vos.DatastoreIdentifier}
     * @param {string} [DisabledReason] {@link string}
     * @param {string} [FileName] {@link string}
     * @param {number} [FileSizeInBytes] {@link number}
     * @param {boolean} [IsEnabled] {@link boolean}
     * @param {string} [VmdkFullPath] {@link string}
     * @constructor
     */
    vos.PreSeedVolumeFileVisualObject = function(Datastore, DisabledReason, FileName, FileSizeInBytes, IsEnabled, VmdkFullPath){
        /** @type {vos.DatastoreIdentifier} */
        this.Datastore = Datastore;
        /** @type {string} */
        this.DisabledReason = DisabledReason;
        /** @type {string} */
        this.FileName = FileName;
        /** @type {number} */
        this.FileSizeInBytes = FileSizeInBytes;
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
        /** @type {string} */
        this.VmdkFullPath = VmdkFullPath;
    };
    /**
     * @constructor
     */
    vos.ProtectedVCDVappVpgInfoVisualObject = function(){
    };
    /**
     * @constructor
     */
    vos.ProtectedVCDVappVpgsInfoVisualObject = function(){
    };
    /**
     * @param {number} [NumberOfVms] {@link number}
     * @param {string} [PeerSiteName] {@link string}
     * @param {enums.VpgEntityType} [PeerSiteVpgEntityType] {@link enums.VpgEntityType}
     * @param {enums.ProtectionGroupAlertStatus} [VpgAlertStatus] {@link enums.ProtectionGroupAlertStatus}
     * @param {enums.ProtectionGroupStateVisual} [VpgDirection] {@link enums.ProtectionGroupStateVisual}
     * @param {vos.ProtectionGroupIdentifier} [VpgIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [VpgName] {@link string}
     * @constructor
     */
    vos.ProtectedVirtualizationEntityVpgInfoVisualObject = function(NumberOfVms, PeerSiteName, PeerSiteVpgEntityType, VpgAlertStatus, VpgDirection, VpgIdentifier, VpgName){
        /** @type {number} */
        this.NumberOfVms = NumberOfVms;
        /** @type {string} */
        this.PeerSiteName = PeerSiteName;
        /** @type {enums.VpgEntityType} */
        this.PeerSiteVpgEntityType = PeerSiteVpgEntityType;
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.VpgAlertStatus = VpgAlertStatus;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.VpgDirection = VpgDirection;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.VpgIdentifier = VpgIdentifier;
        /** @type {string} */
        this.VpgName = VpgName;
    };
    /**
     * @param {number} [TotalNumberOfVpgs] {@link number}
     * @constructor
     */
    vos.ProtectedVirtualizationEntityVpgsInfoVisualObject = function(TotalNumberOfVpgs){
        /** @type {number} */
        this.TotalNumberOfVpgs = TotalNumberOfVpgs;
    };
    /**
     * @constructor
     */
    vos.ProtectedVmVpgInfoVisualObject = function(){
    };
    /**
     * @constructor
     */
    vos.ProtectedVmVpgsInfoVisualObject = function(){
    };
    /**
     * @constructor
     */
    vos.ProtectionGroupAlreadyExistsException = function(){
    };
    /**
     * @param {vos.CheckPoint} [EarliestCheckpoint] {@link vos.CheckPoint}
     * @param {vos.CheckPoint} [LatestCheckpoint] {@link vos.CheckPoint}
     * @constructor
     */
    vos.ProtectionGroupCheckpointsStats = function(EarliestCheckpoint, LatestCheckpoint){
        /** @type {vos.CheckPoint} */
        this.EarliestCheckpoint = EarliestCheckpoint;
        /** @type {vos.CheckPoint} */
        this.LatestCheckpoint = LatestCheckpoint;
    };
    /**
     * @param {date[]} [VpgCheckpointDates] {@link date[]}
     * @constructor
     */
    vos.ProtectionGroupCheckpointsSummary = function(VpgCheckpointDates){
        /** @type {date[]} */
        this.VpgCheckpointDates = VpgCheckpointDates;
    };
    /**
     * @constructor
     */
    vos.ProtectionGroupControllerException = function(){
    };
    /**
     * @param {string} [GroupGuid] {@link string}
     * @constructor
     */
    vos.ProtectionGroupIdentifier = function(GroupGuid){
        /** @type {string} */
        this.GroupGuid = GroupGuid;
    };
    /**
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupId] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [ProtectionGroupName] {@link string}
     * @param {number} [RPOActualToTargetHighestDiff] {@link number}
     * @param {number} [RPOActualToTargetHighestDiffIndex] {@link number}
     * @param {number} [RPOBreachTotalTimeInSec] {@link number}
     * @param {vos.ProtectionGroupSLAStatus[]} [SLAHistory] {@link vos.ProtectionGroupSLAStatus[]}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {string} [SiteName] {@link string}
     * @constructor
     */
    vos.ProtectionGroupSLABreachOverTimeVisual = function(ProtectionGroupId, ProtectionGroupName, RPOActualToTargetHighestDiff, RPOActualToTargetHighestDiffIndex, RPOBreachTotalTimeInSec, SLAHistory, SiteId, SiteName){
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupId = ProtectionGroupId;
        /** @type {string} */
        this.ProtectionGroupName = ProtectionGroupName;
        /** @type {number} */
        this.RPOActualToTargetHighestDiff = RPOActualToTargetHighestDiff;
        /** @type {number} */
        this.RPOActualToTargetHighestDiffIndex = RPOActualToTargetHighestDiffIndex;
        /** @type {number} */
        this.RPOBreachTotalTimeInSec = RPOBreachTotalTimeInSec;
        /** @type {vos.ProtectionGroupSLAStatus[]} */
        this.SLAHistory = SLAHistory;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {string} */
        this.SiteName = SiteName;
    };
    /**
     * @param {number} [ActualRPOInSec] {@link number}
     * @param {number} [TargetRPOInSec] {@link number}
     * @param {date} [TimeStamp] {@link date}
     * @constructor
     */
    vos.ProtectionGroupSLAStatus = function(ActualRPOInSec, TargetRPOInSec, TimeStamp){
        /** @type {number} */
        this.ActualRPOInSec = ActualRPOInSec;
        /** @type {number} */
        this.TargetRPOInSec = TargetRPOInSec;
        /** @type {date} */
        this.TimeStamp = TimeStamp;
    };
    /**
     * @param {number} [ActualRPOInSec] {@link number}
     * @param {number} [ActualRTOInSec] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupId] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [ProtectionGroupName] {@link string}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {string} [SiteName] {@link string}
     * @param {number} [TargetRPOInSec] {@link number}
     * @constructor
     */
    vos.ProtectionGroupSLAStatusVisual = function(ActualRPOInSec, ActualRTOInSec, ProtectionGroupId, ProtectionGroupName, SiteId, SiteName, TargetRPOInSec){
        /** @type {number} */
        this.ActualRPOInSec = ActualRPOInSec;
        /** @type {number} */
        this.ActualRTOInSec = ActualRTOInSec;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupId = ProtectionGroupId;
        /** @type {string} */
        this.ProtectionGroupName = ProtectionGroupName;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {number} */
        this.TargetRPOInSec = TargetRPOInSec;
    };
    /**
     * @param {string} [BannedReason] {@link string}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.ProtectionGroupSLABreachOverTimeVisual[]} [ProtectionGroupsSLABreachInfo] {@link vos.ProtectionGroupSLABreachOverTimeVisual[]}
     * @param {vos.RecoveryProtectionGroupsSLABreachOverTimeQueryCriterias} [QueryCriterias] {@link vos.RecoveryProtectionGroupsSLABreachOverTimeQueryCriterias}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.ProtectionGroupsSLABreachVisualObject = function(BannedReason, Details, ProtectionGroupsSLABreachInfo, QueryCriterias, State){
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.ProtectionGroupSLABreachOverTimeVisual[]} */
        this.ProtectionGroupsSLABreachInfo = ProtectionGroupsSLABreachInfo;
        /** @type {vos.RecoveryProtectionGroupsSLABreachOverTimeQueryCriterias} */
        this.QueryCriterias = QueryCriterias;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {string} [BannedReason] {@link string}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.RecoveryProtectionGroupsSLAQueryCriterias} [QueryCriterias] {@link vos.RecoveryProtectionGroupsSLAQueryCriterias}
     * @param {vos.ProtectionGroupSLAStatusVisual[]} [RecoveryPeerStatuses] {@link vos.ProtectionGroupSLAStatusVisual[]}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @param {date} [TimeStamp] {@link date}
     * @constructor
     */
    vos.ProtectionGroupsSLAVisualObject = function(BannedReason, Details, QueryCriterias, RecoveryPeerStatuses, State, TimeStamp){
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.RecoveryProtectionGroupsSLAQueryCriterias} */
        this.QueryCriterias = QueryCriterias;
        /** @type {vos.ProtectionGroupSLAStatusVisual[]} */
        this.RecoveryPeerStatuses = RecoveryPeerStatuses;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
        /** @type {date} */
        this.TimeStamp = TimeStamp;
    };
    /**
     * @param {string[]} [PeerSites] {@link string[]}
     * @param {vos.TimeCriteria} [TimeRange] {@link vos.TimeCriteria}
     * @constructor
     */
    vos.ProtectionStatusScreenQueryCriterias = function(PeerSites, TimeRange){
        /** @type {string[]} */
        this.PeerSites = PeerSites;
        /** @type {vos.TimeCriteria} */
        this.TimeRange = TimeRange;
    };
    /**
     * @param {number} [ConfiguredSizeInMB] {@link number}
     * @param {number} [ConfiguredVms] {@link number}
     * @param {number} [ProtectedSizeInMB] {@link number}
     * @param {number} [ProtectedVms] {@link number}
     * @param {date} [TimeStamp] {@link date}
     * @constructor
     */
    vos.ProtectionStatusTimeEntryVisualObject = function(ConfiguredSizeInMB, ConfiguredVms, ProtectedSizeInMB, ProtectedVms, TimeStamp){
        /** @type {number} */
        this.ConfiguredSizeInMB = ConfiguredSizeInMB;
        /** @type {number} */
        this.ConfiguredVms = ConfiguredVms;
        /** @type {number} */
        this.ProtectedSizeInMB = ProtectedSizeInMB;
        /** @type {number} */
        this.ProtectedVms = ProtectedVms;
        /** @type {date} */
        this.TimeStamp = TimeStamp;
    };
    /**
     * @param {string} [BannedReason] {@link string}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.ProtectionStatusTimeEntryVisualObject[]} [ProtectionStatusHistory] {@link vos.ProtectionStatusTimeEntryVisualObject[]}
     * @param {vos.ProtectionStatusScreenQueryCriterias} [QueryCriterias] {@link vos.ProtectionStatusScreenQueryCriterias}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.ProtectionStatusVisualObject = function(BannedReason, Details, ProtectionStatusHistory, QueryCriterias, State){
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.ProtectionStatusTimeEntryVisualObject[]} */
        this.ProtectionStatusHistory = ProtectionStatusHistory;
        /** @type {vos.ProtectionStatusScreenQueryCriterias} */
        this.QueryCriterias = QueryCriterias;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {vos.ProviderVirtualDatacenterSettingsVisualObject[]} [Current] {@link vos.ProviderVirtualDatacenterSettingsVisualObject[]}
     * @param {vos.ProviderVirtualDatacenterVisualObject[]} [Potential] {@link vos.ProviderVirtualDatacenterVisualObject[]}
     * @param {boolean} [UseOnly] {@link boolean}
     * @constructor
     */
    vos.ProviderVirtualDatacenterScreenVisualObject = function(Current, Potential, UseOnly){
        /** @type {vos.ProviderVirtualDatacenterSettingsVisualObject[]} */
        this.Current = Current;
        /** @type {vos.ProviderVirtualDatacenterVisualObject[]} */
        this.Potential = Potential;
        /** @type {boolean} */
        this.UseOnly = UseOnly;
    };
    /**
     * @param {vos.DatastoreSettingsVisualObject[]} [DatastoreSettings] {@link vos.DatastoreSettingsVisualObject[]}
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VCDProviderVirtualDatacenterIdentifier} [Id] {@link vos.VCDProviderVirtualDatacenterIdentifier}
     * @constructor
     */
    vos.ProviderVirtualDatacenterSettingsVisualObject = function(DatastoreSettings, DisplayName, Id){
        /** @type {vos.DatastoreSettingsVisualObject[]} */
        this.DatastoreSettings = DatastoreSettings;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VCDProviderVirtualDatacenterIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {vos.DatastoreVisualObject[]} [Datastores] {@link vos.DatastoreVisualObject[]}
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VCDProviderVirtualDatacenterIdentifier} [Id] {@link vos.VCDProviderVirtualDatacenterIdentifier}
     * @constructor
     */
    vos.ProviderVirtualDatacenterVisualObject = function(Datastores, DisplayName, Id){
        /** @type {vos.DatastoreVisualObject[]} */
        this.Datastores = Datastores;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VCDProviderVirtualDatacenterIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {string} [InstanceType] {@link string}
     * @constructor
     */
    vos.PublicCloudInstanceTypeIdentifier = function(InstanceType){
        /** @type {string} */
        this.InstanceType = InstanceType;
    };
    /**
     * @param {vos.PublicCloudInstanceTypeIdentifier} [PublicCloudInstanceTypeIdentifier] {@link vos.PublicCloudInstanceTypeIdentifier}
     * @constructor
     */
    vos.PublicCloudSiteSettings = function(PublicCloudInstanceTypeIdentifier){
        /** @type {vos.PublicCloudInstanceTypeIdentifier} */
        this.PublicCloudInstanceTypeIdentifier = PublicCloudInstanceTypeIdentifier;
    };
    /**
     * @param {vos.DeviceIdentifier} [Device] {@link vos.DeviceIdentifier}
     * @param {string} [DeviceName] {@link string}
     * @param {string} [DevicePath] {@link string}
     * @param {enums.VolumeMode} [Mode] {@link enums.VolumeMode}
     * @param {number} [SizeInKb] {@link number}
     * @param {number} [SizeInBytes] {@link number}
     * @constructor
     */
    vos.RawDeviceMappingVolumeReplicationDestination = function(Device, DeviceName, DevicePath, Mode, SizeInKb, SizeInBytes){
        /** @type {vos.DeviceIdentifier} */
        this.Device = Device;
        /** @type {string} */
        this.DeviceName = DeviceName;
        /** @type {string} */
        this.DevicePath = DevicePath;
        /** @type {enums.VolumeMode} */
        this.Mode = Mode;
        /** @type {number} */
        this.SizeInKb = SizeInKb;
        /** @type {number} */
        this.SizeInBytes = SizeInBytes;
    };
    /**
     * @param {vos.RecoveryRawDeviceVisualObject[]} [AssociatedRawDevices] {@link vos.RecoveryRawDeviceVisualObject[]}
     * @param {vos.PotentialDatastoreVisualObject[]} [Datastores] {@link vos.PotentialDatastoreVisualObject[]}
     * @param {vos.BaseComputeResourceIdentifier[]} [DescendantHosts] {@link vos.BaseComputeResourceIdentifier[]}
     * @param {vos.VirtualNetworkVisualObject[]} [Networks] {@link vos.VirtualNetworkVisualObject[]}
     * @param {vos.VmFolderVisualObject[]} [PotentialFolders] {@link vos.VmFolderVisualObject[]}
     * @constructor
     */
    vos.RecoveryComputeResourceAssociatedEntities = function(AssociatedRawDevices, Datastores, DescendantHosts, Networks, PotentialFolders){
        /** @type {vos.RecoveryRawDeviceVisualObject[]} */
        this.AssociatedRawDevices = AssociatedRawDevices;
        /** @type {vos.PotentialDatastoreVisualObject[]} */
        this.Datastores = Datastores;
        /** @type {vos.BaseComputeResourceIdentifier[]} */
        this.DescendantHosts = DescendantHosts;
        /** @type {vos.VirtualNetworkVisualObject[]} */
        this.Networks = Networks;
        /** @type {vos.VmFolderVisualObject[]} */
        this.PotentialFolders = PotentialFolders;
    };
    /**
     * @param {vos.ComputeResourceVisualObject} [ComputeResource] {@link vos.ComputeResourceVisualObject}
     * @param {boolean} [IsSuitableForRecovery] {@link boolean}
     * @param {string} [RecoveryImpossibleReason] {@link string}
     * @constructor
     */
    vos.RecoveryDestinationVisualObject = function(ComputeResource, IsSuitableForRecovery, RecoveryImpossibleReason){
        /** @type {vos.ComputeResourceVisualObject} */
        this.ComputeResource = ComputeResource;
        /** @type {boolean} */
        this.IsSuitableForRecovery = IsSuitableForRecovery;
        /** @type {string} */
        this.RecoveryImpossibleReason = RecoveryImpossibleReason;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.ExistingDiskVolumeReplicationDestination} [ReplicationDestination] {@link vos.ExistingDiskVolumeReplicationDestination}
     * @constructor
     */
    vos.RecoveryExistingDisk = function(DisplayName, ReplicationDestination){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.ExistingDiskVolumeReplicationDestination} */
        this.ReplicationDestination = ReplicationDestination;
    };
    /**
     * @param {number} [ConfiguredSizeInMB] {@link number}
     * @param {number} [ConfiguredVms] {@link number}
     * @param {number} [ProtectedSizeInMB] {@link number}
     * @param {number} [ProtectedVms] {@link number}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {string} [SiteName] {@link string}
     * @param {number} [UsedLogSizeInMB] {@link number}
     * @constructor
     */
    vos.RecoveryPeerStatusVisualObject = function(ConfiguredSizeInMB, ConfiguredVms, ProtectedSizeInMB, ProtectedVms, SiteId, SiteName, UsedLogSizeInMB){
        /** @type {number} */
        this.ConfiguredSizeInMB = ConfiguredSizeInMB;
        /** @type {number} */
        this.ConfiguredVms = ConfiguredVms;
        /** @type {number} */
        this.ProtectedSizeInMB = ProtectedSizeInMB;
        /** @type {number} */
        this.ProtectedVms = ProtectedVms;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {number} */
        this.UsedLogSizeInMB = UsedLogSizeInMB;
    };
    /**
     * @param {number} [ConfiguredSizeInMB] {@link number}
     * @param {number} [ConfiguredVms] {@link number}
     * @param {number} [ProtectedSizeInMB] {@link number}
     * @param {number} [ProtectedVms] {@link number}
     * @param {date} [TimeStamp] {@link date}
     * @param {number} [UsedLogSizeInMB] {@link number}
     * @constructor
     */
    vos.RecoveryPeerStatusWithTimeVisualObject = function(ConfiguredSizeInMB, ConfiguredVms, ProtectedSizeInMB, ProtectedVms, TimeStamp, UsedLogSizeInMB){
        /** @type {number} */
        this.ConfiguredSizeInMB = ConfiguredSizeInMB;
        /** @type {number} */
        this.ConfiguredVms = ConfiguredVms;
        /** @type {number} */
        this.ProtectedSizeInMB = ProtectedSizeInMB;
        /** @type {number} */
        this.ProtectedVms = ProtectedVms;
        /** @type {date} */
        this.TimeStamp = TimeStamp;
        /** @type {number} */
        this.UsedLogSizeInMB = UsedLogSizeInMB;
    };
    /**
     * @param {enums.RecoveryProtectionGroupsSLABreachSorting} [SortBy] {@link enums.RecoveryProtectionGroupsSLABreachSorting}
     * @param {vos.TimeCriteria} [TimeRange] {@link vos.TimeCriteria}
     * @param {number} [TopHowMany] {@link number}
     * @constructor
     */
    vos.RecoveryProtectionGroupsSLABreachOverTimeQueryCriterias = function(SortBy, TimeRange, TopHowMany){
        /** @type {enums.RecoveryProtectionGroupsSLABreachSorting} */
        this.SortBy = SortBy;
        /** @type {vos.TimeCriteria} */
        this.TimeRange = TimeRange;
        /** @type {number} */
        this.TopHowMany = TopHowMany;
    };
    /**
     * @param {enums.RecoveryProtectionGroupsSLASorting} [SortBy] {@link enums.RecoveryProtectionGroupsSLASorting}
     * @param {vos.TimeCriteria} [TimeRange] {@link vos.TimeCriteria}
     * @param {number} [TopHowMany] {@link number}
     * @constructor
     */
    vos.RecoveryProtectionGroupsSLAQueryCriterias = function(SortBy, TimeRange, TopHowMany){
        /** @type {enums.RecoveryProtectionGroupsSLASorting} */
        this.SortBy = SortBy;
        /** @type {vos.TimeCriteria} */
        this.TimeRange = TimeRange;
        /** @type {number} */
        this.TopHowMany = TopHowMany;
    };
    /**
     * @param {vos.RawDeviceMappingVolumeReplicationDestination} [Destination] {@link vos.RawDeviceMappingVolumeReplicationDestination}
     * @param {string} [DisplayName] {@link string}
     * @param {boolean} [IsEnabled] {@link boolean}
     * @constructor
     */
    vos.RecoveryRawDeviceVisualObject = function(Destination, DisplayName, IsEnabled){
        /** @type {vos.RawDeviceMappingVolumeReplicationDestination} */
        this.Destination = Destination;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
    };
    /**
     * @param {string[]} [ProtectionGroups] {@link string[]}
     * @param {vos.RecoveryResultVisualObject[]} [RecoveryResults] {@link vos.RecoveryResultVisualObject[]}
     * @param {string[]} [Statuses] {@link string[]}
     * @param {string[]} [Types] {@link string[]}
     * @constructor
     */
    vos.RecoveryReportVisualObject = function(ProtectionGroups, RecoveryResults, Statuses, Types){
        /** @type {string[]} */
        this.ProtectionGroups = ProtectionGroups;
        /** @type {vos.RecoveryResultVisualObject[]} */
        this.RecoveryResults = RecoveryResults;
        /** @type {string[]} */
        this.Statuses = Statuses;
        /** @type {string[]} */
        this.Types = Types;
    };
    /**
     * @param {string} [Id] {@link string}
     * @param {vos.SiteIdentifier} [RecoverySiteIdentifier] {@link vos.SiteIdentifier}
     * @constructor
     */
    vos.RecoveryResultIdVisualObject = function(Id, RecoverySiteIdentifier){
        /** @type {string} */
        this.Id = Id;
        /** @type {vos.SiteIdentifier} */
        this.RecoverySiteIdentifier = RecoverySiteIdentifier;
    };
    /**
     * @param {date} [Endtime] {@link date}
     * @param {vos.RecoveryResultIdVisualObject} [Id] {@link vos.RecoveryResultIdVisualObject}
     * @param {string} [InitiatedBy] {@link string}
     * @param {string} [ProtectedSiteName] {@link string}
     * @param {string} [ProtectionGroupDisplayName] {@link string}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupId] {@link vos.ProtectionGroupIdentifier}
     * @param {number} [RTOMeasuredInSec] {@link number}
     * @param {string} [RecoverySiteName] {@link string}
     * @param {date} [StartTime] {@link date}
     * @param {enums.RecoveryOperationStatus} [Status] {@link enums.RecoveryOperationStatus}
     * @param {string} [Summary] {@link string}
     * @param {enums.RecoveryType} [Type] {@link enums.RecoveryType}
     * @constructor
     */
    vos.RecoveryResultVisualObject = function(Endtime, Id, InitiatedBy, ProtectedSiteName, ProtectionGroupDisplayName, ProtectionGroupId, RTOMeasuredInSec, RecoverySiteName, StartTime, Status, Summary, Type){
        /** @type {date} */
        this.Endtime = Endtime;
        /** @type {vos.RecoveryResultIdVisualObject} */
        this.Id = Id;
        /** @type {string} */
        this.InitiatedBy = InitiatedBy;
        /** @type {string} */
        this.ProtectedSiteName = ProtectedSiteName;
        /** @type {string} */
        this.ProtectionGroupDisplayName = ProtectionGroupDisplayName;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupId = ProtectionGroupId;
        /** @type {number} */
        this.RTOMeasuredInSec = RTOMeasuredInSec;
        /** @type {string} */
        this.RecoverySiteName = RecoverySiteName;
        /** @type {date} */
        this.StartTime = StartTime;
        /** @type {enums.RecoveryOperationStatus} */
        this.Status = Status;
        /** @type {string} */
        this.Summary = Summary;
        /** @type {enums.RecoveryType} */
        this.Type = Type;
    };
    /**
     * @param {string[]} [PeerSites] {@link string[]}
     * @param {enums.Resolution} [Resolution] {@link enums.Resolution}
     * @param {vos.TimeCriteria} [TimeRange] {@link vos.TimeCriteria}
     * @constructor
     */
    vos.RecoveryStatusOverTimeQueryCriterias = function(PeerSites, Resolution, TimeRange){
        /** @type {string[]} */
        this.PeerSites = PeerSites;
        /** @type {enums.Resolution} */
        this.Resolution = Resolution;
        /** @type {vos.TimeCriteria} */
        this.TimeRange = TimeRange;
    };
    /**
     * @param {string} [BannedReason] {@link string}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.RecoveryStatusOverTimeQueryCriterias} [QueryCriterias] {@link vos.RecoveryStatusOverTimeQueryCriterias}
     * @param {vos.PeerRecoveryStatusOverTime[]} [RecoveryStatusPerPeer] {@link vos.PeerRecoveryStatusOverTime[]}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.RecoveryStatusOverTimeVisualObject = function(BannedReason, Details, QueryCriterias, RecoveryStatusPerPeer, State){
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.RecoveryStatusOverTimeQueryCriterias} */
        this.QueryCriterias = QueryCriterias;
        /** @type {vos.PeerRecoveryStatusOverTime[]} */
        this.RecoveryStatusPerPeer = RecoveryStatusPerPeer;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {vos.TimeCriteria} [TimeRange] {@link vos.TimeCriteria}
     * @param {number} [TopHowMany] {@link number}
     * @constructor
     */
    vos.RecoveryStatusSpecificDayQueryCriterias = function(TimeRange, TopHowMany){
        /** @type {vos.TimeCriteria} */
        this.TimeRange = TimeRange;
        /** @type {number} */
        this.TopHowMany = TopHowMany;
    };
    /**
     * @param {string} [BannedReason] {@link string}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.RecoveryStatusSpecificDayQueryCriterias} [QueryCriterias] {@link vos.RecoveryStatusSpecificDayQueryCriterias}
     * @param {vos.RecoveryStatusTimeEntryVisualObject} [RecoveryStatus] {@link vos.RecoveryStatusTimeEntryVisualObject}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.RecoveryStatusSpecificDayVisualObject = function(BannedReason, Details, QueryCriterias, RecoveryStatus, State){
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.RecoveryStatusSpecificDayQueryCriterias} */
        this.QueryCriterias = QueryCriterias;
        /** @type {vos.RecoveryStatusTimeEntryVisualObject} */
        this.RecoveryStatus = RecoveryStatus;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {vos.RecoveryPeerStatusVisualObject[]} [RecoveryPeerStatuses] {@link vos.RecoveryPeerStatusVisualObject[]}
     * @param {date} [TimeStamp] {@link date}
     * @constructor
     */
    vos.RecoveryStatusTimeEntryVisualObject = function(RecoveryPeerStatuses, TimeStamp){
        /** @type {vos.RecoveryPeerStatusVisualObject[]} */
        this.RecoveryPeerStatuses = RecoveryPeerStatuses;
        /** @type {date} */
        this.TimeStamp = TimeStamp;
    };
    /**
     * @param {boolean} [IsThinProvision] {@link boolean}
     * @param {vos.VCDVAppNetworkInfo[]} [PotentialVCDVappNetworks] {@link vos.VCDVAppNetworkInfo[]}
     * @param {vos.VirtualDatacenterVisualObject} [VirtualDatacenter] {@link vos.VirtualDatacenterVisualObject}
     * @constructor
     */
    vos.RecoveryVirtualDatacenter = function(IsThinProvision, PotentialVCDVappNetworks, VirtualDatacenter){
        /** @type {boolean} */
        this.IsThinProvision = IsThinProvision;
        /** @type {vos.VCDVAppNetworkInfo[]} */
        this.PotentialVCDVappNetworks = PotentialVCDVappNetworks;
        /** @type {vos.VirtualDatacenterVisualObject} */
        this.VirtualDatacenter = VirtualDatacenter;
    };
    /**
     * @param {date} [EarliestAvailableDate] {@link date}
     * @param {date} [LatestAvailableDate] {@link date}
     * @constructor
     */
    vos.ReportPreQueryInfo = function(EarliestAvailableDate, LatestAvailableDate){
        /** @type {date} */
        this.EarliestAvailableDate = EarliestAvailableDate;
        /** @type {date} */
        this.LatestAvailableDate = LatestAvailableDate;
    };
    /**
     * @param {string} [InternalName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.ResourcePoolIdentifier = function(InternalName, ServerIdentifier){
        /** @type {string} */
        this.InternalName = InternalName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.ResourcePoolIdentifier} [Id] {@link vos.ResourcePoolIdentifier}
     * @constructor
     */
    vos.ResourcePoolVisualObject = function(DisplayName, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.ResourcePoolIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {enums.ResourcesReportSettings_SamplingResolution} [Resolution] {@link enums.ResourcesReportSettings_SamplingResolution}
     * @param {number} [TimeOfDayInMinutes] {@link number}
     * @constructor
     */
    vos.ResourcesReportSettings = function(Resolution, TimeOfDayInMinutes){
        /** @type {enums.ResourcesReportSettings_SamplingResolution} */
        this.Resolution = Resolution;
        /** @type {number} */
        this.TimeOfDayInMinutes = TimeOfDayInMinutes;
    };
    /**
     * @param {vos.BackupJobIdentifier} [BackupJobIdentifier] {@link vos.BackupJobIdentifier}
     * @param {vos.BackupTargetIdentifier} [BackupTargetIdentifier] {@link vos.BackupTargetIdentifier}
     * @param {vos.RestoreConfigurationVisualObject} [Configuration] {@link vos.RestoreConfigurationVisualObject}
     * @param {vos.RestoreConfigurationVisualObject} [PopulatedConfiguration] {@link vos.RestoreConfigurationVisualObject}
     * @param {vos.PotentialRestoreMainEntities} [PotentialRestoreMainEntities] {@link vos.PotentialRestoreMainEntities}
     * @param {vos.SiteIdentifier} [SiteIdentifier] {@link vos.SiteIdentifier}
     * @param {enums.RestoreType} [Type] {@link enums.RestoreType}
     * @constructor
     */
    vos.RestoreConfigurationScreenVisualObject = function(BackupJobIdentifier, BackupTargetIdentifier, Configuration, PopulatedConfiguration, PotentialRestoreMainEntities, SiteIdentifier, Type){
        /** @type {vos.BackupJobIdentifier} */
        this.BackupJobIdentifier = BackupJobIdentifier;
        /** @type {vos.BackupTargetIdentifier} */
        this.BackupTargetIdentifier = BackupTargetIdentifier;
        /** @type {vos.RestoreConfigurationVisualObject} */
        this.Configuration = Configuration;
        /** @type {vos.RestoreConfigurationVisualObject} */
        this.PopulatedConfiguration = PopulatedConfiguration;
        /** @type {vos.PotentialRestoreMainEntities} */
        this.PotentialRestoreMainEntities = PotentialRestoreMainEntities;
        /** @type {vos.SiteIdentifier} */
        this.SiteIdentifier = SiteIdentifier;
        /** @type {enums.RestoreType} */
        this.Type = Type;
    };
    /**
     * @param {vos.VirtualDatacenterVisualObject} [SelectedOrgVdc] {@link vos.VirtualDatacenterVisualObject}
     * @param {vos.VmRestoreConfigurationVisualObject[]} [VirtualMachines] {@link vos.VmRestoreConfigurationVisualObject[]}
     * @constructor
     */
    vos.RestoreConfigurationVisualObject = function(SelectedOrgVdc, VirtualMachines){
        /** @type {vos.VirtualDatacenterVisualObject} */
        this.SelectedOrgVdc = SelectedOrgVdc;
        /** @type {vos.VmRestoreConfigurationVisualObject[]} */
        this.VirtualMachines = VirtualMachines;
    };
    /**
     * @param {string} [DnsSuffix] {@link string}
     * @param {string} [Gateway] {@link string}
     * @param {string} [IP] {@link string}
     * @param {string} [PrimaryDns] {@link string}
     * @param {string} [SecondaryDns] {@link string}
     * @param {string} [SubnetMask] {@link string}
     * @param {enums.RestoreIpType} [Type] {@link enums.RestoreIpType}
     * @constructor
     */
    vos.RestoreIpConfiguration = function(DnsSuffix, Gateway, IP, PrimaryDns, SecondaryDns, SubnetMask, Type){
        /** @type {string} */
        this.DnsSuffix = DnsSuffix;
        /** @type {string} */
        this.Gateway = Gateway;
        /** @type {string} */
        this.IP = IP;
        /** @type {string} */
        this.PrimaryDns = PrimaryDns;
        /** @type {string} */
        this.SecondaryDns = SecondaryDns;
        /** @type {string} */
        this.SubnetMask = SubnetMask;
        /** @type {enums.RestoreIpType} */
        this.Type = Type;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {enums.RestorePointRangeType} [RestorePointRange] {@link enums.RestorePointRangeType}
     * @constructor
     */
    vos.RestorePointRangeVisualObject = function(DisplayName, RestorePointRange){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {enums.RestorePointRangeType} */
        this.RestorePointRange = RestorePointRange;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VpgBackupInstanceDetails[]} [Instances] {@link vos.VpgBackupInstanceDetails[]}
     * @constructor
     */
    vos.RestoreSelectionScreenVisualObject = function(DisplayName, Instances){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VpgBackupInstanceDetails[]} */
        this.Instances = Instances;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum} [RetentionPolicy] {@link enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum}
     * @constructor
     */
    vos.RetentionPolicyVisualObject = function(DisplayName, RetentionPolicy){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum} */
        this.RetentionPolicy = RetentionPolicy;
    };
    /**
     * @param {boolean} [IsComplete] {@link boolean}
     * @param {vos.ManageVPGInfoVisualObject} [ManageVpgInfo] {@link vos.ManageVPGInfoVisualObject}
     * @param {boolean} [ShouldDefineJournalDatastoreLocation] {@link boolean}
     * @constructor
     */
    vos.ReverseSettingsManageInfoVisualObject = function(IsComplete, ManageVpgInfo, ShouldDefineJournalDatastoreLocation){
        /** @type {boolean} */
        this.IsComplete = IsComplete;
        /** @type {vos.ManageVPGInfoVisualObject} */
        this.ManageVpgInfo = ManageVpgInfo;
        /** @type {boolean} */
        this.ShouldDefineJournalDatastoreLocation = ShouldDefineJournalDatastoreLocation;
    };
    /**
     * @param {boolean} [IsEnabled] {@link boolean}
     * @constructor
     */
    vos.RolesAndPermissionsSettings = function(IsEnabled){
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
    };
    /**
     * @param {string} [Guid] {@link string}
     * @constructor
     */
    vos.RouteGroupIdentifier = function(Guid){
        /** @type {string} */
        this.Guid = Guid;
    };
    /**
     * @param {boolean} [Editable] {@link boolean}
     * @param {string} [Name] {@link string}
     * @param {vos.RouteGroupIdentifier} [RouteGroupIdentifier] {@link vos.RouteGroupIdentifier}
     * @param {vos.StaticRouteVisualObject[]} [StaticRoutes] {@link vos.StaticRouteVisualObject[]}
     * @constructor
     */
    vos.RouteGroupVisualObject = function(Editable, Name, RouteGroupIdentifier, StaticRoutes){
        /** @type {boolean} */
        this.Editable = Editable;
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.RouteGroupIdentifier} */
        this.RouteGroupIdentifier = RouteGroupIdentifier;
        /** @type {vos.StaticRouteVisualObject[]} */
        this.StaticRoutes = StaticRoutes;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {number} [RpoInSeconds] {@link number}
     * @constructor
     */
    vos.RpoItemVisualObject = function(DisplayName, RpoInSeconds){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {number} */
        this.RpoInSeconds = RpoInSeconds;
    };
    /**
     * @param {vos.SingleScriptVisualObject} [PostRecoveryScript] {@link vos.SingleScriptVisualObject}
     * @param {vos.SingleScriptVisualObject} [PreRecoveryScript] {@link vos.SingleScriptVisualObject}
     * @param {boolean} [UseScripts] {@link boolean}
     * @constructor
     */
    vos.ScriptingSettingsVisualObject = function(PostRecoveryScript, PreRecoveryScript, UseScripts){
        /** @type {vos.SingleScriptVisualObject} */
        this.PostRecoveryScript = PostRecoveryScript;
        /** @type {vos.SingleScriptVisualObject} */
        this.PreRecoveryScript = PreRecoveryScript;
        /** @type {boolean} */
        this.UseScripts = UseScripts;
    };
    /**
     * @param {string} [Identifier] {@link string}
     * @constructor
     */
    vos.SecurityGroupIdentifier = function(Identifier){
        /** @type {string} */
        this.Identifier = Identifier;
    };
    /**
     * @param {string} [Name] {@link string}
     * @param {vos.ServiceProfileIdentifier} [SelectedIdentifier] {@link vos.ServiceProfileIdentifier}
     * @constructor
     */
    vos.SelectedServiceProfileVisualObject = function(Name, SelectedIdentifier){
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.ServiceProfileIdentifier} */
        this.SelectedIdentifier = SelectedIdentifier;
    };
    /**
     * @param {string} [ServerGuid] {@link string}
     * @constructor
     */
    vos.ServerIdentifier = function(ServerGuid){
        /** @type {string} */
        this.ServerGuid = ServerGuid;
    };
    /**
     * @param {string} [InternalId] {@link string}
     * @constructor
     */
    vos.ServiceProfileIdentifier = function(InternalId){
        /** @type {string} */
        this.InternalId = InternalId;
    };
    /**
     * @param {string} [InternalIdentifier] {@link string}
     * @constructor
     */
    vos.SessionIdentifier = function(InternalIdentifier){
        /** @type {string} */
        this.InternalIdentifier = InternalIdentifier;
    };
    /**
     * @param {vos.SinglePerformanceValue[]} [Values] {@link vos.SinglePerformanceValue[]}
     * @param {string} [ValuesAsCsv] {@link string}
     * @constructor
     */
    vos.SingleGraphVisualObject = function(Values, ValuesAsCsv){
        /** @type {vos.SinglePerformanceValue[]} */
        this.Values = Values;
        /** @type {string} */
        this.ValuesAsCsv = ValuesAsCsv;
    };
    /**
     * @param {date} [Time] {@link date}
     * @param {number} [Value] {@link number}
     * @constructor
     */
    vos.SinglePerformanceValue = function(Time, Value){
        /** @type {date} */
        this.Time = Time;
        /** @type {number} */
        this.Value = Value;
    };
    /**
     * @param {string} [Command] {@link string}
     * @param {string} [Parameters] {@link string}
     * @param {number} [TimeoutInSeconds] {@link number}
     * @constructor
     */
    vos.SingleScriptVisualObject = function(Command, Parameters, TimeoutInSeconds){
        /** @type {string} */
        this.Command = Command;
        /** @type {string} */
        this.Parameters = Parameters;
        /** @type {number} */
        this.TimeoutInSeconds = TimeoutInSeconds;
    };
    /**
     * @param {string} [Hostname] {@link string}
     * @param {number} [Port] {@link number}
     * @constructor
     */
    vos.SiteConnectionParameters = function(Hostname, Port){
        /** @type {string} */
        this.Hostname = Hostname;
        /** @type {number} */
        this.Port = Port;
    };
    /**
     * @param {vos.AlertVisualObject[]} [Alerts] {@link vos.AlertVisualObject[]}
     * @param {vos.HostDetailsForVpgTopologyVisualObject[]} [Hosts] {@link vos.HostDetailsForVpgTopologyVisualObject[]}
     * @param {boolean} [IsConnected] {@link boolean}
     * @param {string} [SiteIp] {@link string}
     * @param {string} [SiteLocation] {@link string}
     * @param {string} [SiteName] {@link string}
     * @param {vos.KeyValueOfHostIdentifierbooleanww0JcJIL[]} [SiteToHostConnectivity] {@link vos.KeyValueOfHostIdentifierbooleanww0JcJIL[]}
     * @param {vos.ZertoOrganizationIdentifier} [Zorg] {@link vos.ZertoOrganizationIdentifier}
     * @constructor
     */
    vos.SiteDetailsForVpgTopologyVisualObject = function(Alerts, Hosts, IsConnected, SiteIp, SiteLocation, SiteName, SiteToHostConnectivity, Zorg){
        /** @type {vos.AlertVisualObject[]} */
        this.Alerts = Alerts;
        /** @type {vos.HostDetailsForVpgTopologyVisualObject[]} */
        this.Hosts = Hosts;
        /** @type {boolean} */
        this.IsConnected = IsConnected;
        /** @type {string} */
        this.SiteIp = SiteIp;
        /** @type {string} */
        this.SiteLocation = SiteLocation;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {vos.KeyValueOfHostIdentifierbooleanww0JcJIL[]} */
        this.SiteToHostConnectivity = SiteToHostConnectivity;
        /** @type {vos.ZertoOrganizationIdentifier} */
        this.Zorg = Zorg;
    };
    /**
     * @param {string} [BucketName] {@link string}
     * @param {string} [ContactEmail] {@link string}
     * @param {string} [ContactInfo] {@link string}
     * @param {string} [ContactPhone] {@link string}
     * @param {string} [CurrentLocalTime] {@link string}
     * @param {string} [IpAddress] {@link string}
     * @param {enums.SiteLicenseType} [LicenseType] {@link enums.SiteLicenseType}
     * @param {string} [Location] {@link string}
     * @param {vos.ServerIdentifier} [ServerId] {@link vos.ServerIdentifier}
     * @param {string} [SiteName] {@link string}
     * @param {string} [SiteVersion] {@link string}
     * @param {string} [VCenterName] {@link string}
     * @constructor
     */
    vos.SiteDetailsVisualObject = function(BucketName, ContactEmail, ContactInfo, ContactPhone, CurrentLocalTime, IpAddress, LicenseType, Location, ServerId, SiteName, SiteVersion, VCenterName){
        /** @type {string} */
        this.BucketName = BucketName;
        /** @type {string} */
        this.ContactEmail = ContactEmail;
        /** @type {string} */
        this.ContactInfo = ContactInfo;
        /** @type {string} */
        this.ContactPhone = ContactPhone;
        /** @type {string} */
        this.CurrentLocalTime = CurrentLocalTime;
        /** @type {string} */
        this.IpAddress = IpAddress;
        /** @type {enums.SiteLicenseType} */
        this.LicenseType = LicenseType;
        /** @type {string} */
        this.Location = Location;
        /** @type {vos.ServerIdentifier} */
        this.ServerId = ServerId;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {string} */
        this.SiteVersion = SiteVersion;
        /** @type {string} */
        this.VCenterName = VCenterName;
    };
    /**
     * @param {string} [SiteGuid] {@link string}
     * @constructor
     */
    vos.SiteIdentifier = function(SiteGuid){
        /** @type {string} */
        this.SiteGuid = SiteGuid;
    };
    /**
     * @param {vos.CloudSiteSettingsVisualObject} [CloudSiteSettings] {@link vos.CloudSiteSettingsVisualObject}
     * @param {string} [ContactEmail] {@link string}
     * @param {string} [ContactInfo] {@link string}
     * @param {string} [ContactPhone] {@link string}
     * @param {string} [ExternalIp] {@link string}
     * @param {string} [Location] {@link string}
     * @param {string} [SiteName] {@link string}
     * @constructor
     */
    vos.SiteManagementDetailsVisualObject = function(CloudSiteSettings, ContactEmail, ContactInfo, ContactPhone, ExternalIp, Location, SiteName){
        /** @type {vos.CloudSiteSettingsVisualObject} */
        this.CloudSiteSettings = CloudSiteSettings;
        /** @type {string} */
        this.ContactEmail = ContactEmail;
        /** @type {string} */
        this.ContactInfo = ContactInfo;
        /** @type {string} */
        this.ContactPhone = ContactPhone;
        /** @type {string} */
        this.ExternalIp = ExternalIp;
        /** @type {string} */
        this.Location = Location;
        /** @type {string} */
        this.SiteName = SiteName;
    };
    /**
     * @param {string} [HostName] {@link string}
     * @param {string} [Location] {@link string}
     * @param {number} [Port] {@link number}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {string} [SiteName] {@link string}
     * @param {enums.PairingVisualStatus} [Status] {@link enums.PairingVisualStatus}
     * @constructor
     */
    vos.SitePairingScreenItem = function(HostName, Location, Port, SiteId, SiteName, Status){
        /** @type {string} */
        this.HostName = HostName;
        /** @type {string} */
        this.Location = Location;
        /** @type {number} */
        this.Port = Port;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {enums.PairingVisualStatus} */
        this.Status = Status;
    };
    /**
     * @param {number} [DefaultPortNumber] {@link number}
     * @param {number} [MaxAllowedPairs] {@link number}
     * @param {vos.SitePairingScreenItem[]} [Peers] {@link vos.SitePairingScreenItem[]}
     * @constructor
     */
    vos.SitePairingScreenVisualObject = function(DefaultPortNumber, MaxAllowedPairs, Peers){
        /** @type {number} */
        this.DefaultPortNumber = DefaultPortNumber;
        /** @type {number} */
        this.MaxAllowedPairs = MaxAllowedPairs;
        /** @type {vos.SitePairingScreenItem[]} */
        this.Peers = Peers;
    };
    /**
     * @param {vos.PotentialDatastoreVisualObject[]} [RecoverySiteDatastores] {@link vos.PotentialDatastoreVisualObject[]}
     * @param {vos.ResourcePoolVisualObject[]} [RecoverySiteResourcePools] {@link vos.ResourcePoolVisualObject[]}
     * @param {vos.VirtualDatacenterVisualObject[]} [RecoverySiteVDCs] {@link vos.VirtualDatacenterVisualObject[]}
     * @param {vos.PortalServiceProfileVisualObject[]} [ServiceProfiles] {@link vos.PortalServiceProfileVisualObject[]}
     * @constructor
     */
    vos.SitePortalAdvancedManageInfoVisualObject = function(RecoverySiteDatastores, RecoverySiteResourcePools, RecoverySiteVDCs, ServiceProfiles){
        /** @type {vos.PotentialDatastoreVisualObject[]} */
        this.RecoverySiteDatastores = RecoverySiteDatastores;
        /** @type {vos.ResourcePoolVisualObject[]} */
        this.RecoverySiteResourcePools = RecoverySiteResourcePools;
        /** @type {vos.VirtualDatacenterVisualObject[]} */
        this.RecoverySiteVDCs = RecoverySiteVDCs;
        /** @type {vos.PortalServiceProfileVisualObject[]} */
        this.ServiceProfiles = ServiceProfiles;
    };
    /**
     * @param {vos.VCDVappTableEntry[]} [LocalVCDVapps] {@link vos.VCDVappTableEntry[]}
     * @param {vos.PotentialVirtualMachineToProtectVisualObject[]} [LocalVCVms] {@link vos.PotentialVirtualMachineToProtectVisualObject[]}
     * @param {vos.PotentialPortalReplicationSiteInitialInfo[]} [TargetSites] {@link vos.PotentialPortalReplicationSiteInitialInfo[]}
     * @constructor
     */
    vos.SitePortalInitialManageInfoVisualObject = function(LocalVCDVapps, LocalVCVms, TargetSites){
        /** @type {vos.VCDVappTableEntry[]} */
        this.LocalVCDVapps = LocalVCDVapps;
        /** @type {vos.PotentialVirtualMachineToProtectVisualObject[]} */
        this.LocalVCVms = LocalVCVms;
        /** @type {vos.PotentialPortalReplicationSiteInitialInfo[]} */
        this.TargetSites = TargetSites;
    };
    /**
     * @param {string} [PathToFolder] {@link string}
     * @param {string} [UserPassword] {@link string}
     * @param {string} [Username] {@link string}
     * @constructor
     */
    vos.SmbBackupTargetDetailsVisualObject = function(PathToFolder, UserPassword, Username){
        /** @type {string} */
        this.PathToFolder = PathToFolder;
        /** @type {string} */
        this.UserPassword = UserPassword;
        /** @type {string} */
        this.Username = Username;
    };
    /**
     * @param {vos.DatastoreIdentifier} [Datastore] {@link vos.DatastoreIdentifier}
     * @param {enums.HypervisorType} [HypervisorType] {@link enums.HypervisorType}
     * @param {string} [SpecificFileVmdkPath] {@link string}
     * @param {enums.VolumeMode} [VmdkMode] {@link enums.VolumeMode}
     * @param {string} [VmdkPath] {@link string}
     * @param {string} [BackingObjectID] {@link string}
     * @constructor
     */
    vos.SpecificDisk = function(Datastore, HypervisorType, SpecificFileVmdkPath, VmdkMode, VmdkPath, BackingObjectID){
        /** @type {vos.DatastoreIdentifier} */
        this.Datastore = Datastore;
        /** @type {enums.HypervisorType} */
        this.HypervisorType = HypervisorType;
        /** @type {string} */
        this.SpecificFileVmdkPath = SpecificFileVmdkPath;
        /** @type {enums.VolumeMode} */
        this.VmdkMode = VmdkMode;
        /** @type {string} */
        this.VmdkPath = VmdkPath;
        /** @type {string} */
        this.BackingObjectID = BackingObjectID;
    };
    /**
     * @param {string} [Guid] {@link string}
     * @constructor
     */
    vos.StaticRouteIdentifier = function(Guid){
        /** @type {string} */
        this.Guid = Guid;
    };
    /**
     * @param {string} [Destination] {@link string}
     * @param {string} [Gateway] {@link string}
     * @param {vos.StaticRouteIdentifier} [Identifier] {@link vos.StaticRouteIdentifier}
     * @param {string} [Netmask] {@link string}
     * @constructor
     */
    vos.StaticRouteVisualObject = function(Destination, Gateway, Identifier, Netmask){
        /** @type {string} */
        this.Destination = Destination;
        /** @type {string} */
        this.Gateway = Gateway;
        /** @type {vos.StaticRouteIdentifier} */
        this.Identifier = Identifier;
        /** @type {string} */
        this.Netmask = Netmask;
    };
    /**
     * @param {vos.ProtectionGroupIdentifier} [Id] {@link vos.ProtectionGroupIdentifier}
     * @param {vos.FailoverTestResult} [Result] {@link vos.FailoverTestResult}
     * @constructor
     */
    vos.StopFailoverTestGuiCommand = function(Id, Result){
        /** @type {vos.ProtectionGroupIdentifier} */
        this.Id = Id;
        /** @type {vos.FailoverTestResult} */
        this.Result = Result;
    };
    /**
     * @param {vos.VpgActiveProcesses} [ActiveProcesses] {@link vos.VpgActiveProcesses}
     * @param {vos.CheckPoint} [CurrentTestCheckpoint] {@link vos.CheckPoint}
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {number} [ElapsedTimeInActiveTestInSeconds] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [Id] {@link vos.ProtectionGroupIdentifier}
     * @param {boolean} [IsCurrentlyTesting] {@link boolean}
     * @param {string} [Name] {@link string}
     * @param {enums.VPGVisualState} [State] {@link enums.VPGVisualState}
     * @constructor
     */
    vos.StopTestScreenItem = function(ActiveProcesses, CurrentTestCheckpoint, Direction, ElapsedTimeInActiveTestInSeconds, Id, IsCurrentlyTesting, Name, State){
        /** @type {vos.VpgActiveProcesses} */
        this.ActiveProcesses = ActiveProcesses;
        /** @type {vos.CheckPoint} */
        this.CurrentTestCheckpoint = CurrentTestCheckpoint;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {number} */
        this.ElapsedTimeInActiveTestInSeconds = ElapsedTimeInActiveTestInSeconds;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.Id = Id;
        /** @type {boolean} */
        this.IsCurrentlyTesting = IsCurrentlyTesting;
        /** @type {string} */
        this.Name = Name;
        /** @type {enums.VPGVisualState} */
        this.State = State;
    };
    /**
     * @param {vos.StopTestScreenItem[]} [ProtectionGroups] {@link vos.StopTestScreenItem[]}
     * @constructor
     */
    vos.StopTestScreenVisualObject = function(ProtectionGroups){
        /** @type {vos.StopTestScreenItem[]} */
        this.ProtectionGroups = ProtectionGroups;
    };
    /**
     * @param {string} [InternalName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.StoragePodIdentifier = function(InternalName, ServerIdentifier){
        /** @type {string} */
        this.InternalName = InternalName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.StoragePodIdentifier} [Id] {@link vos.StoragePodIdentifier}
     * @constructor
     */
    vos.StoragePodVisualObject = function(DisplayName, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.StoragePodIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {boolean} [IsThin] {@link boolean}
     * @param {vos.StoragePodIdentifier} [StoragePod] {@link vos.StoragePodIdentifier}
     * @constructor
     */
    vos.StoragePodVolumeReplicationDestination = function(IsThin, StoragePod){
        /** @type {boolean} */
        this.IsThin = IsThin;
        /** @type {vos.StoragePodIdentifier} */
        this.StoragePod = StoragePod;
    };
    /**
     * @param {enums.DatastoreAlertStatusVisualObject} [AlertStatusVisualObject] {@link enums.DatastoreAlertStatusVisualObject}
     * @param {vos.AlertsTipVisualObject} [AlertTip] {@link vos.AlertsTipVisualObject}
     * @param {number} [ConnectedVRAs] {@link number}
     * @param {enums.DatastoreAvailabilityStatusVisualObject} [DatastoreAvailabilityStatusVisualObject] {@link enums.DatastoreAvailabilityStatusVisualObject}
     * @param {number} [DatastoreConsumptionInGB] {@link number}
     * @param {number} [DatastoreTotalCapacityInGb] {@link number}
     * @param {string} [Device] {@link string}
     * @param {string} [DisplayName] {@link string}
     * @param {number} [IncomingVMs] {@link number}
     * @param {number} [JournalVolsSizeInGB] {@link number}
     * @param {enums.StorageResourceType} [NodeType] {@link enums.StorageResourceType}
     * @param {number} [ProtectedVMs] {@link number}
     * @param {number} [RecoveryVolsSizeInGB] {@link number}
     * @param {string} [TypeOfDatastore] {@link string}
     * @param {boolean} [UsedByZerto] {@link boolean}
     * @param {number} [ZertoConsumptionInGB] {@link number}
     * @param {vos.StorageResourceNode[]} [children] {@link vos.StorageResourceNode[]}
     * @constructor
     */
    vos.StorageResourceNode = function(AlertStatusVisualObject, AlertTip, ConnectedVRAs, DatastoreAvailabilityStatusVisualObject, DatastoreConsumptionInGB, DatastoreTotalCapacityInGb, Device, DisplayName, IncomingVMs, JournalVolsSizeInGB, NodeType, ProtectedVMs, RecoveryVolsSizeInGB, TypeOfDatastore, UsedByZerto, ZertoConsumptionInGB, children){
        /** @type {enums.DatastoreAlertStatusVisualObject} */
        this.AlertStatusVisualObject = AlertStatusVisualObject;
        /** @type {vos.AlertsTipVisualObject} */
        this.AlertTip = AlertTip;
        /** @type {number} */
        this.ConnectedVRAs = ConnectedVRAs;
        /** @type {enums.DatastoreAvailabilityStatusVisualObject} */
        this.DatastoreAvailabilityStatusVisualObject = DatastoreAvailabilityStatusVisualObject;
        /** @type {number} */
        this.DatastoreConsumptionInGB = DatastoreConsumptionInGB;
        /** @type {number} */
        this.DatastoreTotalCapacityInGb = DatastoreTotalCapacityInGb;
        /** @type {string} */
        this.Device = Device;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {number} */
        this.IncomingVMs = IncomingVMs;
        /** @type {number} */
        this.JournalVolsSizeInGB = JournalVolsSizeInGB;
        /** @type {enums.StorageResourceType} */
        this.NodeType = NodeType;
        /** @type {number} */
        this.ProtectedVMs = ProtectedVMs;
        /** @type {number} */
        this.RecoveryVolsSizeInGB = RecoveryVolsSizeInGB;
        /** @type {string} */
        this.TypeOfDatastore = TypeOfDatastore;
        /** @type {boolean} */
        this.UsedByZerto = UsedByZerto;
        /** @type {number} */
        this.ZertoConsumptionInGB = ZertoConsumptionInGB;
        /** @type {vos.StorageResourceNode[]} */
        this.children = children;
    };
    /**
     * @param {string} [Description] {@link string}
     * @param {enums.TicketSeverity} [Severity] {@link enums.TicketSeverity}
     * @param {string} [SspEmailAddress] {@link string}
     * @param {string} [Subject] {@link string}
     * @param {enums.TicketType} [Type] {@link enums.TicketType}
     * @constructor
     */
    vos.SubmitSupportTicketVisualObject = function(Description, Severity, SspEmailAddress, Subject, Type){
        /** @type {string} */
        this.Description = Description;
        /** @type {enums.TicketSeverity} */
        this.Severity = Severity;
        /** @type {string} */
        this.SspEmailAddress = SspEmailAddress;
        /** @type {string} */
        this.Subject = Subject;
        /** @type {enums.TicketType} */
        this.Type = Type;
    };
    /**
     * @param {string} [Identifier] {@link string}
     * @constructor
     */
    vos.SubnetIdentifier = function(Identifier){
        /** @type {string} */
        this.Identifier = Identifier;
    };
    /**
     * @param {number} [NumConnectedPeers] {@link number}
     * @param {number} [NumPeers] {@link number}
     * @constructor
     */
    vos.SummaryLevelRemoteConnectionStatus = function(NumConnectedPeers, NumPeers){
        /** @type {number} */
        this.NumConnectedPeers = NumConnectedPeers;
        /** @type {number} */
        this.NumPeers = NumPeers;
    };
    /**
     * @param {vos.SiteDetailsVisualObject} [SiteDetails] {@link vos.SiteDetailsVisualObject}
     * @param {vos.SummaryScreenState} [SummaryState] {@link vos.SummaryScreenState}
     * @param {vos.TaskSummaryVisualObject} [TaskSummary] {@link vos.TaskSummaryVisualObject}
     * @constructor
     */
    vos.SummaryMinimalVisualObject = function(SiteDetails, SummaryState, TaskSummary){
        /** @type {vos.SiteDetailsVisualObject} */
        this.SiteDetails = SiteDetails;
        /** @type {vos.SummaryScreenState} */
        this.SummaryState = SummaryState;
        /** @type {vos.TaskSummaryVisualObject} */
        this.TaskSummary = TaskSummary;
    };
    /**
     * @param {vos.SingleGraphVisualObject} [IncomingIops] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [IncomingThroughputInMBps] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [OutgoingBandWidthInMBps] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [VraCPUUsage] {@link vos.SingleGraphVisualObject}
     * @constructor
     */
    vos.SummaryScreenGraphs = function(IncomingIops, IncomingThroughputInMBps, OutgoingBandWidthInMBps, VraCPUUsage){
        /** @type {vos.SingleGraphVisualObject} */
        this.IncomingIops = IncomingIops;
        /** @type {vos.SingleGraphVisualObject} */
        this.IncomingThroughputInMBps = IncomingThroughputInMBps;
        /** @type {vos.SingleGraphVisualObject} */
        this.OutgoingBandWidthInMBps = OutgoingBandWidthInMBps;
        /** @type {vos.SingleGraphVisualObject} */
        this.VraCPUUsage = VraCPUUsage;
    };
    /**
     * @param {number} [NumberOfHosts] {@link number}
     * @param {number} [NumberOfInstalledHosts] {@link number}
     * @constructor
     */
    vos.SummaryScreenHostsInfo = function(NumberOfHosts, NumberOfInstalledHosts){
        /** @type {number} */
        this.NumberOfHosts = NumberOfHosts;
        /** @type {number} */
        this.NumberOfInstalledHosts = NumberOfInstalledHosts;
    };
    /**
     * @param {number} [ConfiguredSelfVpgs] {@link number}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.SummaryScreenHostsInfo} [HostsInfo] {@link vos.SummaryScreenHostsInfo}
     * @param {number} [RemoteInboudStorageInMB] {@link number}
     * @param {vos.SummaryScreenSiteStats} [Stats] {@link vos.SummaryScreenSiteStats}
     * @constructor
     */
    vos.SummaryScreenSiteInfo = function(ConfiguredSelfVpgs, Details, HostsInfo, RemoteInboudStorageInMB, Stats){
        /** @type {number} */
        this.ConfiguredSelfVpgs = ConfiguredSelfVpgs;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.SummaryScreenHostsInfo} */
        this.HostsInfo = HostsInfo;
        /** @type {number} */
        this.RemoteInboudStorageInMB = RemoteInboudStorageInMB;
        /** @type {vos.SummaryScreenSiteStats} */
        this.Stats = Stats;
    };
    /**
     * @param {number} [AverageJournalHistoryInSec] {@link number}
     * @param {number} [CompressionRatePrecentage] {@link number}
     * @param {number} [NumberOfVmsReplicating] {@link number}
     * @param {number} [NumberOfVpgsConfigured] {@link number}
     * @param {number} [NumberOfVpgsReplicating] {@link number}
     * @param {number} [StorageProtectedSiteInMB] {@link number}
     * @param {number} [StorageProvisionedSizeInMB] {@link number}
     * @constructor
     */
    vos.SummaryScreenSiteStats = function(AverageJournalHistoryInSec, CompressionRatePrecentage, NumberOfVmsReplicating, NumberOfVpgsConfigured, NumberOfVpgsReplicating, StorageProtectedSiteInMB, StorageProvisionedSizeInMB){
        /** @type {number} */
        this.AverageJournalHistoryInSec = AverageJournalHistoryInSec;
        /** @type {number} */
        this.CompressionRatePrecentage = CompressionRatePrecentage;
        /** @type {number} */
        this.NumberOfVmsReplicating = NumberOfVmsReplicating;
        /** @type {number} */
        this.NumberOfVpgsConfigured = NumberOfVpgsConfigured;
        /** @type {number} */
        this.NumberOfVpgsReplicating = NumberOfVpgsReplicating;
        /** @type {number} */
        this.StorageProtectedSiteInMB = StorageProtectedSiteInMB;
        /** @type {number} */
        this.StorageProvisionedSizeInMB = StorageProvisionedSizeInMB;
    };
    /**
     * @param {enums.ProtectionGroupAlertStatus} [AlertStatus] {@link enums.ProtectionGroupAlertStatus}
     * @param {vos.AlertsTipVisualObject} [AlertTips] {@link vos.AlertsTipVisualObject}
     * @param {boolean} [AreThereAnyVpgs] {@link boolean}
     * @param {string} [BannedReason] {@link string}
     * @param {boolean} [CanAddVCDReplicationDestinations] {@link boolean}
     * @param {boolean} [CanAddVCDVapps] {@link boolean}
     * @param {boolean} [IsBanned] {@link boolean}
     * @param {boolean} [IsGeneralCreateVPGEnabled] {@link boolean}
     * @param {boolean} [IsGeneralFailoverEnabled] {@link boolean}
     * @param {boolean} [IsGeneralFailoverTestEnabled] {@link boolean}
     * @param {boolean} [IsGeneralInsertCheckpointEnabled] {@link boolean}
     * @param {boolean} [IsGeneralLocalFailoverEnabled] {@link boolean}
     * @param {boolean} [IsGeneralLocalFailoverTestEnabled] {@link boolean}
     * @param {boolean} [IsGeneralMoveEnabled] {@link boolean}
     * @param {boolean} [IsGeneralPauseEnabled] {@link boolean}
     * @param {boolean} [IsGeneralRemoteFailoverEnabled] {@link boolean}
     * @param {boolean} [IsGeneralRemoteFailoverTestEnabled] {@link boolean}
     * @param {boolean} [IsGeneralRestoreEnabled] {@link boolean}
     * @param {boolean} [IsGeneralResumeEnabled] {@link boolean}
     * @param {boolean} [IsManageSiteSettingsEnabled] {@link boolean}
     * @param {boolean} [IsManageVraEnabled] {@link boolean}
     * @param {boolean} [IsPairEnabled] {@link boolean}
     * @param {boolean} [IsSelfReplicationAllowed] {@link boolean}
     * @param {boolean} [IsUnPairEnabled] {@link boolean}
     * @param {number} [NumberOfRecentEvents] {@link number}
     * @param {number} [NumberOfRepositories] {@link number}
     * @param {number} [NumberOfStorages] {@link number}
     * @param {number} [NumberOfVras] {@link number}
     * @param {vos.SummaryLevelRemoteConnectionStatus} [RemoteConnectionStatus] {@link vos.SummaryLevelRemoteConnectionStatus}
     * @constructor
     */
    vos.SummaryScreenState = function(AlertStatus, AlertTips, AreThereAnyVpgs, BannedReason, CanAddVCDReplicationDestinations, CanAddVCDVapps, IsBanned, IsGeneralCreateVPGEnabled, IsGeneralFailoverEnabled, IsGeneralFailoverTestEnabled, IsGeneralInsertCheckpointEnabled, IsGeneralLocalFailoverEnabled, IsGeneralLocalFailoverTestEnabled, IsGeneralMoveEnabled, IsGeneralPauseEnabled, IsGeneralRemoteFailoverEnabled, IsGeneralRemoteFailoverTestEnabled, IsGeneralRestoreEnabled, IsGeneralResumeEnabled, IsManageSiteSettingsEnabled, IsManageVraEnabled, IsPairEnabled, IsSelfReplicationAllowed, IsUnPairEnabled, NumberOfRecentEvents, NumberOfRepositories, NumberOfStorages, NumberOfVras, RemoteConnectionStatus){
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.AlertStatus = AlertStatus;
        /** @type {vos.AlertsTipVisualObject} */
        this.AlertTips = AlertTips;
        /** @type {boolean} */
        this.AreThereAnyVpgs = AreThereAnyVpgs;
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {boolean} */
        this.CanAddVCDReplicationDestinations = CanAddVCDReplicationDestinations;
        /** @type {boolean} */
        this.CanAddVCDVapps = CanAddVCDVapps;
        /** @type {boolean} */
        this.IsBanned = IsBanned;
        /** @type {boolean} */
        this.IsGeneralCreateVPGEnabled = IsGeneralCreateVPGEnabled;
        /** @type {boolean} */
        this.IsGeneralFailoverEnabled = IsGeneralFailoverEnabled;
        /** @type {boolean} */
        this.IsGeneralFailoverTestEnabled = IsGeneralFailoverTestEnabled;
        /** @type {boolean} */
        this.IsGeneralInsertCheckpointEnabled = IsGeneralInsertCheckpointEnabled;
        /** @type {boolean} */
        this.IsGeneralLocalFailoverEnabled = IsGeneralLocalFailoverEnabled;
        /** @type {boolean} */
        this.IsGeneralLocalFailoverTestEnabled = IsGeneralLocalFailoverTestEnabled;
        /** @type {boolean} */
        this.IsGeneralMoveEnabled = IsGeneralMoveEnabled;
        /** @type {boolean} */
        this.IsGeneralPauseEnabled = IsGeneralPauseEnabled;
        /** @type {boolean} */
        this.IsGeneralRemoteFailoverEnabled = IsGeneralRemoteFailoverEnabled;
        /** @type {boolean} */
        this.IsGeneralRemoteFailoverTestEnabled = IsGeneralRemoteFailoverTestEnabled;
        /** @type {boolean} */
        this.IsGeneralRestoreEnabled = IsGeneralRestoreEnabled;
        /** @type {boolean} */
        this.IsGeneralResumeEnabled = IsGeneralResumeEnabled;
        /** @type {boolean} */
        this.IsManageSiteSettingsEnabled = IsManageSiteSettingsEnabled;
        /** @type {boolean} */
        this.IsManageVraEnabled = IsManageVraEnabled;
        /** @type {boolean} */
        this.IsPairEnabled = IsPairEnabled;
        /** @type {boolean} */
        this.IsSelfReplicationAllowed = IsSelfReplicationAllowed;
        /** @type {boolean} */
        this.IsUnPairEnabled = IsUnPairEnabled;
        /** @type {number} */
        this.NumberOfRecentEvents = NumberOfRecentEvents;
        /** @type {number} */
        this.NumberOfRepositories = NumberOfRepositories;
        /** @type {number} */
        this.NumberOfStorages = NumberOfStorages;
        /** @type {number} */
        this.NumberOfVras = NumberOfVras;
        /** @type {vos.SummaryLevelRemoteConnectionStatus} */
        this.RemoteConnectionStatus = RemoteConnectionStatus;
    };
    /**
     * @param {string} [LastTestMessage] {@link string}
     * @param {string} [TestIntervalThresholdMessage] {@link string}
     * @constructor
     */
    vos.SummaryScreenTestInformation = function(LastTestMessage, TestIntervalThresholdMessage){
        /** @type {string} */
        this.LastTestMessage = LastTestMessage;
        /** @type {string} */
        this.TestIntervalThresholdMessage = TestIntervalThresholdMessage;
    };
    /**
     * @param {number} [AverageRpo] {@link number}
     * @param {boolean} [CanManageRemoteSite] {@link boolean}
     * @param {vos.SummaryScreenGraphs} [Graphs] {@link vos.SummaryScreenGraphs}
     * @param {boolean} [IsPaired] {@link boolean}
     * @param {string} [LicenseMessage] {@link string}
     * @param {vos.SummaryScreenSiteInfo} [LocalSiteInfo] {@link vos.SummaryScreenSiteInfo}
     * @param {number} [NumberOfProtectedAndRecoveryVms] {@link number}
     * @param {vos.SummaryScreenSiteInfo} [RemoteSiteInfo] {@link vos.SummaryScreenSiteInfo}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @param {vos.SummaryScreenTestInformation} [TestInformation] {@link vos.SummaryScreenTestInformation}
     * @constructor
     */
    vos.SummaryScreenVisualObject = function(AverageRpo, CanManageRemoteSite, Graphs, IsPaired, LicenseMessage, LocalSiteInfo, NumberOfProtectedAndRecoveryVms, RemoteSiteInfo, State, TestInformation){
        /** @type {number} */
        this.AverageRpo = AverageRpo;
        /** @type {boolean} */
        this.CanManageRemoteSite = CanManageRemoteSite;
        /** @type {vos.SummaryScreenGraphs} */
        this.Graphs = Graphs;
        /** @type {boolean} */
        this.IsPaired = IsPaired;
        /** @type {string} */
        this.LicenseMessage = LicenseMessage;
        /** @type {vos.SummaryScreenSiteInfo} */
        this.LocalSiteInfo = LocalSiteInfo;
        /** @type {number} */
        this.NumberOfProtectedAndRecoveryVms = NumberOfProtectedAndRecoveryVms;
        /** @type {vos.SummaryScreenSiteInfo} */
        this.RemoteSiteInfo = RemoteSiteInfo;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
        /** @type {vos.SummaryScreenTestInformation} */
        this.TestInformation = TestInformation;
    };
    /**
     * @param {vos.SupportedHostVersionVisualObject[]} [SupportedEsxUpdatesStrings] {@link vos.SupportedHostVersionVisualObject[]}
     * @constructor
     */
    vos.SupportedHostVersionsVisualObject = function(SupportedEsxUpdatesStrings){
        /** @type {vos.SupportedHostVersionVisualObject[]} */
        this.SupportedEsxUpdatesStrings = SupportedEsxUpdatesStrings;
    };
    /**
     * @param {string} [EsxUpdate] {@link string}
     * @param {string} [EsxVersion] {@link string}
     * @param {enums.HypervisorType} [HypervisorType] {@link enums.HypervisorType}
     * @constructor
     */
    vos.SupportedHostVersionVisualObject = function(EsxUpdate, EsxVersion, HypervisorType){
        /** @type {string} */
        this.EsxUpdate = EsxUpdate;
        /** @type {string} */
        this.EsxVersion = EsxVersion;
        /** @type {enums.HypervisorType} */
        this.HypervisorType = HypervisorType;
    };
    /**
     * @param {number} [BuildNumber] {@link number}
     * @param {string} [Version] {@link string}
     * @constructor
     */
    vos.SupportTicketDisplayDataVisualObject = function(BuildNumber, Version){
        /** @type {number} */
        this.BuildNumber = BuildNumber;
        /** @type {string} */
        this.Version = Version;
    };
    /**
     * @param {number} [CaseNumber] {@link number}
     * @param {enums.SupportTicketResultStatus} [Status] {@link enums.SupportTicketResultStatus}
     * @constructor
     */
    vos.SupportTicketStatusVisualObject = function(CaseNumber, Status){
        /** @type {number} */
        this.CaseNumber = CaseNumber;
        /** @type {enums.SupportTicketResultStatus} */
        this.Status = Status;
    };
    /**
     * @param {number} [RunningTasksCount] {@link number}
     * @param {vos.CommandTaskRecordVisualObject[]} [TaskItems] {@link vos.CommandTaskRecordVisualObject[]}
     * @constructor
     */
    vos.TasksPaneVisualObject = function(RunningTasksCount, TaskItems){
        /** @type {number} */
        this.RunningTasksCount = RunningTasksCount;
        /** @type {vos.CommandTaskRecordVisualObject[]} */
        this.TaskItems = TaskItems;
    };
    /**
     * @param {vos.CommandTaskRecordVisualObject} [LastCommandTask] {@link vos.CommandTaskRecordVisualObject}
     * @param {number} [RunningTasksCount] {@link number}
     * @param {number} [WaitingTasksCount] {@link number}
     * @constructor
     */
    vos.TaskSummaryVisualObject = function(LastCommandTask, RunningTasksCount, WaitingTasksCount){
        /** @type {vos.CommandTaskRecordVisualObject} */
        this.LastCommandTask = LastCommandTask;
        /** @type {number} */
        this.RunningTasksCount = RunningTasksCount;
        /** @type {number} */
        this.WaitingTasksCount = WaitingTasksCount;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {number} [TestIntervalInMinutes] {@link number}
     * @constructor
     */
    vos.TestIntervalItemVisualObject = function(DisplayName, TestIntervalInMinutes){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {number} */
        this.TestIntervalInMinutes = TestIntervalInMinutes;
    };
    /**
     * @param {date} [From] {@link date}
     * @param {date} [To] {@link date}
     * @constructor
     */
    vos.TimeCriteria = function(From, To){
        /** @type {date} */
        this.From = From;
        /** @type {date} */
        this.To = To;
    };
    /**
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.TopologyScreenExtendedSiteInfo} [LocalSite] {@link vos.TopologyScreenExtendedSiteInfo}
     * @param {vos.TopologyScreenExtendedSiteInfo[]} [Peers] {@link vos.TopologyScreenExtendedSiteInfo[]}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.ToplogyScreenVisualObject = function(Details, LocalSite, Peers, State){
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.TopologyScreenExtendedSiteInfo} */
        this.LocalSite = LocalSite;
        /** @type {vos.TopologyScreenExtendedSiteInfo[]} */
        this.Peers = Peers;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {vos.AlertsTipVisualObject} [AlertTips] {@link vos.AlertsTipVisualObject}
     * @param {string} [CustomerName] {@link string}
     * @param {string} [Ip] {@link string}
     * @param {boolean} [IsAvailable] {@link boolean}
     * @param {number} [NumberOfIncomingVms] {@link number}
     * @param {number} [NumberOfIncomingVpgs] {@link number}
     * @param {number} [NumberOfOutgoingVms] {@link number}
     * @param {number} [NumberOfOutgoingVpgs] {@link number}
     * @param {number} [NumberOfSelfProtectedVms] {@link number}
     * @param {number} [NumberOfSelfProtectedVpgs] {@link number}
     * @param {vos.OwnersIdentifier} [OwnersId] {@link vos.OwnersIdentifier}
     * @param {vos.SiteIdentifier} [SiteId] {@link vos.SiteIdentifier}
     * @param {string} [SiteName] {@link string}
     * @param {enums.ProtectionGroupAlertStatus} [Status] {@link enums.ProtectionGroupAlertStatus}
     * @constructor
     */
    vos.TopologyScreenExtendedSiteInfo = function(AlertTips, CustomerName, Ip, IsAvailable, NumberOfIncomingVms, NumberOfIncomingVpgs, NumberOfOutgoingVms, NumberOfOutgoingVpgs, NumberOfSelfProtectedVms, NumberOfSelfProtectedVpgs, OwnersId, SiteId, SiteName, Status){
        /** @type {vos.AlertsTipVisualObject} */
        this.AlertTips = AlertTips;
        /** @type {string} */
        this.CustomerName = CustomerName;
        /** @type {string} */
        this.Ip = Ip;
        /** @type {boolean} */
        this.IsAvailable = IsAvailable;
        /** @type {number} */
        this.NumberOfIncomingVms = NumberOfIncomingVms;
        /** @type {number} */
        this.NumberOfIncomingVpgs = NumberOfIncomingVpgs;
        /** @type {number} */
        this.NumberOfOutgoingVms = NumberOfOutgoingVms;
        /** @type {number} */
        this.NumberOfOutgoingVpgs = NumberOfOutgoingVpgs;
        /** @type {number} */
        this.NumberOfSelfProtectedVms = NumberOfSelfProtectedVms;
        /** @type {number} */
        this.NumberOfSelfProtectedVpgs = NumberOfSelfProtectedVpgs;
        /** @type {vos.OwnersIdentifier} */
        this.OwnersId = OwnersId;
        /** @type {vos.SiteIdentifier} */
        this.SiteId = SiteId;
        /** @type {string} */
        this.SiteName = SiteName;
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.Status = Status;
    };
    /**
     * @param {vos.DatacenterTreeVisualObject[]} [Datacenters] {@link vos.DatacenterTreeVisualObject[]}
     * @constructor
     */
    vos.TreeScreenVisualObject = function(Datacenters){
        /** @type {vos.DatacenterTreeVisualObject[]} */
        this.Datacenters = Datacenters;
    };
    /**
     * @param {vos.VirtualMachineAddProgress} [AddInProgress] {@link vos.VirtualMachineAddProgress}
     * @param {string} [BannedVappReason] {@link string}
     * @param {boolean} [IsAnySiteAvailableForReplication] {@link boolean}
     * @param {boolean} [IsBannedVapp] {@link boolean}
     * @param {boolean} [IsConfiguredProtectionGroup] {@link boolean}
     * @param {boolean} [IsManageSiteSettingsEnabled] {@link boolean}
     * @param {boolean} [IsRemoteSiteConnected] {@link boolean}
     * @param {vos.VPGDetailsScreenVisualObject} [ProtectionGroupDetails] {@link vos.VPGDetailsScreenVisualObject}
     * @param {vos.VappQuickStartInfo} [QuickStartButtonsStatus] {@link vos.VappQuickStartInfo}
     * @constructor
     */
    vos.VappContextInfo = function(AddInProgress, BannedVappReason, IsAnySiteAvailableForReplication, IsBannedVapp, IsConfiguredProtectionGroup, IsManageSiteSettingsEnabled, IsRemoteSiteConnected, ProtectionGroupDetails, QuickStartButtonsStatus){
        /** @type {vos.VirtualMachineAddProgress} */
        this.AddInProgress = AddInProgress;
        /** @type {string} */
        this.BannedVappReason = BannedVappReason;
        /** @type {boolean} */
        this.IsAnySiteAvailableForReplication = IsAnySiteAvailableForReplication;
        /** @type {boolean} */
        this.IsBannedVapp = IsBannedVapp;
        /** @type {boolean} */
        this.IsConfiguredProtectionGroup = IsConfiguredProtectionGroup;
        /** @type {boolean} */
        this.IsManageSiteSettingsEnabled = IsManageSiteSettingsEnabled;
        /** @type {boolean} */
        this.IsRemoteSiteConnected = IsRemoteSiteConnected;
        /** @type {vos.VPGDetailsScreenVisualObject} */
        this.ProtectionGroupDetails = ProtectionGroupDetails;
        /** @type {vos.VappQuickStartInfo} */
        this.QuickStartButtonsStatus = QuickStartButtonsStatus;
    };
    /**
     * @param {string} [InternalVAppName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.VAppIdentifier = function(InternalVAppName, ServerIdentifier){
        /** @type {string} */
        this.InternalVAppName = InternalVAppName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @param {boolean} [CanAddVCDReplicationDestinations] {@link boolean}
     * @param {boolean} [CanProtectVapp] {@link boolean}
     * @constructor
     */
    vos.VappQuickStartInfo = function(CanAddVCDReplicationDestinations, CanProtectVapp){
        /** @type {boolean} */
        this.CanAddVCDReplicationDestinations = CanAddVCDReplicationDestinations;
        /** @type {boolean} */
        this.CanProtectVapp = CanProtectVapp;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VAppIdentifier} [Identifier] {@link vos.VAppIdentifier}
     * @param {vos.VappTreeVisualObject[]} [SubVapps] {@link vos.VappTreeVisualObject[]}
     * @param {vos.VirtualMachineVisualObject[]} [VirtualMachines] {@link vos.VirtualMachineVisualObject[]}
     * @constructor
     */
    vos.VappTreeVisualObject = function(DisplayName, Identifier, SubVapps, VirtualMachines){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VAppIdentifier} */
        this.Identifier = Identifier;
        /** @type {vos.VappTreeVisualObject[]} */
        this.SubVapps = SubVapps;
        /** @type {vos.VirtualMachineVisualObject[]} */
        this.VirtualMachines = VirtualMachines;
    };
    /**
     * @param {boolean} [IsThin] {@link boolean}
     * @constructor
     */
    vos.VCDDatastoreVolumeReplicationDestination = function(IsThin){
        /** @type {boolean} */
        this.IsThin = IsThin;
    };
    /**
     * @param {string} [VCDId] {@link string}
     * @constructor
     */
    vos.VCDIdentifier = function(VCDId){
        /** @type {string} */
        this.VCDId = VCDId;
    };
    /**
     * @param {vos.VCDVirtualDatacenterStorageProfileVisualObject} [VCDVirtualDatacenterStorageProfileVisualObject] {@link vos.VCDVirtualDatacenterStorageProfileVisualObject}
     * @param {vos.VMIdentifier} [VmIdentifier] {@link vos.VMIdentifier}
     * @constructor
     */
    vos.VCDInitialStorageProfileForVmVisualObject = function(VCDVirtualDatacenterStorageProfileVisualObject, VmIdentifier){
        /** @type {vos.VCDVirtualDatacenterStorageProfileVisualObject} */
        this.VCDVirtualDatacenterStorageProfileVisualObject = VCDVirtualDatacenterStorageProfileVisualObject;
        /** @type {vos.VMIdentifier} */
        this.VmIdentifier = VmIdentifier;
    };
    /**
     * @param {string} [MacAddress] {@link string}
     * @constructor
     */
    vos.VCDMacAddress = function(MacAddress){
        /** @type {string} */
        this.MacAddress = MacAddress;
    };
    /**
     * @param {string} [ExternalIp] {@link string}
     * @param {number} [ExternalPort] {@link number}
     * @param {string} [InternalIp] {@link string}
     * @param {number} [InternalPort] {@link number}
     * @param {boolean} [IsEnabled] {@link boolean}
     * @param {string} [MapMode] {@link string}
     * @param {string} [Protocol] {@link string}
     * @param {string} [RuleType] {@link string}
     * @param {string} [VMId] {@link string}
     * @param {number} [VMNicId] {@link number}
     * @constructor
     */
    vos.VCDNetworkFeatureNatRule = function(ExternalIp, ExternalPort, InternalIp, InternalPort, IsEnabled, MapMode, Protocol, RuleType, VMId, VMNicId){
        /** @type {string} */
        this.ExternalIp = ExternalIp;
        /** @type {number} */
        this.ExternalPort = ExternalPort;
        /** @type {string} */
        this.InternalIp = InternalIp;
        /** @type {number} */
        this.InternalPort = InternalPort;
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
        /** @type {string} */
        this.MapMode = MapMode;
        /** @type {string} */
        this.Protocol = Protocol;
        /** @type {string} */
        this.RuleType = RuleType;
        /** @type {string} */
        this.VMId = VMId;
        /** @type {number} */
        this.VMNicId = VMNicId;
    };
    /**
     * @param {string} [ExternalIp] {@link string}
     * @param {boolean} [IsEnabled] {@link boolean}
     * @param {string} [NatType] {@link string}
     * @param {string} [Policy] {@link string}
     * @param {vos.VCDNetworkFeatureNatRule[]} [Rules] {@link vos.VCDNetworkFeatureNatRule[]}
     * @constructor
     */
    vos.VCDNetworkFeatureNatService = function(ExternalIp, IsEnabled, NatType, Policy, Rules){
        /** @type {string} */
        this.ExternalIp = ExternalIp;
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
        /** @type {string} */
        this.NatType = NatType;
        /** @type {string} */
        this.Policy = Policy;
        /** @type {vos.VCDNetworkFeatureNatRule[]} */
        this.Rules = Rules;
    };
    /**
     * @param {enums.VCDNetworkFenceMode_VCDNetworkFenceModeType} [FenceModeType] {@link enums.VCDNetworkFenceMode_VCDNetworkFenceModeType}
     * @constructor
     */
    vos.VCDNetworkFenceMode = function(FenceModeType){
        /** @type {enums.VCDNetworkFenceMode_VCDNetworkFenceModeType} */
        this.FenceModeType = FenceModeType;
    };
    /**
     * @constructor
     */
    vos.VCDNetworkIdentifier = function(){
    };
    /**
     * @param {enums.VCDNetworkIpMode_VCDNetworkIpModeType} [IpModeType] {@link enums.VCDNetworkIpMode_VCDNetworkIpModeType}
     * @constructor
     */
    vos.VCDNetworkIpMode = function(IpModeType){
        /** @type {enums.VCDNetworkIpMode_VCDNetworkIpModeType} */
        this.IpModeType = IpModeType;
    };
    /**
     * @param {string} [EndAddress] {@link string}
     * @param {string} [StartAddress] {@link string}
     * @constructor
     */
    vos.VCDNetworkIpRange = function(EndAddress, StartAddress){
        /** @type {string} */
        this.EndAddress = EndAddress;
        /** @type {string} */
        this.StartAddress = StartAddress;
    };
    /**
     * @param {string} [Gateway] {@link string}
     * @param {vos.VCDNetworkIpRange[]} [IpRanges] {@link vos.VCDNetworkIpRange[]}
     * @param {string} [Netmask] {@link string}
     * @constructor
     */
    vos.VCDNetworkIpScope = function(Gateway, IpRanges, Netmask){
        /** @type {string} */
        this.Gateway = Gateway;
        /** @type {vos.VCDNetworkIpRange[]} */
        this.IpRanges = IpRanges;
        /** @type {string} */
        this.Netmask = Netmask;
    };
    /**
     * @param {vos.VCDMacAddress} [NewMacAddress] {@link vos.VCDMacAddress}
     * @param {vos.VCDNicInfo} [NicInfo] {@link vos.VCDNicInfo}
     * @constructor
     */
    vos.VCDNetworkManagementSettings = function(NewMacAddress, NicInfo){
        /** @type {vos.VCDMacAddress} */
        this.NewMacAddress = NewMacAddress;
        /** @type {vos.VCDNicInfo} */
        this.NicInfo = NicInfo;
    };
    /**
     * @param {vos.VCDNetworkIpMode} [IPMode] {@link vos.VCDNetworkIpMode}
     * @param {string} [IpAddress] {@link string}
     * @param {boolean} [IsConnected] {@link boolean}
     * @param {boolean} [IsPrimary] {@link boolean}
     * @param {string} [MacAddress] {@link string}
     * @param {vos.VNicIdentifier} [VNicIdentifier] {@link vos.VNicIdentifier}
     * @param {string} [VappNetworkName] {@link string}
     * @constructor
     */
    vos.VCDNicInfo = function(IPMode, IpAddress, IsConnected, IsPrimary, MacAddress, VNicIdentifier, VappNetworkName){
        /** @type {vos.VCDNetworkIpMode} */
        this.IPMode = IPMode;
        /** @type {string} */
        this.IpAddress = IpAddress;
        /** @type {boolean} */
        this.IsConnected = IsConnected;
        /** @type {boolean} */
        this.IsPrimary = IsPrimary;
        /** @type {string} */
        this.MacAddress = MacAddress;
        /** @type {vos.VNicIdentifier} */
        this.VNicIdentifier = VNicIdentifier;
        /** @type {string} */
        this.VappNetworkName = VappNetworkName;
    };
    /**
     * @constructor
     */
    vos.VCDOrgNetworkIdentifier = function(){
    };
    /**
     * @param {vos.VirtualVdcOrgNetworkVisualObject} [OriginalOrgVdcNetworkValue] {@link vos.VirtualVdcOrgNetworkVisualObject}
     * @param {vos.VirtualVdcOrgNetworkVisualObject} [RecoveryOrgVdcNetworkValue] {@link vos.VirtualVdcOrgNetworkVisualObject}
     * @param {vos.VirtualVdcOrgNetworkVisualObject} [RecoveryTestOrgVdcNetworkValue] {@link vos.VirtualVdcOrgNetworkVisualObject}
     * @param {vos.VirtualVdcOrgNetworkVisualObject} [ReverseReplicationTestOrgVdcNetworkValue] {@link vos.VirtualVdcOrgNetworkVisualObject}
     * @constructor
     */
    vos.VCDOrgVdcNetworkMappingVisualObject = function(OriginalOrgVdcNetworkValue, RecoveryOrgVdcNetworkValue, RecoveryTestOrgVdcNetworkValue, ReverseReplicationTestOrgVdcNetworkValue){
        /** @type {vos.VirtualVdcOrgNetworkVisualObject} */
        this.OriginalOrgVdcNetworkValue = OriginalOrgVdcNetworkValue;
        /** @type {vos.VirtualVdcOrgNetworkVisualObject} */
        this.RecoveryOrgVdcNetworkValue = RecoveryOrgVdcNetworkValue;
        /** @type {vos.VirtualVdcOrgNetworkVisualObject} */
        this.RecoveryTestOrgVdcNetworkValue = RecoveryTestOrgVdcNetworkValue;
        /** @type {vos.VirtualVdcOrgNetworkVisualObject} */
        this.ReverseReplicationTestOrgVdcNetworkValue = ReverseReplicationTestOrgVdcNetworkValue;
    };
    /**
     * @param {vos.VirtualVdcOrgNetworkVisualObject[]} [OrgVdcNetworks] {@link vos.VirtualVdcOrgNetworkVisualObject[]}
     * @param {vos.VCDVirtualDatacenterStorageProfileVisualObject[]} [StorageProfiles] {@link vos.VCDVirtualDatacenterStorageProfileVisualObject[]}
     * @constructor
     */
    vos.VcdPotentialRestoreSecondaryEntities = function(OrgVdcNetworks, StorageProfiles){
        /** @type {vos.VirtualVdcOrgNetworkVisualObject[]} */
        this.OrgVdcNetworks = OrgVdcNetworks;
        /** @type {vos.VCDVirtualDatacenterStorageProfileVisualObject[]} */
        this.StorageProfiles = StorageProfiles;
    };
    /**
     * @constructor
     */
    vos.VCDProviderVirtualDatacenterIdentifier = function(){
    };
    /**
     * @param {string} [AMQPPassword] {@link string}
     * @param {string} [AMQPUsername] {@link string}
     * @param {boolean} [Enabled] {@link boolean}
     * @param {string} [Password] {@link string}
     * @param {string} [Username] {@link string}
     * @param {string} [VcloudIp] {@link string}
     * @constructor
     */
    vos.VCDProxyConfiguration = function(AMQPPassword, AMQPUsername, Enabled, Password, Username, VcloudIp){
        /** @type {string} */
        this.AMQPPassword = AMQPPassword;
        /** @type {string} */
        this.AMQPUsername = AMQPUsername;
        /** @type {boolean} */
        this.Enabled = Enabled;
        /** @type {string} */
        this.Password = Password;
        /** @type {string} */
        this.Username = Username;
        /** @type {string} */
        this.VcloudIp = VcloudIp;
    };
    /**
     * @constructor
     */
    vos.VCDVAppIdentifier = function(){
    };
    /**
     * @param {vos.VCDNetworkFenceMode} [FenceMode] {@link vos.VCDNetworkFenceMode}
     * @param {vos.VCDNetworkIpScope} [IpScope] {@link vos.VCDNetworkIpScope}
     * @param {string} [NetworkName] {@link string}
     * @param {vos.VCDOrgNetworkIdentifier} [RecoveryOrganizationVCDOrgNetwork] {@link vos.VCDOrgNetworkIdentifier}
     * @param {vos.VCDNetworkIpScope[]} [IpScopes] {@link vos.VCDNetworkIpScope[]}
     * @param {vos.VCDOrgNetworkIdentifier} [OrgNetwork] {@link vos.VCDOrgNetworkIdentifier}
     * @param {vos.VCDNetworkFeatureNatService} [NatService] {@link vos.VCDNetworkFeatureNatService}
     * @constructor
     */
    vos.VCDVAppNetworkInfo = function(FenceMode, IpScope, NetworkName, RecoveryOrganizationVCDOrgNetwork, IpScopes, OrgNetwork, NatService){
        /** @type {vos.VCDNetworkFenceMode} */
        this.FenceMode = FenceMode;
        /** @type {vos.VCDNetworkIpScope} */
        this.IpScope = IpScope;
        /** @type {string} */
        this.NetworkName = NetworkName;
        /** @type {vos.VCDOrgNetworkIdentifier} */
        this.RecoveryOrganizationVCDOrgNetwork = RecoveryOrganizationVCDOrgNetwork;
        /** @type {vos.VCDNetworkIpScope[]} */
        this.IpScopes = IpScopes;
        /** @type {vos.VCDOrgNetworkIdentifier} */
        this.OrgNetwork = OrgNetwork;
        /** @type {vos.VCDNetworkFeatureNatService} */
        this.NatService = NatService;
    };
    /**
     * @param {string} [OwningVirtualDataCenterName] {@link string}
     * @param {number} [ProvisionedSizeInMB] {@link number}
     * @param {vos.VCDVappVisualObject} [Vapp] {@link vos.VCDVappVisualObject}
     * @constructor
     */
    vos.VCDVappTableEntry = function(OwningVirtualDataCenterName, ProvisionedSizeInMB, Vapp){
        /** @type {string} */
        this.OwningVirtualDataCenterName = OwningVirtualDataCenterName;
        /** @type {number} */
        this.ProvisionedSizeInMB = ProvisionedSizeInMB;
        /** @type {vos.VCDVappVisualObject} */
        this.Vapp = Vapp;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.ProtectedVCDVappVpgsInfoVisualObject} [ProtectedVCDVappVpgsInfo] {@link vos.ProtectedVCDVappVpgsInfoVisualObject}
     * @param {vos.VCDVAppIdentifier} [VcdVappIdentifier] {@link vos.VCDVAppIdentifier}
     * @constructor
     */
    vos.VCDVappVisualObject = function(DisplayName, ProtectedVCDVappVpgsInfo, VcdVappIdentifier){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.ProtectedVCDVappVpgsInfoVisualObject} */
        this.ProtectedVCDVappVpgsInfo = ProtectedVCDVappVpgsInfo;
        /** @type {vos.VCDVAppIdentifier} */
        this.VcdVappIdentifier = VcdVappIdentifier;
    };
    /**
     * @constructor
     */
    vos.VCDVirtualDatacenterIdentifier = function(){
    };
    /**
     * @constructor
     */
    vos.VCDVirtualDatacenterStorageProfileIdentifier = function(){
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {boolean} [Enabled] {@link boolean}
     * @param {vos.VCDVirtualDatacenterStorageProfileIdentifier} [Id] {@link vos.VCDVirtualDatacenterStorageProfileIdentifier}
     * @constructor
     */
    vos.VCDVirtualDatacenterStorageProfileVisualObject = function(DisplayName, Enabled, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {boolean} */
        this.Enabled = Enabled;
        /** @type {vos.VCDVirtualDatacenterStorageProfileIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {vos.VCDNetworkIpMode} [IPMode] {@link vos.VCDNetworkIpMode}
     * @param {string} [IpAddress] {@link string}
     * @param {boolean} [IsConnected] {@link boolean}
     * @param {boolean} [IsPrimary] {@link boolean}
     * @param {string} [MacAddress] {@link string}
     * @param {vos.VirtualVdcOrgNetworkVisualObject} [OrgVdcNetwork] {@link vos.VirtualVdcOrgNetworkVisualObject}
     * @constructor
     */
    vos.VcdVNicRestoreConfigurationVisualObject = function(IPMode, IpAddress, IsConnected, IsPrimary, MacAddress, OrgVdcNetwork){
        /** @type {vos.VCDNetworkIpMode} */
        this.IPMode = IPMode;
        /** @type {string} */
        this.IpAddress = IpAddress;
        /** @type {boolean} */
        this.IsConnected = IsConnected;
        /** @type {boolean} */
        this.IsPrimary = IsPrimary;
        /** @type {string} */
        this.MacAddress = MacAddress;
        /** @type {vos.VirtualVdcOrgNetworkVisualObject} */
        this.OrgVdcNetwork = OrgVdcNetwork;
    };
    /**
     * @param {vos.PotentialDatastoreVisualObject[]} [Datastores] {@link vos.PotentialDatastoreVisualObject[]}
     * @param {vos.VmFolderVisualObject[]} [Folders] {@link vos.VmFolderVisualObject[]}
     * @param {vos.VirtualNetworkVisualObject[]} [Networks] {@link vos.VirtualNetworkVisualObject[]}
     * @constructor
     */
    vos.VCenterPotentialRestoreSecondaryEntities = function(Datastores, Folders, Networks){
        /** @type {vos.PotentialDatastoreVisualObject[]} */
        this.Datastores = Datastores;
        /** @type {vos.VmFolderVisualObject[]} */
        this.Folders = Folders;
        /** @type {vos.VirtualNetworkVisualObject[]} */
        this.Networks = Networks;
    };
    /**
     * @param {vos.RestoreIpConfiguration} [IPConfiguration] {@link vos.RestoreIpConfiguration}
     * @param {boolean} [IsIPConfigurationEnabled] {@link boolean}
     * @param {boolean} [IsNewMacAddress] {@link boolean}
     * @param {vos.VirtualNetworkVisualObject} [Network] {@link vos.VirtualNetworkVisualObject}
     * @constructor
     */
    vos.VCenterVNicRestoreConfigurationVisualObject = function(IPConfiguration, IsIPConfigurationEnabled, IsNewMacAddress, Network){
        /** @type {vos.RestoreIpConfiguration} */
        this.IPConfiguration = IPConfiguration;
        /** @type {boolean} */
        this.IsIPConfigurationEnabled = IsIPConfigurationEnabled;
        /** @type {boolean} */
        this.IsNewMacAddress = IsNewMacAddress;
        /** @type {vos.VirtualNetworkVisualObject} */
        this.Network = Network;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VCDVirtualDatacenterIdentifier} [Id] {@link vos.VCDVirtualDatacenterIdentifier}
     * @constructor
     */
    vos.VirtualDatacenterVisualObject = function(DisplayName, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VCDVirtualDatacenterIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {string} [Description] {@link string}
     * @param {number} [Progress] {@link number}
     * @constructor
     */
    vos.VirtualMachineAddProgress = function(Description, Progress){
        /** @type {string} */
        this.Description = Description;
        /** @type {number} */
        this.Progress = Progress;
    };
    /**
     * @param {vos.VirtualMachineAddProgress} [AddInProgress] {@link vos.VirtualMachineAddProgress}
     * @param {string} [BannedVirtualMachineReason] {@link string}
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VMIdentifier} [Identifier] {@link vos.VMIdentifier}
     * @param {boolean} [IsAnySiteAvailableForReplication] {@link boolean}
     * @param {boolean} [IsBannedVirtualMachine] {@link boolean}
     * @param {boolean} [IsManageSiteSettingsEnabled] {@link boolean}
     * @param {boolean} [IsPartOfProtectionGroup] {@link boolean}
     * @param {boolean} [IsRemoteSiteConnected] {@link boolean}
     * @param {vos.VAppIdentifier} [OwnerVapp] {@link vos.VAppIdentifier}
     * @param {vos.HostIdentifier} [OwningHostForVra] {@link vos.HostIdentifier}
     * @param {vos.VPGDetailsScreenVisualObject} [ProtectionGroupDetails] {@link vos.VPGDetailsScreenVisualObject}
     * @param {vos.VmQuickStartInfo} [QuickStartButtonsStatus] {@link vos.VmQuickStartInfo}
     * @constructor
     */
    vos.VirtualMachineContextInfo = function(AddInProgress, BannedVirtualMachineReason, DisplayName, Identifier, IsAnySiteAvailableForReplication, IsBannedVirtualMachine, IsManageSiteSettingsEnabled, IsPartOfProtectionGroup, IsRemoteSiteConnected, OwnerVapp, OwningHostForVra, ProtectionGroupDetails, QuickStartButtonsStatus){
        /** @type {vos.VirtualMachineAddProgress} */
        this.AddInProgress = AddInProgress;
        /** @type {string} */
        this.BannedVirtualMachineReason = BannedVirtualMachineReason;
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VMIdentifier} */
        this.Identifier = Identifier;
        /** @type {boolean} */
        this.IsAnySiteAvailableForReplication = IsAnySiteAvailableForReplication;
        /** @type {boolean} */
        this.IsBannedVirtualMachine = IsBannedVirtualMachine;
        /** @type {boolean} */
        this.IsManageSiteSettingsEnabled = IsManageSiteSettingsEnabled;
        /** @type {boolean} */
        this.IsPartOfProtectionGroup = IsPartOfProtectionGroup;
        /** @type {boolean} */
        this.IsRemoteSiteConnected = IsRemoteSiteConnected;
        /** @type {vos.VAppIdentifier} */
        this.OwnerVapp = OwnerVapp;
        /** @type {vos.HostIdentifier} */
        this.OwningHostForVra = OwningHostForVra;
        /** @type {vos.VPGDetailsScreenVisualObject} */
        this.ProtectionGroupDetails = ProtectionGroupDetails;
        /** @type {vos.VmQuickStartInfo} */
        this.QuickStartButtonsStatus = QuickStartButtonsStatus;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VMIdentifier} [Id] {@link vos.VMIdentifier}
     * @constructor
     */
    vos.VirtualMachineVisualObject = function(DisplayName, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VMIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.NetworkIdentifier} [Id] {@link vos.NetworkIdentifier}
     * @constructor
     */
    vos.VirtualNetworkVisualObject = function(DisplayName, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.NetworkIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {string} [Identifier] {@link string}
     * @constructor
     */
    vos.VirtualPrivateCloudIdentifier = function(Identifier){
        /** @type {string} */
        this.Identifier = Identifier;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VCDOrgNetworkIdentifier} [Id] {@link vos.VCDOrgNetworkIdentifier}
     * @constructor
     */
    vos.VirtualVdcOrgNetworkVisualObject = function(DisplayName, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VCDOrgNetworkIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {number} [FullVolumes] {@link number}
     * @param {string} [Status] {@link string}
     * @param {number} [TotalVolumes] {@link number}
     * @param {string} [VmName] {@link string}
     * @constructor
     */
    vos.VmBackupInstanceDetails = function(FullVolumes, Status, TotalVolumes, VmName){
        /** @type {number} */
        this.FullVolumes = FullVolumes;
        /** @type {string} */
        this.Status = Status;
        /** @type {number} */
        this.TotalVolumes = TotalVolumes;
        /** @type {string} */
        this.VmName = VmName;
    };
    /**
     * @param {vos.VpgBackupJobInfoSummaryVisualObject} [BackupJobContext] {@link vos.VpgBackupJobInfoSummaryVisualObject}
     * @param {boolean} [IsAbortBackupEnabled] {@link boolean}
     * @param {boolean} [IsBackupEnabled] {@link boolean}
     * @param {number} [LastBackupSizeInMb] {@link number}
     * @param {string} [VmName] {@link string}
     * @param {number} [VmSizeInMB] {@link number}
     * @param {number} [VolumesInVm] {@link number}
     * @constructor
     */
    vos.VmBackupJobInfoSummaryVisualObject = function(BackupJobContext, IsAbortBackupEnabled, IsBackupEnabled, LastBackupSizeInMb, VmName, VmSizeInMB, VolumesInVm){
        /** @type {vos.VpgBackupJobInfoSummaryVisualObject} */
        this.BackupJobContext = BackupJobContext;
        /** @type {boolean} */
        this.IsAbortBackupEnabled = IsAbortBackupEnabled;
        /** @type {boolean} */
        this.IsBackupEnabled = IsBackupEnabled;
        /** @type {number} */
        this.LastBackupSizeInMb = LastBackupSizeInMb;
        /** @type {string} */
        this.VmName = VmName;
        /** @type {number} */
        this.VmSizeInMB = VmSizeInMB;
        /** @type {number} */
        this.VolumesInVm = VolumesInVm;
    };
    /**
     * @param {vos.VmBackupJobInfoSummaryVisualObject[]} [VmBackupJobInfoSummaryVisualObjects] {@link vos.VmBackupJobInfoSummaryVisualObject[]}
     * @constructor
     */
    vos.VmBackupScreenVisualObject = function(VmBackupJobInfoSummaryVisualObjects){
        /** @type {vos.VmBackupJobInfoSummaryVisualObject[]} */
        this.VmBackupJobInfoSummaryVisualObjects = VmBackupJobInfoSummaryVisualObjects;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.FolderIdentifier} [Identifier] {@link vos.FolderIdentifier}
     * @param {vos.VMFolderTreeVisualObject[]} [SubFolders] {@link vos.VMFolderTreeVisualObject[]}
     * @param {vos.VappTreeVisualObject[]} [Vapps] {@link vos.VappTreeVisualObject[]}
     * @param {vos.VirtualMachineVisualObject[]} [VirtualMachines] {@link vos.VirtualMachineVisualObject[]}
     * @constructor
     */
    vos.VMFolderTreeVisualObject = function(DisplayName, Identifier, SubFolders, Vapps, VirtualMachines){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.FolderIdentifier} */
        this.Identifier = Identifier;
        /** @type {vos.VMFolderTreeVisualObject[]} */
        this.SubFolders = SubFolders;
        /** @type {vos.VappTreeVisualObject[]} */
        this.Vapps = Vapps;
        /** @type {vos.VirtualMachineVisualObject[]} */
        this.VirtualMachines = VirtualMachines;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.FolderIdentifier} [Id] {@link vos.FolderIdentifier}
     * @constructor
     */
    vos.VmFolderVisualObject = function(DisplayName, Id){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.FolderIdentifier} */
        this.Id = Id;
    };
    /**
     * @param {string} [InternalVmName] {@link string}
     * @param {vos.ServerIdentifier} [ServerIdentifier] {@link vos.ServerIdentifier}
     * @constructor
     */
    vos.VMIdentifier = function(InternalVmName, ServerIdentifier){
        /** @type {string} */
        this.InternalVmName = InternalVmName;
        /** @type {vos.ServerIdentifier} */
        this.ServerIdentifier = ServerIdentifier;
    };
    /**
     * @constructor
     */
    vos.VmListBackupRelatedData = function(){
    };
    /**
     * @param {number} [ActualRPO] {@link number}
     * @param {enums.ProtectionGroupAlertStatus} [AlertStatus] {@link enums.ProtectionGroupAlertStatus}
     * @param {vos.AlertsTipVisualObject} [AlertTips] {@link vos.AlertsTipVisualObject}
     * @param {vos.VmListBackupRelatedData} [BackupRelatedData] {@link vos.VmListBackupRelatedData}
     * @param {number} [ConfiguredRPO] {@link number}
     * @param {string} [CustomerName] {@link string}
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {vos.VpgEntities} [Entities] {@link vos.VpgEntities}
     * @param {number} [IOPs] {@link number}
     * @param {number} [IncomingThroughputInMb] {@link number}
     * @param {boolean} [IsFlrEnabled] {@link boolean}
     * @param {date} [LastTest] {@link date}
     * @param {number} [OutgoingBandWidth] {@link number}
     * @param {vos.OwnersIdentifier} [OwnersId] {@link vos.OwnersIdentifier}
     * @param {enums.ProtectionGroupPriority} [Priority] {@link enums.ProtectionGroupPriority}
     * @param {vos.ProtectedVmVpgsInfoVisualObject} [ProtectedVmVpgsInfoVisualObject] {@link vos.ProtectedVmVpgsInfoVisualObject}
     * @param {number} [ProvisionedStorageInMB] {@link number}
     * @param {enums.VPGRetentionPolicyType} [RetentionPolicy] {@link enums.VPGRetentionPolicyType}
     * @param {vos.SiteIdentifier} [SourceSiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [SourceSiteName] {@link string}
     * @param {vos.VPGDetailsScreenState} [State] {@link vos.VPGDetailsScreenState}
     * @param {vos.SiteIdentifier} [TargetSiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [TargetSiteName] {@link string}
     * @param {number} [UsedStorageInMB] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [VPGIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [VPGName] {@link string}
     * @param {vos.VMIdentifier} [VirtualMachineIdentifier] {@link vos.VMIdentifier}
     * @param {string} [VirtualMachineName] {@link string}
     * @param {vos.VPGDetailsVirtualMachineVolume[]} [Volumes] {@link vos.VPGDetailsVirtualMachineVolume[]}
     * @param {vos.ZertoOrganizationIdentifier} [ZorgId] {@link vos.ZertoOrganizationIdentifier}
     * @constructor
     */
    vos.VMListScreenItem = function(ActualRPO, AlertStatus, AlertTips, BackupRelatedData, ConfiguredRPO, CustomerName, Direction, Entities, IOPs, IncomingThroughputInMb, IsFlrEnabled, LastTest, OutgoingBandWidth, OwnersId, Priority, ProtectedVmVpgsInfoVisualObject, ProvisionedStorageInMB, RetentionPolicy, SourceSiteIdentifier, SourceSiteName, State, TargetSiteIdentifier, TargetSiteName, UsedStorageInMB, VPGIdentifier, VPGName, VirtualMachineIdentifier, VirtualMachineName, Volumes, ZorgId){
        /** @type {number} */
        this.ActualRPO = ActualRPO;
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.AlertStatus = AlertStatus;
        /** @type {vos.AlertsTipVisualObject} */
        this.AlertTips = AlertTips;
        /** @type {vos.VmListBackupRelatedData} */
        this.BackupRelatedData = BackupRelatedData;
        /** @type {number} */
        this.ConfiguredRPO = ConfiguredRPO;
        /** @type {string} */
        this.CustomerName = CustomerName;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {vos.VpgEntities} */
        this.Entities = Entities;
        /** @type {number} */
        this.IOPs = IOPs;
        /** @type {number} */
        this.IncomingThroughputInMb = IncomingThroughputInMb;
        /** @type {boolean} */
        this.IsFlrEnabled = IsFlrEnabled;
        /** @type {date} */
        this.LastTest = LastTest;
        /** @type {number} */
        this.OutgoingBandWidth = OutgoingBandWidth;
        /** @type {vos.OwnersIdentifier} */
        this.OwnersId = OwnersId;
        /** @type {enums.ProtectionGroupPriority} */
        this.Priority = Priority;
        /** @type {vos.ProtectedVmVpgsInfoVisualObject} */
        this.ProtectedVmVpgsInfoVisualObject = ProtectedVmVpgsInfoVisualObject;
        /** @type {number} */
        this.ProvisionedStorageInMB = ProvisionedStorageInMB;
        /** @type {enums.VPGRetentionPolicyType} */
        this.RetentionPolicy = RetentionPolicy;
        /** @type {vos.SiteIdentifier} */
        this.SourceSiteIdentifier = SourceSiteIdentifier;
        /** @type {string} */
        this.SourceSiteName = SourceSiteName;
        /** @type {vos.VPGDetailsScreenState} */
        this.State = State;
        /** @type {vos.SiteIdentifier} */
        this.TargetSiteIdentifier = TargetSiteIdentifier;
        /** @type {string} */
        this.TargetSiteName = TargetSiteName;
        /** @type {number} */
        this.UsedStorageInMB = UsedStorageInMB;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.VPGIdentifier = VPGIdentifier;
        /** @type {string} */
        this.VPGName = VPGName;
        /** @type {vos.VMIdentifier} */
        this.VirtualMachineIdentifier = VirtualMachineIdentifier;
        /** @type {string} */
        this.VirtualMachineName = VirtualMachineName;
        /** @type {vos.VPGDetailsVirtualMachineVolume[]} */
        this.Volumes = Volumes;
        /** @type {vos.ZertoOrganizationIdentifier} */
        this.ZorgId = ZorgId;
    };
    /**
     * @param {vos.SiteDetailsVisualObject} [SiteDetails] {@link vos.SiteDetailsVisualObject}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @param {vos.VMListScreenItem[]} [VirtualMachines] {@link vos.VMListScreenItem[]}
     * @constructor
     */
    vos.VMListScreenVisualObject = function(SiteDetails, State, VirtualMachines){
        /** @type {vos.SiteDetailsVisualObject} */
        this.SiteDetails = SiteDetails;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
        /** @type {vos.VMListScreenItem[]} */
        this.VirtualMachines = VirtualMachines;
    };
    /**
     * @param {boolean} [CanAddToExistingVpg] {@link boolean}
     * @param {boolean} [CanAddVCDReplicationDestinations] {@link boolean}
     * @param {boolean} [CanCreateNewVpg] {@link boolean}
     * @param {boolean} [CanProtectStandalone] {@link boolean}
     * @constructor
     */
    vos.VmQuickStartInfo = function(CanAddToExistingVpg, CanAddVCDReplicationDestinations, CanCreateNewVpg, CanProtectStandalone){
        /** @type {boolean} */
        this.CanAddToExistingVpg = CanAddToExistingVpg;
        /** @type {boolean} */
        this.CanAddVCDReplicationDestinations = CanAddVCDReplicationDestinations;
        /** @type {boolean} */
        this.CanCreateNewVpg = CanCreateNewVpg;
        /** @type {boolean} */
        this.CanProtectStandalone = CanProtectStandalone;
    };
    /**
     * @param {vos.ComputeResourceVisualObject} [ComputeResource] {@link vos.ComputeResourceVisualObject}
     * @param {vos.DatastoreVisualObject} [Datastore] {@link vos.DatastoreVisualObject}
     * @param {number} [FullVolumes] {@link number}
     * @param {boolean} [IsPowerOn] {@link boolean}
     * @param {string} [Name] {@link string}
     * @param {string} [Status] {@link string}
     * @param {vos.VCDVirtualDatacenterStorageProfileVisualObject} [StorageProfile] {@link vos.VCDVirtualDatacenterStorageProfileVisualObject}
     * @param {number} [TotalVolumes] {@link number}
     * @param {vos.VmFolderVisualObject} [VMFolder] {@link vos.VmFolderVisualObject}
     * @param {vos.VMIdentifier} [VMIdentifier] {@link vos.VMIdentifier}
     * @param {vos.VNicRestoreConfigurationVisualObject[]} [VNics] {@link vos.VNicRestoreConfigurationVisualObject[]}
     * @param {vos.VolumeRestoreConfigurationVisualObject[]} [Volumes] {@link vos.VolumeRestoreConfigurationVisualObject[]}
     * @constructor
     */
    vos.VmRestoreConfigurationVisualObject = function(ComputeResource, Datastore, FullVolumes, IsPowerOn, Name, Status, StorageProfile, TotalVolumes, VMFolder, VMIdentifier, VNics, Volumes){
        /** @type {vos.ComputeResourceVisualObject} */
        this.ComputeResource = ComputeResource;
        /** @type {vos.DatastoreVisualObject} */
        this.Datastore = Datastore;
        /** @type {number} */
        this.FullVolumes = FullVolumes;
        /** @type {boolean} */
        this.IsPowerOn = IsPowerOn;
        /** @type {string} */
        this.Name = Name;
        /** @type {string} */
        this.Status = Status;
        /** @type {vos.VCDVirtualDatacenterStorageProfileVisualObject} */
        this.StorageProfile = StorageProfile;
        /** @type {number} */
        this.TotalVolumes = TotalVolumes;
        /** @type {vos.VmFolderVisualObject} */
        this.VMFolder = VMFolder;
        /** @type {vos.VMIdentifier} */
        this.VMIdentifier = VMIdentifier;
        /** @type {vos.VNicRestoreConfigurationVisualObject[]} */
        this.VNics = VNics;
        /** @type {vos.VolumeRestoreConfigurationVisualObject[]} */
        this.Volumes = Volumes;
    };
    /**
     * @param {string} [InstanceUuid] {@link string}
     * @param {string} [Uuid] {@link string}
     * @constructor
     */
    vos.VMUuids = function(InstanceUuid, Uuid){
        /** @type {string} */
        this.InstanceUuid = InstanceUuid;
        /** @type {string} */
        this.Uuid = Uuid;
    };
    /**
     * @param {string} [Name] {@link string}
     * @constructor
     */
    vos.VNicIdentifier = function(Name){
        /** @type {string} */
        this.Name = Name;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.VCenterVNicRestoreConfigurationVisualObject} [VCenterVNicRestoreConfiguration] {@link vos.VCenterVNicRestoreConfigurationVisualObject}
     * @param {vos.VNicIdentifier} [VNicIdentifier] {@link vos.VNicIdentifier}
     * @param {vos.VcdVNicRestoreConfigurationVisualObject} [VcdVNicRestoreConfiguration] {@link vos.VcdVNicRestoreConfigurationVisualObject}
     * @constructor
     */
    vos.VNicRestoreConfigurationVisualObject = function(DisplayName, VCenterVNicRestoreConfiguration, VNicIdentifier, VcdVNicRestoreConfiguration){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.VCenterVNicRestoreConfigurationVisualObject} */
        this.VCenterVNicRestoreConfiguration = VCenterVNicRestoreConfiguration;
        /** @type {vos.VNicIdentifier} */
        this.VNicIdentifier = VNicIdentifier;
        /** @type {vos.VcdVNicRestoreConfigurationVisualObject} */
        this.VcdVNicRestoreConfiguration = VcdVNicRestoreConfiguration;
    };
    /**
     * @param {vos.DiskLocationParams} [DiskLocationParams] {@link vos.DiskLocationParams}
     * @param {vos.VolumeSettings} [Settings] {@link vos.VolumeSettings}
     * @constructor
     */
    vos.VolumeManagementSettings = function(DiskLocationParams, Settings){
        /** @type {vos.DiskLocationParams} */
        this.DiskLocationParams = DiskLocationParams;
        /** @type {vos.VolumeSettings} */
        this.Settings = Settings;
    };
    /**
     * @param {vos.DatastoreVolumeReplicationDestination} [Datastore] {@link vos.DatastoreVolumeReplicationDestination}
     * @param {vos.ExistingDiskVolumeReplicationDestination} [ExistingDisk] {@link vos.ExistingDiskVolumeReplicationDestination}
     * @param {vos.RawDeviceMappingVolumeReplicationDestination} [RawDevice] {@link vos.RawDeviceMappingVolumeReplicationDestination}
     * @param {vos.StoragePodVolumeReplicationDestination} [StoragePod] {@link vos.StoragePodVolumeReplicationDestination}
     * @param {vos.VCDDatastoreVolumeReplicationDestination} [VCDDatastore] {@link vos.VCDDatastoreVolumeReplicationDestination}
     * @constructor
     */
    vos.VolumeReplicationDestination = function(Datastore, ExistingDisk, RawDevice, StoragePod, VCDDatastore){
        /** @type {vos.DatastoreVolumeReplicationDestination} */
        this.Datastore = Datastore;
        /** @type {vos.ExistingDiskVolumeReplicationDestination} */
        this.ExistingDisk = ExistingDisk;
        /** @type {vos.RawDeviceMappingVolumeReplicationDestination} */
        this.RawDevice = RawDevice;
        /** @type {vos.StoragePodVolumeReplicationDestination} */
        this.StoragePod = StoragePod;
        /** @type {vos.VCDDatastoreVolumeReplicationDestination} */
        this.VCDDatastore = VCDDatastore;
    };
    /**
     * @param {vos.VolumeRestoreDestinationVisualObject} [Destination] {@link vos.VolumeRestoreDestinationVisualObject}
     * @param {vos.DiskLocationParams} [DiskLocationParams] {@link vos.DiskLocationParams}
     * @param {boolean} [IsThinEnabled] {@link boolean}
     * @param {string} [Path] {@link string}
     * @constructor
     */
    vos.VolumeRestoreConfigurationVisualObject = function(Destination, DiskLocationParams, IsThinEnabled, Path){
        /** @type {vos.VolumeRestoreDestinationVisualObject} */
        this.Destination = Destination;
        /** @type {vos.DiskLocationParams} */
        this.DiskLocationParams = DiskLocationParams;
        /** @type {boolean} */
        this.IsThinEnabled = IsThinEnabled;
        /** @type {string} */
        this.Path = Path;
    };
    /**
     * @param {vos.DatastoreVolumeRestoreDestinationVisualObject} [Datastore] {@link vos.DatastoreVolumeRestoreDestinationVisualObject}
     * @constructor
     */
    vos.VolumeRestoreDestinationVisualObject = function(Datastore){
        /** @type {vos.DatastoreVolumeRestoreDestinationVisualObject} */
        this.Datastore = Datastore;
    };
    /**
     * @param {boolean} [IsSwap] {@link boolean}
     * @param {vos.VolumeReplicationDestination} [VolumeReplicationDestination] {@link vos.VolumeReplicationDestination}
     * @constructor
     */
    vos.VolumeSettings = function(IsSwap, VolumeReplicationDestination){
        /** @type {boolean} */
        this.IsSwap = IsSwap;
        /** @type {vos.VolumeReplicationDestination} */
        this.VolumeReplicationDestination = VolumeReplicationDestination;
    };
    /**
     * @param {boolean} [IsResumeEnabled] {@link boolean}
     * @param {boolean} [IsVpgNowPaused] {@link boolean}
     * @param {vos.VpgActiveProcesses_PausedVpg} [Paused] {@link vos.VpgActiveProcesses_PausedVpg}
     * @param {vos.VpgActiveProcesses_ExecutingOffsiteBackup} [RunningBackup] {@link vos.VpgActiveProcesses_ExecutingOffsiteBackup}
     * @param {vos.VpgActiveProcesses_ExecutingClone} [RunningClone] {@link vos.VpgActiveProcesses_ExecutingClone}
     * @param {vos.VpgActiveProcesses_FailOverTest} [RunningFailOverTest] {@link vos.VpgActiveProcesses_FailOverTest}
     * @param {vos.VPGTimebombInfo} [TimebombInfo] {@link vos.VPGTimebombInfo}
     * @param {vos.VpgActiveProcesses_UpdatingOfVpg} [VpgUpdate] {@link vos.VpgActiveProcesses_UpdatingOfVpg}
     * @constructor
     */
    vos.VpgActiveProcesses = function(IsResumeEnabled, IsVpgNowPaused, Paused, RunningBackup, RunningClone, RunningFailOverTest, TimebombInfo, VpgUpdate){
        /** @type {boolean} */
        this.IsResumeEnabled = IsResumeEnabled;
        /** @type {boolean} */
        this.IsVpgNowPaused = IsVpgNowPaused;
        /** @type {vos.VpgActiveProcesses_PausedVpg} */
        this.Paused = Paused;
        /** @type {vos.VpgActiveProcesses_ExecutingOffsiteBackup} */
        this.RunningBackup = RunningBackup;
        /** @type {vos.VpgActiveProcesses_ExecutingClone} */
        this.RunningClone = RunningClone;
        /** @type {vos.VpgActiveProcesses_FailOverTest} */
        this.RunningFailOverTest = RunningFailOverTest;
        /** @type {vos.VPGTimebombInfo} */
        this.TimebombInfo = TimebombInfo;
        /** @type {vos.VpgActiveProcesses_UpdatingOfVpg} */
        this.VpgUpdate = VpgUpdate;
    };
    /**
     * @param {boolean} [StopEnabled] {@link boolean}
     * @param {number} [ProgressValue] {@link number}
     * @constructor
     */
    vos.VpgActiveProcesses_ExecutingClone = function(StopEnabled, ProgressValue){
        /** @type {boolean} */
        this.StopEnabled = StopEnabled;
        /** @type {number} */
        this.ProgressValue = ProgressValue;
    };
    /**
     * @param {number} [ProgressValue] {@link number}
     * @param {boolean} [StopEnabled] {@link boolean}
     * @constructor
     */
    vos.VpgActiveProcesses_ExecutingOffsiteBackup = function(ProgressValue, StopEnabled){
        /** @type {number} */
        this.ProgressValue = ProgressValue;
        /** @type {boolean} */
        this.StopEnabled = StopEnabled;
    };
    /**
     * @param {number} [ProgressValue] {@link number}
     * @param {enums.VpgActiveProcesses_FailOverTest_TestStage} [Stage] {@link enums.VpgActiveProcesses_FailOverTest_TestStage}
     * @param {boolean} [StopEnabled] {@link boolean}
     * @constructor
     */
    vos.VpgActiveProcesses_FailOverTest = function(ProgressValue, Stage, StopEnabled){
        /** @type {number} */
        this.ProgressValue = ProgressValue;
        /** @type {enums.VpgActiveProcesses_FailOverTest_TestStage} */
        this.Stage = Stage;
        /** @type {boolean} */
        this.StopEnabled = StopEnabled;
    };
    /**
     * @param {number} [ProgressValue] {@link number}
     * @param {boolean} [ResumeEnabled] {@link boolean}
     * @param {enums.VpgActiveProcesses_PausedVpg_PauseStage} [Stage] {@link enums.VpgActiveProcesses_PausedVpg_PauseStage}
     * @constructor
     */
    vos.VpgActiveProcesses_PausedVpg = function(ProgressValue, ResumeEnabled, Stage){
        /** @type {number} */
        this.ProgressValue = ProgressValue;
        /** @type {boolean} */
        this.ResumeEnabled = ResumeEnabled;
        /** @type {enums.VpgActiveProcesses_PausedVpg_PauseStage} */
        this.Stage = Stage;
    };
    /**
     * @param {number} [ProgressValue] {@link number}
     * @constructor
     */
    vos.VpgActiveProcesses_UpdatingOfVpg = function(ProgressValue){
        /** @type {number} */
        this.ProgressValue = ProgressValue;
    };
    /**
     * @param {string} [BannedReason] {@link string}
     * @param {vos.SiteDetailsVisualObject} [Details] {@link vos.SiteDetailsVisualObject}
     * @param {vos.EventVisualObject[]} [Events] {@link vos.EventVisualObject[]}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.VpgActivityScreenVisualObject = function(BannedReason, Details, Events, State){
        /** @type {string} */
        this.BannedReason = BannedReason;
        /** @type {vos.SiteDetailsVisualObject} */
        this.Details = Details;
        /** @type {vos.EventVisualObject[]} */
        this.Events = Events;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {vos.BackupJobIdentifier} [BackupJobIdentifier] {@link vos.BackupJobIdentifier}
     * @param {vos.BackupTargetIdentifier} [BackupTargetIdentifier] {@link vos.BackupTargetIdentifier}
     * @param {boolean} [Compressed] {@link boolean}
     * @param {number} [FullVMs] {@link number}
     * @param {number} [FullVolumes] {@link number}
     * @param {boolean} [IsRestoreEnabled] {@link boolean}
     * @param {date} [PointInTime] {@link date}
     * @param {vos.PotentialRestoreType[]} [PotentialRestoreTypes] {@link vos.PotentialRestoreType[]}
     * @param {string} [ProtectionGroupName] {@link string}
     * @param {string} [RepositoryName] {@link string}
     * @param {string} [RestoreSiteName] {@link string}
     * @param {vos.SiteIdentifier} [SiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [Status] {@link string}
     * @param {number} [TotalVMs] {@link number}
     * @param {number} [TotalVolumes] {@link number}
     * @param {vos.VmBackupInstanceDetails[]} [VMs] {@link vos.VmBackupInstanceDetails[]}
     * @param {string} [ZorgName] {@link string}
     * @constructor
     */
    vos.VpgBackupInstanceDetails = function(BackupJobIdentifier, BackupTargetIdentifier, Compressed, FullVMs, FullVolumes, IsRestoreEnabled, PointInTime, PotentialRestoreTypes, ProtectionGroupName, RepositoryName, RestoreSiteName, SiteIdentifier, Status, TotalVMs, TotalVolumes, VMs, ZorgName){
        /** @type {vos.BackupJobIdentifier} */
        this.BackupJobIdentifier = BackupJobIdentifier;
        /** @type {vos.BackupTargetIdentifier} */
        this.BackupTargetIdentifier = BackupTargetIdentifier;
        /** @type {boolean} */
        this.Compressed = Compressed;
        /** @type {number} */
        this.FullVMs = FullVMs;
        /** @type {number} */
        this.FullVolumes = FullVolumes;
        /** @type {boolean} */
        this.IsRestoreEnabled = IsRestoreEnabled;
        /** @type {date} */
        this.PointInTime = PointInTime;
        /** @type {vos.PotentialRestoreType[]} */
        this.PotentialRestoreTypes = PotentialRestoreTypes;
        /** @type {string} */
        this.ProtectionGroupName = ProtectionGroupName;
        /** @type {string} */
        this.RepositoryName = RepositoryName;
        /** @type {string} */
        this.RestoreSiteName = RestoreSiteName;
        /** @type {vos.SiteIdentifier} */
        this.SiteIdentifier = SiteIdentifier;
        /** @type {string} */
        this.Status = Status;
        /** @type {number} */
        this.TotalVMs = TotalVMs;
        /** @type {number} */
        this.TotalVolumes = TotalVolumes;
        /** @type {vos.VmBackupInstanceDetails[]} */
        this.VMs = VMs;
        /** @type {string} */
        this.ZorgName = ZorgName;
    };
    /**
     * @param {number} [BackupProgress] {@link number}
     * @param {enums.VpgBackupJobSummaryStatusVisualObject} [BackupStatus] {@link enums.VpgBackupJobSummaryStatusVisualObject}
     * @param {boolean} [IsAbortBackupEnabled] {@link boolean}
     * @param {boolean} [IsBackupEnabled] {@link boolean}
     * @param {string} [JobName] {@link string}
     * @param {number} [JobSizeInMB] {@link number}
     * @param {number} [LastBackupSizeInMb] {@link number}
     * @param {date} [LastFullBackup] {@link date}
     * @param {enums.VpgBackupLastRunResultVisualObject} [LastRunResult] {@link enums.VpgBackupLastRunResultVisualObject}
     * @param {date} [NextScheduledBackup] {@link date}
     * @param {number} [NonFailingRuns] {@link number}
     * @param {number} [NumberOfVms] {@link number}
     * @param {number} [NumberOfVolumes] {@link number}
     * @param {string} [RepositoryName] {@link string}
     * @param {date} [StartTime] {@link date}
     * @param {date} [StartTimeOfLastRun] {@link date}
     * @param {number} [TotalRuns] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [VpgIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [VpgProtectedSiteName] {@link string}
     * @param {string} [VpgRecoverySiteName] {@link string}
     * @param {string} [ZorgName] {@link string}
     * @constructor
     */
    vos.VpgBackupJobInfoSummaryVisualObject = function(BackupProgress, BackupStatus, IsAbortBackupEnabled, IsBackupEnabled, JobName, JobSizeInMB, LastBackupSizeInMb, LastFullBackup, LastRunResult, NextScheduledBackup, NonFailingRuns, NumberOfVms, NumberOfVolumes, RepositoryName, StartTime, StartTimeOfLastRun, TotalRuns, VpgIdentifier, VpgProtectedSiteName, VpgRecoverySiteName, ZorgName){
        /** @type {number} */
        this.BackupProgress = BackupProgress;
        /** @type {enums.VpgBackupJobSummaryStatusVisualObject} */
        this.BackupStatus = BackupStatus;
        /** @type {boolean} */
        this.IsAbortBackupEnabled = IsAbortBackupEnabled;
        /** @type {boolean} */
        this.IsBackupEnabled = IsBackupEnabled;
        /** @type {string} */
        this.JobName = JobName;
        /** @type {number} */
        this.JobSizeInMB = JobSizeInMB;
        /** @type {number} */
        this.LastBackupSizeInMb = LastBackupSizeInMb;
        /** @type {date} */
        this.LastFullBackup = LastFullBackup;
        /** @type {enums.VpgBackupLastRunResultVisualObject} */
        this.LastRunResult = LastRunResult;
        /** @type {date} */
        this.NextScheduledBackup = NextScheduledBackup;
        /** @type {number} */
        this.NonFailingRuns = NonFailingRuns;
        /** @type {number} */
        this.NumberOfVms = NumberOfVms;
        /** @type {number} */
        this.NumberOfVolumes = NumberOfVolumes;
        /** @type {string} */
        this.RepositoryName = RepositoryName;
        /** @type {date} */
        this.StartTime = StartTime;
        /** @type {date} */
        this.StartTimeOfLastRun = StartTimeOfLastRun;
        /** @type {number} */
        this.TotalRuns = TotalRuns;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.VpgIdentifier = VpgIdentifier;
        /** @type {string} */
        this.VpgProtectedSiteName = VpgProtectedSiteName;
        /** @type {string} */
        this.VpgRecoverySiteName = VpgRecoverySiteName;
        /** @type {string} */
        this.ZorgName = ZorgName;
    };
    /**
     * @param {vos.VpgBackupJobInfoSummaryVisualObject[]} [VpgBackupJobInfoSummaryVisualObjects] {@link vos.VpgBackupJobInfoSummaryVisualObject[]}
     * @constructor
     */
    vos.VpgBackupScreenVisualObject = function(VpgBackupJobInfoSummaryVisualObjects){
        /** @type {vos.VpgBackupJobInfoSummaryVisualObject[]} */
        this.VpgBackupJobInfoSummaryVisualObjects = VpgBackupJobInfoSummaryVisualObjects;
    };
    /**
     * @param {boolean} [DoZertoOrganizationValidation] {@link boolean}
     * @constructor
     */
    vos.VPGConfigurationCreateModifiersVisualObject = function(DoZertoOrganizationValidation){
        /** @type {boolean} */
        this.DoZertoOrganizationValidation = DoZertoOrganizationValidation;
    };
    /**
     * @param {boolean} [IsBackupFeatureSupported] {@link boolean}
     * @param {boolean} [IsCompressionConfigurable] {@link boolean}
     * @param {boolean} [IsStorageProfileEnabled] {@link boolean}
     * @param {boolean} [IsVmFolderConfigurable] {@link boolean}
     * @constructor
     */
    vos.VPGConfigurationFlags = function(IsBackupFeatureSupported, IsCompressionConfigurable, IsStorageProfileEnabled, IsVmFolderConfigurable){
        /** @type {boolean} */
        this.IsBackupFeatureSupported = IsBackupFeatureSupported;
        /** @type {boolean} */
        this.IsCompressionConfigurable = IsCompressionConfigurable;
        /** @type {boolean} */
        this.IsStorageProfileEnabled = IsStorageProfileEnabled;
        /** @type {boolean} */
        this.IsVmFolderConfigurable = IsVmFolderConfigurable;
    };
    /**
     * @param {boolean} [AllowChangeDatastore] {@link boolean}
     * @param {boolean} [DoZertoOrganizationValidation] {@link boolean}
     * @param {boolean} [IgnoreReverseReplicationWarning] {@link boolean}
     * @param {boolean} [KeepUnprotectedDisks] {@link boolean}
     * @param {boolean} [ReprotectInsteadOfChangeDatastore] {@link boolean}
     * @constructor
     */
    vos.VPGConfigurationUpdateModifiersVisualObject = function(AllowChangeDatastore, DoZertoOrganizationValidation, IgnoreReverseReplicationWarning, KeepUnprotectedDisks, ReprotectInsteadOfChangeDatastore){
        /** @type {boolean} */
        this.AllowChangeDatastore = AllowChangeDatastore;
        /** @type {boolean} */
        this.DoZertoOrganizationValidation = DoZertoOrganizationValidation;
        /** @type {boolean} */
        this.IgnoreReverseReplicationWarning = IgnoreReverseReplicationWarning;
        /** @type {boolean} */
        this.KeepUnprotectedDisks = KeepUnprotectedDisks;
        /** @type {boolean} */
        this.ReprotectInsteadOfChangeDatastore = ReprotectInsteadOfChangeDatastore;
    };
    /**
     * @param {vos.VPGDetailsScreenConfiguration} [Configuration] {@link vos.VPGDetailsScreenConfiguration}
     * @param {vos.VPGDetailsDefaults} [Defaults] {@link vos.VPGDetailsDefaults}
     * @param {string} [Name] {@link string}
     * @param {vos.OwnersIdentifier} [OwnersId] {@link vos.OwnersIdentifier}
     * @param {vos.VPGDetailsProtectedVappSettings} [ProtectedVappSettings] {@link vos.VPGDetailsProtectedVappSettings}
     * @param {vos.VPGDetailsRecoveryVappSettings} [RecoveryVappSettings] {@link vos.VPGDetailsRecoveryVappSettings}
     * @param {vos.VPGDetailsScreenVirtualMachine[]} [VirtualMachines] {@link vos.VPGDetailsScreenVirtualMachine[]}
     * @param {vos.ZertoOrganizationIdentifier} [ZertoOrganizationIdentifier] {@link vos.ZertoOrganizationIdentifier}
     * @constructor
     */
    vos.VpgConfigurationVisualObject = function(Configuration, Defaults, Name, OwnersId, ProtectedVappSettings, RecoveryVappSettings, VirtualMachines, ZertoOrganizationIdentifier){
        /** @type {vos.VPGDetailsScreenConfiguration} */
        this.Configuration = Configuration;
        /** @type {vos.VPGDetailsDefaults} */
        this.Defaults = Defaults;
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.OwnersIdentifier} */
        this.OwnersId = OwnersId;
        /** @type {vos.VPGDetailsProtectedVappSettings} */
        this.ProtectedVappSettings = ProtectedVappSettings;
        /** @type {vos.VPGDetailsRecoveryVappSettings} */
        this.RecoveryVappSettings = RecoveryVappSettings;
        /** @type {vos.VPGDetailsScreenVirtualMachine[]} */
        this.VirtualMachines = VirtualMachines;
        /** @type {vos.ZertoOrganizationIdentifier} */
        this.ZertoOrganizationIdentifier = ZertoOrganizationIdentifier;
    };
    /**
     * @param {vos.CloudVmSettingsVisualObject} [FailoverSettings] {@link vos.CloudVmSettingsVisualObject}
     * @param {vos.CloudVmSettingsVisualObject} [FailoverTestSettings] {@link vos.CloudVmSettingsVisualObject}
     * @constructor
     */
    vos.VPGDetailsCloudVmSettings = function(FailoverSettings, FailoverTestSettings){
        /** @type {vos.CloudVmSettingsVisualObject} */
        this.FailoverSettings = FailoverSettings;
        /** @type {vos.CloudVmSettingsVisualObject} */
        this.FailoverTestSettings = FailoverTestSettings;
    };
    /**
     * @param {vos.VirtualNetworkVisualObject} [FailoverNetwork] {@link vos.VirtualNetworkVisualObject}
     * @param {vos.VCDVAppNetworkInfo} [FailoverVCDVAppNetwork] {@link vos.VCDVAppNetworkInfo}
     * @param {vos.CloudRecoverySettings} [RecoveryCloudSettings] {@link vos.CloudRecoverySettings}
     * @param {vos.ComputeResourceVisualObject} [TargetComputeResource] {@link vos.ComputeResourceVisualObject}
     * @param {vos.DatastoreVisualObject} [TargetDatastore] {@link vos.DatastoreVisualObject}
     * @param {vos.VmFolderVisualObject} [TargetFolder] {@link vos.VmFolderVisualObject}
     * @param {vos.VirtualNetworkVisualObject} [TestNetwork] {@link vos.VirtualNetworkVisualObject}
     * @param {vos.VCDVAppNetworkInfo} [TestVCDVAppNetwork] {@link vos.VCDVAppNetworkInfo}
     * @constructor
     */
    vos.VPGDetailsDefaults = function(FailoverNetwork, FailoverVCDVAppNetwork, RecoveryCloudSettings, TargetComputeResource, TargetDatastore, TargetFolder, TestNetwork, TestVCDVAppNetwork){
        /** @type {vos.VirtualNetworkVisualObject} */
        this.FailoverNetwork = FailoverNetwork;
        /** @type {vos.VCDVAppNetworkInfo} */
        this.FailoverVCDVAppNetwork = FailoverVCDVAppNetwork;
        /** @type {vos.CloudRecoverySettings} */
        this.RecoveryCloudSettings = RecoveryCloudSettings;
        /** @type {vos.ComputeResourceVisualObject} */
        this.TargetComputeResource = TargetComputeResource;
        /** @type {vos.DatastoreVisualObject} */
        this.TargetDatastore = TargetDatastore;
        /** @type {vos.VmFolderVisualObject} */
        this.TargetFolder = TargetFolder;
        /** @type {vos.VirtualNetworkVisualObject} */
        this.TestNetwork = TestNetwork;
        /** @type {vos.VCDVAppNetworkInfo} */
        this.TestVCDVAppNetwork = TestVCDVAppNetwork;
    };
    /**
     * @param {vos.VCDNetworkManagementSettings} [VCDNetworkSettings] {@link vos.VCDNetworkManagementSettings}
     * @param {vos.VPGDetailsNicVcenterNetworkSettings} [VCenterNetworkSettings] {@link vos.VPGDetailsNicVcenterNetworkSettings}
     * @constructor
     */
    vos.VPGDetailsNicNetworkSettings = function(VCDNetworkSettings, VCenterNetworkSettings){
        /** @type {vos.VCDNetworkManagementSettings} */
        this.VCDNetworkSettings = VCDNetworkSettings;
        /** @type {vos.VPGDetailsNicVcenterNetworkSettings} */
        this.VCenterNetworkSettings = VCenterNetworkSettings;
    };
    /**
     * @param {string} [DnsSuffix] {@link string}
     * @param {vos.IPSettings} [IP] {@link vos.IPSettings}
     * @param {vos.VirtualNetworkVisualObject} [RecoveryNetwork] {@link vos.VirtualNetworkVisualObject}
     * @param {boolean} [ShouldReplaceMacAddress] {@link boolean}
     * @constructor
     */
    vos.VPGDetailsNicVcenterNetworkSettings = function(DnsSuffix, IP, RecoveryNetwork, ShouldReplaceMacAddress){
        /** @type {string} */
        this.DnsSuffix = DnsSuffix;
        /** @type {vos.IPSettings} */
        this.IP = IP;
        /** @type {vos.VirtualNetworkVisualObject} */
        this.RecoveryNetwork = RecoveryNetwork;
        /** @type {boolean} */
        this.ShouldReplaceMacAddress = ShouldReplaceMacAddress;
    };
    /**
     * @param {vos.VpgDetailsProtectedVappVCDSettings} [VCDVappSettings] {@link vos.VpgDetailsProtectedVappVCDSettings}
     * @constructor
     */
    vos.VPGDetailsProtectedVappSettings = function(VCDVappSettings){
        /** @type {vos.VpgDetailsProtectedVappVCDSettings} */
        this.VCDVappSettings = VCDVappSettings;
    };
    /**
     * @param {vos.VirtualDatacenterVisualObject} [OrgVirtualDatacenter] {@link vos.VirtualDatacenterVisualObject}
     * @param {string} [VCDVappDisplayName] {@link string}
     * @param {vos.VCDVAppIdentifier} [VCDVappId] {@link vos.VCDVAppIdentifier}
     * @constructor
     */
    vos.VpgDetailsProtectedVappVCDSettings = function(OrgVirtualDatacenter, VCDVappDisplayName, VCDVappId){
        /** @type {vos.VirtualDatacenterVisualObject} */
        this.OrgVirtualDatacenter = OrgVirtualDatacenter;
        /** @type {string} */
        this.VCDVappDisplayName = VCDVappDisplayName;
        /** @type {vos.VCDVAppIdentifier} */
        this.VCDVappId = VCDVappId;
    };
    /**
     * @param {vos.VPGDetailsRecoveryVCDVappSettings} [VCDVappSettings] {@link vos.VPGDetailsRecoveryVCDVappSettings}
     * @constructor
     */
    vos.VPGDetailsRecoveryVappSettings = function(VCDVappSettings){
        /** @type {vos.VPGDetailsRecoveryVCDVappSettings} */
        this.VCDVappSettings = VCDVappSettings;
    };
    /**
     * @param {boolean} [DisableGuestCustomization] {@link boolean}
     * @param {vos.VCDOrgVdcNetworkMappingVisualObject[]} [OrgVdcNetworkMapping] {@link vos.VCDOrgVdcNetworkMappingVisualObject[]}
     * @param {vos.VirtualDatacenterVisualObject} [TargetVirtualDatacenter] {@link vos.VirtualDatacenterVisualObject}
     * @param {vos.VCDVAppNetworkInfo[]} [VCDVAppNetworks] {@link vos.VCDVAppNetworkInfo[]}
     * @constructor
     */
    vos.VPGDetailsRecoveryVCDVappSettings = function(DisableGuestCustomization, OrgVdcNetworkMapping, TargetVirtualDatacenter, VCDVAppNetworks){
        /** @type {boolean} */
        this.DisableGuestCustomization = DisableGuestCustomization;
        /** @type {vos.VCDOrgVdcNetworkMappingVisualObject[]} */
        this.OrgVdcNetworkMapping = OrgVdcNetworkMapping;
        /** @type {vos.VirtualDatacenterVisualObject} */
        this.TargetVirtualDatacenter = TargetVirtualDatacenter;
        /** @type {vos.VCDVAppNetworkInfo[]} */
        this.VCDVAppNetworks = VCDVAppNetworks;
    };
    /**
     * @param {enums.VpgBackupLastRunResultVisualObject} [LastRunResult] {@link enums.VpgBackupLastRunResultVisualObject}
     * @param {date} [StartTimeOfLastRun] {@link date}
     * @constructor
     */
    vos.VpgDetailsScreenBackupInformation = function(LastRunResult, StartTimeOfLastRun){
        /** @type {enums.VpgBackupLastRunResultVisualObject} */
        this.LastRunResult = LastRunResult;
        /** @type {date} */
        this.StartTimeOfLastRun = StartTimeOfLastRun;
    };
    /**
     * @param {boolean} [IsAbortBackupEnabled] {@link boolean}
     * @param {boolean} [IsBackupEnabled] {@link boolean}
     * @param {boolean} [IsCloneEnabled] {@link boolean}
     * @param {boolean} [IsDeleteEnabled] {@link boolean}
     * @param {boolean} [IsFailoverEnabled] {@link boolean}
     * @param {boolean} [IsFailoverInStagesSupported] {@link boolean}
     * @param {boolean} [IsFailoverTestEnabled] {@link boolean}
     * @param {boolean} [IsForceSyncEnabled] {@link boolean}
     * @param {boolean} [IsInsertCheckpointEnabled] {@link boolean}
     * @param {boolean} [IsMoveEnabled] {@link boolean}
     * @param {boolean} [IsMoveInStagesSupported] {@link boolean}
     * @param {boolean} [IsPauseEnabled] {@link boolean}
     * @param {boolean} [IsProtectedSiteConnected] {@link boolean}
     * @param {boolean} [IsRecoverCommitEnabled] {@link boolean}
     * @param {boolean} [IsRecoverRollbackEnabled] {@link boolean}
     * @param {boolean} [IsUpdateEnabled] {@link boolean}
     * @param {boolean} [RequiresForceToDelete] {@link boolean}
     * @param {boolean} [IsFlrEnabled] {@link boolean}
     * @constructor
     */
    vos.VPGDetailsScreenButtonsState = function(IsAbortBackupEnabled, IsBackupEnabled, IsCloneEnabled, IsDeleteEnabled, IsFailoverEnabled, IsFailoverInStagesSupported, IsFailoverTestEnabled, IsForceSyncEnabled, IsInsertCheckpointEnabled, IsMoveEnabled, IsMoveInStagesSupported, IsPauseEnabled, IsProtectedSiteConnected, IsRecoverCommitEnabled, IsRecoverRollbackEnabled, IsUpdateEnabled, RequiresForceToDelete, IsFlrEnabled){
        /** @type {boolean} */
        this.IsAbortBackupEnabled = IsAbortBackupEnabled;
        /** @type {boolean} */
        this.IsBackupEnabled = IsBackupEnabled;
        /** @type {boolean} */
        this.IsCloneEnabled = IsCloneEnabled;
        /** @type {boolean} */
        this.IsDeleteEnabled = IsDeleteEnabled;
        /** @type {boolean} */
        this.IsFailoverEnabled = IsFailoverEnabled;
        /** @type {boolean} */
        this.IsFailoverInStagesSupported = IsFailoverInStagesSupported;
        /** @type {boolean} */
        this.IsFailoverTestEnabled = IsFailoverTestEnabled;
        /** @type {boolean} */
        this.IsForceSyncEnabled = IsForceSyncEnabled;
        /** @type {boolean} */
        this.IsInsertCheckpointEnabled = IsInsertCheckpointEnabled;
        /** @type {boolean} */
        this.IsMoveEnabled = IsMoveEnabled;
        /** @type {boolean} */
        this.IsMoveInStagesSupported = IsMoveInStagesSupported;
        /** @type {boolean} */
        this.IsPauseEnabled = IsPauseEnabled;
        /** @type {boolean} */
        this.IsProtectedSiteConnected = IsProtectedSiteConnected;
        /** @type {boolean} */
        this.IsRecoverCommitEnabled = IsRecoverCommitEnabled;
        /** @type {boolean} */
        this.IsRecoverRollbackEnabled = IsRecoverRollbackEnabled;
        /** @type {boolean} */
        this.IsUpdateEnabled = IsUpdateEnabled;
        /** @type {boolean} */
        this.RequiresForceToDelete = RequiresForceToDelete;
        /** @type {boolean} */
        this.IsFlrEnabled = IsFlrEnabled;
    };
    /**
     * @param {vos.BackupSettingsVisualObject} [Backup] {@link vos.BackupSettingsVisualObject}
     * @param {vos.BootOrderScreenVisualObject} [BootOrder] {@link vos.BootOrderScreenVisualObject}
     * @param {enums.CopyNatRulesOptions} [CopyNatRulesOptions] {@link enums.CopyNatRulesOptions}
     * @param {boolean} [CopyNatServiceAvailable] {@link boolean}
     * @param {boolean} [IsBackupEnabled] {@link boolean}
     * @param {vos.ManageJournalVisualObject} [ManageJournalSettings] {@link vos.ManageJournalVisualObject}
     * @param {number} [MaxTestIntervalInMinutes] {@link number}
     * @param {number} [MinimalJournalLenghtInMinutes] {@link number}
     * @param {enums.ProtectionGroupPriority} [Priority] {@link enums.ProtectionGroupPriority}
     * @param {number} [RPOThressholdInSeconds] {@link number}
     * @param {vos.ScriptingSettingsVisualObject} [ScriptingSettings] {@link vos.ScriptingSettingsVisualObject}
     * @param {vos.SelectedServiceProfileVisualObject} [ServiceProfile] {@link vos.SelectedServiceProfileVisualObject}
     * @param {boolean} [WanCompression] {@link boolean}
     * @constructor
     */
    vos.VPGDetailsScreenConfiguration = function(Backup, BootOrder, CopyNatRulesOptions, CopyNatServiceAvailable, IsBackupEnabled, ManageJournalSettings, MaxTestIntervalInMinutes, MinimalJournalLenghtInMinutes, Priority, RPOThressholdInSeconds, ScriptingSettings, ServiceProfile, WanCompression){
        /** @type {vos.BackupSettingsVisualObject} */
        this.Backup = Backup;
        /** @type {vos.BootOrderScreenVisualObject} */
        this.BootOrder = BootOrder;
        /** @type {enums.CopyNatRulesOptions} */
        this.CopyNatRulesOptions = CopyNatRulesOptions;
        /** @type {boolean} */
        this.CopyNatServiceAvailable = CopyNatServiceAvailable;
        /** @type {boolean} */
        this.IsBackupEnabled = IsBackupEnabled;
        /** @type {vos.ManageJournalVisualObject} */
        this.ManageJournalSettings = ManageJournalSettings;
        /** @type {number} */
        this.MaxTestIntervalInMinutes = MaxTestIntervalInMinutes;
        /** @type {number} */
        this.MinimalJournalLenghtInMinutes = MinimalJournalLenghtInMinutes;
        /** @type {enums.ProtectionGroupPriority} */
        this.Priority = Priority;
        /** @type {number} */
        this.RPOThressholdInSeconds = RPOThressholdInSeconds;
        /** @type {vos.ScriptingSettingsVisualObject} */
        this.ScriptingSettings = ScriptingSettings;
        /** @type {vos.SelectedServiceProfileVisualObject} */
        this.ServiceProfile = ServiceProfile;
        /** @type {boolean} */
        this.WanCompression = WanCompression;
    };
    /**
     * @param {vos.SingleGraphVisualObject} [IncomingIops] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [IncomingThroughputInMb] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [OutgoingBandWidth] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [RPOInSeconds] {@link vos.SingleGraphVisualObject}
     * @constructor
     */
    vos.VPGDetailsScreenPerformance = function(IncomingIops, IncomingThroughputInMb, OutgoingBandWidth, RPOInSeconds){
        /** @type {vos.SingleGraphVisualObject} */
        this.IncomingIops = IncomingIops;
        /** @type {vos.SingleGraphVisualObject} */
        this.IncomingThroughputInMb = IncomingThroughputInMb;
        /** @type {vos.SingleGraphVisualObject} */
        this.OutgoingBandWidth = OutgoingBandWidth;
        /** @type {vos.SingleGraphVisualObject} */
        this.RPOInSeconds = RPOInSeconds;
    };
    /**
     * @param {vos.VpgActiveProcesses} [ActiveProcesses] {@link vos.VpgActiveProcesses}
     * @param {enums.ProtectionGroupAlertStatus} [AlertStatus] {@link enums.ProtectionGroupAlertStatus}
     * @param {vos.AlertsTipVisualObject} [AlertTips] {@link vos.AlertsTipVisualObject}
     * @param {vos.VPGDetailsScreenButtonsState} [ButtonsState] {@link vos.VPGDetailsScreenButtonsState}
     * @param {vos.CloneStatusVisualObject} [CloneStatusVisualObject] {@link vos.CloneStatusVisualObject}
     * @param {boolean} [IsCloneEnabled] {@link boolean}
     * @param {boolean} [IsDeleteEnabled] {@link boolean}
     * @param {boolean} [IsFailoverEnabled] {@link boolean}
     * @param {boolean} [IsFailoverInStagesSupported] {@link boolean}
     * @param {boolean} [IsFailoverTestEnabled] {@link boolean}
     * @param {boolean} [IsForceSyncEnabled] {@link boolean}
     * @param {boolean} [IsInsertCheckpointEnabled] {@link boolean}
     * @param {boolean} [IsMoveEnabled] {@link boolean}
     * @param {boolean} [IsMoveInStagesSupported] {@link boolean}
     * @param {boolean} [IsProgressActive] {@link boolean}
     * @param {boolean} [IsProtectedSiteConnected] {@link boolean}
     * @param {boolean} [IsRecoverCommitEnabled] {@link boolean}
     * @param {boolean} [IsRecoverRollbackEnabled] {@link boolean}
     * @param {boolean} [IsUpdateEnabled] {@link boolean}
     * @param {vos.VPGMoveAutoContinueStateVisual} [MoveAutoContinueState] {@link vos.VPGMoveAutoContinueStateVisual}
     * @param {vos.PauseResumeVisualObject} [PauseResumeVisualObject] {@link vos.PauseResumeVisualObject}
     * @param {vos.VpgProgressDetailsVisualObject} [ProgressDetails] {@link vos.VpgProgressDetailsVisualObject}
     * @param {vos.VPGDetailsScreenState_ProgressDetailsVisualObject} [ProgressObject] {@link vos.VPGDetailsScreenState_ProgressDetailsVisualObject}
     * @param {number} [ProgressPercentage] {@link number}
     * @param {vos.CheckPoint} [RelevantCheckpoint] {@link vos.CheckPoint}
     * @param {boolean} [RequiresForceToDelete] {@link boolean}
     * @param {enums.VPGVisualState} [State] {@link enums.VPGVisualState}
     * @param {enums.VpgVisualStatus} [Status] {@link enums.VpgVisualStatus}
     * @param {enums.VpgVisualSubStatus} [SubStatus] {@link enums.VpgVisualSubStatus}
     * @param {vos.VPGTimebombInfo} [VPGTimebombInfo] {@link vos.VPGTimebombInfo}
     * @param {number} [VMsInInitialSync] {@link number}
     * @constructor
     */
    vos.VPGDetailsScreenState = function(ActiveProcesses, AlertStatus, AlertTips, ButtonsState, CloneStatusVisualObject, IsCloneEnabled, IsDeleteEnabled, IsFailoverEnabled, IsFailoverInStagesSupported, IsFailoverTestEnabled, IsForceSyncEnabled, IsInsertCheckpointEnabled, IsMoveEnabled, IsMoveInStagesSupported, IsProgressActive, IsProtectedSiteConnected, IsRecoverCommitEnabled, IsRecoverRollbackEnabled, IsUpdateEnabled, MoveAutoContinueState, PauseResumeVisualObject, ProgressDetails, ProgressObject, ProgressPercentage, RelevantCheckpoint, RequiresForceToDelete, State, Status, SubStatus, VPGTimebombInfo, VMsInInitialSync){
        /** @type {vos.VpgActiveProcesses} */
        this.ActiveProcesses = ActiveProcesses;
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.AlertStatus = AlertStatus;
        /** @type {vos.AlertsTipVisualObject} */
        this.AlertTips = AlertTips;
        /** @type {vos.VPGDetailsScreenButtonsState} */
        this.ButtonsState = ButtonsState;
        /** @type {vos.CloneStatusVisualObject} */
        this.CloneStatusVisualObject = CloneStatusVisualObject;
        /** @type {boolean} */
        this.IsCloneEnabled = IsCloneEnabled;
        /** @type {boolean} */
        this.IsDeleteEnabled = IsDeleteEnabled;
        /** @type {boolean} */
        this.IsFailoverEnabled = IsFailoverEnabled;
        /** @type {boolean} */
        this.IsFailoverInStagesSupported = IsFailoverInStagesSupported;
        /** @type {boolean} */
        this.IsFailoverTestEnabled = IsFailoverTestEnabled;
        /** @type {boolean} */
        this.IsForceSyncEnabled = IsForceSyncEnabled;
        /** @type {boolean} */
        this.IsInsertCheckpointEnabled = IsInsertCheckpointEnabled;
        /** @type {boolean} */
        this.IsMoveEnabled = IsMoveEnabled;
        /** @type {boolean} */
        this.IsMoveInStagesSupported = IsMoveInStagesSupported;
        /** @type {boolean} */
        this.IsProgressActive = IsProgressActive;
        /** @type {boolean} */
        this.IsProtectedSiteConnected = IsProtectedSiteConnected;
        /** @type {boolean} */
        this.IsRecoverCommitEnabled = IsRecoverCommitEnabled;
        /** @type {boolean} */
        this.IsRecoverRollbackEnabled = IsRecoverRollbackEnabled;
        /** @type {boolean} */
        this.IsUpdateEnabled = IsUpdateEnabled;
        /** @type {vos.VPGMoveAutoContinueStateVisual} */
        this.MoveAutoContinueState = MoveAutoContinueState;
        /** @type {vos.PauseResumeVisualObject} */
        this.PauseResumeVisualObject = PauseResumeVisualObject;
        /** @type {vos.VpgProgressDetailsVisualObject} */
        this.ProgressDetails = ProgressDetails;
        /** @type {vos.VPGDetailsScreenState_ProgressDetailsVisualObject} */
        this.ProgressObject = ProgressObject;
        /** @type {number} */
        this.ProgressPercentage = ProgressPercentage;
        /** @type {vos.CheckPoint} */
        this.RelevantCheckpoint = RelevantCheckpoint;
        /** @type {boolean} */
        this.RequiresForceToDelete = RequiresForceToDelete;
        /** @type {enums.VPGVisualState} */
        this.State = State;
        /** @type {enums.VpgVisualStatus} */
        this.Status = Status;
        /** @type {enums.VpgVisualSubStatus} */
        this.SubStatus = SubStatus;
        /** @type {vos.VPGTimebombInfo} */
        this.VPGTimebombInfo = VPGTimebombInfo;
        /** @type {number} */
        this.VMsInInitialSync = VMsInInitialSync;
    };
    /**
     * @param {vos.VpgProgressDetailsVisualObject} [ProgressDetails] {@link vos.VpgProgressDetailsVisualObject}
     * @param {number} [ProgressPercentage] {@link number}
     * @constructor
     */
    vos.VPGDetailsScreenState_ProgressDetailsVisualObject = function(ProgressDetails, ProgressPercentage){
        /** @type {vos.VpgProgressDetailsVisualObject} */
        this.ProgressDetails = ProgressDetails;
        /** @type {number} */
        this.ProgressPercentage = ProgressPercentage;
    };
    /**
     * @param {string} [BackupRepository] {@link string}
     * @param {vos.CheckPoint} [EarliestCheckpoint] {@link vos.CheckPoint}
     * @param {number} [HistoryInSeconds] {@link number}
     * @param {vos.JournalHealthStatusVisualObject} [JournalHealthStatusVisualObject] {@link vos.JournalHealthStatusVisualObject}
     * @param {vos.LastTestSummary} [LastTest] {@link vos.LastTestSummary}
     * @param {number} [NumberOfProvisionedMB] {@link number}
     * @param {number} [NumberOfUsedMB] {@link number}
     * @param {number} [NumberOfVms] {@link number}
     * @param {number} [RecoveryStorageSizeInMB] {@link number}
     * @param {enums.VpgBackupJobSummaryStatusVisualObject} [VpgBackupJobStatus] {@link enums.VpgBackupJobSummaryStatusVisualObject}
     * @param {vos.VpgDetailsScreenBackupInformation} [VpgDetailsScreenBackupInformation] {@link vos.VpgDetailsScreenBackupInformation}
     * @constructor
     */
    vos.VPGDetailsScreenSummary = function(BackupRepository, EarliestCheckpoint, HistoryInSeconds, JournalHealthStatusVisualObject, LastTest, NumberOfProvisionedMB, NumberOfUsedMB, NumberOfVms, RecoveryStorageSizeInMB, VpgBackupJobStatus, VpgDetailsScreenBackupInformation){
        /** @type {string} */
        this.BackupRepository = BackupRepository;
        /** @type {vos.CheckPoint} */
        this.EarliestCheckpoint = EarliestCheckpoint;
        /** @type {number} */
        this.HistoryInSeconds = HistoryInSeconds;
        /** @type {vos.JournalHealthStatusVisualObject} */
        this.JournalHealthStatusVisualObject = JournalHealthStatusVisualObject;
        /** @type {vos.LastTestSummary} */
        this.LastTest = LastTest;
        /** @type {number} */
        this.NumberOfProvisionedMB = NumberOfProvisionedMB;
        /** @type {number} */
        this.NumberOfUsedMB = NumberOfUsedMB;
        /** @type {number} */
        this.NumberOfVms = NumberOfVms;
        /** @type {number} */
        this.RecoveryStorageSizeInMB = RecoveryStorageSizeInMB;
        /** @type {enums.VpgBackupJobSummaryStatusVisualObject} */
        this.VpgBackupJobStatus = VpgBackupJobStatus;
        /** @type {vos.VpgDetailsScreenBackupInformation} */
        this.VpgDetailsScreenBackupInformation = VpgDetailsScreenBackupInformation;
    };
    /**
     * @param {vos.VPGDetailsCloudVmSettings} [CloudVmSettings] {@link vos.VPGDetailsCloudVmSettings}
     * @param {vos.VMIdentifier} [InternalVirtualMachineId] {@link vos.VMIdentifier}
     * @param {vos.DatastoreVisualObject[]} [JournalDatastores] {@link vos.DatastoreVisualObject[]}
     * @param {vos.JournalLimitVisualObject} [JournalHardLimit] {@link vos.JournalLimitVisualObject}
     * @param {vos.JournalLimitVisualObject} [JournalWarningThreshold] {@link vos.JournalLimitVisualObject}
     * @param {string} [Name] {@link string}
     * @param {vos.VPGDetailsVirtualMachineNic[]} [NetworkInterfaces] {@link vos.VPGDetailsVirtualMachineNic[]}
     * @param {vos.DatastoreVisualObject} [SourceDatastore] {@link vos.DatastoreVisualObject}
     * @param {vos.ComputeResourceVisualObject} [SourceHost] {@link vos.ComputeResourceVisualObject}
     * @param {vos.VPGDetailsStorageProfileVisualObject} [StorageProfile] {@link vos.VPGDetailsStorageProfileVisualObject}
     * @param {vos.VPGDetailsStorageUsageInfo} [StorageUsageInfo] {@link vos.VPGDetailsStorageUsageInfo}
     * @param {vos.DatastoreVisualObject} [TargetDatastore] {@link vos.DatastoreVisualObject}
     * @param {vos.VmFolderVisualObject} [TargetFolder] {@link vos.VmFolderVisualObject}
     * @param {vos.ComputeResourceVisualObject} [TargetHost] {@link vos.ComputeResourceVisualObject}
     * @param {vos.VPGDetailsVirtualMachineVolume[]} [Volumes] {@link vos.VPGDetailsVirtualMachineVolume[]}
     * @constructor
     */
    vos.VPGDetailsScreenVirtualMachine = function(CloudVmSettings, InternalVirtualMachineId, JournalDatastores, JournalHardLimit, JournalWarningThreshold, Name, NetworkInterfaces, SourceDatastore, SourceHost, StorageProfile, StorageUsageInfo, TargetDatastore, TargetFolder, TargetHost, Volumes){
        /** @type {vos.VPGDetailsCloudVmSettings} */
        this.CloudVmSettings = CloudVmSettings;
        /** @type {vos.VMIdentifier} */
        this.InternalVirtualMachineId = InternalVirtualMachineId;
        /** @type {vos.DatastoreVisualObject[]} */
        this.JournalDatastores = JournalDatastores;
        /** @type {vos.JournalLimitVisualObject} */
        this.JournalHardLimit = JournalHardLimit;
        /** @type {vos.JournalLimitVisualObject} */
        this.JournalWarningThreshold = JournalWarningThreshold;
        /** @type {string} */
        this.Name = Name;
        /** @type {vos.VPGDetailsVirtualMachineNic[]} */
        this.NetworkInterfaces = NetworkInterfaces;
        /** @type {vos.DatastoreVisualObject} */
        this.SourceDatastore = SourceDatastore;
        /** @type {vos.ComputeResourceVisualObject} */
        this.SourceHost = SourceHost;
        /** @type {vos.VPGDetailsStorageProfileVisualObject} */
        this.StorageProfile = StorageProfile;
        /** @type {vos.VPGDetailsStorageUsageInfo} */
        this.StorageUsageInfo = StorageUsageInfo;
        /** @type {vos.DatastoreVisualObject} */
        this.TargetDatastore = TargetDatastore;
        /** @type {vos.VmFolderVisualObject} */
        this.TargetFolder = TargetFolder;
        /** @type {vos.ComputeResourceVisualObject} */
        this.TargetHost = TargetHost;
        /** @type {vos.VPGDetailsVirtualMachineVolume[]} */
        this.Volumes = Volumes;
    };
    /**
     * @param {vos.CloneStatusVisualObject} [CloneStatus] {@link vos.CloneStatusVisualObject}
     * @param {vos.VPGConfigurationFlags} [ConfigurationFlags] {@link vos.VPGConfigurationFlags}
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {vos.VpgEntities} [Entities] {@link vos.VpgEntities}
     * @param {boolean} [IsManageSiteSettingsEnabled] {@link boolean}
     * @param {boolean} [LastUserActivityFailed] {@link boolean}
     * @param {vos.VPGDetailsScreenPerformance} [Performance] {@link vos.VPGDetailsScreenPerformance}
     * @param {vos.ProtectionGroupIdentifier} [ProtectionGroupId] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [Reason] {@link string}
     * @param {boolean} [RemoteSiteConnected] {@link boolean}
     * @param {vos.SiteDetailsVisualObject} [SiteDetails] {@link vos.SiteDetailsVisualObject}
     * @param {vos.VpgDetailsSitesInfo} [SitesInfo] {@link vos.VpgDetailsSitesInfo}
     * @param {vos.VPGDetailsScreenState} [State] {@link vos.VPGDetailsScreenState}
     * @param {vos.VPGDetailsScreenSummary} [Summary] {@link vos.VPGDetailsScreenSummary}
     * @param {vos.VpgTopologyViewVisualObject} [Topology] {@link vos.VpgTopologyViewVisualObject}
     * @param {vos.VpgConfigurationVisualObject} [VpgConfiguration] {@link vos.VpgConfigurationVisualObject}
     * @param {vos.ZertoOrganizationIdentifier} [ZorgId] {@link vos.ZertoOrganizationIdentifier}
     * @constructor
     */
    vos.VPGDetailsScreenVisualObject = function(CloneStatus, ConfigurationFlags, Direction, Entities, IsManageSiteSettingsEnabled, LastUserActivityFailed, Performance, ProtectionGroupId, Reason, RemoteSiteConnected, SiteDetails, SitesInfo, State, Summary, Topology, VpgConfiguration, ZorgId){
        /** @type {vos.CloneStatusVisualObject} */
        this.CloneStatus = CloneStatus;
        /** @type {vos.VPGConfigurationFlags} */
        this.ConfigurationFlags = ConfigurationFlags;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {vos.VpgEntities} */
        this.Entities = Entities;
        /** @type {boolean} */
        this.IsManageSiteSettingsEnabled = IsManageSiteSettingsEnabled;
        /** @type {boolean} */
        this.LastUserActivityFailed = LastUserActivityFailed;
        /** @type {vos.VPGDetailsScreenPerformance} */
        this.Performance = Performance;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.ProtectionGroupId = ProtectionGroupId;
        /** @type {string} */
        this.Reason = Reason;
        /** @type {boolean} */
        this.RemoteSiteConnected = RemoteSiteConnected;
        /** @type {vos.SiteDetailsVisualObject} */
        this.SiteDetails = SiteDetails;
        /** @type {vos.VpgDetailsSitesInfo} */
        this.SitesInfo = SitesInfo;
        /** @type {vos.VPGDetailsScreenState} */
        this.State = State;
        /** @type {vos.VPGDetailsScreenSummary} */
        this.Summary = Summary;
        /** @type {vos.VpgTopologyViewVisualObject} */
        this.Topology = Topology;
        /** @type {vos.VpgConfigurationVisualObject} */
        this.VpgConfiguration = VpgConfiguration;
        /** @type {vos.ZertoOrganizationIdentifier} */
        this.ZorgId = ZorgId;
    };
    /**
     * @param {string} [CustomerName] {@link string}
     * @param {vos.SiteIdentifier} [SourceSiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [SourceSiteName] {@link string}
     * @param {vos.SiteIdentifier} [TargetSiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [TargetSiteName] {@link string}
     * @constructor
     */
    vos.VpgDetailsSitesInfo = function(CustomerName, SourceSiteIdentifier, SourceSiteName, TargetSiteIdentifier, TargetSiteName){
        /** @type {string} */
        this.CustomerName = CustomerName;
        /** @type {vos.SiteIdentifier} */
        this.SourceSiteIdentifier = SourceSiteIdentifier;
        /** @type {string} */
        this.SourceSiteName = SourceSiteName;
        /** @type {vos.SiteIdentifier} */
        this.TargetSiteIdentifier = TargetSiteIdentifier;
        /** @type {string} */
        this.TargetSiteName = TargetSiteName;
    };
    /**
     * @param {vos.VCDNicInfo} [VCDNetwork] {@link vos.VCDNicInfo}
     * @param {vos.VirtualNetworkVisualObject} [VcenterNetwork] {@link vos.VirtualNetworkVisualObject}
     * @constructor
     */
    vos.VPGDetailsSourceNetwork = function(VCDNetwork, VcenterNetwork){
        /** @type {vos.VCDNicInfo} */
        this.VCDNetwork = VCDNetwork;
        /** @type {vos.VirtualNetworkVisualObject} */
        this.VcenterNetwork = VcenterNetwork;
    };
    /**
     * @param {vos.VCDVirtualDatacenterStorageProfileVisualObject} [VCDStorageProfile] {@link vos.VCDVirtualDatacenterStorageProfileVisualObject}
     * @constructor
     */
    vos.VPGDetailsStorageProfileVisualObject = function(VCDStorageProfile){
        /** @type {vos.VCDVirtualDatacenterStorageProfileVisualObject} */
        this.VCDStorageProfile = VCDStorageProfile;
    };
    /**
     * @param {number} [ProvisionedStorageSizeInMB] {@link number}
     * @param {number} [RecoveryStorageSizeInMB] {@link number}
     * @param {number} [UsedStorageSizeInMB] {@link number}
     * @constructor
     */
    vos.VPGDetailsStorageUsageInfo = function(ProvisionedStorageSizeInMB, RecoveryStorageSizeInMB, UsedStorageSizeInMB){
        /** @type {number} */
        this.ProvisionedStorageSizeInMB = ProvisionedStorageSizeInMB;
        /** @type {number} */
        this.RecoveryStorageSizeInMB = RecoveryStorageSizeInMB;
        /** @type {number} */
        this.UsedStorageSizeInMB = UsedStorageSizeInMB;
    };
    /**
     * @param {vos.VPGDetailsNicNetworkSettings} [FailoverSettings] {@link vos.VPGDetailsNicNetworkSettings}
     * @param {vos.VNicIdentifier} [InternalIdentifier] {@link vos.VNicIdentifier}
     * @param {boolean} [IsIPConfigurationEnabled] {@link boolean}
     * @param {string} [MacAddress] {@link string}
     * @param {vos.VPGDetailsSourceNetwork} [SourceNetwork] {@link vos.VPGDetailsSourceNetwork}
     * @param {vos.VPGDetailsNicNetworkSettings} [TestSettings] {@link vos.VPGDetailsNicNetworkSettings}
     * @constructor
     */
    vos.VPGDetailsVirtualMachineNic = function(FailoverSettings, InternalIdentifier, IsIPConfigurationEnabled, MacAddress, SourceNetwork, TestSettings){
        /** @type {vos.VPGDetailsNicNetworkSettings} */
        this.FailoverSettings = FailoverSettings;
        /** @type {vos.VNicIdentifier} */
        this.InternalIdentifier = InternalIdentifier;
        /** @type {boolean} */
        this.IsIPConfigurationEnabled = IsIPConfigurationEnabled;
        /** @type {string} */
        this.MacAddress = MacAddress;
        /** @type {vos.VPGDetailsSourceNetwork} */
        this.SourceNetwork = SourceNetwork;
        /** @type {vos.VPGDetailsNicNetworkSettings} */
        this.TestSettings = TestSettings;
    };
    /**
     * @param {vos.VolumeManagementSettings} [InternalVolumeManagementSettings] {@link vos.VolumeManagementSettings}
     * @param {boolean} [IsSourceThinProvisioned] {@link boolean}
     * @param {number} [ProvisionedSizeInMB] {@link number}
     * @param {string} [SourceAddress] {@link string}
     * @param {boolean} [Swap] {@link boolean}
     * @param {string} [TargetAddress] {@link string}
     * @constructor
     */
    vos.VPGDetailsVirtualMachineVolume = function(InternalVolumeManagementSettings, IsSourceThinProvisioned, ProvisionedSizeInMB, SourceAddress, Swap, TargetAddress){
        /** @type {vos.VolumeManagementSettings} */
        this.InternalVolumeManagementSettings = InternalVolumeManagementSettings;
        /** @type {boolean} */
        this.IsSourceThinProvisioned = IsSourceThinProvisioned;
        /** @type {number} */
        this.ProvisionedSizeInMB = ProvisionedSizeInMB;
        /** @type {string} */
        this.SourceAddress = SourceAddress;
        /** @type {boolean} */
        this.Swap = Swap;
        /** @type {string} */
        this.TargetAddress = TargetAddress;
    };
    /**
     * @param {enums.VpgEntityType} [Source] {@link enums.VpgEntityType}
     * @param {enums.VpgEntityType} [Target] {@link enums.VpgEntityType}
     * @constructor
     */
    vos.VpgEntities = function(Source, Target){
        /** @type {enums.VpgEntityType} */
        this.Source = Source;
        /** @type {enums.VpgEntityType} */
        this.Target = Target;
    };
    /**
     * @param {string} [BackupRepository] {@link string}
     * @param {vos.BackupRunningTimeVisualObject} [BackupSchedulingTime] {@link vos.BackupRunningTimeVisualObject}
     * @param {enums.RestorePointRangeType} [RestorePointsRange] {@link enums.RestorePointRangeType}
     * @param {enums.VpgBackupJobSummaryStatusVisualObject} [VpgBackupJobStatus] {@link enums.VpgBackupJobSummaryStatusVisualObject}
     * @constructor
     */
    vos.VPGListBackupRelatedData = function(BackupRepository, BackupSchedulingTime, RestorePointsRange, VpgBackupJobStatus){
        /** @type {string} */
        this.BackupRepository = BackupRepository;
        /** @type {vos.BackupRunningTimeVisualObject} */
        this.BackupSchedulingTime = BackupSchedulingTime;
        /** @type {enums.RestorePointRangeType} */
        this.RestorePointsRange = RestorePointsRange;
        /** @type {enums.VpgBackupJobSummaryStatusVisualObject} */
        this.VpgBackupJobStatus = VpgBackupJobStatus;
    };
    /**
     * @param {number} [ActualRPO] {@link number}
     * @param {enums.ProtectionGroupAlertStatus} [AlertStatus] {@link enums.ProtectionGroupAlertStatus}
     * @param {vos.AlertsTipVisualObject} [AlertTips] {@link vos.AlertsTipVisualObject}
     * @param {boolean} [AreScriptsDefined] {@link boolean}
     * @param {vos.VPGListBackupRelatedData} [BackupRelatedData] {@link vos.VPGListBackupRelatedData}
     * @param {boolean} [BootOrder] {@link boolean}
     * @param {number} [ConfiguredHistoryInMinutes] {@link number}
     * @param {number} [ConfiguredRPO] {@link number}
     * @param {string} [CustomerName] {@link string}
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {vos.CheckPoint} [EarliestCheckpoint] {@link vos.CheckPoint}
     * @param {vos.VpgEntities} [Entities] {@link vos.VpgEntities}
     * @param {number} [HistoryInSeconds] {@link number}
     * @param {number} [IOPS] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [Identifier] {@link vos.ProtectionGroupIdentifier}
     * @param {number} [IncomingThroughputInMb] {@link number}
     * @param {vos.JournalHealthStatusVisualObject} [JournalHealthStatus] {@link vos.JournalHealthStatusVisualObject}
     * @param {date} [LastTest] {@link date}
     * @param {string} [Name] {@link string}
     * @param {number} [NumberOfVms] {@link number}
     * @param {number} [OutgoingBandWidth] {@link number}
     * @param {vos.OwnersIdentifier} [OwnersId] {@link vos.OwnersIdentifier}
     * @param {enums.ProtectionGroupPriority} [Priority] {@link enums.ProtectionGroupPriority}
     * @param {number} [ProvisionedStorageInMB] {@link number}
     * @param {enums.VPGRetentionPolicyType} [RetentionPolicy] {@link enums.VPGRetentionPolicyType}
     * @param {vos.VMIdentifier} [SampleVM] {@link vos.VMIdentifier}
     * @param {vos.ServiceProfileIdentifier} [ServiceProfileId] {@link vos.ServiceProfileIdentifier}
     * @param {string} [ServiceProfileName] {@link string}
     * @param {vos.SiteIdentifier} [SourceSiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [SourceSiteName] {@link string}
     * @param {vos.VPGDetailsScreenState} [State] {@link vos.VPGDetailsScreenState}
     * @param {vos.SiteIdentifier} [TargetSiteIdentifier] {@link vos.SiteIdentifier}
     * @param {string} [TargetSiteName] {@link string}
     * @param {number} [UsedStorageInMB] {@link number}
     * @param {vos.ZertoOrganizationIdentifier} [ZorgId] {@link vos.ZertoOrganizationIdentifier}
     * @param {number} [SyncProgressSentInMbps] {@link number}
     * @param {number} [UncompressedSentAppIosInMbps] {@link number}
     * @param {vos.VirtualMachineVisualObject[]} [Vms] {@link vos.VirtualMachineVisualObject[]}
     * @constructor
     */
    vos.VPGListScreenItem = function(ActualRPO, AlertStatus, AlertTips, AreScriptsDefined, BackupRelatedData, BootOrder, ConfiguredHistoryInMinutes, ConfiguredRPO, CustomerName, Direction, EarliestCheckpoint, Entities, HistoryInSeconds, IOPS, Identifier, IncomingThroughputInMb, JournalHealthStatus, LastTest, Name, NumberOfVms, OutgoingBandWidth, OwnersId, Priority, ProvisionedStorageInMB, RetentionPolicy, SampleVM, ServiceProfileId, ServiceProfileName, SourceSiteIdentifier, SourceSiteName, State, TargetSiteIdentifier, TargetSiteName, UsedStorageInMB, ZorgId, SyncProgressSentInMbps, UncompressedSentAppIosInMbps, Vms){
        /** @type {number} */
        this.ActualRPO = ActualRPO;
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.AlertStatus = AlertStatus;
        /** @type {vos.AlertsTipVisualObject} */
        this.AlertTips = AlertTips;
        /** @type {boolean} */
        this.AreScriptsDefined = AreScriptsDefined;
        /** @type {vos.VPGListBackupRelatedData} */
        this.BackupRelatedData = BackupRelatedData;
        /** @type {boolean} */
        this.BootOrder = BootOrder;
        /** @type {number} */
        this.ConfiguredHistoryInMinutes = ConfiguredHistoryInMinutes;
        /** @type {number} */
        this.ConfiguredRPO = ConfiguredRPO;
        /** @type {string} */
        this.CustomerName = CustomerName;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {vos.CheckPoint} */
        this.EarliestCheckpoint = EarliestCheckpoint;
        /** @type {vos.VpgEntities} */
        this.Entities = Entities;
        /** @type {number} */
        this.HistoryInSeconds = HistoryInSeconds;
        /** @type {number} */
        this.IOPS = IOPS;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.Identifier = Identifier;
        /** @type {number} */
        this.IncomingThroughputInMb = IncomingThroughputInMb;
        /** @type {vos.JournalHealthStatusVisualObject} */
        this.JournalHealthStatus = JournalHealthStatus;
        /** @type {date} */
        this.LastTest = LastTest;
        /** @type {string} */
        this.Name = Name;
        /** @type {number} */
        this.NumberOfVms = NumberOfVms;
        /** @type {number} */
        this.OutgoingBandWidth = OutgoingBandWidth;
        /** @type {vos.OwnersIdentifier} */
        this.OwnersId = OwnersId;
        /** @type {enums.ProtectionGroupPriority} */
        this.Priority = Priority;
        /** @type {number} */
        this.ProvisionedStorageInMB = ProvisionedStorageInMB;
        /** @type {enums.VPGRetentionPolicyType} */
        this.RetentionPolicy = RetentionPolicy;
        /** @type {vos.VMIdentifier} */
        this.SampleVM = SampleVM;
        /** @type {vos.ServiceProfileIdentifier} */
        this.ServiceProfileId = ServiceProfileId;
        /** @type {string} */
        this.ServiceProfileName = ServiceProfileName;
        /** @type {vos.SiteIdentifier} */
        this.SourceSiteIdentifier = SourceSiteIdentifier;
        /** @type {string} */
        this.SourceSiteName = SourceSiteName;
        /** @type {vos.VPGDetailsScreenState} */
        this.State = State;
        /** @type {vos.SiteIdentifier} */
        this.TargetSiteIdentifier = TargetSiteIdentifier;
        /** @type {string} */
        this.TargetSiteName = TargetSiteName;
        /** @type {number} */
        this.UsedStorageInMB = UsedStorageInMB;
        /** @type {vos.ZertoOrganizationIdentifier} */
        this.ZorgId = ZorgId;
        /** @type {number} */
        this.SyncProgressSentInMbps = SyncProgressSentInMbps;
        /** @type {number} */
        this.UncompressedSentAppIosInMbps = UncompressedSentAppIosInMbps;
        /** @type {vos.VirtualMachineVisualObject[]} */
        this.Vms = Vms;
    };
    /**
     * @param {vos.VPGListScreenItem[]} [ProtectionGroups] {@link vos.VPGListScreenItem[]}
     * @param {vos.SiteDetailsVisualObject} [SiteDetails] {@link vos.SiteDetailsVisualObject}
     * @param {vos.SummaryScreenState} [State] {@link vos.SummaryScreenState}
     * @constructor
     */
    vos.VPGListScreenVisualObject = function(ProtectionGroups, SiteDetails, State){
        /** @type {vos.VPGListScreenItem[]} */
        this.ProtectionGroups = ProtectionGroups;
        /** @type {vos.SiteDetailsVisualObject} */
        this.SiteDetails = SiteDetails;
        /** @type {vos.SummaryScreenState} */
        this.State = State;
    };
    /**
     * @param {enums.MoveNextAction} [Action] {@link enums.MoveNextAction}
     * @param {boolean} [AutoContinueActivated] {@link boolean}
     * @param {number} [TimeLeftInSec] {@link number}
     * @constructor
     */
    vos.VPGMoveAutoContinueStateVisual = function(Action, AutoContinueActivated, TimeLeftInSec){
        /** @type {enums.MoveNextAction} */
        this.Action = Action;
        /** @type {boolean} */
        this.AutoContinueActivated = AutoContinueActivated;
        /** @type {number} */
        this.TimeLeftInSec = TimeLeftInSec;
    };
    /**
     * @param {number} [EtaInSeconds] {@link number}
     * @param {number} [ProgressInKiloBytes] {@link number}
     * @param {number} [TotalKiloBytes] {@link number}
     * @constructor
     */
    vos.VpgProgressDetailsVisualObject = function(EtaInSeconds, ProgressInKiloBytes, TotalKiloBytes){
        /** @type {number} */
        this.EtaInSeconds = EtaInSeconds;
        /** @type {number} */
        this.ProgressInKiloBytes = ProgressInKiloBytes;
        /** @type {number} */
        this.TotalKiloBytes = TotalKiloBytes;
    };
    /**
     * @param {boolean} [IsResumeEnabled] {@link boolean}
     * @param {string} [Reason] {@link string}
     * @param {number} [TimeLeftInSeconds] {@link number}
     * @constructor
     */
    vos.VPGTimebombInfo = function(IsResumeEnabled, Reason, TimeLeftInSeconds){
        /** @type {boolean} */
        this.IsResumeEnabled = IsResumeEnabled;
        /** @type {string} */
        this.Reason = Reason;
        /** @type {number} */
        this.TimeLeftInSeconds = TimeLeftInSeconds;
    };
    /**
     * @param {vos.SiteDetailsForVpgTopologyVisualObject} [SourceSite] {@link vos.SiteDetailsForVpgTopologyVisualObject}
     * @param {vos.SiteDetailsForVpgTopologyVisualObject} [TargetSite] {@link vos.SiteDetailsForVpgTopologyVisualObject}
     * @constructor
     */
    vos.VpgTopologyViewVisualObject = function(SourceSite, TargetSite){
        /** @type {vos.SiteDetailsForVpgTopologyVisualObject} */
        this.SourceSite = SourceSite;
        /** @type {vos.SiteDetailsForVpgTopologyVisualObject} */
        this.TargetSite = TargetSite;
    };
    /**
     * @param {vos.InstalledVraInfoVisualObject} [Info] {@link vos.InstalledVraInfoVisualObject}
     * @constructor
     */
    vos.VraDetailsScreenConfiguration = function(Info){
        /** @type {vos.InstalledVraInfoVisualObject} */
        this.Info = Info;
    };
    /**
     * @param {vos.SingleGraphVisualObject} [CpuUsageInPercent] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [LocalMemoryUsageInPercent] {@link vos.SingleGraphVisualObject}
     * @param {vos.SingleGraphVisualObject} [RemoteMemoryUsageInPercent] {@link vos.SingleGraphVisualObject}
     * @constructor
     */
    vos.VraDetailsScreenPerformance = function(CpuUsageInPercent, LocalMemoryUsageInPercent, RemoteMemoryUsageInPercent){
        /** @type {vos.SingleGraphVisualObject} */
        this.CpuUsageInPercent = CpuUsageInPercent;
        /** @type {vos.SingleGraphVisualObject} */
        this.LocalMemoryUsageInPercent = LocalMemoryUsageInPercent;
        /** @type {vos.SingleGraphVisualObject} */
        this.RemoteMemoryUsageInPercent = RemoteMemoryUsageInPercent;
    };
    /**
     * @param {vos.VPGListBackupRelatedData} [BackupRelatedData] {@link vos.VPGListBackupRelatedData}
     * @param {string} [CustomerName] {@link string}
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {vos.VpgEntities} [Entities] {@link vos.VpgEntities}
     * @param {number} [IOPS] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [Identifier] {@link vos.ProtectionGroupIdentifier}
     * @param {number} [IncomingThroughputInMb] {@link number}
     * @param {string} [Name] {@link string}
     * @param {number} [NumberOfVms] {@link number}
     * @param {number} [ProvisionedStorageInMB] {@link number}
     * @param {enums.VPGRetentionPolicyType} [RetentionPolicy] {@link enums.VPGRetentionPolicyType}
     * @param {string} [SourceSiteName] {@link string}
     * @param {vos.VPGDetailsScreenState} [State] {@link vos.VPGDetailsScreenState}
     * @param {string} [TargetSiteName] {@link string}
     * @param {number} [TotalIOPS] {@link number}
     * @param {number} [TotalIncomingThroughputInMb] {@link number}
     * @param {number} [TotalNumberOfVms] {@link number}
     * @param {number} [TotalProvisionedStorageInMB] {@link number}
     * @param {number} [TotalUsedStorageInMB] {@link number}
     * @param {number} [UsedStorageInMB] {@link number}
     * @constructor
     */
    vos.VraDetailsScreenProtectionGroup = function(BackupRelatedData, CustomerName, Direction, Entities, IOPS, Identifier, IncomingThroughputInMb, Name, NumberOfVms, ProvisionedStorageInMB, RetentionPolicy, SourceSiteName, State, TargetSiteName, TotalIOPS, TotalIncomingThroughputInMb, TotalNumberOfVms, TotalProvisionedStorageInMB, TotalUsedStorageInMB, UsedStorageInMB){
        /** @type {vos.VPGListBackupRelatedData} */
        this.BackupRelatedData = BackupRelatedData;
        /** @type {string} */
        this.CustomerName = CustomerName;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {vos.VpgEntities} */
        this.Entities = Entities;
        /** @type {number} */
        this.IOPS = IOPS;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.Identifier = Identifier;
        /** @type {number} */
        this.IncomingThroughputInMb = IncomingThroughputInMb;
        /** @type {string} */
        this.Name = Name;
        /** @type {number} */
        this.NumberOfVms = NumberOfVms;
        /** @type {number} */
        this.ProvisionedStorageInMB = ProvisionedStorageInMB;
        /** @type {enums.VPGRetentionPolicyType} */
        this.RetentionPolicy = RetentionPolicy;
        /** @type {string} */
        this.SourceSiteName = SourceSiteName;
        /** @type {vos.VPGDetailsScreenState} */
        this.State = State;
        /** @type {string} */
        this.TargetSiteName = TargetSiteName;
        /** @type {number} */
        this.TotalIOPS = TotalIOPS;
        /** @type {number} */
        this.TotalIncomingThroughputInMb = TotalIncomingThroughputInMb;
        /** @type {number} */
        this.TotalNumberOfVms = TotalNumberOfVms;
        /** @type {number} */
        this.TotalProvisionedStorageInMB = TotalProvisionedStorageInMB;
        /** @type {number} */
        this.TotalUsedStorageInMB = TotalUsedStorageInMB;
        /** @type {number} */
        this.UsedStorageInMB = UsedStorageInMB;
    };
    /**
     * @param {enums.ProtectionGroupAlertStatus} [AlertStatus] {@link enums.ProtectionGroupAlertStatus}
     * @param {vos.AlertsTipVisualObject} [AlertTips] {@link vos.AlertsTipVisualObject}
     * @param {vos.VraHostGhostStatusVisual} [GhostStatus] {@link vos.VraHostGhostStatusVisual}
     * @param {number} [InstallOrUninstallProgress] {@link number}
     * @param {boolean} [IsChangeHostEnabled] {@link boolean}
     * @param {boolean} [IsChangePasswordEnabled] {@link boolean}
     * @param {boolean} [IsEditEnabled] {@link boolean}
     * @param {boolean} [IsUninstallEnabled] {@link boolean}
     * @param {boolean} [IsUpgradeEnabled] {@link boolean}
     * @param {enums.VraStatusVisual} [Status] {@link enums.VraStatusVisual}
     * @param {string} [UpgradeDetails] {@link string}
     * @param {enums.VraUpgradeStatus} [UpgradeStatus] {@link enums.VraUpgradeStatus}
     * @constructor
     */
    vos.VraDetailsScreenState = function(AlertStatus, AlertTips, GhostStatus, InstallOrUninstallProgress, IsChangeHostEnabled, IsChangePasswordEnabled, IsEditEnabled, IsUninstallEnabled, IsUpgradeEnabled, Status, UpgradeDetails, UpgradeStatus){
        /** @type {enums.ProtectionGroupAlertStatus} */
        this.AlertStatus = AlertStatus;
        /** @type {vos.AlertsTipVisualObject} */
        this.AlertTips = AlertTips;
        /** @type {vos.VraHostGhostStatusVisual} */
        this.GhostStatus = GhostStatus;
        /** @type {number} */
        this.InstallOrUninstallProgress = InstallOrUninstallProgress;
        /** @type {boolean} */
        this.IsChangeHostEnabled = IsChangeHostEnabled;
        /** @type {boolean} */
        this.IsChangePasswordEnabled = IsChangePasswordEnabled;
        /** @type {boolean} */
        this.IsEditEnabled = IsEditEnabled;
        /** @type {boolean} */
        this.IsUninstallEnabled = IsUninstallEnabled;
        /** @type {boolean} */
        this.IsUpgradeEnabled = IsUpgradeEnabled;
        /** @type {enums.VraStatusVisual} */
        this.Status = Status;
        /** @type {string} */
        this.UpgradeDetails = UpgradeDetails;
        /** @type {enums.VraUpgradeStatus} */
        this.UpgradeStatus = UpgradeStatus;
    };
    /**
     * @param {vos.DiskBoxVisualObject[]} [DiskBoxGroup] {@link vos.DiskBoxVisualObject[]}
     * @param {vos.ComputeResourceVisualObject} [HostInfo] {@link vos.ComputeResourceVisualObject}
     * @param {vos.HostVersionVisualObject} [HostVersion] {@link vos.HostVersionVisualObject}
     * @param {string} [OwningClusterName] {@link string}
     * @param {vos.VraProtectionCounters} [ProtectedCounters] {@link vos.VraProtectionCounters}
     * @param {vos.VraProtectionCounters} [RecoveryCounters] {@link vos.VraProtectionCounters}
     * @constructor
     */
    vos.VraDetailsScreenSummary = function(DiskBoxGroup, HostInfo, HostVersion, OwningClusterName, ProtectedCounters, RecoveryCounters){
        /** @type {vos.DiskBoxVisualObject[]} */
        this.DiskBoxGroup = DiskBoxGroup;
        /** @type {vos.ComputeResourceVisualObject} */
        this.HostInfo = HostInfo;
        /** @type {vos.HostVersionVisualObject} */
        this.HostVersion = HostVersion;
        /** @type {string} */
        this.OwningClusterName = OwningClusterName;
        /** @type {vos.VraProtectionCounters} */
        this.ProtectedCounters = ProtectedCounters;
        /** @type {vos.VraProtectionCounters} */
        this.RecoveryCounters = RecoveryCounters;
    };
    /**
     * @param {vos.VraDetailsScreenVirtualMachine[]} [VMs] {@link vos.VraDetailsScreenVirtualMachine[]}
     * @param {vos.VraDetailsScreenProtectionGroup[]} [VPGs] {@link vos.VraDetailsScreenProtectionGroup[]}
     * @constructor
     */
    vos.VraDetailsScreenUsage = function(VMs, VPGs){
        /** @type {vos.VraDetailsScreenVirtualMachine[]} */
        this.VMs = VMs;
        /** @type {vos.VraDetailsScreenProtectionGroup[]} */
        this.VPGs = VPGs;
    };
    /**
     * @param {string} [CustomerName] {@link string}
     * @param {enums.ProtectionGroupStateVisual} [Direction] {@link enums.ProtectionGroupStateVisual}
     * @param {number} [IOPS] {@link number}
     * @param {number} [IncomingThroughputInMb] {@link number}
     * @param {number} [ProvisionedStorageInMB] {@link number}
     * @param {string} [SourceSiteName] {@link string}
     * @param {vos.VPGDetailsScreenState} [State] {@link vos.VPGDetailsScreenState}
     * @param {string} [TargetSiteName] {@link string}
     * @param {number} [UsedStorageInMB] {@link number}
     * @param {vos.ProtectionGroupIdentifier} [VPGIdentifier] {@link vos.ProtectionGroupIdentifier}
     * @param {string} [VPGName] {@link string}
     * @param {vos.VMIdentifier} [VirtualMachineIdentifier] {@link vos.VMIdentifier}
     * @param {string} [VirtualMachineName] {@link string}
     * @constructor
     */
    vos.VraDetailsScreenVirtualMachine = function(CustomerName, Direction, IOPS, IncomingThroughputInMb, ProvisionedStorageInMB, SourceSiteName, State, TargetSiteName, UsedStorageInMB, VPGIdentifier, VPGName, VirtualMachineIdentifier, VirtualMachineName){
        /** @type {string} */
        this.CustomerName = CustomerName;
        /** @type {enums.ProtectionGroupStateVisual} */
        this.Direction = Direction;
        /** @type {number} */
        this.IOPS = IOPS;
        /** @type {number} */
        this.IncomingThroughputInMb = IncomingThroughputInMb;
        /** @type {number} */
        this.ProvisionedStorageInMB = ProvisionedStorageInMB;
        /** @type {string} */
        this.SourceSiteName = SourceSiteName;
        /** @type {vos.VPGDetailsScreenState} */
        this.State = State;
        /** @type {string} */
        this.TargetSiteName = TargetSiteName;
        /** @type {number} */
        this.UsedStorageInMB = UsedStorageInMB;
        /** @type {vos.ProtectionGroupIdentifier} */
        this.VPGIdentifier = VPGIdentifier;
        /** @type {string} */
        this.VPGName = VPGName;
        /** @type {vos.VMIdentifier} */
        this.VirtualMachineIdentifier = VirtualMachineIdentifier;
        /** @type {string} */
        this.VirtualMachineName = VirtualMachineName;
    };
    /**
     * @param {vos.VraDetailsScreenConfiguration} [Config] {@link vos.VraDetailsScreenConfiguration}
     * @param {vos.VraDetailsScreenPerformance} [Performance] {@link vos.VraDetailsScreenPerformance}
     * @param {vos.VraDetailsScreenState} [State] {@link vos.VraDetailsScreenState}
     * @param {vos.VraDetailsScreenSummary} [Summary] {@link vos.VraDetailsScreenSummary}
     * @param {vos.VraDetailsScreenUsage} [Usage] {@link vos.VraDetailsScreenUsage}
     * @constructor
     */
    vos.VraDetailsScreenVisualObject = function(Config, Performance, State, Summary, Usage){
        /** @type {vos.VraDetailsScreenConfiguration} */
        this.Config = Config;
        /** @type {vos.VraDetailsScreenPerformance} */
        this.Performance = Performance;
        /** @type {vos.VraDetailsScreenState} */
        this.State = State;
        /** @type {vos.VraDetailsScreenSummary} */
        this.Summary = Summary;
        /** @type {vos.VraDetailsScreenUsage} */
        this.Usage = Usage;
    };
    /**
     * @param {boolean} [IsGhost] {@link boolean}
     * @constructor
     */
    vos.VraHostGhostStatusVisual = function(IsGhost){
        /** @type {boolean} */
        this.IsGhost = IsGhost;
    };
    /**
     * @param {number} [BadIoLatencyMs] {@link number}
     * @param {number} [NumBadIosInPeriod] {@link number}
     * @param {number} [NumBadPeriodsForCongested] {@link number}
     * @param {number} [PeriodDurationMs] {@link number}
     * @param {boolean} [IsEnabled] {@link boolean}
     * @constructor
     */
    vos.VraIoCongestionControlParams = function(BadIoLatencyMs, NumBadIosInPeriod, NumBadPeriodsForCongested, PeriodDurationMs, IsEnabled){
        /** @type {number} */
        this.BadIoLatencyMs = BadIoLatencyMs;
        /** @type {number} */
        this.NumBadIosInPeriod = NumBadIosInPeriod;
        /** @type {number} */
        this.NumBadPeriodsForCongested = NumBadPeriodsForCongested;
        /** @type {number} */
        this.PeriodDurationMs = PeriodDurationMs;
        /** @type {boolean} */
        this.IsEnabled = IsEnabled;
    };
    /**
     * @param {string} [DefaultGw] {@link string}
     * @param {string} [Ip] {@link string}
     * @param {string} [NetMask] {@link string}
     * @param {string} [PeerGw] {@link string}
     * @param {string} [PeerNetMask] {@link string}
     * @param {string} [PeerNetwork] {@link string}
     * @constructor
     */
    vos.VraIpConf = function(DefaultGw, Ip, NetMask, PeerGw, PeerNetMask, PeerNetwork){
        /** @type {string} */
        this.DefaultGw = DefaultGw;
        /** @type {string} */
        this.Ip = Ip;
        /** @type {string} */
        this.NetMask = NetMask;
        /** @type {string} */
        this.PeerGw = PeerGw;
        /** @type {string} */
        this.PeerNetMask = PeerNetMask;
        /** @type {string} */
        this.PeerNetwork = PeerNetwork;
    };
    /**
     * @param {vos.ComputeResourceVisualObject} [HostInfo] {@link vos.ComputeResourceVisualObject}
     * @param {boolean} [IsPartOfCluster] {@link boolean}
     * @param {string} [LastError] {@link string}
     * @param {string} [OwningClusterName] {@link string}
     * @param {vos.VraProtectionCounters} [ProtectedCounters] {@link vos.VraProtectionCounters}
     * @param {vos.VraProtectionCounters} [RecoveryCounters] {@link vos.VraProtectionCounters}
     * @param {number} [SelfProtectedVpgs] {@link number}
     * @param {vos.VraDetailsScreenState} [State] {@link vos.VraDetailsScreenState}
     * @param {vos.HostVersionVisualObject} [Version] {@link vos.HostVersionVisualObject}
     * @param {vos.InstalledVraInfoVisualObject} [VraInfo] {@link vos.InstalledVraInfoVisualObject}
     * @constructor
     */
    vos.VraListScreenItem = function(HostInfo, IsPartOfCluster, LastError, OwningClusterName, ProtectedCounters, RecoveryCounters, SelfProtectedVpgs, State, Version, VraInfo){
        /** @type {vos.ComputeResourceVisualObject} */
        this.HostInfo = HostInfo;
        /** @type {boolean} */
        this.IsPartOfCluster = IsPartOfCluster;
        /** @type {string} */
        this.LastError = LastError;
        /** @type {string} */
        this.OwningClusterName = OwningClusterName;
        /** @type {vos.VraProtectionCounters} */
        this.ProtectedCounters = ProtectedCounters;
        /** @type {vos.VraProtectionCounters} */
        this.RecoveryCounters = RecoveryCounters;
        /** @type {number} */
        this.SelfProtectedVpgs = SelfProtectedVpgs;
        /** @type {vos.VraDetailsScreenState} */
        this.State = State;
        /** @type {vos.HostVersionVisualObject} */
        this.Version = Version;
        /** @type {vos.InstalledVraInfoVisualObject} */
        this.VraInfo = VraInfo;
    };
    /**
     * @param {string} [DisplayName] {@link string}
     * @param {vos.HostVersionVisualObject} [HostVersion] {@link vos.HostVersionVisualObject}
     * @param {enums.VraListScreenTreeNodeVisualType} [NodeType] {@link enums.VraListScreenTreeNodeVisualType}
     * @param {boolean} [Selected] {@link boolean}
     * @param {vos.VraListScreenItem} [VraInfo] {@link vos.VraListScreenItem}
     * @param {vos.VraListScreenTreeNodeVisual[]} [children] {@link vos.VraListScreenTreeNodeVisual[]}
     * @constructor
     */
    vos.VraListScreenTreeNodeVisual = function(DisplayName, HostVersion, NodeType, Selected, VraInfo, children){
        /** @type {string} */
        this.DisplayName = DisplayName;
        /** @type {vos.HostVersionVisualObject} */
        this.HostVersion = HostVersion;
        /** @type {enums.VraListScreenTreeNodeVisualType} */
        this.NodeType = NodeType;
        /** @type {boolean} */
        this.Selected = Selected;
        /** @type {vos.VraListScreenItem} */
        this.VraInfo = VraInfo;
        /** @type {vos.VraListScreenTreeNodeVisual[]} */
        this.children = children;
    };
    /**
     * @param {boolean} [CanInstallAdditionalVras] {@link boolean}
     * @param {boolean} [EnableManageVras] {@link boolean}
     * @param {boolean} [EnablePairedSiteRouting] {@link boolean}
     * @param {string} [LatestVraVersion] {@link string}
     * @param {vos.VraListScreenTreeNodeVisual} [VraListTree] {@link vos.VraListScreenTreeNodeVisual}
     * @constructor
     */
    vos.VraListScreenVisualObject = function(CanInstallAdditionalVras, EnableManageVras, EnablePairedSiteRouting, LatestVraVersion, VraListTree){
        /** @type {boolean} */
        this.CanInstallAdditionalVras = CanInstallAdditionalVras;
        /** @type {boolean} */
        this.EnableManageVras = EnableManageVras;
        /** @type {boolean} */
        this.EnablePairedSiteRouting = EnablePairedSiteRouting;
        /** @type {string} */
        this.LatestVraVersion = LatestVraVersion;
        /** @type {vos.VraListScreenTreeNodeVisual} */
        this.VraListTree = VraListTree;
    };
    /**
     * @param {number} [PromotingVms] {@link number}
     * @param {number} [StorageSizeInMB] {@link number}
     * @param {number} [TestOrRecoverBeforeCommitVms] {@link number}
     * @param {number} [Vms] {@link number}
     * @param {number} [Volumes] {@link number}
     * @param {number} [Vpgs] {@link number}
     * @constructor
     */
    vos.VraProtectionCounters = function(PromotingVms, StorageSizeInMB, TestOrRecoverBeforeCommitVms, Vms, Volumes, Vpgs){
        /** @type {number} */
        this.PromotingVms = PromotingVms;
        /** @type {number} */
        this.StorageSizeInMB = StorageSizeInMB;
        /** @type {number} */
        this.TestOrRecoverBeforeCommitVms = TestOrRecoverBeforeCommitVms;
        /** @type {number} */
        this.Vms = Vms;
        /** @type {number} */
        this.Volumes = Volumes;
        /** @type {number} */
        this.Vpgs = Vpgs;
    };
    /**
     * @constructor
     */
    vos.ZertoException = function(){
    };
    /**
     * @param {string} [CrmIdentifier] {@link string}
     * @param {boolean} [EnableCustomProfile] {@link boolean}
     * @param {vos.ZertoOrganizationIdentifier} [Identifier] {@link vos.ZertoOrganizationIdentifier}
     * @param {string} [OrganizationName] {@link string}
     * @constructor
     */
    vos.ZertoOrganizationForVPGVisualObject = function(CrmIdentifier, EnableCustomProfile, Identifier, OrganizationName){
        /** @type {string} */
        this.CrmIdentifier = CrmIdentifier;
        /** @type {boolean} */
        this.EnableCustomProfile = EnableCustomProfile;
        /** @type {vos.ZertoOrganizationIdentifier} */
        this.Identifier = Identifier;
        /** @type {string} */
        this.OrganizationName = OrganizationName;
    };
    /**
     * @param {string} [Guid] {@link string}
     * @constructor
     */
    vos.ZertoOrganizationIdentifier = function(Guid){
        /** @type {string} */
        this.Guid = Guid;
    };
    /**
     * @param {string} [Branch] {@link string}
     * @param {number} [Build] {@link number}
     * @param {number} [Major] {@link number}
     * @param {number} [Minor] {@link number}
     * @param {number} [Update] {@link number}
     * @param {string} [HotFixes] {@link string}
     * @constructor
     */
    vos.ZertoVersion = function(Branch, Build, Major, Minor, Update, HotFixes){
        /** @type {string} */
        this.Branch = Branch;
        /** @type {number} */
        this.Build = Build;
        /** @type {number} */
        this.Major = Major;
        /** @type {number} */
        this.Minor = Minor;
        /** @type {number} */
        this.Update = Update;
        /** @type {string} */
        this.HotFixes = HotFixes;
    };
    /**
     * @param {string} [Identifier] {@link string}
     * @constructor
     */
    vos.ZertoVMIdentifier = function(Identifier){
        /** @type {string} */
        this.Identifier = Identifier;
    };
    
    return vos;
    /* jshint ignore:end */
});
