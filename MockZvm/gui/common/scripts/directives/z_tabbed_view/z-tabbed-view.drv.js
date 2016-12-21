//'use strict';
//
//
////i had to use hardcoded values since there is no events when either dom or any other component is ready after binding and rendering
//
//angular.module('zvmApp.directives').directive('zTabbedView', function () {
//
//    function resize(scope, element) {
//        if ($(element).hasClass('non-symmetric-view')) {
//            nonSymmetricView(scope);
//        } else {
//            symmetricView(scope);
//        }
//    }
//
//    function nonSymmetricView(scope) {
//        //30 right and left padding size
//        var parentContainerWidth = $('body').width() - 30;
//        //according to design, status stab gets width of 320 when lower than 1200
//        var firstItemWidth = (parentContainerWidth <= 1200 ? 320 : 440);
//        //reduce first tab
//        var tabLength = scope.tabs.length - 1;
//        var elementsLength = tabLength > 2 ? tabLength : 3;
//
//        var finalElementWidth = (parentContainerWidth - (firstItemWidth + 10)) / elementsLength - 10 + 'px';
//
//        scope.tabs[0].width = firstItemWidth;
//        //each without first tab
//        _.each(_.rest(scope.tabs), function (item) {
//            item.width = finalElementWidth;
//        });
//    }
//
//    function symmetricView(scope) {
//        //30 right and left padding size
//        var parentContainerWidth = $('body').width() - 30;
//        var elementsLength = scope.tabs.length > 3 ? scope.tabs.length : 4;
//        var finalWidth = (parentContainerWidth / elementsLength) - 10 + 'px';
//
//        if (scope.tabs.length === 2) {
//            finalWidth = '33%';
//        }
//        if (scope.tabs.length === 3) {
//            finalWidth = '33.33%';
//        }
//        _.each(scope.tabs, function (item) {
//            item.width = finalWidth;
//        });
//    }
//
//    return {
//        restrict: 'C',
//        link: function (scope, element) {
//            resize(scope, element);
//
//            scope.$on('zResize::resize', function () {
//                resize(scope, element);
//            });
//        }
//    };
//});
