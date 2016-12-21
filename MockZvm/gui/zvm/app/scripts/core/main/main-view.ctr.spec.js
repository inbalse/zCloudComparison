'use strict';

describe("Actions button View directive", function () {
    var testScope, mainViewController, analyticsEventsTypes;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data:{VirtualizationProviderType: null}});
    }));

    beforeEach(inject(function ($rootScope, $controller, _analyticsEventsTypes_, _summaryMinimalModel_) {
        testScope = $rootScope.$new();
        analyticsEventsTypes = _analyticsEventsTypes_;
        testScope.failoverStates = {TEST: 'Test', LIVE: 'Live'};

        mainViewController = $controller("mainViewController", {
            $scope: testScope,
            summaryMinimalModel : _summaryMinimalModel_
        });

    }));

    it('verify failover live triggers an google analytics event', function () {
        testScope.failoverState = testScope.failoverStates.LIVE;
        testScope.enableBtn = true;

        spyOn(testScope,'$emit');
        testScope.faioverButtonClick();

        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.FAILOVER.LIVE.INITIAL);
    });

    it('verify failover test triggers an google analytics event', function () {
        testScope.failoverState = testScope.failoverStates.TEST;
        testScope.enableBtn = true;

        spyOn(testScope,'$emit');
        testScope.faioverButtonClick();

        expect(testScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.FAILOVER.TEST.INITIAL);
    });
});
