'use strict';

angular.module('zvmApp.services')
    .constant('ParamsToHideInLog', {
        LoginToVCenter: 1,
        ChangeHostsPassword: 1,
        ChangeVraSettings: 2,
        InstallVraOnHost: 5,
        Login: 1,
        SetVCenterCredentials: 1
    })

    .factory('zertoLoggerServiceFactory', function (ParamsToHideInLog) {

        var zertoLoggerServiceFactory = {};
        var omittableOperations = [];
        var results = {};

        var TYPES = {
            REQUEST : 'Request',
            RESPONSE: 'Response',
            ERROR: 'Error'
        };

        /* jshint ignore:start */
        var toHash = function (str) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                var char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // (Convert to 32bit integer)
            }
            return hash;
        };
        /* jshint ignore:end */

        var getDate = function () {
            return new Date().toISOString();
        };

        var zLogHelper = function (date, operation, type, content, params) {
            var paramsToLog = JSON.stringify(_.map(params, function (param) {
                if (angular.isObject(param)) {
                    return _.omit(param, ['password', 'hostPassword']);
                }
                return param;
            }));

            var logger = {
                date: date,
                operation: operation,
                protocol: 'VQ',
                type: type,
                content: content || ''
            };

            if(!_.isNullOrUndefined(params)){
                logger.params = paramsToLog;
            }

            zlog.log(logger);
        };

        zertoLoggerServiceFactory.logCall = function (operation, params) {
            var copyParams = angular.copy(params);

            // hide password
            // all password parameters is strings (not inside object), so we will delete their print according to index.
            if (copyParams && ParamsToHideInLog[operation]) {
                var index = ParamsToHideInLog[operation];
                if (copyParams.length > index) {
                    _.pullAt(copyParams, index);
                }
            }

            var paramsToLog = JSON.stringify(copyParams);
            var date = getDate();

            if (params.length > 0) {
                zLogHelper(date, operation, TYPES.REQUEST, paramsToLog);
            } else {
                zLogHelper(date, operation, TYPES.REQUEST);
            }
        };

        zertoLoggerServiceFactory.logSuccess = function (operation, result) {
            var date = getDate();

            // removing graphs from logs
            var resultStr = JSON.stringify(result, function (key, value) {
                return key === 'Graphs' ? 'not logged' : value;
            });
            var resHash = toHash(resultStr); // jshint ignore:line
            var omittableOperation = _.find(omittableOperations, {'fname': operation});

            if ((results[operation] !== resHash) || (angular.isUndefined(omittableOperation))) {
                //result was changes or operation is non omitted
                zLogHelper(date, operation, TYPES.RESPONSE, resultStr);
                results[operation] = resHash;
            } else {
                zLogHelper(date, operation, TYPES.RESPONSE, '-omitted-');
            }
        };

        zertoLoggerServiceFactory.logError = function (operation, params, error) {
            var date = getDate();
            zLogHelper(date, operation, TYPES.ERROR, JSON.stringify(error), params);
        };

        zertoLoggerServiceFactory.addtOmittableOperation = function (operation) {
            omittableOperations.push(operation);
        };

        zertoLoggerServiceFactory.removeOmittableOperation = function (operation) {
            _.remove(omittableOperations, {fname: operation});
        };

        //=============================== REST API LOGGER ====================================//

        zertoLoggerServiceFactory.addRestApiLog = function(url, type, content) {

            var logger = {
                date: getDate(),
                operation: url,
                protocol: 'REST API',
                type: type,
                content: content || ''
            };

            zlog.log(logger);
        };

        return zertoLoggerServiceFactory;
    });
