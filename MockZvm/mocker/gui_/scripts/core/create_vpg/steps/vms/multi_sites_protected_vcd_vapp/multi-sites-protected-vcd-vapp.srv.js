'use strict';

angular.module('zvmApp.core')
    .service('multiSiteProtectedVcdVappService', function ($filter, $translate, vmsService, multiSitesCommonProtectedService, selectedVmsCons, zSlickGridFilterTypes) {
        var multiSiteProtectedVcdVappService = this, allPotentialsVcdVapp;

        multiSiteProtectedVcdVappService.setAllPotentialsVcdVapp = function (vApp) {
            allPotentialsVcdVapp = vApp;
        };

        //region COLUMN DEF
        var getColumnsDef = function () {
            return [
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VAPP_NAME'),
                    field: 'Vapp',
                    id: 'vAppNameId',
                    formatter: $filter('vcdVappNameFormatter'),
                    width: 90
                },
                {
                    name: '',
                    field: 'Vapp',
                    id: selectedVmsCons.MULTI_SITE_VCD_VAPP_COLUMN_FIELD,
                    resizable: false,
                    formatter: $filter('multiSitesSharedIconFormatter'),
                    headerCssClass: 'multi-sites-header-icon',
                    toolTip: 'Protected in other VPGs',
                    width: 40
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VPG_NAME'),
                    field: selectedVmsCons.MULTI_SITES_GRID_VPG_NAME_FIELD
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.PROVISIONED_SIZE'),
                    field: 'ProvisionedSizeInMB',
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    formatter: $filter('objectFormatter')
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.RECOVERY_SITE'),
                    field: selectedVmsCons.MULTI_SITES_GRID_PEER_SITES_FIELD
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.#_VMS'),
                    field: selectedVmsCons.MULTI_SITES_GRID_NUM_OF_VM_FIELD
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.ORG_VDC'),
                    field: 'OwningVirtualDataCenterName'
                }
            ];
        };

        multiSiteProtectedVcdVappService.getColumnOptions = function (isEditMode) {
            return {
                showCheckbox: !isEditMode,
                showSearch: true,
                columns: getColumnsDef(),
                defaultSortField: 'DisplayName',
                multiSelect: false
            };
        };
        //endregion

        //region CUSTOM FILTER
        multiSiteProtectedVcdVappService.getCustomFilterDef = function () {
            return multiSitesCommonProtectedService.getCustomFilterDef();
        };

        multiSiteProtectedVcdVappService.getGridDataAfterFilterData = function (selected) {
            return multiSitesCommonProtectedService.getGridDataAfterFilterData(selected, allPotentialsVcdVapp, 'Vapp');
        };

        multiSiteProtectedVcdVappService.getGridSelectedFromFilterData = function (selectedVcdVapp, onGridVms) {
            return multiSitesCommonProtectedService.getGridSelectedFromFilterData(selectedVcdVapp, onGridVms);
        };
        //endregion

        multiSiteProtectedVcdVappService._private = {
            getColumnsDef: getColumnsDef
        };

    });
