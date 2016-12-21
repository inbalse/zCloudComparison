'use strict';

describe('Commit vpg controller', function () {
    var scope, controller, factory, vpgId, zertoServiceFactory, deferred;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $q, $rootScope, vos, _$translate_, _createVPGFactory_, _zertoServiceFactory_) {
        scope = $rootScope.$new();
        factory = _createVPGFactory_;
        zertoServiceFactory = _zertoServiceFactory_;

        vpgId = new vos.ProtectionGroupIdentifier();
        vpgId.GroupGuid = 'VPG id';

        deferred = $q.defer();
        deferred.resolve('somevalue'); //  always resolved, you can do it from your spec

        controller = $controller('commitVpgController', {$scope: scope, $translate: _$translate_, cloneVpgFactory: factory, vpgId: vpgId, vpgActionStatus: 6, isReversePossible:true});
    }));

    it("should check definitions and functions", function () {
        expect(scope.vpgId).toBeDefined();
        expect(scope.forms).toBeDefined();
        expect(scope.commitObj.reverseEnabled).toBeFalsy();
        expect(scope.handleSave).toBeDefined();
        expect(scope.handleCancel).toBeDefined();
        expect(scope.configureVpg).toBeDefined();
        expect(scope.isReversePossible).toBeDefined();

    });

});
