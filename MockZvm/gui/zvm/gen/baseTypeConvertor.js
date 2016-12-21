'use strict';

var BASE_TYPE_CONVERT_TABLE = {
    'dateTime' : 'date',
    'base64Binary' : 'string',
    'float' : 'number',
    'double' : 'number',
    'long' : 'number',
    'int' : 'number',
    'integer' : 'number',
    'nonPositiveInteger' : 'number',
    'nonNegativeInteger' : 'number',
    'unsignedInt' : 'number',
    'short' : 'number',
    'unsignedByte' : 'number',
    'byte' : 'number',
    'unsignedShort' : 'number',
    'unsignedLong' : 'number',
    'negativeInteger' : 'number',
    'positiveInteger' : 'number',
    'guid' : 'string',
    'ExistingDiskSearchFlags' : 'Object',
    'string' : 'string',
    'boolean' : 'boolean'
};

var UNSUPPORTED_WSDL_TYPES = ['duration', 'time', 'date', 'gYearMonth', 'gYear', 'gMonthDay', 'gDay', 'gMonth',
    'hexBinary', 'anyURI', 'QName', 'NOTATION', 'normalizedString', 'token', 'language', 'Name', 'NMTOKEN',
    'NCName', 'NMTOKENS', 'ID', 'IDREF', 'ENTITY', 'ENTITIES', 'IDREFS'];

exports.convert = function(baseType, isEnum) {
    var splitted = baseType.split('[');
    var type = splitted[0];
    var out;
    if (UNSUPPORTED_WSDL_TYPES.indexOf(type) !== -1)
    {
        throw('Unsupported wsdl type found : ' + type);
    }
    if (BASE_TYPE_CONVERT_TABLE.hasOwnProperty(type))
    {
        out = BASE_TYPE_CONVERT_TABLE[type];
    }else{
        out = (isEnum ? 'enums.' : 'vos.') + type;
    }

    return out + (splitted.length > 1 ? '[]' : '');
};
