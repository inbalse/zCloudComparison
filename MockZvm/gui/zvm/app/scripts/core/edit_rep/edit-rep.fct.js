'use strict';

angular.module('zvmApp.core')
    .factory('repositoryEditFactory', function ($uibModal, zertoServiceFactory) {
        var repositoryEditFactory = {};

        repositoryEditFactory.open = function (isNew, id) {
            if (isNew) {
                repositoryEditFactory.openDialog(isNew, null);
            } else {
                zertoServiceFactory.GetBackupTarget(id, null, null, false).then(function(result){
                    repositoryEditFactory.openDialog(isNew, result);
                });
            }
        };

        repositoryEditFactory.openDialog = function (isNew, repository) {
            repositoryEditFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/edit_rep/edit-rep.html',
                windowClass: 'rep-edit-modal',
                controller: 'repositoryEditController',
                backdrop: false,
                resolve: {
                    isNew: function () {
                        return isNew;
                    },
                    repository: function () {
                        return repository;
                    }
                }
            });
        };

        repositoryEditFactory.close = function () {
            repositoryEditFactory.modalInstance.close();
        };

        return repositoryEditFactory;
    });
