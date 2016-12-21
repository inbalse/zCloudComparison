'use strict';

angular.module('zvmApp.filters')
    .filter('linkFormatter', function (){
        return function (nameField, linkField) {
            return function (row, cell, value, columnDef, dataContext) {
                return '<a href="' + dataContext[linkField] + '" target="_blank">' +
                    dataContext[nameField] + '</a>';
            };
        };
    })
    .filter('linkFormatterWithIcon', function () {
        return function (nameField, linkField, className) {
            return function (row, cell, value, columnDef, dataContext) {
                return '<a href="' + dataContext[linkField] + '" target="_blank"><span class="link-icon-formatter">' +
                    nameField + '</span><div class="' + className + '"></div></a>';
            };
        };
    });


