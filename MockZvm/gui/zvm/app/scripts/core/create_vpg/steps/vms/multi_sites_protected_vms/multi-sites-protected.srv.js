'use strict';

angular.module('zvmApp.core')
    .service('multiSiteProtectedVmsService', function ($filter, $translate, vmsService, multiSitesCommonProtectedService, selectedVmsCons) {
        var multiSiteProtectedVmsService = this, allPotentialsVms;

        multiSiteProtectedVmsService.setAllPotentialsVms = function (vms) {
            allPotentialsVms = vms;
        };

        //region COLUMN DEF
        var getColumnsDef = function () {
            return [
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VM_NAME'),
                    field: 'DisplayName',
                    width: 90
                },
                {
                    name: '',
                    field: selectedVmsCons.MULTI_SITE_VC_COLUMN_FIELD,
                    resizable: false,
                    formatter: $filter('multiSitesSharedIconFormatter'),
                    headerCssClass: 'multi-sites-header-icon',
                    toolTip: 'Protected in other VPGs',
                    width: 40
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VPG_NAME'),
                    field: selectedVmsCons.MULTI_SITES_GRID_VPG_NAME_FIELD,
                    formatter: $filter('multiSitesVpgNameFormatter')
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.PROVISIONED_SIZE'),
                    value: 0,
                    field: 'SizeInMbFiltered',
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.RECOVERY_SITE'),
                    field: selectedVmsCons.MULTI_SITES_GRID_PEER_SITES_FIELD
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.PROTECTED_HOST'),
                    field: 'ProtectedHostName'
                }
            ];
        };

        multiSiteProtectedVmsService.getColumnOptions = function () {
            return {
                showCheckbox: true,
                showSearch: true,
                columns: getColumnsDef(),
                defaultSortField: 'DisplayName'
            };
        };
        //endregion

        //region CUSTOM FILTER
        multiSiteProtectedVmsService.getCustomFilterDef = function () {
            return multiSitesCommonProtectedService.getCustomFilterDef();
        };

        multiSiteProtectedVmsService.getGridDataAfterFilterData = function (selected) {
            return multiSitesCommonProtectedService.getGridDataAfterFilterData(selected, allPotentialsVms, 'ProtectedVmVpgsInfo');
        };

        multiSiteProtectedVmsService.getGridSelectedFromFilterData = function (selectedVms, onGridVms) {
            return multiSitesCommonProtectedService.getGridSelectedFromFilterData(selectedVms, onGridVms);
        };
        //endregion

        multiSiteProtectedVmsService._private = {
            getColumnsDef: getColumnsDef
        };
    });
