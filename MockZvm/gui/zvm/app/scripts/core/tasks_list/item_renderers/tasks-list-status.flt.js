'use strict';

angular.module('zvmApp.filters')
    .filter('tasksStatusFormatter', function ($translate, enums, tasksListGridEvents, tasksService) {

        return function (row, cell, value, columnDef, dataContext) {
            if (value) {

                var tempString;

                var spanTemplate = _.template('<span class="<%=className%>"><%=statusText%></span>');
                var divTemplate = _.template('<div class="<%=className%>">');
                var buttonTemplate = _.template('<button title="<%=title%>" value="<%=event%>" class="<%=className%>"></button>');
                var progressBarTemplate = _.template('<div class="<%=className%>">' +
                    '<div class="<%=innerClassName%>" ' +
                    'role="<%=role%>" ' +
                    'aria-valunow="<%=ariaNow%>" ' +
                    'aria-valuemin="<%=ariaMin%>" ' +
                    'aria-valuemax="<%=ariaMax%>" ' +
                    'style="<%=width%>">' +
                    '</div> ' +
                    '</div>');

                if (value.CurrentState === enums.CommandTaskRecordStateVisualObject.InProgress && value.Progress > 0) {
                    tempString = spanTemplate({
                        className: 'progress-span',
                        statusText: dataContext.StatusText + ' ' + value.Progress + '%'
                    });

                    tempString += progressBarTemplate({
                        className: 'progress slimNoValueProgressBar',
                        innerClassName: 'progress-bar progress-bar-danger',
                        role: 'progressbar',
                        ariaNow: value.Progress,
                        ariaMin: 0,
                        ariaMax: 100,
                        width: 'width:' + value.Progress + '%'
                    });

                } else {
                    tempString = spanTemplate({
                        className: 'progress-span',
                        statusText: dataContext.StatusText
                    });
                }

                tasksService.setState(dataContext);

                tempString += divTemplate({
                    className: 'tasks-buttons-in-list'
                });

                if (dataContext.showLeftButton) {
                    tempString += buttonTemplate({
                        title: dataContext.leftButtonTooltip,
                        event: dataContext.leftButtonEvent,
                        className: dataContext.leftButtonClass + ' float-tasks-list-button-left'
                    });
                }

                if (dataContext.showRightButton) {
                    tempString += buttonTemplate({
                        title: dataContext.rightButtonTooltip,
                        event: dataContext.rightButtonEvent,
                        className: dataContext.rightButtonClass + ' float-tasks-list-button-right'
                    });
                }

                tempString += '</div>';
                return tempString;

            } else {
                return '';
            }
        };
    });
