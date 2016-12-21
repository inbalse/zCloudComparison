describe('flrWizardMountModel', function () {
    var flrWizardMountModel, flrApiService, flrSessionsApiService;
    var flrWizardVmModel, flrWizardRestorepointModel, flrWizardVolumesModel;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_flrWizardMountModel_, _flrApiService_, _flrSessionsApiService_,
                                _flrWizardVmModel_, _flrWizardRestorepointModel_, _flrWizardVolumesModel_) {
        flrWizardMountModel = _flrWizardMountModel_;
        flrApiService = _flrApiService_;
        flrSessionsApiService = _flrSessionsApiService_;
        flrWizardVmModel = _flrWizardVmModel_;
        flrWizardRestorepointModel = _flrWizardRestorepointModel_;
        flrWizardVolumesModel = _flrWizardVolumesModel_;
    }));

    it('should call flrApiService for mount process', function () {
        spyOn(flrApiService, 'mount').and.callThrough();


        flrWizardVmModel.model.selectedItems = [{
            VpgIdentifier: 'VpgIdentifier',
            VmIdentifier: 'VmIdentifier'
        }];

        flrWizardRestorepointModel.model.selectedItems = [{CheckpointIdentifier: 'CheckpointIdentifier'}];
        flrWizardVolumesModel.model.selectedItems = [{ VmVolumeIdentifier: 'VmVolumeIdentifier'}];

        flrWizardMountModel.mount();

        expect(flrApiService.mount).toHaveBeenCalledWith('VpgIdentifier', 'VmIdentifier', 'CheckpointIdentifier', 'VmVolumeIdentifier');
    });
});
