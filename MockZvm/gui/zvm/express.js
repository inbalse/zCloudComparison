// app.js
var express = require('express');
var morgan = require('morgan');
var app = module.exports.app = exports.app = express();
var open = require('open');
var serveStatic = require('serve-static');
var proxies = require('./gulp/proxies')();
var proxyMiddleware = require('http-proxy-middleware');

//app.use(morgan('dev'));
app.use(serveStatic('app/'));
app.use('/scripts/common', serveStatic('../common/scripts'));
app.use('/i18n', serveStatic('../common/i18n'));
app.use('/vendor', serveStatic('../common/vendor'));
app.use('/styles/images', serveStatic('../common/styles/images'));
app.use('/styles/select2.png', serveStatic('../common/styles/select2.png'));

var proxy = proxies.build(process.env.target);
var context = [proxy.path.VQ, proxy.path.REST];
var options = {
    target: proxy.targetHost,
    secure: false
};

app.use(proxyMiddleware(context, options));

app.listen(proxy.localPort, function () {
    console.log('Express running ' + process.env.target + ' console on port ' + proxy.localPort);
    open('http://localhost:' + proxy.localPort, 'chrome');
});
