'use strict';

var jsdoc = require('./jsdoc.js');
var indentHelper = require('./indentHelper.js');

exports.generate = function(ops){
    var i = indentHelper.createNew();
    i.addIndent();
    i.addIndent();
// initate file writing string and helpers

    ops.forEach(function (opObject) {
        if (opObject.resultType)
        {
            i.line(jsdoc.start);
            i.line(jsdoc.param('function(' + opObject.resultType + ')', 'callback'));
            i.line(jsdoc.deferredName(opObject.name));
            i.line(jsdoc.end);
        }
        i.line(jsdoc.start);
        opObject.params.forEach(function (param) {
            i.line(jsdoc.param(param.type, param.name));
        });
        if (opObject.resultType)
        {
            i.line(jsdoc.returns(opObject.name, opObject.resultType));
        }else{
            i.line(jsdoc.returnsVoid);
        }
        i.line(jsdoc.end);
        var parameterNames = opObject.params.map(function(item){return item.name;}).join(', ')
        i.line('zertoServiceFactory.' + opObject.name + ' = function ' + opObject.name + '(' + parameterNames + ') {');
        i.addIndent();
        i.line('return invoke(\'' + opObject.name + '\', [' + parameterNames + ']);');
        i.removeIndent();
        i.line('};');
    });

    return i.getOutput();
}
