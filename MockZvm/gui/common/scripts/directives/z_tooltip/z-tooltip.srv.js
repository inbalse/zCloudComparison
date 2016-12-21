'use strict';

angular.module('zvmApp.directives')
    .service('zTooltipService', function () {
        var zTooltipService = this;
        zTooltipService.state = {};

        zTooltipService.state.visible = false;

        zTooltipService.show = function (e) {
            zTooltipService.state.style = ({left: e.pageX, top: e.pageY, zIndex: 2000});
            zTooltipService.state.visible = true;
        };

        zTooltipService.hide = function () {
            zTooltipService.state.visible = false;
        };
    });
