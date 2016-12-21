'use strict';

describe('backup scheduling filter', function () {

    var filter, enums, testValue, testType, testValue2, testType2;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_, _enums_, _vos_ ) {
        enums = _enums_;

        testValue = new _vos_.VPGListBackupRelatedData();
        testValue.BackupSchedulingTime = new _vos_.BackupRunningTimeVisualObject();
        testValue.BackupSchedulingTime.RunningTimeOfDayInMinutes = 540;
        testValue.BackupSchedulingTime.DayOfWeek = _enums_.DayOfWeek.Friday;
        testType = _enums_.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Extended;


        filter = _$filter_('backupSchedulingFilter');
    }));

    it("should return weekly value", function(){
        expect(filter(testValue, testType)).toEqual('09:00, DAYS.FRIDAY');
    });

    beforeEach(inject(function (_$filter_, _enums_, _vos_) {
        enums = _enums_;

        testValue2 = new _vos_.VPGListBackupRelatedData();
        testValue2.BackupSchedulingTime = new _vos_.BackupRunningTimeVisualObject();
        testValue2.BackupSchedulingTime.RunningTimeOfDayInMinutes = 540;
        testValue2.BackupSchedulingTime.SchedulePeriodType = _enums_.SchedulePeriodType.Daily;

        filter = _$filter_('backupSchedulingFilter');
    }));

    it("should return daily value", function(){
        expect(filter(testValue2, testType)).toEqual('09:00 (SCHEDULE_PERIOD_TYPES.DAILY)');
    });

    beforeEach(inject(function (_$filter_, _enums_) {
        enums = _enums_;
        testType2 = _enums_.RetentionPolicyVisualObject_VQRetentionPolicyEnum.Standard;

        filter = _$filter_('backupSchedulingFilter');
    }));

    it("should return empty value", function(){
        expect(filter(testValue, testType2)).toEqual('');
    });
});