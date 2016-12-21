'use strict';

angular.module('zvmApp.filters')
    .filter('networkFormatter', function () {
        return function (row, cell, value) {
            if (value.Network) {
                return value.Network.DisplayName;
            } else {
                return '';
            }
        };
    })
    .filter('dnsFormatter', function () {
        return function (propName) {
            return function (row, cell, value) {
                return value ? value.IPConfiguration[propName] : '';
            };
        };
    })
    .filter('ipConfigurationFormatter', function (enums) {
        return function (row, cell, value) {
            if (value && value.IPConfiguration) {
                if (value.IPConfiguration.Type === enums.RestoreIpType.Same) {
                    return 'Same';
                } else if (value.IPConfiguration.Type === enums.RestoreIpType.Dhcp) {
                    return 'DHCP';
                } else {
                    return value.IPConfiguration.StaticIP;
                }
            } else {
                return '';
            }

        };
    })
    .filter('restoreNicsIpEditor', function (editorsTemplateFactory, $translate, enums, $compile, $rootScope) {
        return function (propName) {
            return function (args) {
                var $template, $select, $inputIP, $inputSubnet, $inputGateway, $templateHtml, $scope;
                var scope = this;
                var isDirty = false;
                this.init = function () {
                    $template = $(editorsTemplateFactory.getTemplate('blank'));
                    $template.addClass('z-inline-editor-ip-config');

                    if (args.item[propName].IsIPConfigurationEnabled) {

                        $templateHtml = '<form name="IpForm"><label class="z-inline-ip-label">' + $translate.instant('EDIT_NIC.CHANGE_IP_INLINE') + '</label>' +
                        '<select tabindex="0"><option value="' + enums.RestoreIpType.Same + '">Same</option><option value="' + enums.RestoreIpType.Dhcp + '">DHCP</option>' +
                        '<option value="' + enums.RestoreIpType.Static + '">Static</option></select><br/><label >' + $translate.instant('EDIT_NIC.IP_ADDRESS') + '</label>' +
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
                            disableFields(parseInt($select.val()) !== enums.RestoreIpType.Static);
                        });
                    } else {
                        $template.append('<div class="editor-ip-info">' + $translate.instant('EDIT_NIC.MIXED_TYPE_INFO') + '</div>');
                    }

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
                };

                this.focus = function () {
                    $select.focus();
                };

                this.loadValue = function (item) {
                    if (item[propName].IsIPConfigurationEnabled) {
                        var listValue = item[propName].IPConfiguration;

                        if (listValue.Type === enums.RestoreIpType.Static) {
                            $scope.ipValue = listValue.StaticIP;
                            $scope.subnetValue = listValue.SubnetMask;
                            $scope.gatewayValue = listValue.Gateway;
                        }

                        disableFields(listValue.Type !== enums.RestoreIpType.Static);
                        $select.val(item[propName].IPConfiguration.Type);
                    }
                };

                this.serializeValue = function () {
                    return '';
                };

                this.applyValue = function (item) {
                    if (item[propName].IsIPConfigurationEnabled) {

                        item[propName].IPConfiguration.Type = parseInt($select.val());

                        if (item[propName].IPConfiguration.Type === enums.RestoreIpType.Static) {
                            item[propName].IPConfiguration.StaticIP = $scope.ipValue;
                            item[propName].IPConfiguration.SubnetMask = $scope.subnetValue;
                            item[propName].IPConfiguration.Gateway = $scope.gatewayValue;
                        } else {
                            item[propName].IPConfiguration.StaticIP = null;
                            item[propName].IPConfiguration.SubnetMask = null;
                            item[propName].IPConfiguration.Gateway = null;
                        }
                    }
                };

                this.isValueChanged = function () {
                    return isDirty;
                };

                this.validate = function () {
                    var valid = true;
                    if (args.item[propName].IsIPConfigurationEnabled) {
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
    })
    .filter('restoreNicsDnsEditor', function (editorsTemplateFactory, $translate, $compile, $rootScope) {
        return function () {
            return function (args) {
                var $template, $inputPreferredDns, $inputAlternateDns, $inputDnsSuffix, $templateHtml, $scope;
                var scope = this;
                var isDirty = false;
                this.init = function () {
                    $template = $(editorsTemplateFactory.getTemplate('blank'));
                    $template.addClass('z-inline-editor-dns-config');

                    $templateHtml = '<form name="dnsForm"><div class="z-inline-dns-label">' + $translate.instant('EDIT_NIC.PREFERRED_SERVERS') + '</div>' +
                    '<div>' + $translate.instant('EDIT_NIC.PREFERRED_DNS') + '</div>' +
                    '<input tabindex="1" id="preferredDnsField" z-ip-field type="text" ng-model="preferredDnsValue" ng-required="preferredDnsRequierd"/><br/>' +
                    '<div >' + $translate.instant('EDIT_NIC.ALTER_DNS') + '</div>' +
                    '<input tabindex="2" id="alternateDnsField" z-ip-field type="text" ng-model="alternateDnsValue" ng-required="alternateDnsRequierd"/><br/>' +
                    '<div >' + $translate.instant('EDIT_NIC.DNS_SUFFIX') + '</div>' +
                    '<input tabindex="3" id="dnsSuffixField" ng-model="dnsSuffixValue" type="text" ng-required="dnsSuffixRequierd" placeholder="' +  $translate.instant('EDIT_NIC.DNS_SUFFIX') + '"/>' +
                    '</form>';

                    $scope = $rootScope.$new();
                    $template.append($compile($templateHtml)($scope));

                    $inputPreferredDns = $('#preferredDnsField', $template);
                    $inputAlternateDns = $('#alternateDnsField', $template);
                    $inputDnsSuffix = $('#dnsSuffixField', $template);

                    _.each([$inputPreferredDns, $inputAlternateDns, $inputDnsSuffix], function (item) {
                        item.bind('keydown.nav', function (e) {
                            if (e.keyCode === 9) {
                                e.stopImmediatePropagation();
                            }
                        });

                        item.bind('change', function () {
                            isDirty = true;
                        });
                    });

                    $('body').on('click', this.handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });

                    $template.appendTo(args.container);
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
                    $inputPreferredDns.focus();
                };

                this.loadValue = function (item) {
                    var ipConfig = item[args.column.field];

                    if (angular.isObject(ipConfig.IPConfiguration)) {
                        $scope.preferredDnsValue = ipConfig.IPConfiguration.PrimaryDns;
                        $scope.alternateDnsValue = ipConfig.IPConfiguration.SecondaryDns;
                        $scope.dnsSuffixValue = ipConfig.IPConfiguration.DnsSuffix;
                    }
                };

                this.serializeValue = function () {
                    var curr = angular.copy(args.item[args.column.field], {});

                    curr.IPConfiguration.PrimaryDns = $scope.preferredDnsValue;
                    curr.IPConfiguration.SecondaryDns = $scope.alternateDnsValue;
                    curr.IPConfiguration.DnsSuffix = $scope.dnsSuffixValue;

                    return curr;
                };

                this.applyValue = function (item, state) {
                    item[args.column.field] = state;
                };

                this.isValueChanged = function () {
                    return isDirty;
                };

                this.validate = function () {
                    var valid = $scope.dnsForm.$valid;

                    return {
                        valid: valid,
                        msg: ''
                    };
                };

                this.init();

            };
        };
    });
