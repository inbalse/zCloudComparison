'use strict';
describe('vpg backup job status enum filter', function () {

    var filter, enums;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(_$filter_,_enums_) {
        enums = _enums_;
        filter = _$filter_('vpgBackupJobStatusEnum');
    }));

    it("should return empty value", function() {
        expect(filter(enums.VpgBackupJobSummaryStatusVisualObject.InActive)).toEqual('');
    });

    it("should return Running value", function(){
        expect(filter(enums.VpgBackupJobSummaryStatusVisualObject.Running, enums.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended)).toEqual('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.RUNNING');
    });
});