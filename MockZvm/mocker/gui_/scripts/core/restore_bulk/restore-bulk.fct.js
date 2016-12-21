'use strict';

angular.module('zvmApp.core')
    .factory('restoreBulkEditFactory', function ($uibModal, $q) {
        var restoreBulkEditFactory = {};

        restoreBulkEditFactory._modalInstance = null;
        restoreBulkEditFactory._promise = null;

        restoreBulkEditFactory.openEdit = function (items, hosts) {
            restoreBulkEditFactory._promise = $q.defer();
            restoreBulkEditFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/restore_bulk/restore-bulk.html',
                windowClass: 'restore-bulk-edit',
                controller: 'restoreBulkEditController',
                backdrop: 'static',
                resolve: {
                    item: function () {
                        return angular.copy(restoreBulkEditFactory.createSharedObject(items));
                    },
                    hosts: function () {
                        return angular.copy(hosts);
                    }
                }
            });
            return restoreBulkEditFactory._promise.promise;
        };
        restoreBulkEditFactory.createSharedObject = function (items) {
            var sharedObject = items[0];
            _.each(_.rest(items), function (item) {
                if (!_.isEqual(sharedObject.ComputeResource, item.ComputeResource)) {
                    sharedObject.ComputeResource = null;
                }
                if (!_.isEqual(sharedObject.Datastore, item.Datastore)) {
                    sharedObject.Datastore = null;
                }
                if (!_.isEqual(sharedObject.IsPowerOn, item.IsPowerOn)) {
                    sharedObject.IsPowerOn = undefined;
                }
            });
            return sharedObject;
        };
        restoreBulkEditFactory.save = function (value) {
            restoreBulkEditFactory._promise.resolve(value);
            restoreBulkEditFactory._closeWindow();
        };

        restoreBulkEditFactory.close = function () {
            restoreBulkEditFactory._promise.reject('close');
            restoreBulkEditFactory._closeWindow();
        };

        restoreBulkEditFactory._closeWindow = function () {
            restoreBulkEditFactory._modalInstance.dismiss('close');
            restoreBulkEditFactory._modalInstance = null;
        };
        return restoreBulkEditFactory;

    });
