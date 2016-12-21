'use strict';

angular.module('zvmApp.core')
    .filter('nameRenderer', function (enums) {
        return function (row, cell, value, columnDef, dataContext) {
            if (angular.isUndefined(dataContext)) {
                return '';
            }
            if (dataContext.SampleVM !== undefined && dataContext.State.SubStatus !== enums.VpgVisualSubStatus.Deleting && dataContext.State.SubStatus !== enums.VpgVisualSubStatus.EmptyProtectionGroup) {
                return '<a href="#/main/vpg_details?id=' + dataContext.Identifier.GroupGuid + '" >' + dataContext.Name + ' (' + dataContext.NumberOfVms + ')' + '</a>';
            } else {
                return '<span>' + dataContext.Name + ' (' + dataContext.NumberOfVms + ')' + '</span>';
            }

        };
    }).filter('offsiteNameRenderer', function () {
        return function (row, cell, value, columnDef, dataContext) {
            if (angular.isUndefined(dataContext)) {
                return '';
            }
            return '<a href="#/main/vpg_details?id=' + dataContext.VpgIdentifier.GroupGuid + '" >' + dataContext.JobName + '</a>';

        };
    }).filter('eventsNameRenderer', function () {
        return function (row, cell, value, columnDef, dataContext) {
            if (angular.isUndefined(dataContext)) {
                return '';
            }
            var links = '';
            _.forEach(dataContext.ProtectionGroupVisualObjects, function (vpg) {
                if (vpg.ExistingVpg) {
                    links = links + '<a href="#/main/vpg_details?id=' + vpg.ProtectionGroupIdentifier.GroupGuid + '" >' + vpg.ProtectionGroupName + '</a> ';
                }
                else {
                    if(angular.isDefined(vpg) && angular.isDefined(vpg.ProtectionGroupName) && vpg.ProtectionGroupName !== null){
                        links = links + '<span>' + vpg.ProtectionGroupName + ' ' + '</span>';
                    }
                }
            });
            return links;

        };
    });
