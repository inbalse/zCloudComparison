'use strict';

angular.module('zvmApp.core')
    .factory('fileBrowseFactory', function ($q, $uibModal, zertoServiceFactory) {
        var fileBrowseFactory = {};

        fileBrowseFactory._modalInstance = null;
        fileBrowseFactory.differed = null;

        fileBrowseFactory.openWindow = function (datastore, volume, isScvmm) {
            fileBrowseFactory.differed = $q.defer();

            fileBrowseFactory.isScvmm = isScvmm;

            fileBrowseFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/file_browse/file-browse.html',
                windowClass: 'file-browse',
                controller: 'fileBrowseController',
                backdrop: 'static',
                resolve: {
                    datastore: function () {
                        return datastore;
                    },
                    volume: function () {
                        return volume;
                    }
                }
            });

            return fileBrowseFactory.differed.promise;
        };

        fileBrowseFactory.save = function (path, datastore) {
            fileBrowseFactory.differed.resolve({path: path, datastore: datastore});
        };

        fileBrowseFactory.close = function (value) {
            fileBrowseFactory.differed.reject(value);
            fileBrowseFactory._modalInstance.close('');
        };

        fileBrowseFactory.browseForVmdkFiles = function (zertoOrganizationIdentifier, optionalProtectionGroupIdentifier, currentVpgOwnersId, datastoreIdentifier, folderPath, sourceVmId, sourceDisk) {
            if (fileBrowseFactory.isScvmm && folderPath){ //target site is scvmm
                folderPath =  folderPath.replace(/\//g,'\\');
            }
            return zertoServiceFactory.BrowseForVmdkFiles(zertoOrganizationIdentifier, optionalProtectionGroupIdentifier, currentVpgOwnersId, datastoreIdentifier, folderPath, sourceVmId, sourceDisk);
        };
        fileBrowseFactory.browseForVmdkFilesVcd = function (optionalProtectionGroupIdentifier, currentVpgOwnersId, storageProfile, folderPath, sourceVmId, sourceDisk, targetOrgVdc) {
            if (fileBrowseFactory.isScvmm && folderPath){ //target site is scvmm
                folderPath =  folderPath.replace(/\//g,'\\');
            }
            return zertoServiceFactory.BrowseForVmdkFilesTargetVcd(optionalProtectionGroupIdentifier, currentVpgOwnersId, storageProfile, folderPath, sourceVmId, sourceDisk, targetOrgVdc);
        };

        return fileBrowseFactory;
    });
