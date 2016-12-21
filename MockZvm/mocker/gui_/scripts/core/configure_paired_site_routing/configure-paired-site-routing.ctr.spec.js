'use strict';

describe('configurePairedSiteRoutingControllerTest', function () {
    var controller, scope, data;

    beforeEach(module('zvmTest'));

    describe('full data', function () {
        beforeEach(inject(function ($controller, $rootScope, _$translate_, _configurePairedSiteRoutingFactory_, vos,
                                    _configurePairedSiteRoutingModel_) {
            scope = $rootScope.$new();

            data = new vos.PairedSiteRouting('111.111.111.1', '111.111.11.2', '111.11.111.3');

            controller = $controller('configurePairedSiteRoutingController', {$scope: scope,
                result: data,
                $translate: _$translate_,
                configurePairedSiteRoutingFactor: _configurePairedSiteRoutingFactory_,
                configurePairedSiteRoutingModel:  _configurePairedSiteRoutingModel_});
        }));

        it('should check data', function () {
            expect(scope.data.PeerGw).toEqual('111.111.111.1');
            expect(scope.data.PeerNetMask).toEqual('111.111.11.2');
            expect(scope.data.PeerNetwork).toEqual('111.11.111.3');
            expect(scope.sendButton.disabled).toBeTruthy();
        });
    });

    describe('null data', function () {
        beforeEach(inject(function ($controller, $rootScope, _$translate_, _configurePairedSiteRoutingFactory_, vos,
                                    _configurePairedSiteRoutingModel_) {

            scope = $rootScope.$new();

            data = null;

            controller = $controller('configurePairedSiteRoutingController', {$scope: scope,
                result: data,
                $translate: _$translate_,
                configurePairedSiteRoutingFactor: _configurePairedSiteRoutingFactory_,
                configurePairedSiteRoutingModel:  _configurePairedSiteRoutingModel_});
        }));

        it('should check data', function () {
            expect(scope.data.PeerGw).toEqual('');
            expect(scope.data.PeerNetMask).toEqual('');
            expect(scope.data.PeerNetwork).toEqual('');
        });
    });





});
