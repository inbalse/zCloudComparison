'use strict';

describe('restoreWizardController', function () {
    var controller, scope, restoreWizardFactory, restoreWizardModel, zAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _restoreWizardFactory_, _restoreWizardModel_, _zAlertFactory_) {
        restoreWizardFactory = _restoreWizardFactory_;
        restoreWizardModel = _restoreWizardModel_;
        zAlertFactory = _zAlertFactory_;
        scope = $rootScope.$new();
        restoreWizardFactory._modalInstance = {close: angular.noop, dismiss: angular.noop};

        restoreWizardModel.data = {
            selectedItems: [
                {
                    SiteIdentifier: 'SiteIdentifier',
                    BackupTargetIdentifier: 'BackupTargetIdentifier',
                    BackupJobIdentifier: 'BackupJobIdentifier'
                }
            ], restoreConfiguration: {Configuration: ''}
        };

        controller = $controller('restoreWizardController', {
            $scope: scope,
            steps: [],
            restoreWizardModel: restoreWizardModel,
            restoreWizardFactory: restoreWizardFactory,
            zAlertFactory: zAlertFactory
        });
    }));


    it('should contain defined functions and properties', function () {
        expect(scope.doneEnabled).toBeDefined();
        expect(scope.closeHandler).toBeDefined();
        expect(scope.onSuccess).toBeDefined();
        expect(scope.onFail).toBeDefined();
        expect(scope._handleDoneClick).toBeDefined();
        expect(scope._handleStepChanged).toBeDefined();
        expect(scope.isDoneEnabled).toBeDefined();
    });

    it('should close modal via factory when closed', function () {
        spyOn(restoreWizardFactory, 'dismissModal').and.callThrough();
        scope.closeHandler();
        expect(restoreWizardFactory.dismissModal).toHaveBeenCalled();
    });

    it('should close modal via factory when success', function () {
        spyOn(restoreWizardFactory, 'closeModal').and.callThrough();
        scope.onSuccess();
        expect(restoreWizardFactory.closeModal).toHaveBeenCalled();
    });

    it('should alert when fail', function () {
        spyOn(zAlertFactory, 'fail').and.callThrough();
        scope.onFail({faultString: 'faultString'});
        expect(zAlertFactory.fail).toHaveBeenCalled();
    });

    it('should call restore on model when done clicked', function () {
        spyOn(restoreWizardModel, 'restoreFromBackup').and.callThrough();
        scope._handleDoneClick();
        expect(restoreWizardModel.restoreFromBackup).toHaveBeenCalled();
    });

    it('should create an object of full and total volumes/vms for grid display', function () {
        var full = 1,
            total = 5;
        var obj = restoreWizardModel.createFullFromTotalObj(full, total);

        expect(obj.display).toBe('1/5');
        expect(obj.filterValue).toBe(1);
    });

});
