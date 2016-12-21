'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('dateEditor', function () {
        return function (args) {
            var $input;
            var defaultValue;
            var scope = this;
            var calendarOpen = false;

            this.init = function () {
                $input = $("<INPUT type=text class='editor-text' />");
                $input.appendTo(args.container);
                $input.focus().select();
                $input.datepicker({
                    showOn: "button",
                    buttonImageOnly: true,
                    buttonImage: "SlickGrid/images/calendar.gif",
                    beforeShow: function () {
                        calendarOpen = true
                    },
                    onClose: function () {
                        calendarOpen = false
                    }
                });
                $input.width($input.width() - 18);
            };

            this.destroy = function () {
                $.datepicker.dpDiv.stop(true, true);
                $input.datepicker("hide");
                $input.datepicker("destroy");
                $input.remove();
            };

            this.show = function () {
                if (calendarOpen) {
                    $.datepicker.dpDiv.stop(true, true).show();
                }
            };

            this.hide = function () {
                if (calendarOpen) {
                    $.datepicker.dpDiv.stop(true, true).hide();
                }
            };

            this.position = function (position) {
                if (!calendarOpen) {
                    return;
                }
                $.datepicker.dpDiv
                    .css("top", position.top + 30)
                    .css("left", position.left);
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