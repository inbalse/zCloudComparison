'use strict';

describe('recovered/clone/backup sure that all vms recovered service', function () {
    var allRecoveredVmsApiFactory, allRecoveredVmsApiService, zertoServiceFactory, zertoApi, vpgId, vpgName, cp, allVmsList, notRecoveredVm, selected, vmsStrNames, vmsObjNames;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_allRecoveredVmsApiService_, _allRecoveredVmsApiFactory_, _zertoServiceFactory_, _zertoApi_) {
        allRecoveredVmsApiService = _allRecoveredVmsApiService_;
        allRecoveredVmsApiFactory = _allRecoveredVmsApiFactory_;
        zertoServiceFactory = _zertoServiceFactory_;
        zertoApi = _zertoApi_;
    }));

    beforeEach(function(){
     vpgId = {"GroupGuid":"e92cbcfd-d546-4cab-88a2-436d52273189"};
     vpgName = 'vpg';
     cp = {"Identifier":{"Identifier":181},"TimeStamp":"2015-11-08T07:06:48.000Z","Tag":null,"Vss":false,"type":"auto","timeObj":{"display":"Nov 8, 2015 09:06:48","value":"auto","filterValue":"2015-11-08T07:06:48.000Z"},"id":181};;
     allVmsList = [{"VirtualMachineIdentifier":{"InternalVmName":"vm-379","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"VirtualMachineName":"naom vm - testing recovery(1)","VPGIdentifier":{"GroupGuid":"e92cbcfd-d546-4cab-88a2-436d52273189"},"AlertStatus":0,"VPGName":"vpg","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"ProvisionedStorageInMB":138,"UsedStorageInMB":126,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":3,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"OwnersId":{"OwnersGuid":"2b867cf3-8230-4d2e-81d1-b079fe5dbf59"},"SourceSiteName":"gui_local_vcd","TargetSiteName":"gui_local_vcd","CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":null,"RetentionPolicy":0,"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}}},{"VirtualMachineIdentifier":{"InternalVmName":"vm-370","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"VirtualMachineName":"liron-vm-2","VPGIdentifier":{"GroupGuid":"e92cbcfd-d546-4cab-88a2-436d52273189"},"AlertStatus":0,"VPGName":"vpg","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"ProvisionedStorageInMB":166,"UsedStorageInMB":166,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":3,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"OwnersId":{"OwnersGuid":"2b867cf3-8230-4d2e-81d1-b079fe5dbf59"},"SourceSiteName":"gui_local_vcd","TargetSiteName":"gui_local_vcd","CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":null,"RetentionPolicy":0,"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}}}];
     notRecoveredVm = [{"VirtualMachineIdentifier":{"InternalVmName":"vm-370","ServerIdentifier":{"ServerGuid":"598e5def-3500-4409-a691-d25b5cd10d22"}},"VirtualMachineName":"liron-vm-2","VPGIdentifier":{"GroupGuid":"e92cbcfd-d546-4cab-88a2-436d52273189"},"AlertStatus":0,"VPGName":"vpg","State":{"State":0,"Status":1,"SubStatus":0,"IsProgressActive":false,"ProgressPercentage":0,"ProgressDetails":null,"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsInsertCheckpointEnabled":true,"RelevantCheckpoint":null,"IsProtectedSiteConnected":true,"AlertStatus":0,"AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"VPGTimebombInfo":null,"CloneStatusVisualObject":null,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"MoveAutoContinueState":{"AutoContinueActivated":false,"Action":1,"TimeLeftInSec":0},"RequiresForceToDelete":false,"PauseResumeVisualObject":{"IsVpgNowPaused":false,"IsPauseEnabled":true,"IsResumeEnabled":false},"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"ActiveProcesses":{"RunningFailOverTest":null,"RunningClone":null,"Paused":null,"IsVpgNowPaused":false,"IsResumeEnabled":false,"RunningBackup":null,"IsStopFOTEnabled":false,"VpgUpdate":null,"TimebombInfo":null},"ButtonsState":{"IsFailoverEnabled":true,"IsMoveEnabled":true,"IsFailoverTestEnabled":true,"IsUpdateEnabled":true,"IsPauseEnabled":true,"IsInsertCheckpointEnabled":true,"IsProtectedSiteConnected":true,"IsDeleteEnabled":true,"IsForceSyncEnabled":true,"IsCloneEnabled":true,"IsMoveInStagesSupported":true,"IsFailoverInStagesSupported":true,"IsRecoverCommitEnabled":false,"IsRecoverRollbackEnabled":false,"RequiresForceToDelete":false,"IsBackupEnabled":false,"IsAbortBackupEnabled":false},"ProgressObject":null,"VMsInInitialSync":0},"Priority":1,"ProvisionedStorageInMB":166,"UsedStorageInMB":166,"IOPS":0,"IncomingThroughputInMb":0,"OutgoingBandWidth":0,"ActualRPO":3,"ConfiguredRPO":300,"LastTest":null,"Direction":2,"OwnersId":{"OwnersGuid":"2b867cf3-8230-4d2e-81d1-b079fe5dbf59"},"SourceSiteName":"gui_local_vcd","TargetSiteName":"gui_local_vcd","CustomerName":"","AlertTips":{"Alerts":[],"HasMore":false,"TotalNumberOfAlerts":0,"TotalNumberOfWarnings":0,"TotalNumberOfErrors":0},"Entities":{"Source":0,"Target":0},"ZorgId":null,"RetentionPolicy":0,"BackupRelatedData":{"VpgBackupJobStatus":2,"BackupRepository":"","RestorePointsRange":5,"BackupSchedulingTime":{"SchedulePeriodType":0,"RunningTimeOfDayInMinutes":0,"DayOfWeek":6}}}];
     selected = [{Identifier: vpgId}, {recoveryItemVo: { lastCheckpoint: cp}}];

     vmsStrNames = ['cx322', 'oi88', '55rss', 'mmnn66'];
     vmsObjNames = [{VirtualMachineName:'cx322'},{VirtualMachineName:'oi88'},{VirtualMachineName:'55rss'},{VirtualMachineName:'mmnn66'}];
    });

    it("should have all function to be defined", function () {
        expect(allRecoveredVmsApiService.sureAllVmsRecoveredPerAllVpgs).toBeDefined();
        expect(allRecoveredVmsApiService.sureAllVmsRecoveredPerOneVpg).toBeDefined();
        expect(allRecoveredVmsApiFactory._private.releaseVmsRecoveryVerifyProcess).toBeDefined();
        expect(allRecoveredVmsApiFactory._private.getVmsListNames).toBeDefined();
        expect(allRecoveredVmsApiFactory._private.getInfoMessages).toBeDefined();
        expect(allRecoveredVmsApiFactory._private.wrapMessages).toBeDefined();
        expect(allRecoveredVmsApiService._private.getVmsList).toBeDefined();
        expect(allRecoveredVmsApiFactory._private.buildWarningMessagePerAllVpgs).toBeDefined();
        expect(allRecoveredVmsApiFactory.handelVmsPerAllVpgsCpResultsFunc).toBeDefined();

        expect(allRecoveredVmsApiFactory._private.buildWarningMessagePerOneVpg).toBeDefined();
        expect(allRecoveredVmsApiFactory.handelVmsPerOneVpgCpResultsFunc).toBeDefined();
    });

    it('should verify if GetProtectedVirtualMachineListScreen been called in sureAllVmsRecoveredPerOneVpg function', function(){
        spyOn(zertoServiceFactory, 'GetProtectedVirtualMachineListScreen').and.callThrough();
        spyOn(zertoApi, 'makeRequestWrapper').and.callThrough();

        allRecoveredVmsApiService.sureAllVmsRecoveredPerOneVpg(vpgId, vpgName, cp).then(function(){});
        expect(zertoServiceFactory.GetProtectedVirtualMachineListScreen).toHaveBeenCalled();
    });

    it('should verify if GetProtectedVirtualMachineListScreen been called in sureAllVmsRecoveredPerAllVpgs function', function(){
        spyOn(zertoServiceFactory, 'GetProtectedVirtualMachineListScreen').and.callThrough();
        spyOn(zertoApi, 'makeRequestWrapper').and.callThrough();

        allRecoveredVmsApiService.sureAllVmsRecoveredPerAllVpgs(selected).then(function(){});
        expect(zertoServiceFactory.GetProtectedVirtualMachineListScreen).toHaveBeenCalled();
    });

    it('should check that getVmsListNames function returns right string', function(){

       var res = allRecoveredVmsApiFactory._private.getVmsListNames(vmsStrNames);
        expect(res).toEqual('cx322, oi88, 55rss, mmnn66');
        allRecoveredVmsApiFactory._private.releaseVmsRecoveryVerifyProcess();

        res = allRecoveredVmsApiFactory._private.getVmsListNames(vmsObjNames);
        expect(res).toEqual('cx322, oi88, 55rss, mmnn66');
    });

    it('should check that getInfoMessages function returns right result', function(){
        var message = allRecoveredVmsApiFactory._private.getInfoMessages(vpgName, vmsStrNames);
        expect(message).toEqual('<div>VMs cx322, oi88, 55rss, mmnn66 in VPG vpg</div>')
    });

    it('should check that buildWarningMessagePerAllVpgs build right warning massage', function(){
        var warnMessage = allRecoveredVmsApiFactory._private.buildWarningMessagePerAllVpgs(notRecoveredVm);
        expect(warnMessage).toEqual('<div>The following VMs were not protected when the selected checkpoint was taken:</div></div><div><div>VMs liron-vm-2 in VPG vpg</div></div><div><div>Only the VMs that were protected at this time will be .</div></div>');
    });

    it('should check that handelVmsPerAllVpgsCpResultsFunc build right warning massage', function(){
        var vmsThatNotRecovered = allRecoveredVmsApiFactory.handelVmsPerAllVpgsCpResultsFunc([notRecoveredVm], selected, allVmsList);
        expect(vmsThatNotRecovered).toEqual('<div>The following VMs were not protected when the selected checkpoint was taken:</div></div><div><div>VMs naom vm - testing recovery(1), liron-vm-2 in VPG vpg</div></div><div><div>Only the VMs that were protected at this time will be .</div></div>');
    });

    it('should check that buildWarningMessagePerOneVpg build right warning massage', function(){
        var vmsThatNotRecovered = allRecoveredVmsApiFactory._private.buildWarningMessagePerOneVpg(notRecoveredVm,vpgId,vpgName);
        expect(vmsThatNotRecovered).toEqual('<div>The following VMs were not protected when the selected checkpoint was taken:</div></div><div><div>VMs liron-vm-2 in VPG vpg</div></div><div><div>Only the VMs that were protected at this time will be .</div></div>');
    });

    it('should check that handelVmsPerOneVpgCpResultsFunc build right warning massage', function(){
        var vmsThatNotRecovered = allRecoveredVmsApiFactory.handelVmsPerOneVpgCpResultsFunc(notRecoveredVm, vpgId, vpgName, allVmsList);
        var result = '<div>The following VMs were not protected when the selected checkpoint was taken:</div></div><div><div>VMs naom vm - testing recovery(1), liron-vm-2 in VPG vpg</div></div><div><div>Only the VMs that were protected at this time will be .</div></div>';
        expect(vmsThatNotRecovered).toEqual(result);
    });
});
