/**
 * Created by guy.golan on 6/13/2016.
 */
'use strict';
angular.module('zvmApp.components')
    .component('classGroupListFormatter', {
        template: '<div class="slick-header-menu slick-header-menu-multiselect">\
                        <button class="btn btn-link btn-slick-clear" type="button" ng-click="$ctrl.clearFilter()">Clear</button>\
                        <div class="slick-header-menu-filter">\
                            <label class="z-checkbox select-all-span">\
                                <input style="display:none;" type="checkbox" ng-model="$ctrl.selectAll" ng-change="$ctrl.toggleSelectAll()"/>\
                                <span class="z-checkbox-container"></span>\
                                (Select All)\
                            </label>\
                            <class-group-formatter ng-repeat="filter in ::$ctrl.filterValues" class="cards-filter-class-group-item" \
                                             checked="filter.checked" value="filter.value" formatter-class="filter.formatterClass"\
                                             on-selection-change="$ctrl.selectionChange(filter,isSelected)"></class-group-formatter>\
                        </div>\
                        <div class="slick-header-menu-buttons btn-group">\
                            <button class="btn btn-default btn-slick-ok" type="button" ng-click="$ctrl.applyFilter()">Apply</button>\
                            <button class="btn btn-link btn-slick-cancel" type="button" ng-click="$ctrl.cancel()">Cancel</button>\
                        </div>\
                    </div>',
        bindings: {
            filterValues: '<',
            onApply: '&',
            onClear: '&',
            onCancel: '&'
        },
        controller: 'multiSelectListController'
    });
