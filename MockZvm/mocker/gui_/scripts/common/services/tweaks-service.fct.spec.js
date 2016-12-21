describe("Tweaks Factory", function () {
    var httpBackend;
    var resultTweaks;
    var tweaksService;

    beforeEach(function(){
        module('zvmApp.services');

        inject(function(_tweaksService_,_$httpBackend_) {
            tweaksService = _tweaksService_;
            httpBackend = _$httpBackend_;
        });

        resultTweaks = {"t_ServiceTimeout":20};
        httpBackend.when('GET', 'tweaks.json').respond(resultTweaks);
        tweaksService.loadTweaks();
        httpBackend.flush();
    });
    it("test call for load tweaks", function(){
        expect(tweaksService.loadTweaks).toBeDefined();
    });

    it("test the getTweak for a tweak that was set", function(){
        expect(tweaksService.getTweak("t_ServiceTimeout",30)).toBe(20);
    });

    it("test the getTweak for a tweak that wasnt set", function(){
        expect(tweaksService.getTweak("t_ServiceTifdgfdmdfhgfdeout",30)).toBe(30);
    });

});
