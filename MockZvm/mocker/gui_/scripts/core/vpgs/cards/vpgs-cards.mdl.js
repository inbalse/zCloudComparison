'use strict';

angular.module('zvmApp.models')
    .constant('vpgsCardsConstants', {
        SHOW_FILTERS_STATE: 'vpgs_cards_filter_btn_state',
        COLOR_MEETING_SLA: 'vpgs-cards-component__card-rpo--meeting',
        COLOR_WARNING: 'vpgs-cards-component__card-rpo--warning',
        COLOR_NOT_MEETING_SLA: 'vpgs-cards-component__card-rpo--not-meeting',
        COLOR_NA: 'vpgs-cards-component__card-rpo--na'
    })
    .factory('vpgsCardsModel', function (vpgsModel, $rootScope, $filter, $translate, zertoServiceUpdaterFactory, zSlickGridSearchService, dataFilterService, vpgsCardsConstants,
                                         vpgsContainerService, vpgsProgressService, dataSortService, vpgsListEvents, enums, vpgCardDisplayRpoConstants, basil, analyticsEventsTypes,
                                         zNotificationConstant, zNotificationService) {
        var vpgsCardsModel = {},
            initialItems,
            showFilters = false,//first time do not show it
            reactNotifier = zNotificationService.getNotifier(zNotificationConstant.NG_REACT),
            filterNotifier = zNotificationService.getNotifier(zNotificationConstant.CARD_FILTER_CHANGE),
            selectedNotifier = zNotificationService.getNotifier(zNotificationConstant.CARD_SELECTED_FILTER_CHANGE);
        vpgsCardsModel.register = function (scope) {
            return zertoServiceUpdaterFactory.register(scope, 'GetProtectionGroupListScreen', [], false, vpgsCardsModel.processData);
        };

        vpgsCardsModel.processData = function (data) {
            var processed = vpgsModel.processData(data.ProtectionGroups);

            _.forEach(processed, function (item) {
                vpgsCardsModel.buildRPO(item);
                item.directionIcon = vpgsCardsModel.setDirectionIcon(item.Direction);
                item.AlertStatusObj = vpgsCardsModel.setAlertIcon(item.AlertStatus);
                item.TargetTypeObj.classNames = vpgsCardsModel.setTargetSiteIcon(item.Entities.Target);

                var taskData = vpgsProgressService.convertTaskData(item);
                item.stateProcess = taskData.process;
                item.progress = vpgsCardsModel.setProgress(taskData, item.vpgState);
            });

            initialItems = processed;


            return processed;
        };

        vpgsCardsModel.isFilterButtonActive = function (filters) {
            return !_.isNullOrUndefined(_.find(filters, {isFilterActive: true}));
        };

        vpgsCardsModel.setShowFiltersState = function (state) {
            showFilters = state;
        };
        vpgsCardsModel.getShowFiltersState = function () {
            return showFilters;
        };

        vpgsCardsModel.getInitialItems = function () {
            return initialItems;
        };

        vpgsCardsModel.getGroups = function (data, groupBy, columns) {
            var result = [], header;
            data = _.values(_.groupBy(data, groupBy.id));
            for (var i = 0; i < data.length; i++) {
                header = {name: groupBy.text, count: data[i].length};
                result.push(header);
                header.formatter = getGroupFormatter(columns, groupBy.field);
                header.value = getGroupByValue(data[i], groupBy.field);
                result.push(data[i]);
            }


            return result;
        };

        vpgsCardsModel.prepareRender = function (items, search, sort, groupBy, filters) {
            var result = items || initialItems;
            search = search || {};
            filters = filters || [];

            result = dataFilterService.filter(result, filters);

            if (!_.isEmpty(search.term)) {
                result = zSlickGridSearchService.search(search.term, result, search.columns);
            }
            // if (_.isEmpty(search.term)) {
            result.sort(dataSortService.getComparer(sort.sortField, sort.sortAsc));

            if (!_.isEmpty(groupBy.id)) {
                return vpgsCardsModel.getGroups(result, groupBy, search.columns);
            }

            return result;
        };

        vpgsCardsModel.getSelectedSortBy = function (sort) {
            var columns = vpgsCardsModel.getSortByValues();
            if (_.isNullOrUndefined(sort)) {
                return columns[0];
            }
            var column = _.find(columns, {field: sort.sortField});

            if (_.isNullOrUndefined(column)) {
                return columns[0];
            }

            return column;

        };

        vpgsCardsModel.getSortByValues = function () {
            var columns = vpgsCardsModel.getCardsColumnDefs();
            return _.map(columns, function (column) {
                return {
                    name: column.name,
                    field: column.field,
                    views: column.views
                };
            });
        };

        vpgsCardsModel.getDefaultGroupBy = function () {
            return vpgsModel.getGroupByValues()[0];
        };

        vpgsCardsModel.getDefaultSortBy = function () {
            return {
                sortField: 'NameObj',
                sortAsc: true
            };
        };

        vpgsCardsModel.getSelectedVPGIds = function () {
            return vpgsContainerService.getSelectedVPGIds();
        };
        vpgsCardsModel.getCardsColumnDefs = function () {
            var columns = vpgsModel.getCardsColumnDefs();
            vpgsCardsModel.renameNameColumn(columns);
            return columns;
        };

        vpgsCardsModel.renameNameColumn = function (columns) {
            if (_.isEmpty(columns)) {
                return;
            }
            var nameColumn = _.find(columns, {field: 'NameObj'});
            nameColumn.name = $translate.instant('VPG_LIST.VPG_NAME');
        };

        vpgsCardsModel.getReactNotifier = function () {
            return reactNotifier;
        };
        vpgsCardsModel.getFilterNotifier = function () {
            return filterNotifier;
        };
        vpgsCardsModel.getSelectedNotifier = function () {
            return selectedNotifier;
        };

        vpgsCardsModel.forceRender = function () {
            reactNotifier.notify({key: zNotificationConstant.NG_REACT, value: 'vpgCards'});
        };

        vpgsCardsModel.updateSelectedFiltersDisplay = function () {
            filterNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
            selectedNotifier.notify({key: zNotificationConstant.CARD_SELECTED_FILTER_CHANGE});
        };

        $rootScope.$on(analyticsEventsTypes.GENERAL.LOGOUT, function () {
            showFilters = false;
        });

        //region RPO
        vpgsCardsModel.buildRPO = function (item) {


            var displayRPO = $filter('vpgCardDisplayRpo')(item.ActualRPO);

            item.ActualRPOObj = vpgsCardsModel.setActualRPOObj(item.ActualRPO, displayRPO.display);
            item.gauge = vpgsCardsModel.buildGauge(item.ActualRPO, item.ConfiguredRPO, displayRPO.units);

            var css = ['vpgs-cards-component__card-rpo'];

            vpgsCardsModel.setRPOSize(css, displayRPO.display);
            vpgsCardsModel.setRPOColor(css, item.ActualRPO, item.ConfiguredRPO);
            item.gauge.rpoCss = $filter('classNamesFormatter')(css);

        };

        vpgsCardsModel.buildGauge = function (rpo, sla, units) {
            var gauge = {};
            gauge.rpo = rpo;
            gauge.sla = sla;
            gauge.units = units;

            return gauge;
        };

        vpgsCardsModel.setRPOSize = function (css, display) {
            if (_.isEqual(display, 'NA')) {
                css.push('vpgs-cards-component__card-rpo--na');
                return;
            }
            //if less than 5 digits
            if (display.length < 5) {
                css.push('vpgs-cards-component__card-rpo--big');
            } else {
                css.push('vpgs-cards-component__card-rpo--small');
            }
        };

        vpgsCardsModel.setRPOColor = function (css, rpo, sla) {
            if (rpo <= vpgCardDisplayRpoConstants.MIN_RPO || rpo >= vpgCardDisplayRpoConstants.MAX_RPO) {
                css.push(vpgsCardsConstants.COLOR_NA);
                return;
            }

            if (rpo <= sla) {
                css.push(vpgsCardsConstants.COLOR_MEETING_SLA);
            } else if (rpo > sla && rpo <= sla * 1.25) {
                css.push(vpgsCardsConstants.COLOR_WARNING);
            } else {
                css.push(vpgsCardsConstants.COLOR_NOT_MEETING_SLA);
            }
        };

        vpgsCardsModel.setActualRPOObj = function (rpo, display) {
            return {
                display: display,
                value: rpo
            };
        };

        //endregion

        //region Info
        vpgsCardsModel.setDirectionIcon = function (direction) {
            var result = ['vpgs-cards-component__card-info-item', 'vpgs-cards-component__card-info-direction'];

            switch (direction) {
                case enums.ProtectionGroupStateVisual.Protected:
                    result.push('vpgs-cards-component__card-info-direction--protected');
                    break;
                case enums.ProtectionGroupStateVisual.Recovery:
                    result.push('vpgs-cards-component__card-info-direction--recovery');
                    break;
                case enums.ProtectionGroupStateVisual.SelfProtected:
                    result.push('vpgs-cards-component__card-info-direction--self');
                    break;
            }

            return $filter('classNamesFormatter')(result);
        };

        vpgsCardsModel.setTargetSiteIcon = function (target) {
            var result = ['vpgs-cards-component__card-info-item', 'vpgs-cards-component__card-info-type'];
            switch (target) {
                case enums.VpgEntityType.VCVpg:
                    result.push('vpgs-cards-component__card-info-type--vc');
                    break;
                case enums.VpgEntityType.VCDvApp:
                    result.push('vpgs-cards-component__card-info-type--vcd');
                    break;
                case enums.VpgEntityType.Aws:
                    result.push('vpgs-cards-component__card-info-type--aws');
                    break;
                case enums.VpgEntityType.HyperV:
                    result.push('vpgs-cards-component__card-info-type--hyperv');
                    break;
                case enums.VpgEntityType.Azure:
                    result.push('vpgs-cards-component__card-info-type--azure');
                    break;
            }

            return $filter('classNamesFormatter')(result);
        };

        //endregion

        //region Title
        vpgsCardsModel.setAlertIcon = function (alertStatus) {
            var result = ['vpgs-cards-component__card-title-status'];

            switch (alertStatus) {
                case enums.ProtectionGroupAlertStatus.Normal:
                    result.push('vpgs-cards-component__card-title-status--ok');
                    break;
                case enums.ProtectionGroupAlertStatus.Error:
                    result.push('vpgs-cards-component__card-title-status--error');
                    break;
                case enums.ProtectionGroupAlertStatus.Warning:
                    result.push('vpgs-cards-component__card-title-status--alert');
                    break;
            }

            return {classNames: $filter('classNamesFormatter')(result)};
        };

        //endregion

        //region Progress

        vpgsCardsModel.setProgress = function (taskData, stateData) {
            var result = null;
            if (!_.isNullOrUndefined(taskData.process)) {
                result = setTaskProgress(taskData);
            } else if (!_.isEmpty(stateData.display)) {
                result = setStateProgress(stateData);
            }

            return result;
        };

        function setStateProgress(progress) {
            var label, value;
            label = buildLabel(progress.display);

            if (!progress.showProgress) {
                return {label: label};
            }
            label = buildLabel(progress.display);
            value = buildProgress(progress.value);

            return {label: label, value: value};
        }

        function setTaskProgress(progress) {
            var label, value, buttons;
            if (!progress.operation.showProgress) {

                label = buildLabel(progress.process.display, $translate.instant('GRID_COLUMNS.OPERATION'));
                buttons = vpgsCardsModel.buildButtons(progress.operation);

                return {label: label, buttons: buttons};
            }

            label = buildLabel(progress.process.display);

            if (progress.operation.showProgress) {
                value = buildProgress(progress.operation.progressValue);
            }

            buttons = vpgsCardsModel.buildButtons(progress.operation);

            return {label: label, value: value, buttons: buttons};
        }

        function buildLabel(display, title) {
            return {
                css: 'progress-span',
                display: display,
                title: title || display
            };
        }

        vpgsCardsModel.buildButtons = function (operation) {
            if (_.isNullOrUndefined(operation)) {
                return null;
            }

            var result = [];
            if (operation.stopTestButton) {
                result.push(buildButtonAttrs(vpgsListEvents.stopFot, 'stop-btn',
                    'STOP', true));

            } else if (operation.stopBackupButton) {
                result.push(buildButtonAttrs(vpgsListEvents.stopBackup, 'stop-btn',
                    'STOP', true));
            } else if (operation.stopCloneButton) {
                result.push(buildButtonAttrs(vpgsListEvents.stopClone, 'stop-btn',
                    'STOP', true));
            } else if (operation.resumeButton) {
                result.push(buildButtonAttrs(vpgsListEvents.resume, 'resume-btn',
                    'RESUME', true));
            } else if (operation.rollbackCommitButton) {
                result.push(buildButtonAttrs(vpgsListEvents.commit, 'commit-btn',
                    'Commit', false));
                result.push(buildButtonAttrs(vpgsListEvents.rollback, 'rollback-btn',
                    'Rollback', false));
            }

            return result;

        };

        function buildProgress(value) {
            if (_.isNullOrUndefined(value)) {
                return null;
            }
            return {
                css: 'progress-bar progress-bar-danger',
                role: 'progressBar',
                min: 0,
                max: 100,
                now: value,
                width: value + '%'
            };
        }

        function buildButtonAttrs(action, css, title, showText) {
            return {
                action: action,
                css: css,
                title: title,
                showText: showText
            };
        }

        //endregion

        function getGroupFormatter(columns, field) {
            var column = _.find(columns, {field: field});
            return column.formatter;
        }

        function getGroupByValue(data, field) {
            if (_.isNullOrUndefined(data) || _.isNullOrUndefined(data[0])) {
                return;
            }

            return data[0][field];
        }

        return vpgsCardsModel;
    });
