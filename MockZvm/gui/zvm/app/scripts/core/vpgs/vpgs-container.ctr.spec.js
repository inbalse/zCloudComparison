'use strict';

describe('VPGS container controller', function () {
    var scope, vpgsContainerController, vpgsContainerService, summaryMinimalModel, globalStateModel, analyticsEventsTypes;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $controller, _vpgsContainerService_, _summaryMinimalModel_, _globalStateModel_, _analyticsEventsTypes_) {
        scope = $rootScope.$new();
        vpgsContainerService = _vpgsContainerService_;
        summaryMinimalModel = _summaryMinimalModel_;
        globalStateModel = _globalStateModel_;
        analyticsEventsTypes = _analyticsEventsTypes_;
        globalStateModel.data = {
            IsPortal: false
        };
        vpgsContainerController = $controller("vpgsContainerController", {
            $scope: scope,
            vpgsContainerService: vpgsContainerService,
            summaryMinimalModel: summaryMinimalModel
        });
    }));

    it('should have props defined', function () {
        expect(vpgsContainerController.selectedItems).toBeArray();
        expect(typeof vpgsContainerController.isPortal).toEqual('boolean');
        expect(vpgsContainerController.groupByValues).toBeArray();
    });

    it('should call create vpg', function () {
        spyOn(vpgsContainerService, 'createVPG');
        vpgsContainerController.onNewVPGClick();
        expect(vpgsContainerService.createVPG).toHaveBeenCalled();
    });

    it('should call export', function () {
        spyOn(vpgsContainerService, 'export');
        vpgsContainerController.handleExportClick();
        expect(vpgsContainerService.export).toHaveBeenCalled();
    });

    it('should call edit vpg', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];
        spyOn(vpgsContainerService, 'editVPG');
        vpgsContainerController.onVPGEditClick();
        expect(vpgsContainerService.editVPG).toHaveBeenCalledWith(1);
    });

    it('should pause vpgs', function () {
        var selectedItems = [{Identifier: 1}, {Identifier: 2}];
        vpgsContainerController.selectedItems = selectedItems;
        spyOn(vpgsContainerService, 'pauseVPGs');
        vpgsContainerController.onPauseClick();
        expect(vpgsContainerService.pauseVPGs).toHaveBeenCalledWith(selectedItems);
    });

    it('should call force sync', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];
        spyOn(vpgsContainerService, 'forceSync');
        vpgsContainerController.onForceSyncClick();
        expect(vpgsContainerService.forceSync).toHaveBeenCalledWith(1);
    });

    it('should resume vpgs', function () {
        var selectedItems = [{Identifier: 1}, {Identifier: 2}];
        vpgsContainerController.selectedItems = selectedItems;
        spyOn(vpgsContainerService, 'resumeVPGs');
        vpgsContainerController.onResumeClick();
        expect(vpgsContainerService.resumeVPGs).toHaveBeenCalledWith(selectedItems);
    });

    it('should stop backup', function () {
        var selectedItems = [{Identifier: 1}, {Identifier: 2}];
        vpgsContainerController.selectedItems = selectedItems;
        spyOn(vpgsContainerService, 'stopBackup');
        vpgsContainerController.onStopBackupClick();
        expect(vpgsContainerService.stopBackup).toHaveBeenCalledWith(selectedItems);
    });

    it('should run backup', function () {
        var selectedItems = [{Identifier: 1}, {Identifier: 2}];
        vpgsContainerController.selectedItems = selectedItems;
        spyOn(vpgsContainerService, 'runBackup');
        vpgsContainerController.onRunBackupClick();
        expect(vpgsContainerService.runBackup).toHaveBeenCalledWith(selectedItems);
    });

    it('should call delete vpg', function () {
        var selectedItems = [{Identifier: 1}];
        vpgsContainerController.selectedItems = selectedItems;
        spyOn(vpgsContainerService, 'deleteVPG');
        vpgsContainerController.onDeleteButtonClick();
        expect(vpgsContainerService.deleteVPG).toHaveBeenCalledWith(selectedItems[0]);
    });

    it('should stop failover', function () {
        var selectedItems = [{Identifier: 1}, {Identifier: 2}];
        vpgsContainerController.selectedItems = selectedItems;
        spyOn(vpgsContainerService, 'stopFailOverTest');
        vpgsContainerController.onStopFailOverTestClick();
        expect(vpgsContainerService.stopFailOverTest).toHaveBeenCalledWith(selectedItems);
    });

    it('should check button state and set selected vpgss', function () {
        var selectedItems = [{Identifier: 1}, {Identifier: 2}];
        vpgsContainerController.selectedItems = selectedItems;

        spyOn(vpgsContainerService, 'checkActionButtonsState');
        spyOn(vpgsContainerService, 'setSelectedVPGIds');
        spyOn(scope, '$digest');

        vpgsContainerController.selectedItemsChange();

        expect(vpgsContainerService.checkActionButtonsState).toHaveBeenCalledWith(selectedItems);
        expect(vpgsContainerService.setSelectedVPGIds).toHaveBeenCalledWith(selectedItems);
        expect(scope.$digest).toHaveBeenCalled();
    });

    it('should check vpg creation enabled', function () {
        var result = {
            SummaryState: {
                IsGeneralCreateVPGEnabled: true
            }
        };
        vpgsContainerController.onResult(result);
        expect(vpgsContainerController.isCreateVPGEnabled).toEqual(true);
        result.SummaryState.IsGeneralCreateVPGEnabled = false;
        vpgsContainerController.onResult(result);
        expect(vpgsContainerController.isCreateVPGEnabled).toEqual(false);

    });

    it('should check button state on vpgs received', function () {
        var selectedItems = {
            ProtectionGroups: [{Identifier: 1, State: {ButtonsState: {}, ActiveProcesses: {}}}, {
                Identifier: 2,
                State: {ButtonsState: {}, ActiveProcesses: {}}
            }]
        };
        spyOn(vpgsContainerService, 'checkActionButtonsState').and.callThrough();

        vpgsContainerController.updateBtnState(selectedItems);
        expect(vpgsContainerService.checkActionButtonsState).toHaveBeenCalledWith(selectedItems.ProtectionGroups);
        expect(typeof vpgsContainerController.btnState).toEqual('object');

    });

    it('verify that new VPG triggers an google analytics event', function () {
        spyOn(scope, '$emit');
        vpgsContainerController.onNewVPGClick();
        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.NEW_VPG.INITIAL);
    });

    it('verify that edit VPG triggers an google analytics event', function () {
        spyOn(scope, '$emit');
        vpgsContainerController.selectedItems = [{Identifier: 1}];
        vpgsContainerController.onVPGEditClick();
        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.EDIT_VPG.INITIAL);
    });

    it('verify that delete VPG triggers an google analytics event', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];

        spyOn(scope, '$emit');
        spyOn(vpgsContainerService, 'deleteVPG').and.callFake(function () {
        });

        vpgsContainerController.onDeleteButtonClick();

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.DELETE_VPG);
    });

    it('verify that pause VPG triggers an google analytics event', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];

        spyOn(scope, '$emit');

        vpgsContainerController.onPauseClick();

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.PAUSE_VPG);
    });

    it('verify that resume VPG triggers an google analytics event', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];

        spyOn(scope, '$emit');

        vpgsContainerController.onResumeClick();

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.RESUME_VPG);
    });

    it('verify that ForceSync VPG triggers an google analytics event', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];

        spyOn(scope, '$emit');

        vpgsContainerController.onForceSyncClick();

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.FORCE_SYNC);
    });

    it('verify that Run-Backup VPG triggers an google analytics event', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];

        spyOn(scope, '$emit');

        vpgsContainerController.onRunBackupClick();

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.RUN_BACKUP);
    });

    it('verify that Abort-Backup VPG triggers an google analytics event', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];

        spyOn(scope, '$emit');

        vpgsContainerController.onStopBackupClick();

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.ABORT_BACKUP);
    });

    it('verify that Stop-Test VPG triggers an google analytics event', function () {
        vpgsContainerController.selectedItems = [{Identifier: 1}];

        spyOn(scope, '$emit');

        vpgsContainerController.onStopFailOverTestClick();

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.VPGS.STOP_TEST);
    });
});
