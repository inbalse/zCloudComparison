'use strict';

angular.module('zvmApp.core')
    .factory('configurePairedSiteRoutingFactory', function ($uibModal, zertoServiceFactory,configurePairedSiteRoutingModel) {
        var configurePairedSiteRoutingFactory = {};

        configurePairedSiteRoutingFactory.modalInstance = null;

        configurePairedSiteRoutingFactory.openWindow = function () {
            zertoServiceFactory.GetPairedSiteRouting().then(function (result) {
                configurePairedSiteRoutingFactory.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/configure_paired_site_routing/configure-paired-site-routing.html',
                    windowClass: 'configure-paired-site-routing',
                    controller: 'configurePairedSiteRoutingController',
                    resolve: {
                        result: function () {
                            return result;
                        }
                    }
                });
            });
        };

        configurePairedSiteRoutingFactory.close = function () {
            configurePairedSiteRoutingFactory.modalInstance.dismiss('close');
        };

        configurePairedSiteRoutingFactory.save = function(data){
           zertoServiceFactory.SetPairedSiteRouting(data).then(function () {  //on success
                configurePairedSiteRoutingModel.pairedSiteRouting = data;

            });

            configurePairedSiteRoutingFactory.modalInstance.dismiss('close');
        };

        return configurePairedSiteRoutingFactory;
    });
