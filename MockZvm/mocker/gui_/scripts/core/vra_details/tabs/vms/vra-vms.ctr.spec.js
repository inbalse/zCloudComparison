'use strict';

describe('VRA - VM list controller', function () {
    var scope, $controllerConstructor, factory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _vraDetailsFactory_) {
        scope = $rootScope.$new();
        factory = _vraDetailsFactory_;
        spyOn(factory, 'registerToDetails').and.callThrough();
        $controllerConstructor = $controller("vraVMsController", {$scope: scope, vraDetailsFactory: factory});
    }));

    it("data should be defined", function(){
        expect(factory.registerToDetails).toHaveBeenCalled();
    });

});
