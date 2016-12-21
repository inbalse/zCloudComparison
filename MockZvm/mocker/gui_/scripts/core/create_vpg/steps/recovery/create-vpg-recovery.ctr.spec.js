'use strict';

describe('create-vpg - Recovery', function () {
    var scope, controller, model, enums;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $controller, _createVPGModel_, _enums_) {
        scope = $rootScope.$new();
        model = _createVPGModel_;
        enums = _enums_;
        model.data = {id: 23423, defaultVpgSettings: {Config: {}}, targetSiteType:{value:0}, sourceSiteType:{sourceType:0}};
        spyOn(scope, '$watch').and.callThrough();
        controller = $controller('createVPGRecoveryController', {$scope: scope, createVPGModel: model});
    }));

    it('should should check copyNatRulesAvailable not available', function () {
        //set up the modal data
        scope.data = {};
        scope.data.targetSiteType = {value:enums.VpgEntityType.VCDvApp};
        scope.data.defaultVpgSettings = {};
        scope.data.defaultVpgSettings.Config = {Defaults:{}, Configuration:{CopyNatRulesOptions:1}};
        scope.data.copyNatRulesAvailable = false;
        model.data = scope.data;
        scope.$digest();

        expect(scope.enableCopyNatServiceDropDown).toBeFalsy();
        expect(scope.data.defaultVpgSettings.Config.Configuration.CopyNatRulesOptions).toEqual(enums.CopyNatRulesOptions.DontCopy);
    });

    it('should should check copyNatRulesAvailable not available', function () {
        //set up the modal data
        scope.data = {};
        scope.data.targetSiteType = {value:enums.VpgEntityType.VCDvApp};
        scope.data.defaultVpgSettings = {};
        scope.data.defaultVpgSettings.Config = {Defaults:{}, Configuration:{CopyNatRulesOptions:0}};
        scope.data.copyNatRulesAvailable = true;
        model.data = scope.data;
        scope.$digest();

        expect(scope.enableCopyNatServiceDropDown).toBeTruthy();
        expect(scope.data.defaultVpgSettings.Config.Configuration.CopyNatRulesOptions).toEqual(enums.CopyNatRulesOptions.CopyAsIs);
    });

    it('should call different function on the create vpg model based on target site type Failover Network', function () {
        //set up the modal data
        scope.data = {};
        scope.data.targetSiteType = {value:enums.VpgEntityType.VCDvApp};
        scope.data.defaultVpgSettings = {};
        scope.data.defaultVpgSettings.Config = {Defaults:{FailoverVCDVAppNetwork:null}};
        scope.data.defaultFailoverNetwork = {id:'124345'};
        model.data = scope.data;
        scope._handleDefaultFailoverNetworkChange({id:'124345'},{id:'12434532'});
        expect(scope.data.defaultVpgSettings.Config.Defaults.FailoverVCDVAppNetwork).toEqual(scope.data.defaultFailoverNetwork);

        scope.data.targetSiteType = {value:enums.VpgEntityType.VCVpg};
        scope._handleDefaultFailoverNetworkChange({id:'124345'},{id:'12434532'});
        expect(scope.data.defaultVpgSettings.Config.Defaults.FailoverNetwork).toEqual(scope.data.defaultFailoverNetwork);
    });

    it('should call different function on the create vpg model based on target site type Test Network', function () {
        //set up the modal data
        scope.data = {};
        scope.data.targetSiteType = {value:enums.VpgEntityType.VCDvApp};
        scope.data.defaultVpgSettings = {};
        scope.data.defaultVpgSettings.Config = {Defaults:{FailoverVCDVAppNetwork:null}};
        scope.data.defaultTestNetwork = {id:'124345'};
        model.data = scope.data;
        scope._handleDefaultTestNetworkChange({id:'124345'},{id:'12434532'});
        expect(scope.data.defaultVpgSettings.Config.Defaults.TestVCDVAppNetwork).toEqual(scope.data.defaultTestNetwork);

        scope.data.targetSiteType = {value:enums.VpgEntityType.VCVpg};
        scope._handleDefaultTestNetworkChange({id:'124345'},{id:'12434532'});
        expect(scope.data.defaultVpgSettings.Config.Defaults.TestNetwork).toEqual(scope.data.defaultTestNetwork);
    });
});
