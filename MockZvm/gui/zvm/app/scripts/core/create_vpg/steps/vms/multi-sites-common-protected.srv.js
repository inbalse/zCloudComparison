'use strict';

angular.module('zvmApp.core')
    .constant('selectedVmsCons', {
        MULTI_SITE_VC_COLUMN_FIELD: 'ProtectedVmVpgsInfo',
        MULTI_SITE_VC_DATA_COLUMN_FIELD: 'KnownProtectedVmVpgsInfo',
        MULTI_SITE_VCD_VAPP_COLUMN_FIELD: 'ProtectedVCDVappVpgsInfo',
        MULTI_SITE_VCD_VAPP_DATA_COLUMN_FIELD: 'KnownProtectedVCDVappVpgsInfo',

        MULTI_SITES_GRID_VPG_NAME_FIELD: 'vpgName',
        MULTI_SITES_GRID_PEER_SITES_FIELD: 'peerSiteName',
        MULTI_SITES_GRID_NUM_OF_VM_FIELD: 'numOfVms',

        ALL: 0,
        UNPROTECTED : 1,
        ALREADY_PROTECTED: 2
    })
    .service('multiSitesCommonProtectedService', function ($translate, selectedVmsCons) {
        var multiSitesCommonProtectedService = this;

        var concatProp = function (item, prop, value) {
            if (_.isNullOrUndefined(item[prop])) {
                item[prop] = value;
            } else {
                item[prop] = item[prop] + ', ' + value;
            }
        };

        var concatenateVmProp = function (item, objPath, isVapp) {
            var info = _.get(item, objPath);

            _.each(info, function (vpg) {
                concatProp(item, selectedVmsCons.MULTI_SITES_GRID_VPG_NAME_FIELD, vpg.VpgName);
                concatProp(item, selectedVmsCons.MULTI_SITES_GRID_PEER_SITES_FIELD, vpg.PeerSiteName);
                //just for VCD vApp
                if (isVapp) {
                    item[selectedVmsCons.MULTI_SITES_GRID_NUM_OF_VM_FIELD] = vpg.NumberOfVms;
                }
            });
        };

        multiSitesCommonProtectedService.getMappingDataForGrid = function (potentials, objPath, isVapp) {
            _.each(potentials, function (item) {
                var checkInfo = _.get(item, objPath);

                if (checkInfo && checkInfo.length > 0) {
                    concatenateVmProp(item, objPath, isVapp);
                } else {
                    //just for vms
                    if (!isVapp) {
                        concatProp(item, selectedVmsCons.MULTI_SITES_GRID_VPG_NAME_FIELD, '');
                    }
                }
            });

            return potentials;
        };

        //drop down filter options
        multiSitesCommonProtectedService.getCustomFilterDef = function () {
            return [
                {display: $translate.instant('CREATE_VPG_SELECT_VMS.ALL'), value: selectedVmsCons.ALL},
                {display: $translate.instant('CREATE_VPG_SELECT_VMS.UNPROTECTED'), value: selectedVmsCons.UNPROTECTED},
                {display: $translate.instant('CREATE_VPG_SELECT_VMS.ALREADY_PROTECTED'), value: selectedVmsCons.ALREADY_PROTECTED}
            ];
        };

        //filter for drop down
        multiSitesCommonProtectedService.getGridDataAfterFilterData = function (selected, allPotentials, prop) {
            switch (selected.value) {
                case selectedVmsCons.ALL:
                    return allPotentials;
                case selectedVmsCons.UNPROTECTED:
                    return _.filter(allPotentials, function (item) {
                        return !item[prop].isProtected;
                    });
                case selectedVmsCons.ALREADY_PROTECTED:
                    return _.filter(allPotentials, function (item) {
                        return item[prop].isProtected;
                    });
                default:
                    return allPotentials;
            }
        };

        //check is one of selected items exist on grid for pre select
        multiSitesCommonProtectedService.getGridSelectedFromFilterData = function (selected, onGrid) {
            if(!_.isEmpty(selected)) {
                var allIds = _.pluck(onGrid, 'id');

                return _.filter(selected, function (item) {
                    return _.contains(allIds, item.id);
                });
            }

            return selected;
        };
    });
