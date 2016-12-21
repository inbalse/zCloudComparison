'use strict';

angular.module('zvmApp.directives')
    .constant('zSlickGridFilterTypes', {
        WILDCARD: 0,
        RANGE: 1,
        MULTI_SELECT: 2,
        PERCENTAGE: 3,
        DATE: 4,
        MB_OR_GB_RANGE: 5
    })
    .directive('zSlickGrid', function ($timeout, $translate, zSlickGridGlobals, zSlickGridFactory, zSlickGridGroupService, zSlickGridColumnsService, zTabsStateService,
                                       zSlickGridViewService, editColumnsFactory, zAlertFactory, zSlickGridValidationService, zBrowser, $uibModalStack) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/common/directives/z_slickgrid/z-slickgrid.html',
            scope: {
                gridId: '@',
                data: '=',
                grid: '=?',
                groupByValues: '=?',
                viewByValues: '=?',
                onSelection: '=?',
                rowClick: '=?',
                onMouseEnter: '=?',
                onMouseLeave: '=?',
                selectedItems: '=?',
                customOptions: '=',
                lowerCog: '=?',
                hideViewOptions: '=?',
                hideCreateView: '=?',
                gridRenderComplete: '=?',
                setSelectedGroup: '=?',
                setSortColumn: '=?',
                setFilters: '=?',
                doFullRowValidation: '=?'
            },
            link: function (scope, element) {
                function doGridRender() {
                    scope.showSearch = scope.customOptions.showSearch;
                    scope.showGroupBy = angular.isArray(scope.groupByValues) && scope.groupByValues.length > 1;
                    scope.group = {};

                    scope.showUndo = false;
                    scope.defaultSortAsc = angular.isDefined(scope.customOptions.defaultSortAsc) ? scope.customOptions.defaultSortAsc : true;
                    var zsgData = zSlickGridFactory.init(scope.gridId, element.find('.z-slickgrid'), scope.customOptions, scope.viewByValues, scope.doFullRowValidation);
                    var grid = zsgData.grid;
                    $(window).data('slickgrid_' + scope.gridId, grid);
                    var dataView = zsgData.dataView;
                    var selectedView = zsgData.selectedView;
                    var cellsValidationCollection = {};
                    var userSelectTimeOut;

                    var getGridVies = function (views) {
                        return angular.isDefined(views) && views.length === 1 && views[0].id === 'hidden_view_for_grids_without_views' ? [] : views;
                    };

                    scope.views = getGridVies(zsgData.views);

                    var anUglyHackToOverrideCircularItemsSelectionUpdate = false;


                    zSlickGridFactory.setSortObj(scope.gridId, scope.customOptions.defaultSortField, scope.defaultSortAsc);

                    zSlickGridValidationService.getCellsValidationCollection(scope.gridId, cellsValidationCollection);

                    function onRowClick(event, args) {
                        if (angular.isDefined(scope.rowClick)) {
                            scope.rowClick(event, args.row, args.cell, args.grid);
                        }
                    }

                    function onMouseEnter(event, args) {
                        if (!_.isNullOrUndefined(scope.onMouseEnter)) {
                            var grid = args.grid,
                                cell = args.grid.getCellFromEvent(event);

                            if (!_.isNullOrUndefined(cell)) {
                                scope.$apply(function () {
                                    scope.onMouseEnter(event, cell.row, cell.cell, grid);
                                });
                            }
                        }
                    }

                    function onMouseLeave(event, args) {
                        if (!_.isNullOrUndefined(scope.onMouseLeave)) {
                            var grid = args.grid,
                                cell = args.grid.getCellFromEvent(event);

                            if (!_.isNullOrUndefined(cell)) {
                                scope.$apply(function () {
                                    scope.onMouseLeave(event, cell.row, cell.cell, grid);
                                });
                            }
                        }
                    }

                    //function check is exist group and selected item count change
                    function isNeedCallingToValidationService(_tempSelectedItemsCount) {
                        return scope.showGroupBy && angular.isDefined(scope.group.selected) && scope.group.selected.text !== 'None' && _tempSelectedItemsCount !== scope.selectedItems.length;
                    }

                    function selectionChanged() {
                        if (angular.isDefined(scope.selectedItems)) {
                            var _tempSelectedItemsCount = scope.selectedItems.length;
                            scope.selectedItems.length = 0;
                            var indexes = grid.getSelectedRows();
                            _.forEach(indexes, function (index) {
                                if (!grid.getDataItem(index).hasOwnProperty('__group')) {
                                    scope.selectedItems.push(grid.getDataItem(index));
                                }
                            });

                            //need to group by issue checkbox (bug 25448)
                            if (isNeedCallingToValidationService(_tempSelectedItemsCount)) {
                                zSlickGridValidationService.gridCellsValidation(grid, scope.data, scope.gridId);
                            }
                        }
                        if (angular.isDefined(scope.onSelection) && !anUglyHackToOverrideCircularItemsSelectionUpdate) {
                            scope.onSelection();
                        }

                        anUglyHackToOverrideCircularItemsSelectionUpdate = false;
                    }

                    grid.onClick.subscribe(onRowClick);
                    grid.onMouseEnter.subscribe(onMouseEnter);
                    grid.onMouseLeave.subscribe(onMouseLeave);
                    grid.onSelectedRowsChanged.subscribe(selectionChanged);

                    grid.updateData = function (data) {
                        renderGrid(data);
                    };

                    //region ------- default query functions -------

                    scope.setSelectedGroup = function (group) {
                        // if group is null or undefined - change to default group
                        if (_.isNullOrUndefined(group)) {
                            group = scope.groupByValues[0];
                        }
                        if (scope.showGroupBy) {
                            scope.group.selected = group;
                            scope.groupChange();
                        }
                    };

                    scope.setSortColumn = function (sortField, sortAsc) {
                        zTabsStateService.setTabSort(scope.gridId, sortField, sortAsc);
                        grid.setSortColumn(sortField, sortAsc);
                        zSlickGridFactory.setSortObj(scope.gridId, sortField, sortAsc);
                    };

                    scope.setFilters = function (dataColumns, columnsWithFilterValues) {
                        zTabsStateService.setTabFilters(scope.gridId, dataColumns, columnsWithFilterValues);
                        zSlickGridFactory.setGridFilters(scope.gridId, scope.customOptions.columns);
                        // in order to set the filters (with css, mainly) - we should call setColumns with the applied columns
                        var viewColumns = zSlickGridViewService.getGridView(scope.gridId, scope.selectedView).viewColumns;
                        var appliedColumns = zSlickGridColumnsService.applyColumns(scope.customOptions.columns, viewColumns);
                        grid.setColumns(appliedColumns);
                    };

                    //endregion ------- default query functions -------

                    grid.updateSelectedItems = function (manualSelected) {
                        if (angular.isDefined(scope.selectedItems)) {
                            var selected = angular.isDefined(manualSelected) && manualSelected.length ? manualSelected : scope.selectedItems;

                            var selectedIndexes = _.map(selected, function (item) {
                                return dataView.getRowById(item.id);
                            });
                            _.remove(selectedIndexes, -1);
                            anUglyHackToOverrideCircularItemsSelectionUpdate = true;
                            grid.setSelectedRows(selectedIndexes);
                        }
                    };

                    scope.grid = grid;
                    scope.selectedView = selectedView;

                    scope.undo = function undo() {
                        zSlickGridFactory.undo(grid, scope.gridId);
                    };

                    scope.groupChange = function () {
                        zSlickGridGroupService.group(grid, scope.gridId, dataView, scope.group.selected);
                    };

                    if (zSlickGridGroupService.getSelectedGroup(scope.gridId) !== null) {
                        scope.group.selected = zSlickGridGroupService.getSelectedGroup(scope.gridId);
                        zSlickGridGroupService.group(grid, scope.gridId, dataView, scope.group.selected);
                    }

                    scope.search = function () {
                        zTabsStateService.setTabSearch(scope.gridId, scope.search.input.term);
                        renderGrid(scope.data);
                    };

                    //---------------------------------------------- reset columns -------------------------------------//
                    scope.resetColumns = function () {
                        zSlickGridViewService.resetView(scope.gridId, grid, scope.selectedView, scope.customOptions.columns);
                        zTabsStateService.clearTabSort(scope.gridId);
                        grid.setSortColumn(scope.customOptions.defaultSortField, scope.defaultSortAsc);
                    };

                    //region ================================= User Select ================================================//
                    $(element).mouseup(function () {
                        scope.isUserSelected = getSelectedText().trim() !== '';

                        if (zBrowser() === 'firefox') {
                            userSelectTimeOut = $timeout(function () {
                                scope.isUserSelected = getSelectedText().trim() !== '';
                                $timeout.cancel(userSelectTimeOut);
                            }, 100);
                        }
                    });

                    function getSelectedText() {
                        if (window.getSelection) {
                            return window.getSelection().toString();
                        } else if (document.selection) {
                            return document.selection.createRange().text;
                        }
                        return '';
                    }

                    //endregion

                    //================================= watchers ================================//

                    //redraw on resize
                    scope.$on('zResize::resize', function zResizeBind() {
                        grid.resizeCanvas();
                    });

                    scope.$watch('grid.commandQueue.length', function (value) {
                        scope.showUndo = value;
                    });

                    scope.closeUndo = function () {
                        scope.showUndo = false;
                    };

                    scope.$watch('data', function dataWatcher(newValue) {
                        if (angular.isArray(newValue) && !scope.isUserSelected) {
                            renderGrid(newValue);
                        }
                    });

                    var renderGrid = function renderGrid(dataValue) {
                        var settings = {};
                        settings.searchKey = scope.search.input || zTabsStateService.getTabSearch(scope.gridId);
                        settings.selectedItems = scope.selectedItems;
                        scope.search.input = settings.searchKey;
                        zSlickGridFactory.render(scope.gridId, grid, dataView, dataValue, settings);
                        gridRenderCompleteFunc(dataView.getItems());
                    };

                    var gridRenderCompleteFunc = function (viewItems) {
                        if (angular.isDefined(scope.gridRenderComplete)) {
                            scope.gridRenderComplete(viewItems);
                        }
                    };

                    //region Cogwheel interactions
                    //=============================================================================
                    scope.openColumnsEditor = function (isCreate) {
                        editColumnsFactory.openPopUpDialog({
                            grid: grid,
                            gridId: scope.gridId,
                            openForCreate: isCreate,
                            columns: angular.copy(scope.customOptions.columns),
                            viewByValues: scope.views,
                            selectedView: scope.selectedView
                        }).then(null, function () {
                            var newViews = zSlickGridViewService.getGridViewsList(scope.gridId);
                            var viewToSelect = newViews.length > scope.views.length ? newViews[0] : scope.selectedView;
                            scope.views = getGridVies(newViews);
                            scope.selectView(viewToSelect, scope.settings);
                        });
                    };
                    //=============================================================================
                    //endregion

                    scope.$on('$destroy', function () {
                        grid.setSelectionModel(null);
                        $(window).data('slickgrid_' + scope.gridId, null);
                        grid.destroy();
                        element.unbind('resize');
                        $('.grid-header .ui-icon').off();
                        dataView = null;
                        $(element).off('mouseup');
                        zSlickGridValidationService.destroyCellsValidationCollection(scope.gridId);
                    });

                    if (scope.showGroupBy && angular.isUndefined(scope.group.selected)) {
                        scope.group.selected = scope.groupByValues[0];
                    }//According to Etti's comment on bug22668, default group by set to "None"
                }

                //receive the top modal instance
                var topModal = $uibModalStack.getTop();

                //if modal doesn't exist render instantly
                if (angular.isUndefined(topModal)) {
                    doGridRender();
                } else {//await for modal to be rendered
                    topModal.key.rendered.then(function () {
                        doGridRender();
                    });
                }
            }
        };
    });
