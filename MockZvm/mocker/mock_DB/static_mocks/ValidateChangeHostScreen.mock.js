'use strict';

module.exports = function ValidateChangeHostScreen() {

    let template = {};
    template.VmsList = [];

    for (let i = 0; i < 5; i++) {
        let vmItem = {};
        vmItem.Status = 0;

        if (i == 3) {
            vmItem.Status = 1;
        }

        if (i == 1) {
            vmItem.Status = 0;
        }

        if (i == 2) {
            vmItem.Status = 3;
        }

        vmItem.VirtualMachineVisualObject = {};
        vmItem.VirtualMachineVisualObject.Id = {};
        vmItem.VirtualMachineVisualObject.Id.InternalVmName = 'InternalVmName ' + (i + 1).toString();
        vmItem.VirtualMachineVisualObject.DisplayName = 'VM ' + (i + 1).toString();
        vmItem.ProtectionGroupIdentifier = {};
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
            vmItem.Direction = 1;
        } else {
            vmItem.Direction = 0;
        }

        template.VmsList.push(vmItem);
    }

    template.AvailableHostList = [];
    for (let j = 0; j < 3; j++) {
        let hostItem = {};
        hostItem.HostInfo = {};
        if (j == 2) {
            hostItem.Recommended = true;
        } else {
            hostItem.Recommended = false;
        }
        hostItem.HostInfo.BaseComputeResourceIdentifier = {};
        hostItem.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier = {};
        hostItem.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid = 'ServerGuid ' + (j + 1).toString();
        hostItem.HostInfo.DisplayName = 'Host ' + (j + 1).toString();
        hostItem.HostInfo.ResourcePoolIdentifier = {};

        template.AvailableHostList.push(hostItem);
    }

    template.ExplanationList = [];
    for (let z = 0; z < 7; z++) {
        let ex = {};
        ex.Explanation = 'blalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        ex.VirtualMachines = [];

        ex.VirtualMachines.push(template.VmsList[1].VirtualMachineVisualObject);
        ex.VirtualMachines.push(template.VmsList[2].VirtualMachineVisualObject);

        template.ExplanationList.push(ex);
    }

    template.NotificationsList = [];
    template.NotificationsList.push('jdkslhfsdkjlhfjsdhfndbhnmfdgjhfjkdsssssssss');
    template.NotificationsList.push('jklsdhfklsdjhfsdjlbhvdk.dskaldk;lsfndjhfdhshds');

    template.SelectedHost = template.AvailableHostList[1].HostInfo;
    return template;
};
