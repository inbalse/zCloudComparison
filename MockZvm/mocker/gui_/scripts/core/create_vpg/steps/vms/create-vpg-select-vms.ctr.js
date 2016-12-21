'use strict';

angular.module('zvmApp.core')
    .controller('createVPGSelectVMsController', function ($scope, $translate, enums, createSelectVmsService, vmsService, zertoLoggerServiceFactory,
                                                          vpgService, selectedVmsCons, $compile, multiSiteProtectedVmsFactory, multiSiteProtectedVcdVappFactory) {
        //===========================================================================
        // The variables
        //===========================================================================
        $scope.forms = {};
        $scope.gridObj = {};
        $scope.vcdVMsSize = $scope.vcVMsSize = 0;
        $scope.checkedSelectedVms = [];
        $scope.checkedPotentialVms = [];
        $scope.checkedPotentialVcdVapp = [];
        $scope.selectedVcdVappsVMsGrid = {};
        $scope.isVappDropdownEnabled = vpgService.isVappDropdownEnabledFunc();

        //selected item must stay straight on $scope for grid wizard validation
        $scope.selectedVms = vmsService.getSelectedVms();
        $scope.vcVMsSize = createSelectVmsService.countTotalSize($scope.selectedVms);

        //puts all data that used in HTML views
        $scope.data = {
            potentialVms: createSelectVmsService.getUnprotectedPotentialsVms(),
            protectedVmsCount: createSelectVmsService.getProtectedPotentialsVmsCount(),
            selectedVcdVappVMs: vmsService.getSelectedVms(),
            sourceSiteType: vpgService.getSourceSiteType().sourceType,
            selectedVCDVapp: vmsService.getSelectedVcdVapp(),
            localVCDVapps: createSelectVmsService.getUnprotectedPotentialsVcdVapp(),
            isReverse: vpgService.isReverse(),
            oneToManyState: createSelectVmsService.getOneToManyState(),
            isEditMode : vpgService.isInEditMode()
        };
        //===========================================================================
        // Initial view state
        //===========================================================================
        $scope.vcType = createSelectVmsService.getVcType();
        $scope.vcdVappType = createSelectVmsService.getVcdvAppType();
        $scope.isGridInVcdMode = createSelectVmsService.isGridInVcdMode();
        $scope.isShowVcTitle = createSelectVmsService.isShowVcTitle();
        $scope.isShowVcdTitle = createSelectVmsService.isShowVcdTitle();
        $scope.partialViews = createSelectVmsService.getPartialViewsDef();

        //set arrow state in vc mode disabled/enabled or visible/hide
        var gridSelectionChange = function () {
            $scope.isHasPotentialChecked = !_.isEmpty($scope.checkedPotentialVms);
            $scope.isHasSelectedChecked = !_.isEmpty($scope.checkedSelectedVms);
        };

        var multiSitesExpandDataChange = function () {
            var sourceSiteType = vpgService.getSourceSiteType().sourceType;
            $scope.advancedTooltipInfo = createSelectVmsService.getTooltipInfo(sourceSiteType);
            $scope.isVcdSiteType = sourceSiteType === enums.VpgEntityType.VCDvApp;
            $scope.advancedLinkName = $scope.isVcdSiteType ? $translate.instant('CREATE_VPG_SELECT_VMS.SELECT_VAPP') : $translate.instant('CREATE_VPG_SELECT_VMS.SELECT_VMS');
        };

        var setIsSourceVcd = function () {
            var isSourceVcd = $scope.data.sourceSiteType === enums.VpgEntityType.VCDvApp;
            createSelectVmsService.setIsSourceVcd(isSourceVcd);
        };

        setIsSourceVcd();
        multiSitesExpandDataChange();
        //===========================================================================
        // The potentials grid
        //===========================================================================
        $scope.data.potentialVcdVappGridId = 'potentialVcdVappGrid' + $scope.data.isEditMode;

        $scope.potentialColumnOptions = {
            showCheckbox: true,
            showSearch: true,
            columns: createSelectVmsService.getPotentialColumnsDef(),
            defaultSortField: 'DisplayName'
        };

        $scope.selectedGridRowClick = function (event, row, cell, grid) {
            if (cell === grid.getColumnIndex(selectedVmsCons.MULTI_SITE_VC_COLUMN_FIELD)) {
                event.preventDefault();
                event.stopPropagation();
                $compile($(event.target).closest('div'))($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        };
        //===========================================================================
        // The selected grid
        //===========================================================================
        $scope.selectedColumnOptions = {
            showCheckbox: !vpgService.isReverse(),
            showSearch: false,
            columns: createSelectVmsService.getSelectedColumnsDef()
        };
        //===========================================================================
        // vCD vApps grid
        //===========================================================================
        $scope.potentialVcdVappColumnOptions = {
            showSearch: true,
            multiSelect: false,
            showCheckbox: !$scope.data.isEditMode,
            columns: createSelectVmsService.getPotentialsVcdVappColumnsDef(),
            defaultSortField: 'Vapp'
        };

        $scope.vcdVappVmsColumnOptions = {
            showCheckbox: false,
            showSearch: true,
            columns: createSelectVmsService.getVcdVappColumnsDef()
        };
        //===========================================================================
        // vCD vapp user interface
        //===========================================================================
        var clearDefaults = function () {
            //clear local variables
            $scope.vcdVMsSize = $scope.vcVMsSize = 0;
            $scope.checkedSelectedVms.length = 0;
            $scope.checkedPotentialVms.length = 0;
            $scope.checkedPotentialVcdVapp.length = 0;
            gridSelectionChange();
            vpgService.setInitSingleSiteType(false);
            createSelectVmsService.clearDefaultsBeforeSelection();
            $scope.selectedVms = [];
            $scope.data.potentialVms = createSelectVmsService.getUnprotectedPotentialsVms();
            vmsService.setSelectedVcdVapp(null);
            vmsService.setSelectedVms([]);
            vpgService.setSelectedZorg(null);
            $scope.data.selectedVcdVappVMs = [];
            $scope.data.selectedVCDVapp = null;

            $scope.$emit('wizard:FormValidationChanged');
            $scope.$broadcast('wizard:hideErrors');
        };
        //===========================================================================
        // MULTI SITE PROTECTED
        //===========================================================================
        $scope.multiTargetExpandCollapseClicked = function () {
            $scope.isExpand = !$scope.isExpand;
        };

        $scope.handleAllProtectVmsVappLink = function () {
            var sourceSiteType = vpgService.getSourceSiteType().sourceType;

            if (sourceSiteType === enums.VpgEntityType.VCDvApp) {
                multiSiteProtectedVcdVappFactory.openWindow($scope.checkedPotentialVcdVapp, $scope.data.isEditMode).then(function (checkedPotentialVcdVapp) {
                    $scope.checkedPotentialVcdVapp = checkedPotentialVcdVapp;
                    $scope.gridObj.potentialsVcdVappGrid.updateSelectedItems(checkedPotentialVcdVapp);
                    createSelectVmsService.selectVcdApp(checkedPotentialVcdVapp[0]).then(setSelectedVcdVapp);
                });
            } else {
                multiSiteProtectedVmsFactory.openWindow($scope.checkedPotentialVms).then(function (checkedPotentialVms) {
                    $scope.checkedPotentialVms = checkedPotentialVms;
                    handelArrowsClickToMoveVms(true);
                });
            }
        };
        //===========================================================================
        // VCD EDIT MODE
        //===========================================================================

        var setSelectedVcdVapp = function (vcdVappData) {
            $scope.data.selectedVcdVappVMs = vcdVappData.vms;
            $scope.vcdVMsSize = vcdVappData.vmsSize;
            vmsService.setSelectedVms(vcdVappData.vms);

            $scope.$emit('wizard:FormValidationChanged');
            $scope.$broadcast('wizard:hideErrors');
        };

        //initial selected Vcd Vapp if exist
        if (!_.isEmpty($scope.data.selectedVCDVapp)) {
            $scope.checkedPotentialVcdVapp[0] = $scope.data.selectedVCDVapp;
            // createSelectVmsService.selectVcdApp($scope.data.selectedVCDVapp).then(setSelectedVcdVapp);

            if ($scope.data.isEditMode) {
                //show just selected vApp in edit mode
                $scope.data.localVCDVapps = [$scope.data.selectedVCDVapp];
            }
        }

        // ===========================================================================
        //
        //===========================================================================

        //this function relevant just in vcd mode (not in vSphere)
        $scope.gridVcdVappSelectionChangeEvent = function () {
            createSelectVmsService.toggleVcdSelected(true);
            $scope.data.selectedVCDVapp = $scope.checkedPotentialVcdVapp[0];
            //if selected vcd vapp is unchecked clear vms
            if (_.isNullOrUndefined($scope.data.selectedVCDVapp)) {
                setSelectedVcdVapp({vms: [], vmsSize: 0});
                //must to run $digest sickle manually for upgrade all scope nodes
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            } else {
                createSelectVmsService.selectVcdApp($scope.checkedPotentialVcdVapp[0]).then(setSelectedVcdVapp);
            }
        };

        $scope.handleSourceTypeChange = function () {
            if (_.isEqual($scope.data.sourceSiteType, vpgService.getSourceSiteType().sourceType)) {
                return;
            }
            //clear fields if those were initiated and clears selected rows on the grid between switches source type
            clearDefaults();
            setIsSourceVcd();
            vpgService.setSourceSiteType($scope.data.sourceSiteType);
            $scope.partialViews = createSelectVmsService.getPartialViewsDef();
            multiSitesExpandDataChange($scope.data.sourceSiteType);
        };

        var handelArrowsClickToMoveVms = function (isRight) {
            //function that moves vms between grids
            createSelectVmsService.doMoveBetweenGrids(isRight, $scope.checkedPotentialVms, $scope.checkedSelectedVms);

            createSelectVmsService.applySelectedVMsChange().then(function () {
                if (isRight) {
                    $scope.checkedSelectedVms = $scope.checkedSelectedVms.concat(angular.copy($scope.checkedPotentialVms));
                    $scope.checkedPotentialVms.length = 0;
                } else {
                    $scope.checkedPotentialVms = $scope.checkedPotentialVms.concat(angular.copy($scope.checkedSelectedVms));
                    $scope.checkedPotentialVms = createSelectVmsService.filterPotentialsVmsByProtection($scope.checkedPotentialVms, false);
                    $scope.checkedSelectedVms.length = 0;
                }

                $scope.selectedVms = vmsService.getSelectedVms();
                $scope.updateGridDataAndSelection();
                gridSelectionChange();
                $scope.$emit('wizard:FormValidationChanged');
                $scope.$broadcast('wizard:hideErrors');
                $scope.bootorderEnable = createSelectVmsService._initBootOrderButton();
                $scope.vcVMsSize = createSelectVmsService.countTotalSize(vmsService.getSelectedVms());
                $scope.data.protectedVmsCount = createSelectVmsService.getProtectedPotentialsVmsCount();
            });
        };

        $scope.gridSelectionChangeEvent = function () {
            gridSelectionChange();
            //must to run $digest sickle manually for upgrade all scope nodes
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.handleRemoveSelectedVmsClick = function () {
            if ($scope.checkedSelectedVms.length) {
                handelArrowsClickToMoveVms(false);
            }
        };

        $scope.handleRightButtonClick = function () {
            if ($scope.checkedPotentialVms.length) {
                handelArrowsClickToMoveVms(true);
            }
        };

        $scope.updateGridDataAndSelection = function () {

            var potentialVms = createSelectVmsService.getUnprotectedPotentialsVms(),
                selectedVms = vmsService.getSelectedVms();

            //manual update grid data
            $scope.gridObj.potentialsGrid.updateData(potentialVms);
            $scope.gridObj.selectedVMsGrid.updateData(selectedVms);

            //sets grid model data
            $scope.data.potentialVms = potentialVms;
            $scope.selectedVms = selectedVms;

            //manual check item on grid
            $scope.gridObj.potentialsGrid.updateSelectedItems($scope.checkedPotentialVms);
            $scope.gridObj.selectedVMsGrid.updateSelectedItems($scope.checkedSelectedVms);
        };

        $scope.handleBootOrderClicked = function () {
            createSelectVmsService.openBootOrderWindow().then(function (selectedVms) {
                $scope.selectedVms = selectedVms;
            }, function (error) {
                zertoLoggerServiceFactory.logError('openBootOrderWindow', null, error);
            });
        };

        $scope.bootorderEnable = createSelectVmsService._initBootOrderButton();
        gridSelectionChange();
        vpgService.setDefaultBootOrder();

        //set instance to scope fot UT
        $scope.gridSelectionChange = gridSelectionChange;
        $scope.clearDefaults = clearDefaults;
        $scope.setSelectedVcdVapp = setSelectedVcdVapp;
        $scope.handelArrowsClickToMoveVms = handelArrowsClickToMoveVms;
    });
