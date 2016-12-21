'use strict';

angular.module('zvmApp.core')
    .factory('flrWizardVmModel', function ($translate, $filter, zWizardStepStates, zSlickGridFilterTypes, vmsApiService, zAlertFactory, flrWizardModel, flrApiService, busyOverlayService) {

        var model = {};
        model.selectedItems = [];
        model.selectedGroup = [];

        var getGridOptions = function () {
            return {
                showSearch: true,
                showGroupBy: true,
                multiSelect: false,
                columns: [
                    {name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.VM_NAME'), field: 'VmName', filter: zSlickGridFilterTypes.WILDCARD},
                    {name: 'VPG Name', field: 'VpgName', filter: zSlickGridFilterTypes.MULTI_SELECT},
                    {name: 'Protected Site', field: 'SourceSite', filter: zSlickGridFilterTypes.WILDCARD},
                    {name: $translate.instant('CREATE_VPG_SELECT_VMS.GRID.RECOVERY_SITE'), field: 'TargetSite', views: [''], filter: zSlickGridFilterTypes.WILDCARD},
                    {
                        name: 'Protection Status',
                        field: 'StatusLabel',
                        views: [''],
                        formatter: $filter('objectFormatter'),
                        filter: zSlickGridFilterTypes.MULTI_SELECT
                    },
                    {name: 'ZORG', field: 'OrganizationName', views: [''], filter: zSlickGridFilterTypes.WILDCARD}

                ]
            };
        };

        model.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'VpgName',
                text: 'VPG Name'
            }
        ];

        var validate = function () {
            model.step.isEnabled = model.selectedItems.length > 0;
            model.step.stateIcon = model.step.isEnabled ? zWizardStepStates.VALID : zWizardStepStates.INITIAL;
            return model.step.isEnabled;
        };

        model.step = {
            class: '',
            isEnabled: false,
            stateIcon: zWizardStepStates.INITIAL,
            id: 'VM',
            stepTitle: $translate.instant('FLR.WIZARD.VM.VM_TITLE'),
            template: '<ng-include src="\'scripts/core/flr_wizard/steps/vm/flr-wizard-vm.html\'"></ng-include>',
            isValid: validate,
            validationError: $translate.instant('FLR.WIZARD.VM.NONE_SELECTED')
        };

        model.data = null;

        var onSuccess = function (result) {
            model.data = _.forEach(result, function (item, index) {
                item.id = index;
                item.Source = 'Journal';

                if (item.Status) {
                    item.StatusLabel = {
                        display: $filter('vpgVisualStatusEmun')(item.Status),
                        value: item.Status
                    };
                }
            });

            //remove unsupported flr VMs
            model.data = _.remove(model.data, function (vm) {
                if (vm.EnabledActions && vm.EnabledActions.IsFlrEnabled) {
                    return vm.EnabledActions.IsFlrEnabled;
                }
                return false;
            });
        };

        var init = function () {
            var busyKey = 'vmsApiService.getVms';
            busyOverlayService.addOperation(busyKey);
            vmsApiService.getVms()
                .then(onSuccess, flrApiService.onFail)
                .then(function () {
                    busyOverlayService.removeOperation(busyKey);
                });
        };

        var revert = function () {
            model.step.class = '';
            model.step.isEnabled = false;
            model.step.stateIcon = zWizardStepStates.INITIAL;
            model.selectedItems = [];
            model.selectedGroup = [];
            model.data = null;
        };

        flrWizardModel.addModel({revert: revert});

        return {
            getGridOptions: getGridOptions,
            init: init,
            revert: revert,
            model: model,
            onSuccess: onSuccess,//just for testing
            validate: validate
        };
    });
