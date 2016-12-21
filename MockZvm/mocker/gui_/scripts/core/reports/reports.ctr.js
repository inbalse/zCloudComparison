'use strict';

angular.module('zvmApp.core')
    .controller('reportsController', function ($scope, $translate, $state, usageReportModel, globalStateModel, analyticsEventsTypes, enums) {
        $scope.isPublicCloud = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws ||
            globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure;
        $scope.isCloudLicense = false;

        usageReportModel.getLicenseType().then(function (licenseType) {
            $scope.isCloudLicense = (licenseType === enums.SiteLicenseType.Cloud);
        });

        $scope.handleDropdownClick = function (event) {

            var textTitle = event.currentTarget.text.trim();
            if (textTitle[textTitle.length - 1] === '?') {
                textTitle = textTitle.slice(0, textTitle.length - 1);
            }

            var index = _.findIndex($scope.menuItems, function (item) {
                return textTitle === item.title;
            });

            $scope.current = $scope.menuItems[index].title;
            $scope.currentTooltip = $scope.menuItems[index].tooltip;

            $scope.$emit(analyticsEventsTypes.REPORTS, $scope.current);
        };

        $scope.menuItems = [
            {
                route: 'main.reports.outboundprotection',
                title: $translate.instant('REPORTS_VIEW.OUTBOUND_PROTECTION_OVER_TIME_TITLE'),
                tooltip: $translate.instant('REPORTS_VIEW.OUTBOUND_PROTECTION_OVER_TIME_TOOLTIP')
            },
            {
                route: 'main.reports.protectionovertime',
                title: $translate.instant('REPORTS_VIEW.PROTECTION_OVER_TIME_BY_ZORG_TITLE'),
                tooltip: $translate.instant('REPORTS_VIEW.PROTECTION_OVER_TIME_BY_ZORG_TOOLTIP')
            },
            {
                route: 'main.reports.recoveryreports',
                title: $translate.instant('REPORTS_VIEW.RECOVERY_REPORTS_TITLE'),
                tooltip: $translate.instant('REPORTS_VIEW.RECOVERY_REPORTS_TOOLTIP')
            },
            {
                route: 'main.reports.resourcereports',
                title: $translate.instant('REPORTS_VIEW.RESROUCE_REPORTS_TITLE'),
                tooltip: $translate.instant('REPORTS_VIEW.RESROUCE_REPORTS_TOOLTIP')
            },
            {
                route: 'main.reports.usage',
                title: $translate.instant('REPORTS_VIEW.USAGE_TITLE'),
                tooltip: $translate.instant('REPORTS_VIEW.USAGE_TOOLTIP')
            },
            {
                route: 'main.reports.vpgperformance',
                title: $translate.instant('REPORTS_VIEW.VPG_PERFORMANCE_TITLE'),
                tooltip: $translate.instant('REPORTS_VIEW.VPG_PERFORMANCE_TOOLTIP')
            }
        ];

        function setSelectedTitle() {
            var currentItem = _.where($scope.menuItems, {'route': $state.current.name})[0];
            if(!_.isNullOrUndefined(currentItem)){
                $scope.current = currentItem.title;
                $scope.currentTooltip = currentItem.tooltip;
            }
        }

        if ($state.current.name === 'main.reports') {
            var url = $scope.isPublicCloud ? 'main.reports.protectionovertime' : 'main.reports.vpgperformance';

            $state.go(url).then(function () {
                setSelectedTitle();
            });
        } else {
            setSelectedTitle();
        }

    });
