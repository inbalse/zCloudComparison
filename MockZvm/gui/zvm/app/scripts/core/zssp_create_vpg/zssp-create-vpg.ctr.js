'use strict';

angular.module('zvmApp.core')
    .controller('zsspCreateVpgController', function ($scope, $translate, zsspCreateVpgFactory, zertoServiceFactory,
                                                     zsspCreateVPGModel, enums, zAlertFactory, vos, createVPGFactory,
                                                     zSlickGridFilterTypes, $filter) {
        //===============================================================
        // init
        //===============================================================
        $scope.showVcGrid = false;
        $scope.loading = true;
        $scope.forms = {};
        $scope.data = zsspCreateVPGModel.data;
        $scope.enums = enums;
        $scope.selectedItems = [];
        $scope.selectedVCDVapp = [];


        var columnDefs = [
            {name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VM_NAME'), field: 'DisplayName', filter: zSlickGridFilterTypes.WILDCARD},
            {name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.PROVISIONED_SIZE'), field: 'SizeInMbFiltered',formatter: $filter('objectFormatter'), filter: zSlickGridFilterTypes.MB_OR_GB_RANGE}
        ];

        var vcdVappColumnDefs = [
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

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true
        };

        $scope.potentialVcdVappColumnOptions = {
            showSearch: true,
            multiSelect: false,
            showCheckbox: !$scope.data.isEdit,
            columns: vcdVappColumnDefs,
            defaultSortField: 'Vapp'
        };

        //region user interactions
        $scope.handleCancel = function () {
            zsspCreateVpgFactory.close();
        };

        $scope.handleSave = function () {
            var vcdVapp = null;
            var vcVms = null;
            var vdc = null;
            var resourcePool = null;
            var dataStore = null;
            if ($scope.validateForm()) {
                if ($scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp) {
                    vcdVapp = $scope.data.selectedVCDVapp.Vapp.VcdVappIdentifier;

                }
                if ($scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCVpg) {
                    vcVms = _.pluck($scope.selectedItems, 'Id');
                }
                //vc target
                if($scope.targetType === enums.VpgEntityType.VCVpg){
                    resourcePool = $scope.data.targetResourcePool.Id;
                    // Bug 20580 - ZSSP : Almost Full DS not grayed out in Recovery site
                    dataStore = $scope.data.targetDs.Datastore.Id;
                }else{  //vcd target
                    vdc = $scope.data.targetVirtualDatacenter.Id;
                }

                zertoServiceFactory.CloudPortalCreateProtectionGroup(
                    $scope.data.name,
                    vcdVapp,
                    vcVms,
                    $scope.data.targetSite.SiteId,
                    vdc,
                    resourcePool,
                    dataStore,
                    $scope.data.serviceProfile.ServiceProfileIdentifier
                ).then(function () {
                        zsspCreateVpgFactory.close();
                    }, function (error) {
                        if (error) {zAlertFactory.fail(error.faultString);}
                    });
            }
        };

        $scope.openAdvanced = function () {
            var vcdVapp = null;
            var vcdVappIdentifier = null;
            var vcVms = null;
            var vdc = null;
            var resourcePool = null;
            var dataStore = null;
            if ($scope.validateForm()) {
                if ($scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp) {
                    vcdVapp = $scope.data.selectedVCDVapp.Vapp;
                    vcdVappIdentifier = $scope.data.selectedVCDVapp.Vapp.VcdVappIdentifier;
                }
                if ($scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCVpg) {
                    vcVms = _.pluck($scope.selectedItems, 'Id');
                }
                //vc target
                if($scope.targetType === enums.VpgEntityType.VCVpg){
                    resourcePool = $scope.data.targetResourcePool.Id;
                    // Bug 20580 - ZSSP : Almost Full DS not grayed out in Recovery site
                    dataStore = $scope.data.targetDs.Datastore.Id;
                }else if($scope.targetType === enums.VpgEntityType.VCDvApp){  //vcd target
                    vdc = $scope.data.targetVirtualDatacenter.Id;
                }

                zertoServiceFactory.CloudPortalGetAdvancedCreateVpgScreen(
                    vcdVappIdentifier,
                    vcVms,
                    $scope.data.targetSite.SiteId,
                    vdc,
                    resourcePool,
                    dataStore).then(function (result) {
                        //an ugly hack because the backend doesn't supply here in the api the possibility to pass the service profile
                        result.Config.Configuration.ServiceProfile = new vos.SelectedServiceProfileVisualObject();
                        result.Config.Configuration.ServiceProfile.Name = $scope.data.serviceProfile.DisplayName;
                        result.Config.Configuration.ServiceProfile._overrideOnlyProccess = true;
                        result.Config.Configuration.ServiceProfile.SelectedIdentifier = $scope.data.serviceProfile.ServiceProfileIdentifier;
                        createVPGFactory.openCreateNewVpgPortal(result, $scope.data.name, vcdVapp || false).then(function(){
                            zsspCreateVpgFactory.close();
                        });
                    }
                );
            }
        };

        $scope.handleVcdVappItemChange = function () {
            $scope.data.selectedVCDVapp = $scope.selectedVCDVapp[0];
        };

        // Bug 22285 - ZSSP, Create VPG: 'Switch to wizard customize' should be disabled when service profile is system service profile
        $scope.setAdvancedButton = function () {
            // if form is valid and service profile is 'custom' - enable advanced configuration, otherwise - disable
            $scope.advancedButtonDisabled =
                !($scope.forms.zsspForm.$valid &&
                $scope.data.serviceProfile.ServiceProfileIdentifier &&
                $scope.data.serviceProfile.ServiceProfileIdentifier.InternalId === '11111111-1111-1111-1111-111111111111');
        };

        //endregion

        //region helpers
        $scope.validateForm = function () {
            if ($scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp) {
                if (_.isNullOrUndefined($scope.data.selectedVCDVapp)) {
                    zAlertFactory.fail('Error', $translate.instant('ZSSP_VPG.VCDVAPP_ERROR'));
                    return false;
                }
            }
            //vc vms
            if ($scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCVpg) {
                if ($scope.selectedItems.length === 0) {
                    zAlertFactory.fail('Error', $translate.instant('ZSSP_VPG.VC_VM_ERROR'));
                    return false;
                }
            }

            return true;
        };
        //endregion

        //region watchers
        $scope.$watch('data.targetSite', function (value) {
            if (value) {
                zertoServiceFactory.GetPortalAdvancedRecoverySiteInfoForVpgCreation(value.SiteId).then(function (result) {

                    $scope.showDataStore = false;
                    $scope.showTargetOrgVDC = false;
                    $scope.showResourcePool = false;
                    if (value.IsVCDEnabled) {
                        $scope.targetType = enums.VpgEntityType.VCDvApp;
                        $scope.data.targetOrgVDCDropDownData = result.RecoverySiteVDCs;
                        $scope.showTargetOrgVDC = true;

                    } else if (value.VirtualizationProviderType === enums.VpgEntityType.VCVpg) {
                        $scope.targetType = enums.VpgEntityType.VCVpg;
                        $scope.data.targetDatastoreData = result.RecoverySiteDatastores;
                        $scope.showDataStore = true;
                        $scope.data.targetResourcePoolDropDownData = result.RecoverySiteResourcePools;
                        $scope.showResourcePool = true;
                    }else if(value.VirtualizationProviderType === enums.VpgEntityType.Aws){
                        $scope.targetType = enums.VpgEntityType.Aws;
                    }else {
                        $scope.targetType = enums.VpgEntityType.HyperV;
                    }

                    $scope.data.serviceProfileDropDownData = result.ServiceProfiles;
                    $scope.setDefaultServiceProfile(result);

                    $scope.setSaveButton();
                });
            }
        });

        $scope.setDefaultServiceProfile = function(){
            _.forEach($scope.data.serviceProfileDropDownData, function(sp){
                if(sp.IsDefault){
                    $scope.data.serviceProfile = sp;
                }
            });
        };

        $scope.setSaveButton = function(){

            if(($scope.targetType === enums.VpgEntityType.VCDvApp && $scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCVpg) ||
                ($scope.targetType === enums.VpgEntityType.VCVpg && $scope.data.sourceSiteType.sourceType === enums.VpgEntityType.VCDvApp) ||
                ($scope.targetType === enums.VpgEntityType.HyperV) ||
                ($scope.targetType === enums.VpgEntityType.Aws)){
                $scope.saveButton.disabled = true;
            }
        };

        $scope.$watch('forms.zsspForm.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.saveButton.disabled = !value;
                $scope.setSaveButton();
                $scope.setAdvancedButton();
            }
        });
        //endregion

        //===============================================================
        // init
        //===============================================================
        $scope.saveButton = {label: $translate.instant('MODAL.SAVE'), handler: $scope.handleSave, disabled: false};
        $scope.buttons = [
            {label: $translate.instant('MODAL.CANCEL'), class: 'btn btn-link', handler: $scope.handleCancel, disabled: false},
            $scope.saveButton
        ];
        $scope.loading = false;

        $scope.gridData = zsspCreateVPGModel.processVms($scope.data.initialSitesInfo.LocalVCVms);
        $scope.showVcGrid = true;

        //set the default target site
        if($scope.data.initialSitesInfo.TargetSites.length === 1){
            $scope.data.targetSite = $scope.data.initialSitesInfo.TargetSites[0];
        }

    });
