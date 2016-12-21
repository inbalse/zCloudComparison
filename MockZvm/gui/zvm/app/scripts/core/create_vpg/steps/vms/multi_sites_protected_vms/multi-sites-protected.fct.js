'use strict';

angular.module('zvmApp.core')
    .factory('multiSiteProtectedVmsFactory', function ($uibModal, $q, vmsService, multiSiteProtectedVmsService, multiSitesCommonProtectedService) {
        var multiSiteProtectedVmsFactory = {};

        multiSiteProtectedVmsFactory._modalInstance = null;
        multiSiteProtectedVmsFactory.differed = null;

        multiSiteProtectedVmsFactory.openWindow = function (checkedVms) {
            multiSiteProtectedVmsFactory.differed = $q.defer();

            multiSiteProtectedVmsFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/create_vpg/steps/vms/multi_sites_protected_vms/multi-sites-protected.html',
                windowClass: 'multi-site-protected-vms-window',
                controller: 'multiSiteProtectedVmsController',
                controllerAs: 'allProtectedVms',
                backdrop: 'static',
                resolve: {
                    potentialsVms: function () {
                        return mapDataToGrid();
                    },
                    selectedVms: function () {
                        return angular.copy(checkedVms);
                    }
                }
            });

            return multiSiteProtectedVmsFactory.differed.promise;
        };

        //region========================== MAP DATA TO GRID ====================================//
        var mapDataToGrid = function () {
            var allPotentialsVms = angular.copy(vmsService.getPotentialVms()),
                path = 'ProtectedVmVpgsInfo.KnownProtectedVmVpgsInfo';
            allPotentialsVms = multiSitesCommonProtectedService.getMappingDataForGrid(allPotentialsVms, path, false);
            multiSiteProtectedVmsService.setAllPotentialsVms(allPotentialsVms);
            return allPotentialsVms;
        };
        //endregion================================================================================//

        multiSiteProtectedVmsFactory.save = function (value) {
            multiSiteProtectedVmsFactory.differed.resolve(value);
            multiSiteProtectedVmsFactory._modalInstance.close('');
        };

        multiSiteProtectedVmsFactory.close = function () {
            multiSiteProtectedVmsFactory._modalInstance.close('');
        };

        return multiSiteProtectedVmsFactory;
    });
