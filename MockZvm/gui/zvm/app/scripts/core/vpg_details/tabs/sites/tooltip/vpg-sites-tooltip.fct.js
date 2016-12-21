'use strict';

angular.module('zvmApp.core')
    .factory('vpgSitesTooltipFactory', function (vpgSitesModel, enums, zScrollAndZoomHelperService) {
        var vpgSitesTooltipFactory = {
            model: {},
            hasFocus: false,
            delay: 1500,
            timeout: null
        };

        vpgSitesTooltipFactory.model.item = {};
        vpgSitesTooltipFactory.model.position = {};
        vpgSitesTooltipFactory.model.state = false;
        
        vpgSitesTooltipFactory.appendImgSrc = function (alert) {
            alert.imgSrc = 'assets/vpgs_details/topology/';
            alert.imgSrc += alert.Level === enums.SystemStateAlertLevel.Warning ? 'alert-warning.png' : 'alert-error.png';
        };

        vpgSitesTooltipFactory.adjustPosition = function (slot, control, position) {
            var zoomValue = zScrollAndZoomHelperService.getZoomValue();
            var siteAdjust = 10;
            if (slot === vpgSitesModel.VM) {
                position.top = position.top * zoomValue - control.options.rectHeight / 2;
                position.left = position.left * zoomValue + control.options.rectWidth * zoomValue + siteAdjust * zoomValue;
            }
            else if (slot === vpgSitesModel.SOURCE) {
                position.top = position.top * zoomValue;
                position.left = position.left * zoomValue + control.options.maxHostWidth * zoomValue + siteAdjust * zoomValue;

            } else if (slot === vpgSitesModel.TARGET) {
                position.top = position.top * zoomValue;
                position.left = position.left * zoomValue - control.options.tooltipWidth - siteAdjust * zoomValue;
            } else if (slot === vpgSitesModel.SOURCE_SITE) {
                position.top = position.top * zoomValue;
                position.left = position.left * zoomValue + control.options.maxHostWidth * zoomValue + siteAdjust * zoomValue;
            } else if (slot === vpgSitesModel.TARGET_SITE) {
                position.top = position.top * zoomValue;
                position.left = position.left * zoomValue - control.options.tooltipWidth - siteAdjust * zoomValue;
            }
        };

        vpgSitesTooltipFactory.show = function (item, position) {
            clearTimeout(vpgSitesTooltipFactory.timeout);

            vpgSitesTooltipFactory.model.state = true;
            vpgSitesTooltipFactory.model.item = item;
            vpgSitesTooltipFactory.model.position = {
                left: position.left,
                top: position.top
            };

            item.IsSiteToVraConnectionOk = (!item.data.IsSiteToVraConnectionOk && (item.slot === vpgSitesModel.SOURCE || item.slot === vpgSitesModel.TARGET));

            item.IsVraToVraConnectionOk = (!item.data.IsVraToVraConnectionOk && (item.slot === vpgSitesModel.SOURCE || item.slot === vpgSitesModel.TARGET));

            item.isConnected = (!item.data.IsConnected && (item.slot === vpgSitesModel.SOURCE_SITE || item.slot === vpgSitesModel.TARGET_SITE));

            if (item.slot !== vpgSitesModel.VM && (item.data.Alerts.length > 0 || (item.data.ResourcePoolAlerts && item.data.ResourcePoolAlerts.length > 0))) {
                //todo :model should return aggregated alerts, up to 3
                item.flagMoreAlerts = item.data.Alerts.length >= 3;
                item.slicedAlerts = item.flagMoreAlerts ? _.slice(item.data.Alerts, 0, 3) : item.data.Alerts;
                _.forEach(item.slicedAlerts, vpgSitesTooltipFactory.appendImgSrc);

                item.flagMorePoolAlerts = item.data.ResourcePoolAlerts && item.data.ResourcePoolAlerts.length >= 3;
                //only hosts have resource pool alerts
                if (item.slot === vpgSitesModel.SOURCE || item.slot === vpgSitesModel.TARGET) {
                    item.slicedPoolAlerts = item.flagMorePoolAlerts ? _.slice(item.data.ResourcePoolAlerts, 0, 3) : item.data.ResourcePoolAlerts;
                    _.forEach(item.slicedPoolAlerts, vpgSitesTooltipFactory.appendImgSrc);
                }
            }
        };

        vpgSitesTooltipFactory.hide = function (scope) {
            clearTimeout(vpgSitesTooltipFactory.timeout);
            vpgSitesTooltipFactory.timeout = setTimeout(function () {
                vpgSitesTooltipFactory.timedHide(scope);
            }, vpgSitesTooltipFactory.delay);
        };

        vpgSitesTooltipFactory.timedHide = function (scope) {
            if (!vpgSitesTooltipFactory.hasFocus) {
                vpgSitesTooltipFactory.model.item = {};
                vpgSitesTooltipFactory.model.position = {};
                vpgSitesTooltipFactory.model.state = false;
                scope.$apply();
            }
        };

        vpgSitesTooltipFactory.getFocus = function () {
            vpgSitesTooltipFactory.hasFocus = true;
        };

        vpgSitesTooltipFactory.looseFocus = function () {
            vpgSitesTooltipFactory.hasFocus = false;
        };

        return {
            _self: vpgSitesTooltipFactory,
            model: vpgSitesTooltipFactory.model,
            show: vpgSitesTooltipFactory.show,
            hide: vpgSitesTooltipFactory.hide,
            getFocus: vpgSitesTooltipFactory.getFocus,
            looseFocus: vpgSitesTooltipFactory.looseFocus,
            adjustPosition: vpgSitesTooltipFactory.adjustPosition
        };
    });
