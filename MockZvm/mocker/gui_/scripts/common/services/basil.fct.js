'use strict';

angular.module('zvmApp.services')
    .factory('basil', function () {
        var basil = new window.Basil(
            {
                namespace: 'zerto-persistence'
            }
        );

        basil.setJson = function (name, value) {
            basil.set(name, angular.toJson(value));
        };

        basil.getJson = function (name) {
            var value = basil.get(name);
            return value ? angular.fromJson(value) : value;
        };

        return basil;
    });