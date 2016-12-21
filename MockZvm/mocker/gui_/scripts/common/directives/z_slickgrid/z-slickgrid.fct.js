'use strict';

angular.module('zvmApp.directives')
    .constant('zSlickGridGlobals', {
        GROUP_BY: 'groupBy',
        VIEWS: 'views',
        LAST_VIEW: 'lastView',
        DEFAULT_VIEW: '_default_zerto_identity_',
        DEFAULT_GRID_COLUMNS: '_default_columns',
        CHECKBOX_SELECTOR: '_checkbox_selector',
        NUM_OF_DEFAULTS_VIES: 3
    })
    .factory('zSlickGridFactory', function (zSlickGridGlobals, zSlickGridSortService, zSlickGridSearchService, zTabsStateService, zSlickGridFilterTypes,
                                            zSlickGridViewService, zSlickGridColumnsService, zSlickGridValidationService) {
        var zSlickGridFactory = {},
            filterPlugin;

        function applyDefaultOptionsAndColumns(initial, modified, checkboxSelector) {
            _.forEach(modified, function (value, key) {
                initial[key] = value;
            });


            if (initial.showCheckbox) {
                var columnDefinition = checkboxSelector.getColumnDefinition();
                initial.columns.unshift(columnDefinition);
                if (!initial.multiSelect) {
                    columnDefinition.headerCssClass += ' single-select';
                }
            }

            _.forEach(initial.columns, function (column) {
                if (!column.id) {
                    column.id = column.field;
                }
                if (angular.isUndefined(column.sortable)) {
                    column.sortable = true;
                }
                if (angular.isUndefined(column.views)) {
                    var views = _.compact(_.uniq(_.flatten(_.pluck(initial.columns, 'views'))));
                    if (views.length > 0) {
                        column.views = views;
                    }
                    else {
                        column.views = [zSlickGridViewService.getDefaultViewByValues()[0].id];
                    }

                }
            });

            return initial.showCheckbox;
        }

        function setGroupHeadersStyle() {
            $('.grid-header .ui-icon')
                .addClass('ui-state-default ui-corner-all')
                .mouseover(function (e) {
                    $(e.target).addClass('ui-state-hover');
                })
                .mouseout(function (e) {
                    $(e.target).removeClass('ui-state-hover');
                });
        }

        zSlickGridFactory.setGridFilters = function (gridId, columns) {
            var filters = zTabsStateService.getTabFilters(gridId),
                filter;

            _.forEach(columns, function (column) {
                filter = _.find(filters, {field: column.field});

                if (_.isNullOrUndefined(filter)) {
                    return;
                }
                switch (column.filter) {
                    case zSlickGridFilterTypes.WILDCARD:
                        column.wildcardValues = filter.wildcardValues;
                        break;
                    case zSlickGridFilterTypes.RANGE:
                        if (_.isEmpty(filter.rangeValues)) {
                            break;
                        }
                        column.rangeValues = column.rangeValues || [];
                        column.rangeValues[0] = filter.rangeValues[0] ? filter.rangeValues[0].toString() : null;
                        column.rangeValues[1] = filter.rangeValues[0] ? filter.rangeValues[1].toString() : null;
                        break;
                    case zSlickGridFilterTypes.MULTI_SELECT:
                        column.filterValues = filter.filterValues;
                        break;
                    case zSlickGridFilterTypes.PERCENTAGE:
                        //TODO: not used at the moment, seems incomplete in grid also
                        break;
                    case zSlickGridFilterTypes.DATE:
                        column.dateValues = filter.dateValues;
                        break;
                    case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                        if (_.isEmpty(filter.rangeValues)) {
                            break;
                        }
                        column.rangeValues = column.rangeValues || [];
                        column.rangeValues[0] = filter.rangeValues[0] ? filter.rangeValues[0].toString() : null;
                        column.rangeValues[1] = filter.rangeValues[0] ? filter.rangeValues[1].toString() : null;
                        column.rangeTypeMultiplier = filter.rangeTypeMultiplier;
                        break;
                }
                column.isSelected = column.isFilterActive = filter.isFilterActive;

            });
        };

        zSlickGridFactory.init = function (gridId, element, viewOptions, viewValues, doFullRowValidation) {


            var options = {
                enableCellNavigation: true,
                enableColumnReorder: true,
                editable: true,
                enableAddRow: false,
                explicitInitialization: true,
                asyncEditorLoading: false,
                autoEdit: false,
                enableTextSelectionOnCells: true,
                autoHeight: false,
                multiSelect: true,
                showCheckbox: true,
                numOfViews: zSlickGridGlobals.NUM_OF_DEFAULTS_VIES,
                forceFitColumns: true
            };

            var checkboxSelector = new Slick.CheckboxSelectColumn({
                cssClass: 'z-grid-select-cell z-grid-select-row-cell',
                headerCssClass: 'z-grid-select-cell z-grid-select-header-cell',
                multiSelect: viewOptions.multiSelect
            });

            var gridEventsHandlers = {
                onRowCountChange: function () {
                    grid.updateRowCount();
                    grid.render();
                },
                onRowsChanged: function (e, args) {
                    grid.invalidateRows(args.rows);
                    grid.render();
                },
                onFilterApplied: function (e, args) {
                    dataView.refresh();
                    grid.resetActiveCell();
                    addExistingFilters(viewOptions.columns, zTabsStateService.getTabFilters(gridId));
                    if (args.clear) {
                        var toClear = _.find(viewOptions.columns, {field: args.column.field});
                        toClear.isFilterActive = toClear.isSelected = false;
                        if (toClear.filterValues) {
                            toClear.filterValues.length = 0;
                        }
                        if (toClear.rangeValues) {
                            toClear.rangeValues.length = 0;
                        }
                        if (toClear.dateValues) {
                            toClear.dateValues.length = 0;
                        }
                        if (toClear.wildcardValues) {
                            toClear.wildcardValues.length = 0;
                        }
                    }
                    zTabsStateService.setTabFilters(gridId, viewOptions.columns, grid.getColumns());
                },
                onSort: function (e, args) {
                    zTabsStateService.setTabSort(gridId, args.sortCol.field, args.sortAsc);
                    zSlickGridSortService.sort(args.sortCol.field, args.sortAsc, dataView, args.grid, gridId);
                    // zSlickGridFactory.setSortObj(gridId, args.sortCol.field, args.sortAsc);
                },
                onColumnsChanged: function () {
                    var selectedViewIdentifier = zSlickGridViewService.getSelectedGridView(gridId);
                    var gridView = zSlickGridViewService.getGridView(gridId, selectedViewIdentifier);
                    var viewColumns = grid.getColumns();

                    if (!gridView) {
                        zSlickGridViewService.createGridView(gridId, selectedViewIdentifier, viewColumns, false);
                    } else {
                        zSlickGridViewService.createGridView(gridId, selectedViewIdentifier, viewColumns, gridView.isUserDefined);
                    }
                },
                onCellChange: function (e, args) {
                    var rowCells = grid.getColumns(),
                        cell = rowCells[args.cell];
                    if (doFullRowValidation) {
                        zSlickGridValidationService.rowValidation(rowCells, args, args.grid, gridId);
                    } else {
                        zSlickGridValidationService.cellValidation(cell, args, args.grid, gridId);
                    }
                }
            };

            var registerCheckboxFlag = applyDefaultOptionsAndColumns(options, viewOptions, checkboxSelector);

            viewValues = zSlickGridViewService.getDefaultViewByValues(viewValues);

            var groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();

            var dataView = new Slick.Data.DataView({
                groupItemMetadataProvider: groupItemMetadataProvider,
                inlineFilters: false
            });

            dataView.onRowCountChanged.subscribe(gridEventsHandlers.onRowCountChange);

            dataView.onRowsChanged.subscribe(gridEventsHandlers.onRowsChanged);

            filterPlugin = new Ext.Plugins.HeaderFilter({
                showSortInMenu: false
            });

            filterPlugin.onFilterApplied.subscribe(gridEventsHandlers.onFilterApplied);

            var views = zSlickGridViewService.getGridViewsList(gridId);
            if (!views) {
                zSlickGridViewService.saveViews(gridId, viewValues);
                views = viewValues;
            }


            var gridSelectedView, selectedViewIdentifier = zSlickGridViewService.getSelectedGridView(gridId);

            if (!selectedViewIdentifier) {
                selectedViewIdentifier = zSlickGridViewService.getDefaultViewIdentifier(viewValues);
                zSlickGridViewService.saveGridViewSelection(gridId, selectedViewIdentifier);
                var viewColumns = zSlickGridColumnsService.getViewColumns(viewOptions.columns, selectedViewIdentifier, gridId);
                gridSelectedView = zSlickGridViewService.createGridView(gridId, selectedViewIdentifier, viewColumns, false);
            } else {
                gridSelectedView = zSlickGridViewService.getGridView(gridId, selectedViewIdentifier);
            }

            var appliedColumns = zSlickGridColumnsService.applyColumns(viewOptions.columns, gridSelectedView.viewColumns);

            if (!angular.isFunction(options.editCommandHandler)) {
                options.editCommandHandler = function queueAndExecuteCommand(item, column, editCommand) {
                    grid.commandQueue.push(editCommand);
                    editCommand.execute();
                };
            }

            var grid = new Slick.Grid(element, dataView, appliedColumns, options);

            grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));

            grid.onSort.subscribe(gridEventsHandlers.onSort);

            grid.onCellChange.subscribe(gridEventsHandlers.onCellChange);

            grid.onColumnsResized.subscribe(gridEventsHandlers.onColumnsChanged);

            ////fire event when column reordered
            grid.onColumnsReordered.subscribe(gridEventsHandlers.onColumnsChanged);

            grid.commandQueue = [];
            grid.registerPlugin(filterPlugin);
            grid.registerPlugin(groupItemMetadataProvider);

            if (registerCheckboxFlag) {
                grid.registerPlugin(checkboxSelector);
            } else {
                grid.unregisterPlugin(checkboxSelector);
            }

            dataView.syncGridSelection(grid, true);

            zSlickGridFactory.setGridFilters(gridId, grid.getColumns());

            dataView.setFilter(filterPlugin.filterFunc);

            grid.init(grid);


            setGroupHeadersStyle();

            return {grid: grid, dataView: dataView, selectedView: selectedViewIdentifier, views: views};
        };

        zSlickGridFactory.render = function (gridId, grid, dataView, data, settings) {
            //todo: render data
            //todo: logic chains to apply when data is being altered
            //will contain calls for other services in cases when they needed
            dataView.beginUpdate();
            if (!_.isEmpty(settings.searchKey.term)) {
                var searchedData = zSlickGridSearchService.search(settings.searchKey.term, data, grid.getColumns());
                zTabsStateService.setTabSearch(gridId, settings.searchKey.term, grid.getColumns());
                dataView.setItems(searchedData);
            } else {
                dataView.setItems(data);
            }

            var lastSortObj = zSlickGridFactory.getSortObj(gridId);
            if (!_.isNullOrUndefined(lastSortObj)) {
                grid.setSortColumn(lastSortObj.sortField, lastSortObj.sortAsc);
            } else {
                var options = grid.getOptions();
                lastSortObj = {
                    sortField: options.defaultSortField,
                    sortAsc: options.defaultSortAsc
                };
            }
            zSlickGridSortService.sort(lastSortObj.sortField, lastSortObj.sortAsc, dataView, grid, gridId);

            // if (!_.isEmpty(settings.searchKey.term)) {
            // }

            dataView.endUpdate();

            for (var i = 0; i <= data.length; i++) {
                grid.invalidateRow(i);
            }

            grid.updateRowCount();
            grid.render();

            if (settings.selectedItems && settings.selectedItems.length) {
                grid.updateSelectedItems();
            }

            zSlickGridValidationService.gridCellsValidation(grid, dataView.getItems(), gridId);
        };

        //------------------- sort state section -------------------//

        zSlickGridFactory.getSortObj = function (gridId) {
            return zTabsStateService.getTabSort(gridId);
        };

        zSlickGridFactory.setSortObj = function (gridId, sortField, sortAsc) {
            if (!_.isNullOrUndefined(zSlickGridFactory.getSortObj(gridId))) {
                return;
            }
            zTabsStateService.setTabSort(gridId, sortField, sortAsc);
        };

