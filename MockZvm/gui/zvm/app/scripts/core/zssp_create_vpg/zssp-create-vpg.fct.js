'use strict';

angular.module('zvmApp.core')
    .factory('zsspCreateVpgFactory', function ($uibModal, zertoServiceFactory, zAlertFactory, zsspCreateVPGModel, $translate, helperService) {
        var zsspCreateVpgFactory = {};

        zsspCreateVpgFactory.modalInstance = null;

        zsspCreateVpgFactory.createPortalkNewVpg = function (){
            zertoServiceFactory.GetPortalInitialSitesInfoForVpgCreation().then(function (result){
               if(result.LocalVCDVapps.length === 0 && result.LocalVCVms.length === 0){
                   zAlertFactory.fail($translate.instant('ACTIONS_BUTTON.CREATE_VPG'),$translate.instant('ZSSP_VPG.ALL_SITES_PROTECTED'));
               }else{

                   if(result.LocalVCDVapps.length !== 0){
                       helperService.initVcdVappForGrid(result.LocalVCDVapps);
                   }

                   zsspCreateVPGModel.init(result);
                   zsspCreateVpgFactory.open();
               }
            });
        };

        zsspCreateVpgFactory.open = function () {
            zsspCreateVpgFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/zssp_create_vpg/zssp-create-vpg.html',
                windowClass: 'zssp-create-vpg',
                controller: 'zsspCreateVpgController',
                backdrop: 'static'
            });

        };

        zsspCreateVpgFactory.close = function () {
            zsspCreateVpgFactory.modalInstance.dismiss('close');
        };

        return zsspCreateVpgFactory;
    });
