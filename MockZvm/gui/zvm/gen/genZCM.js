'use strict';

var fs = require('fs');
var wsdlParser = require('./wsdlParser.js');
var generateOps = require('./generateOps.js');
var generateVos = require('./generateVos.js');
var generateEnums = require('./generateEnums.js');

var options = {encoding : 'utf8'};
var baseOutputPath = '../app/scripts/zcm/services/';

var out = wsdlParser.parse(fs.readFileSync('ZcmZertoService.xml', options));

var vos = generateVos.generate(out.parsedVos);
var ops = generateOps.generate(out.parsedOps);
var enums = generateEnums.generate(out.parsedEnums);

var replaceBetweenTags = function(str, content) {
    return str.replace(/\/\/ start of auto generated code. DO NOT MODIFY[^]+\/\/ end of auto generated code. DO NOT MODIFY/,
        '// start of auto generated code. DO NOT MODIFY\r\n' + content + '\r\n        // end of auto generated code. DO NOT MODIFY');
};
 
fs.writeFileSync(baseOutputPath + 'zcm-service.fct.js',
    replaceBetweenTags(fs.readFileSync(baseOutputPath + 'zcm-service.fct.js', options),
        ops), options);
fs.writeFileSync(baseOutputPath + 'zcm-vos.fct.js', vos, options);
fs.writeFileSync(baseOutputPath + 'zcm-enums.fct.js', enums, options);
