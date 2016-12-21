'use strict';

angular.module('zvmApp.core')
    .controller('advancedJournalSettingsController', function ($scope, $translate, advancedJournalSettingsFactory,
                                                               vos, objectTransformHelpersService, enums, zAlertFactory,
                                                               createVPGHelperFactory, createVPGModel, tweaksService, storageService, vpgService, vmsService, createVpgReplicationService) {
        $scope.loading = true;
        $scope.data = {
            selectedJournalDatastore: vpgService.getDefaultTargetDataStore()
        };
        $scope.forms = {};
        $scope.enums = enums;

        $scope.closeWindow = closeWindow;
        $scope.handleSaveClicked = handleSaveClicked;
        $scope.initButtons = initButtons;

        /******************************
         * Functions
         * */
        function initButtons() {
            var isScvmm = vpgService.isScvmm();
            $scope.saveButton = {
                label: $translate.instant('MODAL.OK'),
                handler: $scope.handleSaveClicked,
                disabled: false
            };
            $scope.buttons = [
                {
                    label: $translate.instant('ADVANCED_JOURNAL_SETTINGS.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.closeWindow,
                    disabled: false
                },
                $scope.saveButton
            ];
            $scope.textLabel = isScvmm ? $translate.instant('ADVANCED_JOURNAL_SETTINGS.DEFAULT_JOURNAL_STORAGE') : $translate.instant('ADVANCED_JOURNAL_SETTINGS.DEFAULT_JOURNAL_DATASTORE');
            $scope.datstoreOrStorageLabelTT = isScvmm ? $translate.instant('JOURNAL_SETTINGS.STORAGE') : $translate.instant('JOURNAL_SETTINGS.DATASTORE');
            $scope.datstoreOrStorageSelectTT = isScvmm ? $translate.instant('JOURNAL_SETTINGS.STORAGE_SELECT') : $translate.instant('JOURNAL_SETTINGS.DATASTORE_SELECT');
        }

        function handleSaveClicked() {
            var totalVolumeGB = createVPGHelperFactory.calculateTotalVolumesInGB(vmsService.getInitializedSelectedVms());

            if (createVPGHelperFactory.validateLimits($scope.data.selectedJournalHardLimitPerVM, $scope.data.selectedJournalWarningThresholdPerVM, totalVolumeGB)) {
                if ($scope.data.selectedJournalDatastore.DisplayName === 'Default') {
                    $scope.data.selectedJournalDatastore = null;
                }

                objectTransformHelpersService.JournalLimitTypeGBtoMB($scope.data.selectedJournalHardLimitPerVM);
                objectTransformHelpersService.JournalLimitTypeGBtoMB($scope.data.selectedJournalWarningThresholdPerVM);

                var manageJournalSettings = new vos.ManageJournalVisualObject($scope.data.selectedJournalDatastore, $scope.data.selectedJournalHardLimitPerVM, $scope.data.selectedJournalWarningThresholdPerVM);
                advancedJournalSettingsFactory.save(manageJournalSettings, $scope.data.defaultJournal);

            } else {
                zAlertFactory.fail('Error', $translate.instant('ADVANCED_JOURNAL_SETTINGS.LIMIT_ERROR'));
            }
        }

        function closeWindow() {
            advancedJournalSettingsFactory.cancel();
        }

        $scope.handleJournalTypeChange = function () {
            var journal = $scope.data.defaultJournal;

            if(!_.isNullOrUndefined($scope.previousJournalType)){
                if($scope.previousJournalType === journal.type){
                    return;
                }
            }

            $scope.journalMinMaxValue = createVpgReplicationService.getMinAndMaxValues(journal.type);
            $scope.data.defaultJournal = storageService.initJournalObject($scope.minimunJournalLengthInMinutesToSave, journal.type);
            $scope.handleJournalValueChanged();
        };

        $scope.handleJournalValueChanged = function () {
            var journal = $scope.data.defaultJournal;
            journal.value = storageService.valueValidateForJournalHistory(journal.value, journal.type);
            $scope.minimunJournalLengthInMinutesToSave = storageService.calculateMinimalJournalLengthInMinutes(journal.type, journal.value);
            $scope.previousJournalType = $scope.data.defaultJournal.type;
        };

        $scope.getPotentialDatastoresResult = function (result) {
            $scope.data.potentialJournalDatastores = result;
            var defaultDS = storageService.createDefaultDataStore();
            $scope.data.potentialJournalDatastores.unshift(defaultDS);

            $scope.loading = false;

            var journalDataStore = storageService.getJournalDataStore();

            if (_.isNullOrUndefined(journalDataStore)) {
                $scope.data.selectedJournalDatastore = defaultDS.Datastore;
                return;
            }

            var storageType = storageService.getStorageTypes();
            var storageIdentifier = _.isNullOrUndefined(journalDataStore[storageType.cluster.id]) ? storageType.datastore : storageType.cluster;
            var selectedDatastore = _.find($scope.data.potentialJournalDatastores, function (ds) {
                if (_.isNullOrUndefined(ds.Datastore[storageIdentifier.id])) {
                    return false;
                }
                return ds.Datastore[storageIdentifier.id][storageIdentifier.name] === journalDataStore[storageIdentifier.id][storageIdentifier.name];
            });

            $scope.data.selectedJournalDatastore = _.isNullOrUndefined(selectedDatastore) ? defaultDS.Datastore : selectedDatastore.Datastore;
        };

        /******************************
         * Watchers
         * */
        $scope.$watch('forms.advancedJournalForm.$valid', function (value) {
            $scope.saveButton.disabled = !value;
        });

        /******************************
         * Init
         * */

        function initAdvancedJournalSettings() {
            var journalSettings = _.cloneDeep(createVPGModel.getJournalSettings());
            objectTransformHelpersService.JournalLimitTypeMBtoGB(journalSettings.JournalHardLimitPerVM);
            objectTransformHelpersService.JournalLimitTypeMBtoGB(journalSettings.JournalWarningThresholdPerVM);

            advancedJournalSettingsFactory.getPotentialDatastores(vpgService.getProtectionGroupId(), vpgService.getVpgSettings().Config)
                .then($scope.getPotentialDatastoresResult);

            $scope.data.isVcdVapp = vpgService.isVcdVapp();
            $scope.data.defaultJournal = _.cloneDeep(storageService.getJournalHistoryObject());

            $scope.data.journalHistoryTypes = storageService.getJournalHistoryTypes();
            $scope.data.selectedJournalDatastore = storageService.getJournalDataStore();
            $scope.data.potentialJournalDatastores = [];
            $scope.data.selectedJournalHardLimitPerVM = journalSettings.JournalHardLimitPerVM;
            $scope.data.selectedJournalWarningThresholdPerVM = journalSettings.JournalWarningThresholdPerVM;
            if ($scope.data.defaultJournal) {
                $scope.previousJournalType = $scope.data.defaultJournal.type;
                $scope.journalMinMaxValue = createVpgReplicationService.getMinAndMaxValues($scope.data.defaultJournal.type);
                $scope.minimunJournalLengthInMinutesToSave = storageService.calculateMinimalJournalLengthInMinutes($scope.data.defaultJournal.type, $scope.data.defaultJournal.value);
            }
            initButtons();
        }

        initAdvancedJournalSettings();
    });
