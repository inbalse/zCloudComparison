'use strict';

describe('deleteVpgFactoryTest', function () {
    var factory, service, alert;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (deleteVpgFactory, zertoServiceFactory, zAlertFactory) {
        factory = deleteVpgFactory;
        service = zertoServiceFactory;
        alert = zAlertFactory;
    }));

    it('should have all the functions defined', function () {
        expect(factory.deleteVpgById).toBeDefined();
        expect(factory._handleForceRemoveClick).toBeDefined();
        expect(factory._createDeleteDialog).toBeDefined();
        expect(factory._handleDeletePopupClose).toBeDefined();
        expect(factory._handlePortalRemoveClick).toBeDefined();
        expect(factory._errorHandler).toBeDefined();
        expect(factory.vpgId).toEqual(null);
    });

    it('should treat gui error result', function () {
        spyOn(alert, 'fail');
        factory._errorHandler({faultString: 'test'});
        expect(alert.fail).toHaveBeenCalledWith(null, 'test');
    });

    it('should treat errors properly', function () {
        spyOn(alert, 'fail');
        factory._errorHandler();
        expect(alert.fail).toHaveBeenCalledWith(null, 'EXCEPTIONS.UNKNOWN');
    });
});

