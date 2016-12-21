'use strict';

angular.module('zvmApp.core')
    .factory('siteLicenseModel', function ($filter, $translate, zertoServiceFactory, zAlertFactory) {
        var siteLicenseModel = {};
        siteLicenseModel.model = {};
        siteLicenseModel.model.licenseData = {Details: {SitesUsage: []}};
        siteLicenseModel.model.gridOptions = {
            showCheckbox: false,
            columns: [
                {id: 'SiteName', field: 'SiteName', name: $translate.instant('SITE_SETTINGS.LICENSE.SITE_NAME')},
                {id: 'Usage.Num', field: 'Num', name: $translate.instant('SITE_SETTINGS.LICENSE.PROTECTED_VMS')}
            ]
        };
        siteLicenseModel.initLicenseDetails = function (data) {
            if (angular.isDefined(data)) {
                siteLicenseModel.model.licenseData = data;
                if (angular.isObject(data.Details)) {
                    siteLicenseModel.model.licenseData.Details.ExpiryDate = siteLicenseModel.model.licenseData.Details.ExpiryDate !== null ? $filter('date')(siteLicenseModel.model.licenseData.Details.ExpiryDate, 'yyyy-MM-dd HH:mm:ss Z') : 'NA';
                    siteLicenseModel.model.totalSites = 0;

                    _.forEach(siteLicenseModel.model.licenseData.Details.SitesUsage, function (item, index) {
                        item.id = index;
                        item.Num = item.Usage.Num;
                        siteLicenseModel.model.totalSites += (angular.isNumber(item.Usage.Num) ? item.Usage.Num : 0);
                    });

                    //fake rows, up to 4
                    if (siteLicenseModel.model.licenseData.Details.SitesUsage.length < 4) {

                        var l = 4 - siteLicenseModel.model.licenseData.Details.SitesUsage.length;

                        for (var i = 0; i < l; i++) {
                            siteLicenseModel.model.licenseData.Details.SitesUsage.push({
                                id: i + siteLicenseModel.model.licenseData.Details.SitesUsage.length,
                                SiteName: '',
                                Num: '',
                                Usage: {Num: ''}
                            });
                        }
                    }

                }
            }
        };

        siteLicenseModel.save = function () {
            // if empty license, we need to send null and not empty string
            var key = siteLicenseModel.model.licenseData.Key;
            if (!key.Key || !key.Key.trim()) {
                key = null;
            }

            zertoServiceFactory.SaveLicense(key).then(siteLicenseModel.load, siteLicenseModel.onSaveError);
        };


        siteLicenseModel.onSaveError = function (result) {
            zAlertFactory.fail($translate.instant('SITE_SETTINGS.LICENSE.UPDATE_TITLE'), result.faultString, undefined, undefined);
        };

        siteLicenseModel.load = function () {
            return zertoServiceFactory.GetCurrentLicenseScreen().then(siteLicenseModel.initLicenseDetails);
        };

        return {
            _self: siteLicenseModel,
            load: siteLicenseModel.load,
            save: siteLicenseModel.save,
            model: siteLicenseModel.model
        };
    });
