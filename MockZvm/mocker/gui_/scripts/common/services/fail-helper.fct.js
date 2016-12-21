'use strict';

angular.module('zvmApp.services')
    .factory('failHelperFactory', function ($translate) {
        var failHelperFactory = {};

        failHelperFactory.failHelper = function(errors, failHandler, validationList){
            return function (statement, validationError ,elementId){
                if (statement){
                    if (angular.isDefined(elementId)){
                        validationList.push({id:elementId, error:$translate.instant(validationError)});
                    }else
                    if (angular.isDefined(validationError)){
                        errors.push($translate.instant(validationError));
                    }

                    failHandler();

                }
            };
        };
        return failHelperFactory;
    });

