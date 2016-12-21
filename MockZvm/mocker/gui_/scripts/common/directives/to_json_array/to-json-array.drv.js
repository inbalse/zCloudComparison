'use strict';
/**
 * This directive should be user with ui-select2 for insuring that the applyed value is an array of objects
 * and not a json string
 */
angular.module('zvmApp.directives')
    .directive('toJsonArray', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {

                ngModel.$parsers.push(function(value){
                    if(angular.isArray(value)){
                        return _.map(value, JSON.parse);
                    }
                    return angular.fromJson(value);
                });

                ngModel.$formatters.push(function(value){
                    if(angular.isDefined(value)){
                        return angular.toJson(value);
                    }
                });
            }
        };
    });

