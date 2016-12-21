'use strict';

angular.module('zvmApp.services')
    .service('zFocusService', function ($state, $window) {
        var zFocusService = this;
        var onFocusCallbacks = [];
        var onBlurCallbacks = [];

        $($window).on('zerto::focus', function () {

            runCallbacks(onFocusCallbacks);
        });

        $($window).on('zerto::blur', function () {
            runCallbacks(onBlurCallbacks);
        });

        zFocusService.subscribe = {
            onFocus: function (callback) {
                onFocusCallbacks.push(callback);
            },
            onBlur: function (callback) {
                onBlurCallbacks.push(callback);
            }
        };


        function runCallbacks(callbacks) {
            _.forEach(callbacks, function (callback) {
                if (preventCallback()) {
                    return;
                }

                callback();
            });
        }

        function preventCallback() {
            return $state.current.name === '' || $state.current.name === 'loading' || $state.current.name === 'login' || $state.current.name === 'license';
        }

        return zFocusService;
    });

