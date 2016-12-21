'use strict';

angular.module('zvmApp.core')
    .directive('defaultQuery', function (defaultQueryService) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'scripts/core/vpgs/default_query/default-query.html',
            link: function (scope) {
                scope.checkPersonalQuery = function () {
                    scope.personalQueryMissing = defaultQueryService.isPersonalQueryMissing();
                };

                scope.runDefaultQuery = function () {
                    defaultQueryService.runDefaultQuery();
                };

                scope.runPersonalQuery = function () {
                    defaultQueryService.runPersonalQuery();
                };

                scope.saveCurrentQuery = function () {
                    defaultQueryService.saveCurrentQuery();
                };
            }
        };
    });
