'use strict';

const _each = require('lodash/each');

module.exports = function GetExtendedCheckpointList() {
    let template = [{
        "Identifier": {"Identifier": 480},
        "TimeStamp": "2015-08-11T13:07:58.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 479},
        "TimeStamp": "2015-08-11T13:07:53.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 478},
        "TimeStamp": "2015-08-11T13:07:48.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 477},
        "TimeStamp": "2015-08-11T13:07:43.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 476},
        "TimeStamp": "2015-08-11T13:07:38.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 475},
        "TimeStamp": "2015-08-11T13:07:33.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 474},
        "TimeStamp": "2015-08-11T13:07:28.000Z",
        "Tag": null,
        "Vss": true
    }, {
        "Identifier": {"Identifier": 473},
        "TimeStamp": "2015-08-11T13:07:23.000Z",
        "Tag": null,
        "Vss": true
    }, {
        "Identifier": {"Identifier": 472},
        "TimeStamp": "2015-08-11T13:07:18.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 471},
        "TimeStamp": "2015-08-11T13:07:13.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 470},
        "TimeStamp": "2015-08-11T13:07:08.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 469},
        "TimeStamp": "2015-08-11T13:07:03.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 468},
        "TimeStamp": "2015-08-11T13:06:58.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 467},
        "TimeStamp": "2015-08-11T13:06:53.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 466},
        "TimeStamp": "2015-08-11T13:06:48.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 465},
        "TimeStamp": "2015-08-11T13:06:43.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 464},
        "TimeStamp": "2015-08-11T13:06:38.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 463},
        "TimeStamp": "2015-08-11T13:06:33.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 462},
        "TimeStamp": "2015-08-11T13:06:28.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 461},
        "TimeStamp": "2015-08-11T13:06:23.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 460},
        "TimeStamp": "2015-08-11T13:06:18.000Z",
        "Tag": 'user CP cool !!!',
        "Vss": false
    }, {
        "Identifier": {"Identifier": 459},
        "TimeStamp": "2015-08-11T13:06:13.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 458},
        "TimeStamp": "2015-08-11T13:06:08.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 457},
        "TimeStamp": "2015-08-11T13:06:03.000Z",
        "Tag": 'who"s your daddy',
        "Vss": false
    }, {
        "Identifier": {"Identifier": 456},
        "TimeStamp": "2015-08-11T13:05:58.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 455},
        "TimeStamp": "2015-08-11T13:05:53.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 454},
        "TimeStamp": "2015-08-11T13:05:48.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 453},
        "TimeStamp": "2015-08-11T13:05:43.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 452},
        "TimeStamp": "2015-08-11T13:05:38.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 451},
        "TimeStamp": "2015-08-11T13:05:33.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 450},
        "TimeStamp": "2015-08-11T13:05:28.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 449},
        "TimeStamp": "2015-08-11T13:05:23.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 448},
        "TimeStamp": "2015-08-11T13:05:18.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 447},
        "TimeStamp": "2015-08-11T13:05:13.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 446},
        "TimeStamp": "2015-08-11T13:05:08.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 445},
        "TimeStamp": "2015-08-11T13:05:03.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 444},
        "TimeStamp": "2015-08-11T13:04:58.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 443},
        "TimeStamp": "2015-08-11T13:04:53.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 442},
        "TimeStamp": "2015-08-11T13:04:48.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 441},
        "TimeStamp": "2015-08-11T13:04:43.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 440},
        "TimeStamp": "2015-08-11T13:04:38.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 439},
        "TimeStamp": "2015-08-11T13:04:33.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 438},
        "TimeStamp": "2015-08-11T13:04:28.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 437},
        "TimeStamp": "2015-08-11T13:04:23.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 436},
        "TimeStamp": "2015-08-11T13:04:18.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 435},
        "TimeStamp": "2015-08-11T13:04:13.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 434},
        "TimeStamp": "2015-08-11T13:04:08.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 433},
        "TimeStamp": "2015-08-11T13:04:03.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 432},
        "TimeStamp": "2015-08-11T13:03:58.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 431},
        "TimeStamp": "2015-08-11T13:03:53.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 430},
        "TimeStamp": "2015-08-11T13:03:48.000Z",
        "Tag": null,
        "Vss": false
    }, {
        "Identifier": {"Identifier": 429},
        "TimeStamp": "2015-08-11T13:03:42.000Z",
        "Tag": null,
        "Vss": false
    }, {"Identifier": {"Identifier": 428}, "TimeStamp": "2015-08-11T13:03:37.000Z", "Tag": null, "Vss": false}];


    _each(template, function(cp){
        cp.TimeStamp = new Date(cp.TimeStamp);
    });

    return template;
};

