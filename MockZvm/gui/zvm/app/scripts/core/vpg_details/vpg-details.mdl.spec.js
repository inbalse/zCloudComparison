'use strict';

describe('details tabs model', function () {
    var enums, model;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $rootScope, _vpgDetailsModel_, _enums_) {
        enums = _enums_;
        model = _vpgDetailsModel_;

    }));

    it("should check the substatus function", function () {
        //vpgDetailsModel.vpgData.State.VPGTimebombInfo = {Reason: 'High IOPS',TimeLeftInSeconds:400};
        //vpgDetailsModel.vpgData.State.SubStatus = enums.VpgVisualSubStatus.Deleting;
        //vpgDetailsModel.vpgData.State.SubStatus = enums.VpgVisualSubStatus.DeltaSync;
        //vpgDetailsModel.vpgData.State.SubStatus = enums.VpgVisualSubStatus.ReplicationPausedUserInitiated;
        //vpgDetailsModel.vpgData.Reason = 'Recovery VRA Communication Problem';
        //vpgDetailsModel.vpgData.State.ProgressObject= {ProgressPercentage:45};
        //vpgDetailsModel.vpgData.State.ProgressObject.ProgressDetails = {ProgressInKiloBytes:1024,TotalKiloBytes:4045,EtaInSeconds : 54652};

        model.vpgData = {Reason:'Force Sync',State:{ActiveProcesses:{IsResumeEnabled:true},SubStatus:enums.VpgVisualSubStatus.DeltaSync,ProgressObject:{ProgressPercentage:45,ProgressDetails:{ProgressInKiloBytes:1024,TotalKiloBytes:4045,EtaInSeconds : 54652}}}};
        model.setSubStatus();
        expect(model.vpgData.subStatusObj.subStatusText).toEqual('ENUM.VPG_VISUAL_SUB_STATUS.6 45% (1/4 MB. ETA 15:10:52)');
        model.vpgData = {State:{ActiveProcesses:{IsResumeEnabled:true}, SubStatus:enums.VpgVisualSubStatus.ReplicationPausedUserInitiated}};
        model.setSubStatus();
        expect(model.vpgData.subStatusObj.subStatusText).toEqual('ENUM.VPG_VISUAL_SUB_STATUS.25 - ');
        expect(model.vpgData.subStatusObj.showLink).toBeTruthy();
        expect(model.vpgData.subStatusObj.subStatusExists).toBeTruthy();
        expect(model.vpgData.subStatusObj.linkText).toEqual('VPG_DETAILS.SUB_STATUS.RESUME_NOW');
    });

    it("should check the setTimeBombText function", function () {
        model.vpgData = {State:{SubStatus:enums.VpgVisualSubStatus.DeltaSync,VPGTimebombInfo:{Reason: 'High IOPS',TimeLeftInSeconds:400}}};
        model.setSubStatus();
        expect(model.vpgData.subStatusObj.subStatusText).toEqual('ENUM.VPG_VISUAL_SUB_STATUS.6');
        expect(model.vpgData.subStatusObj.secondLineText).toEqual('VPG_DETAILS.SUB_STATUS.RESUMING_IN 6 VPG_DETAILS.SUB_STATUS.MINUTES - ');
        expect(model.vpgData.subStatusObj.secondLink).toEqual('VPG_DETAILS.SUB_STATUS.RESUME_NOW');
    });
});
