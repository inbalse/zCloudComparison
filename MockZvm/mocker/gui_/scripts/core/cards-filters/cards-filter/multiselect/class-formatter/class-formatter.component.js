/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('classFormatter', {
        template: '<label class="z-checkbox">\
                        <input style="display:none;" class="cards-filter-multi-select-input" \
                          type="checkbox" ng-model="$ctrl.selectionModel" \
                          ng-change="$ctrl.onToggle($ctrl.selectionModel)"/>\
                        <span class="z-checkbox-container"></span>\
                         <span class="slick-grid-header-formatter slick-grid-multi-select-options-ellipsis">\
                               <div ng-class="::$ctrl.classNameState"></div>\
                         </span>\
                    </label>',
        bindings: {
            checked: '<',
            value: '<',
            formatterClass: '<',
            onSelectionChange: '&'
        },
        controller: function () {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.selectionModel = ctrl.checked;
                ctrl.classNameState = ctrl.formatterClass + ' ' + ctrl.formatterClass + '-' + ctrl.value;
            };

            ctrl.$onChanges = function () {
                ctrl.selectionModel = ctrl.checked;
            };

            ctrl.onToggle = function (val) {
                ctrl.onSelectionChange({isSelected: val});
            };
        }
    });
