'use strict';

angular.module('zvmApp.directives')
    .directive('zsgViews', function (zSlickGridFactory, zSlickGridGlobals, zSlickGridViewService, zTabsStateService) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/common/directives/z_slickgrid/directive/zsg-views.html',
            link: function (scope) {

                scope.numOfViews = scope.customOptions.numOfViews > zSlickGridGlobals.NUM_OF_DEFAULTS_VIES ? scope.customOptions.numOfViews : zSlickGridGlobals.NUM_OF_DEFAULTS_VIES;

                if (angular.isDefined(scope.views) && scope.numOfViews < scope.views.length) {
                    scope.views = zSlickGridViewService.orderBySelectedView(scope.selectedView, scope.views, scope.numOfViews);
                }

                scope.selectView = function (viewIdentifier) {
                    var customColumns = angular.copy(scope.customOptions.columns);
                    var settings = {};
                    settings.selectedItems = scope.selectedItems;
                    settings.searchKey = scope.search.input || zTabsStateService.getTabSearch(scope.gridId);
                    zSlickGridFactory.setView(scope.gridId, scope.grid, customColumns, viewIdentifier, scope.data, settings);
                    scope.selectedView = viewIdentifier;
                    scope.views = zSlickGridViewService.orderBySelectedView(viewIdentifier, scope.views, scope.numOfViews);
                };

                scope.closeView = function (viewIdentifier) {
                    scope.views = zSlickGridViewService.deleteGridView(scope.gridId, viewIdentifier);

                    //check if deleted view is also selected view
                    if (viewIdentifier.id === scope.selectedView.id) {
                        zSlickGridViewService.saveGridViewSelection(scope.gridId, scope.views[0]);
                        scope.selectedView = scope.views[0];
                        scope.selectView(scope.selectedView);
                    }
                };
            }
        };
    });
