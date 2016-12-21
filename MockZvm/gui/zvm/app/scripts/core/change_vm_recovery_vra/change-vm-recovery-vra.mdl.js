/**
 * Created by liron on 02/07/2015.
 */
'use strict';

angular.module('zvmApp.models')
    .factory('changeVmRecoveryVraModel', function (){

        var changeVmRecoveryVraModel = {};

        changeVmRecoveryVraModel.processData = function (data) {
             var processed = data;

            processed = _.forEach(processed, function (item) {
                item.id = JSON.stringify(item.VirtualMachineVisualObject.Id);
                item.vmName = item.VirtualMachineVisualObject.DisplayName;
                var size = Math.round(item.VirtualMachineSizeInGB);
                item.vmSize = {display: size + 'GB', value: size};
            });


            return processed;
        };

        changeVmRecoveryVraModel._processAvailableHostData = function (data) {
            var processed = data;
            processed = _.forEach(processed, function (item) {
                item.HostInfo.Recommended =  item.Recommended;
            });

            return processed;
        };

        return changeVmRecoveryVraModel;
    });
