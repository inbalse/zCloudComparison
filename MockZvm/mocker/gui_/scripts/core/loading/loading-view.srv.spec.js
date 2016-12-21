describe('loadingViewServiceTest', function () {
    var loadingViewService, zertoApi, basil, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_loadingViewService_, _zertoApi_, _basil_, _globalStateModel_) {
        loadingViewService = _loadingViewService_;
        zertoApi = _zertoApi_;
        basil = _basil_;
        globalStateModel = _globalStateModel_;
    }));

    it('should check all function defined', function () {
       expect(loadingViewService._private.initialLoadingAndGetSessionId).toBeDefined();
       expect(loadingViewService._private.setSessionBySiteType).toBeDefined();
       expect(loadingViewService.getInitialSessionValidation).toBeDefined();
    });

    it('should initialLoadingAndGetSessionId function if is regular ZVR', function () {
        globalStateModel.data = null;
        globalStateModel.setSessionId('');

        var sessionId = loadingViewService._private.initialLoadingAndGetSessionId();

        expect(JSON.stringify(sessionId)).toEqual('{"InternalIdentifier":"00000000-0000-0000-0000-000000000000","ServerIdentifier":{}}');
        expect(globalStateModel.data.IsPortal).toEqual(false);
        expect(globalStateModel.isIframe).toEqual(false);
        expect(zertoApi.defaultHeaders['x-zerto-session']).toEqual("00000000-0000-0000-0000-000000000000");
    });


    it('should initialLoadingAndGetSessionId function if isIframe', function () {
        globalStateModel.isIframe = true;
        globalStateModel.iframeData = { sessionId: '12345', serverGuid: '67890'};

        var sessionId = loadingViewService._private.initialLoadingAndGetSessionId();

        expect(JSON.stringify(sessionId)).toEqual('{"InternalIdentifier":"12345","ServerIdentifier":{"ServerGuid":"67890"}}');
        expect(globalStateModel.data.IsPortal).toEqual(false);
        expect(globalStateModel.isIframe).toEqual(true);
        expect(globalStateModel.isvSphere).not.toBeDefined();
        expect(zertoApi.defaultHeaders['x-zerto-session']).toEqual('12345');
    });

    it('should initialLoadingAndGetSessionId function if IsPortal', function () {
        globalStateModel.data = {IsPortal: true};
        globalStateModel.portalData = {sessionId: '12345-5555'};

        var sessionId = loadingViewService._private.initialLoadingAndGetSessionId();

        expect(JSON.stringify(sessionId)).toEqual('{"InternalIdentifier":"12345-5555","ServerIdentifier":{}}');
        expect(globalStateModel.data.IsPortal).toEqual(true);
        expect(globalStateModel.isIframe).toEqual(false);
        expect(globalStateModel.isvSphere).not.toBeDefined();
        expect(zertoApi.defaultHeaders['x-zerto-session']).toEqual('12345-5555');
    });

    it('should initialLoadingAndGetSessionId function if isvSphere', function () {
        globalStateModel.isvSphere = true;
        globalStateModel.vSphereData = {sessionId: '12345-5555-vs'};

        var sessionId = loadingViewService._private.initialLoadingAndGetSessionId();

        expect(JSON.stringify(sessionId)).toEqual('{"InternalIdentifier":"12345-5555-vs","ServerIdentifier":{}}');
        expect(globalStateModel.data.IsPortal).toEqual(false);
        expect(globalStateModel.isIframe).toEqual(false);
        expect(globalStateModel.isvSphere).toEqual(true);
        expect(zertoApi.defaultHeaders['x-zerto-session']).toEqual('12345-5555-vs');
    });

    it('should setSessionBySiteType function if IsPortal', function () {
        var result = {IsPortal: true};
        globalStateModel.portalData = {sessionId: '12345-5555'};

        loadingViewService._private.setSessionBySiteType(result, globalStateModel.portalData.sessionId);

        var dataFromLocalStorage =  basil.get('zertoSessionIdentifier');

        expect(zertoApi.defaultHeaders['x-zerto-session']).toEqual('12345-5555');
        expect(dataFromLocalStorage).toEqual('12345-5555');
    });
});
