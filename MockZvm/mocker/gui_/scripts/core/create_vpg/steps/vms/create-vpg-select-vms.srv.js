'use strict';

angular.module('zvmApp.core')
    .service('createSelectVmsService', function ($filter, $q, createVPGModel, vmsService, vpgService, $translate,
                                                 zSlickGridFilterTypes, enums, bootOrderFactory) {
        //TODO: return column when BE will support one to many in edit mode
        //, selectedVmsCons

        var createSelectVmsService = this,
            initialSitesInfo,
            isEdit,
            isReverse;

        //region ------------------- HELPER FUNCTIONS --------------------------//
        var getDataFromModel = function () {
            initialSitesInfo = vpgService.getInitialSitesInfo();
            isEdit = vpgService.isInEditMode();
            isReverse = vpgService.isReverse();
        };

        //get initial data
        getDataFromModel();

        var getRemovedIds = function (collection) {
            return _.pluck(_.pluck(collection, 'Id'), 'InternalVmName');
        };

        var movedCheckedVms = function (mainCollection, selectedCollection, ids) {
            return mainCollection.concat(_.remove(selectedCollection, function (vm) {
                return _.contains(ids, vm.Id.InternalVmName);
            }));
        };

        createSelectVmsService.countTotalSize = function (vms) {
            var result = 0;
            _.forEach(vms, function (vm) {
                result += $filter('mbToStringReverseConvertorFilter')(vm.SizeInMb);
            });

            return result;
        };

        createSelectVmsService._initBootOrderButton = function () {
            var selectedVms = vmsService.getSelectedVms();
            if (!selectedVms) {
                return false;
            } else if (selectedVms.length > 0) {
                createSelectVmsService.countTotalSize(selectedVms);
                return true;
            }
        };

        createSelectVmsService.getVcType = function () {
            return enums.VpgEntityType.VCVpg;
        };

        createSelectVmsService.getVcdvAppType = function () {
            return enums.VpgEntityType.VCDvApp;
        };

        createSelectVmsService.isGridInVcdMode = function () {
            return initialSitesInfo.LocalVCDVapps && initialSitesInfo.LocalVCDVapps.length && !isEdit && !isReverse;
        };

        createSelectVmsService.isShowVcTitle = function () {
            var sourceSiteType = vpgService.getSourceSiteType();
            return (sourceSiteType.sourceType === enums.VpgEntityType.VCVpg || sourceSiteType.sourceType === enums.VpgEntityType.HyperV) && !isReverse;
        };

        createSelectVmsService.isShowVcdTitle = function () {
            var sourceSiteType = vpgService.getSourceSiteType();
            return sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp && !isReverse;
        };

        createSelectVmsService.getOneToManyState = function () {
            return vpgService.getOneToManyState();
        };

        //TODO: add unit test
        createSelectVmsService.getTooltipInfo = function (sourceSiteType) {
            if (createSelectVmsService.getOneToManyState().isAllowed) {
                return sourceSiteType === enums.VpgEntityType.VCDvApp ? $translate.instant('CREATE_VPG_SELECT_VMS.ALL_PROTECTED_VCD_TOOLTIP_INFO') : $translate.instant('CREATE_VPG_SELECT_VMS.ALL_PROTECTED_TOOLTIP_INFO');
            }
            return createSelectVmsService.getOneToManyState().reason;
        };

        //endregion ----------------------------------------------------------------//

        //region --------------------- COLUMNS DEF -----------------------------//
        createSelectVmsService.getPotentialColumnsDef = function () {
            return [
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VM_NAME'),
                    field: 'DisplayName',
                    filter: zSlickGridFilterTypes.WILDCARD
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.PROVISIONED_SIZE'),
                    value: 0,
                    field: 'SizeInMbFiltered',
                    formatter: $filter('objectFormatter'),
                    width: 90
                }
            ];
        };

        createSelectVmsService.getSelectedColumnsDef = function () {
            return [
                {name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VM_NAME'), field: 'DisplayName'},
                //TODO: return column when BE will support one to many in edit mode
                // {
                //     name: '',
                //     field: selectedVmsCons.MULTI_SITE_VC_COLUMN_FIELD,
                //     maxWidth: 40,
                //     resizable: false,
                //     formatter: $filter('multiSitesSharedIconFormatter'),
                //     headerCssClass: 'multi-sites-header-icon',
                //     toolTip: 'Protected in other VPGs'
                // },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.PROVISIONED_SIZE'),
                    field: 'SizeInMbFiltered',
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    formatter: $filter('objectFormatter')
                },
                {name: 'Group', field: 'BootOrderGroup', filter: zSlickGridFilterTypes.WILDCARD}
            ];
        };

        createSelectVmsService.getPotentialsVcdVappColumnsDef = function () {
            return [
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VAPP_NAME'),
                    field: 'Vapp',
                    formatter: $filter('vcdVappNameFormatter')
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.ORG_VDC'),
                    field: 'OwningVirtualDataCenterName',
                    width: 90
                }
            ];
        };

        createSelectVmsService.getVcdVappColumnsDef = function () {
            return [
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VM_NAME'),
                    field: 'DisplayName',
                    filter: zSlickGridFilterTypes.WILDCARD
                },
                {
                    name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.SIZE'),
                    field: 'SizeInMbFiltered',
                    filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
                    formatter: $filter('objectFormatter')
                }
            ];
        };
        //endregion ---------------------------------------------------------------//

        //region --------------------- PARTIALS DEF ----------------------------//
        createSelectVmsService.getPartialViewsDef = function () {
            var sourceSiteType = vpgService.getSourceSiteType();
            //when target source type changed get updated data
            getDataFromModel();
            return [
                {
                    path: 'scripts/core/create_vpg/steps/vms/vms_partial_views/_choose_type_partial.html',
                    isIncluded: initialSitesInfo.LocalVCDVapps && initialSitesInfo.LocalVCDVapps.length && !isEdit && !isReverse
                },
                {
                    path: 'scripts/core/create_vpg/steps/vms/vms_partial_views/_vcd_partial.html',
                    isIncluded: sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp
                },
                {
                    path: 'scripts/core/create_vpg/steps/vms/vms_partial_views/_vc_partial.html',
                    isIncluded: sourceSiteType.sourceType === enums.VpgEntityType.VCVpg || sourceSiteType.sourceType === enums.VpgEntityType.HyperV
                },
                {
                    path: 'scripts/core/create_vpg/steps/vms/vms_partial_views/_expand_multi_sites_partial.html'
                }
            ];
        };
        //endregion ------------------------------------------------------------//

        //region ------------------ ARROWS CLICK FUNCTION ----------------------//
        createSelectVmsService.doMoveBetweenGrids = function (isRight, checkedPotentialVms, checkedSelectedVms) {
            var toRemove_ids;

            if (isRight) {
                //this is first before vm manipulations add vm to group order if defaultVpgSettings is already exist
                //can't be applied in applySelectedVMsChange function because the vm has only id there
                vmsService.addNewVmToBootorder(checkedPotentialVms);
                toRemove_ids = getRemovedIds(checkedPotentialVms);
            } else {
                toRemove_ids = getRemovedIds(checkedSelectedVms);
            }

            var selectedVms = vmsService.getSelectedVms();
            var potentialVms = vmsService.getPotentialVms();

            if (isRight) {
                selectedVms = movedCheckedVms(selectedVms, potentialVms, toRemove_ids);

                _.forEach(selectedVms, function (vm) {
                    _.set(vm, 'BootOrderGroup', 'Default');
                });

                vmsService.setSelectedVms(selectedVms);
            } else {
                potentialVms = movedCheckedVms(potentialVms, selectedVms, toRemove_ids);
                vmsService.setPotentialVms(potentialVms);
                vmsService.removeVmFromBootorder(toRemove_ids);
            }
        };
        //endregion ---------------------------------------------------------//

        //region ----------------------- BOOT ORDER ----------------------------//
        createSelectVmsService.openBootOrderWindow = function () {
            var vpgSettings = vpgService.getVpgSettings(),
                selectedVms = vmsService.getSelectedVms(),
                bootOrderGroups = vmsService.getBootOrderGroups(),
                defer = $q.defer();

            bootOrderFactory.openWindow({Groups: bootOrderGroups}, vpgSettings.Entities, selectedVms)
                .then(function (result) {
                    vmsService.setBootOrderGroups(result.Groups);
                    //Update each vm with his bootOrder
                    createSelectVmsService.appendBootOrderGroupToModel(selectedVms);
                    defer.resolve(selectedVms);
                }, function (error) {
                    defer.reject(error);
                });

            return defer.promise;
        };
        //endregion ---------------------------------------------------------//

        //function return just unprotected VCD Vapp for create vpg step (one to many feature)
        var filterUnprotectedPotentialsVcdVapp = function (vcdVappCollection) {
            return _.filter(vcdVappCollection, function (vapp) {

                if (isEdit && _.isNullOrUndefined(vapp.Vapp.isProtected)) {
                    vapp.Vapp.isProtected = isEdit;
                }

                return !vapp.Vapp.isProtected;
            });
        };

        //function return protected or unprotected by flag vms for create vpg step (one to many feature)
        createSelectVmsService.filterPotentialsVmsByProtection = function (vmsCollection, isReturnProtected) {
            return _.filter(vmsCollection, function (vm) {

                if (isEdit && _.isNullOrUndefined(vm.ProtectedVmVpgsInfo)) {
                    vm.ProtectedVmVpgsInfo = {isProtected: isEdit};
                }

                return isReturnProtected ? vm.ProtectedVmVpgsInfo.isProtected : !vm.ProtectedVmVpgsInfo.isProtected;
            });
        };

        createSelectVmsService.getProtectedPotentialsVmsCount = function () {
            var protectedVms = createSelectVmsService.filterPotentialsVmsByProtection(vmsService.getPotentialVms(), true);
            return protectedVms.length;
        };

        createSelectVmsService.getUnprotectedPotentialsVms = function () {
            return createSelectVmsService.filterPotentialsVmsByProtection(vmsService.getPotentialVms(), false);
        };

        createSelectVmsService.getUnprotectedPotentialsVcdVapp = function () {
            var siteInfo = vpgService.getInitialSitesInfo();
            return filterUnprotectedPotentialsVcdVapp(siteInfo.LocalVCDVapps);
        };

        createSelectVmsService.applySelectedVMsChange = function () {
            return vmsService.applySelectedVMsChange();
        };

        createSelectVmsService.toggleVcdSelected = function (selected) {
            vmsService.toggleVcdSelected(selected);
        };

        createSelectVmsService.selectVcdApp = function (vcdApp) {
            return vmsService.addVcdVappAndSelectVms(vcdApp, true);
        };

        createSelectVmsService.setIsSourceVcd = function (isSourceVcd) {
            vpgService.setIsSourceVcd(isSourceVcd);
        };

        createSelectVmsService.clearDefaultsBeforeSelection = function () {
            vmsService.clearTargets();
            vmsService.clearVms();
            vpgService.setIsSourceVcd(false);
            vpgService.clearVpgObject();
        };

        createSelectVmsService.appendBootOrderGroupToModel = function (selectedVms) {
            createVPGModel.appendBootOrderGroup(selectedVms);
        };
    });
