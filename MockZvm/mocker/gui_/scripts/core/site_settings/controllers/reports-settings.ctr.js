'use strict';

angular.module('zvmApp.core')
    .controller('reportsSettingsController', function ($scope, siteSettingsFactory, siteSettingsModel, dataCollectionFactory, enums) {

        $scope.handleSamplingRateChange = function () {
            $scope.isHourEnabled = $scope.data.ResourcesReportSettings.Resolution !== enums.ResourcesReportSettings_SamplingResolution.Daily;
            if($scope.isHourEnabled){
                $scope.data.ResourcesReportSettings.TimeOfDayInMinutes = 30;
            }
        };

        $scope.$watch('forms.reports.$valid', function (newValue) {
            siteSettingsModel.isValid = newValue;
            $scope.$emit(siteSettingsFactory.events.VALIDITY);
        });

        $scope.$watch('forms.reports.$dirty', function (newValue) {
            if(!angular.isUndefined(newValue)) {
                $scope.applyButton.isDirty = newValue;
                $scope.validateModels();
            }
        });

        $scope.$on('siteSettings:clearDirtyFlag', function(){
            $scope.forms.reports.$setPristine();
        });

        function initScalingSettings(){
            $scope.forms = {};
            $scope.data = siteSettingsModel.settings;
            $scope.resourceReportsCollection = dataCollectionFactory.RESOURCE_REPORT_COLLECTION;
            $scope.isHourEnabled = $scope.data.ResourcesReportSettings.Resolution === enums.ResourcesReportSettings_SamplingResolution.Hourly;
        }

        initScalingSettings();
    });
