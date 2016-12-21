'use strict';

angular.module('zvmApp.core')
    .factory('recoveryPolicyFactory', function ($uibModal, $q) {
        var recoveryPolicyFactory = {};

        recoveryPolicyFactory.deferred = null;

        recoveryPolicyFactory.open = function (selectedVpgs) {

            recoveryPolicyFactory.deferred = $q.defer();

            var oneVpg = recoveryPolicyFactory.combineObjects(_.cloneDeep(selectedVpgs));

            recoveryPolicyFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/recovery_wizard/steps/recovery-policy-edit.html',
                windowClass: 'recovery-edit-modal',
                controller: 'recoveryEditControllerPopUp',
                backdrop: false,
                resolve: {
                    oneVpg: function () {
                        return oneVpg;
                    }
                }
            });
            return recoveryPolicyFactory.deferred.promise;
        };

        recoveryPolicyFactory.save = function (value) {
            recoveryPolicyFactory.deferred.resolve(value);
            recoveryPolicyFactory.modalInstance.close();
        };

        recoveryPolicyFactory.close = function () {
            recoveryPolicyFactory.deferred.reject(null);
            recoveryPolicyFactory.modalInstance.close();
        };

        recoveryPolicyFactory.combineObjects = function(selectedVpgs){

            var firstVpg = _.cloneDeep(selectedVpgs[0]);
            selectedVpgs = _.rest(selectedVpgs);

            _.forEach(selectedVpgs, function(vpg){
                if(!_.isEqual(firstVpg.recoveryItemVo.defaultAction,vpg.recoveryItemVo.defaultAction)){
                    firstVpg.recoveryItemVo.defaultAction = undefined;
                }
                if(!_.isEqual(firstVpg.recoveryItemVo.defaultTimeout,vpg.recoveryItemVo.defaultTimeout)){
                    firstVpg.recoveryItemVo.defaultTimeout = 0;
                }

            });

            return firstVpg;
        };

        return recoveryPolicyFactory;
    });
