'use strict';
describe('VPG - VM list controller', function () {
    var scope, $controllerConstructor, enums;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _enums_, $stateParams ) {
        scope = $rootScope.$new();
        scope.stateParams = $stateParams;
        enums = _enums_;


        $controllerConstructor = $controller("vpgVMsController", {$scope: scope});

    }));

    it("data should be defined", function(){
        var data = {Entities:{Source:0, Target:0}, ConfigurationFlags:{IsVmFolderConfigurable:true,IsStorageProfileEnabled:true}, VpgConfiguration:{Configuration:{ BootOrder:{Groups:[]}}, VirtualMachines:[]}};

        scope.setData(data);
        expect(scope.vpgData).toBeDefined();
        expect(scope.vmList).toBeDefined();
    });

    it("should be check columnDefs for vc->vc", function(){
        var data = {Entities:{Source:0, Target:0}, ConfigurationFlags:{IsVmFolderConfigurable:true,IsStorageProfileEnabled:true}, VpgConfiguration:{Configuration:{ BootOrder:{Groups:[]}}}};

        scope.setData(data);
    });

    it("should be check columnDefs for vc->vcd", function(){
        var data = {Entities:{Source:0, Target:1}, ConfigurationFlags:{IsVmFolderConfigurable:true,IsStorageProfileEnabled:true}, VpgConfiguration:{Configuration:{ BootOrder:{Groups:[]}}}};

        scope.setData(data);
    });

    it("should be check columnDefs for vcd->vc", function(){
        var data = {Entities:{Source:1, Target:0}, ConfigurationFlags:{IsVmFolderConfigurable:true,IsStorageProfileEnabled:true}, VpgConfiguration:{Configuration:{ BootOrder:{Groups:[]}}}};

        scope.setData(data);
    });

    it("should be check columnDefs for vcd->vcd", function(){
        var data = {Entities:{Source:1, Target:1}, ConfigurationFlags:{IsVmFolderConfigurable:true,IsStorageProfileEnabled:true}, VpgConfiguration:{Configuration:{ BootOrder:{Groups:[]}}}};

        scope.setData(data);
    });
});
