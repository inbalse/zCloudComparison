'use strict';

angular.module('zvmApp.directives').
    directive('draggable', function ($document) {
        return function (scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0, draggedElement;

            element.on('mousedown', function (event) {
                if(!element.is('input')) {
                    startX = event.screenX - x;
                    startY = event.screenY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                }

                if (!_.isNullOrUndefined(attr.draggedElement)) {
                    draggedElement = angular.element(attr.draggedElement);
                }
            });

            function mousemove(event) {
                y = !angular.isDefined(attr.horizontalOnly) ? event.screenY - startY: y;
                x = !angular.isDefined(attr.verticalOnly) ? event.screenX - startX: x;
                // drag the element which contains the draggable component
                var dragged = draggedElement || element.closest('.modal-content');

                dragged.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                draggedElement = null;
            }
        };
    });
