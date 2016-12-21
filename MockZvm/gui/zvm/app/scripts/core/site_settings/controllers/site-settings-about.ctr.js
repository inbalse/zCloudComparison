'use strict';

angular.module('zvmApp.core')
    .controller('aboutController', function ($scope, zertoServiceFactory, siteSettingsFactory, siteSettingsModel, transmitterSettingsModel, zAlertFactory, $translate) {
        $scope.version = '';
        $scope.sendAnalytics = siteSettingsModel.settings.IsCallHomeEnabled;
        $scope.isPublicCloud = siteSettingsFactory.isPublicCloud;
        $scope.settings = {
            isTransmitterEnabled: false,
            isTransmitterVisible: true
        };

        $scope.setVersion = function (result) {
            $scope.version = result.Version;
        };

        $scope.sendAnalyticsChange = function () {
            siteSettingsModel.settings.IsCallHomeEnabled = $scope.sendAnalytics;
            if (!$scope.sendAnalytics) {
                zAlertFactory.warn($translate.instant('SITE_SETTINGS.ABOUT_SITE.WARNING'), $translate.instant('SITE_SETTINGS.ABOUT_SITE.WARNING_TEXT'), function (event) {
                    if (event.target.name === zAlertFactory.buttons.CANCEL) {
                        $scope.sendAnalytics = true;
                        siteSettingsModel.settings.IsCallHomeEnabled = true;
                    }
                });
            }
        };

        $scope.onTransmitterChange = function () {
            transmitterSettingsModel.setState($scope.settings.isTransmitterEnabled);

            if (!$scope.settings.isTransmitterEnabled) {
                zAlertFactory.warn($translate.instant('SITE_SETTINGS.ABOUT_SITE.WARNING'), $translate.instant('SITE_SETTINGS.ABOUT_SITE.CLOUD_WARNING_TEXT'), function (event) {
                    if (event.target.name === zAlertFactory.buttons.CANCEL) {
                        $scope.settings.isTransmitterEnabled = true;
                        transmitterSettingsModel.setState(true);
                    }
                });
            }

        };

        transmitterSettingsModel.loadState().then(function (result) {
            $scope.settings.isTransmitterVisible = result.isVisible;
            $scope.settings.isTransmitterEnabled = result.isEnabled;
        });

        zertoServiceFactory.GetAboutScreen().then($scope.setVersion);

        $scope.$watch('forms.about.$dirty', function (newValue) {
            if (!angular.isUndefined(newValue)) {
                $scope.applyButton.isDirty = newValue;
                $scope.validateModels();
            }
        });

        $scope.$on('siteSettings:clearDirtyFlag', function () {
            $scope.forms.about.$setPristine();
        });
    });
