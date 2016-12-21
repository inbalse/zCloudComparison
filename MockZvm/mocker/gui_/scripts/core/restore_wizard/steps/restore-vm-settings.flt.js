'use strict';

angular.module('zvmApp.filters')
    .filter('computeResourceFilter', function ($translate) {
        return function (row, cell, value) {
            if (!value) {
                return '';
            }
            return value.DisplayName ? value.DisplayName : $translate.instant('RESTORE_WIZARD.FILTERS.DEFAULT');
        };
    })
    .filter('datastoreFilter', function ($translate) {
        return function (row, cell, value) {
            if (!value) {
                return '';
            }
            return (value && value.DisplayName) ? value.DisplayName : $translate.instant('RESTORE_WIZARD.FILTERS.DEFAULT');
        };
    })
    .filter('actionsFilter', function ($translate, restoreVmEvents) {
        var _linkTemplate = _.template('<a href="#" rel="<%=event%>"><%=text%></a>');
        return function () {
            var linkVolumes = _linkTemplate({
                event: restoreVmEvents.editVolumes,
                text: $translate.instant('RESTORE_WIZARD.FILTERS.VOLUMES')
            });

            var linkNics = _linkTemplate({
                event: restoreVmEvents.editNics,
                text: $translate.instant('RESTORE_WIZARD.FILTERS.NICS')
            });

            return linkVolumes + '&nbsp<span>|</span>&nbsp' + linkNics;
        };
    });
