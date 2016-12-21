'use strict';

angular.module('zvmApp.core')
    .controller('configureProviderVdcSelectController', function ($scope, $uibModalInstance, result) {

        $scope.data = result;
        $scope.isSaveButtonEnabled = false;

        var columnDefs = [{name: 'Provider vDC Name', field: 'DisplayName', hideFromEditColumns: true}];

        $scope.customOptions = {
            columns: columnDefs
        };

        $scope.selectedItems = [];

        $scope.selectionChange = function () {
            $scope.isSaveButtonEnabled = $scope.selectedItems.length > 0;

            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.save = function(){
            $uibModalInstance.close($scope.selectedItems);
        };

    });
