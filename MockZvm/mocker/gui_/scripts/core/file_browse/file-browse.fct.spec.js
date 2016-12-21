'use strict';

describe('file browse factory', function () {
    var factory, modal,zertoServiceFactory,$q;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_,_$q_ ,_fileBrowseFactory_,_zertoServiceFactory_) {
        factory = _fileBrowseFactory_;
        zertoServiceFactory = _zertoServiceFactory_;
        modal = _$uibModal_;
        $q = _$q_;
    }));

    it('should have function defined', function () {
        expect(factory._modalInstance).toEqual(null);
        expect(factory.openWindow).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.close).toBeDefined();
        expect(factory.browseForVmdkFiles).toBeDefined();
        expect(factory.browseForVmdkFilesVcd).toBeDefined();
    });

    it("should call proper zertoService functions", function () {
        spyOn(zertoServiceFactory, 'BrowseForVmdkFiles').and.callThrough();
        spyOn(zertoServiceFactory, 'BrowseForVmdkFilesTargetVcd').and.callThrough();

        factory.browseForVmdkFiles(1,2,3,4,5,6,7);
        expect(zertoServiceFactory.BrowseForVmdkFiles).toHaveBeenCalledWith(1,2,3,4,5,6,7);

        factory.browseForVmdkFilesVcd(1,2,3,4,5,6,7);
        expect(zertoServiceFactory.BrowseForVmdkFilesTargetVcd).toHaveBeenCalledWith(1,2,3,4,5,6,7);
    });
});
