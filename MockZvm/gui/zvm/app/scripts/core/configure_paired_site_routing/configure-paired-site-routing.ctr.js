'use strict';

angular.module('zvmApp.core')
    .controller('configurePairedSiteRoutingController', function ($scope, $translate, configurePairedSiteRoutingFactory,
                                                                  result, configurePairedSiteRoutingModel, vos) {

        configurePairedSiteRoutingModel.pairedSiteRouting = result ? result : new vos.PairedSiteRouting('', '', '');

        $scope.data = _.clone(configurePairedSiteRoutingModel.pairedSiteRouting);
        $scope.usePairSiteRouting = configurePairedSiteRoutingModel.usePairedSiteRouting;
        $scope.loading = false;
        $scope.forms = {};

        $scope.handleCancel = function () {
            configurePairedSiteRoutingFactory.close();
        };

        $scope.handleSave = function () {
            configurePairedSiteRoutingFactory.save($scope.data);
        };

        $scope.sendButton = {
            label: $translate.instant('MODAL.SAVE'),
            handler: $scope.handleSave,
            disabled: true
        };

        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.handleCancel,
                disabled: false
            },
            $scope.sendButton
        ];

        $scope.$watch('forms.pairedSiteRouting.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.sendButton.disabled = !value;
            }
        });

        $scope.$watch('usePairSiteRouting', function (newValue) {
            configurePairedSiteRoutingModel.usePairedSiteRouting = newValue;
        });
    });
