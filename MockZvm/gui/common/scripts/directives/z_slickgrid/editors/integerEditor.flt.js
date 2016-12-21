'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('integerEditor', function () {
        return function (args) {
            var $input;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-text' />");

                $input.bind("keydown.nav", function (e) {
                    if (e.keyCode === 37 || e.keyCode === 39) {
                        e.stopImmediatePropagation();
                    }
                });

                $input.appendTo(args.container);
                $input.focus().select();
            };

            this.destroy = function () {
                $input.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {
                defaultValue = item[args.column.field];
                $input.val(defaultValue);
                $input[0].defaultValue = defaultValue;
                $input.select();
            };

            this.serializeValue = function () {
                return parseInt($input.val(), 10) || 0;
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                if (isNaN($input.val())) {
                    return {
                        valid: false,
                        msg: "Please enter a valid integer"
                    };
                }

                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        };
    });
/* jshint ignore:end */