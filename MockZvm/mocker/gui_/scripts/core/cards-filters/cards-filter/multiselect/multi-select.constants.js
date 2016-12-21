'use strict';
angular.module('zvmApp.constant')
    .constant('multiSelectClassConstants', {
        FORMATTER_TYPE: {
            DISPLAY: 0,
            CLASS: 1,
            CLASS_GROUP: 2,
            BACKUP_STATUS: 3
        },
        CLASS_NAMES: {
            DIRECTION: 'protection-group-state-visual',
            PRIORITY: 'protection-group-priority'
        }
    });
