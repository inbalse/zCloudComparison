'use strict';

describe('configureCheckpointController', function () {
    var controller, scope, checkpoints, checkpointId;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, _$translate_, _$filter_, _configureCheckpointFactory_) {
        scope = $rootScope.$new();

        checkpoints = [{"Identifier":{"Identifier":4135},"TimeStamp":"2015-08-05T11:18:44.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4134},"TimeStamp":"2015-08-05T11:18:39.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4133},"TimeStamp":"2015-08-05T11:18:34.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4132},"TimeStamp":"2015-08-05T11:18:29.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4131},"TimeStamp":"2015-08-05T11:18:24.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4130},"TimeStamp":"2015-08-05T11:18:19.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4129},"TimeStamp":"2015-08-05T11:18:14.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4128},"TimeStamp":"2015-08-05T11:18:09.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4127},"TimeStamp":"2015-08-05T11:18:04.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4126},"TimeStamp":"2015-08-05T11:17:59.000Z","Tag":"Jonny","Vss":false},{"Identifier":{"Identifier":4125},"TimeStamp":"2015-08-05T11:17:54.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4124},"TimeStamp":"2015-08-05T11:17:49.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4123},"TimeStamp":"2015-08-05T11:17:44.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4122},"TimeStamp":"2015-08-05T11:17:39.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4121},"TimeStamp":"2015-08-05T11:17:34.000Z","Tag":null,"Vss":true},{"Identifier":{"Identifier":4120},"TimeStamp":"2015-08-05T11:17:29.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4119},"TimeStamp":"2015-08-05T11:17:24.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4118},"TimeStamp":"2015-08-05T11:17:19.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4117},"TimeStamp":"2015-08-05T11:17:14.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4116},"TimeStamp":"2015-08-05T11:17:09.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4115},"TimeStamp":"2015-08-05T11:17:04.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4114},"TimeStamp":"2015-08-05T11:16:59.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4113},"TimeStamp":"2015-08-05T11:16:54.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4112},"TimeStamp":"2015-08-05T11:16:49.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4111},"TimeStamp":"2015-08-05T11:16:44.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4110},"TimeStamp":"2015-08-05T11:16:39.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4109},"TimeStamp":"2015-08-05T11:16:34.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4108},"TimeStamp":"2015-08-05T11:16:29.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4107},"TimeStamp":"2015-08-05T11:16:24.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4106},"TimeStamp":"2015-08-05T11:16:19.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4105},"TimeStamp":"2015-08-05T11:16:14.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4104},"TimeStamp":"2015-08-05T11:16:09.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4103},"TimeStamp":"2015-08-05T11:16:04.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4102},"TimeStamp":"2015-08-05T11:15:59.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4101},"TimeStamp":"2015-08-05T11:15:54.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4100},"TimeStamp":"2015-08-05T11:15:49.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4099},"TimeStamp":"2015-08-05T11:15:44.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4098},"TimeStamp":"2015-08-05T11:15:39.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4097},"TimeStamp":"2015-08-05T11:15:34.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4096},"TimeStamp":"2015-08-05T11:15:29.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4095},"TimeStamp":"2015-08-05T11:15:24.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4094},"TimeStamp":"2015-08-05T11:15:19.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4093},"TimeStamp":"2015-08-05T11:15:14.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4092},"TimeStamp":"2015-08-05T11:15:09.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4091},"TimeStamp":"2015-08-05T11:15:04.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4090},"TimeStamp":"2015-08-05T11:14:59.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4089},"TimeStamp":"2015-08-05T11:14:54.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4088},"TimeStamp":"2015-08-05T11:14:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4087},"TimeStamp":"2015-08-05T11:14:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4086},"TimeStamp":"2015-08-05T11:14:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4085},"TimeStamp":"2015-08-05T11:14:34.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4084},"TimeStamp":"2015-08-05T11:14:29.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":9971},"TimeStamp":"2015-08-05T11:14:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4082},"TimeStamp":"2015-08-05T11:14:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4081},"TimeStamp":"2015-08-05T11:14:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4080},"TimeStamp":"2015-08-05T11:14:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4079},"TimeStamp":"2015-08-05T11:14:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4078},"TimeStamp":"2015-08-05T11:13:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4077},"TimeStamp":"2015-08-05T11:13:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4076},"TimeStamp":"2015-08-05T11:13:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4075},"TimeStamp":"2015-08-05T11:13:44.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4074},"TimeStamp":"2015-08-05T11:13:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4073},"TimeStamp":"2015-08-05T11:13:34.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4072},"TimeStamp":"2015-08-05T11:13:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4071},"TimeStamp":"2015-08-05T11:13:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4070},"TimeStamp":"2015-08-05T11:13:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4069},"TimeStamp":"2015-08-05T11:13:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4068},"TimeStamp":"2015-08-05T11:13:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4067},"TimeStamp":"2015-08-05T11:13:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4066},"TimeStamp":"2015-08-05T11:12:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4065},"TimeStamp":"2015-08-05T11:12:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4064},"TimeStamp":"2015-08-05T11:12:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4063},"TimeStamp":"2015-08-05T11:12:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4062},"TimeStamp":"2015-08-05T11:12:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4061},"TimeStamp":"2015-08-05T11:12:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4060},"TimeStamp":"2015-08-05T11:12:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4059},"TimeStamp":"2015-08-05T11:12:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4058},"TimeStamp":"2015-08-05T11:12:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4057},"TimeStamp":"2015-08-05T11:12:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4056},"TimeStamp":"2015-08-05T11:12:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4055},"TimeStamp":"2015-08-05T11:12:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4054},"TimeStamp":"2015-08-05T11:11:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4053},"TimeStamp":"2015-08-05T11:11:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4052},"TimeStamp":"2015-08-05T11:11:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4051},"TimeStamp":"2015-08-05T11:11:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4050},"TimeStamp":"2015-08-05T11:11:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4049},"TimeStamp":"2015-08-05T11:11:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4048},"TimeStamp":"2015-08-05T11:11:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4047},"TimeStamp":"2015-08-05T11:11:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4046},"TimeStamp":"2015-08-05T11:11:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4045},"TimeStamp":"2015-08-05T11:11:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4044},"TimeStamp":"2015-08-05T11:11:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4043},"TimeStamp":"2015-08-05T11:11:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4042},"TimeStamp":"2015-08-05T11:10:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4041},"TimeStamp":"2015-08-05T11:10:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4040},"TimeStamp":"2015-08-05T11:10:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4039},"TimeStamp":"2015-08-05T11:10:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4038},"TimeStamp":"2015-08-05T11:10:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4037},"TimeStamp":"2015-08-05T11:10:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4036},"TimeStamp":"2015-08-05T11:10:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4035},"TimeStamp":"2015-08-05T11:10:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4034},"TimeStamp":"2015-08-05T11:10:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4033},"TimeStamp":"2015-08-05T11:10:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4032},"TimeStamp":"2015-08-05T11:10:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4031},"TimeStamp":"2015-08-05T11:10:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4030},"TimeStamp":"2015-08-05T11:09:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4029},"TimeStamp":"2015-08-05T11:09:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4028},"TimeStamp":"2015-08-05T11:09:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4027},"TimeStamp":"2015-08-05T11:09:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4026},"TimeStamp":"2015-08-05T11:09:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4025},"TimeStamp":"2015-08-05T11:09:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4024},"TimeStamp":"2015-08-05T11:09:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4023},"TimeStamp":"2015-08-05T11:09:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4022},"TimeStamp":"2015-08-05T11:09:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4021},"TimeStamp":"2015-08-05T11:09:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4020},"TimeStamp":"2015-08-05T11:09:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4019},"TimeStamp":"2015-08-05T11:09:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4018},"TimeStamp":"2015-08-05T11:08:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4017},"TimeStamp":"2015-08-05T11:08:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4016},"TimeStamp":"2015-08-05T11:08:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4015},"TimeStamp":"2015-08-05T11:08:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4014},"TimeStamp":"2015-08-05T11:08:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4013},"TimeStamp":"2015-08-05T11:08:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4012},"TimeStamp":"2015-08-05T11:08:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4011},"TimeStamp":"2015-08-05T11:08:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4010},"TimeStamp":"2015-08-05T11:08:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4009},"TimeStamp":"2015-08-05T11:08:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4008},"TimeStamp":"2015-08-05T11:08:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4007},"TimeStamp":"2015-08-05T11:08:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4006},"TimeStamp":"2015-08-05T11:07:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4005},"TimeStamp":"2015-08-05T11:07:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4004},"TimeStamp":"2015-08-05T11:07:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4003},"TimeStamp":"2015-08-05T11:07:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4002},"TimeStamp":"2015-08-05T11:07:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4001},"TimeStamp":"2015-08-05T11:07:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":4000},"TimeStamp":"2015-08-05T11:07:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3999},"TimeStamp":"2015-08-05T11:07:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3998},"TimeStamp":"2015-08-05T11:07:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3997},"TimeStamp":"2015-08-05T11:07:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3996},"TimeStamp":"2015-08-05T11:07:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3995},"TimeStamp":"2015-08-05T11:07:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3994},"TimeStamp":"2015-08-05T11:06:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3993},"TimeStamp":"2015-08-05T11:06:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3992},"TimeStamp":"2015-08-05T11:06:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3991},"TimeStamp":"2015-08-05T11:06:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3990},"TimeStamp":"2015-08-05T11:06:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3989},"TimeStamp":"2015-08-05T11:06:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3988},"TimeStamp":"2015-08-05T11:06:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3987},"TimeStamp":"2015-08-05T11:06:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3986},"TimeStamp":"2015-08-05T11:06:18.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3985},"TimeStamp":"2015-08-05T11:06:13.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3984},"TimeStamp":"2015-08-05T11:06:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3983},"TimeStamp":"2015-08-05T11:06:03.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3982},"TimeStamp":"2015-08-05T11:05:58.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3981},"TimeStamp":"2015-08-05T11:05:53.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3980},"TimeStamp":"2015-08-05T11:05:48.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3979},"TimeStamp":"2015-08-05T11:05:43.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3978},"TimeStamp":"2015-08-05T11:05:38.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3977},"TimeStamp":"2015-08-05T11:05:33.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3976},"TimeStamp":"2015-08-05T11:05:28.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3975},"TimeStamp":"2015-08-05T11:05:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3974},"TimeStamp":"2015-08-05T11:05:17.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3973},"TimeStamp":"2015-08-05T11:05:12.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3972},"TimeStamp":"2015-08-05T11:05:08.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3971},"TimeStamp":"2015-08-05T11:05:02.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3970},"TimeStamp":"2015-08-05T11:04:57.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3969},"TimeStamp":"2015-08-05T11:04:52.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3968},"TimeStamp":"2015-08-05T11:04:47.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3967},"TimeStamp":"2015-08-05T11:04:42.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3966},"TimeStamp":"2015-08-05T11:04:37.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3965},"TimeStamp":"2015-08-05T11:04:32.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3964},"TimeStamp":"2015-08-05T11:04:27.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3963},"TimeStamp":"2015-08-05T11:04:23.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3962},"TimeStamp":"2015-08-05T11:04:17.000Z","Tag":null,"Vss":false},{"Identifier":{"Identifier":3961},"TimeStamp":"2015-08-05T11:04:12.000Z","Tag":null,"Vss":false}];
 var summaries =[];
        _.each(checkpoints, function(cp){
            cp.TimeStamp = new Date(cp.TimeStamp);
        });

        checkpointId = angular.fromJson({"Identifier": 9999});
        spyOn(scope, '$watch').and.callThrough();

        controller = $controller('configureCheckpointController', {$scope: scope,
            checkpoints: checkpoints,
            checkpointId: checkpointId,
            checkpointSummaries:summaries,
            vpgName: 'test vpg',
            openPlace : 'Fail Over Test',
            $translate: _$translate_,
            configureCheckpointFactory: _configureCheckpointFactory_,
            $filter: _$filter_ });
    }));

    it('should have the properties and functions', function () {
        expect(scope.loading).toBeFalsy();
        expect(scope.checkpoints).toEqual(checkpoints);
        expect(scope.filteredCheckpoints).toEqual(checkpoints);

        //check that func are in place
        expect(scope._getLatest).toBeDefined();
        expect(scope._getLatestManual).toBeDefined();
        expect(scope._getLatestVSS).toBeDefined();
        expect(scope.handleCancel).toBeDefined();
        expect(scope.handleSave).toBeDefined();
        expect(scope._isItemTypeVisible).toBeDefined();
        expect(scope._applyCurrentConfiguration).toBeDefined();
        expect(scope.gridRenderCompleted).toBeDefined();
        expect(scope.typeClick).toBeDefined();
        expect(scope.manualFilterClick).toBeDefined();
        expect(scope.userFilterClick).toBeDefined();
    });

    it('should have filter configurations', function(){
        expect(scope.filter).toBeDefined();
        expect(scope.filter.showRegular).toBeTruthy();
        expect(scope.filter.showManual).toBeTruthy();
        expect(scope.filter.showVSS).toBeTruthy();
    });

    it('should apply default/edit view were the component is loaded', function(){
        scope._applyCurrentConfiguration(scope.checkpoints, scope.last.Identifier);
        expect(scope.data.type).toEqual(1);

        scope._applyCurrentConfiguration(scope.checkpoints, angular.fromJson({"Identifier": 9971}));
        expect(scope.data.type).toEqual(4);
    });

    it('should have _isItemTypeVisible that changes behaviour by scope.filter... values', function(){
        var cp =  angular.fromJson({"Identifier": {"Identifier": 9979}, "TimeStamp": new Date("2014-09-17T04:39:24.164Z"), "Tag": null, "Vss": false});

        scope.filter.showVSS = scope.filter.showManual = scope.filter.showRegular = true;

        expect(scope._isItemTypeVisible(cp)).toBeTruthy();

        cp.Vss = true;
        scope.filter.showVSS = false;
        expect(scope._isItemTypeVisible(cp)).toBeFalsy();

        cp.Vss = false;
        cp.Tag = 'test';
        scope.filter.showManual = false;
        expect(scope._isItemTypeVisible(cp)).toBeFalsy();

        cp.Tag = null;
        scope.filter.showManual = true;
        expect(scope._isItemTypeVisible(cp)).toBeTruthy();
    });

    it('should check that _getLatest function return right cp', function () {
        expect(scope._getLatest(checkpoints)).toEqual({
            Identifier: Object({Identifier: 4135}),
            TimeStamp: new Date("2015-08-05T11:18:44.000Z"),
            Tag: null,
            Vss: false
        });
    });

    it('should check that _getLatestManual function return right cp', function () {
        expect(scope._getLatestManual(checkpoints)).toEqual({
            "Identifier": {"Identifier": 4126},
            "TimeStamp": new Date("2015-08-05T11:17:59.000Z"),
            "Tag": "Jonny",
            "Vss": false
        });
    });

    it('should check that _getLatestVSS function return right cp', function () {
        expect(scope._getLatestVSS(checkpoints)).toEqual({
            "Identifier": {"Identifier": 4121},
            "TimeStamp": new Date("2015-08-05T11:17:34.000Z"),
            "Tag": null,
            "Vss": true
        });
    });

});
