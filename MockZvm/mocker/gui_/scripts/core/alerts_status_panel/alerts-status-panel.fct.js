'use strict';

angular.module('zvmApp.core')
    .factory('alertsStatusPanelFactory', function ($uibModal) {
        var service = {};
        service.shown = false;
        //toggle panel visibility
        service.togglePanel = function () {
            if (!service.shown) {
                service.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/alerts_status_panel/alerts-status-panel.html',
                    windowClass: 'z-panel alerts-status-panel',
                    controller: 'alertsStatusPanelController',
                    backdrop: false
                });
                service.shown = true;

                service.modalInstance.result.finally(function(){
                    service.shown = false;
                });
            }
            else {
                service.hidePanel();
            }
        };

        service.hidePanel = function () {
            service.modalInstance.close();
            service.shown = false;
        };

        return service;
    });
