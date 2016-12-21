'use strict';

angular.module('zvmApp.directives')
    .directive('zsgCellErrorTooltip', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/common/directives/z_slickgrid/directive/zsg-cell-error-tooltip.html',
            link: function (scope, element) {

                var tooltipElement = element.find('.z-grid-cell-tooltip'), tooltipTimeout;
                tooltipElement.hide();

                var hideOnTimeErrorTooltip = function () {
                    tooltipTimeout = $timeout(function () {
                        tooltipElement.hide();
                    }, 3000);
                };

                var showErrorTooltip = function (args, editObj) {
                    var cellElement, rowHeight, top, leftFixer, topFixer;

                    scope.isInfoType = editObj.hasOwnProperty('infoMessage');
                    var message = scope.isInfoType ? editObj.infoMessage : editObj.errorMessage;
                    
                    //todo find better way to get current and dynamic position for tooltip
                    //use this fixer because in different places grid container have different padding
                    leftFixer = angular.isDefined(editObj.leftFixer) ? editObj.leftFixer : 0;
                    topFixer = angular.isDefined(editObj.topFixer) ? editObj.topFixer : 0;

                    cellElement = $(args.grid.getCellNode(args.row, args.cell));
                    rowHeight = cellElement.parent().height();
                    top = (args.row * rowHeight) + rowHeight;

                    //Angular got faster in version 1.5, apply changes faster
                    if (!scope.$$phase) {
                        scope.$apply(function(){
                            scope.message = message;
                        });
                    }

                    tooltipElement.css({top: top - topFixer, left: cellElement.position().left - leftFixer});
                };

                var isCellEditable = function (cellItem, args) {
                    if (angular.isDefined(cellItem.zCellEditable)) {
                        var item = args.grid.getDataItem(args.row);
                        var editObj = cellItem.zCellEditable(item);

                        if (!editObj.isEditEnabled) {
                            showErrorTooltip(args, editObj);
                            $timeout.cancel(tooltipTimeout);
                            tooltipElement.show();
                            hideOnTimeErrorTooltip();
                        }

                        return editObj.isEditEnabled;
                    }

                    tooltipElement.hide();
                    return true;
                };

                scope.onBeforeEditCell = function (e, args) {
                    return isCellEditable(args.column, args);
                };

                scope.grid.onBeforeEditCell.subscribe(scope.onBeforeEditCell);

                scope.$on('$destroy', function () {
                    $timeout.cancel(tooltipTimeout);
                });
            }
        };
    });
