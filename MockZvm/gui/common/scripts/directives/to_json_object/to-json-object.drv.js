'use strict';
/**
 * This directive should be user with ui-select for insuring that the applyed value is an object
 * and not a json string
 */
angular.module('zvmApp.directives')
    .directive('toJsonObject', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                //TODO: change to unshift
                ngModel.$parsers.push(function(value){
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

