'use strict';

angular.module('zvmApp.directives').service('zSlickGridValidationService', function () {

    var KEY = 'zSlickGridValidationServiceHash';
    var INVALID_CLASS = 'slick-invalid-cell';
    var FIELD = 'field';
    var cellsValidationCollection = {};
    var slickGridValidationService = this;

    var setGridCellsStyles = function (grid, cellsValidationCollection) {
        grid.removeCellCssStyles(KEY);
        grid.addCellCssStyles(KEY, angular.copy(cellsValidationCollection));
    };

    var setCellValidation = function(row, cellUnique, isValid, gridId){
        if(!isValid) {//cell value is invalid
            if (angular.isUndefined(cellsValidationCollection[gridId][row])) {
                cellsValidationCollection[gridId][row] = {};
            }
            cellsValidationCollection[gridId][row][cellUnique] = INVALID_CLASS;
        }else{//cell value is valid check if value been invalid and remove them from invalid cells collection
            if (angular.isDefined(cellsValidationCollection[gridId][row]) && angular.isDefined(cellsValidationCollection[gridId][row][cellUnique])) {
                delete cellsValidationCollection[gridId][row][cellUnique];
            }
        }
    };

    var getCellValidityByPropType = function(cell, dataItem){
        if (_.isFunction(cell.zCellValidation)) {
            return cell.zCellValidation(dataItem);
        } else {
            var cellValue = _.get(dataItem, cell.zCellValidation);
            return defaultValidation(cellValue);
        }
    };

    var checkCellValidation = function (grid, rowsItems, columns, gridId) {
        var cellUnique, dataItem, isValid;

        for (var i = 0; i < rowsItems.length; i++) {
            for (var j = 0; j < columns.length; j++) {
                dataItem = rowsItems[i][columns[j][FIELD]];
                cellUnique = columns[j].id;
                isValid = getCellValidityByPropType(columns[j], dataItem);
                setCellValidation(i, cellUnique, isValid, gridId);
            }
        }
        if (!_.isEmpty(cellsValidationCollection[gridId])) {
            setGridCellsStyles(grid, cellsValidationCollection[gridId]);
        }
    };

    var defaultValidation = function(value) {
        return angular.isDefined(value) && value !== '';
    };

    slickGridValidationService.getCellsValidationCollection = function(gridId, cellsCollection){
        cellsValidationCollection[gridId] = cellsCollection;
    };

    slickGridValidationService.destroyCellsValidationCollection = function(gridId){
        delete cellsValidationCollection[gridId];
    };

    slickGridValidationService.rowValidation = function (rowCells, args, grid, gridId) {
      _.each(rowCells, function (cell) {
          slickGridValidationService.cellValidation(cell, args, grid, gridId);
      });
    };

    slickGridValidationService.cellValidation = function (cellItem, args, grid, gridId) {
        if (angular.isDefined(cellItem) && angular.isDefined(cellItem.zCellValidation)) {
            var item, dataItem, isValid, cellUnique, dataView, isGroupByActive, row;
            item = grid.getDataItem(args.row);
            dataView = grid.getData();
            isGroupByActive = dataView.getGroups().length > 0;
            row = isGroupByActive ? _.findIndex(dataView.getItems(), item) : args.row;

            if(angular.isDefined(item)) {
                dataItem = item[cellItem[FIELD]];
                cellUnique = cellItem.id;
                isValid = getCellValidityByPropType(cellItem, dataItem);
                setCellValidation(row, cellUnique, isValid, gridId);
                setGridCellsStyles(grid, cellsValidationCollection[gridId]);
            }
        }
    };

     slickGridValidationService.gridCellsValidation = function (grid, rowsItems, gridId) {
        var columns = grid.getColumns();
         var validationColumns = _.filter(columns, function (col) {
             return col.zCellValidation;
         });
        if (validationColumns.length) {
            checkCellValidation(grid, rowsItems, validationColumns, gridId);
        }
    };

    //create to run tests
    slickGridValidationService._private = {
        setCellValidation: setCellValidation,
        getCellValidityByPropType: getCellValidityByPropType,
        checkCellValidation: checkCellValidation,
        defaultValidation: defaultValidation,
        cellsValidationCollection: cellsValidationCollection
    };
});
