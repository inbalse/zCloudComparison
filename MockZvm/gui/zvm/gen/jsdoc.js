'use strict';

var start = '/**';
var end = ' */';

exports.start = start;

exports.end = end;

exports.param = function (type, name){
    return ' * @param {' + type + '} ' + name + ' {@link ' + type + '}';
};

exports.optionalParam = function (type, name){
    return ' * @param {' + type + '} [' + name + '] {@link ' + type + '}';
};

exports.constructor = ' * @constructor';

exports.type = function (type) {
    return start + ' @type {' + type + '}' + end;
};

exports.enumHead = function(name) {
    return ' * Enum for ' + name + ' values.';
};

exports.readonly = ' * @readonly';

exports.enumType = ' * @enum {number}';

exports.deferredName = function(name) {
    return ' * @name _Deferred_' + name + '.then';
};

exports.returns = function(name, resultType) {
    return ' * @returns {_Deferred_' + name + '} a promise with a callback with result {@link ' + resultType + '}';
};

exports.returnsVoid = ' * @returns {Promise} a promise with an empty callback (void)';
