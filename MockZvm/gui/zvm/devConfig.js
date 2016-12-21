//THIS FILE FOR MODIFICATION PROXY AND GUI DISTRIBUTE DESTINATION ONLY
var devConfig = function () {
    return {
        //---------- proxy file configuration ----------------//
        host: 'localhost',
        // host: '172.20.76.102',
        // host: '172.20.124.202',
        // host: '172.20.123.201',
        // host: '172.20.134.234',
        // host: '172.20.110.222z',
        // host: '172.20.186.56',
        // host: '172.20.77.119',
        // host: '172.20.124.201'
        // host: '10.10.1.80',
        // host: '172.20.149.88',
        // host: '172.20.112.109',
        // host: '172.20.71.113',
        // host: '172.20.70.230',
        // host: '172.20.150.117',
        // host: '172.20.75.102',
        // host: '172.20.71.240',
        // host: '172.20.77.16', //4.0u7
        //host: '172.20.78.110', //Danielle
        //host: '172.20.75.12',//Danielle
        //host: '172.20.78.102',//Dani
        ///host: '172.20.70.110',
        //host: '172.20.70.105',
        // host:'172.20.142.230' //hyperv  zertolab\administrator Zertodata1!
        // host:'172.20.136.222',//Idan hugi
        // host:'172.20.140.222'//hyperv
        // host:'172.20.155.127',//
        // host:'172.20.155.233'//
        // host:'172.20.75.104',

        //host:'172.20.75.230'
        //host:'172.20.74.230'
        //host:'172.20.155.124'
        //'host:172.20.77.119'
        //'host:172.20.150.103'
        localPort: {
            local: 9000,
            remote: 9001
        },
        port: {
            local: '9669',
            remote: '9670'
        },


        //--------- destination file configuration -------------//
        //target: 'dist'
        // target: '//zfs1/Builds/athena_GUI_manual_builds/athena_19-07-2016'
        target: '../../../../bin/UnitTests/debug/gui',

        //-------- mock js server relative path ------------------//
        mockServerLocation: 'c:/git repos/mocker'
    };
};

module.exports = devConfig;
//THIS FILE FOR MODIFICATION PROXY AND GUI DISTRIBUTE DESTINATION ONLY
