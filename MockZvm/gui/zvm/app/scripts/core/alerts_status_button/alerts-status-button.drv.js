'use strict';

angular.module('zvmApp.core')
    .directive('alertsStatusButton', function (enums, summaryMinimalModel, $translate,alertsStatusPanelFactory) {
        return{
            restrict: 'E',
            templateUrl: 'scripts/core/alerts_status_button/alerts-status-button.html',
            link: function (scope) {
                //============================================================================
                // Properties
                //============================================================================
                scope.expandButton = 'assets/tasks/taskExpandButton.png';
                //============================================================================
                // Handle User Interaction
                //============================================================================
                scope._panelOpened = false;
                scope.handleAlertsStatusClicked = function () {
                    if (scope.data.SummaryState.AlertTips.TotalNumberOfAlerts > 0) {
                        alertsStatusPanelFactory.togglePanel();
                        scope._panelOpened = !scope._panelOpened;
                    }

                    if (scope._panelOpened) {
                        scope.expandButton = 'assets/tasks/collapseButton.png';
                    } else {
                        scope.expandButton = 'assets/tasks/taskExpandButton.png';
                    }
                };

                //============================================================================
                // Helpers
                //============================================================================
                scope.initializeStatusButtonClass = function (value) {
                    if (value === enums.ProtectionGroupAlertStatus.Normal) {
                        scope.alertsStatusButtonClass = 'normalAlertsStatusButtonClass';
                    } else if (value === enums.ProtectionGroupAlertStatus.Warning) {
                        scope.alertsStatusButtonClass = 'warningAlertsStatusButtonClass';
                    } else if (value === enums.ProtectionGroupAlertStatus.Error) {
                        scope.alertsStatusButtonClass = 'errorAlertsStatusButtonClass';
                    }
                };

                scope.initializeStatusButtonText = function (value) {
                    if (angular.isUndefined(scope.translations)) {
                        return;
                    }

                    if (value > 0) {
                        if (value === 1) {
                            scope.statusText = scope.translations['ALERTS_STATUS.ONE_ALERT'];
                        } else {
                            scope.statusText = value + ' ' + scope.translations['ALERTS_STATUS.ALERTS'];
                        }
                    } else {
                        scope.statusText = scope.translations['ALERTS_STATUS.NO_ALERTS'];
                    }
                };

                //============================================================================
                // Init of the component
                //============================================================================

                summaryMinimalModel.register(scope).then(null, null, function (result) {
                    scope.data = result;
                    scope.initializeStatusButtonClass(scope.data.SummaryState.AlertStatus);
                    scope.initializeStatusButtonText(scope.data.SummaryState.AlertTips.TotalNumberOfAlerts);
                });

                $translate(['ALERTS_STATUS.ONE_ALERT', 'ALERTS_STATUS.ALERTS', 'ALERTS_STATUS.NO_ALERTS']).then(function (translations) {
                    scope.translations = translations;
                });
            }
        };
    });
