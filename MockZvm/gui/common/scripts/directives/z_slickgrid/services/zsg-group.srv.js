'use strict';

angular.module('zvmApp.directives').service('zSlickGridGroupService', function (basil, zSlickGridValidationService, zTabsStateService) {
    // var gridGroupPrefix = 'zsg_group_';

    //region group by
    this.group = function (grid, gridId, dataView, group) {
        if (group.id === '') {
            dataView.setGrouping([]);
        } else {
            var column = _.find(grid.getColumns(), function (item) {
                return item.id === group.id;
            });

            dataView.setGrouping({
                getter: group.id,
                formatter: function (g) {
                    var prefix = '';
                    var suffix = ':  ';
                    if (angular.isUndefined(g.value) || g.value === '') {
                        prefix = 'No ';
                        suffix = ' ';
                    }

                    return prefix + group.text + suffix + generateGroupTitle(column, g) + '  <span class="z-slickgrid-item-count">(' + g.count + ' items)</span>';
                },
                aggregateCollapsed: false,
                lazyTotalsCalculation: true
            });
        }

        saveSelectedGroup(gridId, group);
        zSlickGridValidationService.gridCellsValidation(grid, dataView.getItems(), gridId);
    };
    //endregion

    var generateGroupTitle = function generateGroupTitle(column, group) {
        if (column && column.formatter) {
            return column.formatter(group.rows[0], null, group.rows[0][column.field]);
        } else {
            return (group.value && group.value.value) ? group.value : '';
        }
    };

    // function getGridGroupsKey(gridId) {
    //     return gridGroupPrefix + gridId;
    // }

    var saveSelectedGroup = function (gridId, group) {
        zTabsStateService.setTabGroupBy(gridId, group);
        // var groupsKey = getGridGroupsKey(gridId);
        // basil.set(groupsKey, group);
    };

    this.getSelectedGroup = function (gridId) {
        // var groupsKey = getGridGroupsKey(gridId);
        return zTabsStateService.getTabGroupBy(gridId);
    };
}); 
