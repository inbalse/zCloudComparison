'use strict';

var jsdoc = require('./jsdoc.js');
var indentHelper = require('./indentHelper.js');

exports.generate = function(enums){
    var i = indentHelper.createNew();
    i.line("'use strict';");
    i.line("angular.module('zvmApp.services').factory('enums', function(){");
    i.addIndent();
    i.line("");
    i.line("/* jshint ignore:start */");
    i.line("var enums = {};");
    enums.forEach(function (enumObject) {
        i.line(jsdoc.start);
        i.line(jsdoc.enumHead(enumObject.name));
        i.line(jsdoc.readonly);
        i.line(jsdoc.enumType);
        i.line(jsdoc.end);
        i.line('enums.' + enumObject.name + ' = {');
        i.addIndent();
        var counter = 0;
        var ending = ',';
        enumObject.enumerations.forEach(function (enumValue) {
            if (enumObject.enumerations.length === counter + 1)
            {
                ending = '';
            }
            i.line(enumValue + ': ' + counter.toString() + ending);
            counter++;
        });
        i.removeIndent();
        i.line('};');
    });
    i.line('');
    i.line('return enums;');
    i.line("/* jshint ignore:end */");
    i.removeIndent();
    i.line("});");

    return i.getOutput();
};