// DON'T TOUCH, MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE CI PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
try {
    var DevConfig = require('./../devConfig');
} catch (err) {
    console.log("DevConfig file is not available.");
}
// DON'T TOUCH, MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE CI PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
var argv = require('yargs').argv;

module.exports = function () {
// DON'T TOUCH, MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE CI PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    var config = {
        target: argv.target || 'dist'
    };
// DON'T TOUCH, MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE CI PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    if (DevConfig !== undefined) {
        config = new DevConfig();
    }

    //dynamic destination path
    var target = config.target;
// DON'T TOUCH, MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE CI PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    return {
        destAppStyles: 'app/styles',
        destAppStylesImages: '../common/styles/images',
        destScripts: target + '/scripts/',
        destAssets: target + '/assets',
        destTranslate: target + '/i18n',
        destStyles: target + '/styles',
        destStylesFonts: target + '/styles/images',

        dist: target
    }
};
// DON'T TOUCH, MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE CI PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
