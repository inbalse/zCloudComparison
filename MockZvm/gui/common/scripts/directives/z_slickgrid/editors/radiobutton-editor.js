'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('radioClickEditor', function ($rootScope) {
        return function (propertyName) {
            var changedValue;

            return function (args) {
                var isDirty = false;
                this.init = function () {
                    changedValue = args.item[propertyName];
                    //TODO - candidate for refactoring
                    $('body').on('click', function (e) {
                        e.stopImmediatePropagation();
                        if(changedValue === false) {
                            isDirty = true;
                            args.item[propertyName] = true;
                        }
                        $('body').off('click');
                        args.commitChanges();
                        if (!$rootScope.$$phase) {
                            $rootScope.$digest();
                        }
                    });

                };

                this.loadValue = function (item) {
                };

                this.serializeValue = function () {
                    return args.item[propertyName];
                };

                this.applyValue = function (item, state) {
                    args.item[propertyName] = state;
                };

                this.isValueChanged = function () {
                    return isDirty;
                };

                this.destroy = function () {
                    $('body').off('click');
                };

                this.validate = function () {
                    return {
                        valid: true,
                        msg: ''
                    };
                };

                this.init();
            };
        };
    });
