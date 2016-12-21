'use strict';

angular.module('zvmApp.services')
    .service('zBrowser', function($window) {
        var cached;

        var getBrowser = function getBrowser(){
            var userAgent = $window.navigator.userAgent;

            var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

            for(var key in browsers) {
                if (browsers[key].test(userAgent)) {
                    return key;
                }
            }

            return 'unknown';
        };

    return function() {
        if (!cached){
            cached = getBrowser();
        }

        return cached;
    };
});
