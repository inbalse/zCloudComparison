'use strict';

describe('details tabs controller', function () {
    var controller, scope, state, zAlertFactory, vos, globalStateModel, enums, translate;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, $state, _zAlertFactory_, $translate, _vos_, _globalStateModel_, _enums_) {
        zAlertFactory = _zAlertFactory_;
        enums = _enums_;
        state = $state;
        scope = $rootScope.$new();
        vos = _vos_;
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {};
        translate = $translate;
        controller = $controller('vpgDetailsController', {
            $scope: scope,
            $state: state,
            $translate: translate,
            zAlertFactory: zAlertFactory,
            globalStateModel: globalStateModel
        });
        spyOn(zAlertFactory, 'fail');
    }));


    it('should have tabs defined', function () {
        expect(scope.tabs).toBeDefined();
    });

    it('should have functions defined', function () {
        expect(scope.onSuccess).toBeDefined();
        expect(scope.onFail).toBeDefined();
    });

    it('should call zAlertFactory in case of fail', function () {
        scope.onFail();
        expect(zAlertFactory.fail).toHaveBeenCalled();
    });

});
