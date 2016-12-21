describe('flrDownloadSettingsModel', function () {
    var flrDownloadSettingsModel, flrSessionsApiService, zWizardStepStates;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_flrDownloadSettingsModel_, _flrSessionsApiService_, _zWizardStepStates_) {
        flrDownloadSettingsModel = _flrDownloadSettingsModel_;
        flrSessionsApiService = _flrSessionsApiService_;
        zWizardStepStates = _zWizardStepStates_;
    }));


    it('should revert model', function () {
        flrDownloadSettingsModel.model.sessionId = 'test';
        flrDownloadSettingsModel.model.step.class = 'test';
        flrDownloadSettingsModel.model.step.stateIcon = zWizardStepStates.INVALID;

        flrDownloadSettingsModel.revert();

        expect(flrDownloadSettingsModel.model.sessionId).toBe(null);
        expect(flrDownloadSettingsModel.model.step.class).toBe('');
        expect(flrDownloadSettingsModel.model.step.stateIcon).toBe(zWizardStepStates.INITIAL);
    });


    it('should call flrSessionsApiService when initialized', function () {
        spyOn(flrSessionsApiService, 'get').and.callThrough();
        flrDownloadSettingsModel.model.sessionId = 'test';
        flrDownloadSettingsModel.init();

        expect(flrSessionsApiService.get).toHaveBeenCalledWith('test');
    });

    it('should set result data on init success', function () {
        var result = [{VmId: 'vmid', VolumeId: 'volumeid', CheckPointId: 'checkpointid'}];

        flrDownloadSettingsModel._self.onSuccess(result);

        expect(flrDownloadSettingsModel.model.VmId).toBe('vmid');
        expect(flrDownloadSettingsModel.model.VolumeId).toBe('volumeid');
        expect(flrDownloadSettingsModel.model.CheckPointId).toBe('checkpointid');
    });
});
