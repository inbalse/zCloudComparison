'use strict';
describe('Backup status formatter component', function () {

    var ctrl, scope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $componentController) {
        scope = $rootScope.$new();
        ctrl = $componentController('backupStatusFormatter', {$scope: scope}, {
            onSelectionChange: angular.noop,
            checked: true,
            value: 'value'
        });
    }));

    it('should init the display', function () {
        ctrl.$onInit();
        expect(ctrl.selectionModel).toBe(ctrl.checked);
        expect(ctrl.display).toBe(ctrl.value);

        ctrl.value = '';
        ctrl.$onInit();
        expect(ctrl.display).toBe('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE');
    });

    it('should update on select all', function () {
        ctrl.checked = false;
        ctrl.selectionModel = true;
        ctrl.$onChanges();
        expect(ctrl.selectionModel).toBe(false);
    });

    it('should call onSelectionToggle on change', function () {
        spyOn(ctrl, 'onSelectionChange');
        var value = true;
        ctrl.onToggle(value);
        expect(ctrl.onSelectionChange).toHaveBeenCalledWith({isSelected: value});
    });
});
