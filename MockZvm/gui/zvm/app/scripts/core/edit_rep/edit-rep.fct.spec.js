'use strict';

describe('edit repository factory', function () {
    var factory, modal,zertoServiceFactory,$q;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_,_$q_ ,_repositoryEditFactory_,_zertoServiceFactory_) {
        factory = _repositoryEditFactory_;
        zertoServiceFactory = _zertoServiceFactory_;
        modal = _$uibModal_;
        $q = _$q_;
    }));

    it('should have function defined', function () {
        expect(factory.open).toBeDefined();
        expect(factory.close).toBeDefined();
    });

    it("should open with new repository", function () {
        spyOn(factory,'openDialog');
        factory.open(true, null);
        expect(factory.openDialog).toHaveBeenCalledWith(true,null);
    });

    it("should open with edit repository", function () {
        var deferred = $q.defer();
        spyOn(zertoServiceFactory, 'GetBackupTarget').and.callThrough();
        var id = {};
        factory.open(false ,id);
        expect(zertoServiceFactory.GetBackupTarget).toHaveBeenCalledWith(id, null, null, false);
    });
});
