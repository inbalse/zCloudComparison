'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('textEditor', function (editorsTemplateFactory) {
        return  function (args) {
            var $template, $input, defaultValue;
            var scope = this;

            this.init = function () {
                $template = $(editorsTemplateFactory.getTemplate('text'));
                $input = $('input', $template);
                $input
                    .bind("keydown.nav", function (e) {
                        if (e.keyCode === 37 || e.keyCode === 39) {
                            e.stopImmediatePropagation();
                        }
                    })
                    .focus()
                    .select();
                $('body').on('click', this.handleClickOutside);
                $template.on('click', function (e) {
                    e.stopPropagation();
                });
                $template.appendTo(args.container);
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

            this.getValue = function () {
                return $input.val();
            };

            this.setValue = function (val) {
                $input.val(val);
            };

            this.loadValue = function (item) {
                defaultValue = item[args.column.field] || "";
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
                if (args.column.validator) {
                    var validationResults = args.column.validator($input.val());
                    if (!validationResults.valid) {
                        return validationResults;
                    }
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
