'use strict';

angular.module('zvmApp.core')
    .controller('policiesSettingsController', function ($scope, $translate, siteSettingsFactory, siteSettingsModel, policiesConstants, zAlertFactory, dataCollectionFactory, siteSettingsPublicCloudModel, publicCloudHelper) {

        $scope.isPublicCloud = siteSettingsFactory.isPublicCloud;
        $scope.isAws = siteSettingsFactory.isAws;
        $scope.isAzure = siteSettingsFactory.isAzure;
        $scope.vumAllowed = siteSettingsFactory.isVc || siteSettingsFactory.isVcd;
        $scope.data = {};
        $scope.forms = {};
        $scope.commitPolicySelected = $translate.instant('SITE_SETTINGS.POLICIES.NONE');
        $scope.defaultTimeoutMinutesValue = 0;
        $scope.publicCloud = {};
        $scope.maxDefaultTimeoutMinutes = Math.round(policiesConstants.MAX_STAGED_ACTION_TIMEOUT_SECONDS / 60);
        $scope.replicationPauseInMinutesCollection = dataCollectionFactory.REPLICATION_PAUSE_COLLECTION;
        $scope.translations = $translate.instant(['SITE_SETTINGS.POLICIES.NONE', 'SITE_SETTINGS.POLICIES.COMMIT', 'SITE_SETTINGS.POLICIES.ROLLBACK', 'SITE_SETTINGS.POLICIES.DISABLE_REPLICATE_SELF']);

        function setPolicyValue(policy) {
            switch (policy) {
                case $scope.translations['SITE_SETTINGS.POLICIES.COMMIT']:
                    var selectedCommitTimeout = Math.round(($scope.data.MoveCommitWaitInSec) / 60);

                    $scope.defaultTimeoutMinutesValue = (selectedCommitTimeout < policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT) ? policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT : selectedCommitTimeout;
                    $scope.minDefaultTimeoutMinutes = policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT;
                    break;
                case $scope.translations['SITE_SETTINGS.POLICIES.ROLLBACK']:
                    var selectedRollbackTimeout = Math.round(($scope.data.MoveRollbackWaitInSec) / 60);

                    $scope.defaultTimeoutMinutesValue = (selectedRollbackTimeout < policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT) ? policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT : selectedRollbackTimeout;
                    $scope.minDefaultTimeoutMinutes = policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT;
                    break;
                default:
                    $scope.defaultTimeoutMinutesValue = 0;
                    $scope.minDefaultTimeoutMinutes = 0;
            }
        }

        function setData() {
            $scope.data = siteSettingsModel.settings;
            $scope.initData($scope.data);
        }

        $scope.initData = function (value) {
            if (value.MoveCommitWaitInSec >= (policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT * 60) && (value.MoveCommitWaitInSec <= policiesConstants.MAX_STAGED_ACTION_TIMEOUT_SECONDS)) {
                $scope.commitPolicySelected = $scope.translations['SITE_SETTINGS.POLICIES.COMMIT'];
                $scope.defaultTimeoutMinutesValue = Math.round((value.MoveCommitWaitInSec) / 60);
            }
            else if (value.MoveRollbackWaitInSec >= (policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT * 60) && (value.MoveRollbackWaitInSec <= policiesConstants.MAX_STAGED_ACTION_TIMEOUT_SECONDS)) {
                $scope.commitPolicySelected = $scope.translations['SITE_SETTINGS.POLICIES.ROLLBACK'];
                $scope.defaultTimeoutMinutesValue = Math.round((value.MoveRollbackWaitInSec) / 60);
            }
            else {
                $scope.commitPolicySelected = $scope.translations['SITE_SETTINGS.POLICIES.NONE'];
                $scope.defaultTimeoutMinutesValue = 0;
            }

            if ($scope.isPublicCloud) {
                $scope.instanceFamily = siteSettingsPublicCloudModel.instanceFamilyPotentials;
                if (_.isEmpty($scope.instanceFamily)) {
                    return;
                }

                if (!_.isNullOrUndefined(siteSettingsModel.settings.PublicCloudSiteSettings) && siteSettingsModel.settings.PublicCloudSiteSettings.PublicCloudInstanceTypeIdentifier) {
                    $scope.selectedInstanceFamily = publicCloudHelper.selectFamilyFromInstanceIdentifier(siteSettingsModel.settings.PublicCloudSiteSettings.PublicCloudInstanceTypeIdentifier, $scope.instanceFamily);
                    $scope.instanceTypes = $scope.selectedInstanceFamily.instances;
                    $scope.publicCloud.selectedInstanceType = publicCloudHelper.selectInstanceByIdentifier($scope.data.PublicCloudSiteSettings.PublicCloudInstanceTypeIdentifier.InstanceType, $scope.instanceTypes);
                }
            }
        };

        $scope.familyInstanceChange = function (family) {
            $scope.instanceTypes = family.instances;
            $scope.publicCloud.selectedInstanceType = null;
            $scope.data.PublicCloudSiteSettings.PublicCloudInstanceTypeIdentifier = null;
        };

        $scope.instanceTypeChange = function (instance) {
            $scope.data.PublicCloudSiteSettings.PublicCloudInstanceTypeIdentifier = instance.Id;
        };

        $scope.updateModel = function (policy, value) {
            //change default value to 0 instead -1 (bug 23641)
            $scope.data.MoveCommitWaitInSec = -1;
            $scope.data.MoveRollbackWaitInSec = -1;

            if ((policy === $scope.translations['SITE_SETTINGS.POLICIES.COMMIT'])) {
                $scope.data.MoveCommitWaitInSec = value * 60;
            }
            else if ((policy === $scope.translations['SITE_SETTINGS.POLICIES.ROLLBACK'])) {
                $scope.data.MoveRollbackWaitInSec = value * 60;
            }
        };

        $scope.handleEnableRepSelfChange = function () {
            if (!$scope.data.AllowCreationOfSelfProtectedVpg) {
                zAlertFactory.info('Info', $scope.translations['SITE_SETTINGS.POLICIES.DISABLE_REPLICATE_SELF'], function () {
                });
            }
        };

        $scope.validateDefaultTimeout = function (policy, value) {
            if ((policy === $scope.translations['SITE_SETTINGS.POLICIES.ROLLBACK']) && value < policiesConstants.MIN_ROLLBACK_STAGED_ACTION_TIMEOUT) {
                $scope.forms.policies.defaultTimeoutMinutes.$setValidity('range', false);
            }
            else if ((policy === $scope.translations['SITE_SETTINGS.POLICIES.COMMIT']) && value < policiesConstants.MIN_COMMIT_STAGED_ACTION_TIMEOUT) {
                $scope.forms.policies.defaultTimeoutMinutes.$setValidity('range', false);
            }
            else {
                $scope.forms.policies.defaultTimeoutMinutes.$setValidity('range', true);
            }

            $scope.disableButtons(!$scope.forms.policies.defaultTimeoutMinutes.$valid);
        };

        $scope.timeoutChanged = function () {
            $scope.validateDefaultTimeout($scope.commitPolicySelected, $scope.defaultTimeoutMinutesValue);
            if ($scope.forms.policies.$invalid) {
                $scope.data.MoveCommitWaitInSec = 0;
                $scope.data.MoveRollbackWaitInSec = 0;
            }
            else {
                $scope.updateModel($scope.commitPolicySelected, $scope.defaultTimeoutMinutesValue);
            }
        };

        /***********************
         * Watchers
         */

        $scope.$watch('commitPolicySelected', function (newValue) {
            setPolicyValue(newValue);
            $scope.timeoutChanged();
        });

        $scope.$watch('forms.policies.$valid', function (newValue) {
            siteSettingsModel.isValid = newValue;
            $scope.$emit(siteSettingsFactory.events.VALIDITY);
            siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.POLICIES].valid = newValue;
        });

        $scope.$watch('forms.policies.$dirty', function (newValue) {
            if (!angular.isUndefined(newValue)) {
                $scope.applyButton.isDirty = newValue;
                $scope.validateModels();
            }
        });

        $scope.$on('siteSettings:clearDirtyFlag', function () {
            $scope.forms.policies.$setPristine();
        });

        /***********************
         * Init
         */
        setData();
    });
