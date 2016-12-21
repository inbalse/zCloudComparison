'use strict';
angular.module('zvmApp.core')
    .controller('mainViewController', function ($scope, summaryMinimalModel, siteSettingsFactory, $document,
                                                globalStateModel, recoveryWizardFactory, analyticsEventsTypes) {
        $scope.title = 'main view';
        $scope.showSummary = false;
        $scope.state = 'summaryTasksPanel';
        $scope.IsPortal = globalStateModel.data.IsPortal;
        $scope.failoverStates = {TEST: 'Test', LIVE: 'Live'};
        $scope.failoverState = $scope.failoverStates.TEST;
        $scope.isIframe = globalStateModel.isIframe;

        if (globalStateModel.isIframe) {
            $scope.headerClass = 'iframeMainViewHeader mainViewHeader';
        } else {
            $scope.headerClass = 'mainViewHeader';
        }

        summaryMinimalModel.register($scope).then(null, null, function (result) {
            $scope.summaryMinimalData = result;
            $document[0].title = 'Zerto - ' + result.SiteDetails.SiteName;
            $scope.currentLocalTime = result.SiteDetails.CurrentLocalTime;
            $scope.siteName = globalStateModel.siteName = result.SiteDetails.SiteName;
            $scope.location = result.SiteDetails.Location;
            $scope.ipAddress = result.SiteDetails.IpAddress;
            $scope.contactInfo = result.SiteDetails.ContactInfo;
            //failover
            $scope.enableBtn = $scope.failoverState === $scope.failoverStates.TEST ? $scope.summaryMinimalData.SummaryState.IsGeneralFailoverTestEnabled : $scope.summaryMinimalData.SummaryState.IsGeneralFailoverEnabled;
            globalStateModel.siteVersion = result.SiteDetails.SiteVersion;
            globalStateModel.contactEmail = result.SiteDetails.ContactEmail;
        });

        $scope.showSiteSettings = function () {
            siteSettingsFactory.showSiteSettings();
        };
        //==================================== failover =====================================
        $scope.failoverToggleClick = function () {
            if ($scope.failoverState === $scope.failoverStates.TEST) {
                $scope.failoverState = $scope.failoverStates.LIVE;
                $scope.enableBtn = $scope.summaryMinimalData.SummaryState.IsGeneralFailoverEnabled;
            } else {
                $scope.failoverState = $scope.failoverStates.TEST;
                $scope.enableBtn = $scope.summaryMinimalData.SummaryState.IsGeneralFailoverTestEnabled;
            }
        };
        $scope.faioverButtonClick = function () {
            if (!$scope.enableBtn) {
                return;
            }
            if ($scope.failoverState === $scope.failoverStates.TEST) {
                $scope.$emit(analyticsEventsTypes.FAILOVER.TEST.INITIAL);
                recoveryWizardFactory.failoverTest();
            } else {
                $scope.$emit(analyticsEventsTypes.FAILOVER.LIVE.INITIAL);
                recoveryWizardFactory.failoverLive();
            }
        };

        //this code useful just in develop mode !!!
        if('@@env' !== 'production') {
            $scope.countWatchers = function () {
                var root = angular.element(document.getElementsByTagName('body'));

                var watchers = [];

                var f = function (element) {
                    angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
                        if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                            angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                                watchers.push(watcher);
                            });
                        }
                    });

                    angular.forEach(element.children(), function (childElement) {
                        f(angular.element(childElement));
                    });
                };

                f(root);

                // Remove duplicate watchers
                var watchersWithoutDuplicates = [];
                angular.forEach(watchers, function (item) {
                    if (watchersWithoutDuplicates.indexOf(item) < 0) {
                        watchersWithoutDuplicates.push(item);
                    }
                });

                $scope.watchers = watchersWithoutDuplicates.length;
            };

            $scope.$on('$viewContentLoaded', function () {
                $scope.countWatchers();
            });
        }

        //==================================== failover =====================================

        $scope.doubleClick = function (event) {
            if (event.ctrlKey) {
                $scope.isDebuggerOpen = true;
            }
        };

        $scope.$on('closeDebugger', function () {
            $scope.isDebuggerOpen = false;
        });
    });

