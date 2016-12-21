'use strict';

angular.module('zvmApp.core')
    .factory('flrDownloadSettingsModel', function ($q, zWizardStepStates, flrSessionsApiService, flrApiService, vmsApiService, vpgApi, busyOverlayService, zertoLoggerServiceFactory) {
        var flrDownloadSettingsModel = {};

        flrDownloadSettingsModel.revert = function () {
            flrDownloadSettingsModel.model.vpgIdentifier = null;
            flrDownloadSettingsModel.model.sessionId = null;
            flrDownloadSettingsModel.model.step.class = '';
            flrDownloadSettingsModel.model.step.stateIcon = zWizardStepStates.INITIAL;
        };

        flrDownloadSettingsModel.validate = function () {
            flrDownloadSettingsModel.model.step.isEnabled = true;
            flrDownloadSettingsModel.model.step.stateIcon = zWizardStepStates.VALID;
            return true;
        };

        flrDownloadSettingsModel.model = {};
        flrDownloadSettingsModel.model.step = {
            class: '',
            isEnabled: false,
            stateIcon: zWizardStepStates.INITIAL,
            id: 'SETTINGS',
            stepTitle: 'SETTINGS',
            template: '<ng-include src="\'scripts/core/flr_download/steps/settings/flr-download-settings.html\'"></ng-include>',
            isValid: flrDownloadSettingsModel.validate,
            validationError: ''
        };

        flrDownloadSettingsModel.model.sessionId = null;
        flrDownloadSettingsModel.deferred = $q.defer();

        flrDownloadSettingsModel.init = function () {
            var busyKey = 'flrSessionsApiService.get';

            busyOverlayService.addOperation(busyKey);
            flrSessionsApiService.get(flrDownloadSettingsModel.model.sessionId)
                .then(flrDownloadSettingsModel.onSuccess, flrApiService.onFail)
                .then(function () {
                    busyOverlayService.removeOperation(busyKey);
                });

            return flrDownloadSettingsModel.deferred;
        };

        function onSuccessGetVm(vm) {
            if (vm.VmIdentifier === flrDownloadSettingsModel.model.VmId) {
                flrDownloadSettingsModel.model.vm = vm;
            }

            getCheckpointByVpgId();
        }

        function onFail(error) {
            zertoLoggerServiceFactory.logError('onFailDownloadFlr', null, error);
        }

        function getCheckpointByVpgId() {
            vpgApi.getVpgCheckpoint(flrDownloadSettingsModel.model.vpgIdentifier, flrDownloadSettingsModel.model.CheckPointId)
                .then(function (checkpoint) {
                    flrDownloadSettingsModel.model.cp = checkpoint;
                    flrDownloadSettingsModel.deferred.resolve();
                }, onFail);
        }

        var getVm = function (vmIdentifier, vpgIdentifier) {
            vmsApiService.getVm(vmIdentifier, vpgIdentifier)
                .then(onSuccessGetVm, onFail);
        };

        flrDownloadSettingsModel.onSuccess = function (result) {
            var settings = result[0];
            flrDownloadSettingsModel.model.VmId = settings.VmId;
            flrDownloadSettingsModel.model.VolumeId = settings.VolumeId;
            flrDownloadSettingsModel.model.CheckPointId = settings.CheckPointId;

            getVm(flrDownloadSettingsModel.model.VmId, flrDownloadSettingsModel.model.vpgIdentifier);
        };

        return {
            _self: flrDownloadSettingsModel,
            model: flrDownloadSettingsModel.model,
            init: flrDownloadSettingsModel.init,
            revert: flrDownloadSettingsModel.revert,
            validate: flrDownloadSettingsModel.validate
        };
    });
