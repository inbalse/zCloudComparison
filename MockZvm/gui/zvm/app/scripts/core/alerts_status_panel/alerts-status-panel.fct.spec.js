'use strict';

describe('alerts status panel factory', function () {
    var alertsStatusPanelFactory;

    beforeEach(function () {
        module('zvmTest');

        inject(function (_alertsStatusPanelFactory_) {
            alertsStatusPanelFactory = _alertsStatusPanelFactory_;
        });

        alertsStatusPanelFactory.togglePanel();
    });

    it('should contain defined modalInstance{} object after togglePanel() function has been called ', function () {
        expect(alertsStatusPanelFactory.modalInstance).toBeDefined();
    });

    it('should be shown = true', function () {
        expect(alertsStatusPanelFactory.shown).toBeTruthy();
    });

   /* it('should be shown = false', function () {
        alertsStatusPanelFactory.togglePanel();
        expect(alertsStatusPanelFactory.shown).toBeFalsy();
    });*/

});
