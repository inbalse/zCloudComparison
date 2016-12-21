'use strict';

angular.module('zvmApp.services').factory('allRecoveredVmsApiFactory', function () {

    var allRecoveredVmsApiFactory = this,
        messageEnd = '',
        vmsNames = '',
        messages = '',
        warningInfoTemplate = _.template('<div>The following VMs were not protected when the selected checkpoint was taken:</div></div><div><%=messages%></div><div><%=messageEnd%></div>'),
        innerWarnTextTemplate = _.template('<div>Only the VMs that were protected at this time will be <%=contextOperation%>.</div>'),
        messagesTemplate = _.template('<div>VMs <%=vmsList%> in VPG <%=vpgName%></div>');

    //------------------------------------------------ HELPER FUNCTION -------------------------------------------------------------------------------

    //release the result to a waiting promise and clean inner variables
    var releaseVmsRecoveryVerifyProcess = function (warningInfo) {
        messageEnd = '';
        vmsNames = '';
        messages = '';
        return warningInfo;
    };

    //string vms name builder
    var getVmsListNames = function (vmsName) {
        var vmsNameLength = vmsName.length;
        vmsNames = '';

        _.each(vmsName, function (name, index) {
            vmsNames += (index === vmsNameLength - 1) ?
                (angular.isString(name) ? name : name.VirtualMachineName) :
                (angular.isString(name) ? name + ', ' : name.VirtualMachineName + ', ');
        });

        return vmsNames;
    };

    //build the inner title of messages
    var getInnerWarningText = function (operation) {
        return innerWarnTextTemplate({
            contextOperation: operation
        });
    };

    //build message string join vpg name to vms list
    var getInfoMessages = function (name, list) {
        return messagesTemplate({
            vpgName: name,
            vmsList: getVmsListNames(list)
        });
    };

    //wrap messages to one container
    var wrapMessages = function (messages, messageEnd) {
        return warningInfoTemplate({
            messages: messages,
            messageEnd: messageEnd
        });
    };

    var getVmsPerVpgId = function (prop, virtualMachines, selectedVpgs) {
        return _.filter(virtualMachines, function (vm) {
            return vm.VPGIdentifier.GroupGuid === selectedVpgs[prop].Identifier.GroupGuid;
        });
    };

    var getVmsThatNotBeRecovered = function (vmsPerVpgByLastCp, vmsPerVpgBySelectedCp) {
        return _.filter(vmsPerVpgByLastCp, function (vm) {
            //build identifier like returned from rest api join VirtualMachineIdentifier whit internal name
            var identifier = vm.VirtualMachineIdentifier.ServerIdentifier.ServerGuid + '.' + vm.VirtualMachineIdentifier.InternalVmName;
            return !_.contains(vmsPerVpgBySelectedCp, identifier);
        });
    };

    //------------------------------------------------ MANY VPGs ------------------------------------------------------------------------------------

    var buildWarningMessagePerAllVpgs = function (allNotRecoveredVms, operation) {
        var vmsPerVpgHash = {};

        //build hash table of vpg key and vms collection value
        _.each(allNotRecoveredVms, function (vm) {
            if (angular.isUndefined(vmsPerVpgHash[vm.VPGName])) {
                vmsPerVpgHash[vm.VPGName] = [];
                vmsPerVpgHash[vm.VPGName].push(vm.VirtualMachineName);
            } else {
                vmsPerVpgHash[vm.VPGName].push(vm.VirtualMachineName);
            }
        });

        for (var prop in vmsPerVpgHash) {
            messages += getInfoMessages(prop, vmsPerVpgHash[prop]);
        }

        messageEnd = getInnerWarningText(operation);
        var warningInfo = wrapMessages(messages, messageEnd);

        return releaseVmsRecoveryVerifyProcess(warningInfo);
    };

    var handelVmsPerAllVpgsCpResultsFunc = function (results, selectedVpgs, virtualMachines, operation) {
        if (angular.isDefined(results)) {
            var allNotRecoveredVms = [];

            _.forEach(results, function (value, index) {

                var vmsPerVpgBySelectedCp = _.pluck(value, 'VmIdentifier');

                var vmsPerVpgByLastCp = getVmsPerVpgId(index, virtualMachines, selectedVpgs);

                var notRecoveredVms = getVmsThatNotBeRecovered(vmsPerVpgByLastCp, vmsPerVpgBySelectedCp);

                if (notRecoveredVms.length) {
                    allNotRecoveredVms = allNotRecoveredVms.concat(notRecoveredVms);
                }
            });

            if (allNotRecoveredVms.length) {
                return buildWarningMessagePerAllVpgs(allNotRecoveredVms, operation);
            }
        }

        return releaseVmsRecoveryVerifyProcess('');
    };

    var resultEmptyValidation = function (results) {
        results = _.filter(results, function (res) {
            return res.length !== 0;
        });

        if (results.length !== 0) {
            return results;
        }
    };

    //------------------------------------------------- ONE VPG --------------------------------------------------------------------------------------

    var buildWarningMessagePerOneVpg = function (allNotRecoveredVms, vpgId, vpgName, operation) {
        messages = getInfoMessages(vpgName, allNotRecoveredVms, operation);
        messageEnd = getInnerWarningText(operation);

        var warningInfo = warningInfoTemplate({
            messages: messages,
            messageEnd: messageEnd
        });

        return releaseVmsRecoveryVerifyProcess(warningInfo);
    };

    var handelVmsPerOneVpgCpResultsFunc = function (result, vpgId, vpgName, virtualMachines, operation) {
        if (angular.isDefined(result) && result.length) {
            var allNotRecoveredVms = [];

            var vmsPerVpgBySelectedCp = _.pluck(result, 'VmIdentifier');

            var vmsPerVpgByLastCp = _.filter(virtualMachines, function (vm) {
                return vm.VPGIdentifier.GroupGuid === vpgId.GroupGuid;
            });

            var notRecoveredVms = _.filter(vmsPerVpgByLastCp, function (vm) {
                var identifier = vm.VirtualMachineIdentifier.ServerIdentifier.ServerGuid + '.' + vm.VirtualMachineIdentifier.InternalVmName;
                return !_.contains(vmsPerVpgBySelectedCp, identifier);
            });

            if (notRecoveredVms.length) {
                allNotRecoveredVms = allNotRecoveredVms.concat(notRecoveredVms);
            }

            if (allNotRecoveredVms.length) {
                return buildWarningMessagePerOneVpg(allNotRecoveredVms, vpgId, vpgName, operation);
            }
        }

        return releaseVmsRecoveryVerifyProcess('');
    };

    //create private obj to run UT tests
    allRecoveredVmsApiFactory._private = {
        releaseVmsRecoveryVerifyProcess: releaseVmsRecoveryVerifyProcess,
        getVmsListNames: getVmsListNames,
        getInfoMessages: getInfoMessages,
        wrapMessages: wrapMessages,

        buildWarningMessagePerAllVpgs: buildWarningMessagePerAllVpgs,
        buildWarningMessagePerOneVpg: buildWarningMessagePerOneVpg
    };

    allRecoveredVmsApiFactory.resultEmptyValidation = resultEmptyValidation;
    allRecoveredVmsApiFactory.handelVmsPerAllVpgsCpResultsFunc = handelVmsPerAllVpgsCpResultsFunc;
    allRecoveredVmsApiFactory.handelVmsPerOneVpgCpResultsFunc = handelVmsPerOneVpgCpResultsFunc;

    return allRecoveredVmsApiFactory;

});
