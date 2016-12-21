/**
 * Created by guy.golan on 7/12/2016.
 */
'use strict';
angular.module('zvmApp.models')
    .factory('transmitterSettingsModel', function ($q, transmitterApiService) {
        var transmitterSettingsModel = {},
            transmitterState,
            transmitterNewState;

        transmitterSettingsModel.loadState = function () {
            return transmitterApiService.getInitialState().then(function (result) {
                transmitterState = result;
                return result;
            });
        };

        transmitterSettingsModel.setState = function (state) {
            transmitterNewState = state;
        };

        transmitterSettingsModel.save = function () {
            if (_.isEqual(transmitterState, transmitterNewState)) {
                return $q.resolve();
            }

            transmitterState = transmitterNewState;
            return transmitterNewState ? transmitterApiService.enable() : transmitterApiService.disable();
        };

        return transmitterSettingsModel;
    });
