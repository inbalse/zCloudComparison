'use strict';

angular.module('zvmApp.core')
    .controller('navigationTabsController', function ($scope, $rootScope, $state, $stateParams, $translate, checkActiveState, navigationTabsFactory, globalStateModel, summaryMinimalModel, basil, pairSitesFactory, vraInstallFactory, zertoServiceFactory, zAlertFactory, enums) {
        $scope.initStaticTabs = function () {
            var isIframe = globalStateModel.isIframe;
            var isPortal = globalStateModel.data.IsPortal;
            var isAws = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws;
            var isPublicCloud = isAws || globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure;

            $scope.mainStaticTabs = [
                {
                    title: $translate.instant('DASHBOARD'),
                    route: 'main.dashboard',
                    active: false,
                    visible: !isIframe && !isPortal,
                    tooltip: $translate.instant('DASHBOARD_TOOLTIP')
                },
                {
                    title: $translate.instant('VPGS'),
                    route: 'main.vpgs',
                    active: false,
                    visible: true,
                    tooltip: $translate.instant('VPGS_TOOLTIP')
                },
                {
                    title: $translate.instant('VMS'),
                    route: 'main.vms',
                    active: false,
                    visible: true,
                    tooltip: $translate.instant('VMS_TOOLTIP')
                },
                {
                    title: $translate.instant('SITES'),
                    route: 'main.sites',
                    active: false,
                    visible: !isIframe && !isPortal,
                    tooltip: $translate.instant('SITES_TOOLTIP')
                },
                {
                    title: $translate.instant('SETUP'),
                    route: 'main.setup',
                    active: false,
                    visible: !isPortal,
                    tooltip: isPublicCloud ? $translate.instant('PUBLIC_CLOUD_SETUP_TOOLTIP') : $translate.instant('SETUP_TOOLTIP')
                },
                {
                    title: $translate.instant('OFFSITE'),
                    route: 'main.offsite',
                    active: false,
                    visible: !isPortal,
                    tooltip: $translate.instant('OFFSITE_TOOLTIP')
                },
                {
                    title: $translate.instant('MONITORING'),
                    route: 'main.monitoring',
                    active: false,
                    visible: !isPortal,
                    tooltip: $translate.instant('MONITORING_TOOLTIP')
                },
                {
                    title: $translate.instant('REPORTS'),
                    route: 'main.reports',
                    active: false,
                    visible: !isPortal,
                    tooltip: isAws ? $translate.instant('AWS_REPORTS_TOOLTIP') : $translate.instant('REPORTS_TOOLTIP')
                }
            ];
        };

        $scope.initDynamicTabs = function () {
            $scope.dynamicTabs = navigationTabsFactory.dynamicTabs;
        };

        $scope.onTabCloseClick = function (e, id, name) {
            //prevent trigger state change by stopping propagation
            e.preventDefault();
            navigationTabsFactory.removeTab(id, name);
            //in case we got other dynamic tab - open them, otherwise open vpg list
            if ($scope.dynamicTabs.length > 0) {
                var cleanRoute = $scope.dynamicTabs[0].route.split('(')[0];

                if ($scope.dynamicTabs[0].name) {
                    $state.go(cleanRoute, {id: $scope.dynamicTabs[0].id, name: $scope.dynamicTabs[0].name});
                } else {
                    $state.go(cleanRoute, {id: $scope.dynamicTabs[0].id});
                }
            } else {
                $state.go(globalStateModel.getDefaultRoute());
            }
        };

        //========================================================================================================================//
        //                                         Popover Quick Start
        //========================================================================================================================//
        function verifyIfPopoverSitesShow(sitesCount, isSelfReplicationAllowed) {
            if (basil.get('isPopoverSitesBeenClose') === null) {
                if (angular.isDefined(sitesCount)) {
                    $scope.isPopoverSitesShow = (sitesCount === 0 && !isSelfReplicationAllowed);
                }
            }
        }

        $scope.navigateToSites = function () {
            if ($state.current.name === 'main.sites') {
                pairSitesFactory.showPairSites();
            } else {
                $state.go('main.sites', {quickPair: true});
            }
        };

        $scope.navigateToVra = function () {
            zertoServiceFactory.GetVraListScreen().then(function (result) {
                if (result.CanInstallAdditionalVras) {
                    if ($state.current.name === 'main.setup.vras') {
                        vraInstallFactory.showInstallVra();
                    } else {
                        $state.go('main.setup.vras', {quickInstall: true});
                    }
                } else {
                    zAlertFactory.fail('Error', $translate.instant('EXCEPTIONS.PERMISSION_ERROR'));
                }
            });

        };

        $scope.closeSites = function () {
            basil.set('isPopoverSitesBeenClose', 'sitePopoverBeenClose');
        };

        $scope.onSummaryMinimalModelResult = function (data) {
            $scope.IsSelfReplicationAllowed = data.SummaryState.IsSelfReplicationAllowed;
            $scope.sitesCount = data.SummaryState.RemoteConnectionStatus.NumPeers;
            $scope.vrasCount = data.SummaryState.NumberOfVras;//used in main-view.html

            verifyIfPopoverSitesShow($scope.sitesCount, $scope.IsSelfReplicationAllowed);
        };

        //========================================================================================================================//
        //
        //========================================================================================================================//

        $scope._activateTabs = function () {
            checkActiveState.byPartialName($scope.mainStaticTabs);
            checkActiveState.byPartialName($scope.dynamicTabs);

            //================ managed drop down tab been in action =================//
            checkActiveState.byPartialName($scope.ellipsisCollection);
            var isDynamicActive = _.find($scope.ellipsisCollection, function (tab) {
                return tab.active;
            });

            $scope.dropdownTabActive = angular.isDefined(isDynamicActive);
        };

        summaryMinimalModel.register($scope).then(null, null, $scope.onSummaryMinimalModelResult);
        $scope.initStaticTabs();
        $scope.initDynamicTabs();
        $scope._activateTabs();

        $scope.$on('$stateChangeSuccess', function () {
            $scope._activateTabs();
        });
    });
