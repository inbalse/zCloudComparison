/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('rangeFilter', {
        template: '<div class="slick-header-menu slick-header-menu-range">\
                            <button class="btn btn-link btn-slick-clear" type="button" ng-click="$ctrl.clearFilter()">Clear</button>\
                            <form name="rangeForm">\
                            <div class="slick-header-menu-filter">\
                                    <div class="filter-row">\
                                            <label class="filter-label" for="filter-range-from">from</label>\
                                    <div class="filter-input">\
                                        <input id="filter-range-from" type="number" min="0" ng-model="$ctrl.rangeModel.from" ng-pattern="/^\\d+$/" ng-change="$ctrl.handleFromValueChange()" z-focus required/>\
                                    </div>\
                                    </div>\
                                    <div class="filter-row">\
                                        <label class="filter-label" for="filter-range-to">to</label>\
                                    <div class="filter-input">\
                                        <input id="filter-range-to" type="number" min="{{$ctrl.rangeModel.from}}" ng-model="$ctrl.rangeModel.to" ng-pattern="/^\\d+$/" required />\
                                    </div>\
                                    </div>\
                            </div>\
                            <div class="slick-header-menu-buttons btn-group">\
                                <button class="btn btn-default btn-slick-ok" type="button" ng-click="$ctrl.applyFilter()" ng-disabled="rangeForm.$invalid">Apply</button>\
                                <button class="btn btn-link btn-slick-cancel" type="button" ng-click="$ctrl.cancel()">Cancel</button>\
                            </div>\
                            </form>\
                      </div>',
        bindings: {
            rangeValues: '<',
            onApply: '&',
            onClear: '&',
            onCancel: '&'
        },
        controller: function () {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.rangeModel = ctrl.rangeValues || {};
                ctrl.rangeModel.from = !_.isNullOrUndefined(ctrl.rangeModel.from) ? parseInt(ctrl.rangeModel.from, 10) : null;
                ctrl.rangeModel.to = !_.isNullOrUndefined(ctrl.rangeModel.to) ? parseInt(ctrl.rangeModel.to, 10) : null;
            };

            ctrl.applyFilter = function () {
                ctrl.rangeModel.from = ctrl.rangeModel.from.toString();
                ctrl.rangeModel.to = ctrl.rangeModel.to.toString();
                ctrl.onApply({values: ctrl.rangeModel});
            };

            ctrl.clearFilter = function () {
                ctrl.onClear();
            };

            ctrl.cancel = function () {
                ctrl.onCancel();
            };

            ctrl.handleFromValueChange = function () {
                if (ctrl.rangeModel.to <= ctrl.rangeModel.from) {
                    ctrl.rangeModel.to = ctrl.rangeModel.from;
                }
            };

        }

    });
