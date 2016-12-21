'use strict';

angular.module('zvmApp.directives').service('zSlickGridColumnsService', function (zSlickGridViewService) {

    this.getMarkedColumns = function (columns) {
        return _.filter(columns, function (col) {
            return col.visible;
        });
    };

    this.addViewIdentifierToNewColumns = function(columns, viewIdentifier){
        _.forEach(columns, function(col){
            if(!_.contains(col.views, viewIdentifier.id)){
                col.views.push(viewIdentifier.id);
            }
        });

        return columns;
    };

    this.applyColumns = function (sourceColumns, targetColumns) {
        var filtered = [];
        _.forEach(targetColumns, function (targetColumn, index) {
            var foundColumn = _.find(sourceColumns, function (sourceColumn) {
                return sourceColumn.id === targetColumn.id;
            });

            if (foundColumn && targetColumn.width) {
                foundColumn.width = targetColumn.width;
            }

            if (foundColumn) {
                filtered[index] = foundColumn;
            }
        });
        return filtered;
    };

    this.getViewColumns = function (columns, viewIdentifier, gridId) {
        //get current view from storage
        var view = zSlickGridViewService.getGridView(gridId, viewIdentifier);
        columns = view !== null && angular.isDefined(view.viewColumns) ? view.viewColumns : columns;

        return _.filter(columns, function (column) {
            return _.contains(column.views, viewIdentifier.id);
        });
    };
});
