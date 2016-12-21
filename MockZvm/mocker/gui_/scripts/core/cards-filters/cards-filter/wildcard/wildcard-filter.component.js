/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('wildcardFilter', {
            template: '<div class="slick-header-menu slick-header-menu-wildcard">\
                            <button class="btn btn-link btn-slick-clear" type="button" ng-click="$ctrl.clearFilter()">Clear</button>\
                            <div class="slick-header-menu-filter">\
                                <input type="text" ng-model="$ctrl.values" z-focus/>\
                            </div>\
                            <div class="slick-header-menu-buttons btn-group">\
                                <button class="btn btn-default btn-slick-ok" type="button" ng-click="$ctrl.applyFilter()">Apply</button>\
                                <button class="btn btn-link btn-slick-cancel" type="button" ng-click="$ctrl.cancel()">Cancel</button>\
                            </div>\
                      </div>',
            bindings: {
                wildcardValues: '<',
                onApply: '&',
                onClear: '&',
                onCancel: '&'
            },
            controller: function () {
                var ctrl = this;

                ctrl.$onInit = function () {
                    ctrl.values = ctrl.wildcardValues;
                };

                ctrl.applyFilter = function () {
                    ctrl.onApply({values: ctrl.values});
                };

                ctrl.clearFilter = function () {
                    ctrl.onClear();
                };

                ctrl.cancel = function () {
                    ctrl.onCancel();
                };
            }
        });
