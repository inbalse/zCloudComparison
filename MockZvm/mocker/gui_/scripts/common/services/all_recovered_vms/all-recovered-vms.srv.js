'use strict';

angular.module('zvmApp.services').constant('allRecoveryVmsOperationServiceConstants', {
        recovered: 'recovered',
        cloned: 'cloned',
        restored: 'restored from the backup',
        heading: 'Warning'
    })
    .service('allRecoveredVmsApiService', function (allRecoveredVmsApiFactory, zertoServiceFactory, vmsPerCheckpointsApiService, $q) {

        var allRecoveredVmsApiService = this;

        //get all vms list per last checkpoint
        var getVmsList = function () {
            return zertoServiceFactory.GetProtectedVirtualMachineListScreen();
        };

        //that function used when you have more that one vpg
        allRecoveredVmsApiService.sureAllVmsRecoveredPerAllVpgs = function (selected, operation) {
            var recoveredVmsPerAllVpgsDifferProcess = $q.defer(),
                virtualMachines,
                promises = [];

            getVmsList().then(function (result) {
                virtualMachines = result.VirtualMachines;

                _.each(selected, function (selectedVpg) {
                    promises.push(vmsPerCheckpointsApiService.getVmsPerCheckpoint(selectedVpg.Identifier.GroupGuid, selectedVpg.checkpointObj.lastCheckpoint.Identifier.Identifier));
                });

                //await that all request will be resolved
                $q.all(promises).then(function (results) {
                    results = allRecoveredVmsApiFactory.resultEmptyValidation(results);
                    recoveredVmsPerAllVpgsDifferProcess.resolve(allRecoveredVmsApiFactory.handelVmsPerAllVpgsCpResultsFunc(results, selected, virtualMachines, operation));
                });
            });

            return recoveredVmsPerAllVpgsDifferProcess.promise;
        };

        //that function used when you have just one vpg
        allRecoveredVmsApiService.sureAllVmsRecoveredPerOneVpg = function (vpgId, vpgName, operation, cp) {
            var recoveredVmsPerOneVpgDifferProcess = $q.defer(),
                virtualMachines,
                cpIdentifier = angular.isDefined(cp) ? cp.Identifier.Identifier : '';

            getVmsList().then(function (result) {
                virtualMachines = result.VirtualMachines;

                vmsPerCheckpointsApiService.getVmsPerCheckpoint(vpgId.GroupGuid, cpIdentifier).then(function (result) {
                    recoveredVmsPerOneVpgDifferProcess.resolve(allRecoveredVmsApiFactory.handelVmsPerOneVpgCpResultsFunc(result, vpgId, vpgName, virtualMachines, operation));
                });
            });

            return recoveredVmsPerOneVpgDifferProcess.promise;
        };

        allRecoveredVmsApiService._private = {
            getVmsList: getVmsList
        };
    });
