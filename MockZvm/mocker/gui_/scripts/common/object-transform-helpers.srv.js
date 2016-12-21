'use strict';

angular.module('zvmApp.dataCollection')
    .service('objectTransformHelpersService', function (enums) {
        var objectTransformHelpersService = {};

        objectTransformHelpersService.JournalLimitTypeMBtoGB = function(value){
            if(parseInt(value.Type) === parseInt(enums.JournalLimitType.Megabytes)){
                value.Limit = value.Limit / 1024;
            }
        };

        objectTransformHelpersService.JournalLimitTypeGBtoMB = function(value){
            if(parseInt(value.Type) === parseInt(enums.JournalLimitType.Megabytes)){
                value.Limit = value.Limit * 1024;
            }
        };

        return objectTransformHelpersService;
    });