//----------------------------------------------------------//

        zSlickGridFactory.setView = function (gridId, grid, columns, viewIdentifier, data, settings) {
            var gridView = zSlickGridViewService.getGridView(gridId, viewIdentifier);

            if (!gridView) {
                var viewColumns = zSlickGridColumnsService.getViewColumns(columns, viewIdentifier);
                gridView = zSlickGridViewService.createGridView(gridId, viewIdentifier, viewColumns, false);
            }

            zSlickGridViewService.saveGridViewSelection(gridId, viewIdentifier);

            var appliedColumns = zSlickGridColumnsService.applyColumns(columns, gridView.viewColumns);
            grid.setColumns(appliedColumns);

            zSlickGridFactory.setGridFilters(gridId, appliedColumns);
            // dataView.setFilter(filterPlugin.filterFunc);
            filterPlugin.updateMenuNodes(appliedColumns);

            zSlickGridFactory.render(gridId, grid, grid.getData(), data, settings);
        };

        zSlickGridFactory.undo = function (grid, gridId) {
            var command = grid.commandQueue.pop();

            if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                var gridData = grid.getData().getItems();

                command.undo();
                grid.updateData(gridData);
                grid.gotoCell(command.row, command.cell, false);

                //cell validation function must been invoked because cell/row indexes is mess in onCellChange function after undo
                var cell = grid.getColumns()[command.cell];
                zSlickGridValidationService.cellValidation(cell, command, grid, gridId);
            }
        };

        function addExistingFilters(viewColumns, tabFilters) {
            _.forEach(tabFilters, function (filter) {
                var column = _.find(viewColumns, {field: filter.field});
                column.isFilterActive = filter.isFilterActive;
                column.isSelected = filter.isSelected;

                switch (filter.filter) {
                    case zSlickGridFilterTypes.WILDCARD:
                        column.wildcardValues = filter.wildcardValues ? filter.wildcardValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.RANGE:
                        column.rangeValues = filter.rangeValues ? filter.rangeValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                        column.rangeValues = filter.rangeValues ? filter.rangeValues.slice(0) : null;
                        column.rangeTypeMultiplier = filter.rangeTypeMultiplier;
                        break;
                    case zSlickGridFilterTypes.MULTI_SELECT:
                        column.filterValues = filter.filterValues ? filter.filterValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.PERCENTAGE:
                        column.percentageValues = filter.percentageValues ? filter.percentageValues.slice(0) : null;
                        break;
                    case zSlickGridFilterTypes.DATE:
                        column.dateValues = filter.dateValues ? filter.dateValues.slice(0) : null;
                        break;
                }
            });
        }

        return zSlickGridFactory;
    })
;
