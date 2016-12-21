'use strict';

angular.module('zvmApp.filters')
    .filter('checkpointEventLinkFormatter', function ($translate, recoveryWizardEvents) {
        var title = $translate.instant('GRID_COLUMNS.CHECKPOINT');
        var _linkTemplate = _.template('<a title="<%=title%>" rel="<%=event%>" href="javascript:void(0);"><%=text%></a>');
        return function (event, propName) {
            return function (row, cell, value) {
                if (angular.isDefined(value[propName])) {
                    var linkText = value[propName];
                    if (value.lastCheckpoint && value.lastCheckpoint.Tag) {
                        linkText += ' (' + value.lastCheckpoint.Tag + ')';
                    }
                    return _linkTemplate({title: title, text: linkText, event: recoveryWizardEvents.checkpointClicked});
                } else {
                    return '';
                }
            };
        };
    });
