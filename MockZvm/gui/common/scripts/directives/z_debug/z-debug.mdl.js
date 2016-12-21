'use strict';

angular.module('zvmApp.models')
    .factory('zDebugModel', function ($filter) {
        var zDebugModel = {};

        zDebugModel.processData = function () {
            var processed = zlog.getLog().split('}\n');

            // order logs from new to old
            _(processed).reverse().value();

            var logs = [];
            var id = 0;

            _.forEach(processed, function (item) {

                // ignore unwanted logs
                if (item.indexOf('log start') > -1 || item.indexOf('log end') > -1 ||
                    item.indexOf('-omitted-') > -1 || item.indexOf('Log cleared') > -1 || item === '') {
                    return;
                }

                var content = item.substring(item.indexOf('content') + 10, item.length - 2);

                var mapItem = {
                    date: $filter('zDateFilter')(item.substring(item.indexOf('date') + 7, item.indexOf('Z') + 1)),
                    operation: item.substring(item.indexOf('operation') + 12, item.indexOf('protocol') - 4),
                    type: item.substring(item.indexOf('type') + 7, item.indexOf('content') - 4),
                    content: content === "" ? "Empty" : content,
                    protocol: item.substring(item.indexOf('protocol') + 11, item.indexOf('type') - 4),
                    id: id++
                };

                if (mapItem.operation === '' || mapItem.operation.indexOf(']') === 0) {
                    return;
                }

                // display popover when row is clicked
                mapItem.Log = {
                    display: '<div class="log-ellipsis" popover-custom-class-to-override="debugger-popover" content="' + _.replaceDoubleQuotesToSingle(mapItem.content) +
                    '"placement="right" trigger="manual" close="Yes" container="body" show="true" outside-close="true" z-popover>' +
                    '<a href="javascript:void(0);"> Description >> </a></div>',
                    value: mapItem
                };

                logs.push(mapItem);
            });

            return logs;
        };

        return zDebugModel;
    });

