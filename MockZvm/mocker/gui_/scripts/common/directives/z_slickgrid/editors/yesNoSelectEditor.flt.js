'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('yesNoSelectEditor', function (editorsTemplateFactory) {
        return function (args) {
            var $select;
            var defaultValue;


            this.init = function () {
                var $template = $(editorsTemplateFactory.getTemplate('yesNo'));
                $template.appendTo(args.container);
                $select = $('select', $template);
                $select.focus();
            };

            this.destroy = function () {
                $select.remove();
            };

            this.focus = function () {
                $select.focus();
            };

            this.loadValue = function (item) {
                $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
                $select.select();
            };

            this.serializeValue = function () {
                return ($select.val() == "yes");
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return ($select.val() != defaultValue);
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