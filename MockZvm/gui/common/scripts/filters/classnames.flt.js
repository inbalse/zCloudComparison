'use strict';

angular.module('zvmApp.filters')
    .filter('classNamesFormatter', function () {
        var hasOwn = {}.hasOwnProperty;


        return function (args) {
            return classNames(args);
        };


        function classNames() {
            var classes = [];

            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (!arg) {
                    continue;
                }

                var argType = typeof arg;

                if (argType === 'string' || argType === 'number') {
                    classes.push(arg);
                } else if (Array.isArray(arg)) {
                    classes.push(classNames.apply(null, arg));
                } else if (argType === 'object') {
                    for (var key in arg) {
                        if (hasOwn.call(arg, key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                }
            }
            return classes.join(' ');
        }
    });