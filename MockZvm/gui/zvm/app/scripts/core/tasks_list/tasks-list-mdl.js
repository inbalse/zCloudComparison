/**
 * Created by guy on 21/07/2014.
 */
'use strict';

angular.module('zvmApp.models')
    .factory('tasksListModel', function (zertoServiceUpdaterFactory, vos, taskTypeEnumFilter, $filter, enumConvertorFilter, enums) {

        var tasksListModel = {};
        var operation = 'GetTasksByFilter';
        var params = [new vos.CommandTaskRelatedEntityVisualObject(null, null, null, null), [], -1, enums.CommandTaskRecordSortType.StatusAndDate, -1];
        //var au = autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetTasksByFilter, params);

        tasksListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, operation, params, false, tasksListModel._processData);
        };

        tasksListModel.changeFilter = function (timeFilter, statusFilter) {
            params[1] = statusFilter;
            params[2] = timeFilter;
            zertoServiceUpdaterFactory.update();
        };

        tasksListModel.prog = 10;

        tasksListModel._processData = function (data) {

            _.forEach(data.TaskItems, function (item) {

                item.id = item.TaskId.Identifier;
                item.TaskTypeName = taskTypeEnumFilter(item.TaskType);
                item.StartedObj = {display: $filter('date')(item.Started, 'dd/MM/yyyy HH:mm:ss'), filterValue:item.Started};
                item.CompletedObj = {display: $filter('date')(item.Completed, 'dd/MM/yyyy HH:mm:ss'),filterValue:item.Completed};
                item.StatusText = enumConvertorFilter('TASK_STATUS', item.StateAndProgress.CurrentState);
                item.CurrentState = item.StateAndProgress.CurrentState;
                item.RelatedText = {display: $filter('tasksListRelated')(item)};

                item.StateAndProgress.filterValue = item.CurrentState === 1 ? item.StatusText + ' ' + item.StateAndProgress.Progress + '%' : item.StatusText;


                item.notesObj = {
                    display: '<div class="description-ellipsis"  content="' + _.replaceDoubleQuotesToSingle(item.Information) +
                    '" placement="left" trigger="manual" close="Yes" container="body" show="true" outside-close="true" z-popover>' +
                    '<a href="javascript:void(0);">' + item.Information + '</a></div>',
                    value: item.Information
                };

            });

            return data;
        };

        return tasksListModel;
    });
