'use strict';

angular.module('zvmApp.directives')
    .factory('zAlertFactory', function ($uibModal) {
        var zAlertFactory = {private: {}};

        zAlertFactory.windowClasses = {
            INFO: 'z-alert-info',
            HELP: 'z-alert-help',
            SUCCESS: 'z-alert-success',
            FAIL: 'z-alert-fail',
            WARN: 'z-alert-warn'
        };

        zAlertFactory.buttons = {
            OK: 'MODAL.OK', CANCEL: 'MODAL.CANCEL', REFRESH: 'MODAL.REFRESH', RETRY: 'MODAL.RETRY',
            CLOSE: 'MODAL.CLOSE', YES: 'MODAL.YES', NO: 'MODAL.NO', NEXT: 'MODAL.NEXT',
            ABORT: 'MODAL.ABORT', APPLY: 'MODAL.APPLY', DELETE: 'MODAL.DELETE', CONTINUE: 'MODAL.CONTINUE', SITE_LIST: 'MODAL.SITE_LIST'
        };

        /**
         *
         * @param title
         * @param description
         * @param callback
         * @returns {*}
         */
        zAlertFactory.success = function (title, description, callback, buttons) {
            var btns = [zAlertFactory.buttons.OK];
            if (!angular.isUndefined(buttons)) {
                btns = buttons;
            }
            return zAlertFactory.private.alert({
                title: title,
                description: description,
                windowClass: zAlertFactory.windowClasses.SUCCESS,
                buttons: btns,
                callback: callback,
                backdrop: 'static'
            });
        };
        /**
         *
         * @param title
         * @param description
         * @param callback
         * @returns {*}
         */
        zAlertFactory.fail = function (title, description, callback, buttons) {
            if (angular.isUndefined(title)) {
                title = 'Error';
            }
            var btns = [zAlertFactory.buttons.CLOSE];
            if (!angular.isUndefined(buttons)) {
                btns = buttons;
            }
            return zAlertFactory.private.alert({
                title: title,
                description: description,
                windowClass: zAlertFactory.windowClasses.FAIL,
                buttons: btns,
                callback: callback,
                backdrop: 'static'
            });
        };
        /**
         *
         * @param title
         * @param description
         * @param callback
         * @returns {*}
         */
        zAlertFactory.info = function (title, description, callback, buttons) {
            var btns = [zAlertFactory.buttons.CLOSE];
            if (!angular.isUndefined(buttons)) {
                btns = buttons;
            }
            return zAlertFactory.private.alert({
                title: title,
                description: description,
                windowClass: zAlertFactory.windowClasses.INFO,
                buttons: btns,
                callback: callback,
                backdrop: 'static'
            });
        };
        /**
         *
         * @param title
         * @param description
         * @param callback
         * @returns {*}
         */
        zAlertFactory.help = function (title, description, callback, buttons) {
            var btns = [zAlertFactory.buttons.CLOSE];
            if (!angular.isUndefined(buttons)) {
                btns = buttons;
            }
            return zAlertFactory.private.alert({
                title: title,
                description: description,
                windowClass: zAlertFactory.windowClasses.HELP,
                buttons: btns,
                callback: callback,
                backdrop: 'static'
            });
        };
        /**
         *
         * @param title
         * @param description
         * @param callback
         * @returns {*}
         */
        zAlertFactory.warn = function (title, description, callback, buttons) {
            var btns = [zAlertFactory.buttons.CANCEL, zAlertFactory.buttons.OK];
            if (!angular.isUndefined(buttons)) {
                btns = buttons;
            }
            return zAlertFactory.private.alert({
                title: title,
                description: description,
                windowClass: zAlertFactory.windowClasses.WARN,
                buttons: btns,
                callback: callback,
                backdrop: 'static'
            });
        };

        /**
         *
         * @param title
         * @param description
         * @param callback
         * @returns {*}
         */
        zAlertFactory.warnCheck = function (title, description, callback, checkBoxText, buttons, checkboxState) {
            var btns = [zAlertFactory.buttons.CANCEL, zAlertFactory.buttons.OK];
            if (!angular.isUndefined(buttons)) {
                btns = buttons;
            }
            return zAlertFactory.private.alert({
                title: title,
                description: description,
                windowClass: zAlertFactory.windowClasses.WARN,
                buttons: btns,
                callback: callback,
                backdrop: 'static',
                alternateTemplate: 'scripts/common/directives/z_alert/z-alert-checkbox.html',
                checkboxText: checkBoxText,
                checkboxState: checkboxState
            });
        };

        zAlertFactory.private.alert = function (params) {
            if (angular.isUndefined(params.windowClass)) {
                throw 'params.windowClass is undefined';
            }
            if (angular.isUndefined(params.buttons)) {
                throw 'params.buttons is undefined';
            }
            return $uibModal.open({
                templateUrl: angular.isUndefined(params.alternateTemplate) ? 'scripts/common/directives/z_alert/z-alert.html' : params.alternateTemplate,
                windowClass: 'z-alert ' + params.windowClass,
                controller: function ($scope, params) {
                    $scope.title = params.title;
                    $scope.description = params.description;

                    $scope.buttons = params.buttons;
                    if (angular.isDefined(params.checkboxText)) {
                        $scope.checkboxText = params.checkboxText;
                        $scope.selectCheckbox = params.checkboxState ? params.checkboxState : false;
                    }

                    $scope.handleButtonAction = function (event) {
                        if (angular.isFunction(params.callback)) {
                            if (angular.isDefined($scope.selectCheckbox)) {
                                event.selected = $scope.selectCheckbox;
                            }
                            params.callback(event);
                        }

                        $scope.$close();
                    };
                },
                backdrop: params.backdrop || false,
                resolve: {
                    params: function () {
                        return params;
                    }
                }
            });
        };

        return zAlertFactory;
    });
