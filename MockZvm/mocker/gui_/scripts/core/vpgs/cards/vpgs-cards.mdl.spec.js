'use strict';
describe('VPGS cards model', function () {
    var vpgsCardsModel, zertoServiceUpdaterFactory, vpgsContainerService, zSlickGridSearchService, basil,
        dataSortService, enums, vpgsListEvents, zNotificationConstant, dataFilterService, vpgsCardsConstants;
    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {data: {IsPortal: false}});
    }));


    beforeEach(inject(function ($filter, _vpgsCardsModel_, _zertoServiceUpdaterFactory_, _zNotificationConstant_, _dataFilterService_, _vpgsCardsConstants_, _basil_,
                                _zSlickGridSearchService_, _dataSortService_, _vpgsContainerService_, _vpgsListEvents_, _enums_) {
        vpgsCardsModel = _vpgsCardsModel_;
        zertoServiceUpdaterFactory = _zertoServiceUpdaterFactory_;
        vpgsContainerService = _vpgsContainerService_;
        zSlickGridSearchService = _zSlickGridSearchService_;
        dataFilterService = _dataFilterService_;
        zNotificationConstant = _zNotificationConstant_;
        dataSortService = _dataSortService_;
        vpgsCardsConstants = _vpgsCardsConstants_;
        basil = _basil_;
        enums = _enums_;
        vpgsListEvents = _vpgsListEvents_;
    }));

    it('should register to get the vpg list', function () {
        spyOn(zertoServiceUpdaterFactory, 'register');
        var scope = {};
        vpgsCardsModel.register(scope);

        expect(zertoServiceUpdaterFactory.register)
            .toHaveBeenCalledWith(scope, 'GetProtectionGroupListScreen', [], false, vpgsCardsModel.processData);
    });

    it('sould search the list if there is a search term', function () {
        var items = [{}, {}, {}],
            search = {
                term: 'test',
                columns: ['name']
            }, group = {
                id: 'Direction',
                text: 'Direction'
            }, sort = {
                sortField: 'name',
                sortAsc: true
            };

        spyOn(zSlickGridSearchService, 'search').and.callThrough();
        vpgsCardsModel.prepareRender(items, search, sort, group);
        expect(zSlickGridSearchService.search).toHaveBeenCalledWith(search.term, items, search.columns);
    });

    it('should perform filter', function () {
        var items = [],
            filters = {x: 1};

        spyOn(dataFilterService, 'filter').and.callThrough();
        vpgsCardsModel.prepareRender(items, {}, {}, {}, filters);
        expect(dataFilterService.filter).toHaveBeenCalledWith(items, filters);
    });

    it('should perform group by if group is selected', function () {
        var items = [{}, {}, {}],
            search = {
                columns: [{
                    field: 'Direction',
                    formatter: angular.noop
                }]
            },
            sort = {
                sortField: 'name',
                sortAsc: true
            }, group = {
                id: 'Direction',
                text: 'Direction'
            };

        spyOn(vpgsCardsModel, 'getGroups');
        vpgsCardsModel.prepareRender(items, search, sort, group);
        expect(vpgsCardsModel.getGroups).toHaveBeenCalledWith(items, group, search.columns);
    });

    it('should perform sort when there is no search term', function () {
        var items = [{}, {}, {}],
            sort = {
                sortField: 'name',
                sortAsc: true
            },
            search = {
                columns: [{
                    field: 'Direction',
                    formatter: angular.noop
                }]
            },
            group = {
                id: 'Direction',
                text: 'Direction',
                field: 'Direction'
            };

        spyOn(dataSortService, 'getComparer');
        vpgsCardsModel.prepareRender(items, search, sort, group);
        expect(dataSortService.getComparer).toHaveBeenCalledWith(sort.sortField, sort.sortAsc);
    });

    it('should parse group by groups', function () {
        var items = [
                {Direction: 1}, {Direction: 1}, {Direction: 1},
                {Direction: 2}, {Direction: 2},
                {Direction: 3}, {Direction: 3}, {Direction: 3}, {Direction: 3}, {Direction: 3},
                {Direction: 4}
            ],
            columns = [{
                field: 'Direction',
                formatter: angular.noop
            }],
            group = {
                id: 'Direction',
                text: 'Direction',
                field: 'Direction'
            };

        var result = vpgsCardsModel.getGroups(items, group, columns);
        expect(result).toEqual([
            {
                "name": "Direction",
                "count": 3,
                formatter: angular.noop,
                value: 1
            },
            [
                {
                    "Direction": 1
                },
                {
                    "Direction": 1
                },
                {
                    "Direction": 1
                }
            ],
            {
                "name": "Direction",
                "count": 2,
                formatter: angular.noop,
                value: 2
            },
            [
                {
                    "Direction": 2
                },
                {
                    "Direction": 2
                }
            ],
            {
                "name": "Direction",
                "count": 5,
                formatter: angular.noop,
                value: 3
            },
            [
                {
                    "Direction": 3
                },
                {
                    "Direction": 3
                },
                {
                    "Direction": 3
                },
                {
                    "Direction": 3
                },
                {
                    "Direction": 3
                }
            ],
            {
                "name": "Direction",
                "count": 1,
                formatter: angular.noop,
                value: 4
            },
            [
                {
                    "Direction": 4
                }
            ]
        ])
    });

    it('should set the rpo font size', function () {
        var css = [];
        vpgsCardsModel.setRPOSize(css, '1');
        expect(css[0]).toBe('vpgs-cards-component__card-rpo--big');
        css = [];
        vpgsCardsModel.setRPOSize(css, '11:11');
        expect(css[0]).toBe('vpgs-cards-component__card-rpo--small');
        css = [];
        vpgsCardsModel.setRPOSize(css, 'NA');
        expect(css[0]).toBe('vpgs-cards-component__card-rpo--na');
    });

    it('should set the rpo font color', function () {
        var css = [];
        vpgsCardsModel.setRPOColor(css, -192412, 10);
        expect(css.length).toBe(1);
        css = [];
        vpgsCardsModel.setRPOColor(css, 5, 10);
        expect(css[0]).toEqual(vpgsCardsConstants.COLOR_MEETING_SLA);
        css = [];
        vpgsCardsModel.setRPOColor(css, 11, 10);
        expect(css[0]).toEqual(vpgsCardsConstants.COLOR_WARNING);
        css = [];
        vpgsCardsModel.setRPOColor(css, 15, 10);
        expect(css[0]).toEqual(vpgsCardsConstants.COLOR_NOT_MEETING_SLA);
    });


    it('should set the direction icon', function () {
        var defaultClass = 'vpgs-cards-component__card-info-item vpgs-cards-component__card-info-direction ',

            result = vpgsCardsModel.setDirectionIcon(enums.ProtectionGroupStateVisual.Protected);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-direction--protected');
        result = vpgsCardsModel.setDirectionIcon(enums.ProtectionGroupStateVisual.Recovery);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-direction--recovery');
        result = vpgsCardsModel.setDirectionIcon(enums.ProtectionGroupStateVisual.SelfProtected);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-direction--self');
    });

    it('should set the target site icon', function () {
        var defaultClass = 'vpgs-cards-component__card-info-item vpgs-cards-component__card-info-type ',

            result = vpgsCardsModel.setTargetSiteIcon(enums.VpgEntityType.VCVpg);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-type--vc');
        result = vpgsCardsModel.setTargetSiteIcon(enums.VpgEntityType.VCDvApp);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-type--vcd');
        result = vpgsCardsModel.setTargetSiteIcon(enums.VpgEntityType.Aws);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-type--aws');
        result = vpgsCardsModel.setTargetSiteIcon(enums.VpgEntityType.HyperV);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-type--hyperv');
        result = vpgsCardsModel.setTargetSiteIcon(enums.VpgEntityType.Azure);
        expect(result).toEqual(defaultClass + 'vpgs-cards-component__card-info-type--azure');
    });

    it('should set the alert icon', function () {
        var defaultClass = 'vpgs-cards-component__card-title-status ',

            result = vpgsCardsModel.setAlertIcon(enums.ProtectionGroupAlertStatus.Normal);
        expect(result).toEqual({classNames: defaultClass + 'vpgs-cards-component__card-title-status--ok'});
        result = vpgsCardsModel.setAlertIcon(enums.ProtectionGroupAlertStatus.Error);
        expect(result).toEqual({classNames: defaultClass + 'vpgs-cards-component__card-title-status--error'});
        result = vpgsCardsModel.setAlertIcon(enums.ProtectionGroupAlertStatus.Warning);
        expect(result).toEqual({classNames: defaultClass + 'vpgs-cards-component__card-title-status--alert'});
    });

    it('should set the vpg state progress', function () {
        var stateData = {
            display: 'state',
            showProgress: false
        };

        var result = vpgsCardsModel.setProgress({}, stateData);
        expect(result).toEqual({label: {css: 'progress-span', display: 'state', title: 'state'}});

        stateData.showProgress = true;
        stateData.value = 50;
        result = vpgsCardsModel.setProgress({}, stateData);
        expect(result).toEqual({
            label: {
                css: 'progress-span',
                display: 'state',
                title: 'state'

            },
            value: {
                css: 'progress-bar progress-bar-danger',
                role: 'progressBar',
                min: 0,
                max: 100,
                now: 50,
                width: 50 + '%'
            }
        });
    });

    it('should set the vpg task progress', function () {
        var taskData = {
            process: {
                display: 'Testing Failover',
                value: 42
            },
            operation: {
                progressValue: 42,
                showProgress: false,
                stopTestButton: false,
                resumeButton: false,
                stopBackupButton: false,
                stopCloneButton: false,
                rollbackCommitButton: false
            }
        };

        var result = vpgsCardsModel.setProgress(taskData, {});
        expect(result).toEqual({
            label: {
                css: 'progress-span',
                display: 'Testing Failover',
                title: 'GRID_COLUMNS.OPERATION'
            }, buttons: []
        });

        taskData.operation.showProgress = true;
        result = vpgsCardsModel.setProgress(taskData, {});
        expect(result).toEqual({
            label: {
                css: 'progress-span',
                display: 'Testing Failover',
                title: 'Testing Failover'
            },
            value: {
                css: 'progress-bar progress-bar-danger',
                role: 'progressBar',
                min: 0,
                max: 100,
                now: 42,
                width: '42%'
            }, buttons: []
        });

        taskData.operation.stopTestButton = true;
        result = vpgsCardsModel.setProgress(taskData, {});
        expect(result).toEqual({
            label: {
                css: 'progress-span',
                display: 'Testing Failover',
                title: 'Testing Failover'
            },
            value: {
                css: 'progress-bar progress-bar-danger',
                role: 'progressBar',
                min: 0,
                max: 100,
                now: 42,
                width: '42%'
            },
            buttons: [
                {
                    action: 'Vpg::StopFot',
                    css: 'stop-btn',
                    title: 'STOP',
                    showText: true
                }
            ]
        });
    });

    it('should build buttons array', function () {
        var result,
            operation = {stopTestButton: true};

        result = vpgsCardsModel.buildButtons(operation);
        expect(result).toEqual([tester(vpgsListEvents.stopFot, 'stop-btn', 'STOP', true)]);

        operation = {stopBackupButton: true};
        result = vpgsCardsModel.buildButtons(operation);
        expect(result).toEqual([tester(vpgsListEvents.stopBackup, 'stop-btn', 'STOP', true)]);

        operation = {stopCloneButton: true};
        result = vpgsCardsModel.buildButtons(operation);
        expect(result).toEqual([tester(vpgsListEvents.stopClone, 'stop-btn', 'STOP', true)]);

        operation = {resumeButton: true};
        result = vpgsCardsModel.buildButtons(operation);
        expect(result).toEqual([tester(vpgsListEvents.resume, 'resume-btn', 'RESUME', true)]);


        operation = {rollbackCommitButton: true};
        result = vpgsCardsModel.buildButtons(operation);
        expect(result).toEqual([
            tester(vpgsListEvents.commit, 'commit-btn', 'Commit', false),
            tester(vpgsListEvents.rollback, 'rollback-btn', 'Rollback', false)]);


        function tester(action, css, title, showText) {
            return {
                action: action,
                css: css,
                title: title,
                showText: showText
            };
        }
    });

    it('should get sort by values', function () {
        var values = vpgsCardsModel.getSortByValues(),
            value, valid = [];
        for (var i = 0; i < values.length; i++) {
            value = values[i];
            if (Object.keys(value).length == 3 && value.hasOwnProperty('name') && value.hasOwnProperty('field') && value.hasOwnProperty('views')) {
                valid.push(value);
            }
        }

        expect(values.length).toEqual(valid.length);

    });

    it('should get selected sort by', function () {
        var columns = vpgsCardsModel.getSortByValues();

        var selected = vpgsCardsModel.getSelectedSortBy();
        expect(selected.field).toBe(columns[0].field);
        selected = vpgsCardsModel.getSelectedSortBy({sortField: 'Zubumafu', sortAsc: 'true'});
        expect(selected.field).toBe(columns[0].field);

        selected = vpgsCardsModel.getSelectedSortBy({sortField: 'Direction', sortAsc: 'true'});
        expect(selected.field).toBe(columns[2].field);

    });

    it('should force render', function () {
        expect(vpgsCardsModel.getReactNotifier()).toBeDefined();
        spyOn(vpgsCardsModel.getReactNotifier(), 'notify');
        vpgsCardsModel.forceRender();
        expect(vpgsCardsModel.getReactNotifier().notify).toHaveBeenCalledWith({
            key: zNotificationConstant.NG_REACT,
            value: 'vpgCards'
        });
    });


    it('should notify filter changes', function () {
        spyOn(vpgsCardsModel.getFilterNotifier(), 'notify');
        spyOn(vpgsCardsModel.getSelectedNotifier(), 'notify');

        vpgsCardsModel.updateSelectedFiltersDisplay();
        expect(vpgsCardsModel.getFilterNotifier().notify).toHaveBeenCalledWith({
            key: zNotificationConstant.CARD_FILTER_CHANGE
        });
        expect(vpgsCardsModel.getSelectedNotifier().notify).toHaveBeenCalledWith({
            key: zNotificationConstant.CARD_SELECTED_FILTER_CHANGE
        });
    });

    it('should check if filter button is active', function () {
        var filters = [{isFilterActive: true}],
            result = vpgsCardsModel.isFilterButtonActive(filters);

        expect(result).toBe(true);

        filters = [{isFilterActive: false}];
        result = vpgsCardsModel.isFilterButtonActive(filters);
        expect(result).toBe(false);
    });
});
