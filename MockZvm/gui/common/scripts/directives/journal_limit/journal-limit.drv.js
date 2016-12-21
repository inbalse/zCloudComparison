'use strict';

angular.module('zvmApp.directives')
    .directive('journalLimit', function (enums, $translate) {
        return{
            restrict: 'E',
            scope: {
                value: '=',
                isSlaCustom: '=?'
            },
            link: function (scope) {
              if (!angular.isDefined(scope.isSlaCustom)){
                scope.isSlaCustom = true;
              }
                //===========================================================================
                // Validators
                //===========================================================================

                //===========================================================================
                // Custom Directive bihaviour
                //===========================================================================
                scope.settings = {min: 0, max: 0};

                scope.settings.dataProvider = [
                    {type: enums.JournalLimitType.Unlimited, label: $translate.instant('JOURNAL_LIMIT_DIRECTIVE.UNLIMITED_LABEL')},
                    {type: enums.JournalLimitType.Megabytes, label: $translate.instant('JOURNAL_LIMIT_DIRECTIVE.GB_LABEL')},
                    {type: enums.JournalLimitType.Percentage, label: $translate.instant('JOURNAL_LIMIT_DIRECTIVE.PERCENTAGE_LABEL')}
                ];

                scope.$watch('value.Type', function (value, oldValue) {
                    if (!value) {
                        return;
                    }

                    var maxValue = Number.MAX_VALUE + 9.979202e291;
                    if (parseInt(scope.value.Type) === parseInt(enums.JournalLimitType.Megabytes)) {
                        scope.settings.sign = 'GB';
                        scope.settings.max = maxValue;
                        scope.settings.min = 10;
                    } else if (parseInt(scope.value.Type) === parseInt(enums.JournalLimitType.Percentage)) {
                        maxValue = 100;
                        scope.settings.sign = '%';
                        scope.settings.max = maxValue;
                        scope.settings.min = 1;
                    }

                    if (value !== oldValue){
                        scope.value.Limit = scope.settings.min;
                    }


                });
            },
            templateUrl: 'scripts/common/directives/journal_limit/journal-limit.html'
        };
    });
