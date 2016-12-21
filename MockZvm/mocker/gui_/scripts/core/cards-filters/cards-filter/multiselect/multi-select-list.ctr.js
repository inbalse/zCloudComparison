'use strict';
angular.module('zvmApp.components')
    .controller('multiSelectListController', function () {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.filters = ctrl.filterValues;
            ctrl.selectAll = ctrl.checkSelectAll();
        };

        ctrl.checkSelectAll = function () {
            var unchecked = _.find(ctrl.filters, {checked: false});
            return _.isNullOrUndefined(unchecked);
        };

        ctrl.toggleSelectAll = function () {
            ctrl.filters.forEach(function (filter) {
                filter.checked = ctrl.selectAll;
            });
        };

        //isSelected comes from the child component
        ctrl.selectionChange = function (filter, isSelected) {
            filter.checked = isSelected;
        };

        ctrl.applyFilter = function () {
            ctrl.onApply({values: ctrl.filters});
        };

        ctrl.clearFilter = function () {
            ctrl.onClear();
        };

        ctrl.cancel = function () {
            ctrl.onCancel();
        };
    });
