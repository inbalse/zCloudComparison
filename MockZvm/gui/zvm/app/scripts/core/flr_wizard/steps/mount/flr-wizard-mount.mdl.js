'use strict';

angular.module('zvmApp.core')
    .factory('flrWizardMountModel', function (zWizardStepStates, flrWizardModel, flrWizardVmModel, flrWizardRestorepointModel,
                                              flrWizardVolumesModel, flrApiService, $translate, flrWizardFactory) {
        var flrWizardMountModel = {};
        flrWizardMountModel.model = {};

        //TODO Denis: refactor to best practise like ( flr-wizard-vm.mdl and flr-wizard-restorepoint.mdl )

        flrWizardMountModel.mount = function () {
            _.forEach(flrWizardVolumesModel.model.selectedItems, function (disk) {
                var vpgIdentifier = flrWizardVmModel.model.selectedItems[0].VpgIdentifier;
                var vmIdentifier = flrWizardVmModel.model.selectedItems[0].VmIdentifier;
                var checkpointIdentifier = flrWizardRestorepointModel.model.selectedItems[0].CheckpointIdentifier;
                var volumeIdentifier = disk.VmVolumeIdentifier;

                flrWizardFactory._self.sendMountEventToAnalytics(vpgIdentifier);

                flrApiService.mount(vpgIdentifier, vmIdentifier, checkpointIdentifier, volumeIdentifier)
                    .then(function () {
                        flrWizardFactory._self.trackInWizardTimeToAnalytics(true);
                        flrApiService.onSuccess();
                    }, function () {
                        flrWizardFactory._self.trackInWizardTimeToAnalytics(false);
                        flrApiService.onFail();
                    });
            });
        };

        flrWizardMountModel.revert = function () {
            flrWizardMountModel.model.step.class = '';
            flrWizardMountModel.model.step.stateIcon = zWizardStepStates.INITIAL;
        };

        flrWizardMountModel.validate = function () {
            flrWizardMountModel.model.step.isEnabled = true;
            flrWizardMountModel.model.step.stateIcon = zWizardStepStates.VALID;
            return true;
        };

        flrWizardMountModel.model.step = {
            class: '',
            isEnabled: false,
            stateIcon: zWizardStepStates.INITIAL,
            id: 'MOUNT',
            stepTitle: $translate.instant('FLR.WIZARD.MOUNT.MOUNT_TITLE'),
            template: '<ng-include src="\'scripts/core/flr_wizard/steps/mount/flr-wizard-mount.html\'"></ng-include>',
            isValid: flrWizardMountModel.validate,
            validationError: ''
        };

        flrWizardModel.addModel({revert: flrWizardMountModel.revert});

        return {
            _self: flrWizardMountModel,
            model: flrWizardMountModel.model,
            revert: flrWizardMountModel.revert,
            validate: flrWizardMountModel.validate,
            mount: flrWizardMountModel.mount
        };
    });
