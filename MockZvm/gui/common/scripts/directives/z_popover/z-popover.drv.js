'use strict';

angular.module('zvmApp.directives')
    .directive('zPopover', function ($window) {
        return {
            restrict: 'A',
            replace: false,
            scope: {

                closeEvent: '&',
                contentEvent: '&',
                show: '='
            },
            link: function (scope, el, attrs) {
                //templates
                var closeTemplate = '<a href="javascript:void(0);" onclick="$(window).trigger(\'closeClicked' + el.index() + '\');return false;" class="popover-close"><img src="assets/tree_view/delete.png"/></a>';
                var contentTemplate = angular.isDefined(attrs.contentClickable) ? '<a href="javascript:void(0);" onclick="$(window).trigger(\'contentClicked' + el.index() + '\');return false;" class="popover-content-clickable"></a>' + attrs.content : attrs.content;

                el.popover({
                    title: attrs.title,
                    trigger: attrs.trigger,//click | hover | focus | manual
                    content: contentTemplate,
                    container : attrs.container,//get container where append popover (body)
                    html: true,//accepts you html tags like a template
                    // delay: { hide: 5000 }, when trigger close happen popover been close after 5 second
                    placement: attrs.placement
                });
                // event fire when popover exist in dom
                el.popover().on('shown.bs.popover', function () {
                    //check if popover append to body
                    var popover = angular.isDefined(attrs.container) ? $('.popover') : el.popover().next();

                    //create custom class for override positions
                    if (angular.isDefined(attrs.positionClassName)) {
                        popover.addClass(attrs.positionClassName);
                    }
                    //append close link
                    function appendClose(element){
                        //check if close already exists
                        if (!$(element).children().hasClass('popover-close')) {
                            $(element).prepend(closeTemplate);
                        }
                    }
                    //check if need close link (X)
                    if (angular.isDefined(attrs.close)) {
                        if (popover.length > 1) {
                            //in body can be few popovers
                            _.each(popover, function (pop) {
                                appendClose(pop);
                            });
                        } else {
                            appendClose(popover);
                        }
                    }
                    if(angular.isDefined(attrs.popoverCustomClassToOverride) && angular.isString(attrs.popoverCustomClassToOverride)){
                        popover.addClass(attrs.popoverCustomClassToOverride);
                    }

                    //if click inside, popover stay open
                    popover.on('click', function (event) {
                        event.stopPropagation();
                    });
                });
                //watch if popover visibility change from controller
                scope.$watch('show', function (value) {
                    if (angular.isDefined(value) && value){
                        el.popover('show');
                    }else{
                        el.popover('hide');
                    }
                });
                //close link event
                $($window).on('closeClicked' + el.index(), function () {
                    el.popover('hide');
                    if (angular.isDefined(attrs.close)) {
                        scope.closeEvent();
                    }
                });
                //content click event
                $($window).on('contentClicked' + el.index(), function () {
                    el.popover('hide');
                    if (angular.isDefined(attrs.contentClickable)) {
                        scope.contentEvent();
                    }
                });
                //when click out side popover closed
                if (attrs.outsideClose) {
                    $($window).on('click', function (e) {
                        if ($(e.target).attr('z-popover') || $(e.target.parentElement).attr('z-popover') !== '') {
                            $('.popover').remove();
                        }
                    });

                    //remove popover that open before
                    $('.popover').remove();
                }
                //off events after scope destroy
                scope.$on('$destroy', function () {
                    $($window).off('contentClicked' + el.index());
                    $($window).off('closeClicked' + el.index());
                    $($window).off('click');
                    el.popover().off('shown.bs.popover');
                    el.popover().off('click');
                    el.popover('destroy');
                    $('.popover').remove();
                });
            }
        };
    });



