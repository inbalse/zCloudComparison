'use strict';

describe('changeVmRecoveryVraControllerTest', function () {
    var controller, scope, data;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _$translate_, _$filter_, _changeVmRecoveryVraFactory_, vos, enums) {
        scope = $rootScope.$new();

        data = new vos.ChangeHostScreenVisualObject();
        data.VmsList = [];

        for (var i = 0; i < 5; i++) {
            var vmItem = new vos.ChangeHostVmVisualObject();
            vmItem.Status = enums.ChangeHostVmVisualObject_ChangeHostValidationStatus.Natural;

            if (i == 3) {
                vmItem.Status = enums.ChangeHostVmVisualObject_ChangeHostValidationStatus.Bad;
            }

            if (i == 1) {
                vmItem.Status = enums.ChangeHostVmVisualObject_ChangeHostValidationStatus.Good;
            }

            if (i == 2) {
                vmItem.Status = enums.ChangeHostVmVisualObject_ChangeHostValidationStatus.Warning;
            }

            vmItem.VirtualMachineVisualObject = new vos.VirtualMachineVisualObject();
            vmItem.VirtualMachineVisualObject.Id = new vos.VMIdentifier();
            vmItem.VirtualMachineVisualObject.Id.InternalVmName = 'InternalVmName ' + (i + 1).toString();
            vmItem.VirtualMachineVisualObject.Id.ServerIdentifier = {};
            vmItem.VirtualMachineVisualObject.Id.ServerIdentifier.ServerIdentifier = 'ServerIdentifier ' + (i + 1).toString();
            vmItem.VirtualMachineVisualObject.DisplayName = 'VM ' + (i + 1).toString();
            vmItem.ProtectionGroupIdentifier = new vos.ProtectionGroupIdentifier();
            vmItem.ProtectionGroupName = 'ProtectionGroup ' + (i + 1).toString();
            vmItem.ZertoOrganization = 'Organization' + (i + 1).toString();

            if (i == 0) vmItem.VirtualMachineSizeInGB = 11000;
            else if (i == 1) vmItem.VirtualMachineSizeInGB = 1900;
            else if (i == 2) vmItem.VirtualMachineSizeInGB = 1800;
            else if (i == 3) vmItem.VirtualMachineSizeInGB = 11200;
            else if (i == 4) vmItem.VirtualMachineSizeInGB = 11150;

            vmItem.NumberOfVolumes = 4;
            vmItem.VmHardwareVersion = 'VmHardwareVersion ' + (i + 1).toString();
            vmItem.Selected = true;

            if (i == 3) {
                vmItem.Direction = enums.ProtectionGroupStateVisual.Recovery;
            } else {
                vmItem.Direction = enums.ProtectionGroupStateVisual.Protected;
            }

            data.VmsList.push(vmItem);
        }

        data.AvailableHostList = [];
        for (var j = 0; j < 3; j++) {
            var hostItem = new vos.ChangeHostRecoveryHostVisualObject();
            hostItem.HostInfo = new vos.ComputeResourceVisualObject();
            if (j == 2) {
                hostItem.Recommended = true;
            } else {
                hostItem.Recommended = false;
            }
            hostItem.HostInfo.BaseComputeResourceIdentifier = new vos.BaseComputeResourceIdentifier();
            hostItem.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier = new vos.ServerIdentifier();
            hostItem.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid = 'ServerGuid ' + (j + 1).toString();
            hostItem.HostInfo.DisplayName = 'Host ' + (j + 1).toString();
            hostItem.HostInfo.ResourcePoolIdentifier = new vos.ResourcePoolIdentifier();

            data.AvailableHostList.push(hostItem);
        }

        data.ExplanationList = [];
        for (var z = 0; z < 7; z++) {
            var ex = new vos.ChangeHostValidationExplanationVisualObject();
            ex.Explanation = 'blalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
            ex.VirtualMachines = [];

            ex.VirtualMachines.push(data.VmsList[1].VirtualMachineVisualObject);
            ex.VirtualMachines.push(data.VmsList[2].VirtualMachineVisualObject);

            data.ExplanationList.push(ex);
        }

        data.NotificationsList = [];
        data.NotificationsList.push('jdkslhfsdkjlhfjsdhfndbhnmfdgjhfjkdsssssssss');
        data.NotificationsList.push('jklsdhfklsdjhfsdjlbhvdk.dskaldk;lsfndjhfdhshds');

        data.SelectedHost = data.AvailableHostList[1].HostInfo;

        //vraHost = angular.fromJson({"GroupGuid": "59f994cd-df76-4b8b-bc3a-8e51fd61f62b"});


        controller = $controller('changeVmRecoveryVraController', {$scope: scope,
            result: data,
            $translate: _$translate_,
            changeVmRecoveryVraFactor: _changeVmRecoveryVraFactory_,
            $filter: _$filter_ });
    }));

    it('should init called and check proccesData', function () {
        expect(scope.data.VmsList.length).toEqual(5);
        expect(scope.data.NotificationsList.length).toEqual(2);
        expect(scope.data.ExplanationList.length).toEqual(7);
        expect(scope.sendButton.disabled).toBeTruthy();
    });

    it('handleChange should call validate function', function () {
        spyOn(scope, 'validateData');
        scope.selectedItems = [{}];
        scope.selectedChange();
        expect(scope.validateData).toHaveBeenCalled();
    });

    it('should reset the data when unselecting all vpgs', function(){
        spyOn(scope,'setData');
        spyOn(scope, 'validateData');
        scope.selectedItems = [];
        scope.selectedChange();
        expect(scope.setData).toHaveBeenCalled();
        expect(scope.validateData).not.toHaveBeenCalled();
        expect(scope.validateData).not.toHaveBeenCalled();

    });

    it('should check getTooltip function', function () {
        var vmData = scope.data.ExplanationList[1].VirtualMachines;
        var result = scope.getTooltip(vmData);
        expect(result).toEqual('Affected VMs : VM 2 ,VM 3');
    });

    it('should check getUnderlineClass function', function () {
        var result = scope.getUnderlineClass(data.AvailableHostList[0]);
        expect(result).toEqual('none');
    });

    it('should check getUnderlineClass function', function () {
        var result = scope.getUnderlineClass(data.AvailableHostList[2]);
        expect(result).toEqual('underline-text');
    });
});
