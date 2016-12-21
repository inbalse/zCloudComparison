'use strict';

angular.module('zvmApp.models')
    .factory('eventsListModel', function (zertoServiceFactory, $filter, vos, enums, $q, $translate){

        var eventsListModel = {};

        var defaultFilter = new vos.ActivityScreenQueryCriterias();
        defaultFilter.EventGeneralTypes = new vos.EventGeneralTypesCriteria();
        defaultFilter.EventGeneralTypes.EventGeneralType = enums.SystemEventType_GeneralEventType.Events;
        defaultFilter.TimeRange = new vos.TimeCriteria();
        defaultFilter.TimeRange.From = moment().startOf('month').toDate();
        defaultFilter.TimeRange.To =  moment().add(1, 'days').toDate();

        eventsListModel._params = defaultFilter;

        eventsListModel.getData = function () {
            var deferred = $q.defer();
            zertoServiceFactory.GetActivityScreenVisualObject(eventsListModel._params).then(function (result) {
                deferred.resolve(eventsListModel._processData(result));
            },function (result) {
                deferred.reject(result);
            });
            return deferred.promise;
        };

        eventsListModel._processData = function (result) {
            var processed = result;

            processed.Events = _.forEach(processed.Events, function (item) {
                item.id = JSON.stringify(item.EventIdentifier.EventGuid);
                item.TimeStampObj = {display: $filter('date')(item.TimeStamp, 'dd/MM/yyyy HH:mm:ss'), value: item.TimeStamp};
                item.EventTypeIcon = item.EventType.indexOf('Alert') === 0 ? 1 : 0;
                var title = '';
                switch (item.EventType){
                    case enums.SystemEventType_GeneralEventType.Events: {
                        title = $translate.instant('GRID_COLUMNS.EVENT_TYPE_EVENTS');
                        break;
                    }
                    case enums.SystemEventType_GeneralEventType.Alerts: {
                        title = $translate.instant('GRID_COLUMNS.EVENT_TYPE_ALERTS');
                        break;
                    }
                    default : {
                        title = $translate.instant('GRID_COLUMNS.EVENT_TYPE_ALL');
                        break;
                    }
                }

                item.EventTypeIconObj = {display: item.EventTypeIcon, title:title};

                // remove html tags due to bug 26002 - Azure: License Expiry alert description has highlighting in the wrong place
                var description = _.isHtml(item.Description) ? _.removeHtmlTagsFromString(item.Description) : item.Description;

                item.DescriptionObj = {
                    display: '<div class="description-ellipsis"  content="' + _.replaceDoubleQuotesToSingle(item.Description) +
                            '" placement="left" trigger="manual" close="Yes" container="body" show="true" outside-close="true" z-popover>' +
                            '<a href="javascript:void(0);">' + _.replaceDoubleQuotesToSingle(description) +'</a></div>',
                    value: description
                };

                item.VpgName = _.pluck(item.ProtectionGroupVisualObjects,'ProtectionGroupName').toString();
                var alertLink = item.HelpId === 'Unknown' ? 'alerts' : item.HelpId;
                item.alertLink = '/Help/index.html#context/ErrorsGuide/' + alertLink;
            });

            return processed;
        };

        eventsListModel.eventsDateRange = function (startDate, endDate, type) {
            eventsListModel._params.TimeRange.From = moment(startDate).toDate();
            eventsListModel._params.TimeRange.To =  moment(endDate).toDate();
            defaultFilter.EventGeneralTypes.EventGeneralType = type;
        };

        return eventsListModel;
    });
