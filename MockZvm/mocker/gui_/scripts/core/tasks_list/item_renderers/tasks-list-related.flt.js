/**
 * Created by guy on 21/07/2014.
 */
'use strict';

angular.module('zvmApp.filters')
    .filter('tasksListRelated', function (enums) {
        function _isRelatedLabelLinked(item, data) {
            return (item.ProtectionGroupId && data.StateAndProgress.CurrentState === enums.CommandTaskRecordStateVisualObject.Failed &&
                data.TaskType === enums.ExtensionTask_ZCommand.VpgBackup) ||
                (item.ProtectionGroupId && data.StateAndProgress.CurrentState !== enums.CommandTaskRecordStateVisualObject.Failed) ||
                (item.HostId && (data.TaskType !== enums.ExtensionTask_ZCommand.InstallVra && data.StateAndProgress.CurrentState !== enums.CommandTaskRecordStateVisualObject.Failed));
        }

        return function (dataContext) {

            var links = '';
            _.forEach(_.filter(dataContext.RelatedEntities, {FlrSessionIdentifier: null}), function (item) {
                if (_isRelatedLabelLinked(item, dataContext)) {
                    if (item.HostId) {
                        links = links + '<a href="#/main/vra_details?id=' + item.HostId.ServerIdentifier.ServerGuid + '&name=' + item.HostId.InternalHostName + '">' + item.Name + '</a>, ';
                    }
                    else {
                        links = links + '<a href="#/main/vpg_details?id=' + item.ProtectionGroupId.GroupGuid + '" >' + item.Name + '</a>, ';
                    }
                } else {
                    links = links + item.Name + ', ';
                }
            });
            if (links.length > 1) {
                links = links.substr(0, links.length - 2);
            }
            return links;
        };
    });
