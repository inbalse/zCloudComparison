'use strict';
angular.module('zvmApp.directives')
    .component('busyOverlay', {
        templateUrl: 'scripts/common/components/busy_overlay/busy-overlay.html',
        controller: function (busyOverlayService) {
            var $ctrl = this;

            $ctrl.showLoader = false;

            busyOverlayService.onShow().then(null, null, onShow);
            busyOverlayService.onHide().then(null, null, onHide);

            function onShow() {
                $ctrl.showLoader = true;
            }

            function onHide() {
                $ctrl.showLoader = false;
            }
        }
    });
