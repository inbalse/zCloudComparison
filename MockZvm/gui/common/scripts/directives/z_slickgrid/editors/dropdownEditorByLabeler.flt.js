'use strict';
/* jshint ignore:start */
angular.module('zvmApp.filters')
    .filter('dropdownEditorByLabeler', function (editorsTemplateFactory) {
        /**
         * if labeler is undefined, we use 'DisplayName' as a field
         * if labeler is a string, we use it as a field
         * if labeler is a function, we use it on the item to get the string
         * if dropdownValues is a function we use dropdownValues() to get values
         */
        return function (dropdownValues, labeler, altTemplatingFunc) {

            var getString = function (item) {
                return labeler ? eval('item.' + labeler) : item.DisplayName;
            };

            if (angular.isFunction(labeler)) {
                getString = labeler;
            }

            return function (args) {
                var $template, $select, $loader;
                var scope = this;

                this.init = function () {
                    $template = $(editorsTemplateFactory.getTemplate('dropdown'));
                    $loader = $('<div/>', {'class': 'z-editor-loading'});
                    $select = $('select', $template);

                    if (altTemplatingFunc && angular.isFunction(altTemplatingFunc)) {
                        $loader.appendTo($template);
                        altTemplatingFunc(args).then(function (result) {
                            $loader.remove();
                            $select.append(result);
                            scope.loadValue(args.item);
                            scope.serializeValue();
                        });

                    } else {
                        if (angular.isFunction(dropdownValues)) {
                            dropdownValues = dropdownValues();
                        }

                        _.each(dropdownValues, function (value) {
                            var val = JSON.stringify(value);
                            $select.append('<option value=\'' + val + '\'>' + getString(value) + '</option>');
                        });
                    }


                    $('body').on('click', this.handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });
                    $template.appendTo(args.container);
                    $select.focus();
                    $select.on('change', this.save);
                };

                this.handleClickOutside = function (e) {
                    if (e.target.className !== args.container.className) {
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
                    $select.focus();
                };

                this.loadValue = function (item) {

                    var value = item[args.column.field];


                    if (value && value.hasOwnProperty('value')) {
                        value = value.value;
                    }

                    var val = value ? JSON.stringify(value) : null;
                    if (val) {
                        $select.val(val);
                    } else {
                        $select.val('');
                    }

                    $select.select();
                };

                this.serializeValue = function () {
                    var val = $select.val();
                    if (val) {
                        return JSON.parse(val);
                    }

                    return val;
                };

                this.applyValue = function (item, state) {

                    var val = item[args.column.field];
                    if (val && val.hasOwnProperty('value')) {
                        val.value = state;
                    }
                    item[args.column.field] = state;
                };

                this.isValueChanged = function () {
                    return true;
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
    }
)
;
/* jshint ignore:end */
