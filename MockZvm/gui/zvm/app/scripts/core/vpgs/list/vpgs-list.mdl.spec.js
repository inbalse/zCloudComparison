'use strict';

describe('VPGS list model', function () {
    var vpgsListModel, zertoServiceUpdaterFactory, zTabsStateConstants, displayRPOFilter, entityCases;

    // var template = {
    //     'ProtectionGroups|5-10': [{
    //         'AlertStatus|0-2': 0,
    //         'Direction|0-2': 0,
    //         'Name':'@first',
    //         'SourceSiteName':'@name',
    //         'TargetSiteName':'@name',
    //         'Priority|0-2': 0,
    //         'State':{'ButtonsState': {'IsUpdateEnabled|1': true, 'IsDeleteEnabled|1': true, 'IsAbortBackupEnabled|1': true, 'IsBackupEnabled|1': true}, ProgressObject:{'ProgressPercentage|0-100': 50}, 'SubStatus|0-28':0, 'Status|0-6':0, ActiveProcesses:{RunningBackup:{'ProgressValue|0-100':5}}},//State.status/ActiveProcesses
    //         'CustomerName':'@name',
    //         'IOPS|0-2048': 1024,
    //         'IncomingThroughputInMb|1-123123123': 1024,
    //         'OutgoingBandWidth|1-123123123': 1024,
    //         'ProvisionedStorageInMB|1-123123123': 1024,
    //         'UsedStorageInMB|1-123123123': 1024,
    //         'ActualRPO|0-550': 6,
    //         'LastTest':new Date(),
    //         'RetentionPolicy|0-1': 1,
    //         'Identifier': {'GroupGuid|+1': 0 },
    //         'BackupRelatedData':{'VpgBackupJobStatus|0-3':0, 'RestorePointsRange|0-5':0, BackupSchedulingTime:{'RunningTimeOfDayInMinutes|5-500':5, 'SchedulePeriodType|0-1':0, 'DayOfWeek|0-6':1}}
    //     }]
    // };
    // var data = Mock.mock(template);
    // var singleItemArray = [_.first(data.ProtectionGroups)];
    // singleItemArray[0].State.ButtonsState.IsUpdateEnabled = true;
    // singleItemArray[0].State.ButtonsState.IsDeleteEnabled = true;
    // singleItemArray[0].State.ButtonsState.IsAbortBackupEnabled = true;
    // singleItemArray[0].State.ButtonsState.IsBackupEnabled = true;
    //
    // var summaryData = {};
    // summaryData.IsGeneralPauseEnabled = true;
    // summaryData.IsGeneralResumeEnabled = true;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($filter, _vpgsListModel_, _zertoServiceUpdaterFactory_, _zTabsStateConstants_, _entityCases_) {
        vpgsListModel = _vpgsListModel_;
        zertoServiceUpdaterFactory = _zertoServiceUpdaterFactory_;
        zTabsStateConstants = _zTabsStateConstants_;
        entityCases = _entityCases_;
        displayRPOFilter = $filter('displayRPO');
    }));


    it('should register to get the vpg list', function () {
        spyOn(zertoServiceUpdaterFactory, 'register');
        var scope = {};
        vpgsListModel.register(scope);

        expect(zertoServiceUpdaterFactory.register)
            .toHaveBeenCalledWith(scope, 'GetProtectionGroupListScreen', [], false, vpgsListModel.processData);

    });

    it('should return the correct gridId', function () {
        var gridId = vpgsListModel.getGridId();

        expect(gridId).toEqual(zTabsStateConstants.LIST.VPGS);
    });

    it('should have functions defined', function () {
        var type = 'function';
        expect(typeof vpgsListModel.getGridColumnsDefs).toBe(type);
        expect(typeof vpgsListModel.getGridDefaultViews).toBe(type);
        expect(typeof vpgsListModel.processData).toBe(type);
    });

    it('should set the vpg operation', function () {
        var item = {},
            taskData = {
                process: {x: 1},
                operation: {y: 2}
            };

        vpgsListModel.setVPGOperation(item, taskData);
        expect(item.stateProcess).toBe(taskData.process);
        expect(item.operation).toBe(taskData.operation);
    });

    it('should set the vpg state', function () {
        var vpgState = {
            showProgress: true,
            value: 50,
            display: 'text'
        };
        vpgsListModel.setVPGState(vpgState);
        expect(vpgState.divClass).toBe('state-column-active');
        expect(vpgState.spanClass).toBe('progress-span');
        expect(vpgState.display).toBe('text');

        vpgState = {
            showProgress: false,
            value: 0
        };

        vpgsListModel.setVPGState(vpgState);
        expect(vpgState.divClass).toBe('none');
        expect(vpgState.spanClass).toBe('none');
        expect(vpgState.display).not.toBeDefined();

    });

    it('should set the actual rpo object', function () {
        var item = {ActualRPO: -10},
            result;

        item.ActualRPO = 100;
        result = vpgsListModel.setActualRPOObj(item);
        expect(result).toEqual({display: displayRPOFilter(100), value: 100});
    });

    it('should set the delete vpg button', function () {
        var item = {
            State: {
                ButtonsState: {
                    IsDeleteEnabled: true
                }
            }
        };

        var result = vpgsListModel.setVPGDeleteIcon(item);
        expect(result).toEqual({type: entityCases.caseDelete, enabled: true});

        item.State.ButtonsState.IsDeleteEnabled = false;
        result = vpgsListModel.setVPGDeleteIcon(item);
        expect(result).toEqual({type: entityCases.caseDelete, enabled: false});
    });

   it('should set the edit vpg button', function () {
        var item = {
            State: {
                ButtonsState: {
                    IsUpdateEnabled: true
                }
            }
        };

        var result = vpgsListModel.setVPGEditIcon(item);
        expect(result).toEqual({type: entityCases.caseEdit, enabled: true});

        item.State.ButtonsState.IsUpdateEnabled = false;
        result = vpgsListModel.setVPGEditIcon(item);
        expect(result).toEqual({type: entityCases.caseEdit, enabled: false});
    });

    // it("should make a list of new identifiers", function(){
    //     var result = model._getProtectionGroupIdent(data.ProtectionGroups);
    //     expect(result[result.length-1].GroupGuid).toBe(result.length-1);
    // });
    //
    // it('should check Selected For Run Backup', function () {
    //     var result = model.checkSelectedForRunBackup(singleItemArray);
    //     expect(result).toBe(true);
    // });
    //
    // it('should check Selected For Abort Backup', function () {
    //     var result = model.checkSelectedForAbortBackup(singleItemArray);
    //     expect(result).toBe(true);
    // });
    //
    // it('should check Selected For Update VPG Enabled', function () {
    //     var result = model.checkSelectedForUpdateVPGEnabled(data.ProtectionGroups);
    //     expect(result).toBe(false);
    //     result = model.checkSelectedForUpdateVPGEnabled(singleItemArray);
    //     expect(result).toBe(true);// is enabled only with one item
    // });
    //
    // it('should check Selected For Delete Enabled', function () {
    //     var result = model.checkSelectedForDeleteEnabled(data.ProtectionGroups);
    //     expect(result).toBe(false);
    //     result = model.checkSelectedForDeleteEnabled(singleItemArray);
    //     expect(result).toBe(true);// is enabled only with one item
    // });
    //
    //
    // it("should check state with timeBomImfo", function () {
    //     var item = _.first(data.ProtectionGroups);
    //     item.State.VPGTimebombInfo = {TimeLeftInSeconds: 100800};
    //     model.convertStateData(item);
    //
    //     expect(item.vpgState.display.indexOf('Protection paused for another 1 day, 3 hours, 59 minutes, 59 seconds')).toBe(0);
    // });
    //
    // it("should check convertStateData function", function () {
    //     var item = _.first(data.ProtectionGroups);
    //     item.State.SubStatus = enums.VpgVisualSubStatus.Creating;
    //     item.State.ProgressObject = {ProgressPercentage: 60};
    //     model.convertStateData(item);
    //
    //     expect(item.vpgState.display).toEqual("Protection paused for another 1 day, 3 hours, 59 minutes, 59 seconds (60%)");
    //     expect(item.vpgState.divClass).toEqual("state-column-active");
    //     expect(item.vpgState.spanClass).toEqual("progress-span");
    //     expect(item.vpgState.showProgress).toBeTruthy();
    //     expect(item.vpgState.value).toEqual(60);
    // });
    //
    // it("should check convertTaskData function", function () {
    //     var item = _.first(data.ProtectionGroups);
    //     item.State.ActiveProcesses = {RunningFailOverTest: {ProgressValue: 50}};
    //     model._convertTaskData(item);
    //
    //     expect(item.State.process.display).toEqual("VPG_LIST.TASKS.RUNNING_FAILOVER_TEST");
    //     expect(item.State.process.value).toEqual(50);
    // });
    //
    // it("should check the createTime function", function () {
    //     expect(model.createTime(0,0,16,32)).toEqual('16 minutes, 32 seconds');
    //     expect(model.createTime(2,3,10,0)).toEqual('2 days, 3 hours, 10 minutes');
    //     expect(model.createTime(1,1,1,1)).toEqual('1 day, 1 hour, 1 minute, 1 second');
    //     expect(model.createTime(0,0,0,0)).toEqual('');
    // });
});
