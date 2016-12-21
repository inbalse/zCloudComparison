'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('yesNoSelectEditorByProperty', function (editorsTemplateFactory) {
        return function (propertyName) {
            return function (args) {
                var $select;
                var defaultValue;
                var scope = this;

                this.init = function () {
                    var $template = $(editorsTemplateFactory.getTemplate('yesNo'));
                    $template.appendTo(args.container);
                    $select = $('select', $template);
                    $select.focus();
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
                    $select.remove();
                };

                this.focus = function () {
                    $select.focus();
                };

                this.loadValue = function (item) {
                    $select.val((defaultValue = item[args.column.field][propertyName]) ? 'true' : 'false');
                    $select.select();
                };

                this.serializeValue = function () {
                    return ($select.val() == 'true');
                };

                this.applyValue = function (item, state) {
                    item[args.column.field][propertyName] = state;
                };

                this.isValueChanged = function () {
                    return ($select.val().toString() != defaultValue);
                };

                this.validate = function () {
                    return {
                        valid: true,
                        msg: null
                    };
                };

                this.init();
            };
        }
    });
/* jshint ignore:end */
