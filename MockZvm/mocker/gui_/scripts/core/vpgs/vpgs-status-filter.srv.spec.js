'use strict';
describe('VPGS status filter service', function () {

    var vpgsStatusFilterService, vpgs;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_vpgsStatusFilterService_) {
        vpgsStatusFilterService = _vpgsStatusFilterService_;

        vpgs = [{"AlertStatus": 0}, {"AlertStatus": 0}, {"AlertStatus": 0}, {"AlertStatus": 1}, {"AlertStatus": 1}, {"AlertStatus": 2}];
    }));

    describe('Test filter function', function () {

        it('should check the status counting', function () {
            vpgsStatusFilterService.getVpgsFilteredByStatus(vpgs);
            expect(vpgsStatusFilterService.statusFilter.normalCount).toBe(3);
            expect(vpgsStatusFilterService.statusFilter.warningCount).toBe(2);
            expect(vpgsStatusFilterService.statusFilter.errorCount).toBe(1);
        });

        it('should check the filtering according to default checkbox statuses - all checked', function () {
            var result = vpgsStatusFilterService.getVpgsFilteredByStatus(vpgs);
            expect(result).toEqual(vpgs);
        });

        it('should check the filtering when normal status is disable', function () {
            vpgsStatusFilterService.statusFilter.showNormal = false;
            var result = vpgsStatusFilterService.getVpgsFilteredByStatus(vpgs);
            expect(result).toEqual([{"AlertStatus": 1}, {"AlertStatus": 1}, {"AlertStatus": 2}]);
        });
    });
});
