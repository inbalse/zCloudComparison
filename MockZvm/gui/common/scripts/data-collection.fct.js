'use strict';

angular.module('zvmApp.dataCollection')
    .factory('dataCollectionFactory', function ($translate, enums) {
        var dataCollectionFactory = {};

        var minutes = $translate.instant('SCHEDULE_PERIOD_TYPES.MINUTES');
        var hours = $translate.instant('SCHEDULE_PERIOD_TYPES.HOURS');
        var iops = $translate.instant('METRICS.IOPS');
        var mbPerSec = $translate.instant('METRICS.MB_PER_SEC');
        var hours_short = $translate.instant('METRICS.HOURS_SHORT');
        var minutes_short = $translate.instant('METRICS.MINUTES_SHORT');


        dataCollectionFactory.REPLICATION_PAUSE_COLLECTION = [
            {'value': 0, 'label': 'None'},
            {'value': 30, 'label': '30 ' + minutes},
            {'value': 40, 'label': '40 ' + minutes},
            {'value': 50, 'label': '50 ' + minutes},
            {'value': 60, 'label': '1 ' + $translate.instant('SCHEDULE_PERIOD_TYPES.HOUR')},
            {'value': 90, 'label': '1.5 ' + hours},
            {'value': 120, 'label': '2 ' + hours},
            {'value': 150, 'label': '2.5 ' + hours},
            {'value': 180, 'label': '3 ' + hours},
            {'value': 210, 'label': '3.5 ' + hours},
            {'value': 240, 'label': '4 ' + hours},
            {'value': 300, 'label': '5 ' + hours},
            {'value': 360, 'label': '6 ' + hours},
            {'value': 420, 'label': '7 ' + hours},
            {'value': 480, 'label': '8 ' + hours},
            {'value': 540, 'label': '9 ' + hours},
            {'value': 600, 'label': '10 ' + hours},
            {'value': 660, 'label': '11 ' + hours},
            {'value': 720, 'label': '12 ' + hours},
            {'value': 1080, 'label': '18 ' + hours},
            {'value': 1440, 'label': '24 ' + hours}
        ];

        dataCollectionFactory.IOPS_GRAPH_SCALE_COLLECTION = [
            {'value': 0, 'label': $translate.instant('METRICS.AUTO')},
            {'value': 50, 'label': '50 ' + iops},
            {'value': 100, 'label': '100 ' + iops},
            {'value': 500, 'label': '500 ' + iops},
            {'value': 1000, 'label': '1000 ' + iops}
        ];

        dataCollectionFactory.MB_PER_SEC_GRAPH_SCALE_COLLECTION = [
            {'value': 0, 'label': $translate.instant('METRICS.AUTO')},
            {'value': 10, 'label': '10 ' + mbPerSec},
            {'value': 20, 'label': '20 ' + mbPerSec},
            {'value': 50, 'label': '50 ' + mbPerSec},
            {'value': 100, 'label': '100 ' + mbPerSec},
            {'value': 500, 'label': '500 ' + mbPerSec}
        ];

        dataCollectionFactory.RPO_GRAPH_SCALE_COLLECTION = [
            {'value': 0, 'label': $translate.instant('METRICS.AUTO')},
            {'value': 60, 'label': '1 ' + $translate.instant('SCHEDULE_PERIOD_TYPES.MINUTE')},
            {'value': 180, 'label': '3 ' + minutes},
            {'value': 300, 'label': '5 ' + minutes},
            {'value': 720, 'label': '12 ' + minutes},
            {'value': 1500, 'label': '25 ' + minutes}
        ];

        dataCollectionFactory.COPY_NAT_SERVICE_COLLECTION = [
            {'value': 1, 'label': $translate.instant('COPY_NAT_SERVICE_COLLECTION.COPY_AS_IS')},
            {'value': 2, 'label': $translate.instant('COPY_NAT_SERVICE_COLLECTION.CONVERT_AUTO_TO_MANUAL_AND_RETAIN_EXTERNAL_IP')}
        ];

        dataCollectionFactory.PERCENTAGE_COLLECTION = [
            {'value': 0, 'label': $translate.instant('METRICS.AUTO')},
            {'value': 1, 'label': '1 %'},
            {'value': 5, 'label': '5 %'},
            {'value': 10, 'label': '10 %'},
            {'value': 50, 'label': '50 %'},
            {'value': 100, 'label': '100 %'}
        ];

        dataCollectionFactory.RESOURCE_REPORT_COLLECTION = [
            {
                'value': enums.ResourcesReportSettings_SamplingResolution.Daily,
                'label': $translate.instant('SCHEDULE_PERIOD_TYPES.DAILY')
            },
            {
                'value': enums.ResourcesReportSettings_SamplingResolution.Hourly,
                'label': $translate.instant('SCHEDULE_PERIOD_TYPES.HOURLY')
            }
        ];

        dataCollectionFactory.RESOURCE_REPORTS_HOURS_COLLECTION = [];
        function loadHours() {
            for (var i = 0; i <= 23; i++) {
                var str;
                if (i < 10) {
                    str = '0' + i;
                } else {
                    str = i;
                }
                dataCollectionFactory.RESOURCE_REPORTS_HOURS_COLLECTION.push({
                    label: str + ' ' + hours_short,
                    value: i
                });
            }
        }

        loadHours();

        dataCollectionFactory.RESOURCE_REPORTS_MINUTES_COLLECTION = [];
        function loadMinutes() {
            for (var i = 0; i <= 59; i++) {
                var str;
                if (i < 10) {
                    str = '0' + i;
                } else {
                    str = i;
                }
                dataCollectionFactory.RESOURCE_REPORTS_MINUTES_COLLECTION.push({
                    label: str + ' ' + minutes_short,
                    value: i
                });
            }
        }

        loadMinutes();

        dataCollectionFactory.DAYS_OF_WEEK = [
            {name: $translate.instant('DAYS.MONDAY'), value: enums.DayOfWeek.Monday},
            {name: $translate.instant('DAYS.TUESDAY'), value: enums.DayOfWeek.Tuesday},
            {name: $translate.instant('DAYS.WEDNESDAY'), value: enums.DayOfWeek.Wednesday},
            {name: $translate.instant('DAYS.THURSDAY'), value: enums.DayOfWeek.Thursday},
            {name: $translate.instant('DAYS.FRIDAY'), value: enums.DayOfWeek.Friday},
            {name: $translate.instant('DAYS.SATURDAY'), value: enums.DayOfWeek.Saturday},
            {name: $translate.instant('DAYS.SUNDAY'), value: enums.DayOfWeek.Sunday}
        ];

        dataCollectionFactory.MAINTAIN_HISTORY_TYPE = [
            {label: 'Days', value: 1},
            {label: 'Hours', value: 2}
        ];

        dataCollectionFactory.MAX_RPO_IN_SEC = [
            {label: '10', value: 10},
            {label: '20', value: 20},
            {label: '30', value: 30},
            {label: '40', value: 40},
            {label: '50', value: 50}
        ];
        
        dataCollectionFactory.MAX_RPO_IN_MIN = [
            {label: '1', value: 60},
            {label: '2', value: 120},
            {label: '3', value: 180},
            {label: '4', value: 240},
            {label: '5', value: 300},
            {label: '6', value: 360},
            {label: '7', value: 420},
            {label: '8', value: 480},
            {label: '9', value: 540},
            {label: '10', value: 600},
            {label: '11', value: 660},
            {label: '12', value: 720},
            {label: '13', value: 780},
            {label: '14', value: 840},
            {label: '15', value: 900},
            {label: '20', value: 1200},
            {label: '25', value: 1500},
            {label: '30', value: 1800},
            {label: '45', value: 2700}
        ];
        
        dataCollectionFactory.MAX_RPO_IN_HR = [
            {label: '1', value: 3600},
            {label: '1:15', value: 4500},
            {label: '1:30', value: 5400},
            {label: '1:45', value: 6300},
            {label: '2', value: 7200},
            {label: '3', value: 10800},
            {label: '4', value: 14400},
            {label: '5', value: 18000},
            {label: '6', value: 21600},
            {label: '7', value: 25200},
            {label: '8', value: 28800},
            {label: '9', value: 32400},
            {label: '10', value: 36000},
            {label: '11', value: 39600},
            {label: '12', value: 43200}
        ];

        dataCollectionFactory.TEST_PERIOD = [
            {label: '1 Month', value: 43200}, 		// 30*24*60
            {label: '3 Months', value: 131040}, 	// 91*24*60
            {label: '6 Months', value: 262080},	// 182*24*60
            {label: '9 Months', value: 394560},	// 274*24*60
            {label: '12 Months', value: 525600}, 	// 365*24*60
            {label: 'None', value: 0}	           // 365*24*60
        ];


        dataCollectionFactory.REPLICATION_TYPE = {
            DATASTORE: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_TYPES.0'), value: 0},
            EXISTING: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_TYPES.1'), value: 1},
            NEW_DISK: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_TYPES.2'), value: 2},
            PRESEED: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_TYPES.3'), value: 3},
            VCD_PROFILE: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_TYPES.4'), value: 4}
        };

        dataCollectionFactory.SCVMM_REPLICATION_TYPE = {
            STORAGE: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_STORAGE_TYPES.0'), value: 0},
            EXISTING: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_STORAGE_TYPES.1'), value: 1},
            NEW_DISK: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_STORAGE_TYPES.2'), value: 2},
            PRESEED: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_STORAGE_TYPES.3'), value: 3},
            VCD_PROFILE: {label: $translate.instant('ENUM.REPLICATION_DESTINATION_STORAGE_TYPES.4'), value: 4}
        };

        dataCollectionFactory.REPLICATION_DESTINATION_TYPES = [
            dataCollectionFactory.REPLICATION_TYPE.DATASTORE,
            dataCollectionFactory.REPLICATION_TYPE.EXISTING,
            dataCollectionFactory.REPLICATION_TYPE.NEW_DISK,
            dataCollectionFactory.REPLICATION_TYPE.PRESEED
        ];
        dataCollectionFactory.VCD_REPLICATION_DESTINATION_TYPES = [
            dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE,
            dataCollectionFactory.REPLICATION_TYPE.PRESEED
        ];

        dataCollectionFactory.SCVMM_REPLICATION_DESTINATION_TYPES = [
            dataCollectionFactory.SCVMM_REPLICATION_TYPE.STORAGE,
            dataCollectionFactory.SCVMM_REPLICATION_TYPE.PRESEED
        ];
        return dataCollectionFactory;
    });
