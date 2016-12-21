'use strict';

angular.module('zvmApp.core')
    .factory('publicCloudVmSettingsModel', function () {
        var publicCloudVmSettingsModel = {};

        publicCloudVmSettingsModel.processData = function (data) {

            var processed = data;

            processed = _.forEach(processed, function (item) {
                item.id = item.InternalVirtualMachineId.ServerIdentifier.ServerGuid + item.InternalVirtualMachineId.InternalVmName;

                //Pcns.s
                item.FailoverPcn = _.isNullOrUndefined(item.CloudVmSettings.FailoverSettings.Pcn) ? null : item.CloudVmSettings.FailoverSettings.Pcn.Name;
                item.FailoverTestPcn = _.isNullOrUndefined(item.CloudVmSettings.FailoverTestSettings.Pcn) ? null : item.CloudVmSettings.FailoverTestSettings.Pcn.Name;

                //private ip's
                item.FailoverPrivateIp = item.CloudVmSettings.FailoverSettings.PrimaryIp;
                item.FailoverTestPrivateIp = item.CloudVmSettings.FailoverTestSettings.PrimaryIp;

                //subnets
                item.FailoverSubnet = _.isNullOrUndefined(item.CloudVmSettings.FailoverSettings.Pcn) ? null : item.CloudVmSettings.FailoverSettings.Subnet.Name;
                item.FailoverTestSubnet = _.isNullOrUndefined(item.CloudVmSettings.FailoverTestSettings.Pcn) ? null : item.CloudVmSettings.FailoverTestSettings.Subnet.Name;

                //groups
                item.FailoverSecurityGroups = item.CloudVmSettings.FailoverSettings.SecurityGroups;
                item.FailoverTestSecurityGroups = item.CloudVmSettings.FailoverTestSettings.SecurityGroups;

                item.FailoverInstanceType = item.CloudVmSettings.FailoverSettings.PublicCloudInstanceTypeVisualObject.Id.InstanceType;
                item.TestInstanceType = item.CloudVmSettings.FailoverTestSettings.PublicCloudInstanceTypeVisualObject.Id.InstanceType;
            });

            return processed;
        };

        return publicCloudVmSettingsModel;
    });
