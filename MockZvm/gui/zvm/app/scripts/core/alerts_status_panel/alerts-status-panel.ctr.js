'use strict';

angular.module('zvmApp.core')
    .controller('alertsStatusPanelController', function ($scope, $state, alertsStatusPanelFactory, summaryMinimalModel) {
        summaryMinimalModel.register($scope).then(null, null, function (result) {
            $scope.alertsList = result.SummaryState.AlertTips.Alerts;
        });
        $scope.hidePanel = function () {
            alertsStatusPanelFactory.hidePanel();
        };

        $scope.handleSeeAllAlertsClicked = function () {
            $scope.hidePanel();
            $state.go('main.monitoring.alerts');
        };
    });
