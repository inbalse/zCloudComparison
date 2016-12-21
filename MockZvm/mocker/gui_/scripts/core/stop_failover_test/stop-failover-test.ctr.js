'use strict';

angular.module('zvmApp.core')
    .controller('stopFailoverTestController', function ($scope, item, $translate, stopFailoverTestFactory, enums) {
        //===========================================================================
        // initial stuff
        //===========================================================================
        $scope.loading = true;
        $scope.data = item;

        $scope.results = [
            {Label: 'Success', Value: enums.TestStatus.Success},
            {Label: 'Failure', Value: enums.TestStatus.FailedByUser}
        ];
        //===========================================================================
        // user interaction
        //===========================================================================
        $scope.close = function () {
            stopFailoverTestFactory.close();
        };

        $scope.save = function () {
            stopFailoverTestFactory.stop($scope.data.Result.Status, $scope.data.Result.Summary);
        };
        //===========================================================================
        // init
        //===========================================================================
        $scope._processTranslations = function (translations) {
            $scope.translations = translations;
            $scope.pairButton = {label: $scope.translations['MODAL.STOP'], handler: $scope.save, disabled: false };
            $scope.buttons = [
                {label: $scope.translations['MODAL.CANCEL'], class: 'btn btn-link', handler: $scope.close, disabled: false},
                $scope.pairButton
            ];
            $scope.loading = false;
        };

        if(stopFailoverTestFactory.collection.length === 1){
            $scope.data.Result.Summary = 'Stop Test for VPG ' + stopFailoverTestFactory.collection[0].Name;
        }else{
            $scope.data.Result.Summary = 'Stop Test - ' + stopFailoverTestFactory.collection.length + ' VPGs';
        }
        $translate(['MODAL.CANCEL', 'MODAL.STOP']).then($scope._processTranslations);
    });
