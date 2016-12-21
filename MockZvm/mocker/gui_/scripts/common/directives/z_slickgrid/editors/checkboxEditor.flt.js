'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('checkboxEditor', function (editorsTemplateFactory) {
        return function (args) {
            var $template, $input;
            var defaultValue;
            var scope = this;

            this.init = function () {
                $template = $(editorsTemplateFactory.getTemplate('checkbox'));
                $template.appendTo(args.container);

                $input = $('input', $template);
                $input.focus();

                $('body').on('click', this.handleClickOutside);
                $template.on('click', function (e) {
                    e.stopPropagation();
                });
            };

            this.handleClickOutside = function (e) {
                if (e.target.className !== args.container.className)
                {
                    scope.save();
                }
            };

            this.cancel = function () {
                args.cancelChanges();
            };

            this.save = function () {
                args.commitChanges();
            };

            this.destroy = function () {
                $('body').off('click', this.handleClickOutside);
                $template.remove();
            };

            this.focus = function () {
                $input.focus();
            };

            this.loadValue = function (item) {
                defaultValue = !!item[args.column.field];
                if (defaultValue) {
                    $input.prop('checked', true);
                } else {
                    $input.prop('checked', false);
                }
            };

            this.serializeValue = function () {
                return $input.prop('checked');
            };

            this.applyValue = function (item, state) {
                item[args.column.field] = state;
            };

            this.isValueChanged = function () {
                return (this.serializeValue() !== defaultValue);
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
