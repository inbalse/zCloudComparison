const _ = require('lodash'),
    colors = require('colors'),
    mocks = {};

const getData = (mockData) => {
    const data = mockData.queue[mockData.currentIndex];
    mockData.currentIndex++;

    if (_.isEqual(_.size(mockData.queue), mockData.currentIndex)) {
        mockData.currentIndex = 0;
    }
    return data;
};

const getDataByIndex = (mockData, index) => {
    const data = mockData.queue[index];
    if (_.isUndefined(data)) {
        console.log('Mock index doesn\'t exist'.underline.red);
    }
    return data;
};

exports.addMock = (endpoint, mock) => {
    const mockData = _.get(mocks, endpoint, {});

    if (_.isEmpty(mockData)) {
        mockData.queue = [];
        mockData.currentIndex = 0;
        mocks[endpoint] = mockData;
    }

    mockData.queue.push(mock);

    return mockData;
};

exports.getMock = (endpoint, index) => {
    const mockData = _.get(mocks, endpoint, null);
    if (_.isNull(mockData)) {
        console.log('Mock data doesn\'t exist'.underline.red);
        return mockData;
    }

    if (_.isUndefined(index)) {
        return getData(mockData);
    }

    return getDataByIndex(mockData, index);
};

exports.addDynamicMock = (endpoint, mock) => {
    const mockData = _.get(mocks, endpoint, {});

    if(_.isEmpty(mockData)){
        var mockObj = this.addMock(endpoint, mock);
        mockObj.isDynamic = true;
        return;
    }

    if(!mockData.isDynamic){
        mockData.isDynamic = true;
        mockData.queue = [mock];
        return;
    }

    mockData.queue.push(mock);
};