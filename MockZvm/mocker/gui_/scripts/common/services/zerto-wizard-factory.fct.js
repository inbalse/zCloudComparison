'use strict';

angular.module('zvmApp.services')
    .factory('zertoWizardFactory', function ($q, $uibModal) {
        var zertoWizardFactory = {};
        zertoWizardFactory.createFactory = function (templateUrl, windowClass, controller, backdrop) {
            var genericFactory = {};
            genericFactory.modalService = $uibModal;
            genericFactory.modalInstance = null;
            genericFactory.modalProps = {};

            genericFactory.modalProps = {
                templateUrl: templateUrl,
                windowClass: windowClass,
                controller: controller
            };

            if (backdrop) {
                genericFactory.modalProps.backdrop = backdrop;
            }

            //in case of open is not overrided, it just calls for show
            genericFactory.open = function () {
                genericFactory.show();
            };

            genericFactory.show = function () {
                genericFactory.modalInstance = genericFactory.modalService.open(genericFactory.modalProps);
            };

            genericFactory.close = function () {
                genericFactory.modalInstance.close();
            };

            genericFactory.expose = function () {
                return {
                    _self: genericFactory,
                    open: genericFactory.open,
                    show: genericFactory.show,
                    close: genericFactory.close
                };
            };

            return genericFactory;
        };

        zertoWizardFactory.createModel = function () {
            var genericModel = {};
            genericModel.q = $q;
            genericModel.revertStack = [];
            genericModel.addModel = function (modelItem) {
                genericModel.revertStack.push(modelItem.revert);
            };

            genericModel.init = function () {
                var deferred = genericModel.q.defer();

                _.forEach(genericModel.revertStack, function (revertFunction) {
                    if (revertFunction && angular.isFunction(revertFunction)) {
                        revertFunction();
                    }
                });
                deferred.resolve();

                return deferred.promise;
            };

            genericModel.expose = function () {
                return {
                    _self: genericModel,
                    init: genericModel.init,
                    addModel: genericModel.addModel
                };
            };

            return genericModel;
        };

        return {
            createFactory: zertoWizardFactory.createFactory,
            createModel: zertoWizardFactory.createModel
        };
    })
;
