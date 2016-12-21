'use strict';

angular.module('zvmApp.core')
    .filter('replistFuncFilter',function () {
        return function (row) {
            var data = row.entity;
            var result = '';
            if(data.IsEdit){
                result = result + 'Edit' + ' ';
            }
            if(data.IsDelete && data.ActiveJobs < 1){
                result = result + 'Delete';
            }

            return result;
        };
    });