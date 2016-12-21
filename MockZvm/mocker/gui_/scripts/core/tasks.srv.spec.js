describe("Tasks Service", function () {
    var tasksService;

    beforeEach(module('zvmTest'));

    beforeEach(function(){
        module('zvmApp.core');

        inject(function(_tasksService_) {
            tasksService = _tasksService_;
        });


    });
    it("verify setState sets the right state for each task", function(){
        //todo
    });


});
