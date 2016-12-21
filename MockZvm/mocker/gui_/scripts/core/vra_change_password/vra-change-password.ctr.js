'use strict';
angular.module('zvmApp.core')
    .controller('vraChangePasswordController', function ($scope, $translate, globalStateModel, enums, zertoServiceFactory, zAlertFactory, vraChangePasswordFactory, hostIdentifiers, vibUsed, eSXiHostLower51) {


        //==============================================================================================================
        //                    VARIABLE
        //==============================================================================================================

        $scope.loading = true;
        $scope.hostIdentifiers = hostIdentifiers;
        $scope.isHostPasswordRequired = true;
        $scope.isCheckBoxDisable = true;
        $scope.showPasswordText = false;
        $scope.credentialsObj = {
            password: '',
            installedUsingSshKey: vibUsed
        };
        //the ugliest hacky hack for bug24519
        $scope.ESXiHostLower51 = eSXiHostLower51;
        $scope.forms = {};

        if (globalStateModel.data !== null) {
            $scope.isScvmm = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV;
        }
        //==============================================================================================================
        //                    EVENTS
        //==============================================================================================================

        $scope.close = function () {
            vraChangePasswordFactory.close();
        };

        $scope._handleWarnModalClick = function (event) {
            if (event.target.name === zAlertFactory.buttons.OK) {

                if (!$scope.credentialsObj.installedUsingSshKey) {
                    $scope.credentialsObj.password = '';
                }
                //
                var useRsaKeyInsteadOfPassword = ($scope.ESXiHostLower51 || $scope.isScvmm) ? false : !$scope.credentialsObj.installedUsingSshKey;
                zertoServiceFactory.ChangeHostsPassword($scope.hostIdentifiers, $scope.credentialsObj.password, useRsaKeyInsteadOfPassword);
                $scope.close();
            }
        };

        $scope.save = function () {
            zAlertFactory.warn('', $scope.translations['VRA_CHANGE_PASSWORD.TEXT_WARN_MODAL'], $scope._handleWarnModalClick);
        };

        //==============================================================================================================
        //                    WATCHERS
        //==============================================================================================================

        $scope.$watch('forms.vraChangePass.$valid', function (value) {
            if (angular.isDefined(value) && $scope.credentialsObj.installedUsingSshKey) {
                $scope.saveButton.disabled = $scope.isCheckBoxDisable = !value;
            }
        });

        $scope.vibChange = function () {
            $scope.saveButton.disabled = !$scope.credentialsObj.installedUsingSshKey;
        };

        //==============================================================================================================
        //                    INIT
        //==============================================================================================================

        $scope.initButtons = function () {
            $scope.saveButton = {
                label: $scope.translations['MODAL.SAVE'],
                handler: $scope.save,
                disabled: !$scope.credentialsObj.installedUsingSshKey
            };
            $scope.buttons = [
                {
                    label: $scope.translations['MODAL.CANCEL'],
                    class: 'btn btn-link',
                    handler: $scope.close,
                    disabled: false
                },
                $scope.saveButton
            ];
        };

        $scope.translations = $translate.instant(['MODAL.SAVE', 'MODAL.CANCEL', 'VRA_CHANGE_PASSWORD.TEXT_WARN_MODAL']);

        $scope.initButtons();
        $scope.loading = false;

    });
