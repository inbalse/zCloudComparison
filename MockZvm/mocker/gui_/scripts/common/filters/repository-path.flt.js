'use strict';

angular.module('zvmApp.filters')
    .filter('repositoryPathConvertor', function (enums) {
        return function (data) {
            if (data.RepositoryType === enums.BackupTargetType.Local) {
                return data.LocalData.Path;
            } else if (data.RepositoryType === enums.BackupTargetType.AmazonS3) {
                return data.AWSData.Path;
            }
            return data.SMBData.PathToFolder;
        };
    });
