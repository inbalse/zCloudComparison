describe('flrDownloadSummaryModel', function () {
    var flrDownloadSummaryModel, flrApiService, flrDownloadSettingsModel, flrDownloadFileModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_flrDownloadSummaryModel_, _flrApiService_, _flrDownloadSettingsModel_, _flrDownloadFileModel_) {
        flrDownloadSummaryModel = _flrDownloadSummaryModel_;
        flrApiService = _flrApiService_;
        flrDownloadSettingsModel = _flrDownloadSettingsModel_;
        flrDownloadFileModel = _flrDownloadFileModel_;
    }));

    it('should call flrApiService to get download url', function () {
        spyOn(flrApiService, 'requestDownload').and.callThrough();

        flrDownloadSettingsModel.model.sessionId = 'test';

        flrDownloadFileModel.model.selectedNodes = [{fullPath: 'testPath'}];
        flrDownloadSummaryModel.model.compressed = false;
        flrDownloadSummaryModel.download();

        expect(flrApiService.requestDownload).toHaveBeenCalledWith('test', false, ['testPath']);
    });

    it('should call flrApiService with download url', function () {
        spyOn(flrApiService, 'startDownload').and.callThrough();

        flrDownloadFileModel.model.selectedNodes = [{name: 'testName'}];

        flrDownloadSummaryModel._self.onUrlReceive('"testUrl"');

        expect(flrApiService.startDownload).toHaveBeenCalledWith('testName', '"testUrl"');
    });
});
