'use strict';

angular.module('zvmApp.filters')
    .filter('flrPathPopoverFormatter', function () {
        return function (row, cell, path) {
            var popoverTemplate, cellTemplate = '';

            if (path !== '') {
                popoverTemplate = _.template('<div class="flr-popup-grid-cell-ellipsis"  content="<%=path%>"' +
                    ' placement="left" trigger="manual" close="Yes" container="body" show="true" outside-close="true" z-popover>' +
                    ' <a href="javascript:void(0);"> <%=path%> </a></div>');

                cellTemplate = popoverTemplate({
                    path: path
                });
            }

            return cellTemplate;
        };
    });
