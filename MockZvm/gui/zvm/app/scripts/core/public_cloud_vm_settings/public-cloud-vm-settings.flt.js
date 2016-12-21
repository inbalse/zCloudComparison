'use strict';

angular.module('zvmApp.core')
    .filter('publicCloudIpEditor', function (editorsTemplateFactory, $compile, $rootScope) {
        return function (propName, settingProp) {
            return function (args) {
                var $template, $templateHtml, $scope, loadValue;
                var that = this;
                this.init = function () {
                    $template = $(editorsTemplateFactory.getTemplate('blank'));
                    $template.addClass('z-inline-editor-ip-config');

                    $templateHtml = '<form name="IpForm">' +
                        '<label class="z-inline-ip-label">Private IP</label>' +
                        '<input id="ipField" z-ip-field ng-model="ipValue" type="text" ng-required="ipRequierd"/>' +
                        '</form>';

                    $scope = $rootScope.$new();
                    $template.append($compile($templateHtml)($scope));

                    $('body').on('click', this.handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });

                    $template.appendTo(args.container);
                };

                this.handleClickOutside = function (e) {
                    if (e.target.className !== args.container.className) {
                        that.save();
                    }
                };

                this.focus = function () {
                };

                this.cancel = function () {
                    args.cancelChanges();
                };

                this.save = function () {
                    args.commitChanges();
                    if ($scope && !$scope.$$phase) {
                        $scope.$digest();
                    }
                };

                this.destroy = function () {
                    $('body').off('click', this.handleClickOutside);
                    $template.remove();
                    if ($scope && $scope.$destroy) {
                        $scope.$destroy();
                    }
                };

                this.loadValue = function (item) {
                    loadValue = item[propName];
                    $scope.ipValue = loadValue;
                    return loadValue;
                };

                this.serializeValue = function () {
                    return loadValue;
                };

                this.applyValue = function (item) {
                    // set the view
                    item[propName] = $scope.ipValue;
                    // set the model
                    item.CloudVmSettings[settingProp].PrimaryIp = $scope.ipValue;
                };

                this.isValueChanged = function () {
                    return !_.isEqual(loadValue, $scope.ipValue);
                };

                this.validate = function () {
                    return {
                        valid: $scope.IpForm.$valid,
                        msg: ''
                    };
                };

                this.init();
            };
        };
    });
