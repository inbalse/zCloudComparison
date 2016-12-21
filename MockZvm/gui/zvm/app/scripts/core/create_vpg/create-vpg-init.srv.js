'use strict';

angular.module('zvmApp.core')
    .service('createVPGInitService', function (createVpgInitDataService, zertoServiceFactory, enums, helperService, globalStateModel, vpgService, vmsService, zAlertFactory) {


        //Optional id is a pre selected vm or vApp to add to the vpg

        var initService = this;

        initService.init = function (isEdit, isReverse, optionalId) {
            createVpgInitDataService.init(isEdit,isReverse,optionalId);
        };

        initService.setVpgSettings = function(vpgSettings){
            return createVpgInitDataService.setVpgSettings(vpgSettings);
        };

        initService.setPotentialsVms = function (vpgId) {
            //get potential vms & set site source
            return getPotentialVms(vpgId);
        };

        initService.baseErrorHandler = function (error) {
            if (error) {
                zAlertFactory.fail(error.faultString);
            }
        };

        function addPreSelectedVm(potentialVms, optionalVmIdToAdd) {
            var found = helperService.findAndRemoveVmsFromPotential(potentialVms, optionalVmIdToAdd);

            if (found.length) {
                vpgService.setSourceSiteType(enums.VpgEntityType.VCVpg);
                vmsService.setSelectedVms(found);
            }
        }

        function getPotentialVms(vpgId) {

            return zertoServiceFactory.GetPotentialVirtualMachinesForAdding(vpgId).then(function (potentialVms) {
                vmsService.setPotentialVms(_.sortBy(potentialVms, function (vm) {
                    return vm.DisplayName.toLowerCase();//need because sort uppers vm names first
                }));

                helperService.initVmsForGrid(potentialVms);


                var optionalVmIdToAdd = vpgService.getOptionalVmIdToAdd();
                if (!_.isNullOrUndefined(optionalVmIdToAdd)) {
                    addPreSelectedVm(potentialVms, optionalVmIdToAdd);
                }

            }, initService.baseErrorHandler);
        }
    });
