describe('siteLicenseModel', function () {
    var siteLicenseModel, zertoServiceFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_siteLicenseModel_, _zertoServiceFactory_) {
        siteLicenseModel = _siteLicenseModel_;
        zertoServiceFactory = _zertoServiceFactory_;
    }));


    it('should contain defined variables', function () {
        expect(siteLicenseModel.model).toBeDefined();
        expect(siteLicenseModel.save).toBeDefined();
        expect(siteLicenseModel.load).toBeDefined();

        expect(siteLicenseModel._self.initLicenseDetails).toBeDefined();
        expect(siteLicenseModel._self.onSaveError).toBeDefined();

    });

    it('should call zertoService to get data', function () {
        spyOn(zertoServiceFactory, 'GetCurrentLicenseScreen').and.callThrough();
        siteLicenseModel.load();
        expect(zertoServiceFactory.GetCurrentLicenseScreen).toHaveBeenCalled();
    });

    it('should call zertoService to save data', function () {
        spyOn(zertoServiceFactory, 'SaveLicense').and.callThrough();
        siteLicenseModel.model.licenseData.Key = {Key: 'key'};
        siteLicenseModel.save();
        expect(zertoServiceFactory.SaveLicense).toHaveBeenCalledWith({Key: 'key'});

        siteLicenseModel.model.licenseData.Key = {Key: ''};
        siteLicenseModel.save();
        expect(zertoServiceFactory.SaveLicense).toHaveBeenCalledWith(null);
    });

    it('should set data to model', function () {
        siteLicenseModel._self.initLicenseDetails({
            "Details": {
                "LicenseId": 1,
                "Type": "VM",
                "Limit": {
                    "Num": 100
                },
                "SitesUsage": [
                    {
                        "SiteName": "gui_local_vcd",
                        "Usage": {
                            "Num": 1
                        }
                    },
                    {
                        "SiteName": "gui_remote_vcd",
                        "Usage": {
                            "Num": 0
                        }
                    }
                ],
                "ExpiryDate": null,
                "VersionForLicense": "2",
                "MaxSites": {
                    "Num": 2
                },
                "ShowUsage": true
            },
            "Key": {
                "Key": "RK7C698QHM6Y4LHBD3AJJLSYD9QHSFMPKZEVCSJSYQ"
            },
            "IsLicenseUpdateEnabled": true,
            "IsLicenseEnableWork": true
        });
        expect(siteLicenseModel.model.licenseData.Details.SitesUsage.length).toEqual(4);
        expect(siteLicenseModel.model.licenseData.Details.ExpiryDate).toEqual('NA');
        expect(siteLicenseModel.model.totalSites).toEqual(1);

    });
});
