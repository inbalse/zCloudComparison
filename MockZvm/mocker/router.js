'use strict';

const express = require('express');
const soap = require('soap');
const morgan = require("morgan");
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const server = express();
const logger = morgan('combined');

const helper = require('./helper')();
const hash = require('./hash/hash');
const load = require('./hash/load-hash');


//--- load the hash with key values ---//
load.static();
load.dynamic();
load.iZertoWeb();

//body parser middleware are supported (optional)
const jsonBodyParser = bodyParser.json({});

server.use(logger);

//use certificate and key for run over HTTPS for ZVM
https.createServer({
    key: fs.readFileSync('./https_certificate/key.pem'),
    cert: fs.readFileSync('./https_certificate/cert.pem')
}, server).listen(9669);

//get the response result
let response = (key) => {
    let data = hash.getMock(key);

    if (helper.isJsonStr(data)) {
        data = JSON.parse(data);
    }

    return data;
};

// (1) catch VQ requests
server.post('/ZvmService/VisualQueryProvider', jsonBodyParser, function (req, res) {
    res.json(response(req.body.operation));
});

// (2) catch ALL rest api requests
server.all('/*', jsonBodyParser, function (req, res) {
    res.json(response(req.originalUrl));
});

console.log('<< -- MOCK SERVER IS UP !!! -- >>');