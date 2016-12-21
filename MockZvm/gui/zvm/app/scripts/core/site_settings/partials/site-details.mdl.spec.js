describe('siteDetailsModel', function () {
    var siteDetailsModel, zertoServiceFactory;

    beforeEach(module('zvmTest'));
    beforeEach(module(function ($provide) {

        $provide.value('globalStateModel', {
            data: {
                VirtualizationProviderType: 3
            }
        });

    }));
    beforeEach(inject(function (_$uibModal_, _siteDetailsModel_, _zertoServiceFactory_) {

        siteDetailsModel = _siteDetailsModel_;
        zertoServiceFactory = _zertoServiceFactory_;
    }));


    it('should contain properties and functions', function () {
        expect(siteDetailsModel.isValid).toBeTruthy();
        expect(siteDetailsModel.siteManagementDetails).toBeDefined();
        expect(siteDetailsModel.vCenterCredentials).toEqual({username: '', password: ''});
        expect(siteDetailsModel.setSiteManagementDetails).toBeDefined();
        expect(siteDetailsModel.setUsername).toBeDefined();
        expect(siteDetailsModel.save).toBeDefined();
        expect(siteDetailsModel.load).toBeDefined();
    });

    it('should set site management details', function () {

        var details = {ContactEmail: 'Unconfigured contact email', ContactPhone: 'Unconfigured contact phone'};
        siteDetailsModel.setSiteManagementDetails(details);
        expect(siteDetailsModel.siteManagementDetails).toEqual({ContactEmail: '', ContactPhone: ''});

        details = {ContactEmail: 'testEmail', ContactPhone: 'testPhone'};
        siteDetailsModel.setSiteManagementDetails(details);
        expect(siteDetailsModel.siteManagementDetails).toEqual(details);
    });

    it('should set username', function () {
        siteDetailsModel.setUsername('test');
        expect(siteDetailsModel.vCenterCredentials.username).toEqual('test');
    });

    it('should call zertoService when saved', function () {
        spyOn(zertoServiceFactory, 'SetVCenterCredentials').and.callThrough();
        spyOn(zertoServiceFactory, 'SetSiteManagementDetails').and.callThrough();

        siteDetailsModel.save();
        expect(zertoServiceFactory.SetSiteManagementDetails).toHaveBeenCalledWith({});
        expect(zertoServiceFactory.SetVCenterCredentials).not.toHaveBeenCalled();

        siteDetailsModel.vCenterCredentials = {username: 'test', password: 'test'};
        siteDetailsModel.save();
        expect(zertoServiceFactory.SetSiteManagementDetails).toHaveBeenCalledWith({});
        expect(zertoServiceFactory.SetVCenterCredentials).toHaveBeenCalledWith('test', 'test');
    });

    it('should load settings in cloud license type', function () {
        spyOn(zertoServiceFactory, 'GetSiteManagementDetails').and.callThrough();
        spyOn(zertoServiceFactory, 'GetVCenterUserName').and.callThrough();

        siteDetailsModel.load();

        expect(zertoServiceFactory.GetSiteManagementDetails).toHaveBeenCalled();
        expect(zertoServiceFactory.GetVCenterUserName).not.toHaveBeenCalled();
    });

    it('should load settings in cloud license type', function () {
        spyOn(zertoServiceFactory, 'GetSiteManagementDetails').and.callThrough();
        spyOn(zertoServiceFactory, 'GetVCenterUserName').and.callThrough();

        siteDetailsModel.load();

        expect(zertoServiceFactory.GetSiteManagementDetails).toHaveBeenCalled();
        expect(zertoServiceFactory.GetVCenterUserName).not.toHaveBeenCalled();
    });
});
