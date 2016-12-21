const alertsList = require('./alertsList')(300);
const vpgs = require('./vpgs')(4000);
const sitesAggregations = require('./sites')(20);
const tasksList = require('./tasksList')(329);
const summary = require('./summary')();

module.exports = () => {
    return [
        {
            '/sites-view/v1/summary/dashboardaggregations': {result: summary},
            '/sites-view/v1/sites': {result: sitesAggregations.sites},
            '/sites-view/v1/sites/topology': {result: sitesAggregations.topology},
            '/sites-view/v1/alerts': {result: alertsList},
            '/sites-view/v1/tasks': {result: tasksList},
            '/sites-view/v1/vpgs': {result: vpgs}
        }
    ]
};

