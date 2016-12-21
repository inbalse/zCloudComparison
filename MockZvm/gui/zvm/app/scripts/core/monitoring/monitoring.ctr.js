'use strict';
angular.module('zvmApp.core')
    .controller('monitoringController', function ($scope, $translate, checkActiveState, summaryMinimalModel, globalStateModel) {
        var isPortal = globalStateModel.data.IsPortal;

        //set variables for remove alert tab border color jump delay
        $scope.activeErrorsCount = 0;
        $scope.activeWarningsCount = 0;

        $scope.tabs = [
            {title: $translate.instant('ALERTS'), route: 'main.monitoring.alerts', active: false, visible: !isPortal, tooltip: $translate.instant('ALERTS_TOOLTIP')},
            {title: $translate.instant('EVENTS'), route: 'main.monitoring.events', active: false, visible: !isPortal, tooltip: $translate.instant('EVENTS_TOOLTIP')},
            {title: $translate.instant('TASKS'), route: 'main.monitoring.tasks', active: false, visible: !isPortal, tooltip: $translate.instant('TASKS_TOOLTIP')}
        ];

        $scope.$on('$stateChangeSuccess', function () {
            checkActiveState.byPartialName($scope.tabs);
        });
        //===============================================================
        // Init the values inside the tabs
        //===============================================================
        summaryMinimalModel.register($scope).then(null, null, function (result) {
            $scope.activeErrorsCount = result.SummaryState.AlertTips.TotalNumberOfErrors;
            $scope.activeWarningsCount = result.SummaryState.AlertTips.TotalNumberOfWarnings;
            $scope.runningTasksCount = 0;
            if(result.TaskSummary.RunningTasksCount > 0){
                $scope.tasksText = result.TaskSummary.RunningTasksCount + ' ' + $translate.instant('MONITORING_TABS.RUNNING_TASKS');
                $scope.runningTasksCount = result.TaskSummary.RunningTasksCount;
            }
            if(result.TaskSummary.WaitingTasksCount > 0 ){
                $scope.tasksText = result.TaskSummary.WaitingTasksCount + ' ' + $translate.instant('TASK_AWAITING_INPUT');
                $scope.runningTasksCount = result.TaskSummary.WaitingTasksCount;
            }

            $scope.eventsCount = result.SummaryState.NumberOfRecentEvents;
        });
    });
