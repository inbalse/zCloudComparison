describe('zertoApi', function () {
    var zertoApi, q, interval, rootScope, httpBackend, getHandler;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_zertoApi_, $q, $interval, $rootScope, $httpBackend) {
        zertoApi = _zertoApi_;
        q = $q;
        interval = $interval;
        rootScope = $rootScope;
        httpBackend = $httpBackend;

        getHandler = httpBackend.when('GET', 'v1/url')
            .respond(200, 'result');
    }));

    it('should call for makeRequest via makeRequestWrapper', function () {
        spyOn(zertoApi, 'makeRequest');
        zertoApi.makeRequestWrapper();
        expect(zertoApi.makeRequest).toHaveBeenCalled();
    });

    it('should call for makeRequest via makeRequestInterval', function () {
        spyOn(zertoApi, 'makeRequest');

        var scope = rootScope.$new();
        zertoApi.makeRequestInterval(scope, 'GET', 'url', {}, []);
        expect(zertoApi.makeRequest).toHaveBeenCalled();

        expect(zertoApi.callHash['GET-url']).toBeDefined();

        scope.$destroy();
        rootScope.$digest();

        expect(zertoApi.callHash['GET-url']).toBeUndefined();
    });

    it('should call for makeRequest with intervals', function () {
        spyOn(zertoApi, 'makeRequest');

        zertoApi.start();

        zertoApi.callHash['GET-url'] = {
            method: 'GET',
            url: 'url',
            data: {},
            headers: [],
            deferred: q.defer(),
            count: 1
        };

        zertoApi.callHash['GET-url1'] = {
            method: 'GET',
            url: 'url1',
            data: {},
            headers: [],
            deferred: q.defer(),
            count: 1
        };
        interval.flush(10000);
        expect(zertoApi.makeRequest.calls.count()).toEqual(4);
    });


    it('should call once for makeRequest for same url and method', function () {

        spyOn(zertoApi, 'makeRequest');

        zertoApi.start();

        var scope1 = rootScope.$new();
        zertoApi.makeRequestInterval(scope1, 'GET', 'url', {}, []);


        var scope2 = rootScope.$new();
        zertoApi.makeRequestInterval(scope2, 'GET', 'url', {}, []);

        interval.flush(5000);

        //2 initial calls upon each request with 1 subsequent within interval
        expect(zertoApi.makeRequest.calls.count()).toEqual(3);
    });
});
