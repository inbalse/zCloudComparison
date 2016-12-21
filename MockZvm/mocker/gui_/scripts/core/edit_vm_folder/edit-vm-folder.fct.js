/**
 * Created by liron on 18/05/2015.
 */
'use strict';

angular.module('zvmApp.core')
    .factory('editVmFolderFactory', function ($uibModal, $q) {
        var editVmFolderFactory = {};

        editVmFolderFactory._modalInstance = null;
        editVmFolderFactory.deferred = null;

        editVmFolderFactory.openWindow = function (items, potentialFolders) {
            editVmFolderFactory.deferred = $q.defer();

            editVmFolderFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_vm_folder/edit-vm-folder.html',
                windowClass: 'edit-vm-folder',
                controller: 'editVmFolderController',
                backdrop: 'static',
                resolve: {
                    potentialFolders: function () {
                        return potentialFolders;
                    },
                    vm: function() {
                        return angular.copy(items[0]);
                    },
                    selectedVmsCount: function(){
                        return items.length;
                    }
                }
            });

            return editVmFolderFactory.deferred.promise;
        };

        editVmFolderFactory.save = function (value) {
            editVmFolderFactory.deferred.resolve(value);
            editVmFolderFactory._modalInstance.dismiss('close');
            editVmFolderFactory.clear();
        };
        editVmFolderFactory.closeWindow = function () {
            editVmFolderFactory.deferred.reject();
            editVmFolderFactory._modalInstance.dismiss('close');
            editVmFolderFactory.clear();
        };

        editVmFolderFactory.clear = function () {
            editVmFolderFactory._modalInstance = null;
            editVmFolderFactory.deferred = null;
        };

        return editVmFolderFactory;
    });
