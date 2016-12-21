'use strict';

angular.module('zvmApp.core')
    .service('createVPGInitCreateService', function ($q, createVPGInitService, zertoServiceFactory, vpgService, helperService) {

        //Optional id is a pre selected vm or vApp to add to the vpg

        var initCreateService = this;

        initCreateService.isCreateVPGAllowed = function () {
            return zertoServiceFactory.AllowCreateProtectionGroup().then(function (result) {
                return result.AllowCreateVpg;
            });
        };

        initCreateService.init = function (optionalId, vpgName) {
            var promiseQueue = [];
            createVPGInitService.init(false, false, optionalId);
            vpgService.setVpgName(vpgName);

            promiseQueue.push(createVPGInitService.setPotentialsVms(null, false));

            promiseQueue.push(setInitialSiteInfo());

            return $q.all(promiseQueue);
        };

        initCreateService.initZssp = function (config, vpgName, optionalId) {
            var promiseQueue = [];
            createVPGInitService.init(false, false, optionalId);
            vpgService.setVpgName(vpgName);

            promiseQueue.push(createVPGInitService.setPotentialsVms(null, false));
            promiseQueue.push(setZsspInitialSiteInfo(config));

            return $q.all(promiseQueue);
        };


        function setInitialSiteInfo() {
            return zertoServiceFactory.GetInitialSitesInfoForVpgCreation().then(applyInitialSiteInfo, createVPGInitService.baseErrorHandler);
        }

        function applyInitialSiteInfo(siteInfo) {
            helperService.initVcdVappForGrid(siteInfo.LocalVCDVapps);
            vpgService.setInitialSiteInfo(siteInfo);
            vpgService.initSourceSiteTypeCollection(siteInfo);

        }

        function setZsspInitialSiteInfo(config) {
            return zertoServiceFactory.GetPortalInitialSitesInfoForVpgCreation().then(function (siteInfo) {
                helperService.initVcdVappForGrid(siteInfo.LocalVCDVapps);
                applyZsspInitialSiteInfo(siteInfo, config);
            }, createVPGInitService.baseErrorHandler);
        }

        function applyZsspInitialSiteInfo(siteInfo, config) {
            vpgService.setInitialSiteInfo(siteInfo);
            vpgService.initSourceSiteTypeCollection(siteInfo);
            _.forEach(config.Config.VirtualMachines, function(vm){
                vm._isNewVm = true;
            });
            createVPGInitService.setVpgSettings(config);
        }

    });
