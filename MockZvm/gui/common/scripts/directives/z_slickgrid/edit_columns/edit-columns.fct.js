'use strict';

angular.module('zvmApp.directives')
    .factory('editColumnsFactory', function ($uibModal) {
        var editColumnsFactory = {};

        editColumnsFactory.openPopUpDialog = function (data) {
            editColumnsFactory.data = data;
            editColumnsFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/common/directives/z_slickgrid/edit_columns/edit-columns.html',
                windowClass: 'edit-columns-modal',
                controller: 'editColumnsController',
                backdrop: 'static'
            });

            return editColumnsFactory.modalInstance.result;
        };

        editColumnsFactory.close = function () {
            editColumnsFactory.modalInstance.dismiss('close');
        };

        return editColumnsFactory;
    });
