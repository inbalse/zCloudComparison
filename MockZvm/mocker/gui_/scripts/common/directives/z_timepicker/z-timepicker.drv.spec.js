'use strict';

//todo fix template url after separate to solutions zvm/zcm

xdescribe('zTimepicker', function () {
    var scope, element, isolatedScope, input_hours, input_minutes, form;

    beforeEach(module('zvmTest'));

    beforeEach(module('templates'));

    beforeEach(inject(function ($rootScope, $compile) {

        scope = $rootScope.$new();

        // 1440 minutes in a day.
        scope.mockModel = {
            backupTime: 1435
        };

        element = angular.element(
            '<z-timepicker ng-model="mockModel.backupTime" required="true" disabled="!data.defaultVpgSettings.Config.Configuration.IsBackupEnabled"></z-timepicker>'
        );

        $compile(element)(scope);
        scope.$digest();

        input_hours = element.find('#hours');
        input_minutes = element.find('#minutes');
        form = scope.form;
    }));

    it('should success set values for hours & minutes', function () {
        var expectedHours = 23, expectedMinutes = 55;

        angular.element(input_hours).val(expectedHours).trigger('input');
        angular.element(input_minutes).val(expectedMinutes).trigger('input');

        scope.$apply();

        expect(input_hours.val()).toBe(expectedHours.toString());
        expect(input_minutes.val()).toBe(expectedMinutes.toString());

        expect(scope.mockModel.backupTime).toBe(expectedHours * 60 + expectedMinutes);
    });
});
