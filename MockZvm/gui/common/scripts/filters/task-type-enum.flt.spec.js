//TODO : fix task type enum filter test
xdescribe("Task type enum filter", function () {

    //beforeEach(module('zvmApp.zvmTest'));
    //beforeEach(module('zvmApp.services'));

    beforeEach(module('zvmTest'));

    it('should return string value for enum', inject(function(taskTypeEnum, enums){
        //expect(taskTypeEnumFilter(enums.ExtensionTask_ZCommand.CreateProtectionGroup)).toEqual('Creating the VPG');
        for(propName in enums.ExtensionTask_ZCommand){
            expect(typeof(taskTypeEnum(enums.ExtensionTask_ZCommand[propName]))).toEqual('string');
        }

    }));
});
