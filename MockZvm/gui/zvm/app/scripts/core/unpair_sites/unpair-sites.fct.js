'use strict';

angular.module('zvmApp.core')
    .factory('unpairSitesFactory', function (zertoServiceFactory, $uibModal, $q, $translate, zAlertFactory) {
        var unpairSitesFactory = {};

        unpairSitesFactory.sitesToUnpairCollection = null;
        unpairSitesFactory.deferred = null;

        unpairSitesFactory.startUnpair = function (col) {

            unpairSitesFactory.deferred = $q.defer();
            unpairSitesFactory.sitesToUnpairCollection = col;
            var showKeepDisks = _.contains(_.pluck(col, 'HasDisksToKeep') ,true);

            if (showKeepDisks) {
                var buttons = [zAlertFactory.buttons.CANCEL, zAlertFactory.buttons.CONTINUE];
                zAlertFactory.warnCheck('Warning', unpairSitesFactory.createUnpairMessage(col),
                    unpairSitesFactory.handleWarningCloseWithCheck, $translate.instant('UNPAIR_SITES.UNPAIR_SITES_KEEP_DISKS'), buttons, showKeepDisks);
            } else {
                zAlertFactory.warn('Warning', unpairSitesFactory.createUnpairMessage(col), unpairSitesFactory.handleWarningClose);
            }

            return unpairSitesFactory.deferred.promise;
        };

        var unPairSuccess = function(id){
            unpairSitesFactory.deferred.resolve(id);
        };

        unpairSitesFactory.handleWarningCloseWithCheck = function (event) {
            if (event.target.name === zAlertFactory.buttons.CONTINUE) {
                _.forEach(unpairSitesFactory.sitesToUnpairCollection, function (site) {
                    zertoServiceFactory.Unpair(site.SiteId, event.selected).then(unPairSuccess(site.SiteId.SiteGuid));
                });
            }
        };

        unpairSitesFactory.handleWarningClose = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {
                _.forEach(unpairSitesFactory.sitesToUnpairCollection, function (site) {
                    zertoServiceFactory.Unpair(site.SiteId, false).then(unPairSuccess(site.SiteId.SiteGuid));
                });
            }
        };

        var sitesHaveVpgs = function (col) {
            var siteWithVpgs = _.find(col, function (site) {
                return site.NumberOfVpgs;
            });
            return !_.isNullOrUndefined(siteWithVpgs);
        };

        unpairSitesFactory.createUnpairMessage = function (col) {
            var result = '';

            _.forEach(col, function (site) {
                result += site.HostName + ',';
            });

            if (result.length) {
                result = result.slice(0, -1);
            }

            if (sitesHaveVpgs(col)) {
                return $translate.instant('UNPAIR_SITES.UNPAIR_MESSAGE_WITH_VPGS', {site: result});
            }

            return $translate.instant('UNPAIR_SITES.UNPAIR_MESSAGE_NO_VPGS', {site: result});
        };

        return unpairSitesFactory;
    });
