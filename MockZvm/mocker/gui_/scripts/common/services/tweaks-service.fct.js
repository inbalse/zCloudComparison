'use strict';
angular.module('zvmApp.services')
    .factory('tweaksService', function ($http, zertoLoggerServiceFactory) {
        var tweaksService = {};

        tweaksService.loadTweaks = function () {
            $http.get('tweaks.json').then(function (response) { //on success
                tweaksService.tweaks = response.data;
            }, function (error) {      //failed
                tweaksService.tweaks = {};
                zertoLoggerServiceFactory.logError('loadTweaks', null, error);
            }, null);
        };

        tweaksService.getTweak = function (key, defaultValue) {
            if (tweaksService.tweaks === undefined || !tweaksService.tweaks.hasOwnProperty(key)) {
                return defaultValue;
            }
            return tweaksService.tweaks[key];
        };

        tweaksService.setTweak = function (key, value) {
            tweaksService.tweaks[key] = value;
        };

        //tweaksService.getTweakOnceLoaded = function (key, defaultValue) {
        //    var deferred = $q.defer();
        //
        //    if (angular.isUndefined(tweaksService.tweaks)) {
        //        $http.get('tweaks.json').then(function (response) { //on success
        //            tweaksService.tweaks = response.data;
        //            deferred.resolve(tweaksService.tweaks[key] || defaultValue);
        //        }, function () {      //failed
        //            zlog.log('ERROR: Loading tweaks file failed');
        //            deferred.resolve(defaultValue);
        //        }, null);
        //    } else {
        //        deferred.resolve(tweaksService.tweaks[key] || defaultValue);
        //    }
        //
        //    return deferred.promise;
        //};

        return tweaksService;
    });
