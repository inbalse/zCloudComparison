'use strict';

angular.module('zvmApp.core')
    .factory('zsspCreateVPGModel', function ($filter, zertoServiceFactory, vos, enums, mbToStringConvertorFilter) {
        var zsspCreateVPGModel = {};


        //function filtered out already protected vms/vapp
        var oneToManyFilterOut = function (result) {
            var potentialsVC = [], potentialsVCD = [];

            if (result.LocalVCDVapps.length) {
                _.each(result.LocalVCDVapps, function (vcdVapp) {
                    if (!vcdVapp.Vapp.isProtected) {
                        potentialsVCD.push(vcdVapp);
                    }
                });
            }

            if (result.LocalVCVms.length) {
                _.each(result.LocalVCVms, function (vm) {
                    if (vm.ProtectedVmVpgsInfo.TotalNumberOfVpgs === 0) {
                        potentialsVC.push(vm);
                    }
                });
            }

            result.LocalVCDVapps = potentialsVCD;
            result.LocalVCVms = potentialsVC;
        };


        zsspCreateVPGModel.init = function (result) {

            //bug 26253
            oneToManyFilterOut(result);

            zsspCreateVPGModel.data = {
                initialSitesInfo: result,
                targetSite: null,
                selectedVCDVapp: null,
                sourceSiteType: {},
                showVcVms: result.LocalVCVms.length > 0,
                showVCDVapps: result.LocalVCDVapps.length > 0,
                vcVms: null,
                targetVirtualDatacenter: null,
                targetResourcePool: null,
                targetDs: null,
                serviceProfile: {},
                targetDatastoreData: [],
                targetOrgVDCDropDownData: [],
                targetResourcePoolDropDownData: [],
                serviceProfileDropDownData: []
            };

            zsspCreateVPGModel.initSourceSiteTypeCollection(result);
        };

        zsspCreateVPGModel.processVms = function (data) {

            var processed = _.forEach(data, function (vm) {
                vm.id = vm.Id.ServerIdentifier.ServerGuid + vm.Id.InternalVmName;
                vm.Size = mbToStringConvertorFilter(vm.SizeInMb);
                vm.SizeInMbFiltered = {
                    display: $filter('mbToStringConvertorFilter')(vm.SizeInMb),
                    value: vm.SizeInMb
                };
            });
            data = processed;
            return data;
        };

        zsspCreateVPGModel.initSourceSiteTypeCollection = function (value) {
            if (!value) {
                return;
            }

            if (value.LocalVCDVapps.length) {
                zsspCreateVPGModel.data.sourceSiteType = {sourceType: enums.VpgEntityType.VCDvApp};
            } else {
                zsspCreateVPGModel.data.sourceSiteType = {sourceType: enums.VpgEntityType.VCVpg};
            }
        };

        return zsspCreateVPGModel;

    });
