'use strict';

describe('Edit repository dialog controller', function () {
    var controller, testScope, enums, repository;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _enums_) {
        testScope = $rootScope.$new();
        enums = _enums_;

        repository = {"ConnectivityState": 0, "RestorePoints": {"NumberOfSuccessfullRuns": 0, "TotalNumberOfRuns": 0}, "ActiveJobs": 0, "IsEdit": true, "IsDelete": true, "ID": {"Identifier": "27911c2f-503f-4599-baf7-10892e2c6a08"}, "DisplayName": "guy", "IsCompressionEnabled": true, "RepositoryType": 0, "SMBData": null, "LocalData": {"Path": "c:\\tmp"}, "Capacity": 238473, "FreeSpace": 95039, "IsDefault": true};
        controller = $controller('repositoryEditController', {$scope: testScope,  isNew: true, repository: repository});
    }));

    it("should have function defined", function () {
        expect(testScope.close).toBeDefined();
        expect(testScope.pathCheckHandler).toBeDefined();
        expect(testScope.save).toBeDefined();
        expect(testScope.validate).toBeDefined();
        expect(testScope._createHandler).toBeDefined();
        expect(testScope._getFolder).toBeDefined();
        expect(testScope.initEditor).toBeDefined();
        expect(testScope._validateBackupResult).toBeDefined();
        expect(testScope.changeName).toBeDefined();
        expect(testScope.setPieChartValues).toBeDefined();
        expect(testScope.validate).toBeDefined();
        expect(testScope.changeUserName).toBeDefined();
        expect(testScope.changePassword).toBeDefined();
        expect(testScope.changeAccessKey).toBeDefined();
        expect(testScope.changeSecretKey).toBeDefined();
        expect(testScope.changeBucket).toBeDefined();

    });

    it("should check properties defined", function () {
        expect(testScope.loading).toBeDefined();
        expect(testScope.validationButtonState).toBeDefined();
        expect(testScope.forms).toBeDefined();
        expect(testScope.bucketListClicked).toBeDefined();
        expect(testScope.isValidateSuccses).not.toBeDefined();
        expect(testScope.repObject).toBeDefined();
        expect(testScope.repTypes[0].value).toEqual(enums.BackupTargetType.Local);
        expect(testScope.repTypes[1].value).toEqual(enums.BackupTargetType.ServerMessageBlock);
       //expect(testScope.repTypes[2].value).toEqual(enums.BackupTargetType.AmazonS3);//todo return back when AWS repository be available
        expect(testScope.pathChanged).toBeFalsy();
        expect(testScope.originalPath).toEqual('');
    });

    it("should test the initEditor function", function () {
        testScope.initEditor();
        expect(testScope.repObject.RepositoryTypeObject).toEqual(testScope.repTypes[1]);
        expect(testScope.repObject.RepositoryType).toEqual(enums.BackupTargetType.ServerMessageBlock);
        expect(testScope.isSMBData).toBeTruthy();
        expect(testScope.repObject.IsDefault).toBeFalsy();
        expect(testScope.repObject.IsCompressionEnabled).toBeTruthy();
    });

    //aws  //todo return back when AWS repository be available
    //it("should check the change of the rep type selection", function () {
    //    testScope.repObject.RepositoryTypeObject = testScope.repTypes[2];
    //    testScope.$digest();
    //    expect(testScope.isSMBData).toBeFalsy();
    //    expect(testScope.isAws).toBeTruthy();
    //    expect(testScope.repObject.RepositoryType).toEqual(enums.BackupTargetType.AmazonS3);
    //});
    //
    ////aws
    //it("should check validation field function when property is empty", function () {
    //    testScope.repObject.RepositoryTypeObject = testScope.repTypes[2];
    //    testScope.$digest();
    //    testScope.validateFieldsNotEmpty(testScope.result);
    //
    //    expect(testScope.validationButtonState).toBeTruthy();
    //    expect(testScope.repObject.RepositoryType).toEqual(enums.BackupTargetType.AmazonS3);
    //});
    //
    ////aws
    //it("should check validation field function when property is full", function () {
    //    testScope.repObject.RepositoryTypeObject = testScope.repTypes[2];
    //
    //    //mock aws obj
    //    testScope.repObject.DisplayName = 'aws test';
    //    testScope.repObject.GlobalPath = 'c:\some\where';
    //    testScope.repObject.AWSData = {
    //        AccessKey: 'aws12gg24',
    //        SecretKey: 'pl+22fd',
    //        Bucket: 'test bucket aws'
    //    };
    //
    //    testScope.$digest();
    //    testScope.validateFieldsNotEmpty(testScope.result);
    //
    //    expect(testScope.validationButtonState).toBeFalsy();
    //    expect(testScope.repObject.RepositoryType).toEqual(enums.BackupTargetType.AmazonS3);
    //});
    //
    ////aws
    //it("should check _isAwsKeysNotEmpty function", function(){
    //
    //    //empty keys
    //    testScope.repObject.AWSData = {};
    //    expect(testScope._isAwsKeysNotEmpty()).toBeFalsy();
    //
    //    //full keys
    //    testScope.repObject.AWSData = {
    //        AccessKey: 'aws12gg24',
    //        SecretKey: 'pl+22fd'
    //    };
    //
    //    expect(testScope._isAwsKeysNotEmpty()).toBeTruthy();
    //});

    it("should check the change of the rep type selection", function () {
        testScope.repObject.RepositoryTypeObject = testScope.repTypes[0];
        testScope.$digest();
        expect(testScope.isSMBData).toBeFalsy();
        expect(testScope.repObject.RepositoryType).toEqual(enums.BackupTargetType.Local);
    });

    it("should check the path changed event with local path", function () {
        spyOn(testScope, 'setPieChartValues');
        testScope.repObject.RepositoryTypeObject = testScope.repTypes[0];
        testScope.repObject.GlobalPath = 'c:\tmp';
        testScope.changePath();
        expect(testScope.freeSpace).toBeNull();
        expect(testScope.usedSpace).toBeNull();
        expect(testScope.capacity).toBeNull();
        expect(testScope.setPieChartValues).toHaveBeenCalledWith(0, 0);
        expect(testScope.pathChanged).toBeTruthy();
        expect(testScope.buttons[1].disabled).toBeTruthy();
        expect(testScope.repObject.LocalData.Path).toEqual('c:\tmp');
    });

    it("should test an edited repository", function () {
        testScope.isNew = false;
        repository = {"ConnectivityState": 0, "RestorePoints": {"NumberOfSuccessfullRuns": 0, "TotalNumberOfRuns": 0}, "ActiveJobs": 0, "IsEdit": true, "IsDelete": true, "ID": {"Identifier": "27911c2f-503f-4599-baf7-10892e2c6a08"}, "DisplayName": "guy", "IsCompressionEnabled": true, "RepositoryType": 0, "SMBData": null, "LocalData": {"Path": "c:\\tmp"}, "Capacity": 238473, "FreeSpace": 95039, "IsDefault": true};
        testScope.initEditor();
        expect(testScope.capacity).toEqual('232.9 GB');
        expect(testScope.freeSpace).toEqual('92.8 GB');
        expect(testScope.repObject.GlobalPath).toEqual('c:\\tmp');
        expect(testScope.repObject.RepositoryTypeObject).toEqual(testScope.repTypes[0]);
        expect(testScope.originalPath).toEqual(testScope.repObject.GlobalPath);
        expect(testScope.pathChanged).toBeFalsy();
        expect(testScope.buttons[1].disabled).toBeTruthy();
    });

    describe('validation of backup settings', function () {

        beforeEach(function () {
            testScope.result = {"IsAvailable":false,"ErrorMsg":"invalid folder path structure. path=f must either start with a drive letter followed by ':' or start with '\\'","IsFolderExist":false,"TotalSpaceInMB":0,"FreeSpaceInMB":0};
        });

        it("should test an result is null", function () {
            testScope.result = null;
            testScope._validateBackupResult(testScope.result);
            expect(testScope.isValidateSuccses).toBeFalsy();
        });

        it("should test an validation available fail", function () {
            testScope._validateBackupResult(testScope.result);
            expect(testScope.result.IsAvailable).toBeFalsy();
            expect(testScope.result.IsFolderExist).toBeFalsy();
            expect(testScope.isValidateSuccses).toBeFalsy();
        });

        it("should test an validation folder exist fail", function () {
            testScope.repObject.SMBData = {};
            testScope.repObject.SMBData.PathToFolder = '';
            testScope.result.IsAvailable = true;

            testScope._validateBackupResult(testScope.result);
            expect(testScope.result.IsAvailable).toBeTruthy();
            expect(testScope.result.IsFolderExist).toBeFalsy();
            expect(testScope.isValidateSuccses).toBeFalsy();
        });


        //aws
        it("should test an validation AWS folder exist fail", function () {
            testScope.repObject.AWSData = {};
            testScope.repObject.AWSData.PathToFolder = '';
            testScope.result.IsAvailable = true;
            testScope.result.RepositoryType = 2;
            testScope.$digest();

            testScope._validateBackupResult(testScope.result);
            expect(testScope.result.IsAvailable).toBeTruthy();
            expect(testScope.result.IsFolderExist).toBeFalsy();
            expect(testScope.isValidateSuccses).toBeFalsy();
        });

        it("should test an validation success", function () {
            testScope.result = {
                FreeSpaceInMB: 158602,
                TotalSpaceInMB: 228434,
                IsAvailable: true,
                IsFolderExist: true
            };

            testScope._validateBackupResult(testScope.result);
            expect(testScope.result.IsAvailable).toBeTruthy();
            expect(testScope.result.IsFolderExist).toBeTruthy();
            expect(testScope.result.FreeSpaceInMB).toEqual(158602);
            expect(testScope.result.TotalSpaceInMB).toEqual(228434);
            expect(testScope.isValidateSuccses).toBeTruthy();
            expect(testScope.pathChanged).toBeFalsy();
            expect(testScope.buttons[1].disabled).toBeFalsy();
            expect(testScope.capacity).toEqual('223.1 GB');
            expect(testScope.freeSpace).toEqual('154.9 GB');
            expect(testScope.usedSpace).toEqual('68.2 GB');
        });
    });
});
