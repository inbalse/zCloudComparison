'use strict';

describe('Create checkpoint controller', function () {
    var controller, testScope, vpgsContainerService, vpgsListModel, vmsListModel, testCreateCheckpointFactory, testzAlertFactory, vos;


    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, zAlertFactory, _vos_, _vpgsListModel_, _vmsListModel_, _vpgsContainerService_) {
        testScope = $rootScope.$new();
        testzAlertFactory = zAlertFactory;
        vos = _vos_;
        vpgsListModel = _vpgsListModel_;
        vmsListModel = _vmsListModel_;
        vpgsContainerService = _vpgsContainerService_;

        testCreateCheckpointFactory = jasmine.createSpyObj('createCheckpointFactory', ['getData', 'sendData']);
        testCreateCheckpointFactory.getData.and.returnValue({
            then: function (resolve) {
                var result = new vos.MinimalVPGListVisualObject();
                var item = new vos.MinimalVPGListItem();
                item.Identifier = new vos.ProtectionGroupIdentifier("id");
                item.State = new vos.VPGDetailsScreenState();
                item.State.IsInsertCheckpointEnabled = true;
                result.ProtectionGroups = [item];

                return resolve(result);
            }
        });

        controller = $controller('createCheckpointController', {
            $scope: testScope,
            createCheckpointFactory: testCreateCheckpointFactory,
            zAlertFactory: testzAlertFactory,
            vpgsListModel: vpgsListModel,
            vmsListModel: vmsListModel,
            vpgsContainerService: vpgsContainerService
        });
    }));

    it('should have loading that is set to true as default', function () {
        expect(testScope.loading).toBeTruthy();
    });

    it('should have none selected items', function () {
        //pre select from vpgs list
        var selectedVPGs = vpgsContainerService.getSelectedVPGIds();
        if (!_.isEmpty(selectedVPGs)) {
            expect(testScope.selectedItems.length).toNotBe(0);
        } else {
            expect(testScope.selectedItems.length).toBe(0);
        }
        //pre select from vms list
        if (vmsListModel.selectedVmsIdentity.length) {
            expect(testScope.selectedItems.length).toNotBe(0);
        } else {
            expect(testScope.selectedItems.length).toBe(0);
        }
    });

    it('should have a helper funciton for creating a collection to send to the zvm', function () {
        expect(testScope.createTaggedCheckpointsCollection).toBeDefined();
        var item = new vos.MinimalVPGListItem();
        item.Identifier = new vos.ProtectionGroupIdentifier();
        item.Identifier.GroupGuid = "123456789";

        var name = "test name";

        var result = testScope.createTaggedCheckpointsCollection([item], name);
        expect(result.length).toBe(1);
        expect(result[0].Tag).toBe(name);
        expect(result[0].ProtectionGroupIdentifier.GroupGuid).toBe(item.Identifier.GroupGuid);
    });

    it('should disable save button - no items selected & no checkpoint name', function () {
        testScope.forms.addCheckpointForm = {'$valid': false};

        testScope.selectedItems.length = 0;//no items selected
        testScope.forms.addCheckpointForm.$valid = false;//the user did not add any input to the name of the checkpoint
        testScope.disableButtons();//check buttons
        expect(testScope.sendButton.disabled).toBeTruthy();//expect disable to be true
    });

    it('should disable save button - 1 item selected & no checkpoint name', function () {
        testScope.forms.addCheckpointForm = {'$valid': false};

        testScope.selectedItems.length = 1;//1 item selected
        testScope.forms.addCheckpointForm.$valid = false;//the user did not add any input to the name of the checkpoint
        testScope.disableButtons();//check buttons
        expect(testScope.sendButton.disabled).toBeTruthy();//expect disable to be true
    });

    it('should disable save button - no items selected & added checkpoint name', function () {
        testScope.forms.addCheckpointForm = {'$valid': false};

        testScope.selectedItems.length = 0;//no items selected
        testScope.forms.addCheckpointForm.$valid = true;//user added only checkpoint name
        testScope.disableButtons();//check buttons
        expect(testScope.sendButton.disabled).toBeTruthy();//expect disable to be true
    });

    it('should enable save button', function () {
        testScope.forms.addCheckpointForm = {'$valid': true};
        testScope.selectedItems.length = 1;//1 item selected
        testScope.disableButtons();//check buttons
        expect(testScope.sendButton.disabled).toBeFalsy();//expect disable to be false
    });

});
