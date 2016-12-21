'use strict';

angular.module('zvmApp.models')
    .factory('recoveryReportModel', function (zertoServiceFactory, zSaveAs, enums, $filter, $translate) {

        var recoveryReportModel = {};
        var recoveryTypes = _.keys(enums.RecoveryType);
        var recoveryOperationStatus = _.keys(enums.RecoveryOperationStatus);

        recoveryReportModel.defaultFilter = {
            startDate: moment().startOf('month'),
            endDate: moment().add(1, 'days'),
            selectedVpgs: null,
            selectedStatuses: [
                {
                    text: 'Success',
                    value: ['1', '3']
                },
                {
                    text: 'Failed',
                    value: ['2', '4']
                }
            ],
            selectedTypes: _.map(recoveryTypes, function (value, index) {
                return {
                    text: value,
                    value: parseInt(index, 10)
                };
            })
        };

        recoveryReportModel._getSelectedStatuses = function (statuses) {
            var flatArr = _.flatten(_.pluck(statuses, 'value'));
            // If more than one status selected add 'Unknown' to the array ('0')
            return statuses.length > 1 ? _.sortBy(_.union(flatArr, ['0'])) : flatArr;
        };

        recoveryReportModel.requestData = function (filter) {
            if (angular.isUndefined(filter)) {
                filter = $.extend(true, {}, recoveryReportModel.defaultFilter);
            }
            filter = recoveryReportModel._processFilter(filter);
            return zertoServiceFactory.GetRecoveryReportScreen(
                filter.startDate,
                filter.endDate,
                filter.selectedVpgs,
                filter.selectedStatuses,
                filter.selectedTypes
            ).then(function (result) {
                return recoveryReportModel._processData(result);
            });
        };

        recoveryReportModel._processFilter = function (filter) {
            filter.startDate = moment.utc(filter.startDate).toDate();
            filter.endDate = moment.utc(filter.endDate).toDate();
            filter.selectedVpgs = _.pluck(filter.selectedVpgs, 'value');
            filter.selectedStatuses = recoveryReportModel._getSelectedStatuses(filter.selectedStatuses);
            filter.selectedTypes = _.map(filter.selectedTypes, function (n) {
                return n.value.toString();
            });
            return filter;
        };

        recoveryReportModel._processData = function (data) {
            var processed = {};
            processed.vpgs = _.map(data.ProtectionGroups, function (value) {
                return {
                    text: value,
                    value: value
                };
            });

            processed.data = _.forEach(data.RecoveryResults, function (item) {
                item.id = item.Id.Id;
                item.RTOMeasuredInSecObj = {
                    value: item.RTOMeasuredInSec,
                    display: $filter('convertFormatSecondsFilter')(item.RTOMeasuredInSec)
                };
                item.TypeObj = {
                    value: item.Type,
                    display: $translate.instant('REPORTS_VIEW.' + recoveryTypes[item.Type].toUpperCase())
                };
                item.StatusObj = {
                    value: item.Status,
                    display: $translate.instant('REPORTS_VIEW.' + recoveryOperationStatus[item.Status].toUpperCase())
                };
            });
            return processed;
        };

        recoveryReportModel.exportReport = function (selectedItems, format) {
            var params = JSON.stringify(_.pluck(selectedItems, 'Id'));
            switch (format) {
                case 'pdf':
                    zSaveAs.post('/ZvmService/RecoveryResourceReportService/ExportRecoveryReportToPdf', params);
                    break;
                case 'zip':
                    zSaveAs.post('/ZvmService/RecoveryResourceReportService/ExportRecoveryReportToPdfZipped', params);
                    break;
            }
        };

        return recoveryReportModel;
    });
