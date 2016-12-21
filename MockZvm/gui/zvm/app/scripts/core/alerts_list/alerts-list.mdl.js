'use strict';
angular.module('zvmApp.models')
    .factory('alertsListModel', function (zertoServiceUpdaterFactory, taskTypeEnumFilter, $filter, $translate) {

        var alertsListModel = {};
        alertsListModel.isDisplayAcknowledged = false;
        var operation = 'GetAlertsScreen';

        alertsListModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, operation, [], false, alertsListModel.processData);
        };

        alertsListModel.processData = function (data) {
            var processed = data.Alerts;

            if (!alertsListModel.isDisplayAcknowledged) {
                processed = _.filter(processed, function (item) {
                    return item.IsDismissed === false;
                });
            }

            processed = _.forEach(processed, function (item) {
                item.StartTimeObj = {};
                item.StartTimeObj.display = $filter('date')(item.StartTime, 'dd/MM/yyyy HH:mm:ss');
                item.StartTimeObj.filterValue = item.StartTime;
                item.Zorgs = alertsListModel._listOfZorg(item.AffectedOrgs);
                item.id = item.Id;
                var alertLink = item.HelpId === 'Unknown' ? 'alerts' : item.HelpId;
                item.alertLink = '/Help/index.html#context/ErrorsGuide/' + alertLink;

                // remove html tags due to bug 26002 - Azure: License Expiry alert description has highlighting in the wrong place
                var description = _.isHtml(item.Description) ? _.removeHtmlTagsFromString(item.Description) : item.Description;

                item.DescriptionObj = {
                    display: '<div class="description-ellipsis"  content="' + _.replaceDoubleQuotesToSingle(item.Description) +
                    '" placement="left" trigger="manual" close="Yes" container="body" show="true" outside-close="true" z-popover>' +
                    '<a href="javascript:void(0);">' + _.replaceDoubleQuotesToSingle(description) + '</a></div>',
                    value: item.Description
                };

                item.EntitiesObj = {
                    value: item.Entities,
                    filterValue: _.pluck(item.Entities, 'Name').join(' ')
                };

                item.IsDismissedObj = {
                    display: item.IsDismissed,
                    title: item.IsDismissed ? $translate.instant('GRID_COLUMNS.ALERT_ACKNOWLEDGED') : $translate.instant('GRID_COLUMNS.ALERT_NOT_ACKNOWLEDGED')
                };
            });

            return processed;
        };

        alertsListModel._listOfZorg = function (affectedOrgs) {
            var list = _.pluck(affectedOrgs, 'Name');
            return list.join(', ');
        };

        alertsListModel.displayAcknowledged = function (checked) {
            alertsListModel.isDisplayAcknowledged = checked;
            zertoServiceUpdaterFactory.update();
        };

        return alertsListModel;
    });
