'use strict';

describe('alerts status panel Controller', function () {
    var ctrl, testScope, state;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $controller, $state) {
        testScope = $rootScope.$new();
        state = $state;

        ctrl = $controller('alertsStatusPanelController',
            {
                $scope: testScope
                ,
                alertsStatusPanelFactory: {
                    hidePanel:function(){},
                    modalInstance: {
                    opened: {then: function () {

                    }},
                    dismiss: {then: function () {

                    }}
                    }
                }
            });
        spyOn(state, 'go');
    }));

    it('should contain define hidePanel() function', function () {
        expect(testScope.hidePanel).toBeDefined();
    });

    it('should route to alerts', function () {
        testScope.handleSeeAllAlertsClicked();
        expect(state.go).toHaveBeenCalledWith('main.monitoring.alerts');
    });
});
