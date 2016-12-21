'use strict';
angular.module('zvmApp.components')
    .constant('vpgCardGaugeConstants', {
        DISPLAY_NAME: 'VPGCardGaugeComponent',
        GAUGE_REF: 'gauge',
        BG_REF: 'bg',

        CONTAINER: {
            RADIUS: 53,
            LINE_CAP: 'round',
            LINE_WIDTH: 14,
            DIAMETER_WIDTH: 120,
            DIAMETER_HEIGHT: 93
        },
        BACKGROUND: {
            COLOR: '#c5d0da',
            START_DEGREES: 25,
            END_DEGREES: 155
        },
        DIVIDER: {
            CLASS: 'gauge-divider'
        },
        GAUGE: {
            RANGE: {
                Q1: 25,
                Q2: 90,
                Q3: 90,
                Q4: 25
            },
            MID_POINTS: {
                Q1: 0.25,
                Q2: 0.5,
                Q3: 0.625
            },
            SLA_MULTIPLIER: 2,
            QUARTER_DEGREES: {
                Q1: 0,
                Q2: 25,
                Q3: 115,
                Q4: 205
            },
            QUARTER: 4,
            START_DEGREES: 155,
            END_DEGREES: 385,
            MIN_DEGREES: 160,
            COLOR_MEETING_SLA: '#5da139',
            COLOR_WARNING: '#eb9b03',
            COLOR_NOT_MEETING_SLA: '#db5a51'
        }
    });
