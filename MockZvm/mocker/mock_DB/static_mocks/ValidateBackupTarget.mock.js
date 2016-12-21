'use strict';

module.exports = function ValidateBackupTarget(repository) {
    let result = {IsAvailable: false, ErrorMsg: 'Path doesnt exist'};

    //todo get repository
    repository = [{GlobalPath: '127.0.0.1'}];

    result.TotalSpaceInMB = 100000;
    result.FreeSpaceInMB = 50000;

    if (repository[0].RepositoryType === 1 && repository[0].GlobalPath === '127.0.0.1') {
        result.IsAvailable = true;
        result.IsFolderExist = true;
        result.isValidateSuccses = true;
    } else if (repository[0].RepositoryType === 0 && repository[0].GlobalPath === 'c:\\tmp') {
        result.IsAvailable = true;
        result.IsFolderExist = true;
        result.isValidateSuccses = true;

    }
    return result;
};
