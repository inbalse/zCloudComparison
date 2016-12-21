'use strict';

angular.module('zvmApp.models')
    .factory('repositoryListModel', function (zertoServiceUpdaterFactory, entityCases, entityEvents, enums, mbToStringConvertorFilter, $translate) {
        var repositoryListModel = {};
        //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetAllBackupTargets, []);

        repositoryListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetAllBackupTargets', [], false, repositoryListModel.processData);
        };

        repositoryListModel.processData = function (data) {

            var processed = _.forEach(data.BackupTargets, function (item) {
                item.id = item.ID.Identifier;
                item.PathText = repositoryListModel._getPathFromRepository(item);
                item.CapacityObj = {};
                item.CapacityObj.value = item.Capacity;
                item.CapacityObj.display = mbToStringConvertorFilter(item.Capacity);
                item.FreeSpaceObj = {};
                item.FreeSpaceObj.value = item.FreeSpace;
                item.FreeSpaceObj.display = mbToStringConvertorFilter(item.FreeSpace);
                item.RestorePoints.value = item.RestorePoints.NumberOfSuccessfullRuns;
                item.RestorePoints.display = item.RestorePoints.NumberOfSuccessfullRuns + '/' + item.RestorePoints.TotalNumberOfRuns;
                item.ConnectivityStateDisplay = repositoryListModel._getConnectivityState(item.ConnectivityState);
                item.repositoryTypeName = repositoryListModel._getRepositoryTypeName(item);
                item.editDeleteObj = {
                    nameText: {
                        label: item.DisplayName,
                        type: entityCases.caseText
                    },
                    deleteIcon: {
                        type: entityCases.caseDelete,
                        event: entityEvents.deleteEntity,
                        enabled: item.IsDelete
                    },
                    editIcon: {
                        type: entityCases.caseEdit,
                        event: entityEvents.editEntity,
                        enabled: item.IsEdit
                    },
                    display: item.DisplayName
                };
            });
            data.BackupTargets = processed;

            return data;
        };
        repositoryListModel._getPathFromRepository = function (data) {
            if (data.RepositoryType === enums.BackupTargetType.Local) {
                return data.LocalData.Path;
            }
            if (data.RepositoryType === enums.BackupTargetType.AmazonS3) {
                return data.AWSData.Path;
            }
            return data.SMBData.PathToFolder;
        };

        repositoryListModel._getRepositoryTypeName = function (item) {
            if (item.RepositoryType === enums.BackupTargetType.Local) {
                return $translate.instant('REPOSITORY_LIST.LOCAL');
            }
            if (item.RepositoryType === enums.BackupTargetType.AmazonS3) {
                return $translate.instant('REPOSITORY_LIST.AWS');
            }
            return $translate.instant('REPOSITORY_LIST.SMB');
        };

        repositoryListModel._getConnectivityState = function (state) {
            if (state === enums.BackupTargetState.Connected) {
                return $translate.instant('REPOSITORY_LIST.CONNECTED');
            }
            return $translate.instant('REPOSITORY_LIST.DISCONNECTED');
        };

        return repositoryListModel;
    });
