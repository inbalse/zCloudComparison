'use strict';

angular.module('zvmApp.directives')
    .directive('zScrollAndZoom', function (zScrollAndZoomHelperService) {
        return {
            transclude: true,
            restrict: 'C',
            scope: true,
            templateUrl: 'scripts/common/directives/z-zoom-and-scroll/z-zoom-and-scroll.html',
            controller: function ($scope) {
                $scope.zScrollAndZoomHelperService = zScrollAndZoomHelperService;
                $scope.scrollTop = function () {
                    zScrollAndZoomHelperService.scroll(-zScrollAndZoomHelperService.scrollTick);
                };
                $scope.scrollBottom = function () {
                    zScrollAndZoomHelperService.scroll(zScrollAndZoomHelperService.scrollTick);
                };

                $scope.$on('zResize::resize', function () {
                    zScrollAndZoomHelperService.checkScrolls();
                });

            },
            link: function (scope, elem) {
                var scrollTimeout;
                zScrollAndZoomHelperService.setContainerName(elem.find('div[ng-transclude]').attr('class'));
                zScrollAndZoomHelperService.checkScrolls();

                elem.on('mousewheel', function (e) {
                    // cross-browser wheel delta
                    var delta = Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.detail)));

                    if (delta > 0) {
                        zScrollAndZoomHelperService.inScrollBottom = false;
                        clearTimeout(scrollTimeout);
                        zScrollAndZoomHelperService.inScrollTop = true;
                        scrollTimeout = setTimeout(function () {
                            zScrollAndZoomHelperService.inScrollTop = false;
                            scope.$apply();
                        }, 500);
                        zScrollAndZoomHelperService.scroll(-zScrollAndZoomHelperService.scrollTick);
                    } else {
                        zScrollAndZoomHelperService.inScrollTop = false;
                        clearTimeout(scrollTimeout);
                        zScrollAndZoomHelperService.inScrollBottom = true;
                        scrollTimeout = setTimeout(function () {
                            zScrollAndZoomHelperService.inScrollBottom = false;
                            scope.$apply();
                        }, 500);
                        zScrollAndZoomHelperService.scroll(zScrollAndZoomHelperService.scrollTick);
                    }
                    scope.$apply();
                    // for IE
                    e.returnValue = false;
                    // for Chrome and Firefox
                    if (e.preventDefault) {
                        e.preventDefault();
                    }
                });

                scope.$on('$destroy', function () {
                    clearTimeout(scrollTimeout);
                    elem.off();
                });
            }
        };
    });
