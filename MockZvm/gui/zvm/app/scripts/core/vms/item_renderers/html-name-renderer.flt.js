'use strict';

angular.module('zvmApp.core')
    .filter('htmlNameRenderer', function (enums) {
        return function (row, cell, value, columnDef, dataContext) {
            if(angular.isUndefined(dataContext)){
                return '';
            }

            if (dataContext.State.SubStatus !== enums.VpgVisualSubStatus.Deleting && dataContext.State.SubStatus !== enums.VpgVisualSubStatus.EmptyProtectionGroup) {
                if (dataContext.VPGIdentifier) {
                    return '<a href="#/main/vpg_details?id=' + dataContext.VPGIdentifier.GroupGuid + '" >' + value + '</a>';
                }else if (dataContext.Identifier){
                    return '<a href="#/main/vpg_details?id=' + dataContext.Identifier.GroupGuid + '" >' + value + '</a>';
                }
            } else {
                return '<span>' + value + '</span>';
            }
        };
    });
