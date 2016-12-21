'use strict';

angular.module('zvmApp.core')
    .service('createVPGInitEditService', function ($q, createVPGInitService, zertoServiceFactory, vpgService, helperService) {
        //Todo remove duplicate code ( if (isReverse) {} and   if (vpgService.isZssp()) {} ) and function
        //Todo relief zertoServiceFactory.GetInfoForManagingVPG(vpgId).then(createVPGInitService.setVpgSettings) catch promise for debug
        var initEditService = this;

        initEditService.init = function (vpgId, optionalVmIdToAdd) {
            var promiseQueue = [];

            createVPGInitService.init(true, false, optionalVmIdToAdd);

            vpgService.setProtectionGroupId(vpgId);
            promiseQueue.push(setPotentialsVms(vpgId));

            if (vpgService.isZssp()) {
                promiseQueue.push(setZsspInitialSiteInfo(vpgId, false));
            } else {
                promiseQueue.push(setInitialSiteInfo(vpgId));
            }

            return $q.all(promiseQueue);
        };

        initEditService.initReverse = function (vpgId, config) {
            var promiseQueue = [];

            createVPGInitService.init(true, true);

            vpgService.setProtectionGroupId(vpgId);
            promiseQueue.push(setPotentialsVms(vpgId));

            if (vpgService.isZssp()) {
                promiseQueue.push(setZsspInitialSiteInfo(vpgId, true, config));
            } else {
                promiseQueue.push(setInitialSiteInfo(vpgId,true,config));
            }

            return $q.all(promiseQueue);
        };


        function setPotentialsVms(vpgId) {
            return createVPGInitService.setPotentialsVms(vpgId, false);
        }

        function setInitialSiteInfo(vpgId, isReverse, config) {
            return zertoServiceFactory.GetInitialSitesInfoForVpgCreation().then(function (siteInfo) {

                helperService.initVcdVappForGrid(siteInfo.LocalVCDVapps);
                vpgService.setInitialSiteInfo(siteInfo);
                vpgService.initSourceSiteTypeCollection(siteInfo);

                if (isReverse) {
                    return createVPGInitService.setVpgSettings(config);
                }

                return zertoServiceFactory.GetInfoForManagingVPG(vpgId).then(createVPGInitService.setVpgSettings);

            }, createVPGInitService.baseErrorHandler);
        }

        function setZsspInitialSiteInfo(vpgId, isReverse, config) {
            return zertoServiceFactory.GetPortalInitialSitesInfoForVpgCreation().then(function (siteInfo) {
                helperService.initVcdVappForGrid(siteInfo.LocalVCDVapps);
                vpgService.setInitialSiteInfo(siteInfo);
                if (isReverse) {
                    return createVPGInitService.setVpgSettings(config);
                }

                return zertoServiceFactory.GetInfoForManagingVPG(vpgId).then(createVPGInitService.setVpgSettings);

            });
        }
    });
