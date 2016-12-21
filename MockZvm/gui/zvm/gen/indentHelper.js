'use strict';

exports.createNew = function(){
    var currentIndent = ''
    var indent = '    ';
    var output = '';

    return {
        addIndent : function(){
            currentIndent += indent;
        },
        removeIndent : function(){
            currentIndent = currentIndent.replace(indent, '');
        },
        line : function (line) {
            output += currentIndent + line + '\r\n';
        },
        getOutput: function () {
            return output;
        }
    }
};