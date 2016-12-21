/**
 * Created by guy.golan on 3/31/2016.
 */
'use strict';
angular.module('zvmApp.services')
    .service('busyOverlayService', function ($q) {
        var busyOverlayService = this,
            operations = [],
            blackList = [
                'GetSelectedVcdVappVms',
                'BrowseForVmdkFiles',
                'BrowseForVmdkFilesTargetVcd',
                'GetInitialSessionValidation',
                'RemoveProtectionGroup',
                'Pair'
            ];

        busyOverlayService.$$showDeferred = $q.defer();
        busyOverlayService.$$hideDeferred = $q.defer();

        busyOverlayService.onShow = function () {
            return busyOverlayService.$$showDeferred.promise;
        };

        busyOverlayService.onHide = function () {
            return busyOverlayService.$$hideDeferred.promise;
        };

        busyOverlayService.addToBlacklist = function (operation) {
            if (_.contains(blackList, operation)) {
                return;
            }
            blackList.push(operation);
        };

        busyOverlayService.removeFromBlacklist = function (operation) {
            _.remove(blackList, function (o) {
                return _.isEqual(o, operation);
            });
        };

        busyOverlayService.addOperation = function (operation) {
            if (isBlacklisted(operation)) {
                return;
            }

            operations.push(operation);

            if (operations.length > 1) {
                return;
            }

            busyOverlayService.$$showDeferred.notify();

        };

        busyOverlayService.removeOperation = function (operation) {
            var index = _.findIndex(operations, function (o) {
                return _.isEqual(o, operation);
            });
            if (index > -1) {
                operations.splice(index, 1);
            }

            if (!_.isEmpty(operations)) {
                return;
            }

            busyOverlayService.$$hideDeferred.notify();
        };

        function isBlacklisted(operation) {
            return _.contains(blackList, operation);
        }
    });



