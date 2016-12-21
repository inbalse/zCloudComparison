'use strict';

angular.module('zvmApp.core')
    .factory('flrWizardVolumesModel', function (flrWizardModel, flrWizardVmModel, zWizardStepStates, zSlickGridFilterTypes, $translate) {
        var flrWizardVolumesModel = {};
        flrWizardVolumesModel.model = {};

        //TODO Denis: refactor to best practise like ( flr-wizard-vm.mdl and flr-wizard-restorepoint.mdl )

        flrWizardVolumesModel.model.selectedItems = [];
        flrWizardVolumesModel.model.options = {
            showSearch: true,
            showGroupBy: false,
            multiSelect: false,
            columns: [
                {name: 'Disk', field: 'VmVolumeIdentifier', filter: zSlickGridFilterTypes.WILDCARD}
            ]
        };

        flrWizardVolumesModel.validate = function () {
            flrWizardVolumesModel.model.step.isEnabled = flrWizardVolumesModel.model.selectedItems.length > 0;
            flrWizardVolumesModel.model.step.stateIcon = flrWizardVolumesModel.model.step.isEnabled ? zWizardStepStates.VALID : zWizardStepStates.INITIAL;
            return flrWizardVolumesModel.model.step.isEnabled;
        };

        flrWizardVolumesModel.model.step = {
            class: '',
            isEnabled: false,
            stateIcon: zWizardStepStates.INITIAL,
            id: 'VOLUMES',
            stepTitle: $translate.instant('FLR.WIZARD.VOLUMES.VOLUMES_TITLE'),
            template: '<ng-include src="\'scripts/core/flr_wizard/steps/volumes/flr-wizard-volumes.html\'"></ng-include>',
            isValid: flrWizardVolumesModel.validate,
            validationError: 'Select a disk'
        };

        flrWizardVolumesModel.model.data = null;

        flrWizardVolumesModel.init = function () {
            flrWizardVolumesModel.model.data = _.alphanumSortObjects(flrWizardVmModel.model.selectedItems[0].Volumes, 'VmVolumeIdentifier', false);
            _.forEach(flrWizardVolumesModel.model.data, function (item, index) {
                item.id = index;
            });
        };

        flrWizardVolumesModel.revert = function () {
            flrWizardVolumesModel.model.step.class = '';
            flrWizardVolumesModel.model.step.isEnabled = false;
            flrWizardVolumesModel.model.step.stateIcon = zWizardStepStates.INITIAL;
            flrWizardVolumesModel.model.selectedItems = [];
            flrWizardVolumesModel.model.data = null;
        };

        flrWizardModel.addModel({revert: flrWizardVolumesModel.revert});

        return {
            _instance: flrWizardVolumesModel,
            init: flrWizardVolumesModel.init,
            revert: flrWizardVolumesModel.revert,
            model: flrWizardVolumesModel.model,
            validate: flrWizardVolumesModel.validate
        };
    });
