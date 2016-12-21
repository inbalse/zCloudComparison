'use strict';
/**
 * using xpath see https://github.com/goto100/xpath
 * using xmldom see https://github.com/jindw/xmldom
 * using XPath see http://www.w3schools.com/XPath/xpath_syntax.asp
 * generating JSDoc, see http://usejsdoc.org/index.html
 *
 * npm install xpath
 * npm install xmldom
 */

var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var baseTypeConvertor = require('./baseTypeConvertor.js');
var nsManager = {wsdl: 'http://schemas.xmlsoap.org/wsdl/', xsd: 'http://www.w3.org/2001/XMLSchema'};
var names = {enums: [], vos: []};

var dotsTo_ = function (str) {
    return str.replace(/\./g, '_');
};

var typePrefixer = function (type) {
    if (names.vos.indexOf(type) > -1) {
        return 'vos.' + type;
    } else if (names.enums.indexOf(type) > -1) {
        return 'enums.' + type;
    }
    return type;
};

var getType = function getType(nsTypeName) {
    // nsTypeName always comes with namespace.
    // Example - someNameSpace:name
    var name = nsTypeName.split(':')[1];
    // using underscore unstead of dots!!
    name = dotsTo_(name);
    // if name starts with ArrayOf it means the type is Array and we remove ArrayOf and concat []
    var arr = name.split('ArrayOf');
    var isEnum = names.enums.indexOf(arr[arr.length > 1 ? 1 : 0]) !== -1;

    if (arr.length > 1) {
        return typePrefixer(baseTypeConvertor.convert(arr[1], isEnum)) + '[]';
    }

    return typePrefixer(baseTypeConvertor.convert(name, isEnum));
};

exports.parse = function (xml) {
    var doc = new dom().parseFromString(xml);
    var select = xpath.useNamespaces(nsManager);
    var gchild = select('//wsdl:binding/wsdl:operation', doc);

    var ops = [];
    gchild.forEach(function(c){
        if (c.hasAttribute('name')) {
            ops.push(c.getAttribute('name'));
        }
    });
    // populate myEnums with all enums
    var myEnums = [];
    select('//xsd:simpleType[@name]/xsd:restriction[@base="xsd:string"]/..',doc).forEach(function (myEnum) {
        var enumObject = {
            name: dotsTo_(myEnum.getAttribute('name')),
            enumerations: []
        };
        names.enums.push(enumObject.name);
        select('xsd:restriction/xsd:enumeration', myEnum).forEach(function (enumeration) {
            enumObject.enumerations.push(enumeration.getAttribute('value'));
        });

        myEnums.push(enumObject);
    });

    myEnums.sort(function (enumObjectA, enumObjectB) {
        return enumObjectA.name.localeCompare(enumObjectB.name);
    });

    // populate myTypes with all vos
    var myTypes = [];

    select('//xsd:complexType[@name]',doc).forEach(function (type) {
        var typeName = dotsTo_(type.getAttribute('name'));
        if (typeName.indexOf('ArrayOf') !== 0) {
            var typeObject = {
                name: typeName,
                props: []
            };
            names.vos.push(typeObject.name);
            select('xsd:sequence/xsd:element',type).forEach(function (property) {
                var propertyObject = {
                    name: property.getAttribute('name'),
                    type: getType(property.getAttribute('type'))
                };
                typeObject.props.push(propertyObject);
            }, type);
            myTypes.push(typeObject);
        }
    });

    myTypes.sort(function (typeObjectA, typeObjectB) {
        return typeObjectA.name.localeCompare(typeObjectB.name);
    });

    var myOperations = [];
    ops.sort();
    ops.forEach(function (op) {
        var resultTypeString;
        var res = select('//xsd:element[@name="' + op + 'Result"]', doc)[0];
        if (res) {
            resultTypeString = getType(res.getAttribute('type'));
        }
        var opObject = {
            name: op,
            params: [],
            resultType: resultTypeString
        };
        select('//xsd:element[@name="' + op + '"]/xsd:complexType/xsd:sequence/xsd:element', doc).forEach(function (param) {
            var paramObject = {
                name: param.getAttribute('name'),
                type: getType(param.getAttribute('type'))
            };
            opObject.params.push(paramObject);
        });
        myOperations.push(opObject);
    });

    return {parsedEnums: myEnums, parsedVos: myTypes, parsedOps: myOperations};
};
