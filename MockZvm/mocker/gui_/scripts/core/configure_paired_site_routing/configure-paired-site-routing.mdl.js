'use strict';

angular.module('zvmApp.core')
    .factory('configurePairedSiteRoutingModel', function (vos) {
        var configurePairedSiteRoutingModel = {};

        configurePairedSiteRoutingModel.usePairedSiteRouting = false;

        configurePairedSiteRoutingModel.pairedSiteRouting = new vos.PairedSiteRouting('', '', '');

        return configurePairedSiteRoutingModel;
    });
