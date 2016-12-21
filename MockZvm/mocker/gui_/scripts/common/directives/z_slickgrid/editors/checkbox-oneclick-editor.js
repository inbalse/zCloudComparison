'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('checkboxOneClickEditor', function ($rootScope) {
        return function (propertyName, objectName) {
            return function (args) {

                this.init = function () {
                    
                    var changedValue;
                    if (objectName) {
                        changedValue = args.item[objectName][propertyName];
                    } else {
                        changedValue = args.item[propertyName];
                    }


                    $('body').on('click', function (e) {
                        e.stopImmediatePropagation();
                        if (objectName) {
                            args.item[objectName][propertyName] = !changedValue;
                        } else {
                            args.item[propertyName] = !changedValue;
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
                    if (objectName) {
                        return args.item[objectName][propertyName];
                    } else {
                        return args.item[propertyName];
                    }

                };

                this.applyValue = function (item, state) {
                    if (objectName) {
                        args.item[objectName][propertyName] = state;
                    } else {
                        args.item[propertyName] = state;
                    }

                };

                this.isValueChanged = function () {
                    return true;
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
