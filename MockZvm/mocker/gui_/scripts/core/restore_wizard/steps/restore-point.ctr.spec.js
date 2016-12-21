'use strict';

describe('restorePointController', function () {
    var controller, scope, restoreWizardModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _restoreWizardModel_) {
        scope = $rootScope.$new();
        restoreWizardModel = _restoreWizardModel_;
        restoreWizardModel.data = {planType: 1, selectedItems: [], selectedProtectionGroup: {}};
        controller = $controller('restorePointController', {$scope: scope, restoreWizardModel: restoreWizardModel});


    }));


    it('should have defined functions anf variables', function () {
        expect(scope.data).toBeDefined();
        expect(scope.init).toBeDefined();
        expect(scope.selectedRestorePoints).toBeDefined();
        expect(scope.restorePointColumnDefs).toBeDefined();
        expect(scope.restorePointCustomOptions).toBeDefined();
        expect(scope.restorePointDetailsCulumnsDefs).toBeDefined();
        expect(scope.restorePointDetailsCustomOptions).toBeDefined();
        expect(scope.selectedPointsChange).toBeDefined();
    });

    it('should init with proper plan', function () {
        spyOn(restoreWizardModel, 'getRestoreSelectionScreenByPlan').and.callThrough();
        scope.init(1);
        expect(restoreWizardModel.getRestoreSelectionScreenByPlan).toHaveBeenCalled();
    });


});
