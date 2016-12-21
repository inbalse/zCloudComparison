'use strict';

angular.module('zvmApp.core')
    .controller('createVPGNICsController', function ($scope, nicEditFactory, nicVCDEditFactory, createVpgNicsService) {

        //region EVENTS
        $scope.selectedItemsChange = function () {
            $scope.data.editNicsDisabled = _.isEmpty($scope.data.selectedItems);
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.selectedVCDItemsChange = function () {
            $scope.data.editVCDNicsDisabled = _.isEmpty($scope.data.selectedVCDItems);
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
        //endregion

        //region OPEN MODALS
        $scope.editNics = function () {
            var collectedNics = createVpgNicsService.collectSelectedNics($scope.data.selectedItems, createVpgNicsService.getVmsNicsList()),
                selectedNics = _.cloneDeep(collectedNics);
            nicEditFactory.open(selectedNics)
                .then(function (nicObject) {
                    if (nicObject) {
                        createVpgNicsService.saveNics(nicObject,selectedNics);
                        createVpgNicsService.updateGridData(createVpgNicsService.getVmsNicsList());
                        emitFormValidation();
                    }

                });
        };
        $scope.editVCDNics = function () {
            var collectedNics = createVpgNicsService.collectSelectedNics($scope.data.selectedVCDItems, createVpgNicsService.getVmsVcdNicsList()),
                selectedNics = _.cloneDeep(collectedNics);
            nicVCDEditFactory.open(selectedNics)
                .then(function (nicObject) {
                    if (nicObject) {
                        createVpgNicsService.saveVCDNics(nicObject, selectedNics);
                        createVpgNicsService.updateGridData(createVpgNicsService.getVmsVcdNicsList());
                        emitFormValidation();
                    }
                });
        };

        //endregion

        function emitFormValidation() {
            $scope.$emit('wizard:FormValidationChanged');
        }

        function initNicsStep() {
            $scope.data = {
                isTargetVCD: createVpgNicsService.isTargetVCD(),
                selectedItems: [],
                selectedVCDItems: [],
                editNicsDisabled: true,
                editVCDNicsDisabled: true
            };

            createVpgNicsService.init();

            $scope.data.gridObj = createVpgNicsService.getGridObj();
            $scope.data.gridObj.onValidationUpdate().then(null, null, emitFormValidation);
        }

        initNicsStep();
    });
