'use strict';

angular.module('zvmApp.core')
    .filter('vmJournalSize', function ($rootScope, editorsTemplateFactory, createVPGModel, $compile, objectTransformHelpersService, storageService) {
        return function (journalParameter) {
            return function (args) {
                var $template, $select, $templateHtml, $scope;

                this.init = function () {
                    //if customSla
                    $templateHtml = $(editorsTemplateFactory.getTemplate('blank'));
                    $templateHtml.addClass('z-inline-editor-journal-config');

                    $templateHtml.append(
                        '<form class="form-horizontal" name="journalForm">' +
                        '<journal-limit required  value="journalValue" is-sla-custom="isSlaCustom"></journal-limit>' +
                        '</form>');

                    $scope = $rootScope.$new();
                    $scope.isSlaCustom = storageService.getIsSlaCustom();
                    $template = $compile($templateHtml)($scope);

                    $('body').on('click', this.handleClickOutside);
                    $template.on('click', function (e) {
                        e.stopPropagation();
                    });
                    $select = $('journal-limit', $template);

                    $template.appendTo(args.container);
                    $select.focus();
                };

                this.handleClickOutside = function (e) {
                    if (e.target.className !== args.container.className) {
                        args.commitChanges();
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
                    $scope.journalValue = _.cloneDeep(item[journalParameter]);
                    objectTransformHelpersService.JournalLimitTypeMBtoGB($scope.journalValue);
                    $select.select();
                };

                this.serializeValue = function () {
                    return _.cloneDeep($scope.journalValue);
                };

                this.applyValue = function (item, state) {
                    item[journalParameter] = state;
                };

                this.isValueChanged = function () {
                    return true;
                };

                this.validate = function () {
                    var valid = $scope.journalForm.$valid;
                    return {
                        valid: valid,
                        msg: null
                    };
                };

                this.init();
            };
        };
    }).filter('potentialVMFolder', function ($translate, editorsTemplateFactory, zertoServiceFactory, vos, createVPGModel) {
        return function (args) {
            var $template, $select, defaultValue;

            this.init = function () {
                $template = $(editorsTemplateFactory.getTemplate('dropdown'));

                $select = $('select', $template);

                $template.appendTo(args.container);
                $select.focus();
                $('body').on('click', this.handleClickOutside);
                $template.on('click', function (e) {
                    e.stopPropagation();
                });
                $select.on('change', args.commitChanges);
            };

            this.handleClickOutside = function (e) {
                if (e.target.className !== args.container.className) {
                    args.commitChanges();
                }
            };

            this.destroy = function () {
                $template.remove();
                $('body').off('click', this.handleClickOutside);
            };

            this.focus = function () {
                $select.focus();
            };

            this.loadValue = function (item) {
                defaultValue = item.TargetFolder;
                if (!args.item.TargetHost) {
                    //$select.append('<option value="">' + $translate.instant('RESTORE_WIZARD.FILTERS.DEFAULT') + '</option>');
                } else {

                    var resultHandler = function (result) {
                        _.each(result.PotentialFolders, function (item) {
                            var val = JSON.stringify(item);
                            $select.append('<option value=\'' + val + '\'>' + item.DisplayName + '</option>');
                        });
                        var value = item.TargetFolder;
                        var folder = _.find(result.PotentialFolders, function (folder) {
                            return value && _.isEqual(value.Id, folder.Id);
                        });
                        value = folder;

                        var val = value ? JSON.stringify(value) : null;
                        if (val) {
                            $select.val(val);
                        } else {
                            $select.val('');
                        }

                        $select.select();
                    };

                    if (createVPGModel.data.isReverse) {
                        zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(createVPGModel.data.protectionGroupId, item.TargetHost.BaseComputeResourceIdentifier).then(resultHandler);
                    } else {
                        zertoServiceFactory.GetRecoveryComputeResource(createVPGModel.data.protectionGroupId, createVPGModel.data.targetSite.OwnersId.Id, item.TargetHost.BaseComputeResourceIdentifier).then(resultHandler);
                    }

                }
            };

            this.serializeValue = function () {
                var val = $select.val();
                if (val) {
                    return JSON.parse(val);
                }
                return defaultValue;
            };

            this.applyValue = function () {

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
    });


