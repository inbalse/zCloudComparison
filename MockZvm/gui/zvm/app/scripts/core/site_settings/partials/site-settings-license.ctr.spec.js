describe('Site Settings license Controller', function () {
    var ctrl, testScope, $state, siteLicenseModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $controller, _siteLicenseModel_,_$state_) {
        siteLicenseModel = _siteLicenseModel_;
        $state = _$state_;
        testScope = $rootScope.$new();
        siteLicenseModel.model.licenseData.Key = {Key: 'test'};
        ctrl = $controller('licenseController', {$scope: testScope, siteLicenseModel: siteLicenseModel});
    }));


    it('should check properties is defined', function () {
        expect(testScope.updateLicense).toBeDefined();
    });

    it('should call licenseModel when saved', function () {

        spyOn(siteLicenseModel, 'save').and.callThrough();
        testScope.updateLicense();
        expect(siteLicenseModel.save).toHaveBeenCalled();
    });

    it('should change state to license when updating with empty license', function () {

        spyOn($state, 'go');
        siteLicenseModel.model.licenseData.Key = {Key: ''};
        testScope.updateLicense();
        expect($state.go).toHaveBeenCalledWith('license');
    });


});


