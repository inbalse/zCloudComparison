'use strict';

angular.module('zvmApp.core')
    .controller('siteSettingsController', function ($scope, $translate, $timeout, siteSettingsFactory, zertoServiceFactory, transmitterSettingsModel,
                                                    siteDetailsModel, zAlertFactory, siteSettingsModel, siteVcdSettingsModel,
                                                    tabSelectedIndex, summaryMinimalModel, analyticsEventsTypes, $rootScope) {
        //region VARIABLES ====================================================================
        $scope.selection = 0;
        $scope.settings = siteSettingsFactory.settings;
        $scope.currentTab = '';
        $scope.commitPolicyKeys = ['SITE_SETTINGS.POLICIES.NONE', 'SITE_SETTINGS.POLICIES.COMMIT', 'SITE_SETTINGS.POLICIES.ROLLBACK'];
        $scope.isLoading = false;
        $scope.isBusy = false;
        //endregion

        summaryMinimalModel.register($scope).then(null, null, function (result) {
            //get isManagedSiteSettingsEnabled only once!!! not every clock tick.
            $scope.isManageSiteSettingsEnabled = result.SummaryState.IsManageSiteSettingsEnabled;
            $scope.disableButtons(!$scope.isManageSiteSettingsEnabled);
            summaryMinimalModel.unregister($scope);
        });

        //region TRANSLATION KEYS =============================================================
        //=====================================================================================
        //  keys button keys translations
        //=====================================================================================

        $scope.saveKey = 'MODAL.SAVE';
        $scope.applyKey = 'MODAL.APPLY';
        $scope.cancelKey = 'MODAL.CANCEL';
        //endregion

        //region TABS =========================================================================
        //=====================================================================================
        //  TABS
        //  title  - translation key
        //  active - visual state for css
        //=====================================================================================

        $scope.tabs = siteSettingsFactory.tabs;
        //endregion

        //region UI FUNCTIONS =================================================================
        //=====================================================================================
        //  ui functions
        //  broadcasting used for child controls notifications
        //=====================================================================================
        $scope.saveAll = function () {
            $scope.applyButton.disabled = true;
            $scope.$broadcast('siteSettings:clearDirtyFlag');
            siteSettingsModel.save().then($scope.onSiteSettingsSuccess, $scope.onFail);
            siteDetailsModel.save().then($scope.onSuccess, $scope.onFail);
            transmitterSettingsModel.save().then($scope.onSuccess, $scope.onFail);
            if (siteSettingsFactory.cloudSettingsChanged) {
                siteVcdSettingsModel.save().then($scope.onSuccess, $scope.onFail);
            }

        };

        $scope.onSuccess = function () {
        };

        $scope.onSiteSettingsSuccess = function () {
            if (siteSettingsModel.settings.IsCallHomeEnabled) {
                $rootScope.$emit(analyticsEventsTypes.ANALYTICS.SERVICE.START);
            } else {
                $rootScope.$emit(analyticsEventsTypes.ANALYTICS.SERVICE.STOP);
            }
        };

        $scope.onFail = function (error) {
            zAlertFactory.fail('', error && error.faultString !== '' ? error.faultString : 'Saving settings failed');
        };

        $scope.handleSaveClick = function () {
            //$scope.$broadcast(siteSettingsFactory.events.SAVE);
            $scope.saveAll();
            siteSettingsFactory.closeSiteSettings();
        };

        $scope.handleApplyClick = function () {
            //$scope.$broadcast(siteSettingsFactory.events.APPLY);
            //siteSettingsModel.save();
            $scope.saveAll();
        };

        $scope.handleCancelClick = function () {
            _.each($scope.tabs, function (tab) {
                tab.valid = true;
            });
            siteSettingsFactory.closeSiteSettings();
        };

        //=====================================================================================
        //  showTabIndex
        //  uses lodash to run on tabs and deactivate all on click
        //  activates by index
        //=====================================================================================

        $scope.showTabByIndex = function (index) {
            _.each($scope.tabs, function (item) {
                item.active = false;
            });

            $scope.selection = index;
            $scope.tabs[index].active = true;
            $scope.currentTab = 'settings_' + $translate.instant($scope.tabs[index].title);
        };
        $scope.tabClass = function (index) {
            return $scope.tabs[index].active ? 'active' : '';
        };

        $scope.disableButtons = function (value) {
            value = value && $scope.isManageSiteSettingsEnabled;

            if (!angular.isUndefined(value)) {
                $scope.applyButton.disabled = $scope.saveButton.disabled = value;
                if (value && !$scope.isManageSiteSettingsEnabled) {
                    $scope.applyButton.disabled = $scope.saveButton.disabled = !value;
                }
                if (!value && $scope.applyButton.isDirty) {
                    $scope.applyButton.disabled = false;
                }
            }
        };
        //endregion

        /*Buttons*/
        $scope.saveButton = {
            label: $translate.instant($scope.saveKey),
            handler: $scope.handleSaveClick,
            disabled: !$scope.isManageSiteSettingsEnabled
        };
        $scope.applyButton = {
            label: $translate.instant($scope.applyKey),
            handler: $scope.handleApplyClick,
            disabled: true
        };
        $scope.cancelButton = {
            label: $translate.instant($scope.cancelKey),
            class: 'btn btn-link',
            handler: $scope.handleCancelClick,
            disabled: false
        };

        $scope.buttons = [
            $scope.cancelButton,
            $scope.saveButton,
            $scope.applyButton
        ];

        $scope.commitPolicys = [$translate.instant($scope.commitPolicyKeys[0]), $translate.instant($scope.commitPolicyKeys[1]), $translate.instant($scope.commitPolicyKeys[2])];


        //=====================================================================================
        //  on load
        //=====================================================================================
        $scope.showTabByIndex(tabSelectedIndex);

        $scope.watchers = {};

        $scope.validateModels = function () {
            var allFormsValidityArray = [siteDetailsModel.isValid, siteVcdSettingsModel.isValid, siteSettingsModel.isValid];
            $scope.disableButtons(_.indexOf(allFormsValidityArray, false) > -1);
        };

        //endregion

        //region LISTENERS ====================================================================
        //  child controllers emitting validity events to trigger busy state
        //=====================================================================================
        $scope.listeners = {};
        $scope.listeners.validity = $scope.$on(siteSettingsFactory.events.VALIDITY, function () {
            $scope.validateModels();
        });
        //endregion

        $scope.validateModels();
    });
