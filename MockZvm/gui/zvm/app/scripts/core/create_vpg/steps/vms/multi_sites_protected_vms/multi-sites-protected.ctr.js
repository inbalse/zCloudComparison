'use strict';

angular.module('zvmApp.core')
    .controller('multiSiteProtectedVmsController', function ($scope, $timeout, $translate, $compile, multiSiteProtectedVmsFactory,
                                                             multiSiteProtectedVmsService, potentialsVms, selectedVms, selectedVmsCons) {

        //================================== INITIAL VARIABLES ==================================================//
        var protectedVms = this;
        protectedVms.gridObj = {};
        protectedVms.gridFilterOptions = multiSiteProtectedVmsService.getCustomFilterDef();
        var defaultFilter = protectedVms.gridFilterOptions[2];

        //default filter display
        protectedVms.customFilter = {
            selected: defaultFilter
        };

        var gridDataAfterDefaultFiltering = multiSiteProtectedVmsService.getGridDataAfterFilterData(defaultFilter);

        protectedVms.data = {
            allPotentialVms: gridDataAfterDefaultFiltering,
            allCheckedPotentialVms: multiSiteProtectedVmsService.getGridSelectedFromFilterData(selectedVms, gridDataAfterDefaultFiltering),
            allPotentialColumnOptions: multiSiteProtectedVmsService.getColumnOptions()
        };

        protectedVms.filterOptionChange = function (selected) {
            protectedVms.data.allPotentialVms = multiSiteProtectedVmsService.getGridDataAfterFilterData(selected);
        };

        protectedVms.handleCancelClicked = function () {
            multiSiteProtectedVmsFactory.close();
        };

        protectedVms.handleSaveClicked = function () {
            multiSiteProtectedVmsFactory.save(protectedVms.data.allCheckedPotentialVms);
        };

        protectedVms.cellMouseEnter = function (event, row, cell, grid) {
            //check if clicked on shared icon (one to many)
            if (cell === grid.getColumnIndex(selectedVmsCons.MULTI_SITE_VC_COLUMN_FIELD)) {
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

        protectedVms.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: protectedVms.handleCancelClicked,
                disabled: false
            },
            {label: $translate.instant('MODAL.OK'), handler: protectedVms.handleSaveClicked, disabled: _.isEmpty(protectedVms.data.allCheckedPotentialVms)}
        ];

        protectedVms.gridSelectionChange = function () {
            protectedVms.buttons[1].disabled = _.isEmpty(protectedVms.data.allCheckedPotentialVms);

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
    });
