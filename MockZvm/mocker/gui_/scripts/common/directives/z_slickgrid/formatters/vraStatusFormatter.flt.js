'use strict';

angular.module('zvmApp.filters')
    .filter('vraStatusFormatter', function (vraListEvents) {
        return function (row, cell, value) {
            if (!value) {
                return '';
            }

            if (value.isProgerrssBar) {
                //progress bar with text
                var tempString = '<span class="progress-span">' + value.display + '</span>';

                if (value.value.InstallOrUninstallProgress > 0) {
                    tempString += '<div class="progress slimNoValueProgressBar">' +
                        '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="' + value.value.InstallOrUninstallProgress + '" aria-valuemin="0" aria-valuemax="100" style="width:' + value.value.InstallOrUninstallProgress + '%"></div>' +
                        '</div>';
                }
                return tempString;

            } else if (value.isInstallationError) {
                var partTemplate = '<a rel="<%=event%>" href="#"> Retry Installation</a>';
                var containerTemplate = '<div title="<%=title%>" class="<%=className%>"><span><%=text%></span>';
                if(value.allowInstall)
                {
                    containerTemplate = containerTemplate + partTemplate + '</div>';
                }else
                {
                    containerTemplate = containerTemplate + '</div>';
                }
                var linkTemplate = _.template(containerTemplate);
                //text with button

                return linkTemplate({
                    title: (value.LastErrorTitle && value.LastErrorTitle.length ? value.LastErrorTitle : ''),
                    className: value.className,
                    text: value.display,
                    event: vraListEvents.vraRetry
                });
            } else if (value.className === 'none') {
                //only text
                return value.display;
            } else {
                //text with icon
                var _textTemplate = _.template('<div class="<%=className%>"><span><%=text%></span></div>');
                return _textTemplate({className: value.className, text: value.display});
            }
        };
    }).filter('vraVersionFormatter', function () {
        return function (row, cell, value) {
            if (!value) {
                return '';
            }

            return '<span title="' + value.currentVersion + '">' + value.display + ' </span>';
        };
    });
