'use strict';

angular.module('zvmApp.core')
    .filter('nicIpEditor', function (editorsTemplateFactory, zAlertFactory, $translate, createVpgNicConstants, $compile, $rootScope) {
        return function (propName) {
            return function (args) {
                var $template, $select, $inputIP, $inputSubnet, $inputGateway, $templateHtml, $scope;
                var scope = this;
                var isDirty = false;
                this.init = function () {
                    $template = $(editorsTemplateFactory.getTemplate('blank'));
                    $template.addClass('z-inline-editor-ip-config');

                    $templateHtml = '<form name="IpForm"><label class="z-inline-ip-label">' + $translate.instant('EDIT_NIC.CHANGE_IP_INLINE') + '</label>' +
                        '<select tabindex="0"><option value="' + createVpgNicConstants.IP_CFG_VALUES.NO + '">No</option><option value="' + createVpgNicConstants.IP_CFG_VALUES.DHCP + '">Yes, DHCP</option>' +
                        '<option value="' + createVpgNicConstants.IP_CFG_VALUES.STATIC + '">Yes, Static</option></select><br/><label >' + $translate.instant('EDIT_NIC.IP_ADDRESS') + '</label>' +
                        '<input tabindex="1" id="ipField" z-ip-field type="text" ng-model="ipValue" ng-required="ipRequierd" ng-disabled="disabledIp"/><br/><label >' + $translate.instant('EDIT_NIC.SUBNET') + '</label>' +
                        '<input tabindex="2" id="subnetField" z-ip-field type="text" ng-model="subnetValue" ng-required="subnetRequierd" ng-disabled="disabledIp"/><br/><label >' + $translate.instant('EDIT_NIC.GATEWAY') + '</label>' +
                        '<input tabindex="3" id="gatewayField" z-ip-field ng-model="gatewayValue" type="text" ng-required="gatewayRequierd" ng-disabled="disabledIp"/></form>';

                    $scope = $rootScope.$new();
                    $template.append($compile($templateHtml)($scope));

                    $select = $('select', $template);
                    $inputIP = $('#ipField', $template);
                    $inputSubnet = $('#subnetField', $template);
                    $inputGateway = $('#gatewayField', $template);

                    _.each([$inputIP, $inputSubnet, $inputGateway], function (item) {
                        item.bind('keydown.nav', function (e) {
                            if (e.keyCode === 9) {
                                e.stopImmediatePropagation();
                            }
                        });
                    });

                    $inputIP.bind('change', function () {
                        isDirty = true;
                    });

                    $inputSubnet.bind('change', function () {
                        isDirty = true;
                    });
                    $inputGateway.bind('change', function () {
                        isDirty = true;
                    });
                    $select.bind('change', function () {
                        isDirty = true;
                        var dropDown = $select.val();
                        if (dropDown === createVpgNicConstants.IP_CFG_VALUES.DHCP || dropDown === createVpgNicConstants.IP_CFG_VALUES.NO) {
                            disableFields(true);
                        } else {
                            disableFields(false);
                            if (!args.item.isInMultiNicVM) {
                                return;
                            }
                            zAlertFactory.info($translate.instant('EDIT_NIC.SUB_TITLE'), $translate.instant('EDIT_NIC.INFO_TEXT'));
                        }
                    });

                    $('body').on('click', this.handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });

                    $template.appendTo(args.container);
                };

                function disableFields(disable) {
                    if (disable) {
                        $scope.disabledIp = true;
                        $scope.ipRequierd = false;
                        $scope.subnetRequierd = false;
                        $scope.gatewayRequierd = false;

                        $inputIP.val('');
                        $inputSubnet.val('');
                        $inputGateway.val('');
                    } else {
                        $scope.disabledIp = false;
                        $scope.ipRequierd = true;
                        $scope.subnetRequierd = true;
                        $scope.gatewayRequierd = true;

                        $inputIP.focus();
                    }
                    if ($scope && !$scope.$$phase) {
                        $scope.$digest();
                    }
                }

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

                this.focus = function () {
                    $select.focus();
                };

                this.loadValue = function (item) {
                    if (args.item.IsIPConfigurationEnabled) {
                        var listValue = item[propName].VCenterNetworkSettings;
                        var listSelectedValue;
                        if (listValue.IP) {
                            if (listValue.IP.IsDhcp) {
                                listSelectedValue = createVpgNicConstants.IP_CFG_VALUES.DHCP;
                                disableFields(true);
                            } else {
                                listSelectedValue = createVpgNicConstants.IP_CFG_VALUES.STATIC;
                                $scope.ipValue = listValue.IP.StaticIP;
                                $scope.subnetValue = listValue.IP.SubnetMask;
                                $scope.gatewayValue = listValue.IP.Gateway;
                                disableFields(false);
                            }
                        } else {
                            listSelectedValue = createVpgNicConstants.IP_CFG_VALUES.NO;
                            disableFields(true);
                        }
                        $select.val(listSelectedValue);
                    }
                };

                this.serializeValue = function () {
                    return '';
                };

                this.applyValue = function (item) {
                    if (args.item.IsIPConfigurationEnabled) {
                        var dropDown = $select.val();
                        var originalObject = item[propName].VCenterNetworkSettings;
                        if (dropDown === createVpgNicConstants.IP_CFG_VALUES.DHCP) {
                            originalObject.IP = {IsDhcp: true};
                            item[args.column.field] = 'DHCP';
                        } else if (dropDown === createVpgNicConstants.IP_CFG_VALUES.STATIC) {
                            originalObject.IP = {IsDhcp: false};
                            originalObject.IP.StaticIP = $scope.ipValue;
                            item[args.column.field] = $scope.ipValue;
                            originalObject.IP.SubnetMask = $scope.subnetValue;
                            originalObject.IP.Gateway = $scope.gatewayValue;
                        } else {
                            originalObject.IP = null;
                            item[args.column.field] = '';
                        }
                    }
                };

                this.isValueChanged = function () {
                    return isDirty;
                };

                this.validate = function () {
                    var valid = true;
                    if (args.item.IsIPConfigurationEnabled) {
                        valid = $scope.IpForm.$valid;
                    }
                    return {
                        valid: valid,
                        msg: ''
                    };
                };

                this.init();
            };
        };
    });
