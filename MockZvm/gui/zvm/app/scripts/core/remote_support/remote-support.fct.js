'use strict';

angular.module('zvmApp.core')
    .factory('remoteSupportFactory', function ($uibModal, remoteSupportApiService) {
        var remoteSupportFactory = {};

        remoteSupportFactory.showRemoteSupport = function () {
            remoteSupportFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/remote_support/remote-support.html',
                windowClass: 'remoteSupportModal',
                controller: 'remoteSupportController',
                backdrop: 'static'
            });
        };

        remoteSupportFactory.getRemoteSupportSettings = function () {
            return remoteSupportApiService.getRemoteSupportSettings();
        };
        
        remoteSupportFactory.setRemoteSupportSettings = function (settings) {
            remoteSupportApiService.setRemoteSupportSettings(settings);
        };

        return remoteSupportFactory;
    });
