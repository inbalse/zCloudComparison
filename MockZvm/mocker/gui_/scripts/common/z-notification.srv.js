'use strict';

angular.module('zvmApp.services')
    .constant('zNotificationConstant', {
        INLINE_OPENED_NOTIFICATION: '_inline_opened_notification_',
        NG_REACT:'ng_react_notification_',
        STATUS_FILTER_CHANGE: 'status_filter_change_',
        RUN_DEFAULT_QUERY: 'run_default_query_',
        RUN_PERSONAL_QUERY: 'run_personal_query_',
        CARD_FILTER_CHANGE:'card_filter_filter_change_',
        CARD_SELECTED_FILTER_CHANGE:'card_selected_filter_change_',
        LOGIN_VIEW_NOTIFICATION: '_login_view_notification_',
        PUBLIC_CLOUD_AZURE_AWS_NOTIFICATION: 'public_cloud_azure_aws_notification'
    })
    .service('zNotificationService', function ($q) {

        var that = this,
            _notificationHash = {};

        that._private = {
            notificationHash: _notificationHash
        };

        //return notify object and add to _notificationHash
        that.getNotifier = function (key) {
            var newNotifier = $q.defer();
            //create or add notifier by key
            if (_notificationHash.hasOwnProperty(key)) {
                _notificationHash[key]._notifier = newNotifier;
            } else {
                _notificationHash[key] = {};
                _notificationHash[key]._notifier = newNotifier;
            }

            //collect notifier and watch to changes
            $q.all(newNotifier.promise.then(null, null, that._private._notify));

            return newNotifier;
        };

        //creates a new promise for each subscribers and return subscriber item
        that.getSubscriber = function (key) {
            var newSubscriber = $q.defer();
            //create or add subscriber by key
            if (_notificationHash.hasOwnProperty(key)) {
                if (angular.isArray(_notificationHash[key]._subscribersCollection)) {
                    _notificationHash[key]._subscribersCollection.push(newSubscriber);
                } else {
                    _notificationHash[key]._subscribersCollection = [newSubscriber];
                }
            } else {
                _notificationHash[key] = {};
                _notificationHash[key]._subscribersCollection = [newSubscriber];
            }

            //return all defer obj for unSubscribe function that (resolve/destroy) the promise finally
            return newSubscriber;
        };

        that.unSubscribe = function (subscriber, key, isUnSubscribeNotifier) {
            _.remove(_notificationHash[key]._subscribersCollection, subscriber);
            //if no have subscribers destroy the notifier if exist
            if (_notificationHash[key]._notifier && _notificationHash[key]._subscribersCollection.length < 1) {
                //has some cases when notifier must be stay subscribe always
                if(_.isNullOrUndefined(isUnSubscribeNotifier)) {
                    _notificationHash[key]._notifier.resolve();
                }
            }
            subscriber.resolve();
        };

        that._private._notify = function (args) {
            _.forEach(_notificationHash[args.key]._subscribersCollection, function (callback) {
                //fire event notification to subscribers
                callback.notify(args.value);
            });
        };
    });
