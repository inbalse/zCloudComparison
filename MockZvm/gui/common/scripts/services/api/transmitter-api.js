'use strict';
angular.module('zvmApp.services')
    .constant('transmitterApiConstants', {
        ENABLE: 'enable',
        DISABLE: 'disable',
        IS_ENABLED: 'isEnabled',
        IS_VISIBLE: 'isVisible'
    })
    .service('transmitterApiService', function ($q, zertoApi, tweaksService, transmitterApiConstants) {
        var transmitterApi = this,
            restPrefix = tweaksService.getTweak('t_transmitterPath', null);

        transmitterApi.isEnabled = function () {
            return zertoApi.makeRequestWrapper('GET', restPrefix + transmitterApiConstants.IS_ENABLED);
        };

        transmitterApi.isVisible = function () {
            return zertoApi.makeRequestWrapper('GET', restPrefix + transmitterApiConstants.IS_VISIBLE);
        };

        transmitterApi.enable = function () {
            return zertoApi.makeRequestWrapper('POST', restPrefix + transmitterApiConstants.ENABLE);
        };

        transmitterApi.disable = function () {
            return zertoApi.makeRequestWrapper('POST', restPrefix + transmitterApiConstants.DISABLE);
        };

        transmitterApi.getInitialState = function () {
            return $q.all([transmitterApi.isVisible(), transmitterApi.isEnabled()]).then(function (result) {
                return {
                    isVisible: result[0],
                    isEnabled: result[1]
                };
            });
        }

    });