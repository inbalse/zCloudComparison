'use strict';

describe("Actions button View directive", function () {
    var scope, element, createCheckpointFactory,restoreWizardFactory,globalStateModel,analyticsEventsTypes;

    beforeEach(module('zvmApp.core'));

    beforeEach(module('templates'));

    beforeEach(module('zvmTest', function($provide) {
        createCheckpointFactory = jasmine.createSpyObj('createCheckpointFactory', ['showWindow']);
        $provide.value('createCheckpointFactory', createCheckpointFactory,'restoreWizardFactory',restoreWizardFactory);
    }));

    beforeEach(module('zvmTest', function($provide) {
        restoreWizardFactory = jasmine.createSpyObj('restoreWizardFactory', ['restore']);
        $provide.value('restoreWizardFactory',restoreWizardFactory);
    }));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data:{VirtualizationProviderType: null}});
    }));

    beforeEach(inject(function ($rootScope, $compile, _analyticsEventsTypes_) {

        element = $compile('<actions-button></actions-button>')($rootScope.$new());
        analyticsEventsTypes = _analyticsEventsTypes_;

        // directive creates its own scope, need to save it.
        //debugger;
        scope = element.scope();

        scope.$digest();
    }));

    it('should load actions button class ', function () {
        expect(element.isolateScope().actionsButtonClass).toEqual('actionsButtonClass');
    });

    it('should load showActionsButtonMenu to be false at the beginning ', function () {
        expect(element.isolateScope().showActionsButtonMenu).toBeFalsy();
    });

    it('should load isExpandButtonShow to be false at the beginning ', function () {
        expect(element.isolateScope().isExpandButtonShow).toBeFalsy();
    });

    describe("Actions button clicked", function () {
        beforeEach(function () {
            element.isolateScope().handleActionsButtonClick();
        });

        it('should showActionsButtonMenu to be true ', function () {
            expect(element.isolateScope().showActionsButtonMenu).toBeTruthy();
        });
    });

    describe("Actions button Mouse leave", function () {
        beforeEach(function () {
            element.isolateScope().handleActionButoonMenuMouseLeave();
        });

        it('should showActionsButtonMenu to be false ', function () {
            expect(element.showActionsButtonMenu).toBeFalsy();
        });

        it('should isExpandButtonShow to be false ', function () {
            expect(element.isolateScope().isExpandButtonShow).toBeFalsy();
        });

    });

    describe("Actions button menu item clicked", function () {
        beforeEach(function () {
            element.isolateScope().handleMenuItemClicked();
        });

        it('should showActionsButtonMenu to be false ', function () {
            expect(element.isolateScope().showActionsButtonMenu).toBeFalsy();
        });

        it('should isExpandButtonShow to be false ', function () {
            expect(element.isolateScope().isExpandButtonShow).toBeFalsy();
        });
    });

    it('verify create VPG triggers an google analytics event', function () {
        spyOn(element.isolateScope(),'$emit');
        element.isolateScope().handleMenuItemClicked({}, 'createVPG');

        expect(element.isolateScope().$emit).toHaveBeenCalledWith(analyticsEventsTypes.ACTIONS.CREATE_VPG);
    });

    it('verify add-checkpoint triggers an google analytics event', function () {
        spyOn(element.isolateScope(),'$emit');
        element.isolateScope().handleMenuItemClicked({}, 'setCheckpoint');

        expect(element.isolateScope().$emit).toHaveBeenCalledWith(analyticsEventsTypes.ACTIONS.ADD_CHECKPOINT);
    });

    it('verify restore-from-backup triggers an google analytics event', function () {
        spyOn(element.isolateScope(),'$emit');
        element.isolateScope().handleMenuItemClicked({}, 'restore');

        expect(element.isolateScope().$emit).toHaveBeenCalledWith(analyticsEventsTypes.ACTIONS.RESTORE_BACKUP.INITIAL);
    });

    it('verify restore-file triggers an google analytics event', function () {
        spyOn(element.isolateScope(),'$emit');
        element.isolateScope().handleMenuItemClicked({}, 'flr');

        expect(element.isolateScope().$emit).toHaveBeenCalledWith(analyticsEventsTypes.ACTIONS.RESTORE_FILE.MOUNT.INITIAL);
    });

    it('verify move VPG triggers an google analytics event', function () {
        spyOn(element.isolateScope(),'$emit');
        element.isolateScope().handleMenuItemClicked({}, 'move');

        expect(element.isolateScope().$emit).toHaveBeenCalledWith(analyticsEventsTypes.ACTIONS.MOVE_VPG.INITIAL);
    });
});
