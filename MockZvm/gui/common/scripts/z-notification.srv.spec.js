'use strict';

describe('notification service TEST', function () {
    var $rootScope, $q, zNotificationService, notifyObj, promiseObj, key;

    function callFuncIterator(func, count, key) {
        for (var i = 0; i < count; i++) {
            func(key);
        }
    }

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$rootScope_, _$q_, _zNotificationService_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        zNotificationService = _zNotificationService_;
        key = '_spec_test_';

        notifyObj = {
            "promise": {
                "$$state": {
                    "status": 0,
                    "pending": [[{"promise": {"$$state": {"status": 0}}}, null, null, null]]
                }
            }
        };

        promiseObj = $q.defer();
    }));

    it('should to check if all function define', function () {
        expect(zNotificationService._private._notify).toBeDefined();
        expect(zNotificationService._private.notificationHash).toBeDefined();
        expect(zNotificationService.getNotifier).toBeDefined();
        expect(zNotificationService.getSubscriber).toBeDefined();
        expect(zNotificationService.unSubscribe).toBeDefined();
    });

    it('should check if getting notify promise object', function () {
        var notifier = zNotificationService.getNotifier(key);
        expect(JSON.stringify(notifier)).toEqual(JSON.stringify(notifyObj));
        expect(JSON.stringify(zNotificationService._private.notificationHash[key]._notifier)).toEqual(JSON.stringify(notifyObj));
    });

    it('should check if getting subscriber promise object', function () {
        var subscriber = zNotificationService.getSubscriber(key);
        expect(JSON.stringify(subscriber)).toEqual(JSON.stringify(promiseObj));
        expect(JSON.stringify(zNotificationService._private.notificationHash[key]._subscribersCollection[0])).toEqual(JSON.stringify(promiseObj));
    });

    it('should to check if support to add few notifiers', function () {
        zNotificationService.getNotifier('_0_');
        zNotificationService.getNotifier('_1_');
        zNotificationService.getNotifier('_2_');

        expect(JSON.stringify(zNotificationService._private.notificationHash['_0_']._notifier)).toEqual(JSON.stringify(notifyObj));
        expect(JSON.stringify(zNotificationService._private.notificationHash['_1_']._notifier)).toEqual(JSON.stringify(notifyObj));
        expect(JSON.stringify(zNotificationService._private.notificationHash['_2_']._notifier)).toEqual(JSON.stringify(notifyObj));
    });

    it('should to check if support to add few subscribers', function () {
        callFuncIterator(zNotificationService.getSubscriber, 3, '_0_');
        callFuncIterator(zNotificationService.getSubscriber, 2, '_1_');

        expect(zNotificationService._private.notificationHash['_0_']._subscribersCollection.length).toEqual(3);
        expect(zNotificationService._private.notificationHash['_1_']._subscribersCollection.length).toEqual(2);
    });

    it('should to check unSubscribe function ', function () {
        var subscriber = zNotificationService.getSubscriber(key);
        zNotificationService.getNotifier(key);

        zNotificationService.unSubscribe(subscriber, key);
        expect(zNotificationService._private.notificationHash[key]._subscribersCollection.length).toEqual(0);
    });

    it('should to check notifier function been called', function () {
        spyOn(zNotificationService._private, '_notify');
        var notifier = zNotificationService.getNotifier(key);
        zNotificationService.getSubscriber(key);

        notifier.notify({value: false, key: key});
        $rootScope.$digest();

        expect(zNotificationService._private._notify).toHaveBeenCalled();
    });
});