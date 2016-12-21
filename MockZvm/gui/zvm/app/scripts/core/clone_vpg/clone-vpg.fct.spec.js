'use strict';

describe('cloneVpgFactory', function () {
    var factory, service;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (cloneVpgFactory, zertoServiceFactory) {
        factory = cloneVpgFactory;
        service = zertoServiceFactory;
    }));

    it('should have all the func and prop defined', function () {
        expect(factory.open).toBeDefined();
        expect(factory._handleGetLatestCheckpoint).toBeDefined();
        expect(factory._handleGetPotentialDatastoresForClone).toBeDefined();
        expect(factory._openCloneWindow).toBeDefined();
        expect(factory._close).toBeDefined();
        expect(factory.sendCloneCommand).toBeDefined();
        expect(factory.stopClone).toBeDefined();
        expect(factory._handleStopCloneWarning).toBeDefined();

        expect(factory._stopCloneVpgId).toBeNull();
        expect(factory.modalInstance).toBeNull();
        expect(factory.vpgName).toBeNull();
        expect(factory.vpgId).toBeNull();
        expect(factory.checkpoint).toBeNull();
        expect(factory.datastores).toBeNull();
        expect(factory.targetType).toBeNull();
    });

    it('should have _close function and it should clean the properties', function () {
        factory.modalInstance = {dismiss: function () {
        }};
        factory.vpgName = 1;
        factory.vpgId = 1;
        factory.checkpoint = 1;
        factory.datastores = 1;
        factory.targetType = 1;

        factory._close();

        expect(factory.vpgName).toBeNull();
        expect(factory.vpgId).toBeNull();
        expect(factory.checkpoint).toBeNull();
        expect(factory.datastores).toBeNull();
        expect(factory.targetType).toBeNull();
    });

    it('should call the zertoServiceFactory.Clone when sendCloneCommand is called', function () {
        spyOn(service, 'Clone').and.callThrough();
        factory.modalInstance = {dismiss: function () {
        }};
        factory.sendCloneCommand(null, null, null);
        expect(service.Clone).toHaveBeenCalled();
    });

    it('should cloneVpgFactory.open init stuff ', function () {
        spyOn(service,'GetPotentialDatastoresForClone').and.callThrough();

        factory.open({id: 123}, 'vpgName', 1, {id: 234});

        expect(factory.vpgName).toEqual('vpgName');
        expect(factory.vpgId).toEqual({id: 123});
        expect(factory.checkpoint).toEqual({id: 234});
        expect(factory.targetType).toEqual(1);

        expect(service.GetPotentialDatastoresForClone).toHaveBeenCalled();
    });

    it('should get latest checkpoint if the factory does not get a checkpoint passed to it', function(){
        spyOn(service,'GetLatestCheckpoint').and.callThrough();
        factory.open({id: 123}, 'vpgName', 1, null);
        expect(service.GetLatestCheckpoint).toHaveBeenCalled();
    });
});

