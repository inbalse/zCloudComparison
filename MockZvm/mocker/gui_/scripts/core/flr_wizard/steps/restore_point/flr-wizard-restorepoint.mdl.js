'use strict';

angular.module('zvmApp.core')
    .constant('flrCheckpointTypes', {
        Offsite: 'Offsite',
        Vss: 'VSS',
        User: 'User',
        Auto: 'Auto'
    })
    .factory('flrWizardRestorepointModel', function ($filter, vpgApi, zWizardStepStates, flrWizardModel, zSlickGridFilterTypes, zAlertFactory, flrCheckpointTypes, configureCheckpointCons, flrApiService, $translate, busyOverlayService) {

        var model = {},
            flrWizardRestorepointModel = {};

        model.data = null;
        model.filtered = null;
        model.selectedItems = [];
        model.dateOptions = {
            range: {
                startDate: null,
                endDate: null
            },
            minDate: null,
            maxDate: null
        };

        var getGridOptions = function () {
            return {
                showSearch: true,
                showGroupBy: false,
                multiSelect: false,
                defaultSortField: configureCheckpointCons.PROP_TIMESTAMP,
                defaultSortAsc: false,
                columns: [
                    {
                        id: 'TimeStamp',
                        name: 'Time',
                        field: 'timeObj',
                        minWidth: 150,
                        formatter: $filter('textWithEnumToCssClassFormatter')('cp-list', 'timeObj'),
                        filter: zSlickGridFilterTypes.DATE
                    },
                    {id: 'Type', name: 'Type', field: 'type', filter: zSlickGridFilterTypes.WILDCARD},
                    {id: 'Tag', name: 'Name', field: 'Tag', filter: zSlickGridFilterTypes.WILDCARD}
                ]
            };
        };

        model.filters = {
            offsite: false,
            auto: true,
            vss: true,
            user: true
        };

        var validate = function () {
            model.step.isEnabled = model.selectedItems.length > 0;
            model.step.stateIcon = model.step.isEnabled ? zWizardStepStates.VALID : zWizardStepStates.INITIAL;
            return model.step.isEnabled;
        };

        model.step = {
            class: '',
            isEnabled: false,
            stateIcon: zWizardStepStates.INITIAL,
            id: 'CHECKPOINT',
            stepTitle: $translate.instant('FLR.WIZARD.RESTORE_POINT.CHECKPOINT_TITLE'),
            template: '<ng-include src="\'scripts/core/flr_wizard/steps/restore_point/flr-wizard-restorepoint.html\'"></ng-include>',
            isValid: validate,
            validationError: $translate.instant('FLR.WIZARD.RESTORE_POINT.NONE_SELECTED')
        };

        var revert = function () {
            model.step.class = '';
            model.step.isEnabled = false;
            model.step.stateIcon = zWizardStepStates.INITIAL;
            model.data = null;
            model.filtered = null;
            model.selectedItems = [];
            model.filters = {
                offsite: false,
                auto: true,
                vss: true,
                user: true
            };
            model.vpgId = '';
            model.dateOptions = {
                range: null,
                oneDateOnly: null,
                minDate: null,
                maxDate: null
                // disabledDates: configureCheckpointFactory.getDisabledDates()
            };
        };

        var filter = function () {
            if (model.filters.offsite ||
                model.filters.auto ||
                model.filters.vss ||
                model.filters.user) {

                model.filtered = _.filter(model.data, function (item) {

                    if (model.filters.offsite && item.type === flrCheckpointTypes.Offsite) {
                        return true;
                    }
                    if (model.filters.auto && item.type === flrCheckpointTypes.Auto) {
                        return true;
                    }
                    if (model.filters.vss && item.type === flrCheckpointTypes.Vss) {
                        return true;
                    }
                    return model.filters.user && item.type === flrCheckpointTypes.User;
                });

            } else {
                model.filtered = [];
            }
        };

        var createPointInTimeAndType = function (item) {
            if (item.Vss) {
                item.type = 'VSS';
            } else if (!item.Vss && item.Tag) {
                item.type = 'User';
            } else {
                item.type = 'Auto';
            }

            var pointInTime = $filter('zDateFilter')(item.TimeStamp);
            item.timeObj = {};
            item.timeObj.display = pointInTime;
            item.timeObj.value = item.type;
            item.timeObj.filterValue = new Date(pointInTime);
            item.PointInTime = pointInTime;
            item.Source = 'Journal';
            item.id = item.CheckpointIdentifier;
        };


        var init = function (vpgId) {
            var busyKey = 'vpgApi.GetVPGCheckpointsStats';
            busyOverlayService.addOperation(busyKey);
            model.vpgId = vpgId;

            vpgApi.GetVPGCheckpointsStats(model.vpgId)
                .then(onVpgStatsCheckpointsSuccess, flrApiService.onFail)
                .then(function () {
                    busyOverlayService.removeOperation(busyKey);
                });
        };

        var loadCheckpoints = function (range) {
            var busyKey = 'vpgApi.filterVpgCheckpoints',
                dateSpan = getStartEndDate(range.startDate, range.endDate);

            busyOverlayService.addOperation(busyKey);

            vpgApi
                .filterVpgCheckpoints(model.vpgId, {
                    startDate: dateSpan.startDate,
                    endDate: dateSpan.endDate
                })
                .then(onCheckpointsSuccess, flrApiService.onFail)
                .then(function () {
                    busyOverlayService.removeOperation(busyKey);
                });
        };

        var onVpgStatsCheckpointsSuccess = function (edgeCheckpoints) {
            model.edgeCheckpoints = edgeCheckpoints;
            model.dateOptions = {
                minDate: getEarliestCheckpointDate().toISOString(),
                maxDate: getLatestCheckpointDate().toISOString(),
                range: getLatestCheckpointDateSpan(),
                oneDateOnly: isOneDate()
            };
            flrWizardRestorepointModel.loadCheckpoints(model.dateOptions.range);
        };

        var onCheckpointsSuccess = function (checkpoints) {
            model.data = _.forEach(checkpoints, function (item) {
                createPointInTimeAndType(item);
            });
            filter();
        };

        flrWizardModel.addModel({
            revert: revert
        });

        var isOneDate = function () {
            var earliestDate = moment(getEarliestCheckpointDate()),
                latestDate = moment(getLatestCheckpointDate());

            return earliestDate.isSame(latestDate, 'day');
        };

        var getStartEndDate = function (startDate, endDate) {
            startDate = _.isNullOrUndefined(startDate) ? endDate : startDate;

            return {
                startDate: moment(startDate).startOf('day').toISOString(),
                endDate: moment(endDate).endOf('day').toISOString()
            };
        };

        var getEarliestCheckpointDate = function () {
            var timeStamp = _.get(model, 'edgeCheckpoints.Earliest.TimeStamp');
            return new Date(parseInt(timeStamp.substr(6), 10));
        };

        var getLatestCheckpointDate = function () {
            var timeStamp = _.get(model, 'edgeCheckpoints.Latest.TimeStamp');
            return new Date(parseInt(timeStamp.substr(6), 10));
        };

        var getLatestCheckpointDateSpan = function () {
            var latestCheckpoint = getLatestCheckpointDate();
            return getStartEndDate(latestCheckpoint, latestCheckpoint);
        };

        flrWizardRestorepointModel.onDateChange = function () {
            flrWizardRestorepointModel.loadCheckpoints(model.dateOptions.range);
        };

        flrWizardRestorepointModel.getGridOptions = getGridOptions;
        flrWizardRestorepointModel.init = init;
        flrWizardRestorepointModel.loadCheckpoints = loadCheckpoints;
        flrWizardRestorepointModel.revert = revert;
        flrWizardRestorepointModel.model = model;
        flrWizardRestorepointModel.getEarliestCheckpointDate = getEarliestCheckpointDate;
        flrWizardRestorepointModel.getLatestCheckpointDate = getLatestCheckpointDate;
        flrWizardRestorepointModel.validate = validate;
        flrWizardRestorepointModel.filter = filter;
        flrWizardRestorepointModel.createPointInTimeAndType = createPointInTimeAndType;
        flrWizardRestorepointModel.onCheckpointsSuccess = onCheckpointsSuccess;
        flrWizardRestorepointModel.onVpgStatsCheckpointsSuccess = onVpgStatsCheckpointsSuccess;


        return flrWizardRestorepointModel;

    });
