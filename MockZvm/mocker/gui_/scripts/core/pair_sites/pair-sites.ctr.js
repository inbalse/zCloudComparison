'use strict';

angular.module('zvmApp.core')
    .controller('pairSitesController', function ($scope, pairSitesFactory, vos, $translate) {
        //========================================================================================
        // Properties
        //========================================================================================
        $scope.site = {};
        $scope.loading = true;
        $scope.forms = {};
        //========================================================================================
        // User Interaction Handlers
        //========================================================================================
        $scope.handleSaveClicked = function () {
            if ($scope.forms.pairForm.$valid) {
                pairSitesFactory.sendData(new vos.SiteConnectionParameters($scope.site.address, $scope.site.port));
                $scope.closeWindow();
            }
        };

        $scope.handleCancelClicked = function () {
            $scope.closeWindow();
        };

        $scope.closeWindow = function () {
            pairSitesFactory.modalInstance.dismiss('close');
        };

        $scope.closeHandler = function () {
            $scope.closeWindow();
        };

        $scope.enterPressEvent = function () {
            $scope.handleSaveClicked();
        };
        //========================================================================================
        // Internal Helpers
        //========================================================================================
        $scope.processTranslations = function (translations) {
            $scope.translations = translations;
            $scope.pairButton = {
                label: $scope.translations['PAIR_SITES.PAIR'],
                handler: $scope.handleSaveClicked,
                disabled: false
            };
            $scope.buttons = [
                {
                    label: $scope.translations['PAIR_SITES.CANCEL'],
                    class: 'btn btn-link',
                    handler: $scope.handleCancelClicked,
                    disabled: false
                },
                $scope.pairButton
            ];
        };

        $scope.disableButtons = function (value) {
            $scope.pairButton.disabled = !value;
        };
        //========================================================================================
        // Get Stuff
        //========================================================================================
        $translate(['PAIR_SITES.PAIR', 'PAIR_SITES.CANCEL']).then($scope.processTranslations);
        pairSitesFactory.getData().then(function (value) {
            $scope.site.port = value.DefaultPortNumber;
            $scope.loading = false;
        });
        $scope.$watch('forms.pairForm.$valid', $scope.disableButtons);
    });
