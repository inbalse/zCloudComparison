'use strict';
angular.module('zvmApp.core')
    .controller('eventsListController', function ($rootScope, $scope, $window, $compile, eventsListModel, zSlickGridFilterTypes,
                                                  $http, $filter, enums, zSaveAs, $translate, busyOverlayService, siteSettingsFactory) {

        var DESCRIPTION_FIELD = 'DescriptionObj',
            TIME_STAMP_FIELD = 'TimeStampObj';

        var columnDefs = [
            {
                name: '',
                hideFromEditColumns: true,
                maxWidth: 30,
                resizable: false,
                field: 'EventTypeIconObj',
                formatter: $filter('enumToCssWithTooltipClassFormatter')('events-list-level-status')
            },
            {
                name: 'ID',
                field: 'HelpId',
                filter: zSlickGridFilterTypes.WILDCARD,
                formatter: $filter('linkFormatter')('HelpId', 'alertLink')
            },
            {
                name: 'Type', field: 'EventType', filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {
                name: 'Entity', field: 'Entity', filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'ZORG', field: 'ZertoOrganizationName', filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'Site', field: 'ProtectedSiteName', filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'User', field: 'User', filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: 'VPG',
                field: 'VpgName',
                filter: zSlickGridFilterTypes.WILDCARD,
                formatter: $filter('eventsNameRenderer')
            },
            {
                name: 'Timestamp',
                field: TIME_STAMP_FIELD,
                formatter: $filter('objectFormatter'),
                filter: zSlickGridFilterTypes.DATE
            },
            {
                name: 'Description',
                field: DESCRIPTION_FIELD,
                formatter: $filter('objectFormatter'),
                filter: zSlickGridFilterTypes.WILDCARD
            }
        ];

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            }
        ];

        $scope.customOptions = {
            columns: columnDefs,
            showCheckbox: false,
            rowHeight: 60,
            showSearch: true,
            defaultSortField: TIME_STAMP_FIELD,
            defaultSortAsc: false
        };

        $scope.eventsDateRange = {};
        $scope.eventsDateRange.startDate = moment().startOf('month');
        $scope.eventsDateRange.endDate = moment().add(1, 'days');

        $scope.eventsDateRangeList = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };

        //grid event fire on row click
        $scope.rowClick = function (e, row, cell, grid) {
            if (cell === grid.getColumnIndex(DESCRIPTION_FIELD)) {
                e.preventDefault();
                e.stopPropagation();
                $compile($(e.target).closest('div'))($scope);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            }
        };

        $scope.eventType = enums.SystemEventType_GeneralEventType.Events;

        $translate(['ALERTS_LIST.ALL', 'ALERTS_LIST.EVENTS', 'ALERTS_LIST.ALERTS']).then(function (translations) {
            $scope.types = [
                {
                    'value': '0',
                    'label': translations['ALERTS_LIST.ALL']
                },
                {
                    'value': '1',
                    'label': translations['ALERTS_LIST.EVENTS']
                },
                {
                    'value': '2',
                    'label': translations['ALERTS_LIST.ALERTS']
                }
            ];
        });

        $scope.$on('eventIdClicked', function (event, value) {
            event.stopPropagation();
            var id = value === 'EV0001' ? 'events' : value;
            $window.open('/Help/index.html#page/ErrorsGuide/' + id + '.html');
        });

        $scope.exportEvents = function () {
            var eventGuidList = _.pluck(_.pluck($scope.data, 'EventIdentifier'), 'EventGuid').toString();
            zSaveAs.post('/ZvmService/EventReport/Events', eventGuidList);
        };

        $scope.rangeFilterChange = function () {
            if (angular.isArray($scope.data)) {
                eventsListModel.eventsDateRange($scope.eventsDateRange.startDate, $scope.eventsDateRange.endDate, $scope.eventType);
            }
        };

        $scope.handleApplyClick = function () {
            //get data with new range
            eventsListModel.getData().then(function (result) {
                $scope.data = result.Events;
            });
        };

        $scope.handleSiteSettingsClick = function () {
            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
        };

        $('input[type="daterange"]').on('click', function () {
            //event fire when Today choices just for first time
            $('div.daterangepicker').find('li').first().on('click', function () {
                if (angular.isArray($scope.data)) {
                    eventsListModel.eventsDateRange(moment(), moment(), $scope.eventType);
                    $(this).off('click');//remove event after one time use
                }
            });
            $(this).off('click');//remove event after one time use
        });

        $scope.$on('$destroy', function () {
            $('input[type="daterange"]').off('click');
        });


        $scope.handleResetClick = function () {
            $scope.eventsDateRange = {};
            $scope.eventsDateRange.startDate = moment().startOf('month');
            $scope.eventsDateRange.endDate = moment().add(1, 'days');
            $scope.eventType = enums.SystemEventType_GeneralEventType.Events;
            eventsListModel.eventsDateRange($scope.eventsDateRange.startDate, $scope.eventsDateRange.endDate, $scope.eventType);

            ///get data with default range
            $scope.handleApplyClick();
        };

        //request the site list data from server
        eventsListModel.getData().then(function (result) {
            $scope.data = result.Events;
        });

        $scope.$watch('eventType', function (newValue) {
            eventsListModel.eventsDateRange($scope.eventsDateRange.startDate, $scope.eventsDateRange.endDate, newValue);
        });
    });
