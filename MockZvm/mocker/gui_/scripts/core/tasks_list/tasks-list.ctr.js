'use strict';
angular.module('zvmApp.core')
    .constant('tasksTimeFilterConst', {
        ANY: -1,
        THREE_HOURS: 3,
        SIX_HOURS: 6,
        TWELTH_HOURS: 12,
        TWENTYFOUR_HOURS: 24,
        THIRTY_SIX_HOURS: 36,
        FORTHY_EIGHT_HOURS: 48

    }).constant('tasksListGridEvents', {
        notesClicked: 'Task::NotesClicked',
        StopFailoverTestEvent: 'Task::StopFailoverTestEvent',
        RollbackEvent: 'Task::RollbackEvent',
        ResumeEvent: 'Task::ResumeEvent',
        StopBackupEvent: 'Task::StopBackupEvent',
        StopCloneEvent: 'Task::StopCloneEvent',
        CancelEvent: 'Task::CancelEvent',
        CommitEvent: 'Task::CommitEvent',
        FlrUnmountEvent: 'Task::FlrUnmountEvent',
        FlrBrowseEvent: 'Task::FlrBrowseEvent'
    })
    .controller('tasksListController', function ($scope, $filter, $window, $translate, $compile, tasksListModel,
                                                 zSlickGridFilterTypes, tasksService, siteSettingsFactory,
                                                 enums, tasksTimeFilterConst) {
        //==========================================================================
        //  Properties
        //==========================================================================
        $scope.statusExtraSettings = {
            displayProp: 'label',
            idProp: 'value',
            externalIdProp: 'value',
            enableSearch: true
        };
        $scope.gridObj = {};

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'TaskTypeName',
                text: $translate.instant('GROUP_BY_LIST.TASK_TYPE')
            }
        ];

        var NOTES_FIELD = 'notesObj',
            STARTED_FIELD = 'StartedObj';

        var columnDefs = [
            {
                name: '',
                hideFromEditColumns: true,
                maxWidth: 40,
                resizable: false,
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                field: 'CurrentState',
                formatter: $filter('enumToCssClassFormatter')('tasks-list-status'),
                headerCssClass: 'tasks-list-level-status-header'
            },
            {
                name: $translate.instant('TASKS_LIST.TASK'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'TaskTypeName'
            },
            {
                name: $translate.instant('TASKS_LIST.STATUS'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'StateAndProgress',
                formatter: $filter('tasksStatusFormatter'),
                minWidth:170
            },
            {
                name: $translate.instant('TASKS_LIST.RELATED'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'RelatedText',
                formatter: $filter('objectFormatter')
            },
            {
                name: $translate.instant('TASKS_LIST.USER'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: 'InitiatedBy'
            },
            {
                name: $translate.instant('TASKS_LIST.STARTED'),
                filter: zSlickGridFilterTypes.DATE,
                formatter: $filter('objectFormatter'),
                field: STARTED_FIELD
            },
            {
                name: $translate.instant('TASKS_LIST.COMPLETED'),
                filter: zSlickGridFilterTypes.DATE,
                formatter: $filter('objectFormatter'),
                field: 'CompletedObj'
            },
            {
                name: $translate.instant('TASKS_LIST.NOTES'),
                filter: zSlickGridFilterTypes.WILDCARD,
                field: NOTES_FIELD,
                formatter: $filter('objectFormatter')
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showCheckbox: false,
            showSearch: true,
            defaultSortField: STARTED_FIELD,
            defaultSortAsc: false
        };

        $scope.timeList = [{value: tasksTimeFilterConst.ANY, label: $translate.instant('TASK_FILTER_ANY')},
            {value: tasksTimeFilterConst.THREE_HOURS, label: '3 hours'},
            {value: tasksTimeFilterConst.SIX_HOURS, label: '6 hours'},
            {value: tasksTimeFilterConst.TWELTH_HOURS, label: '12 hours'},
            {value: tasksTimeFilterConst.TWENTYFOUR_HOURS, label: '24 hours'},
            {value: tasksTimeFilterConst.THIRTY_SIX_HOURS, label: '36 hours'},
            {value: tasksTimeFilterConst.FORTHY_EIGHT_HOURS, label: '48 hours'}];
        $scope.selectedTime = $scope.timeList[0].value;

        $scope.statusList = [
            {
                value: enums.CommandTaskStatusFilterVisualObject.Running,
                label: $translate.instant('ENUM.TASKS_STATUS_FILTER.' + enums.CommandTaskStatusFilterVisualObject.Running)
            },
            {
                value: enums.CommandTaskStatusFilterVisualObject.Completed,
                label: $translate.instant('ENUM.TASKS_STATUS_FILTER.' + enums.CommandTaskStatusFilterVisualObject.Completed)
            },
            {
                value: enums.CommandTaskStatusFilterVisualObject.Failed,
                label: $translate.instant('ENUM.TASKS_STATUS_FILTER.' + enums.CommandTaskStatusFilterVisualObject.Failed)
            },
            {
                value: enums.CommandTaskStatusFilterVisualObject.WaitingForUserInput,
                label: $translate.instant('ENUM.TASKS_STATUS_FILTER.' + enums.CommandTaskStatusFilterVisualObject.WaitingForUserInput)
            }
        ];

        $scope.selectedStatuses = [];
        //==========================================================================
        //  Buttons events
        //==========================================================================
        $scope.export = function () {
            $window.open('/ZvmService/TaskReport/Tasks?' + $scope.buildExportParameters());
        };

        $scope.buildExportParameters = function () {
            var params = '';
            if ($scope.selectedStatuses.length > 0) {
                params = params + 'status=' + _.map($scope.selectedStatuses, 'value').join('+');
            }

            if ($scope.selectedTime > -1) {
                params = params + (params !== '' ? '&' : '') + 'maxAgeInHours=' + $scope.selectedTime;
            }
            return params;
        };

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        //grid event fire on row click
        $scope.rowClick = function (e, row, cell, grid) {
            //popover
            if (cell === grid.getColumnIndex(NOTES_FIELD)) {
                e.preventDefault();
                e.stopPropagation();
                $compile($(e.target).closest('div'))($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
            if (angular.isDefined(e.target.value)) {
                e.preventDefault();
                var task = $scope.gridObj.grid.getDataItem(row);
                tasksService.executeAction(task, e.target.value);
            }
        };


        //==========================================================================
        //  Get the data
        //==========================================================================
        $scope.changeTimeFilter = function () {
            var selectedStatuses = _.map($scope.selectedStatuses, 'value');
            tasksListModel.changeFilter($scope.selectedTime, selectedStatuses);
        };

        $scope.$watch('selectedStatuses.length', function () {
            var selectedStatuses = _.map($scope.selectedStatuses, 'value');
            tasksListModel.changeFilter($scope.selectedTime, selectedStatuses);
        });

        tasksListModel.register($scope).then(null, null, function (result) {
            $scope.data = result.TaskItems;
        });
    });
