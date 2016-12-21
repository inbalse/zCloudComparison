'use strict';
angular.module('zvmApp.core')
    .directive('tasksMini', function (summaryMinimalModel, vos, enums, taskTypeEnumFilter, $translate, tasksSummaryFactory) {
        return{
            restrict: 'E',
            templateUrl: 'scripts/core/tasks_mini/tasks-mini.html',
            scope: {
                showTaskSummary: '='
            },
            link: function (scope) {
                //show waiting for input tasks
                scope.tasksBackground = 'noBackground';
                scope.expandButton = 'assets/tasks/taskExpandButton.png';
                scope.taskSummaryFactory = tasksSummaryFactory;

                $translate(['NO_RUNNING_TASKS', 'RUNNING_TASKS', 'TASK_AWAITING_INPUT']).then(function (translations) {
                    scope.NO_RUNNING_TASKS = translations.NO_RUNNING_TASKS;
                    scope.RUNNING_TASKS = translations.RUNNING_TASKS;
                    scope.TASK_AWAITING_INPUT = translations.TASK_AWAITING_INPUT;
                });

                scope.openSummary = function () {
                    tasksSummaryFactory.togglePanel();

                };

                scope.$watch('taskSummaryFactory.shown', function ngShowWatchAction(value) {
                    if (value) {
                        scope.expandButton = 'assets/tasks/collapseButton.png';
                    } else {
                        scope.expandButton = 'assets/tasks/taskExpandButton.png';
                    }
                });

                summaryMinimalModel.register(scope).then(null, null, function (result) {
                    scope.TaskSummary = result.TaskSummary;
                    scope.handleUpdateData();
                });

                scope.handleUpdateData = function () {

                    var firstText = scope.NO_RUNNING_TASKS;
                    var secondText = '';
                    var secondTextStyle = 'waitingText';
                    var iconClass = 'defaultIconTask';
                    var showProgress = false;


                    if (scope.TaskSummary.RunningTasksCount > 0) {
                        firstText = scope.TaskSummary.RunningTasksCount + ' ' + scope.RUNNING_TASKS;
                    }
                    if (scope.TaskSummary.WaitingTasksCount > 0) {
                        firstText = scope.TaskSummary.WaitingTasksCount + ' ' + scope.TASK_AWAITING_INPUT;
                        iconClass = 'pendingIconTask';
                    }
                    if ((scope.TaskSummary.WaitingTasksCount > 0 || scope.TaskSummary.RunningTasksCount > 0) && scope.TaskSummary.LastCommandTask) {
                        secondText = taskTypeEnumFilter(scope.TaskSummary.LastCommandTask.TaskType);
                        secondTextStyle = 'inProgressText';
                        if (scope.TaskSummary.LastCommandTask.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.Failed) {
                            iconClass = 'failIconTask';
                            secondText = secondText + ' Failed';
                            secondTextStyle = 'failedText';
                        } else if (scope.TaskSummary.LastCommandTask.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.InProgress) {
                            iconClass = 'pendingIconTask';
                            //progress bar
                            if (scope.TaskSummary.LastCommandTask.StateAndProgress.Progress > 0) {
                                secondText = secondText + ' (' + scope.TaskSummary.LastCommandTask.StateAndProgress.Progress + '%)';
                                showProgress = true;

                            }
                        }
                    }
                    scope.showProgress = showProgress;
                    scope.runningText = firstText;
                    scope.pendingText = secondText;
                    scope.tasksIconClass = iconClass;
                    scope.secondTextStyle = secondTextStyle;
                };
            }
        };
    });
