describe('flrWizardVmModel', function () {
    var flrWizardVmModel, vmsApiService, zAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_flrWizardVmModel_, _vmsApiService_, _zAlertFactory_) {
        flrWizardVmModel = _flrWizardVmModel_;
        vmsApiService = _vmsApiService_;
        zAlertFactory = _zAlertFactory_;
    }));

    it('should contain public defined variables', function () {
        expect(flrWizardVmModel.init).toBeDefined();
        expect(flrWizardVmModel.model).toBeDefined();
        expect(flrWizardVmModel.onSuccess).toBeDefined();
        expect(flrWizardVmModel.validate).toBeDefined();
    });

    it('should contain private defined variables', function () {
        expect(flrWizardVmModel.onSuccess).toBeDefined();
    });

    it('should init model', function () {
        spyOn(vmsApiService, 'getVms').and.callThrough();
        flrWizardVmModel.init();
        expect(vmsApiService.getVms).toHaveBeenCalled();
    });

    it('should assign id and source type on VMs list', function () {
        //shoold be filtered from VMs list
        var noFlrVm = {
            VirtualMachineIdentifier: {
                InternalVmName: 'InternalVmName', ServerIdentifier: {ServerGuid: 'ServerGuid'}
            },
            EnabledActions: {IsFlrEnabled: false}
        };
        var flrVm = {
            VirtualMachineIdentifier: {
                InternalVmName: 'InternalVmName',
                ServerIdentifier: {ServerGuid: 'ServerGuid'}
            },
            EnabledActions: {IsFlrEnabled: true}
        };

        flrWizardVmModel.onSuccess([angular.copy(noFlrVm), angular.copy(flrVm)]);

        //onSuccess function should filter VMs that not supported by flr
        expect(flrWizardVmModel.model.data.length).toBe(1);
        expect(flrWizardVmModel.model.data[0].id == 0);
        expect(flrWizardVmModel.model.data[0].Source == 'Journal');
    });

    it('should return validation state of a model', function () {
        expect(flrWizardVmModel.validate()).toBeFalsy();
        flrWizardVmModel.model.selectedItems = [{}];
        expect(flrWizardVmModel.validate()).toBeTruthy();
    });
});
