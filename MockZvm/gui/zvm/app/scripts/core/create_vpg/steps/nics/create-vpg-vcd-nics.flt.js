'use strict';

angular.module('zvmApp.core')
    .filter('nicVCDIpEditor', function (editorsTemplateFactory, zAlertFactory, $translate, $compile, $rootScope, enums, globalConstants) {
        return function (propName) {
            return function (args) {
                var $template, $select, $inputIP, $templateHtml, $scope;
                var scope = this;
                var isDirty = false;

                this.init = function () {

                    var VCDNetworkSettings = args.item[propName].VCDNetworkSettings;

                    $template = $(editorsTemplateFactory.getTemplate('blank'));
                    $template.addClass('z-inline-editor-ip-config');

                    if (!args.item.IsIPConfigurationEnabled) {
                        $template.append('<div class="editor-ip-info">' + $translate.instant('EDIT_NIC.MIXED_TYPE_INFO') + '</div>');
                    } else if (!_.isNullOrUndefined(VCDNetworkSettings) && VCDNetworkSettings.NicInfo.VappNetworkName === globalConstants.NONE_NETWORK) {
                        $template.append('<div class="editor-ip-none">' + $translate.instant('EDIT_NIC.NONE_NETWORK') + '</div>');
                        $template.removeClass('z-inline-editor-ip-config');
                    } else {
                        $templateHtml = '<form name="IpForm"><div class="z-inline-editor z-inline-editor-ip-config">' +
                            '<label class="z-inline-ip-label">' + $translate.instant('EDIT_NIC.VNIC_IP_MODE') + '</label>' +
                            '<select tabindex="0"><option value="' + enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool + '">IP Pool</option>' +
                            '<option value="' + enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp + '">DHCP</option>' +
                            '<option value="' + enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual + '">Static- IP Pool</option>' +
                            '<option value="' + enums.VCDNetworkIpMode_VCDNetworkIpModeType.None + '">None</option></select><br/>' +
                            '<label >' + $translate.instant('EDIT_NIC.IP_ADDRESS') + '</label>' +
                            '<input tabindex="1" id="ipField" z-ip-field type="text" ng-model="ipValue" ng-required="ipRequierd" />' +
                            '</div></form>';

                        $scope = $rootScope.$new();
                        $template.append($compile($templateHtml)($scope));

                        $select = $('select', $template);
                        $inputIP = $('#ipField', $template);

                        $template.appendTo(args.container);

                        $select.bind('change', function () {
                            isDirty = true;
                            var dropDown = parseInt($select.val());
                            if (dropDown === enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool || dropDown === enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp ||
                                dropDown === enums.VCDNetworkIpMode_VCDNetworkIpModeType.None) {
                                $inputIP.val(null);
                                disableFields(true);
                            } else {
                                disableFields(false);
                                if (!args.item.isInMultiNicVM) {
                                    return;
                                }
                                zAlertFactory.info($translate.instant('EDIT_NIC.SUB_TITLE'), $translate.instant('EDIT_NIC.INFO_TEXT'));
                            }
                        });

                        $inputIP.bind('change', function () {
                            isDirty = true;
                        });
                    }

                    $('body').on('click', this.handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });

                    $template.appendTo(args.container);
                };

                function disableFields(disable) {
                    if (disable) {
                        $scope.ipRequierd = false;
                        $inputIP.attr('disabled', 'disabled');
                    } else {
                        $scope.ipRequierd = true;
                        $inputIP.attr('disabled', false);
                        $inputIP.focus();
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
                };

                this.destroy = function () {
                    $('body').off('click', this.handleClickOutside);
                    $template.remove();
                    if ($scope && $scope.$destroy) {
                        $scope.$destroy();
                    }
                };

                this.focus = function () {
                };

                this.loadValue = function (item) {
                    if (args.item.IsIPConfigurationEnabled && $scope) {
                        var listValue = item[propName].VCDNetworkSettings;
                        var listSelectedValue;
                        if (!_.isNullOrUndefined(listValue) && listValue.NicInfo.IPMode) {
                            listSelectedValue = listValue.NicInfo.IPMode.IpModeType;
                            switch (listValue.NicInfo.IPMode.IpModeType) {
                                case enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool:
                                    disableFields(true);
                                    break;
                                case enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp:
                                    disableFields(true);
                                    break;
                                case enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual:
                                    $scope.ipValue = listValue.NicInfo.IpAddress;
                                    disableFields(false);
                                    break;
                                case enums.VCDNetworkIpMode_VCDNetworkIpModeType.None:
                                    disableFields(true);
                                    break;
                            }
                        }
                        $select.val(listSelectedValue);
                    }
                };

                this.serializeValue = function () {
                    return '';
                };

                this.applyValue = function (item) {
                    if (args.item.IsIPConfigurationEnabled) {
                        var dropDown = parseInt($select.val());
                        var originalObject = item[propName].VCDNetworkSettings;
                        originalObject.NicInfo.IPMode.IpModeType = dropDown;
                        switch (dropDown) {
                            case enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool:
                                originalObject.NicInfo.IpAddress = null;
                                item[args.column.field] = 'IP Pool';
                                break;
                            case enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp:
                                originalObject.NicInfo.IpAddress = null;
                                item[args.column.field] = 'DHCP';
                                break;
                            case enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual:
                                originalObject.NicInfo.IpAddress = $scope.ipValue;
                                item[args.column.field] = $scope.ipValue;
                                break;
                            case enums.VCDNetworkIpMode_VCDNetworkIpModeType.None:
                                originalObject.NicInfo.IpAddress = null;
                                item[args.column.field] = 'None';
                                break;
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
