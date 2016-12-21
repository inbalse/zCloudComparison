'use strict';

angular.module('zvmApp.core')

    .controller('recoverySelectVPGController', function ($scope, $filter, $translate, recoveryWizardModel, zSlickGridFilterTypes, mbToStringConvertorFilter, enums, recoveryWizardFactory) {

        $scope.data = recoveryWizardModel.data;

        $scope.gridObject = {};
        $scope.gridObject.search = '';
        $scope.filterOptions = {filterText: 'Name:'};
        $scope.translations = $translate.instant(['RECOVERY_WIZARD.SELECTED_DETAILS', 'RECOVERY_WIZARD.VPGS', 'RECOVERY_WIZARD.VMS','RECOVERY_WIZARD.STORAGE']);
        $scope.recoverySelectTitle = recoveryWizardFactory.selectVpgsTitle;

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'Direction',
                text: $translate.instant('GROUP_BY_LIST.DIRECTION')
            },
            {
                id: 'TargetSiteName',
                text: $translate.instant('GROUP_BY_LIST.REMOTE_SITE')
            }
        ];

        $scope.viewByValues = [];


        $scope.sitesCount = 0;
        $scope.sitesText = 0;
        //todo: there should be target type some day for remote site enum style icon
        var columnDefs = [
            {name: ' ', hideFromEditColumns: true, field: 'AlertStatus', maxWidth: 40, formatter: $filter('enumToCssClassFormatter')('protection-group-alert-status'), headerCssClass: 'protection-group-alert-status-header'},
            {name: $translate.instant('VPG_LIST.NAME'), hideFromEditColumns: true, field: 'vpgName', filter: zSlickGridFilterTypes.WILDCARD},
            {name: $translate.instant('VPG_VM_LIST_COL.DIRECTION_COLUMN'),maxWidth:80, hideFromEditColumns: true, field: 'Direction', filter: zSlickGridFilterTypes.MULTI_SELECT, formatter: $filter('enumToCssClassGroupFormatter')('protection-group-state-visual')},
            {name: $translate.instant('VPG_VM_LIST_COL.PEER_SITE'), filter: zSlickGridFilterTypes.WILDCARD, field: 'PeerSiteTypeObj', formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('remote-site-icon')},
            {name: $translate.instant('VPG_VM_LIST_COL.PROTECTION_STATUS'), filter: zSlickGridFilterTypes.MULTI_SELECT, field: 'StateLabel', formatter: $filter('objectFormatter')},
            {name: $translate.instant('VPG_VM_LIST_COL.STATE'), filter: zSlickGridFilterTypes.MULTI_SELECT, field: 'vpgState', formatter: $filter('progressFormatter')}
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true
        };

        $scope.selectedItems = recoveryWizardModel.data.selectedVpgs;

        //===========================================================================
        // Search by
        //===========================================================================
        $scope.handleSearchChange = function () {
            $scope.filterOptions.filterText = 'Name:' + $scope.gridObject.search;
        };
        $scope.$watch('gridObject.search', $scope.handleSearchChange);

        $scope.gridData = recoveryWizardModel.data.vpgs;

        $scope.calculateSummary = function (selectedItems) {

            $scope.sumOfVpgs = selectedItems.length;
            var sizeOfVpgs = 0;
            var vmsCount = 0;
            var sitesArray = [];
            _.forEach(selectedItems, function (vpg) {
                sizeOfVpgs = sizeOfVpgs + vpg.ProvisionedStorageInMB;
                vmsCount = vmsCount + vpg.NumberOfVms;
                sitesArray.push(vpg.TargetSiteName);
            });

            $scope.selectedDetails = $scope.translations['RECOVERY_WIZARD.SELECTED_DETAILS'] + ' :  ' +
                $scope.translations['RECOVERY_WIZARD.VPGS'] + '  -  ' + selectedItems.length + ', ' +
                $scope.translations['RECOVERY_WIZARD.VMS'] + '  -  ' + vmsCount + ', ' +
                $scope.translations['RECOVERY_WIZARD.STORAGE'] + '  -  ' + mbToStringConvertorFilter(sizeOfVpgs) + '.';

            sitesArray = _.union(sitesArray);
            $scope.sitesCount = sitesArray.length;
            $scope.sitesText = sitesArray.join(',');
        };

        $scope.selectedItemsChange = function () {
            recoveryWizardModel.data.selectedVpgs = $scope.selectedItems;
            recoveryWizardModel.invalidateAllSteps();
            $scope.calculateSummary($scope.selectedItems);

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.calculateSummary($scope.selectedItems);
    });
