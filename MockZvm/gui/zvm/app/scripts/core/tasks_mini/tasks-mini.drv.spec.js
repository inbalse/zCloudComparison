describe("Tasks mini directive", function () {
    var scope, element, summaryMinimalModel;

    beforeEach(module('templates'));

    beforeEach(module("uib/template/progressbar/progressbar.html"));

    beforeEach(module('zvmTest', function($provide) {
        summaryMinimalModel = jasmine.createSpyObj('summaryMinimalModel', ['register']);
        summaryMinimalModel.register.and.returnValue({then: function () {}});

        $provide.value('summaryMinimalModel', summaryMinimalModel);
    }));

    beforeEach(inject(function ($rootScope, $compile) {
        element = $compile('<tasks-mini></tasks-mini>')($rootScope.$new());
        // directive creats its own scope, need to save it.
        scope = element.scope();
        scope.$digest();
        scope = scope.$$childHead;
    }));

    it("Test the return values", function () {
        scope.TaskSummary = {RunningTasksCount: 2, WaitingTasksCount: 3};
        scope.handleUpdateData();
        expect(scope.runningText).toBe('3 TASK_AWAITING_INPUT');
    });
});
