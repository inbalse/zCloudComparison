/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('backupStatusFormatter', {
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
            value: '<',
            onSelectionChange: '&'
        },
        controller: function ($translate) {
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.selectionModel = ctrl.checked;

                if (_.isEmpty(ctrl.value)) {
                    ctrl.display = $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE');
                    return;
                }

                ctrl.display = ctrl.value;
            };

            //This is for select all
            ctrl.$onChanges = function () {
                ctrl.selectionModel = ctrl.checked;
            };

            ctrl.onToggle = function (val) {
                ctrl.onSelectionChange({isSelected: val});
            };

        }
    });
