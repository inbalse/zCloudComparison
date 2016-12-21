'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('longTextEditor', function () {
        return function (args) {
            var $input, $wrapper;
            var defaultValue;
            var scope = this;

            this.init = function () {
                var $container = $("body");

                $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
                    .appendTo($container);

                $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
                    .appendTo($wrapper);

                $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
                    .appendTo($wrapper);

                $('body').on('click', this.handleClickOutside);
                $wrapper.on('click', function (e) {
                    e.stopPropagation();
                });
                $wrapper.find("button:first").bind("click", this.save);
                $wrapper.find("button:last").bind("click", this.cancel);
                $input.bind("keydown", this.handleKeyDown);

                scope.position(args.position);
                $input.focus().select();
            };

            this.handleKeyDown = function (e) {
                if (e.which == 13 && e.ctrlKey) {
                    scope.save();
                } else if (e.which == 27) {
                    e.preventDefault();
                    scope.cancel();
                } else if (e.which == 9 && e.shiftKey) {
                    e.preventDefault();
                    args.grid.navigatePrev();
                } else if (e.which == 9) {
                    e.preventDefault();
                    args.grid.navigateNext();
                }
            };

            this.handleClickOutside = function (e) {
                if (e.target.className !== args.container.className)
                {
                    scope.save();
                }
            };

            this.save = function (e) {
                args.commitChanges();
            };

            this.cancel = function () {
                $input.val(defaultValue);
                args.cancelChanges();
            };

            this.hide = function () {
                $wrapper.hide();
            };

            this.show = function () {
                $wrapper.show();
            };

            this.position = function (position) {
                $wrapper
                    .css("top", position.top - 5)
                    .css("left", position.left - 5)
            };

            this.destroy = function () {
                $('body').off('click', this.handleClickOutside);
                $wrapper.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {
                $input.val(defaultValue = item[args.column.field]);
                $input.select();
            };

            this.serializeValue = function () {
                //$("body").one("click", '', this.save);
                return $input.val();
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
            };

            this.validate = function () {
                return {
                    valid: true,
                    msg: null
                };
            };

            this.init();
        };
    });
/* jshint ignore:end */
