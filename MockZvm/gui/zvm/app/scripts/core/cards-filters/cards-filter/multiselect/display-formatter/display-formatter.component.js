/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('displayFormatter', {
        template: '<label class="z-checkbox">\
                        <input style="display:none;" class="cards-filter-multi-select-input" \
                          type="checkbox" ng-model="$ctrl.selectionModel" \
                          ng-change="$ctrl.onToggle($ctrl.selectionModel)"/>\
                        <span class="z-checkbox-container"></span>\
                         <span class="slick-grid-header-formatter slick-grid-multi-select-options-ellipsis">\
                               {{$ctrl.display}}\
                         </span>\
                    </label>',
        bindings: {
            checked: '<',
            display: '<',
            onSelectionChange: '&'
        },
        controller: function () {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.selectionModel = ctrl.checked;
            };

            ctrl.$onChanges = function () {
                ctrl.selectionModel = ctrl.checked;
            };
            ctrl.onToggle = function (val) {
                ctrl.onSelectionChange({isSelected: val});
            };
        }

    });
