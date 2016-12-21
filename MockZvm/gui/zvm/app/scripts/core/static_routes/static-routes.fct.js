'use strict';

angular.module('zvmApp.core')
    .factory('staticRoutesFactory', function ($uibModal, zertoServiceFactory, $q) {
        var staticRoutesFactory = {};

        staticRoutesFactory.modalInstance = null;

        staticRoutesFactory.openWindow = function () {
            staticRoutesFactory.deffer = $q.defer();
            zertoServiceFactory.GetRouteGroups().then(function (result) {
                staticRoutesFactory.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/static_routes/static-routes.html',
                    windowClass: 'static-routes',
                    controller: 'staticRoutesController',
                    resolve: {
                        result: function () {
                            return result;
                        }
                    }
                });
            });
            return staticRoutesFactory.deffer.promise;
        };

        staticRoutesFactory.close = function () {
            staticRoutesFactory.modalInstance.dismiss('close');
            staticRoutesFactory.deffer.resolve('close');
        };

        staticRoutesFactory.save = function (data) {
            zertoServiceFactory.SetRouteGroups(data);
            staticRoutesFactory.modalInstance.dismiss('close');
            staticRoutesFactory.deffer.resolve('save');
        };

        staticRoutesFactory.createGuid = (function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
        }) ();

        return staticRoutesFactory;
    });
