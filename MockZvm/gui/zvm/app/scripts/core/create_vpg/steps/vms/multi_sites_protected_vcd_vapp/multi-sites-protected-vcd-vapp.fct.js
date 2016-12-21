'use strict';

angular.module('zvmApp.core')
    .factory('multiSiteProtectedVcdVappFactory', function ($uibModal, $q, $filter, vmsService, vpgService, multiSiteProtectedVcdVappService, multiSitesCommonProtectedService) {
        var multiSiteProtectedVcdVappFactory = {};

        multiSiteProtectedVcdVappFactory._modalInstance = null;
        multiSiteProtectedVcdVappFactory.differed = null;

        multiSiteProtectedVcdVappFactory.openWindow = function (checkedVcdVapp, isEditMode) {
            multiSiteProtectedVcdVappFactory.differed = $q.defer();

            multiSiteProtectedVcdVappFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/create_vpg/steps/vms/multi_sites_protected_vcd_vapp/multi-sites-protected-vcd-vapp.html',
                windowClass: 'multi-site-protected-vcd-vapp-window',
                controller: 'multiSiteProtectedVcdVappController',
                controllerAs: 'allProtectedVcdVapp',
                backdrop: 'static',
                resolve: {
                    potentialsVcdVapp: function () {
                        return mapDataToGrid();
                    },
                    selectedVcdVapp: function () {
                        return angular.copy(checkedVcdVapp);
                    },
                    isEditMode: function () {
                        return isEditMode;
                    }
                }
            });

            return multiSiteProtectedVcdVappFactory.differed.promise;
        };

        //region========================== MAP DATA TO GRID ====================================//
        var mapDataToGrid = function () {
            var allPotentialsVcdVapps = angular.copy(vpgService.getInitialSitesInfo().LocalVCDVapps),
                path = 'Vapp.ProtectedVCDVappVpgsInfo.KnownProtectedVCDVappVpgsInfo';

            _.each(allPotentialsVcdVapps, function (vApp) {
                vApp.ProvisionedSizeInMB = {
                    display: $filter('mbToStringConvertorFilter')(vApp.ProvisionedSizeInMB),
                    value: vApp.ProvisionedSizeInMB
                };
            });

            allPotentialsVcdVapps = multiSitesCommonProtectedService.getMappingDataForGrid(allPotentialsVcdVapps, path, true);
            multiSiteProtectedVcdVappService.setAllPotentialsVcdVapp(allPotentialsVcdVapps);
            return allPotentialsVcdVapps;
        };
        //endregion================================================================================//

        multiSiteProtectedVcdVappFactory.save = function (value) {
            multiSiteProtectedVcdVappFactory.differed.resolve(value);
            multiSiteProtectedVcdVappFactory._modalInstance.close('');
        };

        multiSiteProtectedVcdVappFactory.close = function () {
            multiSiteProtectedVcdVappFactory._modalInstance.close('');
        };

        return multiSiteProtectedVcdVappFactory;
    });
