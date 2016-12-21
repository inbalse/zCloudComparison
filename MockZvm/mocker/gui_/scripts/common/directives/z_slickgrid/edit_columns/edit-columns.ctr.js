'use strict';

angular.module('zvmApp.directives')
    .controller('editColumnsController', function ($scope, $translate, editColumnsFactory, editColumnsModel, zSlickGridFactory, zSlickGridViewService, zSlickGridColumnsService, zSlickGridGlobals) {

        //region Properties
        $scope.loading = true;
        $scope.forms = {};
        $scope.checkBox = zSlickGridGlobals.CHECKBOX_SELECTOR;
        $scope.viewTemplate = {};
        $scope.data = editColumnsFactory.data;
        var MINIMUM_SELECTED_COLUMNS = 4;
        //endregion

        var getSelectedColumnsLenght = function () {
            return _.filter($scope.data.columns, function (column) {
                return !column.hideFromEditColumns && column.visible;
            }).length;
        };

        //region Init
        $scope.initTitle = function () {
            $scope.title = $scope.data.openForCreate ? $translate.instant('EDIT_COLUMNS.TITLE_CREATE') : $translate.instant('EDIT_COLUMNS.TITLE_SHOW')
        };

        $scope.initContent = function () {
            if (!$scope.data.openForCreate) {
                var columnsIds = editColumnsModel.getColumnsIdsByView($scope.data.columns, $scope.data.selectedView, $scope.data.gridId);
                $scope.data.columns = editColumnsModel.setColumnsVisibility($scope.data.columns, columnsIds);
            }else{
                //new view
                _.forEach($scope.data.columns, function (column) {
                    column.visible = false;
                });
            }
        };

        $scope.initButtons = function () {
            $scope.okButton = {
                label: $scope.data.openForCreate ? $translate.instant('MODAL.SAVE') : $translate.instant('MODAL.OK'),
                handler: $scope.save,
                disabled: $scope.data.openForCreate
            };

            $scope.buttons = [
                {
                    label: $translate.instant('MODAL.CANCEL'),
                    class: 'btn btn-link',
                    handler: $scope.close,
                    disabled: false
                },
                $scope.okButton
            ];
        };

        function getView() {
            return $scope.data.openForCreate ? { id: $scope.data.viewName, text: $scope.data.viewName } : $scope.data.selectedView ;
        }

        $scope.save = function () {
            var viewIdentifier = getView();
            var columns = zSlickGridColumnsService.getMarkedColumns($scope.data.columns);
            columns = zSlickGridColumnsService.addViewIdentifierToNewColumns(columns, viewIdentifier);
            zSlickGridViewService.createGridView($scope.data.gridId, viewIdentifier, columns, $scope.data.openForCreate);

            editColumnsFactory.close();
        };

        $scope.close = function () {
            editColumnsFactory.close();
        };

        if ($scope.data.openForCreate) {
            $scope.$watch('forms.columnsForm.$valid', function (value) {
                if (angular.isDefined(value)) {
                    $scope.okButton.disabled = !value || getSelectedColumnsLenght() < MINIMUM_SELECTED_COLUMNS;
                }
            });
        }

        $scope.$watch('viewTemplate.selectedView', function (newView) {
            if(angular.isDefined(newView)){
                var templateView = {id: newView, text: newView};
                var columnsIds = editColumnsModel.getColumnsIdsByView($scope.data.columns, templateView, $scope.data.gridId);
                $scope.data.columns = editColumnsModel.setColumnsVisibility($scope.data.columns, columnsIds);
            }
        });

        $scope.columnsSelectedChange = function () {
            $scope.okButton.disabled = getSelectedColumnsLenght() < MINIMUM_SELECTED_COLUMNS;
        };

        $scope.initTitle();
        $scope.initContent();
        $scope.initButtons();
        $scope.columnsSelectedChange();

        $scope.loading = false;

//endregion
    });
