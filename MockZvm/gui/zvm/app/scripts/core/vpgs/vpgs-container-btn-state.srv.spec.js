'use strict';
describe('VPGS container button state', function () {
    var vpgsContainerBtnStateService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_vpgsContainerBtnStateService_) {
        vpgsContainerBtnStateService = _vpgsContainerBtnStateService_
    }));

    it('should check if update is enabled', function () {
        var items = [{State: {ButtonsState: {IsUpdateEnabled: true}}}],
            result = vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled(items);

        expect(result).toBeTruthy();
        items[0].State.ButtonsState.IsUpdateEnabled = false;
        result = vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled(items);
        expect(result).toBeFalsy();
        items[0].State.ButtonsState.IsUpdateEnabled = true;
        items.push({});
        result = vpgsContainerBtnStateService.checkSelectedForUpdateVPGEnabled(items);
        expect(result).toBeFalsy();
    });

    it('should check if delete is enabled', function () {
        var items = [{State: {ButtonsState: {IsDeleteEnabled: true}}}],
            result = vpgsContainerBtnStateService.checkSelectedForDeleteEnabled(items);

        expect(result).toBeTruthy();
        items[0].State.ButtonsState.IsDeleteEnabled = false;
        result = vpgsContainerBtnStateService.checkSelectedForDeleteEnabled(items);
        expect(result).toBeFalsy();
        items[0].State.ButtonsState.IsDeleteEnabled = true;
        items.push({});
        result = vpgsContainerBtnStateService.checkSelectedForDeleteEnabled(items);
        expect(result).toBeFalsy();
    });

    it('should check if pause is enabled', function () {
        var items = [{State: {ButtonsState: {IsPauseEnabled: true}}}, {State: {ButtonsState: {IsPauseEnabled: true}}}, {State: {ButtonsState: {IsPauseEnabled: true}}}],
            result = vpgsContainerBtnStateService.checkSelectedForPauseEnabled(items);
        expect(result).toBeTruthy();

        items = [{State: {ButtonsState: {IsPauseEnabled: true}}}, {State: {ButtonsState: {IsPauseEnabled: true}}}, {State: {ButtonsState: {IsPauseEnabled: false}}}];
        result = vpgsContainerBtnStateService.checkSelectedForPauseEnabled(items);
        expect(result).toBeFalsy();

        items = [];
        result = vpgsContainerBtnStateService.checkSelectedForPauseEnabled(items);
        expect(result).toBeFalsy();
    });

    it('should check if resume is enabled', function () {
        var items = [{State: {ActiveProcesses: {IsResumeEnabled: true}}}, {State: {ActiveProcesses: {IsResumeEnabled: true}}}, {State: {ActiveProcesses: {IsResumeEnabled: true}}}],
            result = vpgsContainerBtnStateService.checkSelectedForResumeEnabled(items);
        expect(result).toBeTruthy();

        items = [{State: {ActiveProcesses: {IsResumeEnabled: true}}}, {State: {ActiveProcesses: {IsResumeEnabled: true}}}, {State: {ActiveProcesses: {IsResumeEnabled: false}}}];
        result = vpgsContainerBtnStateService.checkSelectedForResumeEnabled(items);
        expect(result).toBeFalsy();

        items = [];
        result = vpgsContainerBtnStateService.checkSelectedForResumeEnabled(items);
        expect(result).toBeFalsy();
    });

    it('should check if backup is enabled', function () {
        var items = [{State: {ButtonsState: {IsBackupEnabled: true}}}, {State: {ButtonsState: {IsBackupEnabled: true}}}, {State: {ButtonsState: {IsBackupEnabled: true}}}],
            result = vpgsContainerBtnStateService.checkSelectedForRunBackup(items);
        expect(result).toBeTruthy();

        items = [{State: {ButtonsState: {IsBackupEnabled: true}}}, {State: {ButtonsState: {IsBackupEnabled: true}}}, {State: {ButtonsState: {IsBackupEnabled: false}}}];
        result = vpgsContainerBtnStateService.checkSelectedForRunBackup(items);
        expect(result).toBeFalsy();

        items = [];
        result = vpgsContainerBtnStateService.checkSelectedForRunBackup(items);
        expect(result).toBeFalsy();
    });

    it('should check if abort backup is enabled', function () {
        var items = [{State: {ButtonsState: {IsAbortBackupEnabled: true}}}, {State: {ButtonsState: {IsAbortBackupEnabled: true}}}, {State: {ButtonsState: {IsAbortBackupEnabled: true}}}],
            result = vpgsContainerBtnStateService.checkSelectedForAbortBackup(items);
        expect(result).toBeTruthy();

        items = [{State: {ButtonsState: {IsAbortBackupEnabled: true}}}, {State: {ButtonsState: {IsAbortBackupEnabled: true}}}, {State: {ButtonsState: {IsAbortBackupEnabled: false}}}];
        result = vpgsContainerBtnStateService.checkSelectedForAbortBackup(items);
        expect(result).toBeFalsy();

        items = [];
        result = vpgsContainerBtnStateService.checkSelectedForAbortBackup(items);
        expect(result).toBeFalsy();
    });

    it('should check if force sync is enabled', function () {
        var items = [{State: {ButtonsState: {IsForceSyncEnabled: true}}}],
            result = vpgsContainerBtnStateService.checkSelectedForForceSyncEnabled(items);

        expect(result).toBeTruthy();
        items[0].State.ButtonsState.IsForceSyncEnabled = false;
        result = vpgsContainerBtnStateService.checkSelectedForForceSyncEnabled(items);
        expect(result).toBeFalsy();
        items[0].State.ButtonsState.IsForceSyncEnabled = true;
        items.push({});
        result = vpgsContainerBtnStateService.checkSelectedForForceSyncEnabled(items);
        expect(result).toBeFalsy();
    });

    it('should check if stop failover test is enabled', function () {
        var items = [{State: {ActiveProcesses: {RunningFailOverTest: {StopEnabled: true}}}}, {State: {ActiveProcesses: {RunningFailOverTest: {
                                StopEnabled: true
                            }}}}, {State: {ActiveProcesses: {RunningFailOverTest: {StopEnabled: true}}}}],
            result = vpgsContainerBtnStateService.checkSelectedForStopFot(items);
        expect(result).toBeTruthy();

        items = [{State: {ActiveProcesses: {RunningFailOverTest: {StopEnabled: true}}}}, {State: {ActiveProcesses: {RunningFailOverTest: {
            StopEnabled: true
        }}}}, {State: {ActiveProcesses: {RunningFailOverTest: {StopEnabled: false}}}}];
        result = vpgsContainerBtnStateService.checkSelectedForStopFot(items);
        expect(result).toBeFalsy();


        items = [{State: {}}, {State: {ActiveProcesses: {RunningFailOverTest: {
            StopEnabled: true
        }}}}, {State: {ActiveProcesses: {RunningFailOverTest: {StopEnabled: false}}}}];
        result = vpgsContainerBtnStateService.checkSelectedForStopFot(items);
        expect(result).toBeFalsy();

        items = [];
        result = vpgsContainerBtnStateService.checkSelectedForStopFot(items);
        expect(result).toBeFalsy();
    });
});
