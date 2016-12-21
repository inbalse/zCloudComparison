'use strict';

angular.module('zvmApp.core')
    .controller('performanceController', function ($scope, siteSettingsFactory, siteSettingsModel, dataCollectionFactory, $translate, zAlertFactory) {

        var lastSaved_FromTimeInMinutes, lastSaved_ToTimeInMinutes;

        $scope.forms = {};
        // $scope.bandwidthThrottlingUnlimitedChange = bandwidthThrottlingUnlimitedChange;//bandwidth throttling unlimited checkbox event
        // $scope.timeBasedThrottlingUnlimitedChange = timeBasedThrottlingUnlimitedChange;//base time throttling unlimited checkbox event
        $scope.enableIoThrottlingChange = enableIoThrottlingChange;
        $scope.private = {
            assignBandwidthOutsideTime: assignBandwidthOutsideTime,
            assignBandwidthInsideTime: assignBandwidthInsideTime
        };


        $scope.bandwidthThrottlingUnlimitedChange = function () {
            if ($scope.bandwidthThrottlingUnlimited) {//if checked set value to 0
                assignBandwidthOutsideTime(0);
            } else {//if unchecked set to current value
                if ($scope.outsideTimeBandwidth < 5) {
                    assignBandwidthOutsideTime(5);
                }
            }
        };

        $scope.timeBasedThrottlingUnlimitedChange = function () {
            if ($scope.timeBasedThrottlingUnlimited) {//if checked set value to 0
                assignBandwidthInsideTime(0);
            } else {//if unchecked set to current value
                if ($scope.insideTimeBandwidth < 5) {
                    assignBandwidthInsideTime(5);
                }
            }
        };


        initPerformanceCtrl();

        $scope.onInsideTimeBandwidthChange = function () {
            assignBandwidthInsideTime($scope.insideTimeBandwidth);
        };

        $scope.onOutsideTimeBandwidthChange = function () {
            assignBandwidthOutsideTime($scope.outsideTimeBandwidth);
        };

        $scope.onTimeBasedBandwidthChange = function () {
            if ($scope.bandwidthSettings.TimeBasedBandwidthEnabled) {
                $scope.bandwidthSettings.FromTimeInMinutes = lastSaved_FromTimeInMinutes;
                $scope.bandwidthSettings.ToTimeInMinutes = lastSaved_ToTimeInMinutes;
            }
        };

        /*
         * Watchers
         * */

        $scope.$watch('forms.performance.$valid', function (newValue) {
            siteSettingsModel.isValid = newValue;
            $scope.$emit(siteSettingsFactory.events.VALIDITY);
            siteSettingsFactory.tabs[siteSettingsFactory.tabsIndices.PERFORMANCE].valid = newValue;
        });


        $scope.$watch('forms.performance.$dirty', function (newValue) {
            if (!angular.isUndefined(newValue)) {
                $scope.applyButton.isDirty = newValue;
                $scope.validateModels();
            }
        });

        $scope.$on('siteSettings:clearDirtyFlag', function () {
            $scope.forms.performance.$setPristine();
        });


        /*
         * Functions
         * */
        function assignBandwidthOutsideTime(value) {
            $scope.outsideTimeBandwidth = value;
            $scope.bandwidthSettings.MaxBandwidthInLBpsOutsideTime = value * $scope.bandwidthMultiplier;
        }

        function assignBandwidthInsideTime(value) {
            $scope.insideTimeBandwidth = value;
            $scope.bandwidthSettings.MaxBandwidthInLBpsInTime = value * $scope.bandwidthMultiplier;
        }

        function handelIoThrottlingClickEvent(event) {
            if (event.target.name === zAlertFactory.buttons.CANCEL) {
                $scope.ioCongestionParams.IsEnabled = true;
            }
        }

        function enableIoThrottlingChange() {
            if (!$scope.ioCongestionParams.IsEnabled) {
                zAlertFactory.warn(null, $translate.instant('SITE_SETTINGS.PERFORMANCE.DISABLE_IO_THROTTLING'), handelIoThrottlingClickEvent);
            }
        }

        function initPerformanceCtrl() {
            $scope.bandwidthSettings = siteSettingsModel.settings.BandwidthSettings;
            $scope.ioCongestionParams = siteSettingsModel.settings.IoCongestionParams;

            //sliders configs, same for both
            $scope.inSideSliderConfig = angular.copy(siteSettingsFactory.BandwidthInLBpsOpts);
            $scope.outSideSliderConfig = angular.copy(siteSettingsFactory.BandwidthInLBpsOpts);
            $scope.bandwidthMultiplier = 256;
            $scope.hourMultiplier = 60;
            $scope.isPublicCloud = siteSettingsFactory.isPublicCloud;

            //region LOCAL MODEL conversion and variables =====================================================
            var bwSettings = $scope.bandwidthSettings;

            lastSaved_FromTimeInMinutes = bwSettings.FromTimeInMinutes;
            lastSaved_ToTimeInMinutes = bwSettings.ToTimeInMinutes;

            $scope.outsideTimeBandwidth = bwSettings.MaxBandwidthInLBpsOutsideTime !== 0 ? bwSettings.MaxBandwidthInLBpsOutsideTime / $scope.bandwidthMultiplier : 0;
            $scope.insideTimeBandwidth = bwSettings.MaxBandwidthInLBpsInTime !== 0 ? bwSettings.MaxBandwidthInLBpsInTime / $scope.bandwidthMultiplier : 0;
            $scope.hoursCollection = dataCollectionFactory.RESOURCE_REPORTS_HOURS_COLLECTION;
            $scope.minutesCollection = dataCollectionFactory.RESOURCE_REPORTS_MINUTES_COLLECTION;
            // $scope.outsideTimeBandwidthCustom = $scope.outsideTimeBandwidth ? $scope.outsideTimeBandwidth : '';
            //endregion

            var outsideTimeBandwidth = $scope.outsideTimeBandwidth === 0;
            var insideTimeBandwidth = $scope.insideTimeBandwidth === 0;

            $scope.bandwidthThrottlingUnlimited = outsideTimeBandwidth;
            // $scope.bandwidthThrottlingUnlimitedChange();

            $scope.timeBasedThrottlingUnlimited = insideTimeBandwidth;
            // $scope.timeBasedThrottlingUnlimitedChange();
        }//init function that set bandwidth value and unlimited checkbox

        //---------- advanced settings ---------///

        $scope.bandwidthSetting = false;

        $scope.advancedSettingsClick = function (event, type) {
            $scope.bandwidthSetting = type === 'show';
        };

    });
