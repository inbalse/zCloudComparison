'use strict';

angular.module('zvmApp.core')
    .factory('pairSitesFactory', function (zertoServiceFactory, $uibModal, sitesListModel, zAlertFactory, guiVisibleException) {
        var service = {};
        var textInfo;
        var defaultText = 'Pairing to site failed. Check the IP address and port and verify firewalls enable traffic between sites';

        //========================================================================================
        // APIs
        //========================================================================================
        service.showPairSites = function () {
            service.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/pair_sites/pair-sites.html',
                windowClass: 'pairSitesStyle',
                backdrop: 'static',
                controller: 'pairSitesController'
            });
        };

        //========================================================================================
        // Data
        //========================================================================================
        service.getData = function () {
            return zertoServiceFactory.GetSitePairingScreen();
        };

        service.sendData = function (value) {
            zertoServiceFactory.Pair(value).then(null,
                function (result) {
                    if(guiVisibleException.PERMISSION_TASK_DENIED !== result.faultString) {
                        textInfo = result && result.faultString !== '' ? result.faultString : defaultText;
                        zAlertFactory.fail('', textInfo);
                    }
                }, null);

            //backend doesn't support this update (cash is not ready and there is no result)
            //if it will fix - gui support
            sitesListModel.updateNow();
        };

        return service;
    });
