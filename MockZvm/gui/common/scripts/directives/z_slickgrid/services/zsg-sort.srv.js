'use strict';

angular.module('zvmApp.directives').service('zSlickGridSortService', function (zSlickGridValidationService, dataSortService) {

    this.sort = function (columnField, isAsc, dataView, grid, gridId) {
        dataView.sort(dataSortService.getComparer(columnField, isAsc));
        zSlickGridValidationService.gridCellsValidation(grid, dataView.getItems(), gridId);
    };
});
