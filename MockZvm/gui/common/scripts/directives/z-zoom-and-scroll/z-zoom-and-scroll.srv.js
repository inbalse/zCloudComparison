'use strict';

angular.module('zvmApp.directives')
    .service('zScrollAndZoomHelperService', function ($timeout) {
        var zScrollAndZoomHelperService = this;
        zScrollAndZoomHelperService.zoomIndex = 0;
        zScrollAndZoomHelperService.zoomValues = [1, 0.9, 0.8, 0.7, 0.6, 0.5];
        zScrollAndZoomHelperService.scrollTick = 10;
        zScrollAndZoomHelperService.hasScroll = false;
        zScrollAndZoomHelperService.inScrollTop = false;
        zScrollAndZoomHelperService.inScrollBottom = false;
        zScrollAndZoomHelperService.containerClassName = 'z-zoom-container';
        zScrollAndZoomHelperService.setContainerName = function (name) {
            zScrollAndZoomHelperService.containerClassName = name;
        };

        zScrollAndZoomHelperService.getContainer = function () {
            return $('.' + zScrollAndZoomHelperService.containerClassName);
        };

        zScrollAndZoomHelperService.scroll = function (value) {
            var zoomContainer = zScrollAndZoomHelperService.getContainer();
            zoomContainer.scrollTop(zoomContainer.scrollTop() + value);
        };

        zScrollAndZoomHelperService.zoomOut = function () {
            zScrollAndZoomHelperService.zoomIndex--;
            zScrollAndZoomHelperService.checkScrolls();
        };
        zScrollAndZoomHelperService.zoomIn = function () {
            zScrollAndZoomHelperService.zoomIndex++;
            zScrollAndZoomHelperService.checkScrolls();
        };
        zScrollAndZoomHelperService.zoomReset = function () {
            zScrollAndZoomHelperService.zoomIndex = 0;
            zScrollAndZoomHelperService.checkScrolls();
        };

        zScrollAndZoomHelperService.getZoomValue = function () {
            return zScrollAndZoomHelperService.zoomValues[zScrollAndZoomHelperService.zoomIndex];
        };

        zScrollAndZoomHelperService.checkScrolls = function () {
            var zoomContainer = zScrollAndZoomHelperService.getContainer();
            $timeout(function () {
                zScrollAndZoomHelperService.hasScroll = zoomContainer.get(0).scrollHeight > zoomContainer.height();
            }, 500);
        };
    });
