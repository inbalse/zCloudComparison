'use strict';

var jsdoc = require('./jsdoc.js');
var indentHelper = require('./indentHelper.js');

exports.generate = function(vos){
    var i = indentHelper.createNew();
    i.line("'use strict';");
    i.line("angular.module('zvmApp.services').factory('vos', function(){");
    i.addIndent();
    i.line("");
    i.line("/* jshint ignore:start */");
    i.line("var vos = {};");
    vos.forEach(function (typeObject) {

        i.line(jsdoc.start);
        typeObject.props.forEach(function (prop) {
            i.line(jsdoc.optionalParam(prop.type, prop.name));
        });
        i.line(jsdoc.constructor);
        i.line(jsdoc.end);
        i.line('vos.' + typeObject.name + ' = function(' + typeObject.props.map(function(item){return item.name;}).join(', ') + '){');
        i.addIndent();

        typeObject.props.forEach(function (prop) {
            i.line(jsdoc.type(prop.type));
            i.line('this.' + prop.name + ' = ' + prop.name + ';');
        });

        i.removeIndent();
        i.line('};');
    });
    i.line('');
    i.line('return vos;');
    i.line("/* jshint ignore:end */");
    i.removeIndent();
    i.line("});");
    return i.getOutput();
};
