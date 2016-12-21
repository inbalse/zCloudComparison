'use strict';
describe('Sites list model', function () {
    var testScope, sitesListModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $rootScope, _sitesListModel_) {
        testScope = $rootScope.$new();
        sitesListModel = _sitesListModel_;

    }));

    function mockData() {
        var data = {TaskItems: []};

        var item1 = {'VpgScreenState': {'ActiveProcesses': {'RunningFailOverTest': {'StopEnabled': true}}}, 'RelatedEntities': [
            {Name: 'VPG1', ProtectionGroupId: '4734783487', hostIdentifier: ''}
        ], 'StateAndProgress': {'CurrentState': 2, 'Progress': 100}, 'TaskId': '11111', 'TaskType': 4, Started: new Date('2014-07-22 10:30:20'),
            Completed: new Date('2014-07-22 12:30:20')};

        data.TaskItems.push(item1);
        return data;
    }

    it("should return proper version numbers", function () {
        var siteVersion = {'Branch': 'engineering', Major: 2, Minor: 0, Update: 5};
        var result = sitesListModel._versionToString(siteVersion);
        expect(result).toEqual('2.0 U5 ');
    });

    it("should return proper version numbers", function () {
        var siteVersion = {'Branch': 'engineering', Major: 2, Minor: 0, Update: 0};
        var result = sitesListModel._versionToString(siteVersion);
        expect(result).toEqual('2.0  ');
    });

    it("should return proper version numbers", function () {
        var siteVersion = {'Branch': 'engineering', Major: 2, Minor: 0, Update: 31};
        var result = sitesListModel._versionToString(siteVersion);
        expect(result).toEqual('2.0 U3 P1');
    });

    it("should return proper version numbers", function () {
        var siteVersion = {'Branch': 'engineering', Major: 2, Minor: 0, Update: 101};
        var result = sitesListModel._versionToString(siteVersion);
        expect(result).toEqual('2.0 U10 P1');
    });

});
