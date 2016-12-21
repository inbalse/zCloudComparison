'use strict';

angular.module('zvmApp.core')
    .service('createVpgNicsService', function (vpgService, vmsService, networksService, createVpgNicVCGridService, createVpgNicVCDGridService) {

        var nicsService = this,
            gridObj;

        nicsService.init = function () {
            var selectedVms = vmsService.getInitializedSelectedVms(),
                vpgSettings = vpgService.getVpgSettings(),
                target = vpgSettings.Entities.Target,
                source = vpgSettings.Entities.Source;

            if (nicsService.isTargetVCD()) {
                networksService.initVCDNicsList(selectedVms);
                gridObj = createVpgNicVCDGridService.init(vpgService.isVCDToVCD());

            } else {
                networksService.initNicsPerVms(selectedVms);
                gridObj = createVpgNicVCGridService.init(source, target);
            }
        };

        nicsService.getGridObj = function () {
            return gridObj;
        };

        nicsService.updateGridData = function(newData) {
            gridObj.data = newData;
        };

        nicsService.getVmsNicsList = function () {
            return networksService.getVmsNicsList();
        };

        nicsService.getVmsVcdNicsList = function () {
            return networksService.getVmsVcdNicsList();
        };

        nicsService.saveNics = function (nicObject, selectedNics) {
            networksService.saveNics(nicObject, selectedNics);
        };

        nicsService.saveVCDNics = function (nicObject, selectedNics) {
            networksService.saveVCDNics(nicObject, selectedNics);
        };

        nicsService.isTargetVCD = function () {
            return vpgService.isVcdVapp();
        };

        nicsService.collectSelectedNics = function (selectNics, nicList) {
            var editSelectedNics = [];
            _.forEach(selectNics, function (nic) {
                var result = _.find(nicList, {id: nic.id});
                if (result) {
                    editSelectedNics.push(result);
                }
            });
            return editSelectedNics;
        };
    });
