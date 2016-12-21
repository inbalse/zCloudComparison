/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('rangeMbGbFilter', {
        template: '<div class="slick-header-menu slick-header-menu-range">\
                            <button class="btn btn-link btn-slick-clear" type="button" ng-click="$ctrl.clearFilter()">Clear</button>\
                            <form name="rangeForm">\
                            <div class="slick-header-menu-filter">\
                                <div class="filter-row">\
                                    <input id="filter-range-size-mb" class="z-radio" type="radio"  name="range_multiplier" ng-model="$ctrl.rangeMultiplier" value="1"/>\
                                    <label for="filter-range-size-mb">MB</label>\
                                        <input id="filter-range-size-gb" class="z-radio" type="radio" name="range_multiplier" ng-model="$ctrl.rangeMultiplier" value="1024"/>\
                                    <label for="filter-range-size-gb">GB</label>\
                                </div>\
                                <div class="filter-row">\
                                    <label class="filter-label" for="filter-range-size-from">from</label>\
                                    <div class="filter-input">\
                                        <input id="filter-range-size-from" type="number" min="0" ng-model="$ctrl.rangeModel.from" ng-change="$ctrl.handleFromValueChange()" z-focus required />\
                                    </div>\
                                </div>\
                                <div class="filter-row">\
                                    <label class="filter-label" for="filter-range-size-to">to</label>\
                                    <div class="filter-input">\
                                        <input id="filter-range-size-to" type="number" min="{{$ctrl.rangeModel.from}}" ng-model="$ctrl.rangeModel.to" required/>\
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
            rangeTypeMultiplier: '<',
            onApply: '&',
            onClear: '&',
            onCancel: '&'
        },
        controller: function () {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.rangeModel = ctrl.rangeValues || {};
                ctrl.rangeMultiplier = ctrl.rangeTypeMultiplier;
                ctrl.rangeModel.from = !_.isNullOrUndefined(ctrl.rangeModel.from) ? parseFloat(ctrl.rangeModel.from) : null;
                ctrl.rangeModel.to = !_.isNullOrUndefined(ctrl.rangeModel.to) ? parseFloat(ctrl.rangeModel.to) : null;
            };

            ctrl.applyFilter = function () {
                ctrl.rangeModel.from = ctrl.rangeModel.from.toString();
                ctrl.rangeModel.to = ctrl.rangeModel.to.toString();
                ctrl.onApply({values: {range: ctrl.rangeModel, multiplier: ctrl.rangeMultiplier}});
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
