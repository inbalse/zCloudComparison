'use strict';

angular.module('zvmApp.directives')
    .directive('helpIcon', function ($compile, $translate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var position = 'right';
                if (attrs.helpIconPosition) {
                    position = attrs.helpIconPosition;
                }

                var translated = $translate.instant(attrs.helpIcon);

                var compiled = $compile('<span class="help-icon" uib-tooltip="' + translated + '" tooltip-placement="' + position + '" tooltip-append-to-body="true">?</span>')(scope);

                compiled.on('click', function ($event) {
                    $event.stopPropagation();
                    element.blur();
                });

                element.append(compiled);
            }
        };
    });
