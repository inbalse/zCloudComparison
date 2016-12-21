'use strict';

describe('createVPGControllerTest', function () {
    var scope, model, controller, factory, VPGWizardStepStates, stepId, $translate,
        allSteps, analyticsEventsTypes, guiVisibleException, zAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zAlertFactory_, _createVPGModel_, _VPGWizardStepStates_, _stepId_, _$translate_, _analyticsEventsTypes_, _guiVisibleException_) {
        scope = $rootScope.$new();
        model = _createVPGModel_;
        VPGWizardStepStates = _VPGWizardStepStates_;
        analyticsEventsTypes = _analyticsEventsTypes_;
        guiVisibleException = _guiVisibleException_;
        zAlertFactory = _zAlertFactory_;
        stepId = _stepId_;
        $translate = _$translate_;
        factory = jasmine.createSpyObj('createVPGFactory', ['closeModal', 'dismissModal']);

        model.data = {};
        spyOn(scope, '$on').and.callFake;
        spyOn(scope, '$emit').and.callFake;
        spyOn(model, 'checkDefaultFolder').and.callFake;
        spyOn(model, 'sendCreateVPG').and.callThrough();
        spyOn(model, 'sendUpdateVPG').and.callThrough();
        spyOn(zAlertFactory, 'warn').and.callFake;
        spyOn(zAlertFactory, 'fail').and.callFake;

        controller = $controller('createVPGController', {
            $scope: scope, createVPGFactory: factory, zAlertFactory: zAlertFactory, steps: function () {
                return []
            }, createVPGModel: model, title: function () {
                return 'Create VPG'
            }
        });

        allSteps = [
            {
                class: '',
                id: stepId.INIT,
                isEnabled: false,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_GENERAL'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/initial/create-vpg-initial.html\'"></ng-include>',
            },
            {
                class: '',
                id: stepId.VMS,
                isEnabled: false,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_VMS'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/vms/create-vpg-select-vms.html\'"></ng-include>',
            },
            {
                class: '',
                isEnabled: false,
                id: stepId.REPLICATION,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_REPLICATION'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/replication/create-vpg-replication.html\'"></ng-include>'
            },
            {
                class: '',
                isEnabled: false,
                id: stepId.STORAGE,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_STORAGE'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/storage/create-vpg-storage.html\'"></ng-include>'
            },
            {
                class: '',
                isEnabled: false,
                id: stepId.RECOVERY,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_RECOVERY'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/recovery/create-vpg-recovery.html\'"></ng-include>'
            },
            {
                class: '',
                isEnabled: false,
                id: stepId.NICS,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_NICS'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/nics/create-vpg-nics.html\'"></ng-include>',
            },
            {
                class: '',
                index: 7,
                isEnabled: false,
                id: stepId.BACKUP,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_BACKUP'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/backup/create-vpg-backup.html\'"></ng-include>',
            },
            {
                class: '',
                id: stepId.SUMMARY,
                isEnabled: false,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_SUMMARY'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/summary/create-vpg-summary.html\'"></ng-include>',
            }
        ];
    }));

    it('should have props and funcs', function () {
        expect(scope._handleDoneClick).toBeDefined();
        expect(scope._closeHandler).toBeDefined();
        expect(scope._handleStepChanged).toBeDefined();
        expect(scope._isDoneEnabled).toBeDefined();

        expect(scope.$on).toHaveBeenCalledWith('wizard:DoneButtonClick', scope._handleDoneClick);
        expect(scope.$on).toHaveBeenCalledWith('wizard:CancelButtonClick', scope._closeHandler);
        expect(scope.$on).toHaveBeenCalledWith('wizard:StepChanged', scope._handleStepChanged);

        scope._closeHandler();
        expect(factory.dismissModal).toHaveBeenCalled();
    });

    it('should have isDoneEnabled and it should be false', function () {
        expect(scope.doneEnabled).toBeFalsy()
    });

    it('should get the title by injection and set it to the scope', function () {
        expect(scope.title()).toEqual('Create VPG');
    });

    it('should remove public-cloud step', function () {
        scope.steps = allSteps;
        var originalStepsCounter = scope.steps.length;

        scope.removePublicCloudSteps();

        expect(scope.steps.length).toBe(originalStepsCounter - 1);
    });

    it('should restore steps to initial state', function () {
        scope.originalSteps = allSteps;
        scope.steps = [
            {
                class: '',
                id: stepId.INIT,
                isEnabled: false,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_GENERAL'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/initial/create-vpg-initial.html\'"></ng-include>',
            },
            {
                class: '',
                id: stepId.VMS,
                isEnabled: false,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_VMS'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/vms/create-vpg-select-vms.html\'"></ng-include>',
            },
            {
                class: '',
                isEnabled: false,
                id: stepId.REPLICATION,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_REPLICATION'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/replication/create-vpg-replication.html\'"></ng-include>'
            },
            {
                class: '',
                isEnabled: false,
                id: stepId.STORAGE,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_STORAGE'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/storage/create-vpg-storage.html\'"></ng-include>'
            },
            {
                class: '',
                isEnabled: false,
                id: stepId.RECOVERY,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_RECOVERY'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/recovery/create-vpg-recovery.html\'"></ng-include>'
            },
            {
                class: '',
                index: 7,
                isEnabled: false,
                id: stepId.BACKUP,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_BACKUP'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/backup/create-vpg-backup.html\'"></ng-include>',
            },
            {
                class: '',
                id: stepId.SUMMARY,
                isEnabled: false,
                stateIcon: VPGWizardStepStates.INITIAL,
                stepTitle: $translate.instant('CREATE_VPG.STEP_SUMMARY'),
                template: '<ng-include src="\'scripts/core/create_vpg/steps/summary/create-vpg-summary.html\'"></ng-include>',
            }
        ];
        var nicsStep = {
            class: '',
            isEnabled: false,
            id: stepId.NICS,
            stateIcon: VPGWizardStepStates.INITIAL,
            stepTitle: $translate.instant('CREATE_VPG.STEP_NICS'),
            template: '<ng-include src="\'scripts/core/create_vpg/steps/nics/create-vpg-nics.html\'"></ng-include>',
        };

        scope.restoreSteps();
        expect(scope.steps).toContain(nicsStep);
    });

    it('should verify done click in edit mode will update the vpg and will send event to GA', function () {
        model.data.isEdit = true;
        model.data.isReverseMode = false;
        model.data.defaultVpgSettings = {
            config: {}
        };

        scope._handleDoneClick();

        expect(scope.$emit).toHaveBeenCalled;
        expect(model.sendUpdateVPG).toHaveBeenCalled();
    });

    it('should verify done click in new mode will create the vpg and will send event to GA', function () {
        model.data.isEdit = false;
        model.data.isReverseMode = false;
        model.data.defaultVpgSettings = {
            config: {}
        };

        scope._handleDoneClick();

        expect(scope.$emit).toHaveBeenCalled();
        expect(model.sendCreateVPG).toHaveBeenCalled();
    });

    it('should verify done click in new mode in ZSSP should not send event to GA', function () {
        model.data.isEdit = false;
        model.data.isReverseMode = false;
        model.data.defaultVpgSettings = {
            config: {}
        };
        model.data.isPortal = true;

        scope._handleDoneClick();

        expect(scope.$emit).not.toHaveBeenCalled();
        expect(model.sendCreateVPG).toHaveBeenCalled();
    });

    it('should verify done click in edit mode in ZSSP should not send event to GA', function () {
        model.data.isEdit = true;
        model.data.isReverseMode = false;
        model.data.defaultVpgSettings = {
            config: {}
        };
        model.data.isPortal = true;

        scope._handleDoneClick();

        expect(scope.$emit).not.toHaveBeenCalled();
        expect(model.sendUpdateVPG).toHaveBeenCalled();
    });

    it('should verify that click on done in reverse mode of ZSSP will close the modal with no update', function () {
        model.data.isEdit = true;
        model.data.isPortal = true;
        model.data.isReverseMode = true;
        model.data.defaultVpgSettings = {
            config: {}
        };

        scope._handleDoneClick();

        expect(scope.$emit).not.toHaveBeenCalled();
        expect(factory.closeModal).toHaveBeenCalled();
    });

    it('should verify fail create-vpg caused by no-zorg exception will pop up an warning message', function () {
        var reason = {
            faultCode: guiVisibleException.FAULT_CODE_NO_ZORG
        };

        scope._handleFailedCreate(reason);

        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it('should verify fail create-vpg caused by another exception will pop up an error message', function () {
        var reason = {
            faultCode: 'some error'
        };

        scope._handleFailedCreate(reason);

        expect(zAlertFactory.fail).toHaveBeenCalled();
    });
});
