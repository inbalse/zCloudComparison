'use strict';

angular.module('zvmApp.core')
    .factory('tasksSummaryFactory', function ($uibModal) {
        var service = {};
        service.shown = false;
        //toggle panel visibility
        service.togglePanel = function () {
            if (!service.shown) {
                service.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/tasks_summary/tasks-summary.html',
                    windowClass: 'z-panel task-panel',
                    controller: 'tasksSummaryController',
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
