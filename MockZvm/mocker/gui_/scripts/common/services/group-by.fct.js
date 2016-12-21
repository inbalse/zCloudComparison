'use strict';

angular.module('zvmApp.services')
    .factory('groupByService', function (basil, $timeout) {

        var groupByService = {};

        groupByService.groupBy = function (gridId, gridOption, selectedGroup) {
            if (!gridOption || !gridOption.ngGrid) {
                return;
            }

            //clear group by
            if (gridOption.ngGrid.config.groups.length > 0) {
                gridOption.groupBy(null);
            }
            gridOption.groupBy(selectedGroup);
            gridOption.ngGrid.config.groupsCollapsedByDefault = false;

            basil.set('groupBy.' + gridId, (selectedGroup === null) ? 'null' : selectedGroup);
        };

        groupByService.getSelectedGroup = function (gridId, defaultGroup, callback) {
            var saved = basil.get('groupBy.' + gridId);
            if (!saved) {
                saved = defaultGroup;
            } else if (saved === 'null') {
                saved = null;
            }

            $timeout(function () {
                callback(saved);
            }, 1000);
        };

        return groupByService;
    });
