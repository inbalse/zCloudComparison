'use strict';

angular.module('zvmApp.directives')
    .constant('zsgViewConstants', {
        GRID_VIEW_PREFIX: 'zsg_views_',
        GRID_SELECTED_VIEW_PREFIX: 'zsg_selected_view_',
        DEFAULT_VIEW: {id: 'hidden_view_for_grids_without_views', text: 'hidden_view_for_grids_without_views'}
    })
    .service('zSlickGridViewService', function (basil, zsgViewConstants) {
        var that = this;

        this.getDefaultViewByValues = function (viewValues) {
            if (angular.isUndefined(viewValues) || _.isEqual(viewValues.length, 0)) {
                viewValues = angular.copy([zsgViewConstants.DEFAULT_VIEW]);
            }

            return viewValues;
        };

        this.getDefaultViewIdentifier = function (viewValues) {
            return that.getDefaultViewByValues(viewValues)[0];
        };

        this.saveGridViewSelection = function (gridId, viewIdentifier) {
            var gridSelectedViewKey = zsgViewConstants.GRID_SELECTED_VIEW_PREFIX + gridId;
            basil.set(gridSelectedViewKey, viewIdentifier);
        };

        this.saveViews = function (gridId, gridViews) {
            var gridViewsListKey = getGridViewsListKey(gridId);
            basil.set(gridViewsListKey, gridViews);
        };

        this.createGridView = function (gridId, viewIdentifier, columns, isUserDefined) {
            var gridViewKey = getGridViewKey(gridId, viewIdentifier.id);

            var gridViewList = that.getGridViewsList(gridId);
            var checkExists = _.contains(_.pluck(gridViewList, 'id'), viewIdentifier.id);

            if (!gridViewList) {
                gridViewList = [];
                gridViewList.unshift(viewIdentifier);
            } else if (!checkExists) {
                viewIdentifier.isUserDefined = isUserDefined;
                gridViewList.unshift(viewIdentifier);
            }

            that.saveViews(gridId, gridViewList);

            var gv = new GridView(columns, isUserDefined);
            basil.set(gridViewKey, gv);
            return gv;
        };

        this.getGridViewsList = function (gridId) {
            var gridViewsListKey = getGridViewsListKey(gridId);
            return basil.get(gridViewsListKey);
        };

        this.getGridView = function (gridId, viewIdentifier) {
            var gridViewKey = getGridViewKey(gridId, viewIdentifier.id);
            return basil.get(gridViewKey);
        };

        this.getSelectedGridView = function (gridId) {
            var gridSelectedViewKey = zsgViewConstants.GRID_SELECTED_VIEW_PREFIX + gridId;
            return basil.get(gridSelectedViewKey);
        };

        function getColumnsByView(columns, viewIdentifier) {
            return _.filter(columns, function (column) {
                return _.contains(column.views, viewIdentifier.id);
            });
        }

        this.resetView = function (gridId, grid, viewIdentifier, columns) {
            var currentColumns = getColumnsByView(columns, viewIdentifier);
            that.createGridView(gridId, viewIdentifier, currentColumns, false);

            grid.setColumns(currentColumns);
        };

        this.orderBySelectedView = function (viewIdentifier, views, numOfViews) {
            //get view index in collection
            var index = _.findIndex(views, {'id': viewIdentifier.id});
            //check if view inside the drop down list or already on grid
            if (index > (numOfViews - 1)) {
                //remove view from old position replace current view to the first position
                views.unshift(views.splice(index, 1)[0]);
            }

            return views;
        };

        this.deleteGridView = function (gridId, viewIdentifier) {
            var gridViewsListKey = getGridViewsListKey(gridId);
            var gridViewKey = getGridViewKey(gridId, viewIdentifier.id);

            var gridViewList = basil.get(gridViewsListKey);

            _.remove(gridViewList, function (view) {
                return view.id === viewIdentifier.id;
            });

            basil.remove(gridViewKey);
            that.saveViews(gridId, gridViewList);

            return gridViewList;
        };

        function getGridViewsListKey(gridId) {
            return zsgViewConstants.GRID_VIEW_PREFIX + gridId;
        }

        function getGridViewKey(gridId, gridViewId) {
            return getGridViewsListKey(gridId) + '-' + gridViewId;
        }

        function GridView(viewColumns, isUserDefined) {
            this.viewColumns = viewColumns;
            this.isUserDefined = isUserDefined;
        }
    });
