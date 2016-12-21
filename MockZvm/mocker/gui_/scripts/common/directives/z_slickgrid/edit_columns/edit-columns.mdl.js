'use strict';

angular.module('zvmApp.models')
    .factory('editColumnsModel', function (zSlickGridColumnsService) {
        var editColumnsModel = {};

        editColumnsModel.getColumnsIdsByView = function(columns, view, gridId){
            return _.pluck(zSlickGridColumnsService.getViewColumns(columns, view, gridId), 'id');
        };

        editColumnsModel.setColumnsVisibility = function(columns, columnsIds){
            _.forEach(columns, function (column) {
                column.visible = _.contains(columnsIds, column.id);
            });

            return columns;
        };

        return editColumnsModel;
    });
