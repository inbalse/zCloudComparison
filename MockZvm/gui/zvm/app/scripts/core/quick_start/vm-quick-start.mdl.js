'use strict';

angular.module('zvmApp.core')
    .factory('vmContextModel', function (zertoServiceUpdaterFactory) {
        var vmContextModel = {};
        var operation = 'GetVirtualMachineContextInfo';

        vmContextModel.registerForVMContextInfo = function (scope, vmIdentifier) {
            return zertoServiceUpdaterFactory.register(scope, operation, [vmIdentifier], false, vmContextModel._processData);
        };
        
        vmContextModel._processData = function (result) {
            return result;
        };

        vmContextModel.unregisterDetails = function () {
            zertoServiceUpdaterFactory.unregisterAll(operation);
        };
        
        return vmContextModel;
    });
