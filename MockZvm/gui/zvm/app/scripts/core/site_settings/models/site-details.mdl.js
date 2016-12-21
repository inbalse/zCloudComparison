'use strict';

angular.module('zvmApp.core')
    .factory('siteDetailsModel', function (zertoServiceFactory, globalStateModel, enums, $q) {
        var siteDetailsModel = {};
        siteDetailsModel.isValid = true;
        siteDetailsModel.siteManagementDetails = {};
        siteDetailsModel.vCenterCredentials = {username: '', password: ''};
        siteDetailsModel.isPublicCloud =
            globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws ||
            globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure;

        siteDetailsModel.setSiteManagementDetails = function (result) {
            //hack for email validation - bug 16401
            if (result.ContactEmail === 'Unconfigured contact email') {
                result.ContactEmail = '';
            }
            //hack for email validation - bug 16475
            if (result.ContactPhone === 'Unconfigured contact phone') {
                result.ContactPhone = '';
            }

            siteDetailsModel.siteManagementDetails = result;

        };
        siteDetailsModel.setUsername = function (result) {
            siteDetailsModel.vCenterCredentials.username = result;
        };
        siteDetailsModel.save = function () {
            if (siteDetailsModel.vCenterCredentials.password !== '' && siteDetailsModel.vCenterCredentials.username !== '') {
                zertoServiceFactory.SetVCenterCredentials(siteDetailsModel.vCenterCredentials.username, siteDetailsModel.vCenterCredentials.password);
            }

            return zertoServiceFactory.SetSiteManagementDetails(siteDetailsModel.siteManagementDetails);
        };
        siteDetailsModel.load = function () {
            var promises = [zertoServiceFactory.GetSiteManagementDetails().then(siteDetailsModel.setSiteManagementDetails)];
            if(!siteDetailsModel.isPublicCloud){
                promises.push(zertoServiceFactory.GetVCenterUserName().then(siteDetailsModel.setUsername));
            }

            return $q.all(promises);
        };

        return siteDetailsModel;
    });
