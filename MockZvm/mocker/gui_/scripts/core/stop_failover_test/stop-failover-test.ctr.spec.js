'use strict';

describe('stopFailoverTestControllerTest', function () {
    var controller, scope, neutral, enums, factory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _$translate_, _stopFailoverTestFactory_, _enums_, _vos_) {
        scope = $rootScope.$new();

        neutral = new _vos_.StopFailoverTestGuiCommand();
        neutral.Result = new _vos_.FailoverTestResult();
        neutral.Result.Status = _enums_.TestStatus.Success;
        neutral.Result.Summary = '';

        enums = _enums_;

        factory = _stopFailoverTestFactory_;

        controller = $controller('stopFailoverTestController', {$scope: scope, item: neutral, $translate: _$translate_, stopFailoverTestFactory: _stopFailoverTestFactory_, enums: _enums_});
    }));


    it('should have props and functions on scope', function () {
        expect(scope.loading).toBeDefined();
        expect(scope.data).toBeDefined();
        expect(scope.results).toEqual([{Label: 'Success', Value: enums.TestStatus.Success},
            {Label: 'Failure', Value: enums.TestStatus.FailedByUser}]);
        expect(scope.close).toBeDefined();
        expect(scope.save).toBeDefined();
        expect(scope._processTranslations).toBeDefined();
    });

    it('shoudl get the item via injection and append it to scope', function(){
       expect(scope.data).toEqual(neutral);
    });

    it('shoudl call  stopFailoverTestFactory.stop when save is clicked', function(){
        spyOn(factory, 'stop').and.callThrough();
        scope.save();
        expect(factory.stop).toHaveBeenCalled()
    });
});
