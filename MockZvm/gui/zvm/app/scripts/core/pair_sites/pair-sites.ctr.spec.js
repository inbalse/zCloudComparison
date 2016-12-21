describe('Pair Sites Modal Window', function () {
    var controller, testScope, testPairSitesFactory, tesVos;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _vos_, $templateCache) {
        testScope = $rootScope.$new();

        tesVos = _vos_;
        testPairSitesFactory = jasmine.createSpyObj('pairSitesFactory', ['getData', 'sendData']);
        testPairSitesFactory.getData.and.returnValue({then: function (resolve) {
            return resolve({'DefaultPortNumber': '123456'});
        }});
        testPairSitesFactory.sendData.and.returnValue({then: function (resolve) {
            return resolve({});
        }});

        testPairSitesFactory.modalInstance = jasmine.createSpyObj('modalInstance', ['dismiss']);

        trans = function (value) {
            return {then: function (resolve) {
                return resolve({});
            }}
        };
        controller = $controller('pairSitesController', {$scope: testScope, pairSitesFactory: testPairSitesFactory, vos: tesVos, $translate: trans});
    }));

    //test the default values
    it("should have a sites property on the scope,and initialy it should be an empty object", function () {
        expect(testPairSitesFactory.getData).toHaveBeenCalled();
        expect(testScope.site).toEqual({port: '123456'});
    });

    it("should have loading property and initialy it should be set to true", function () {
        expect(testPairSitesFactory.getData).toHaveBeenCalled();
        expect(testScope.loading).toBeFalsy();
    });

    it("should have disabled property and initialy it should be false", function () {
        expect(testScope.disabled).toBeFalsy();
    });

    it("should have functions defined", function () {
        expect(testScope.handleSaveClicked).toBeDefined();
        expect(testScope.handleCancelClicked).toBeDefined();
        expect(testScope.closeWindow).toBeDefined();
        expect(testScope.closeHandler).toBeDefined();
        expect(testScope.processTranslations).toBeDefined();
        expect(testScope.disableButtons).toBeDefined();
    });

    it("should have properties on the scope", function () {
        expect(testScope.site).toBeDefined();
        expect(testScope.forms).toBeDefined();
    });

    it("should close modal when cancel is clicked", function () {
        testScope.handleCancelClicked();
        expect(testPairSitesFactory.modalInstance.dismiss).toHaveBeenCalled();
    });

    it("should close modal when close (the x button) is clicked", function () {
        testScope.closeHandler();
        expect(testPairSitesFactory.modalInstance.dismiss).toHaveBeenCalled();
    });

    it("shoud change enable/disable of the pair button whith disableButtons function", function () {
        expect(testScope.pairButton).toBeDefined();
        testScope.disableButtons(true);
        expect(testScope.pairButton.disabled).toBeFalsy();
        testScope.disableButtons(false);
        expect(testScope.pairButton.disabled).toBeTruthy();
    });
});
