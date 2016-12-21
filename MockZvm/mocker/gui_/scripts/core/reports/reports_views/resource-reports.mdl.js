'use strict';

angular.module('zvmApp.models')
    .factory('resourceReportModel', function (zertoServiceFactory, $window) {

        var resourceReportModel = {};

        resourceReportModel.reportDateRange = {
            startDate: moment().startOf('month'),
            endDate: moment().add(1, 'days')
        };

        resourceReportModel.export = function (startDate, endDate) {
            $window.open('/ZvmService/RecoveryResourceReportService/GetRecoveryVmsResourcesReport?startDate=' + moment.utc(startDate).toISOString() + '&endDate=' + moment.utc(endDate).toISOString());
        };

        resourceReportModel.getAvailableRange = function () {
            return zertoServiceFactory.GetRecoveryVmsResourcesReportReportPreQueryInfo().then(function (result) {
                return {
                    startDate: result.EarliestAvailableDate,
                    endDate: result.LatestAvailableDate
                };
            });
        };

        return resourceReportModel;
    });
