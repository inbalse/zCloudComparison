describe('Tasks list model', function () {
    var testScope, tasksListModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $rootScope, _tasksListModel_) {
        testScope = $rootScope.$new();
        tasksListModel = _tasksListModel_;

    }));

    function mockData() {
        var started = new Date(2014, 6, 22, 10, 30, 20);
        var completed = new Date(2014, 6, 22, 12, 30, 20);

        data = {TaskItems: []};

        var item1 = {
            'VpgScreenState': {'ActiveProcesses': {'RunningFailOverTest': {'StopEnabled': true}}},
            'RelatedEntities': [
                {Name: 'VPG1', ProtectionGroupId: '4734783487', hostIdentifier: ''}
            ],
            'StateAndProgress': {'CurrentState': 2, 'Progress': 100},
            'TaskId': '11111',
            'TaskType': 4,
            Information: 'Test info',
            Started: started,
            Completed: completed
        };

        data.TaskItems.push(item1);
        return data;
    }

    it("should check function defined", function () {
        var result = tasksListModel._processData(mockData());
        expect(result.TaskItems[0].StatusText).toEqual('ENUM.TASK_STATUS.2');
        expect(result.TaskItems[0].TaskTypeName).toEqual('Failover test');

    });
});
