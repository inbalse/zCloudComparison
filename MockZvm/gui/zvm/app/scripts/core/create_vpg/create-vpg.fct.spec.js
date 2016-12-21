'use strict';

describe('createVPGFactory', function () {
    var factory, modal, service, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (createVPGFactory, $uibModal, createVPGWizardModel, createVPGInitCreateService, vos, $translate, _globalStateModel_) {
        factory = createVPGFactory;
        modal = $uibModal;
        service = createVPGInitCreateService;
        globalStateModel = _globalStateModel_;
        globalStateModel.data ={};

        service.isCreateVPGAllowed = function () {
            return {
                then: function (callBack) {
                    return callBack({AllowCreateVpg: true})
                }
            }
        };

        spyOn(service, 'init').and.callThrough();
    }));

    it('should have functions defined', function(){
        expect(factory.openCreate).toBeDefined();
        expect(factory.openEdit).toBeDefined();
        expect(factory.closeModal).toBeDefined();
    });

    it('should call createVPGFactory.openCreate with null as param when create is called', function(){
        factory.openCreate('optionalId', 'vpgName');

        expect(service.init).toHaveBeenCalledWith('optionalId', 'vpgName');
    });

});
