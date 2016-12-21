'use strict';

angular.module('zvmApp.core')
    .controller('multiSiteProtectedVcdVappController', function ($scope, $timeout, $translate, $compile, multiSiteProtectedVcdVappFactory, isEditMode,
                                                                 multiSiteProtectedVcdVappService, potentialsVcdVapp, selectedVcdVapp, selectedVmsCons) {

        //================================== INITIAL VARIABLES ==================================================//
        var protectedVcdVapp = this;
        protectedVcdVapp.gridObj = {};
        protectedVcdVapp.gridFilterOptions = multiSiteProtectedVcdVappService.getCustomFilterDef();
        var defaultFilter = protectedVcdVapp.gridFilterOptions[2];

        //default filter display
        protectedVcdVapp.customFilter = {
            selected: defaultFilter
        };

        protectedVcdVapp.allPotentialVcdVappGrid = 'allPotentialVcdVappGrid' + isEditMode;

        var gridDataAfterDefaultFiltering = multiSiteProtectedVcdVappService.getGridDataAfterFilterData(defaultFilter);

        protectedVcdVapp.data = {
            allPotentialVcdVapp: gridDataAfterDefaultFiltering,
            allCheckedPotentialVcdVapp: multiSiteProtectedVcdVappService.getGridSelectedFromFilterData(selectedVcdVapp, gridDataAfterDefaultFiltering),
            allPotentialColumnOptionsVcdVapp: multiSiteProtectedVcdVappService.getColumnOptions(isEditMode)
        };

        protectedVcdVapp.filterOptionChange = function (selected) {
            protectedVcdVapp.data.allPotentialVcdVapp = multiSiteProtectedVcdVappService.getGridDataAfterFilterData(selected);
        };

        protectedVcdVapp.handleCancelClicked = function () {
            multiSiteProtectedVcdVappFactory.close();
        };

        protectedVcdVapp.handleSaveClicked = function () {
            multiSiteProtectedVcdVappFactory.save(protectedVcdVapp.data.allCheckedPotentialVcdVapp);
        };

        protectedVcdVapp.cellMouseEnter = function (event, row, cell, grid) {
            //check if clicked on shared icon (one to many)
            if (cell === grid.getColumnIndex(selectedVmsCons.MULTI_SITE_VCD_VAPP_COLUMN_FIELD)) {
                //cancel all native events
                event.preventDefault();
                event.stopPropagation();
                //generate angular compile manual to load multiSitesTooltip directive
                $compile($(event.target).closest('div'))($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        };

        protectedVcdVapp.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: protectedVcdVapp.handleCancelClicked,
                disabled: false
            },
            {label: $translate.instant('MODAL.OK'), handler: protectedVcdVapp.handleSaveClicked, disabled: _.isEmpty(protectedVcdVapp.data.allCheckedPotentialVcdVapp)}
        ];

        protectedVcdVapp.gridSelectionChange = function () {
            protectedVcdVapp.buttons[1].disabled = _.isEmpty(protectedVcdVapp.data.allCheckedPotentialVcdVapp);

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
    });
