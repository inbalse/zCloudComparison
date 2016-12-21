'use strict';

angular.module('zvmApp.core')
    .factory('advancedJournalSettingsFactory', function ($uibModal, zertoServiceFactory, vmsService, vpgService) {
        var advancedJournalSettingsFactory = {};

        advancedJournalSettingsFactory.modalInstance = null;

        advancedJournalSettingsFactory.openWindow = function () {
            advancedJournalSettingsFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/advanced_journal_settings/advanced-journal-settings.html',
                windowClass: 'advanced-journal-settings',
                controller: 'advancedJournalSettingsController',
                backdrop: 'static'
            });

            return advancedJournalSettingsFactory.modalInstance.result;
        };

        advancedJournalSettingsFactory.getPotentialDatastores = function (VPGId, VPGConfig) {
            if (vpgService.isReverse()) {
                return zertoServiceFactory.GetPotentialDatastoresForJournalForReverseConfig(VPGId, VPGConfig);
            } else {
                return zertoServiceFactory.GetPotentialDatastoresForJournal(VPGId, VPGConfig);
            }
        };

        advancedJournalSettingsFactory.save = function (manageJournalSettings, defaultJournal) {
            advancedJournalSettingsFactory._applayDefaultJournalSettingsPerVM(manageJournalSettings);

            var journalData = {
                manageJournalSettings : manageJournalSettings,
                defaultJournal : defaultJournal
            };
            advancedJournalSettingsFactory.modalInstance.close(journalData);
            advancedJournalSettingsFactory.clear();
        };


        advancedJournalSettingsFactory._applayDefaultJournalSettingsPerVM = function (settings) {
            _.forEach(vmsService.getInitializedSelectedVms(), function (vm) {
                vm.JournalHardLimit = settings.JournalHardLimitPerVM;
                if (vm._isNewVm) {
                    vm.JournalDatastores = (_.isNullOrUndefined(settings.JournalDatastore)) ? [vpgService.getDefaultTargetDataStore()] : [settings.JournalDatastore];
                }
                vm.JournalWarningThreshold = settings.JournalWarningThresholdPerVM;
            });

        };

        advancedJournalSettingsFactory.cancel = function () {
            advancedJournalSettingsFactory.modalInstance.dismiss('close');
            advancedJournalSettingsFactory.clear();
        };

        advancedJournalSettingsFactory.clear = function () {
            advancedJournalSettingsFactory.modalInstance = null;
        };

        return advancedJournalSettingsFactory;
    });
