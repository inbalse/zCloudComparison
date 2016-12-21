'use strict';

angular.module('zvmApp.core')
    .factory('bootOrderFactory', function ($uibModal, $q) {
        var bootOrderFactory = {};

        bootOrderFactory._modalInstance = null;
        bootOrderFactory.differed = null;

        bootOrderFactory.openWindow = function (data, entities, items) {
            bootOrderFactory.differed = $q.defer();

            bootOrderFactory._modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/boot_order/boot-order.html',
                windowClass: 'boot-order',
                controller: 'bootOrderController',
                backdrop: 'static',
                resolve: {
                    data: function () {
                        return data;
                    }, entities: function () {
                        return entities;
                    }, items: function () {
                        return items;
                    }
                }
            });

            return bootOrderFactory.differed.promise;
        };

        bootOrderFactory.save = function (value) {
            bootOrderFactory.differed.resolve(value);
        };

        bootOrderFactory.close = function(value){
            bootOrderFactory.differed.reject(value);
            bootOrderFactory._modalInstance.close('');
        };

        return bootOrderFactory;
    });
