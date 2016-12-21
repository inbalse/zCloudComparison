'use strict';

angular.module('zvmApp.models')
    .factory('usageReportModel', function (zertoServiceFactory, $window) {

        var usageReportModel = {};

        var aYearInALife = moment().year();
        usageReportModel.year = aYearInALife.toString();
        usageReportModel.years = [];
        var i = 0;
        while (aYearInALife >= 2012) {
            usageReportModel.years.push(aYearInALife.toString());
            i++;
            aYearInALife = moment().year() - i;
        }

        usageReportModel.getLicenseType = function () {
            return zertoServiceFactory.GetSummaryMinimal().then(function (result) {
                return result.SiteDetails.LicenseType;
            });
        };

        usageReportModel.getMonths = function (year) {
            return zertoServiceFactory.GetBillingYearDeatils(parseInt(year, 10)).then(function (result) {
                return parseMonths(result);
            });
        };

        var parseMonths = function (data) {
            var filtereredData = _.filter(data, function (item) {
                return item.VmCountRaw !== 0;
            });

            return _.map(filtereredData, function (value) {
                return {
                    value: value.Month,
                    text: moment(value.Month + '/1/0').format('MMM')
                };
            });

        };

        usageReportModel.export = function (year, month, format) {
            var params = '?year=' + parseInt(year, 10) + '&month=' + parseInt(month, 10);
            switch (format) {
                case 'csv':
                    $window.open('/ZvmService/UsageReport/GetExportedBillingMonthDetails' + params);
                    break;
                case 'zip':
                    $window.open('/ZvmService/UsageReport/GetExportedSignedBillingMonthDetails' + params);
                    break;
            }
        };

        return usageReportModel;
    });
