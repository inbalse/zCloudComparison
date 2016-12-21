/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('dateFilter', {
        template: '<div class="slick-header-menu slick-header-menu-date">\
                            <button class="btn btn-link btn-slick-clear" type="button" ng-click="$ctrl.clearFilter()">Clear</button>\
                            <div class="slick-header-menu-filter">\
                                <input type="daterange" ng-model="$ctrl.selectionModel" readonly start-date="$ctrl.selectionModel.startDate" end-date="$ctrl.selectionModel.endDate"\
                                ranges="$ctrl.rangeList" format="DD/MM/YYYY" class="pull-right btn btn-link">\
                            </div>\
                            <div class="slick-header-menu-buttons btn-group">\
                                <button class="btn btn-default btn-slick-ok" type="button" ng-click="$ctrl.applyFilter()">Apply</button>\
                                <button class="btn btn-link btn-slick-cancel" type="button" ng-click="$ctrl.cancel()">Cancel</button>\
                            </div>\
                      </div>',
        bindings: {
            rangeList: '<',
            dateValues: '<',
            onApply: '&',
            onClear: '&',
            onCancel: '&'
        },
        controller: function () {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.selectionModel = ctrl.dateValues;
            };

            ctrl.applyFilter = function () {
                if (!_.isNullOrUndefined(ctrl.selectionModel)) {
                    ctrl.selectionModel.startDate = moment(ctrl.selectionModel.startDate);
                    ctrl.selectionModel.endDate = moment(ctrl.selectionModel.endDate);
                }
                ctrl.onApply({values: ctrl.selectionModel});
            };

            ctrl.clearFilter = function () {
                ctrl.onClear();
            };

            ctrl.cancel = function () {
                ctrl.onCancel();
            };
        }
    });
