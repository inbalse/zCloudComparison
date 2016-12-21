'use strict';

module.exports = function GetAvailableHostsForInstallation() {
    let result = [];
    let item1 = {};
    item1.HostInfo = {};
    item1.HostInfo.DisplayName = 'Host 1';
    item1.HostInfo.BaseComputeResourceIdentifier = {};
    item1.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier = {};
    item1.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid = '09d0d3b4-78d0-47c1-ad38-d01887e6d589';
    item1.HostInfo.BaseComputeResourceIdentifier.InternalName = 'host-9';
    item1.HostCredentialRequired = false; //need to enter password
    result.push(item1);

    let item2 = {};
    item2.HostInfo = {};
    item2.HostInfo.DisplayName = 'Host 2';
    item2.HostInfo.BaseComputeResourceIdentifier = {};
    item2.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier = {};
    item2.HostInfo.BaseComputeResourceIdentifier.ServerIdentifier.ServerGuid = '9sa8sajsas-78d0-47c1-ad38-sajsajkkasx';
    item2.HostInfo.BaseComputeResourceIdentifier.InternalName = 'host-12';
    item2.HostCredentialRequired = true; //need to enter password
    result.push(item2);

    return result;
};
