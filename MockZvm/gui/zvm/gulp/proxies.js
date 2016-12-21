// DON'T MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE DEVELOPMENT PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
try {
    var DevConfig = require('./../devConfig');
} catch (err) {
    console.log("DevConfig file is not available.");
}

module.exports = function () {
// DON'T MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE DEVELOPMENT PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    var devConfig = {
        host: 'localhost',
        localPort: {
            local: 9000,
            remote: 9001
        },
        port: {
            local: '9669',
            remote: '9670'
        }
    };
// DON'T MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE DEVELOPMENT PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    if (DevConfig !== undefined) {
        devConfig = new DevConfig();
    }
// DON'T MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE DEVELOPMENT PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    var zvmProxy = {
        host: devConfig.host,
        localPort: devConfig.localPort,
        port: devConfig.port,
        path: {
            VQ: '/ZvmService/VisualQueryProvider',
            REST: '/v1'
        }
    };
// DON'T MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE DEVELOPMENT PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    //target == local / remote
    function buildProxy(target) {
        return {
            targetHost: 'https://' + zvmProxy.host + ':' + zvmProxy.port[target],
            path: zvmProxy.path,
            localPort: zvmProxy.localPort[target]
        }
    }
// DON'T MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE DEVELOPMENT PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
    return {
        build: buildProxy
    }
};
// DON'T MODIFY OR ADD TO THIS FILE // YOU CAN CAUSE DEVELOPMENT PROBLEMS // MODIFICATION CONFIGURATION ONLY IN devConfig.js FILE
