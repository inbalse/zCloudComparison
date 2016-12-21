'use strict';

module.exports = function GetInitChangeHostScreen() {

    let template = {};
    template.VmsList = [];
    for (let i = 0; i < 5; i++) {
        let vmItem = {};
        vmItem.Status = 2;
        vmItem.VirtualMachineVisualObject = {};
        vmItem.VirtualMachineVisualObject.Id = {};
        vmItem.VirtualMachineVisualObject.Id.InternalVmName = 'InternalVmName ' + (i + 1).toString();
        vmItem.VirtualMachineVisualObject.DisplayName = 'VM ' + (i + 1).toString();
        vmItem.ProtectionGroupIdentifier = {};
        vmItem.ProtectionGroupName = 'ProtectionGroup ' + (i + 1).toString();
        vmItem.ZertoOrganization = 'Organization ' + (i + 1).toString();

        if (i == 0) vmItem.VirtualMachineSizeInGB = 1000;
        else if (i == 1) vmItem.VirtualMachineSizeInGB = 900;
        else if (i == 2) vmItem.VirtualMachineSizeInGB = 800;
        else if (i == 3) vmItem.VirtualMachineSizeInGB = 1200;
        else if (i == 4) vmItem.VirtualMachineSizeInGB = 1150;

        vmItem.NumberOfVolumes = 4;
        vmItem.VmHardwareVersion = 'VmHardwareVersion ' + (i + 1).toString();
        vmItem.Selected = false;

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

    return template;
};
