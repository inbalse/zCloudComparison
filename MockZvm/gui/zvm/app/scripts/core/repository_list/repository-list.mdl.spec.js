'use strict';

describe('Repository list model', function () {
    var testScope, repositoryListModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $rootScope, _repositoryListModel_) {
        testScope = $rootScope.$new();
        repositoryListModel = _repositoryListModel_;

    }));

    function mockData() {
       var data = {"BackupTargets":[{"ConnectivityState":0,"RestorePoints":{"NumberOfSuccessfullRuns":10,"TotalNumberOfRuns":20},
                "ActiveJobs":0,"IsEdit":true,"IsDelete":true,
                "ID":{"Identifier":"8d670671-b4fd-4e13-b0de-3969ce84b3a7"},"DisplayName":"guy","IsCompressionEnabled":false,"RepositoryType":0,"SMBData":null,
                "LocalData":{"Path":"c:\\tmp"},"Capacity":238473,"FreeSpace":80473,"IsDefault":false}],"IsAddEnabled":true};
        return data;
    }

    it("should check normal path ", function () {
        var data = {'RepositoryType': 0, 'LocalData':{'Path':'c:\tmp'}};

        var result = repositoryListModel._getPathFromRepository(data);
        expect(result).toEqual('c:\tmp');
    });

    it("should check normal path ", function () {
        var data = {'RepositoryType': 1, 'SMBData':{'PathToFolder':'192.168.126.23'}};

        var result = repositoryListModel._getPathFromRepository(data);
        expect(result).toEqual('192.168.126.23');
    });

    it("should check connectivity state", function () {
        expect(repositoryListModel._getConnectivityState(0)).toEqual('REPOSITORY_LIST.CONNECTED');
        expect(repositoryListModel._getConnectivityState(1)).toEqual('REPOSITORY_LIST.DISCONNECTED');
    });

    it("should check the processdata function", function () {
        var result = repositoryListModel.processData(mockData());
        expect(result.BackupTargets[0].PathText).toEqual('c:\\tmp');
        expect(result.BackupTargets[0].CapacityObj.display).toEqual('232.9 GB');
        expect(result.BackupTargets[0].FreeSpaceObj.display).toEqual('78.6 GB');
        expect(result.BackupTargets[0].RestorePoints.display).toEqual('10/20');
        expect(result.BackupTargets[0].ConnectivityStateDisplay).toEqual('REPOSITORY_LIST.CONNECTED');
    });
});