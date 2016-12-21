'use strict';

angular.module('zvmApp.core')
    .factory('vraEditFactory', function ($uibModal) {
        var vraEditFactory = {};

        vraEditFactory.showVraEdit = function (vra) {

            vraEditFactory.selectedVra = vra;
            vraEditFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/vra_edit/vra-edit.html',
                windowClass: 'vra-edit-modal',
                controller: 'vraEditController',
                backdrop: 'static'
            });
        };

        return vraEditFactory;
    });
