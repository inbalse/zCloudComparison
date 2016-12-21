'use strict';

var ang = angular.module('zvmApp.core');

ang.controller('repositoryEditController', function ($scope, $translate, repositoryEditFactory, isNew, enums, zertoServiceFactory, mbToStringConvertorFilter, zAlertFactory, repository) {
    //==========================================================================
    //  Properties
    //==========================================================================
    $scope.loading = true;
    $scope.forms = {};
    $scope.isNew = isNew;
    $scope.repObject = {};
    $scope.pathChanged = false;
    $scope.originalPath = '';
    $scope.pieData = [];
    $scope.validationButtonState = true;
    $scope.isPieChartEmpty = true;
    $scope.bucketLoading = false;


    //==========================================================================
    //  Init
    //==========================================================================
    $scope.initRepTypes = function () {
        $scope.repTypes = [
            {label: $scope.translations['REPOSITORY_LIST.LOCAL'], value: enums.BackupTargetType.Local},
            {label: $scope.translations['REPOSITORY_LIST.SMB'], value: enums.BackupTargetType.ServerMessageBlock}
           // {label: $scope.translations['REPOSITORY_LIST.AWS'], value: enums.BackupTargetType.AmazonS3}//todo return back when AWS repository be available and in spec to

        ];
    };

    $scope.initButtons = function () {
        $scope.buttons = [
            {label: $scope.translations['MODAL.CANCEL'], class: 'btn btn-link', handler: $scope.close, disabled: false},
            {label: $scope.translations['MODAL.SAVE'], handler: $scope.save, disabled: false}
        ];
    };

    //==========================================================================
    //  User interaction
    //==========================================================================
    $scope.close = function () {
        repositoryEditFactory.close();
    };

    var callbackSuccess = function () {
        repositoryEditFactory.close();
    };

    var callbackFailed = function (error) {
        zAlertFactory.fail('Error', error.faultString, function () { });
    };

    $scope.save = function () {
        if (angular.isUndefined($scope.repObject.ID)) {  //add new
            zertoServiceFactory.AddBackupTarget($scope.repObject).then(callbackSuccess, callbackFailed);
        } else {      //update repository
            if ($scope.originalPath !== $scope.repObject.GlobalPath) {
                zAlertFactory.warnCheck('', $scope.translations['EDIT_REP.PATH_CHANGE'], $scope.pathCheckHandler, $scope.translations['EDIT_REP.ALERT_CHECKBOX']);
            } else {
                zertoServiceFactory.UpdateBackupTarget(createRepObject(), false).then(callbackSuccess, callbackFailed);
            }
        }
    };

    $scope.pathCheckHandler = function (event) {

        if (event.target.name === zAlertFactory.buttons.OK) {
            zertoServiceFactory.UpdateBackupTarget(createRepObject(), event.selected).then(callbackSuccess, callbackFailed);
        }
    };

    $scope._validateBackupResult = function (result) {
        if (result === null) {
            $scope.isValidateSuccses = false;
        } else if (result.IsAvailable === false) {
            zAlertFactory.fail('', $scope.translations['EDIT_REP.VALIDATE_FAILED'] + result.ErrorMsg);
            $scope.isValidateSuccses = false;
        } else if (result.IsFolderExist === false) {
            zAlertFactory.warn('', $scope.translations['EDIT_REP.VALIDATE_CREATE'].replace('{0}', $scope._getFolder($scope.repObject)), $scope._createHandler);
            $scope.isValidateSuccses = false;
        } else {
            $scope.isValidateSuccses = true;
            $scope.pathChanged = false;
            $scope.buttons[1].disabled = false;
            $scope.setPieChartValues(result.TotalSpaceInMB, result.FreeSpaceInMB);
            $scope.capacity = mbToStringConvertorFilter(result.TotalSpaceInMB);
            $scope.freeSpace = mbToStringConvertorFilter(result.FreeSpaceInMB);
            $scope.usedSpace = mbToStringConvertorFilter(result.TotalSpaceInMB - result.FreeSpaceInMB);
        }
    };

    $scope.validate = function () {
        zertoServiceFactory.ValidateBackupTarget(createRepObject()).then($scope._validateBackupResult, callbackFailed);
    };

    //validate that aws key is defined and not empty for approve get bucket function
    $scope._isAwsKeysNotEmpty = function(){
        return $scope.repObject.AWSData.AccessKey && $scope.repObject.AWSData.SecretKey ? true : false;
    };

    $scope.validateFieldsNotEmpty = function () {
        //check that all aws field is fill before validate button been enabled
        if($scope.repObject.RepositoryType ===  enums.BackupTargetType.AmazonS3){
            $scope.validationButtonState = $scope.repObject.DisplayName && $scope.repObject.GlobalPath && $scope.repObject.AWSData.AccessKey && $scope.repObject.AWSData.SecretKey && $scope.repObject.AWSData.Bucket ? false : true;
        }else{
            $scope.validationButtonState = $scope.repObject.DisplayName && $scope.repObject.GlobalPath ? false : true;
        }

        $scope.buttons[1].disabled = true;
        $scope.isValidateSuccses = angular.undefined;
    };

    //==========================================================================
    //  Helpers
    //==========================================================================
    $scope._createHandler = function (event) {
        if (event.target.name === zAlertFactory.buttons.OK) {
            zertoServiceFactory.CreateBackupTargetRootPath($scope.repObject).then($scope.createSuccess, $scope.createError);
        }
    };

    $scope.createSuccess = function(){
        $scope.validate();
    };

    $scope.createError = function(result){
        zAlertFactory.fail('',result.faultString);
    };

    $scope._getFolder = function (repository) {
        if (repository.RepositoryType === enums.BackupTargetType.Local) {
            return $scope.repObject.LocalData.Path;
        }else if (repository.RepositoryType === enums.BackupTargetType.AmazonS3) {
            return $scope.repObject.AWSData.Path;
        }

        return $scope.repObject.SMBData.PathToFolder;
    };

    $scope.initEditor = function () {
        if ($scope.isNew) {         //new repository
            $scope.repObject.RepositoryTypeObject = $scope.repTypes[1];
            $scope.repObject.RepositoryType = enums.BackupTargetType.ServerMessageBlock;
            $scope.isSMBData = true;
            $scope.repObject.IsDefault = false;
            $scope.repObject.IsCompressionEnabled = true;
            $scope.buttons[1].disabled = true;
        } else {                      //edit repository
            $scope.repObject = repository;
            $scope.setPieChartValues(repository.Capacity, repository.FreeSpace);
            $scope.capacity = mbToStringConvertorFilter(repository.Capacity);
            $scope.freeSpace = mbToStringConvertorFilter(repository.FreeSpace);
            $scope.usedSpace = mbToStringConvertorFilter(repository.Capacity - repository.FreeSpace);

            if (repository.RepositoryType === enums.BackupTargetType.Local) {
                $scope.repObject.GlobalPath = $scope.repObject.LocalData.Path;
                $scope.repObject.RepositoryTypeObject = $scope.repTypes[0];

            } else if(repository.RepositoryType === enums.BackupTargetType.AmazonS3){
                $scope.repObject.GlobalPath = $scope.repObject.AWSData.Path;
                $scope.repObject.RepositoryTypeObject = $scope.repTypes[2];
                $scope.isAws = true;
            } else {
                $scope.repObject.GlobalPath = $scope.repObject.SMBData.PathToFolder;
                $scope.repObject.RepositoryTypeObject = $scope.repTypes[1];
            }

            $scope.repObject.IsDefault = !!$scope.repObject.IsDefault;
            $scope.repObject.IsCompressionEnabled = !!$scope.repObject.IsCompressionEnabled;
            $scope.originalPath = $scope.repObject.GlobalPath;
        }
    };
    //==========================================================================
    //  Watchers
    //==========================================================================

    $scope.changeName = function () {
        $scope.validateFieldsNotEmpty();
    };
    $scope.changeUserName = function () {
        $scope.buttons[1].disabled = true;
    };
    $scope.changePassword = function () {
        $scope.buttons[1].disabled = true;
    };
    $scope.changeAccessKey = function () {
        $scope.validateFieldsNotEmpty();
    };
    $scope.changeSecretKey = function () {
        $scope.validateFieldsNotEmpty();
    };
    $scope.changeBucket = function () {
        $scope.validateFieldsNotEmpty();
    };

    $scope.changePath = function () {
        $scope.freeSpace = $scope.usedSpace = $scope.capacity = null;
        $scope.setPieChartValues(0, 0);
        if ($scope.repObject.RepositoryTypeObject.value === enums.BackupTargetType.Local) {
            if (angular.isUndefined($scope.repObject.LocalData)) {
                $scope.repObject.LocalData = {};
            }

            if ($scope.repObject.LocalData.Path !== $scope.repObject.GlobalPath) {
                $scope.pathChanged = true;
                $scope.isValidateSuccses = angular.undefined;
                $scope.buttons[1].disabled = true;
                $scope.repObject.LocalData.Path = $scope.repObject.GlobalPath;
            }

        } else if ($scope.repObject.RepositoryTypeObject.value === enums.BackupTargetType.AmazonS3) {
            if (angular.isUndefined($scope.repObject.AWSData)) {
                $scope.repObject.AWSData = {};
            }

            if ($scope.repObject.AWSData.Path !== $scope.repObject.GlobalPath) {
                $scope.repObject.AWSData.Path = $scope.repObject.GlobalPath;
                $scope.isValidateSuccses = angular.undefined;
                $scope.pathChanged = true;
                $scope.buttons[1].disabled = true;
            }

        } else {
            if (angular.isUndefined($scope.repObject.SMBData)) {
                $scope.repObject.SMBData = {};
            }

            if ($scope.repObject.SMBData.PathToFolder !== $scope.repObject.GlobalPath) {
                $scope.repObject.SMBData.PathToFolder = $scope.repObject.GlobalPath;
                $scope.isValidateSuccses = angular.undefined;
                $scope.pathChanged = true;
                $scope.buttons[1].disabled = true;
            }
        }

        $scope.validateFieldsNotEmpty();
    };

    //click event on bucket aws drop down
    $scope.bucketListClicked = function(){
        if (!angular.isDefined($scope.awsBucketPotentials) && $scope._isAwsKeysNotEmpty()) {//check if already clicked
            getPotentialsBucketList();
        }
    };

    $scope.$watch('repObject.RepositoryTypeObject', function (type, oldType) {
        if (angular.isDefined(type)) {
            if (type.value === enums.BackupTargetType.Local) {
                $scope.isSMBData = false;
                $scope.isAws = false;
                $scope.repObject.RepositoryType = enums.BackupTargetType.Local;

                //remove unnecessary data
                delete $scope.repObject.AWSData;
                delete $scope.repObject.SMBData;

            }else if (type.value === enums.BackupTargetType.AmazonS3) {
                $scope.isAws = true;
                $scope.isSMBData = false;
                $scope.repObject.RepositoryType = enums.BackupTargetType.AmazonS3;

                //remove unnecessary data
                delete $scope.repObject.LocalData;
                delete $scope.repObject.SMBData;


            } else {
                $scope.isAws = false;
                $scope.isSMBData = true;
                $scope.repObject.RepositoryType = enums.BackupTargetType.ServerMessageBlock;

                //remove unnecessary data
                delete $scope.repObject.LocalData;
                delete $scope.repObject.AWSData;
            }
            if (type !== oldType) {
                $scope.isValidateSuccses = angular.undefined;
                $scope.pathChanged = true;
                $scope.buttons[1].disabled = true;
            }
            $scope.changePath();
        }
    });

//mapping repObject to send just properties needed
    var createRepObject = function(){
        if ($scope.repObject.RepositoryType === enums.BackupTargetType.AmazonS3) {
            var mapRepObject = {
                AWSData: $scope.repObject.AWSData,
                IsCompressionEnabled: false,//for aws is disabled always
                IsDefault: $scope.repObject.IsDefault,
                RepositoryType: $scope.repObject.RepositoryType,
                RepositoryTypeObject: $scope.repObject.RepositoryTypeObject
            };

            if(angular.isDefined($scope.repObject.DisplayName)){
                mapRepObject.DisplayName = $scope.repObject.DisplayName;
            }
            if(angular.isDefined($scope.repObject.GlobalPath)){
                mapRepObject.GlobalPath = $scope.repObject.GlobalPath;
            }
            return mapRepObject;
        }
        return $scope.repObject;
    };

    //function that get potensials bucket list from Amazon AWS
    var getPotentialsBucketList = function () {
        //============== mock keys ==============//
        //$scope.repObject.AWSData.AccessKey = 'AKIAILNCFOZW4CPC52FQ';
        //$scope.repObject.AWSData.SecretKey = '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';
        //=======================================//
        $scope.bucketLoading = true;

        zertoServiceFactory.GetListOfStorages(createRepObject()).then(function (result) {
            $scope.awsBucketPotentials = result;
            $scope.bucketLoading = false;
            $scope.repObject.AWSData.Bucket = result[0];
        }, function (error) {
            zAlertFactory.fail('', $scope.translations['EDIT_REP.VALIDATE_FAILED'] + error.faultString);
            $scope.isValidateSuccses = false;
            $scope.bucketLoading = false;
        });
    };

    $scope.setPieChartValues = function (capacity, freeSpace) {
        if (freeSpace === 0 && capacity === 0) {
            $scope.isPieChartEmpty = true;
            return;
        }
        $scope.isPieChartEmpty = false;
        var freeSpacePercent = Math.floor((freeSpace * 100) / capacity);
        var usedPercent = 100 - freeSpacePercent;

        $scope.pieData = [
            {
                'chunk': freeSpacePercent,
                'label': freeSpacePercent + '%'
            },
            {
                'chunk': usedPercent,
                'label': usedPercent + '%'
            }
        ];
    };

    $scope.translations = $translate.instant(['MODAL.OK', 'MODAL.CANCEL', 'MODAL.SAVE', 'EDIT_REP.VALIDATE', 'EDIT_REP.VALIDATE_SUCCESS',
        'EDIT_REP.VALIDATE_FAILED', 'EDIT_REP.VALIDATE_CREATE', 'EDIT_REP.PATH_CHANGE', 'EDIT_REP.ALERT_CHECKBOX',
        'EDIT_REP.TITLE_NEW', 'EDIT_REP.TITLE_EDIT', 'REPOSITORY_LIST.LOCAL', 'REPOSITORY_LIST.SMB', 'REPOSITORY_LIST.AWS']);


    $scope.popupTitle = isNew ? $scope.translations['EDIT_REP.TITLE_NEW'] : $scope.translations['EDIT_REP.TITLE_EDIT'];
    $scope.initRepTypes();
    $scope.initButtons();
    $scope.initEditor();
    $scope.loading = false;

});
