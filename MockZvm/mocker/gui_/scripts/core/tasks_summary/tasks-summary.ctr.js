'use strict';
angular.module('zvmApp.core')
    .controller('tasksSummaryController', function ($scope, $state, $translate, $filter, summaryTasksModel, enums, tasksService, tasksSummaryFactory) {

        //==========================================================================
        //  Properties
        //==========================================================================
        $scope.TaskItems = [];

        summaryTasksModel.register($scope).then(null, null, function (result) {
            $scope.TaskItems = result.TaskItems;

            _.forEach($scope.TaskItems, function (task) {
                task.showProgress = false;

                tasksService.setState(task);

                switch (task.StateAndProgress.CurrentState) {
                    case enums.CommandTaskRecordStateVisualObject.Completed:
                        task.tasksIconClass = 'successIconTask';
                        task.showIconOrProgress = true;
                        break;
                    case enums.CommandTaskRecordStateVisualObject.Failed:
                        task.tasksIconClass = 'failedIconTask';
                        task.showIconOrProgress = true;
                        break;
                    case enums.CommandTaskRecordStateVisualObject.InProgress:
                        task.showProgress = true;
                        task.showIconOrProgress = false;
                        break;
                    case enums.CommandTaskRecordStateVisualObject.WaitingForUserInput:
                        task.tasksIconClass = 'waitingIconTask';
                        task.showIconOrProgress = true;
                        break;
                    default:
                        task.showIconOrProgress = false;
                        break;
                }

                if (task.RelatedEntities !== undefined && task.RelatedEntities.length > 0) {
                    if (task.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.WaitingForUserInput &&
                        (task.TaskType === enums.ExtensionTask_ZCommand.FailOverTest ||
                        task.TaskType === enums.ExtensionTask_ZCommand.MoveBeforeCommit ||
                        task.TaskType === enums.ExtensionTask_ZCommand.FailoverBeforeCommit)) {
                        task.Description = task.RelatedEntities[0].Name + $translate.instant('TASK_SUMMARY.WAITING');
                    } else {
                        task.Description = task.RelatedEntities[0].Name;
                    }
                } else {
                    task.Description = '';
                }
                task.TaskTypeEnum = $filter('taskTypeEnum')(task.TaskType);
                task.HasLongTaskType = task.TaskTypeEnum.length > 20;
                task.HasLongDescription = task.Description.length > 40;
            });
        });

        //==========================================================================
        //  Helpers
        //==========================================================================
        $scope._getPriorityByStatus = function (status) {

            switch (status) {
                case enums.CommandTaskRecordStateVisualObject.Completed:
                    return 6;
                case enums.CommandTaskRecordStateVisualObject.Failed:
                    return 5;
                case enums.CommandTaskRecordStateVisualObject.Cancelling:
                    return 4;
                case enums.CommandTaskRecordStateVisualObject.Paused:
                    return 3;
                case enums.CommandTaskRecordStateVisualObject.InProgress:
                    return 2;
                case enums.CommandTaskRecordStateVisualObject.WaitingForUserInput:
                    return 1;
                default:
                    return 7;
            }
        };
        //==========================================================================
        //  User interaction
        //==========================================================================
        $scope.taskAction = function (task, action) {
            tasksService.executeAction(task, action);
        };

        $scope.hidePanel = function () {
            tasksSummaryFactory.hidePanel();
        };

        $scope.handleSeeAllTasksClicked = function () {
            $scope.hidePanel();
            $state.go('main.monitoring.tasks');
        };
    });
