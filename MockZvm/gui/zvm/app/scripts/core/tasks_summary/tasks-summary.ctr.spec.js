describe("Tasks summary controller", function () {
    var trans;
    var ctrl, testScope, vos, tasksFactory;
    var flrItemStateMounted = {
        VpgScreenState: {
            ActiveProcesses: {
                RunningMounting: {
                    StopEnabled: false
                }
            }
        },
        RelatedEntities: [{Name: 'VPG2', ProtectionGroupId: '4734783487', hostIdentifier: ''}],
        StateAndProgress: {
            CurrentState: 5,
            Progress: 100
        },
        TaskId: {
            Identifier: '41215'
        },
        TaskType: 63,
        SessionId: 12345,
        Started: new Date('2014-07-21 10:30:20')
    };
    var flrItemStateUnMounted = {
        VpgScreenState: {
            ActiveProcesses: {
                RunningMounting: {
                    StopEnabled: false
                }
            }
        },
        RelatedEntities: [{Name: 'VPG2', ProtectionGroupId: '4734783487', hostIdentifier: ''}],
        StateAndProgress: {
            CurrentState: 1,
            Progress: 25
        },
        TaskId: {
            Identifier: '41214'
        },
        TaskType: 63,
        SessionId: 12345,
        Started: new Date('2014-07-22 10:30:20')
    };


    beforeEach(module('zvmTest', function ($provide) {

        summaryTasksModel = jasmine.createSpyObj('summaryTasksModel', ['register']);
        summaryTasksModel.register.and.returnValue({
            then: function () {
            }
        });

        $provide.value('summaryTasksModel', summaryTasksModel);

    }));

    beforeEach(inject(function ($rootScope, $controller, _vos_, _tasksFactory_) {
        testScope = $rootScope.$new();
        vos = _vos_;
        tasksFactory = _tasksFactory_;

        ctrl = $controller('tasksSummaryController',
            {
                $scope: testScope,
                $translate: trans,
                tasksSummaryFactory: {
                    hidePanel: function () {
                    },
                    modalInstance: {
                        opened: {
                            then: function () {

                            }
                        },
                        dismiss: {
                            then: function () {

                            }
                        }
                    }
                }
            });
    }));

    trans = function (value) {
        return {
            then: function (resolve) {
                return resolve({});
            }
        }
    };

    it("should return empty TaskItems on load", function () {
        expect(testScope.TaskItems.length).toEqual(0);
    });

    it("should success add tasks to list", function () {
        testScope.TaskItems.push(flrItemStateMounted);
        testScope.TaskItems.push(flrItemStateUnMounted);
        expect(testScope.TaskItems.length).toEqual(2);
    });
});
