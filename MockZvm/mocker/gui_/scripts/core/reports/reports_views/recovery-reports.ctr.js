'use strict';

angular.module('zvmApp.core')
    .controller('recoveryReportsController', function ($scope, $compile, zertoServiceFactory, zSlickGridFilterTypes,
                                                       recoveryReportModel, $filter, zAlertFactory, $translate) {
        $scope.reportsForm = angular.element('#reports-form');
        $scope.reportsInputs = angular.element('#reports-inputs');

        $scope.reportsForm.html($compile('<recovery-reports-form></recovery-reports-form>')($scope));
        $scope.reportsInputs.html($compile('<recovery-reports-input></recovery-reports-input>')($scope));

        var columnDefs = [
            {name: 'VPG', field: 'ProtectionGroupDisplayName', filter: zSlickGridFilterTypes.WILDCARD},
            {
                name: 'Type',
                field: 'TypeObj',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('objectFormatter')
            },
            {name: 'Protected Site', field: 'ProtectedSiteName', filter: zSlickGridFilterTypes.WILDCARD},
            {
                name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.RECOVERY_SITE'),
                field: 'RecoverySiteName',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {name: 'Start Time', field: 'StartTime', filter: zSlickGridFilterTypes.DATE},
            {
                name: 'End Time',
                field: 'Endtime',
                filter: zSlickGridFilterTypes.DATE
            },
            {
                name: 'RTO',
                field: 'RTOMeasuredInSecObj',
                filter: zSlickGridFilterTypes.RANGE,
                formatter: $filter('objectFormatter')
            },
            {
                name: 'Status',
                field: 'StatusObj',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('textWithEnumTypeObjectToCssClassFormatter')('recovery-report-status')
            },
            {
                name: 'Initiated By',
                field: 'InitiatedBy',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {name: 'Notes', field: 'Summary', filter: zSlickGridFilterTypes.WILDCARD}
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showCheckbox: true,
            defaultSortField: 'ProtectionGroupDisplayName',
            showSearch: false
        };

        $scope.selectedItems = [];

        $scope.reportDateRange = {};
        $scope.reportDateRange.startDate = recoveryReportModel.defaultFilter.startDate;
        $scope.reportDateRange.endDate = recoveryReportModel.defaultFilter.endDate;

        $scope.vpgs = [];
        $scope.selectedVpgs = [];
        $scope.statuses = recoveryReportModel.defaultFilter.selectedStatuses;
        $scope.selectedStatuses = _.cloneDeep(recoveryReportModel.defaultFilter.selectedStatuses);// return a copy
        $scope.types = recoveryReportModel.defaultFilter.selectedTypes;
        $scope.selectedTypes = _.cloneDeep(recoveryReportModel.defaultFilter.selectedTypes);// return a copy

        $scope.ddVpgsSettings = {displayProp: 'text', idProp: 'value', externalIdProp: 'value', enableSearch: true};
        $scope.ddTypesSettings = {displayProp: 'text', idProp: 'value', externalIdProp: 'value', enableSearch: false};
        $scope.ddStatusesSettings = {
            displayProp: 'text',
            idProp: 'value',
            externalIdProp: 'value',
            enableSearch: false
        };

        var getReport = function (filter) {
            return recoveryReportModel.requestData(filter).then(function (result) {
                //for initial call (get vpgs list from BE)
                $scope.data = result.data;

                return result;
            });
        };

        var getFilter = function () {
            return {
                startDate: moment($scope.reportDateRange.startDate),
                endDate: moment($scope.reportDateRange.endDate),
                selectedVpgs: $scope.selectedVpgs,
                selectedStatuses: $scope.selectedStatuses,
                selectedTypes: $scope.selectedTypes
            };
        };
        $scope.applyFilter = function () {
            var filter = getFilter();
            if (_.isEmpty(filter.selectedVpgs) || _.isEmpty(filter.selectedStatuses) || _.isEmpty(filter.selectedTypes)) {
                $scope.data = [];
                return;
            }
            getReport(filter);
        };

        $scope.exportReport = function (format) {
            if ($scope.selectedItems.length === 0) {
                zAlertFactory.warn('Warning', $translate.instant('REPORTS_VIEW.RECOVERY_REPORTS_NO_SELECTED_VPG_DESCRIPTION'), null, [zAlertFactory.buttons.OK]);
            } else {
                recoveryReportModel.exportReport($scope.selectedItems, format);
            }
        };

        $scope.onDateChange = function () {
            $scope.selectedVpgs = [];
            $scope.selectedStatuses = recoveryReportModel.defaultFilter.selectedStatuses.slice();// return a copy
            $scope.selectedTypes = recoveryReportModel.defaultFilter.selectedTypes.slice();// return a copy

            getReport(getFilter()).then(fillVpgs);

        };

        $scope.reset = function () {
            $scope.reportDateRange.startDate = recoveryReportModel.defaultFilter.startDate;
            $scope.reportDateRange.endDate = recoveryReportModel.defaultFilter.endDate;
            $scope.selectedVpgs = [];
            $scope.selectedStatuses = _.cloneDeep(recoveryReportModel.defaultFilter.selectedStatuses);// return a copy
            $scope.selectedTypes = _.cloneDeep(recoveryReportModel.defaultFilter.selectedTypes);// return a copy
        };
        getReport(getFilter()).then(fillVpgs);

        function fillVpgs(result) {
            $scope.vpgs = result.vpgs;
            $scope.selectedVpgs = angular.copy(result.vpgs);
        }
    });

angular.module('zvmApp.core')
    .directive('recoveryReportsForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'recovery-reports-form.html'
        };
    });

angular.module('zvmApp.core')
    .directive('recoveryReportsInput', function () {
        return {
            restrict: 'E',
            templateUrl: 'recovery-reports-input.html'
        };
    });
