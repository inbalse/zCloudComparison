//'use strict';
///* jshint ignore:start */
//angular.module('zvmApp.filters')
//    .filter('dropdownEditorByProperty', function (editorsTemplateFactory) {
//        return function (propertyName, dropdownValues, altTemplatingFunc) {
//            return function (args) {
//                var $template, $select, defaultValue;
//                var scope = this;
//
//                this.init = function () {
//                    $template = $(editorsTemplateFactory.getTemplate('dropdown'));
//
//                    $select = $('select', $template);
//
//                    if (altTemplatingFunc && angular.isFunction(altTemplatingFunc)) {
//                        $select.append(altTemplatingFunc(args));
//                    } else {
//                        _.each(dropdownValues, function (item) {
//                            $select.append('<option value=\'' + item.value + '\'>' + item.display + '</option>')
//                        });
//                    }
//
//                    $('body').on('click', this.handleClickOutside);
//
//                    $template.on('click', function (e) {
//                        e.stopPropagation();
//                    });
//                    $template.appendTo(args.container);
//                    $select.focus();
//                    $select.on('change', this.save);
//                };
//
//                this.handleClickOutside = function (e) {
//                    if (e.target.className !== args.container.className) {
//                        scope.save();
//                    }
//                };
//
//                this.cancel = function () {
//                    args.cancelChanges();
//                };
//
//                this.save = function () {
//                    args.commitChanges();
//                };
//
//                this.destroy = function () {
//                    $('body').off('click', this.handleClickOutside);
//                    $template.remove();
//                };
//
//                this.focus = function () {
//                    $select.focus();
//                };
//
//                this.loadValue = function (item) {
//                    $select.val(defaultValue = item[args.column.field][propertyName]);
//                    $select.select();
//                };
//
//                this.serializeValue = function () {
//                    return $select.val();
//                };
//
//                this.applyValue = function (item, state) {
//                    item[args.column.field][propertyName] = state;
//                };
//
//                this.isValueChanged = function () {
//                    return ($select.val() != defaultValue);
//                };
//
//                this.validate = function () {
//                    return {
//                        valid: true,
//                        msg: null
//                    };
//                };
//
//                this.init();
//            };
//        }
//    });
///* jshint ignore:end */
